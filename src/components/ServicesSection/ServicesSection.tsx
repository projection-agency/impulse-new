import { useState, useEffect, useRef } from "react";
import s from "./ServicesSection.module.css";
import { Layout } from "../Layout/Layout";
import { useWindowSize } from "../../hooks/useWindowSize";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { API_URL } from "../../App";
import { TourType } from "../ActualToursSection/ActualToursSection";

interface ServiceTab {
  id: number;
  image: string;
  title: string;
  description: string;
}

interface ServicesData {
  services_tabs_data: ServiceTab[];
}

interface ServicesSectionProps {
  type?: string;
  data?: ServicesData | TourType;
}

const fetchServices = async (slug: string): Promise<ServicesData> => {
  const response = await axios.get(
    `${API_URL}wp-json/wp/v2/services?slug=${slug}`
  );
  return response.data[0] || { services_tabs_data: [] };
};

export const ServicesSection = ({ type, data }: ServicesSectionProps) => {
  const [activeTab, setActiveTab] = useState<number | null>(null);
  const [hasStarted, setHasStarted] = useState(false);
  const sectionRef = useRef(null);
  const timeoutRef = useRef<number | null>(null);
  const { pathname } = useLocation();

  // Визначаємо slug на основі pathname
  const getSlugFromPathname = () => {
    if (pathname === "/") return "main";
    if (pathname === "/private-tours") return "private-tours";
    if (pathname === "/business-tours") return "business-tours";
    if (pathname.startsWith("/tour")) return "tour";
    return "main";
  };

  const slug = getSlugFromPathname();

  // Якщо передаються type та data, використовуємо їх замість запиту
  const shouldUseProps = type && data;

  const { data: servicesData } = useQuery({
    queryKey: ["services", slug],
    queryFn: () => fetchServices(slug),
    enabled: !!slug && !shouldUseProps,
  });

  const tabs = shouldUseProps
    ? (data as ServicesData)?.services_tabs_data ||
      (data as TourType)?.services_tabs_data ||
      []
    : servicesData?.services_tabs_data || [];

  useEffect(() => {
    if (hasStarted && activeTab === null) {
      setActiveTab(1);
    }
  }, [hasStarted, activeTab]);

  const { width } = useWindowSize();
  const isMobile = width < 1024;

  //images preloader
  useEffect(() => {
    tabs.forEach((tab) => {
      const img = new Image();
      img.src = tab.image;
    });
  }, [tabs]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.1 }
    );

    const section = sectionRef.current;
    if (section) observer.observe(section);

    return () => {
      if (section) observer.unobserve(section);
    };
  }, [hasStarted]);

  useEffect(() => {
    const activeBars = document.querySelectorAll(`.${s.animate}`);
    activeBars.forEach((bar) => {
      bar.classList.remove(s.animate);
      void (bar as HTMLElement).offsetWidth; // force reflow
      bar.classList.add(s.animate);
    });
  }, [activeTab]);

  useEffect(() => {
    if (!hasStarted) return;

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setActiveTab((prevTab) => ((prevTab ?? 0) % tabs.length) + 1);
    }, 10000); // 10 секунд

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [activeTab, hasStarted]);

  const handleTabClick = (id: number) => {
    setActiveTab(id);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    timeoutRef.current = setTimeout(() => {
      setActiveTab((prevTab) => ((prevTab ?? 0) % tabs.length) + 1);
    }, 10000);
  };

  const { t } = useTranslation();

  console.log(tabs);

  return (
    <section
      ref={sectionRef}
      className={s.section}
      style={{
        backgroundImage: `url(${
          tabs.find((tab) => tab.id === activeTab)?.image ||
          "/images/services-images/helicopter.avif"
        })`,
        transition: "background-image 0.5s ease-in-out",
      }}
    >
      <Layout>
        <div className={s.tabsController}>
          <ul className={s.tabs}>
            {tabs.map((tab) => (
              <li
                className={`${tab.id === activeTab ? s.activeTab : ""}`}
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
              >
                <p className={`${tab.id === activeTab ? s.active : ""}`}>
                  <span>0{tab.id}</span>
                  <span>{tab.title}</span>
                </p>

                <div className={s.progressLayout}>
                  <div
                    key={
                      activeTab === tab.id
                        ? `active-${tab.id}`
                        : `inactive-${tab.id}`
                    }
                    className={`${s.progressBar} ${
                      activeTab === tab.id ? s.animate : ""
                    }`}
                  ></div>
                </div>
              </li>
            ))}
          </ul>

          {!isMobile && activeTab !== null && (
            <button
              onClick={() => handleTabClick((activeTab % tabs.length) + 1)}
            >
              <svg
                viewBox="0 0 42 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M41.416 8.57143L32.9443 0L31.5323 1.42857L39.0058 8.99L1.00991e-06 8.99L0 11.01H39.0058L31.5323 18.5714L32.9443 20L41.416 11.4286C42.1947 10.6407 42.1947 9.35929 41.416 8.57143Z"
                  fill="white"
                />
              </svg>
            </button>
          )}
        </div>

        <div className={s.tabContent}>
          <div className={s.titleContainer}>
            <p>{t("services_top")}</p>

            {activeTab !== null && (
              <h2>{tabs.find((tab) => tab.id === activeTab)?.title || ""}</h2>
            )}
          </div>

          {activeTab !== null && (
            <div className={s.tabDesc}>
              <p>
                {tabs.find((tab) => tab.id === activeTab)?.description || ""}
              </p>
            </div>
          )}
        </div>
      </Layout>
    </section>
  );
};

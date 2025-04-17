import { useEffect, useState } from "react";
import s from "./Loader.module.css";
import { SiteLogo } from "../SiteLogo/SiteLogo";
import { useWindowSize } from "../../hooks/useWindowSize";

const Loader = () => {
  const [progress, setProgress] = useState(0);

  const { width } = useWindowSize();

  const isMobile = width < 1024;

  console.log(isMobile);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 60);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={s.loaderLayout}>
      <div className={s.pulse}>
        <img src="/images/preload-pulse/1.png" alt="" />
        <img src="/images/preload-pulse/2.png" alt="" />
        <img src="/images/preload-pulse/3.png" alt="" />
        <img src="/images/preload-pulse/4.png" alt="" />
        <img src="/images/preload-pulse/5.png" alt="" />
      </div>
      <div
        className={`${s.headerLogoContainer}  ${
          progress >= 80 && !isMobile && s.scale
        }  ${isMobile && s.mobile} `}
      >
        <SiteLogo fill="white" />

        {!isMobile && (
          <div className={`${s.logoTitle} ${progress > 20 && s.narrowed}`}>
            <h4>IMPULSE</h4>
            <p>
              <span></span>
              Sports car tours
              <span></span>
            </p>
          </div>
        )}
      </div>
      <p className={s.progress}>{progress}%</p>
    </div>
  );
};

export default Loader;

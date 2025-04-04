import { useEffect } from "react";
import Lenis from "lenis";

export const useLenisLockScroll = (
  isLocked: boolean,
  lenis?: InstanceType<typeof Lenis>
) => {
  useEffect(() => {
    if (!lenis) return;

    const scrollY = window.scrollY;

    if (isLocked) {
      // Стоп анімації Lenis
      lenis.stop();

      // Блокуємо скрол
      document.body.style.overflow = "hidden";
      document.body.style.width = "100%";
      document.body.setAttribute("data-scroll-position", scrollY.toString());
    } else {
      // Розблоковуємо
      const savedScrollY = document.body.getAttribute("data-scroll-position");

      document.body.style.overflow = "";
      document.body.style.width = "";
      document.body.removeAttribute("data-scroll-position");

      // Відновлюємо scroll до попередньої позиції
      if (savedScrollY) {
        window.scrollTo(0, parseInt(savedScrollY));

        // Дрібна затримка, щоб Lenis не скинув scrollTo
        setTimeout(() => {
          lenis.start();
        }, 50);
      } else {
        lenis.start();
      }
    }
  }, [isLocked, lenis]);
};

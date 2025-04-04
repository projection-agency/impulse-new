import s from "./SiteButton.module.css";

export const SiteButton = () => {
  return (
    <a href="#tours" className={s.btn}>
      Актуальные туры
      <svg viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clipPath="url(#clip0_1575_181)">
          <path d="M2.39999 0V2.39999H7.79999L0 10.2L1.79999 12L9.60001 4.19997V9.59998H12V0H2.39999Z" />
        </g>
        <defs>
          <clipPath id="clip0_1575_181">
            <rect width="12" height="12" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </a>
  );
};

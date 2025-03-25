import { useState } from "react";
import styles from "./CustomCheckbox.module.css"; // Імпортуємо стилі

interface CustomCheckboxProps {
  label?: string;
  onChange?: (checked: boolean) => void;
}

const CustomCheckbox: React.FC<CustomCheckboxProps> = ({ label, onChange }) => {
  const [checked, setChecked] = useState(false);

  const handleCheckboxClick = () => {
    const newChecked = !checked;
    setChecked(newChecked);
    if (onChange) onChange(newChecked);
  };

  return (
    <div className={styles.checkBoxContainer} onClick={handleCheckboxClick}>
      <div className={`${styles.checkBox} ${checked ? styles.checked : ""}`}>
        {checked && (
          <span className={styles.checkmark}>
            <svg
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15 4.5L6.75 12.75L3 9"
                stroke="white"
                stroke-width="1.3"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </span>
        )}
      </div>
      {label && <span className={styles.label}>{label}</span>}
    </div>
  );
};

export default CustomCheckbox;

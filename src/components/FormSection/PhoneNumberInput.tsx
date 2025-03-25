import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import "./NumberInput.css";

export const PhoneNumberInput = () => {
  const handlePhoneChange = (value: string) => {
    console.log("Номер телефону:", value);
  };

  return (
    <PhoneInput
      country={"ua"} // Код країни за замовчуванням
      onlyCountries={["ua", "us", "pl", "de"]} // Обмежити вибір країн
      placeholder="Введіть свій номер телефону"
      onChange={handlePhoneChange}
      inputStyle={{
        width: "100%",
        height: "40px",
        fontSize: "16px",
      }}
      buttonStyle={{
        background: "transparent",
        border: "none",
      }}
    />
  );
};

// LanguageSelector.tsx
import React, { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import "./LanguageSelector.scss";

const LanguageSelector: React.FC = () => {
  const { i18n } = useTranslation();
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  //   const {t} = useTrans
  const { t } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setSelectedLanguage(lng);
    setDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="styled-language-selector">
      <button className="dropdown-button" onClick={toggleDropdown}>
        {i18n.language}
      </button>
      <div
        ref={dropdownRef}
        className={`dropdown-content ${isDropdownOpen ? "" : "hidden"}`}
      >
        <button
          className={`dropdown-item ${
            selectedLanguage === "en" ? "selected" : ""
          }`}
          onClick={() => changeLanguage("en")}
        >
          {t("navbar.english")}
        </button>
        <button
          className={`dropdown-item ${
            selectedLanguage === "uz" ? "selected" : ""
          }`}
          onClick={() => changeLanguage("uz")}
        >
          {t("navbar.uzbek")}
        </button>
        <button
          className={`dropdown-item ${
            selectedLanguage === "zh" ? "selected" : ""
          }`}
          onClick={() => changeLanguage("zh")}
        >
          {t("navbar.chinese")}
        </button>
      </div>
    </div>
  );
};

export default LanguageSelector;

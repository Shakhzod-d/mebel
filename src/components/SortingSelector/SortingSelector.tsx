// SortingSelector.tsx

import React, { useState } from "react";

import "./SortingSelector.scss";
import { useTranslation } from "react-i18next";

interface IOptionObj {
  value: string;
  title: string;
}

interface SortingSelectorProps {
  onSelect: (selectedOption: string) => void;
  options: IOptionObj[];
}

const SortingSelector: React.FC<SortingSelectorProps> = ({
  onSelect,
  options,
}) => {
  const [selectedOption, setSelectedOption] = useState<string>("");
  const { t } = useTranslation();

  const handleSelectionChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newSelectedOption = event.target.value;
    setSelectedOption(newSelectedOption);
    onSelect(newSelectedOption);
  };

  return (
    <div className="sorting-selector">
      <label>
        {t("body.sortingOrder")}
        <select value={selectedOption} onChange={handleSelectionChange}>
          {options.map((item: IOptionObj, idx) => {
            return (
              <option key={item.value + idx} value={item.value}>
                {item.title}
              </option>
            );
          })}
        </select>
      </label>
    </div>
  );
};

export default SortingSelector;

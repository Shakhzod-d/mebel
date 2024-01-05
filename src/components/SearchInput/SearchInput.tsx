import React, { Dispatch, SetStateAction, useState } from "react";
import "./SearchInput.scss";
import { useTranslation } from "react-i18next";

interface SearchInputProps {
  inputValue: string;
  setInputValue: Dispatch<SetStateAction<string>>;
}

const SearchInput: React.FC<SearchInputProps> = ({
  inputValue,
  setInputValue,
}) => {
  // const [searchTerm, setSearchTerm] = useState<string>("");
  const { t } = useTranslation();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  return (
    <div className="search-input">
      <input
        type="text"
        placeholder={t("body.search")}
        value={inputValue}
        onChange={handleInputChange}
        className=""
      />
    </div>
  );
};

export default SearchInput;

// src/Pagination.tsx
import React, { Dispatch, SetStateAction, useState } from "react";
import "./Pagination.scss";

interface PaginationProps {
  totalPages: number;
  setcurrentPage: Dispatch<SetStateAction<number>>;
}

const Pagination: React.FC<PaginationProps> = ({
  totalPages,
  setcurrentPage,
}) => {
  const [activePage, setActivePage] = useState<number | null>(null);

  const handlePageClick = (page: number) => {
    setcurrentPage(page);
    setActivePage(page);
    // Add your logic for handling page change here
  };

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <div className="pagination">
      {pages.map((page) => (
        <button
          key={page}
          className={`page-btn ${activePage === page ? "active" : ""}`}
          onClick={() => handlePageClick(page)}
        >
          {page}
        </button>
      ))}
    </div>
  );
};

export default Pagination;

import React, { useEffect, useState } from "react";
import Carousel from "../../components/Carousel/Carousel";
import ReusableCarousel from "../../components/Carousel/Carousel";
import MebelGrid from "../../components/MebelGrid/MebelGrid";
import "./Home.scss";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { fetchItems, itemsSelector } from "../../store/mebelsSlice";
import SortingSelector from "../../components/SortingSelector/SortingSelector";
import { sortingOptions } from "./helper";
import SearchInput from "../../components/SearchInput/SearchInput";
import useDebounce from "../../hooks/useDebounce";
import Pagination from "../../components/Pagination/Pagination";
import CarouselExample from "../../components/CarouselExample/CustomCarousel";
import { useTranslation } from "react-i18next";

export interface Slide {
  id: number;
  imageUrl: string;
}

const Home = () => {
  // const selectedUsers = useAppSelector(userSelector);
  const { items = [], loading = false } = useAppSelector(itemsSelector);
  const [inputValue, setInputValue] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("price");
  const [currentPage, setcurrentPage] = useState<number>(1);
  const debouncedInputValue = useDebounce<string>(inputValue, 800);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  // console.log(items?.meta?.total_pages);

  const mebels = [
    {
      id: 1,
      name: "Turkish mebel",
      imageUrl:
        "https://mebel-v-sibiri.ru/files/originals/spalnjajunona-147237.jpg",
      info: "thi sis test info",
      price: 390,
      isLiked: false,
    },
    {
      id: 2,
      name: "Dubai mebel",
      imageUrl:
        "https://www.topmebels.eu/wp-content/uploads/2020/04/IMG_0157.jpg",
      info: "thi sis test info",
      price: 667,
      isLiked: false,
    },
    {
      id: 3,
      name: "USA mebel",
      imageUrl:
        "https://www.topmebels.eu/wp-content/uploads/2020/03/IMG_0177.webp",
      info: "thi sis test info",
      price: 999,
      isLiked: false,
    },
    {
      id: 4,
      name: "USA mebel",
      imageUrl:
        "https://www.mebelinet.com/upload/iblock/d74/jk9yy9nd91xvx0tny5py97prj11u2zvs/Spalnya_Erika_komp.1.jpg",
      info: "thi sis test info",
      price: 883,
      isLiked: false,
    },
    {
      id: 5,
      name: "USA mebel",
      imageUrl:
        "https://www.topmebels.eu/wp-content/uploads/2020/04/indywidualne-projekty-top-mebels-1108x600.jpg",
      info: "thi sis test info",
      price: 4554,
      isLiked: false,
    },
    {
      id: 6,
      name: "USA mebel",
      imageUrl:
        "https://www.mebels.kz/media/wysiwyg/Gerbor/Tina/Sypialnia-Sokholm-HL5A1049-OKlFaYeqWeaWZRmdiQiHtf-1.jpg",
      info: "thi sis test info",
      price: 786,
      isLiked: false,
    },
    {
      id: 7,
      name: "USA mebel",
      imageUrl:
        "https://www.topmebels.eu/wp-content/uploads/2020/04/salon-firmowy-top-mebels-1108x600.jpg",
      info: "thi sis test info",
      price: 975,
      isLiked: false,
    },
    {
      id: 8,
      name: "USA mebel",
      imageUrl:
        "https://www.topmebels.eu/wp-content/uploads/2020/04/IMG_0151.jpg",
      info: "thi sis test info",
      price: 756,
      isLiked: false,
    },
    {
      id: 9,
      name: "USA mebel",
      imageUrl:
        "https://www.topmebels.eu/wp-content/uploads/2020/04/meble-na-wymiar-1024x683.png",
      info: "thi sis test info",
      price: 845,
      isLiked: false,
    },
    {
      id: 10,
      name: "USA mebel",
      imageUrl:
        "https://www.topmebels.eu/wp-content/uploads/2020/04/oferta-luxury-home-top-mebels-1108x600.jpg",
      info: "thi sis test info",
      price: 938,
      isLiked: false,
    },
    {
      id: 11,
      name: "USA mebel",
      imageUrl:
        "https://www.topmebels.eu/wp-content/uploads/2020/03/IMG_0164.webp",
      info: "thi sis test info",
      price: 782,
      isLiked: false,
    },
  ];

  const handleSortingSelect = (selectedOption: string) => {
    setSortBy(selectedOption);
  };

  useEffect(() => {
    const paramsObject = {
      title: debouncedInputValue,
      pathname: `home`,
      sortBy,
      page: currentPage,
      limit: 8,
    };

    dispatch(fetchItems(paramsObject));
  }, [debouncedInputValue, sortBy, currentPage]);

  return (
    <div className="home-container">
      <div className="search-and-sort-container">
        <SearchInput inputValue={inputValue} setInputValue={setInputValue} />
        <SortingSelector
          onSelect={handleSortingSelect}
          options={sortingOptions(t)}
        />
      </div>
      {/* <h1>{t("greeting")}</h1> */}
      <div className="container">
        <MebelGrid
          mebels={items.hasOwnProperty("items") ? items?.items : []}
          loading={loading}
        />
      </div>
      <Pagination
        totalPages={items?.meta?.total_pages || 2}
        setcurrentPage={setcurrentPage}
      />

      <CarouselExample
        slides={
          items.hasOwnProperty("items")
            ? items.items.map((item: any) => item.imageUrl)
            : []
        }
      />
    </div>
  );
};

export default Home;

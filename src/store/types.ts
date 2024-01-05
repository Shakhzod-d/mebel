import { Dispatch, SetStateAction } from "react";

export interface IAddFavoriteObj {
  id: number;
  title: string;
  imageUrl: string;
  info: string;
  price: number;
  setIsFavorite: Dispatch<SetStateAction<boolean>>;
}

export interface IDeleteItemObj {
  id: number;
  setIsAddFavorite: () => void;
}

export interface ICartItem {
  id: number;
  title: string;
  imageUrl: string;
  info: string;
  price: number;
  handleStopLoading: () => void;
}

export interface ISearch {
  title?: string;
  pathname?: string;
  sortBy?: string;
  page?: number;
  limit?: number;
}

export type UrlParams = { title: string; sortBy: string; page: number };

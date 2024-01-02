export interface IAddFavoriteObj {
  id: number;
  name: string;
  imageUrl: string;
  info: string;
  price: number;
  setIsAddFavorite: () => void;
}

export interface IDeleteItemObj {
  id: number;
  setIsAddFavorite: () => void;
}

export interface ICartItem {
  id: number;
  name: string;
  imageUrl: string;
  info: string;
  price: number;
  handleStopLoading: () => void;
}

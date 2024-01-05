import React from "react";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { MAIN_URL, favoriteUrl, mebelListUrl } from "../api";
import { RootState } from "./store";
import {
  IAddFavoriteObj,
  ICartItem,
  IDeleteItemObj,
  ISearch,
  UrlParams,
} from "./types";

export interface Item {
  id: number;
  title: string;
  imageUrl: string;
  info: string;
  price: number;
  isLiked: boolean;
  count?: number;
  // Add other properties as needed
}

interface IMeta {
  current_page?: number;
  per_page?: number;
  remaining_count?: number;
  total_items?: number;
  total_pages?: number;
}

interface ItemsObj {
  items: Item[];
  meta: IMeta;
}

interface ItemsState {
  items: ItemsObj | any;
  loading: boolean;
  message: "Successfully created" | "Somwthing went wrong" | "";
  ok: boolean;
  error: string | null;
  mebelDetails: Item;
}

const initialState: ItemsState = {
  items: { items: [], meta: {} },
  loading: false,
  ok: false,
  message: "",
  error: null,
  mebelDetails: {
    id: 0,
    title: "",
    imageUrl: "",
    info: "",
    price: 0,
    isLiked: false,
  },
};

export const fetchItems = createAsyncThunk(
  "items/fetchItems",
  async ({
    title = "",
    pathname = "home",
    sortBy = "",
    page = 1,
    limit = 8,
  }: ISearch) => {
    const queryParams = new URLSearchParams({
      title: `*${title}*`,
      sortBy,
      page: page.toString(),
      limit: limit.toString(),
    }).toString();

    const urlObj: Record<string, string> = {
      home: `${mebelListUrl}?${queryParams}`,
      cart: `${MAIN_URL}cart`,
      favorite: `${MAIN_URL}favorite`,
    };

    // console.log(urlObj[pathname]);
    const apiUrl = urlObj[pathname];

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();

      return data;
    } catch (error) {
      throw error;
    }
  }
);

export const fetchMebelById = createAsyncThunk(
  "mebelDetails/fetchMebelById",
  async (id: string) => {
    const singleMebelUrl = `${mebelListUrl}/${id}`;

    const response = await fetch(singleMebelUrl);
    const data = await response.json();

    return data as Item;
  }
);

export const postMebelToFavorite = createAsyncThunk(
  "favorite/postMebelToFavorite",
  async (obj: IAddFavoriteObj) => {
    const { setIsFavorite, ...rest } = obj;

    try {
      const response = await fetch(favoriteUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(rest),
      });
      const data = await response.json();

      console.log(`response`, response);

      if (response.ok) {
        setIsFavorite(true);
      }

      return data as Item[];
    } catch (error) {
      throw error;
    }
  }
);

export const deleteItem = createAsyncThunk(
  "delete/deleteItem",
  async (obj: IDeleteItemObj) => {
    const { setIsAddFavorite, id } = obj;
    const deleteUrl = `${favoriteUrl}/${id}`;

    try {
      const response = await fetch(deleteUrl, {
        method: "DELETE",
      });
      const data = await response.json();

      // console.log(`response`, response);

      if (response.status === 404) {
        // shu  statusText ni alert ga chiqarish lozim
      }

      if (response.ok) {
        setIsAddFavorite();
      }

      return data as Item[];
    } catch (error) {
      throw error;
    }
  }
);

export const postMebelToCart = createAsyncThunk(
  "favorite/postMebelToFavorite",
  async (obj: ICartItem) => {
    const cartUrl = `${MAIN_URL}card`;

    const { handleStopLoading, id, ...rest } = obj;

    try {
      const response = await fetch(cartUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(rest),
      });
      const data = await response.json();

      // console.log(`response`, response);

      if (response.ok) {
        handleStopLoading();
      }

      return data as Item[];
    } catch (error) {
      throw error;
    }
  }
);

export const createNewMebel = createAsyncThunk(
  "mebel/createNewMebel",
  async (obj: {
    imageUrl: string;
    name: string;
    info: string;
    price: number;
    clearForm: () => void;
  }) => {
    const url = `${MAIN_URL}mebelList`;

    const { clearForm, ...rest } = obj;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(rest),
      });
      const data = await response.json();

      if (response.ok) {
        clearForm();
      }

      return data;
    } catch (error) {
      throw error;
    }
  }
);

const mebelsSlice = createSlice({
  name: "mebel",
  initialState,
  reducers: {
    setEmptyNotification: (state) => {
      state.ok = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchItems.pending, (state) => {
      state.loading = true;
    });
    // @ts-ignore
    builder.addCase(
      fetchItems.fulfilled,
      (state, action: PayloadAction<ItemsObj>) => {
        // console.log(action.payload);
        state.loading = false;
        state.items = action.payload;
      }
    );
    builder.addCase(fetchItems.rejected, (state, action) => {
      state.loading = false;
      state.items = { items: [], meta: {} };
      state.error = action.error as string;
    });

    builder.addCase(fetchMebelById.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      fetchMebelById.fulfilled,
      (state, action: PayloadAction<Item>) => {
        state.loading = false;
        state.mebelDetails = action.payload;
      }
    );
    builder.addCase(fetchMebelById.rejected, (state, action) => {
      state.loading = false;
      state.mebelDetails = {
        id: 0,
        title: "",
        imageUrl: "",
        info: "",
        price: 0,
        isLiked: false,
      };
      state.error = action.error as string;
    });

    builder.addCase(postMebelToCart.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      postMebelToCart.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.ok = true; // 'Successfully created'
        state.message = "Successfully created"; // 'Successfully created'
      }
    );
    builder.addCase(postMebelToCart.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error as string;
    });

    builder.addCase(createNewMebel.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      createNewMebel.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.ok = true; // 'Successfully created'
        state.message = "Successfully created"; // 'Successfully created'
      }
    );
    builder.addCase(createNewMebel.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error as string;
    });
  },
});

export const itemsSelector = (state: RootState) => state.items;

export const { setEmptyNotification } = mebelsSlice.actions;

export default mebelsSlice.reducer;

import React from "react";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { MAIN_URL, favoriteUrl, mebelListUrl } from "../api";
import { RootState } from "./store";
import { IAddFavoriteObj, ICartItem, IDeleteItemObj } from "./types";

export interface Item {
  id: number;
  name: string;
  imageUrl: string;
  info: string;
  price: number;
  isLiked: boolean;
  // Add other properties as needed
}

interface ItemsState {
  items: Item[];
  loading: boolean;
  message: "Successfully created" | "Somwthing went wrong" | "";
  ok: boolean;
  error: string | null;
  mebelDetails: Item;
}

const initialState: ItemsState = {
  items: [],
  loading: false,
  ok: false,
  message: "",
  error: null,
  mebelDetails: {
    id: 0,
    name: "",
    imageUrl: "",
    info: "",
    price: 0,
    isLiked: false,
  },
};

export const fetchItems = createAsyncThunk("items/fetchItems", async () => {
  try {
    const response = await fetch(mebelListUrl);
    const data = await response.json();

    return data as Item[];
  } catch (error) {
    throw error;
  }
});

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
    const { setIsAddFavorite, ...rest } = obj;

    try {
      const response = await fetch(favoriteUrl, {
        method: "POST",
        body: JSON.stringify(rest),
      });
      const data = await response.json();

      // console.log(`response`, response);

      if (response.ok) {
        setIsAddFavorite();
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

      console.log(`response`, response);

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
    builder.addCase(
      fetchItems.fulfilled,
      (state, action: PayloadAction<Array<Item>>) => {
        state.loading = false;
        state.items = action.payload;
      }
    );
    builder.addCase(fetchItems.rejected, (state, action) => {
      state.loading = false;
      state.items = [];
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
        name: "",
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

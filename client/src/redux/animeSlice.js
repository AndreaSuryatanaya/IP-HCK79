import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch anime data from API
export const fetchAnime = createAsyncThunk("anime/fetchAnime", async () => {
  const response = await axios.get("https://api.jikan.moe/v4/top/anime");
  return response.data.data;
});

const animeSlice = createSlice({
  name: "anime",
  initialState: {
    animeList: [],
    loading: false,
    error: null,
  },
  reducers: {}, // Tidak ada reducers karena pakai `extraReducers`
  extraReducers: (builder) => {
    builder
      .addCase(fetchAnime.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAnime.fulfilled, (state, action) => {
        state.loading = false;
        state.animeList = action.payload;
      })
      .addCase(fetchAnime.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default animeSlice.reducer;

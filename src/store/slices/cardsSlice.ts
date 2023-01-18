import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface CardsState {
   data: CardsData[];
   currentCard: null | {};
   cards: CardsData[];
   isCardsLoading: boolean;
   isCurrentCardLoading: boolean;
}

interface CardsData {
   id: number;
   featured: boolean;
   title: string;
   url: string;
   imageUrl: string;
   newsSite: string;
   summary: string;
   publishedAt: string;
   launches: [
      {
         id: string;
         provider: string;
      }
   ];
   events: [
      {
         id: string;
         provider: string;
      }
   ];
}

const initialState = {
   data: [],
   currentCard: null,
   cards: [],
   isCardsLoading: false,
   isCurrentCardLoading: false,
} as CardsState;

export const fetchCardsData = createAsyncThunk("cards/fetchCardsData", async (_, { rejectWithValue }) => {
   try {
      const { data } = await axios.get("https://api.spaceflightnewsapi.net/v3/articles").then((data) => data);

      return data;
   } catch (err: any) {
      return rejectWithValue(err.response);
   }
});

export const fetchCardById = createAsyncThunk(
   "cards/fetchCardById",
   async (id: PayloadAction<string>, { rejectWithValue }) => {
      try {
         const { data } = await axios.get(`https://api.spaceflightnewsapi.net/v3/articles/${id}`).then((data) => data);

         return data;
      } catch (err: any) {
         return rejectWithValue(err.response);
      }
   }
);

const cardsSlice = createSlice({
   name: "cards",
   initialState,

   reducers: {
      removeCurrentCard: (state) => {
         state.currentCard = null;
      },

      setFilteredData: (state, action: PayloadAction<string[]>) => {
         state.isCardsLoading = true;

         const intermediateArray: CardsData[] = [];

         state.data.filter((card) => {
            const titleWords: string[] = card.title.split(" ");
            const descriptionWords: string[] = card.summary.split(" ");
            const intermediateArrayLangth = intermediateArray.length;

            titleWords.forEach((titleWord) => {
               if (action.payload.includes(titleWord)) {
                  const intermediateCard = { ...card };
                  intermediateArray.unshift(intermediateCard);
               }
            });

            if (intermediateArrayLangth === intermediateArray.length) {
               descriptionWords.forEach((descriptionWord) => {
                  if (action.payload.includes(descriptionWord)) intermediateArray.push(card);
               });
            }

            state.cards = intermediateArray;
            state.isCardsLoading = false;
         });
      },
   },

   extraReducers: (builder) => {
      builder.addCase(fetchCardsData.pending, (state) => {
         state.isCardsLoading = true;
      });

      builder.addCase(fetchCardsData.fulfilled, (state, action: PayloadAction<[]>) => {
         state.data = action.payload;
         state.cards = action.payload;
         state.isCardsLoading = false;
      });

      builder.addCase(fetchCardsData.rejected, (state) => {
         state.isCardsLoading = false;
      });

      builder.addCase(fetchCardById.pending, (state) => {
         state.isCurrentCardLoading = true;
      });

      builder.addCase(fetchCardById.fulfilled, (state, action: PayloadAction<{}>) => {
         state.currentCard = action.payload;
         state.isCurrentCardLoading = false;
      });

      builder.addCase(fetchCardById.rejected, (state) => {
         state.isCurrentCardLoading = false;
      });
   },
});

export const { removeCurrentCard, setFilteredData } = cardsSlice.actions;

export default cardsSlice.reducer;

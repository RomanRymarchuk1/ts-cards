import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { ICardsState, ICard } from "../../models";
import axios from "axios";
import { textReduction, createReg } from "../../utils";

const initialState: ICardsState = {
   data: [],
   currentCard: {},
   cards: [],
   keyWords: [],
   isCardsLoading: false,
   isCurrentCardLoading: false,
};

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
         state.currentCard = {};
      },

      setKeyWords: (state, action: PayloadAction<string[]>): void => {
         state.keyWords = action.payload;
      },

      resetCardsAndKeyWords: (state) => {
         state.cards = state.data;
         state.keyWords = [];
      },

      setFilteredData: (state, action: PayloadAction<string[]>) => {
         state.isCardsLoading = true;
         const keyWordsArr = action.payload;
         const intermediateArray: ICard[] = [];

         state.data.forEach((card) => {
            let isAdded: boolean = false;

            keyWordsArr.forEach((keyWord) => {
               const re = createReg(keyWord);

               if (re.test(card.title) && !isAdded) {
                  intermediateArray.unshift(card);
                  isAdded = true;
                  return;
               }

               if (re.test(textReduction(card.summary, 100)) && !isAdded) {
                  intermediateArray.push(card);
                  isAdded = true;
                  return;
               }
            });

            state.cards = intermediateArray;
            state.isCardsLoading = false;
         });
      },
   },

   extraReducers: (builder) => {
      builder.addCase(fetchCardsData.pending, (state) => {
         state.isCardsLoading = true;
      });

      builder.addCase(fetchCardsData.fulfilled, (state, action: PayloadAction<ICard[]>) => {
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

      builder.addCase(fetchCardById.fulfilled, (state, action: PayloadAction<ICard>) => {
         state.currentCard = action.payload;
         state.isCurrentCardLoading = false;
      });

      builder.addCase(fetchCardById.rejected, (state) => {
         state.isCurrentCardLoading = false;
      });
   },
});

export const { removeCurrentCard, setKeyWords, setFilteredData, resetCardsAndKeyWords } = cardsSlice.actions;

export default cardsSlice.reducer;

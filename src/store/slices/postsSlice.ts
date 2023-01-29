import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { IPostsState, IPost } from "../../models";
import axios, { AxiosError } from "axios";
import { textReduction, createReg } from "../../utils";

const initialState: IPostsState = {
   data: [],
   currentPost: {} as IPost,
   posts: [],
   keyWords: [],
   isPostsLoading: false,
   isCurrentPostLoading: false,
};

export const fetchPostsData = createAsyncThunk("cards/fetchCardsData", async (_, { rejectWithValue }) => {
   try {
      const { data } = await axios.get("https://api.spaceflightnewsapi.net/v3/articles").then((data) => data);

      return data;
   } catch (err: unknown) {
      const error = err as AxiosError;
      return rejectWithValue(error.response);
   }
});

export const fetchPostById = createAsyncThunk("cards/fetchCardById", async (id: string, { rejectWithValue }) => {
   try {
      const { data } = await axios.get(`https://api.spaceflightnewsapi.net/v3/articles/${id}`).then((data) => data);

      return data;
   } catch (err: unknown) {
      const error = err as AxiosError;
      return rejectWithValue(error.response);
   }
});

const postsSlice = createSlice({
   name: "posts",
   initialState,

   reducers: {
      removeCurrentPost: (state) => {
         state.currentPost = {} as IPost;
      },

      setKeyWords: (state, action: PayloadAction<string[]>): void => {
         state.keyWords = action.payload;
      },

      resetPostsAndKeyWords: (state) => {
         state.keyWords = [];
         state.posts = state.data;
         console.log(state.posts);
      },

      setFilteredData: (state, action: PayloadAction<string[]>): void => {
         state.isPostsLoading = true;
         const keyWordsArr = action.payload;
         const matchInTitleArr: IPost[] = [];
         const intermediateArr: IPost[] = [];

         state.data.forEach((post) => {
            keyWordsArr.forEach((keyWord) => {
               const re = createReg(keyWord);

               if (re.test(post.title) && re.test(textReduction(post.summary, 100))) {
                  matchInTitleArr.unshift(post);
                  return;
               }

               if (re.test(post.title)) {
                  matchInTitleArr.push(post);
                  return;
               }

               if (re.test(textReduction(post.summary, 100))) {
                  intermediateArr.push(post);
                  return;
               }
            });

            state.posts = [...matchInTitleArr, ...intermediateArr];
            state.isPostsLoading = false;
         });
      },
   },

   extraReducers: (builder) => {
      builder.addCase(fetchPostsData.pending, (state) => {
         state.isPostsLoading = true;
      });

      builder.addCase(fetchPostsData.fulfilled, (state, action: PayloadAction<IPost[]>) => {
         state.data = action.payload;
         state.posts = action.payload;
         state.isPostsLoading = false;
      });

      builder.addCase(fetchPostsData.rejected, (state) => {
         state.isPostsLoading = false;
      });

      builder.addCase(fetchPostById.pending, (state) => {
         state.isCurrentPostLoading = true;
      });

      builder.addCase(fetchPostById.fulfilled, (state, action: PayloadAction<IPost>) => {
         state.currentPost = action.payload;
         state.isCurrentPostLoading = false;
      });

      builder.addCase(fetchPostById.rejected, (state) => {
         state.isCurrentPostLoading = false;
      });
   },
});

export const { removeCurrentPost, setKeyWords, setFilteredData, resetPostsAndKeyWords } = postsSlice.actions;

export default postsSlice.reducer;

export interface IPostsState {
   data: IPost[];
   currentPost: IPost;
   posts: IPost[];
   keyWords: string[];
   isPostsLoading: boolean;
   isCurrentPostLoading: boolean;
}

export interface IPost {
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

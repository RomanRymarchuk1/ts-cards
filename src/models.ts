export interface ICardsState {
   data: ICard[];
   currentCard: ICard | {};
   cards: ICard[];
   keyWords: string[];
   isCardsLoading: boolean;
   isCurrentCardLoading: boolean;
}

export interface ICard {
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

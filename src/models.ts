import { MouseEventHandler, ReactNode } from "react";

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

export interface CardProps {
   cardData: ICard;
}

export interface CustomButtonProps {
   m: string;
   onClick: MouseEventHandler;
   children: string | ReactNode;
}

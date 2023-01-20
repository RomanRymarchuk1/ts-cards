/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { styled } from "@mui/material/styles";
import { CircularProgress, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { ICard } from "../../models";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { fetchCardsData } from "../../store/slices/cardsSlice";
import Card from "../Card/Card";

const ResultsCount = styled(Typography)(() => ({
   marginTop: "40px",
   position: "relative",
   "&:after": {
      position: "absolute",
      content: '" "',
      height: "2px",
      width: "100%",
      backgroundColor: "rgba(234, 234, 234, 1)",
      bottom: "-5px",
      borderRadius: "1px",
      left: 0,
      right: 0,
   },
}));

const CardContainer = () => {
   const isCardsLoading: boolean = useAppSelector((store) => store.cards.isCardsLoading);
   const cards: ICard[] = useAppSelector((store) => store.cards.cards);
   const dispatch = useAppDispatch();

   const cardsRender = (data: ICard[]) => (
      <>
         <ResultsCount variant="h3">Results: {data.length}</ResultsCount>
         <Stack sx={{ mt: "50px", gap: "45px", flexDirection: "row", flexWrap: "wrap", justifyContent: "center" }}>
            {data.map((cardData: any) => (
               <Card key={cardData.id} cardData={cardData} />
            ))}
         </Stack>
      </>
   );

   useEffect(() => {
      dispatch(fetchCardsData());
   }, []);

   if (cards.length > 0) return cardsRender(cards);

   if (cards.length === 0 && !isCardsLoading)
      return (
         <Typography sx={{ textAlign: "center", mt: "200px" }} variant="h2">
            Search turned up nothing
         </Typography>
      );

   if (isCardsLoading)
      return (
         <Stack sx={{ justifyContent: "center", alignItems: "center", height: "90vh" }}>
            <CircularProgress />
         </Stack>
      );

   return null;
};

export default CardContainer;

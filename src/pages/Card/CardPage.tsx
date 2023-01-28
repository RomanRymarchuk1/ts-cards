/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect } from "react";
import { Box, CircularProgress, Paper, Stack, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { ReactComponent as Arrow } from "./assets/ArrowLeft.svg";
import { CustomButton } from "../../components";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { fetchCardById, removeCurrentCard } from "../../store/slices/cardsSlice";

const BannerImg = styled(Box)(() => ({
   position: "absolute",
   top: 0,
   width: "100%",
   height: "245px",
   backgroundRepeat: "no-repeat",
   backgroundSize: "cover",
   backgroundPosition: "center",
   zIndex: "-1",
}));

const CardWrapper = styled(Paper)(() => ({
   margin: "150px 75px 0",
   border: "1px solid #EAEAEA",
   borderRadius: "5px",
   boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.05)",
   padding: "0 75px",
}));

const Title = styled(Typography)(() => ({
   marginTop: "35px",
   textAlign: "center",
}));

const Description = styled(Typography)(() => ({
   margin: "50px 0",
}));

const CardPage = () => {
   const navigate = useNavigate();
   const dispatch = useAppDispatch();
   const { id } = useParams();
   const card = useAppSelector((store) => store.cards.currentCard);
   const isLoading = useAppSelector((store) => store.cards.isCurrentCardLoading);

   useEffect(() => {
      if (typeof id === "string") {
         dispatch(fetchCardById(id));
      }
      return () => {
         dispatch(removeCurrentCard());
      };
   }, []);

   if (card) {
      return (
         <>
            <BannerImg sx={{ backgroundImage: ` url(${card.imageUrl})` }} />
            <CardWrapper>
               <Title variant="h2">{card.title}</Title>
               <Description>{card.summary}</Description>
            </CardWrapper>
            <CustomButton onClick={() => navigate("/")} m="35px 0 45px 155px">
               {<Arrow />} Back to homepage
            </CustomButton>
         </>
      );
   }

   if (isLoading)
      return (
         <Stack sx={{ justifyContent: "center", alignItems: "center", height: "90vh" }}>
            <CircularProgress />
         </Stack>
      );

   return null;
};

export default CardPage;

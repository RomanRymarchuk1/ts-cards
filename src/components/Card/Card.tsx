import { CardContent, CardMedia, Card as MuiCard, Typography, styled, Stack } from "@mui/material";
import { ReactComponent as Arrow } from "./assets/ArrowRight.svg";
import { ReactComponent as Date } from "./assets/Date.svg";
import { CustomButton } from "..";
import { textReduction, dateConvesion, textAllocator } from "../../utils";
import { useNavigate } from "react-router-dom";
import parse from "html-react-parser";
import { useAppSelector } from "../../hooks/hooks";
import { ICard } from "../../models";

const CardWrapper = styled(MuiCard)(() => ({
   width: "400px",
   boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.05)",
   border: "1px solid rgba(0, 0, 0, .05)",
   borderRadius: "5px",
   boxSizing: "border-box",
}));

interface CardProps {
   cardData: ICard;
}

const Card = ({ cardData }: CardProps) => {
   const navigate = useNavigate();
   const { title, id, imageUrl, summary, publishedAt } = cardData;
   const keyWords = useAppSelector((store) => store.cards.keyWords);

   const onClick = (): void => {
      navigate(`/${id}`);
   };

   return (
      <CardWrapper>
         <CardMedia sx={{ width: "100%", height: "217px" }} image={imageUrl} />
         <CardContent sx={{ padding: "25px" }}>
            <Stack sx={{ flexDirection: "row", alignItems: "center", gap: "10px" }}>
               <Date />
               <Typography variant="subtitle1" component="p">
                  {dateConvesion(publishedAt)}
               </Typography>
            </Stack>

            <Typography sx={{ paddingTop: "25px" }} variant="h2">
               {keyWords.length > 0 ? parse(textAllocator(title, keyWords, false)) : title}
            </Typography>

            <Typography sx={{ paddingTop: "20px" }} variant="body1">
               {keyWords.length > 0 ? parse(textAllocator(summary, keyWords, true)) : textReduction(summary, 100)}
            </Typography>

            <CustomButton onClick={onClick} m="20px 0 0 0">
               Read more {<Arrow />}
            </CustomButton>
         </CardContent>
      </CardWrapper>
   );
};

export default Card;

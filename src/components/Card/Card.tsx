import { CardContent, CardMedia, Card as MuiCard, Typography, styled } from "@mui/material";
import { ReactComponent as Arrow } from "./assets/ArrowRight.svg";
import { ReactComponent as Date } from "./assets/Date.svg";
import { CustomButton } from "..";
import { Stack } from "@mui/system";
import { textReduction } from "../../utils/textReduction";
import { useNavigate } from "react-router-dom";
import dateConvesion from "../../utils/dateСonversion";

const CardWrapper = styled(MuiCard)(() => ({
   width: "400px",
   boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.05)",
   border: "1px solid rgba(0, 0, 0, .05)",
   borderRadius: "5px",
   boxSizing: "border-box",
}));

const Card = ({ cardData }: any) => {
   const navigate = useNavigate();
   const { title, id, imageUrl, summary, publishedAt }: any = cardData;

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
               {title}
            </Typography>

            <Typography sx={{ paddingTop: "20px" }} variant="body1">
               {textReduction(summary, 100)}
            </Typography>

            <CustomButton onClick={onClick} m="20px 0 0 0">
               Read more {<Arrow />}
            </CustomButton>
         </CardContent>
      </CardWrapper>
   );
};

export default Card;

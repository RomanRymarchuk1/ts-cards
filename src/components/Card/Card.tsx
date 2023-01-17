import { CardContent, CardMedia, Card as MuiCard, Typography, styled } from "@mui/material";
import { ReactComponent as Arrow } from "./assets/ArrowRight.svg";
import { ReactComponent as Date } from "./assets/Date.svg";

import { CustomButton } from "..";
import { Stack } from "@mui/system";

const CardWrapper = styled(MuiCard)(() => ({
   width: "400px",
   boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.05)",
   border: "1px solid rgba(0, 0, 0, .05)",
   borderRadius: "5px",
   boxSizing: "border-box",
}));

const Img = styled(CardMedia)(() => ({
   width: "100%",
   height: "217px",
}));

const ContentContainer = styled(CardContent)(() => ({
   padding: "25px",
}));

const Title = styled(Typography)(() => ({
   paddingTop: "25px",
}));

const Description = styled(Typography)(() => ({
   paddingTop: "20px",
}));

const Card = (props: any) => {
   const { title, imageUrl, summary, publishedAt } = props;
   return (
      <CardWrapper>
         <Img image="https://4lapy.ru/resize/1664x1000/upload/medialibrary/270/2703fd71a17c0843c0b91bbe28c4fe0f.jpg" />
         <ContentContainer>
            <Stack sx={{ flexDirection: "row", alignItems: "center", gap: "10px" }}>
               <Date />
               <Typography variant="subtitle1" component="p">
                  2222 22 22
               </Typography>
            </Stack>

            <Title variant="h2">Lorem ipsum dolor sit amet.</Title>

            <Description variant="body1">
               Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus, perspiciatis maiores rerum maxime
               dolore minus soluta, voluptatibus, quam corrupti ab repellendus? Vero quod a, quaerat magnam quisquam
               fuga qui sit.
            </Description>

            <CustomButton mt="20px">Read more {<Arrow />}</CustomButton>
         </ContentContainer>
      </CardWrapper>
   );
};

export default Card;

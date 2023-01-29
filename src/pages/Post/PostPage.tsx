/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect } from "react";
import { Box, CircularProgress, Paper, Stack, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { ReactComponent as Arrow } from "./assets/ArrowLeft.svg";
import { CustomButton } from "../../components";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { fetchPostById, removeCurrentPost } from "../../store/slices/postsSlice";

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

const PostWrapper = styled(Paper)(() => ({
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

const PostPage = () => {
   const navigate = useNavigate();
   const dispatch = useAppDispatch();
   const { id } = useParams();
   const post = useAppSelector((store) => store.posts.currentPost);
   const isLoading = useAppSelector((store) => store.posts.isCurrentPostLoading);

   useEffect(() => {
      if (typeof id === "string") {
         dispatch(fetchPostById(id));
      }
      return () => {
         dispatch(removeCurrentPost());
      };
   }, []);

   if (post) {
      return (
         <>
            <BannerImg sx={{ backgroundImage: ` url(${post.imageUrl})` }} />
            <PostWrapper>
               <Title variant="h2">{post.title}</Title>
               <Description>{post.summary}</Description>
            </PostWrapper>
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

export default PostPage;

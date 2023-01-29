/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { styled } from "@mui/material/styles";
import { CircularProgress, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { IPost } from "../../models";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { fetchPostsData } from "../../store/slices/postsSlice";
import PostItem from "../PostItem/PostItem";

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

const PostsContainer = () => {
   const isPostsLoading = useAppSelector((store) => store.posts.isPostsLoading);
   const posts: IPost[] = useAppSelector((store) => store.posts.posts);
   const dispatch = useAppDispatch();

   const postsRender = (data: IPost[]) => (
      <>
         <ResultsCount variant="h3">Results: {data.length}</ResultsCount>
         <Stack sx={{ mt: "50px", gap: "45px", flexDirection: "row", flexWrap: "wrap", justifyContent: "center" }}>
            {data.map((postData: IPost) => (
               <PostItem key={postData.id} postData={postData} />
            ))}
         </Stack>
      </>
   );

   useEffect(() => {
      dispatch(fetchPostsData());
   }, []);

   if (posts.length > 0) return postsRender(posts);

   if (posts.length === 0 && !isPostsLoading)
      return (
         <Typography sx={{ textAlign: "center", mt: "200px" }} variant="h2">
            Search turned up nothing
         </Typography>
      );

   if (isPostsLoading)
      return (
         <Stack sx={{ justifyContent: "center", alignItems: "center", height: "90vh" }}>
            <CircularProgress />
         </Stack>
      );

   return null;
};

export default PostsContainer;

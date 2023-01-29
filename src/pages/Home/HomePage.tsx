import { Box } from "@mui/material";
import { PostsContainer, Header } from "../../components";

const HomePage = () => (
   <Box sx={{ m: "50px 75px", px: 0 }}>
      <Header />
      <PostsContainer />
   </Box>
);
export default HomePage;

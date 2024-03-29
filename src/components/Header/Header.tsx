import { ChangeEvent } from "react";
import { ReactComponent as SearchIcon } from "./assets/Search.svg";
import { InputBase, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { resetPostsAndKeyWords, setFilteredData, setKeyWords } from "../../store/slices/postsSlice";
import { useAppDispatch } from "../../hooks/hooks";
import debounce from "lodash.debounce";

const Search = styled("div")(() => ({
   position: "relative",
   border: "1px solid #eaeaea",
   borderRadius: "5px",
   boxShadow: "0 8px 24px rgba(0, 0, 0, .05) ",
   "&:hover": {
      backgroundColor: "rgba(250, 250, 250)",
   },
   marginTop: "10px",
   width: "100%",
   maxWidth: "600px",
}));

const SearchIconWrapper = styled("div")(() => ({
   paddingLeft: "20px",
   height: "100%",
   position: "absolute",
   pointerEvents: "none",
   display: "flex",
   alignItems: "center",
   justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
   color: "inherit",
   padding: theme.spacing(1, 1, 1, 0),
   paddingLeft: "60px",
   transition: theme.transitions.create("width"),
   width: "100%",
}));

const Header = () => {
   const dispatch = useAppDispatch();

   const onChange = (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;

      if (value.length === 0) {
         dispatch(resetPostsAndKeyWords());
         return;
      }

      const keyWords = value.split(" ").filter((word: string) => word !== "");

      dispatch(setKeyWords(keyWords));
      dispatch(setFilteredData(keyWords));
   };

   return (
      <header>
         <Typography variant="h3">Filter by keywords</Typography>
         <Search>
            <SearchIconWrapper>
               <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase onChange={debounce(onChange, 350)} placeholder="Search..." />
         </Search>
      </header>
   );
};

export default Header;

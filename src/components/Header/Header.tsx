import { ReactComponent as SearchIcon } from "./assets/Search.svg";
import { InputBase, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useDispatch } from "react-redux";
import { setFilteredData } from "../../store/slices/cardsSlice";

const Search = styled("div")(() => ({
   position: "relative",
   border: "1px solid #eaeaea",
   borderRadius: "5px",
   boxShadow: "0 8px 24px rgba(0, 0, 0, .05) ",
   "&:hover": {
      backgroundColor: "rgba(250, 250, 250)",
   },
   marginTop: "10px",
   width: "600px",
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
   const dispatch = useDispatch();

   return (
      <header>
         <Typography variant="h3">Filter by keywords</Typography>
         <Search>
            <SearchIconWrapper>
               <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
               onChange={(e) => {
                  const value = e.target.value;

                  if (value[value.length - 1] === " ") {
                     const words = value
                        .split(" ")
                        .slice(0, -1)
                        .filter((word) => word !== "");

                     dispatch(setFilteredData(words));
                  }
               }}
               placeholder="Search..."
            />
         </Search>
      </header>
   );
};

export default Header;

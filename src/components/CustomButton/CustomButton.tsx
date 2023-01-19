import { styled } from "@mui/material/styles";
import { CustomButtonProps } from "../../models";

const MyButton = styled("button")(() => ({
   background: "none",
   border: "none",
   cursor: "pointer",
   fontWeight: 700,
   fontSize: "16px",
   lineHeight: "24px",
   color: "rgba(54, 54, 54, 1)",
   padding: "0",
}));

const CustomButton = (props: CustomButtonProps) => {
   const { m, onClick, children } = props;

   return (
      <MyButton sx={{ m: m }} onClick={onClick}>
         {children}
      </MyButton>
   );
};

export default CustomButton;

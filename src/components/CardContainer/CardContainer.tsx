import styled from "@emotion/styled";
import { Typography } from "@mui/material";
import Card from "../Card/Card";
import { Stack } from "@mui/system";

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

const CardContainer = () => (
   <div>
      <ResultsCount variant="h3">Results: 0</ResultsCount>
      <Stack sx={{ mt: "50px", gap: "45px", flexDirection: "row", flexWrap: "wrap" }}>
         <Card />
         <Card />
         <Card />
         <Card />
         <Card />
      </Stack>
   </div>
);

export default CardContainer;

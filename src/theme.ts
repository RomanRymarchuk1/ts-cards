import { createTheme } from "@mui/material";

const theme = createTheme({
    typography: {
        fontFamily: "Montserrat, sans-serif",

        h2: {
            fontWeight: 400,
            fontSize: "24px",
            lineHeight: "29.26px",
        },

        h3: {
            fontWeight: 600,
            fontSize: "16px",
            lineHeight: "19.5px",
            color: "rgba(54, 54, 54, 1)",
        },

        subtitle1: {
            fontWeight: 400,
            fontSize: "14px",
            lineHeight: "21px",
            color: "rgba(54, 54, 54, 1)",
        },

        body1: {
            fontWeight: 400,
            fontSize: "16px",
            lineHeight: "24px",
            color: "rgba(54, 54, 54, 1)",
        },
        body2: {
            fontWeight: 400,
            fontSize: "18px",
            lineHeight: "27px",
            color: "rgba(0, 0, 0, 1)",
        },
    },
});

export default theme;

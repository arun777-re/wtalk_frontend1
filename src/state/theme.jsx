import { createTheme } from "@mui/material/styles";
import { purple,green,lightGreen } from "@mui/material/colors";


export const chatTheme = createTheme({
    palette:{
        primary:{
            main:purple[500]
        },
        secondary:{
            main:green[500],
        },
    },
    typography:{
        fontFamily:[
            `Roboto`,
            `"Helvetica"`,
            'Arial',
            'sans-serif',
        ].join(','),
        fontSize:4,
    },
    spacing:4,
})
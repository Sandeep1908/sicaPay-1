import { extendTheme, theme as chakraTheme } from "@chakra-ui/react";

import { Typography } from "./typography";
import { ColorPallete } from "./colors";

const breakpoints = {
  sm: '30em',
  md: '48em',
  lg: '62em',
  xl: '80em',
  '2xl': '96em',
}

const OverrideTheme = {
  ...chakraTheme,
  ...Typography,
  ...ColorPallete,
  breakpoints,
  styles: {
    ...chakraTheme.styles,
    global: {
      ...chakraTheme.styles.global,
      body: {
        bg: "#EEF3FF",
        color: "#200000",
      }
    },
  },
};



const Theme = extendTheme(OverrideTheme);
export default Theme;

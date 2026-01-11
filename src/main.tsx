import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { ChakraProvider } from "@chakra-ui/react";

import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  colors: {
    red: {
      1: "#E53E3E",
      2: "#F19595",
    },
    blue: {
      1: "#3182CE",
      2: "#86B6E4",
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </StrictMode>
);

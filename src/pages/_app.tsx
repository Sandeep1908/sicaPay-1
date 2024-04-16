import { type AppType } from "next/app";
import { ChakraProvider } from '@chakra-ui/react'
import {useRouter} from "next/router";

import { api } from "@/utils/api";

// THEME
import Themes from "@/themes";
import ProtectedLayout from "@/layout/Protected";
import {CurrencyProvider} from "@/context/Currency";

const MyApp: AppType = ({ Component, pageProps }) => {

    return (
      <ChakraProvider theme={Themes}>
            <ProtectedLayout>
                <CurrencyProvider>
                    <Component {...pageProps} />
                </CurrencyProvider>
            </ProtectedLayout>
      </ChakraProvider>
  )
};

export default api.withTRPC(MyApp);

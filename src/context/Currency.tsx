import React, {createContext, PropsWithChildren} from "react";
import {api} from "@/utils/api";

type CurrencyContextType = {
    currency: string,
    updateCurrency: (currency: string) => void
    balance: any,
    isBalanceLoading: boolean

}

const CurrencyContext = createContext<CurrencyContextType>({
    currency: 'inr',
    updateCurrency: () => {},
    balance:  {},
    isBalanceLoading: false
})

export const CurrencyProvider: React.FC<PropsWithChildren> = ({children}) => {
    const [currency, setCurrency] = React.useState('inr')

    const {data, isFetching} = api.dashboard.getPortfolioSummaries.useQuery()

    const updateCurrency = (currency: string) => {
        if(!currency) return
        setCurrency(currency)
    }

    return <CurrencyContext.Provider value={{currency, updateCurrency, balance: data?.fiat, isBalanceLoading: isFetching}}>
        {children}
    </CurrencyContext.Provider>
}

export const useCurrency = () => React.useContext(CurrencyContext)


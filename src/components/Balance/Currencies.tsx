import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuItemOption,
    MenuGroup,
    MenuOptionGroup,
    MenuDivider,
    Button,
    Image, Text
} from '@chakra-ui/react'

import {ChevronDownIcon} from '@chakra-ui/icons'
import React from "react";
import {useCurrency} from "@/context/Currency";


type CurrenciesProps = {
    onChange: (currency: string) => void
}

type Currencies = {
    fiat: Record<string, string>,
    crypto: Record<string, string>
}

const Currencies: React.FC<CurrenciesProps> = (props) => {
    const {currency: selectedCurrency} = useCurrency()

    const currencies: Currencies = {
        fiat: {
            'inr': 'Indian Rupees (INR)',
            'aed': 'Arab Emirates Dirham (AED)',
            'gbp': 'British Pound (GBP)',
            'usd': 'US Dollar (USD)',
            'sgd': 'Singapore Dollar (SGD)',
        },
        crypto: {
            'usdt': '$USDT',
        }
    }

    const handleCurrencyChange = (e: any) => {
        props.onChange(e.target.value)
    }

    return <>
        <Menu>
            <MenuButton
                as={Button}
                rightIcon={<ChevronDownIcon />}
                w={'full'}
                size={'xs'}
            >
                {currencies.fiat[selectedCurrency] || currencies.crypto[selectedCurrency]}
            </MenuButton>
            <MenuList minWidth='240px' onClick={handleCurrencyChange}>
                <MenuGroup title='Fiat' color={'gray.700'}>

                    {
                        Object.entries(currencies.fiat).map(([key, value]: [string, string], i) => {
                            return <MenuItem value={key} pl={'2rem'} key={i}>{value}</MenuItem>
                        })
                    }
                </MenuGroup>
                <MenuDivider />
                <MenuGroup title='Crypto' color={'gray.700'}>
                    {
                        Object.entries(currencies.crypto).map(([key, value]: [string, string], i) => {
                            return <MenuItem value={key} pl={'2rem'} key={i}>{value}</MenuItem>
                        })
                    }
                </MenuGroup>
            </MenuList>
        </Menu>
    </>
}

export default Currencies
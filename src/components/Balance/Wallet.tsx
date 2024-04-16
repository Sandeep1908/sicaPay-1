import {
    Stat,
    StatNumber,
    Flex, useToast, Spinner, Button, useDisclosure, StatLabel,
} from '@chakra-ui/react'

// COMPONENTS
import Currencies from "@/components/Balance/Currencies";
import PaymentPrompt from "@/components/Balance/PaymentPrompt";

// CONTEXT
import {useCurrency} from "@/context/Currency";

const Wallet = () => {
    const {currency, updateCurrency, balance, isBalanceLoading} = useCurrency()

    const {isOpen, onClose, onOpen} = useDisclosure()


    const handleCurrencyChange = (c: string) => {
        updateCurrency(c)
    }

    return <>
        <PaymentPrompt
            isOpen={isOpen}
            onClose={onClose}
        />
        <Flex
            bg={'white'}
            borderRadius={'1rem'}
            border={'1px solid'}
            borderColor={'#e7e3eb'}
            p={'1rem'}
        >
            <Stat
                display={'flex'}
                flexDir={'column'}
            >
                <StatLabel mb={'5px'}>Balance: </StatLabel>
                <Currencies
                    onChange={handleCurrencyChange}
                />
                <Flex
                    alignItems={'center'}
                    mt={'5px'}
                >
                    <StatNumber>{!isBalanceLoading && currency && balance && balance[currency ? currency.toLowerCase() : 'inr'].toFixed(3)}</StatNumber>
                </Flex>
                <Flex
                    justify={'center'}
                >
                    <Button
                        size={'sm'}
                        colorScheme={'primary'}
                        variant={'ghost'}
                        onClick={onOpen}
                    >
                        Deposit {currency ? currency.toLowerCase() : 'inr'}
                    </Button>
                </Flex>
            </Stat>
        </Flex>
    </>
}

export default Wallet
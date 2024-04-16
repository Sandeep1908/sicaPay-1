import {ArrowDownIcon} from "@chakra-ui/icons";
import {Button, Container, Flex, FormHelperText, Grid, IconButton, useDisclosure, useToast} from "@chakra-ui/react";
import SwapInput from "@/components/Swap/Input";
import {api} from "@/utils/api";
import React from "react";
import {useCurrency} from "@/context/Currency";
import BankModalPrompt from "@/components/Swap/BankModalPrompt";

const Withdraw = () => {
    const [bonusSica, setBonusSica] = React.useState('0')
    const [selectedBank, setSelectedBank] = React.useState('0')
    const {
        isOpen: isBankModalOpen,
        onOpen: onBankModalOpen,
        onClose: onBankModalClose
    } = useDisclosure()

    const {currency} = useCurrency()

    const {data: balances, isFetching, refetch: refetchBalances} = api.dashboard.getPortfolioSummaries.useQuery()
    const {data: fiatConversion, isFetching: isConverting} = api.exchange.convert.useQuery({
        from: 'usd',
        to: currency,
        amount: Number(bonusSica) * Number(process.env.NEXT_PUBLIC_SICA_PRICE_IN_USD as string)
    }, {
        enabled: bonusSica != '0',
    })

    const toast = useToast()

    const {mutate: withdrawToWallet, isLoading} = api.withdraw.swap.useMutation({
        onSuccess: async () => {
            toast({
                title: 'Swap successful',
                description: 'Your bonus SICA has been swapped successfully',
                status: 'success',
                duration: 3000,
                isClosable: true
            })
            await refetchBalances()

        },
        onError: (err) => {
            toast({
                title: 'Swap failed',
                description: err?.message || 'An error occurred while swapping your bonus SICA',
                status: 'error',
                duration: 3000,
                isClosable: true
            })
        }
    })

    const {mutate: withdrawToBank, isLoading: isWithdrawlToBankInProgress} = api.withdraw.bank.useMutation({
        onSuccess: async () => {
            toast({
                title: 'Withdraw successful',
                description: 'Your bonus SICA with be converted and sent to your bank account, within 48 hours',
                status: 'success',
                duration: 3000,
                isClosable: true
            })
            await refetchBalances()
            onBankModalClose()
            setSelectedBank("")

        },
        onError: (err) => {
            toast({
                title: 'Swap failed',
                description: err?.message || 'An error occurred while swapping your bonus SICA',
                status: 'error',
                duration: 3000,
                isClosable: true
            })
        }
    })

    const handleBonusSicaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBonusSica(e.target.value)
    }

    const handleSwap = async () => {
        if(balances?.sica?.bonus == 0  || balances?.sica?.bonus < Number(bonusSica) ) {
            return toast({
                title: 'Insufficient balance',
                description: 'You do not have enough bonus SICA to swap',
                status: 'error',
                duration: 3000,
                isClosable: true
            })
        }

        await withdrawToWallet({
            amount: Number(bonusSica),
            currency: currency === 'usdt' ? 'usd' : currency,
            txn_id: Date.now().toString()
        })
    }
    const handleWithdrawToBank = async () => {
        if(balances?.sica?.bonus == 0  || balances?.sica?.bonus < Number(bonusSica) ) {
            return toast({
                title: 'Insufficient balance',
                description: 'You do not have enough bonus SICA to swap',
                status: 'error',
                duration: 3000,
                isClosable: true
            })
        }

        await withdrawToBank({
            amount: Number(bonusSica),
            currency: currency === 'usdt' ? 'usd' : currency,
            txn_id: Date.now().toString(),
            bank_id: selectedBank
        })
    }

    return <>
        <BankModalPrompt
            isOpen={isBankModalOpen}
            onClose={onBankModalClose}
            selectedBank={selectedBank}
            updateSelectedBank={(id: string) => setSelectedBank(id)}
            handleClick={handleWithdrawToBank}
            isLoading={isWithdrawlToBankInProgress}
        />
        <Container>
            <Grid
                gap={'1rem'}
            >
                <Flex
                    flexDir={'column'}
                    gap={'1rem'}
                >
                    <SwapInput
                        isStatic
                        balances={balances?.sica as Record<string, string | number>}
                        isFetching={isFetching}
                        value={bonusSica}
                        onChange={handleBonusSicaChange}
                    />

                    <Flex
                        justify={'center'}
                    >
                        <IconButton
                            aria-label={'Swap'}
                            icon={<ArrowDownIcon />}
                            bg={'white'}
                            _hover={{
                                bg: 'white'
                            }}
                            _focus={{
                                bg: 'white'
                            }}
                            _active={{
                                bg: 'white'
                            }}
                            w={'fit-content'}
                            border={'1px solid'}
                            borderColor={'primary.500'}
                            size={'sm'}
                        />
                    </Flex>

                    <SwapInput
                        balances={balances?.fiat as Record<string, string | number>}
                        isFetching={isFetching}
                        onChange={() => {}}
                        value={fiatConversion?.result?.toFixed(2) || '0'}
                        helperText={isConverting ? 'Converting...' : 'You will receive this amount in your wallet'}
                    />
                    <Button
                        colorScheme={'primary'}
                        size={'lg'}
                        disabled={balances?.sica?.bonus == 0 || balances?.sica?.bonus < Number(bonusSica)}
                        opacity={balances?.sica?.bonus == 0  || balances?.sica?.bonus < Number(bonusSica) ? 0.5 : 1}
                        cursor={balances?.sica?.bonus == 0  || balances?.sica?.bonus < Number(bonusSica) ? 'not-allowed' : 'pointer'}
                        onClick={balances?.sica?.bonus == 0  || balances?.sica?.bonus < Number(bonusSica)  ? () => {} : onBankModalOpen}
                        isLoading={isWithdrawlToBankInProgress}
                    >
                        Withdraw to Bank Account
                    </Button>
                    <Button
                        colorScheme={'primary'}
                        size={'lg'}
                        disabled={balances?.sica?.bonus == 0 || balances?.sica?.bonus < Number(bonusSica)}
                        opacity={balances?.sica?.bonus == 0  || balances?.sica?.bonus < Number(bonusSica) ? 0.5 : 1}
                        cursor={balances?.sica?.bonus == 0  || balances?.sica?.bonus < Number(bonusSica) ? 'not-allowed' : 'pointer'}
                        onClick={handleSwap}
                        isLoading={isLoading}
                        variant={'outline'}
                    >
                        Withdraw to Wallet
                    </Button>
                </Flex>
            </Grid>


        </Container>
    </>
}

export default  Withdraw
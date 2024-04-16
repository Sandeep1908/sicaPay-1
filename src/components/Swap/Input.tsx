import {Box, Button, Flex, Input, Skeleton, Spinner, Stat, StatLabel, StatNumber, Text} from "@chakra-ui/react";

// COMPONENTS
import Currencies from "@/components/Balance/Currencies";
import {useCurrency} from "@/context/Currency";
import React from "react";
import {api} from "@/utils/api";

type SwapInputProps = {
    isStatic?: boolean,
    balances: Record<string, string | number>,
    isFetching: boolean,
    value: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    helperText?: string
}
const SwapInput: React.FC<SwapInputProps> = (props) => {


    const {currency, updateCurrency} = useCurrency()
    const handleMax = () => {
        props.onChange({
            target: {
                value: props.balances?.bonus as string
            }
        } as any)
    }

    return <>
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
                <Flex
                    alignItems={'flex-end'}
                    justifyContent={'space-between'}
                >
                    <Box w={'fit-content'}>
                        {
                            props.isStatic ? <Text fontWeight={700} color={'gray.600'}>Bonus SICA</Text> : <Currencies
                                onChange={updateCurrency}
                            />
                        }
                    </Box>
                    <Skeleton isLoaded={!props.isFetching}>
                        <StatLabel mb={'5px'}>Balance: {props.isStatic ? props.balances?.bonus : props.balances && props.balances[currency.toLowerCase()]} {props.isStatic ? "SICA" : currency.toUpperCase()}</StatLabel>
                    </Skeleton>

                </Flex>
                <Flex
                    flexDir={'column'}
                    my={'1rem'}

                >
                    <Input
                        type={'number'}
                        size={'lg'}
                        variant={'filled'}
                        rounded={'full'}
                        border={'2px solid'}
                        borderColor={'#e7e3eb'}
                        placeholder={'100.00'}
                        value={props.value}
                        onChange={props.onChange}
                    />
                    {
                        props.helperText && <small>{props.helperText}</small>
                    }
                </Flex>
                {
                    props.isStatic &&
                    <Button
                        size={'sm'}
                        variant={'outline'}
                        colorScheme={'primary'}
                        float={'right'}
                        onClick={handleMax}
                    >
                        MAX
                    </Button>
                }
            </Stat>
        </Flex>
    </>
}

export default SwapInput
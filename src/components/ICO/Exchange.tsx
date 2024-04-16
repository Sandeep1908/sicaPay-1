import {
    Flex,
    FormControl,
    FormLabel,
    Input,
    FormHelperText,
    Button,
    Box,
    Slider,
    SliderTrack,
    SliderFilledTrack,
    SliderThumb,
    SliderMark,
    useBoolean,
    useToast,
    useDisclosure,
    Table,
    Thead,
    Tr,
    Th,
    Tbody,
    Td,
    TableContainer,
    MenuList,
    MenuButton,
    MenuItem,
    Menu,
    HStack, Heading
} from "@chakra-ui/react";
import Image from "next/image";

// ASSET
import SICA from "@/assets/SICA.png";
import React, {useEffect, useState} from "react";

// TYPES
import {useCurrency} from "@/context/Currency";
import {api} from "@/utils/api";
import SubscriptionModal from "@/components/ICO/SubscriptionModal";
import {ChevronDownIcon} from "@chakra-ui/icons";
import RadioCard from "@/components/ICO/LockinPerids";
import {useRadioGroup} from "@chakra-ui/react";
import {SubscriptionDuration, subscriptionObject} from "@/utils/subscriptionObject";

const Exchange = () => {

    const [amount, setAmount] = useState(100);
    const [duration, setDuration] = useState<SubscriptionDuration>('1 Year');
    const { isOpen, onOpen, onClose } = useDisclosure()

    const options = ['1 Year', '2 Years', '3 Years']

    const { getRootProps, getRadioProps } = useRadioGroup({
        name: 'subscription',
        defaultValue: '1 Year',
        onChange: (value) => setDuration(value as SubscriptionDuration)
    })

    const group = getRootProps()

    const toast = useToast()

    const {mutate, isLoading: isTransferring} = api.sales.buySICA.useMutation({
        onSuccess: () => {
            toast({
                title: 'Success',
                description: 'Your purchase request has been processed, refresh the page to see your new balance',
                status: 'success',
                duration: 3000,
            })
        }
    });

    const {currency, balance} = useCurrency()

    const {data: usdConversion} = api.exchange.convert.useQuery({
        from: currency === 'usdt' ? 'usd' : currency,
        to: 'usd',
        amount,
    })
    console.log({usdConversion})
    const handleAmountChange = (value: number) => {
        setAmount(Math.round(value))
        // setIsSelectingUSDTAmount(true)
        // setIsCheckingAllowance.on()
    }

    const handleSubmit = async () => {
       if(balance && balance[currency.toLowerCase()] < amount) {
           return toast({
                title: 'Insufficient Balance',
                description: 'You do not have sufficient balance to make this purchase',
                status: 'error',
                duration: 3000,
               isClosable: true
           })
       }
       await mutate({
            amount: amount,
            currency: currency,
            txn_id: Date.now().toString(),
            duration
        })
    }

    return <>
        <SubscriptionModal isOpen={isOpen} onClose={onClose} />

        <Flex
            w={'100%'}
            h={{base: 'auto'}}
            bg={'white'}
            borderRadius={'1rem'}
            border={'1px solid'}
            borderColor={'#e7e3eb'}
            p={'2rem'}
        >
            <Flex
                flexDir={'column'}
                w={'100%'}
                gap={'1rem'}
            >
                <FormControl>
                    <FormLabel>Buy with {currency.toUpperCase()}</FormLabel>
                    <Slider
                        aria-label='slider-ex-6'
                        onChange={handleAmountChange}
                        step={100} min={100} max={2000000}
                        my={'1.2rem'}
                        defaultValue={100}
                    >
                        <SliderMark
                            value={amount || 100}
                            textAlign='center'
                            bg='blue.500'
                            color='white'
                            mt='-10'
                            ml='-5'
                            w='12'
                        >
                            {amount}
                        </SliderMark>
                        <SliderTrack >
                            <SliderFilledTrack />
                        </SliderTrack>
                        <SliderThumb bg={'primary.500'} />
                    </Slider>
                    <FormHelperText>
                        Slide to choose the USDT amount to exchange
                    </FormHelperText>
                </FormControl>
                <Flex
                    direction={'column'}
                    gap={'.8rem'}
                >
                    <Heading
                        size={'sm'}
                    >
                        Select Locking Period
                    </Heading>
                    <HStack {...group}>
                        {options.map((value) => {
                            const radio = getRadioProps({ value })
                            return (
                                <RadioCard key={value} {...radio}>
                                    {value}
                                </RadioCard>
                            )
                        })}
                    </HStack>
                </Flex>

                <FormControl>
                    <Flex>
                        <FormLabel>$SICA</FormLabel>
                        <Box
                            w={'20px'}
                            h={'20px'}
                            pos={'relative'}
                            ml={'-5px'}
                        >
                            <Image src={SICA} alt={'SICA Icon'} layout={'fill'} />
                        </Box>
                    </Flex>
                    <Input
                        type='number'
                        variant={'filled'}
                        placeholder={'0'}
                        rounded={'full'}
                        size={'lg'}
                        boxShadow={'md'}
                        value={parseFloat(usdConversion?.amount) / subscriptionObject[duration || '1 Year'] || 0}
                        readOnly
                        cursor={'not-allowed'}
                    />
                    <FormHelperText>
                        This is the amount of $SICA you would recieve
                    </FormHelperText>
                </FormControl>

                <Button
                    mt={'.5rem'}
                    size={'lg'}
                    colorScheme={'primary'}
                    rounded={'1rem'}
                    isLoading={isTransferring}
                    loadingText={'Purchasing $SICA'}
                    onClick={handleSubmit}
                    disabled={balance && balance[currency.toLowerCase()] < amount}
                    opacity={balance && balance[currency.toLowerCase()] < amount ? .5 : 1}
                    cursor={balance && balance[currency.toLowerCase()] < amount ? 'not-allowed' : 'pointer'}
                >
                    Subscribe to SICA with {currency.toUpperCase()}
                </Button>
            </Flex>

        </Flex>
    </>
}

export default Exchange
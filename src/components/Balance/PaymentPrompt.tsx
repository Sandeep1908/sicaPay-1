import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    useToast,
    Image,
    Grid,
    Flex,
    Heading,
    Text,
    Input,
    FormControl,
    FormHelperText,
    FormLabel,
    AlertIcon,
    Alert, Box,
} from '@chakra-ui/react'
import React from "react";

// DATA
import {bankList, cryptoList, Currency} from "@/data/bank";
import {useCurrency} from "@/context/Currency";
import {api} from "@/utils/api";

type PaymentPromptProps = {
    isOpen: boolean,
    onClose: () => void
}

const PaymentPrompt: React.FC<PaymentPromptProps> = ({isOpen, onClose}) => {
    const [txnRef, setTxnRef] = React.useState('')
    const {currency: selectedCurrency} = useCurrency()

    const toast = useToast()

    const {mutate, isLoading} = api.deposit.deposit.useMutation({
        onSuccess: (data) => {
            setTxnRef('')
            onClose()
            toast({
                title: 'Success',
                description: 'Your deposit request has been submitted, please wait for 48 hours for the deposit to reflect in your account',
                status: 'success',
                duration: 3000,
            })
        },
        onError: (err: any) => {
            toast({
                title: 'Error',
                description: err?.response?.data?.message || 'An error occurred while submitting your deposit request',
                status: 'error',
                duration: 5000,
            })
        }
    })

    const copyToClipboard = async (str: string) => {
       try {
           await window.navigator.clipboard.writeText(str)
           toast({
               title: 'Copied',
               description: 'Copied to clipboard',
               status: 'success',
               duration: 2000,
           })
       } catch (err: any) {
              toast({
                title: 'Error',
                description: 'An error occurred while copying address to clipboard',
                status: 'error',
                duration: 5000,
              })
       }
    }

    const handleTxnRefChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTxnRef(e.target.value)
    }

    const handleSubmit= async () => {
        await mutate({
            currency: selectedCurrency,
            txn_id: txnRef
        })
    }

    const handleOnClose = () => {
        setTxnRef('')
        onClose()
    }

    return <>
        <Modal isOpen={isOpen} onClose={handleOnClose} size={'lg'}>
            <ModalOverlay />
            <ModalContent w={'100%'}>
                <ModalHeader>Deposit {selectedCurrency.toUpperCase()}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Flex
                       flexDir={'column'}
                       gap={'1rem'}
                    >
                        <Alert status='info' size={'sm'}>
                            <AlertIcon />
                            Click on any of the below details to copy it to clipboard
                        </Alert>
                        {
                            selectedCurrency !== 'usdt' &&
                            <Grid
                                gridTemplateColumns={{
                                    base: '1fr',
                                    md: '1fr 1fr',
                                }}
                                gap={'1rem'}
                            >
                                {
                                    bankList[selectedCurrency.toUpperCase() as Currency] &&
                                    Object.entries(bankList[selectedCurrency.toUpperCase() as Currency]).map(([key, value], i) => {
                                        return <Flex
                                            w={'full'}
                                            flexDir={'column'}
                                            alignItems={'flex-start'}
                                            key={i}
                                            onClick={() => copyToClipboard(value)}
                                        >

                                            <Heading
                                                as={'h6'}
                                                size={'sm'}
                                                color={'primary.700'}
                                            >
                                                {key}
                                            </Heading>
                                            <Text
                                                color={'gray.600'}
                                                fontSize={'sm'}
                                                fontWeight={600}
                                            >
                                                {value || "-"}
                                            </Text>
                                        </Flex>
                                    })

                                }
                            </Grid>
                        }
                        {
                            selectedCurrency === 'usdt' &&
                                cryptoList[selectedCurrency.toUpperCase() as 'USDT'] &&
                                    Object.entries(cryptoList[selectedCurrency.toUpperCase() as 'USDT']).map(([key, value], i) => {
                                        return <>
                                            <Flex
                                                w={'full'}
                                                flexDir={'column'}
                                                gap={'1rem'}
                                                key={i}
                                                alignItems={'center'}
                                                justify={'center'}
                                                onClick={() => copyToClipboard(key)}
                                            >
                                                <Box
                                                    w={'200px'}
                                                    h={'200px'}
                                                >
                                                    <Image
                                                        src={value}
                                                        w={'full'}
                                                        h={'full'}
                                                        alt={'crypto address in qr code'}
                                                    />
                                                </Box>
                                                <Text
                                                    color={'gray.600'}
                                                    fontSize={'md'}
                                                    fontWeight={600}
                                                >
                                                    {key}
                                                </Text>
                                            </Flex>
                                            <Button
                                                colorScheme={'primary'}
                                                onClick={() => copyToClipboard(key)}
                                                variant={'ghost'}
                                            >
                                                Copy addreess
                                            </Button>
                                        </>
                                    })
                        }
                        <Flex
                            bg={'gray.50'}
                            p={'1rem'}
                            border={'1px solid'}
                            borderColor={'gray.200'}
                        >
                            <FormControl>
                                <FormLabel>Once the trasaction is complete, please enter the transaction number here,
                                    in case of crypto enter the transaction hash.</FormLabel>
                                <Input
                                    type='text'
                                    placeholder={'enter here'}
                                    border={'1px solid'}
                                    borderColor={'gray.500'}
                                    onChange={handleTxnRefChange}
                                    value={txnRef}
                                />
                                <FormHelperText>This verification and deposit takes less than 48 hours.</FormHelperText>
                            </FormControl>
                        </Flex>
                    </Flex>
                </ModalBody>
                <ModalFooter>
                    <Button variant='ghost'mr={3} onClick={handleOnClose}>
                        Close
                    </Button>
                    <Button
                        colorScheme={'primary'}
                        opacity={txnRef ? 1 : 0.5}
                        cursor={txnRef ? 'pointer' : 'not-allowed'}
                        onClick={txnRef ? handleSubmit : () => {}}
                        isLoading={isLoading}
                        loadingText={'Submitting'}
                    >
                        Complete Deposit
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    </>
}
export default PaymentPrompt
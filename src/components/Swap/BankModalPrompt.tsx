import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton, Button,
    Text, Grid, Card, Heading, Flex
} from '@chakra-ui/react'
import React from "react";
import {api} from "@/utils/api";
import Link from "next/link";


type BankModalPromptProps = {
    isOpen: boolean,
    onClose: () => void
    selectedBank: string,
    updateSelectedBank: (bank: string) => void,
    handleClick: VoidFunction,
    isLoading?: boolean
}
const BankModalPrompt: React.FC<BankModalPromptProps> = ({isOpen, onClose, ...props}) => {
    const {data: bankAccounts, isFetching: isFetchingBankAccounts} = api.user.getBankAccounts.useQuery()
    return (
        <Modal isOpen={isOpen} onClose={onClose} size={'xl'}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Choose Bank Account</ModalHeader>
                <ModalCloseButton />
                <ModalBody
                    w={'100%'}
                >
                    {
                        bankAccounts?.accounts?.length === 0 &&
                        (
                            <>
                                <Flex
                                    direction={'column'}
                                    gap={'10px'}
                                    alignItems={'center'}
                                    justifyContent={'center'}
                                    w={'100%'}
                                    border={'1px solid black'}
                                >
                                    <Heading size={'md'}>
                                        No bank accounts linked
                                    </Heading>
                                    <Link href={"/profile"}>
                                        <Button colorScheme={'primary'} size={'xs'}>Add Bank Account</Button>
                                    </Link>
                                </Flex>
                            </>
                        )
                    }
                    <Grid
                        gridTemplateColumns={{
                            base: 'repeat(1, 1fr)',
                            md: 'repeat(2, 1fr)',
                        }}
                        width={'100%'}
                        gap={'1rem'}
                    >
                        {
                            bankAccounts?.accounts?.map((account, index) => {
                                return (
                                    <Card
                                        key={account?.id}
                                        p={'20px'}
                                        bg={'white'}
                                        border={'1px solid'}
                                        borderColor={props.selectedBank == account?.id ? 'primary.500' : 'gray.200'}
                                        cursor={'pointer'}
                                        transition={'all .2s linear'}
                                        _hover={{
                                            bg: 'primary.50'
                                        }}
                                        onClick={() => props.updateSelectedBank(account?.id) }
                                    >
                                        <Flex
                                            direction={'column'}
                                            gap={'10px'}
                                        >
                                            <Flex
                                                direction={'column'}
                                            >
                                                <Heading size={'xs'} color={'gray.500'}>Bank Name</Heading>
                                                <Text fontSize={'sm'} fontWeight={'semibold'}>{account.bank}</Text>
                                            </Flex>
                                            <Flex
                                                direction={'column'}
                                            >
                                                <Heading size={'xs'} color={'gray.500'}>Account Number</Heading>
                                                <Text fontSize={'sm'} fontWeight={'semibold'}>{account.account}</Text>
                                            </Flex>
                                            <Flex
                                                direction={'column'}
                                            >
                                                <Heading size={'xs'} color={'gray.500'}>IFSC Code</Heading>
                                                <Text fontSize={'sm'} fontWeight={'semibold'}>{account.ifsc}</Text>
                                            </Flex>
                                            <Flex
                                                direction={'column'}
                                            >
                                                <Heading size={'xs'} color={'gray.500'}>Account Holder Name</Heading>
                                                <Text fontSize={'sm'} fontWeight={'semibold'}>{account.name}</Text>
                                            </Flex>
                                            <Flex
                                                direction={'column'}
                                            >
                                                <Heading size={'xs'} color={'gray.500'}>Address</Heading>
                                                <Text fontSize={'sm'} fontWeight={'semibold'}>{account.address}</Text>
                                            </Flex>
                                        </Flex>
                                    </Card>
                                )
                            })
                        }
                    </Grid>
                </ModalBody>
                <ModalFooter>
                    <Button variant="ghost" mr={3} onClick={onClose}>
                        Close
                    </Button>
                    <Button colorScheme={'primary'} onClick={props.handleClick} isLoading={props.isLoading}>Withdraw</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default BankModalPrompt
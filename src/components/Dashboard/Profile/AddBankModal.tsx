import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton, Button, Flex, Grid, Input, FormControl, FormHelperText, FormLabel, useToast,
} from '@chakra-ui/react'
import React from "react";
import {addPathPrefix} from "next/dist/shared/lib/router/utils/add-path-prefix";
import {api} from "@/utils/api";

type AddBankModalProps = {
    isOpen: boolean,
    onClose: () => void,
    refetchBank: VoidFunction
}
const AddBankModal: React.FC<AddBankModalProps> = (props) => {
    const [bankName, setBankName] = React.useState('')
    const [accountNo, setAccountNo] = React.useState('')
    const [ifscCode, setIfscCode] = React.useState('')
    const [accountHolderName, setAccountHolderName] = React.useState('')
    const [bankAddress, setBankAddress] = React.useState('')

    const toast = useToast()

    const {mutate, isLoading} = api.user.addBankAccount.useMutation({
        onSuccess: () => {
            setBankName('')
            setAccountNo('')
            setIfscCode('')
            setAccountHolderName('')
            setBankAddress('')
            toast({
                title: 'Success',
                description: 'Bank account added successfully',
                status: 'success',
                duration: 5000,
            })
            props.onClose()
            props.refetchBank()
        },
        onError: (err: any) => {
            toast({
                title: 'Error',
                description: err.response.data.message,
                status: 'error',
                duration: 5000,
            })
        }
    });
    const handleBankNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBankName(e.target.value)
    }

    const handleAccountNoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAccountNo(e.target.value)
    }

    const handleIfscCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIfscCode(e.target.value)
    }

    const handleAccountHolderNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAccountHolderName(e.target.value)
    }

    const handleBankAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBankAddress(e.target.value)
    }

    const handleSubmit = () => {
        mutate({
            bank: bankName,
            acc_number: accountNo,
            name: accountHolderName,
            ifsc: ifscCode,
            address: bankAddress
        })
    }
    return <>
        <Modal isOpen={props.isOpen} onClose={props.onClose} size={'lg'}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Add new Bank Account</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Flex
                        flexDir={'column'}
                        gap={'1rem'}
                    >
                        <FormControl>
                            <FormLabel>Bank Name</FormLabel>
                            <Input
                                type='text'
                                placeholder='Enter Bank Name'
                                value={bankName}
                                onChange={handleBankNameChange}
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Account no</FormLabel>
                            <Input
                                type='text'
                                placeholder='Enter Account no'
                                value={accountNo}
                                onChange={handleAccountNoChange}
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel>IFSC code</FormLabel>
                            <Input
                                type='text'
                                placeholder='Enter IFSC code'
                                value={ifscCode}
                                onChange={handleIfscCodeChange}
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Account Holder Name</FormLabel>
                            <Input
                                type='text'
                                placeholder='Enter Account Holder Name'
                                value={accountHolderName}
                                onChange={handleAccountHolderNameChange}
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Bank Address (Optional)</FormLabel>
                            <Input
                                type='text'
                                placeholder='Enter Bank Address'
                                value={bankAddress}
                                onChange={handleBankAddressChange}
                            />
                        </FormControl>
                    </Flex>
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme='primary' variant='ghost' mr={3} onClick={props.onClose}>
                        Close
                    </Button>
                    <Button
                        colorScheme={'primary'}
                        onClick={handleSubmit}
                        isLoading={isLoading}
                    >
                        Add Bank Account
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    </>
}

export default AddBankModal
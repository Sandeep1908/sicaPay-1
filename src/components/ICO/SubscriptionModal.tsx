import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton, Button,
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
} from '@chakra-ui/react'
import React from "react";

type SubscriptionModalProps = {
    isOpen: boolean,
    onClose: () => void
}
const subscriptionModal: React.FC<SubscriptionModalProps> = ({isOpen, onClose}) => {
    return <>
        <Modal isOpen={isOpen} onClose={onClose} size={'lg'}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>$SICA Subscription option</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <TableContainer>
                        <Table variant='simple'>
                            <Thead>
                                <Tr>
                                    <Th>Locking Period</Th>
                                    <Th>Price per $SICA</Th>
                                    <Th></Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                <Tr>
                                    <Td>1 Year</Td>
                                    <Td>$12</Td>
                                    <Td>
                                        <Button
                                            colorScheme='primary'
                                            variant={'ghost'}
                                            size={'sm'}
                                        >
                                            Buy now
                                        </Button>
                                    </Td>
                                </Tr>
                                <Tr>
                                    <Td>2 Year</Td>
                                    <Td>$10.5</Td>
                                    <Td>
                                        <Button
                                            colorScheme='primary'
                                            variant={'ghost'}
                                            size={'sm'}
                                        >
                                            Buy now
                                        </Button>
                                    </Td>
                                </Tr>
                                <Tr>
                                    <Td>3 Year</Td>
                                    <Td>$9</Td>
                                    <Td>
                                    <Button
                                        colorScheme='primary'
                                        variant={'ghost'}
                                        size={'sm'}
                                    >
                                        Buy now
                                    </Button>
                                </Td>

                                </Tr>
                            </Tbody>
                        </Table>
                    </TableContainer>
                </ModalBody>
            </ModalContent>
        </Modal>
    </>
}

export default subscriptionModal
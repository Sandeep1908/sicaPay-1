import {
    Stat,
    StatLabel,
    StatNumber,
    Spinner,
    Flex, Avatar, Button, useBoolean, Input, useToast,
} from '@chakra-ui/react'
import {useEffect, useState} from "react";
import {api} from "@/utils/api";
import {useRouter} from "next/router";

const BonusSICA = () => {

    const [showStakeInput, setShowStakeInput] = useBoolean()
    const [amount, setAmount] = useState(0);

    const toast = useToast()

    const {data: balances, isFetching} = api.dashboard.getPortfolioSummaries.useQuery()
    const {mutate, isLoading} = api.sales.stakeBonusSICA.useMutation({
        onSuccess: (data) => {
            toast({
                title: "Success",
                description: data.message,
                status: "success",
                duration: 3000,
                isClosable: true,
            })
        },
        onError: (error) => {
            toast({
                title: "An error occurred.",
                description: error.message,
                status: "error",
                duration: 3000,
                isClosable: true,
            })
        }
    })

    const router = useRouter()

    const handleRedeem = () => {
        router.push('/withdraw')
    }

    const handleMax = () => {
        setAmount(balances?.sica?.bonus)
    }

    const handleStake = async () => {
        await mutate({
            amount
        })
    }

    return <>
        <Flex
            flexDir={'column'}
            bg={'white'}
            borderRadius={'1rem'}
            border={'1px solid'}
            borderColor={'#e7e3eb'}
            p={'1rem'}
        >
            <Flex
                alignItems={'center'}
            >
                <Stat>
                    <StatLabel>Bonus $SICA</StatLabel>
                    <StatNumber>{
                        isFetching ? <Spinner size={'sm'} /> : balances?.sica?.bonus.toFixed(3) || 0
                    }</StatNumber>
                </Stat>
                <Avatar
                    src='https://i.ibb.co/sKSwtRB/SICA.png'
                    size={{
                        base: 'sm',
                        md: 'md'
                    }}
                    name='Segun Adebayo'
                    ml={-1}
                    mr={2}
                />
            </Flex>
            {
                Boolean(balances?.sica?.bonus) &&
                (
                    <Flex
                        flexDir={'column'}
                        gap={'5px'}
                    >
                        <Flex
                            justify={'center'}
                        >
                            <Button
                                size={'xs'}
                                variant={'ghost'}
                                colorScheme={'primary'}
                                onClick={handleRedeem}
                            >
                                Redeem Now
                            </Button>
                            <Button
                                size={'xs'}
                                variant={'ghost'}
                                colorScheme={'primary'}
                                onClick={() => setShowStakeInput.toggle()}
                            >
                                Stake Now
                            </Button>
                        </Flex>
                        {
                            showStakeInput &&
                            (
                                <Flex
                                    flexDir={'column'}
                                    gap={'5px'}
                                >
                                    <Flex
                                        gap={'5px'}
                                    >
                                        <Input
                                            size={'xs'}
                                            placeholder={'amount'}
                                            value={amount}
                                            onChange={(e) => setAmount(Number(e.target.value))}
                                        />
                                        <Button
                                            size={'xs'}
                                            onClick={handleMax}
                                        >
                                            Max
                                        </Button>
                                    </Flex>
                                    <Button
                                        size={'xs'}
                                        colorScheme={'primary'}
                                        isLoading={isLoading}
                                        onClick={handleStake}
                                    >
                                        Proceed
                                    </Button>
                                </Flex>
                            )
                        }
                    </Flex>
                )
            }
        </Flex>
    </>
}

export default BonusSICA
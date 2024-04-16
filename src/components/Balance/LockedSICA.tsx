import {
    Stat,
    StatLabel,
    StatNumber,
    Spinner,
    Flex, Avatar, Button,
} from '@chakra-ui/react'
import {useEffect, useState} from "react";
import {api} from "@/utils/api";

const USDT = () => {
    const [redeemable, setRedeemable] = useState(0);

    const {data: balances, isFetching} = api.dashboard.getPortfolioSummaries.useQuery()

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
                    <StatLabel>Locked $SICA</StatLabel>
                    <StatNumber>{
                        isFetching ? <Spinner size={'sm'} /> : balances?.sica?.staked.toFixed(3) || 0
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
                Boolean(redeemable) &&
                <Button
                    size={'xs'}
                    variant={'ghost'}
                    colorScheme={'primary'}
                >
                    Redeem {redeemable}
                </Button>
            }
        </Flex>
    </>
}

export default USDT
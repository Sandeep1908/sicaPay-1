import {
    Box,
    Flex,
    Heading,
    Stat,
    StatLabel,
    StatNumber,
    Progress, useBoolean
} from "@chakra-ui/react";
import Image from "next/image";

// ASSET
import SICA from "@/assets/SICA.png";
import {useState} from "react";
import {api} from "@/utils/api";

const Stats = () => {

    const {data, isFetching} = api.sales.getSales.useQuery()

    console.log(data?.totalSales?.reduce((acc, curr) => acc + curr.SICA, 0) )

    return <>
        <Flex
            w={'100%'}
            h={'100%'}
            bg={'white'}
            borderRadius={'1rem'}
            border={'1px solid'}
            borderColor={'#e7e3eb'}
            p={'2rem'}
            flexDir={'column'}
            justify={'space-between'}
        >
            <Flex
                flexDir={'column'}
                gap={'5px'}
            >
                {
                    isFetching
                        ? <Flex>
                            <Heading size={'md'}>
                                Fetching sales data...
                            </Heading>
                        </Flex>
                        : <>
                            <Stat>
                                <StatLabel>Total Sold</StatLabel>
                                <Flex
                                    alignItems={'baseline'}
                                    gap={'5px'}
                                >
                                    <StatNumber>{
                                        data?.totalSales?.reduce((acc, curr) => acc + curr.SICA, 0).toFixed(3)
                                    }</StatNumber>
                                    <Flex alignItems={'center'}>
                                        <StatLabel fontSize={'xs'} fontWeight={'700'}>$SICA</StatLabel>

                                        <Box
                                            w={'12px'}
                                            h={'12px'}
                                            pos={'relative'}
                                        >
                                            <Image src={SICA} alt={'SICA Icon'} layout={'fill'} />
                                        </Box>
                                    </Flex>
                                </Flex>
                            </Stat>
                            <Progress hasStripe value={(data?.totalSales?.reduce((acc, curr) => acc + curr.SICA, 0) || 0) / 10000000} colorScheme={'primary'} rounded={'full'} />
                            <Stat alignSelf={'flex-end'}>
                                <StatLabel>/ 10 Million $SICA</StatLabel>
                            </Stat>
                        </>
                }
            </Flex>

        </Flex>
    </>
}

export default Stats


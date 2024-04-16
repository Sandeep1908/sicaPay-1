import {
    Stat,
    StatLabel,
    StatNumber,
    Spinner,
    Flex, useBoolean,
} from '@chakra-ui/react'
import React, {useEffect, useState} from "react";

type PortfolioItemProps = {
    currency: string,
    symbol: string,
    value: number | string,
    isFetching?: boolean
}

const PortfolioItem: React.FC<PortfolioItemProps> = (props) => {
    return <>
        <Flex
            bg={'white'}
            borderRadius={'1rem'}
            border={'1px solid'}
            borderColor={'#e7e3eb'}
            p={'1rem'}
            alignItems={'center'}
        >
            <Stat>
                <StatLabel
                    color={'gray.500'}
                    fontSize={'sm'}
                    fontWeight={'semibold'}
                >
                    {props.currency}
                </StatLabel>
                <StatNumber>{
                    props.isFetching ? <Spinner size={'sm'} /> : `${props.value} ${props.symbol}`
                }</StatNumber>
            </Stat>
        </Flex>
    </>
}

export default PortfolioItem
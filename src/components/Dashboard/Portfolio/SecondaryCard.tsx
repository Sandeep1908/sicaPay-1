import {
    Stat,
    StatLabel,
    StatNumber,
    Spinner,
    Flex, useBoolean,
} from '@chakra-ui/react'
import React, {useEffect, useState} from "react";

type PortfolioSecondaryItemProps = {
    currency: string,
    symbol: string,
    value: number | string,
    isFetching?: boolean
}

const PortfolioSecondaryItem: React.FC<PortfolioSecondaryItemProps> = (props) => {
    return <>
        <Flex
            p={'1rem'}
            alignItems={'center'}
        >
            <Stat>
                <StatNumber>{
                    props.isFetching ? <Spinner size={'sm'} /> : props.value
                }</StatNumber>
                <StatLabel
                    color={'gray.500'}
                    fontSize={'sm'}
                    fontWeight={'semibold'}
                >
                    {props.currency} {props.symbol}
                </StatLabel>
            </Stat>
        </Flex>
    </>
}

export default PortfolioSecondaryItem
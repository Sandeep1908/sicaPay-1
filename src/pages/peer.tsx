import { type NextPage } from "next";
import Head from "next/head";
import {
    Container,
    Flex,
    Heading,
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer, Text,
} from "@chakra-ui/react";

// COMPONENTS
import {api} from "@/utils/api";

const CEM: NextPage = () => {

    return (
        <>
            <Head>
                <title>Peer To Peer</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Container
                maxW={'container.xl'}
                p={'2'}
            >
                <Flex
                    flexDir={'column'}
                    gap={'2rem'}
                >
                    <Heading
                        size={'md'}
                    >
                        Peer To Peer
                    </Heading>
                    <Flex
                        w={{
                            base: '100%',
                            lg: '50%'
                        }}
                    >
                        <Text>
                            Coming soon
                        </Text>
                    </Flex>
                </Flex>
            </Container>
        </>
    );
};

export default CEM;

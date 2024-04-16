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

const Travel: NextPage = () => {

    return (
        <>
            <Head>
                <title>Travel & Explore</title>
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
                        Travel & Explore
                    </Heading>
                    <Flex
                        w={{
                            base: '100%',
                            lg: '50%'
                        }}
                    >
                        <Text>
                            Flights and travel partner - You can book your flight ticket, hotels, restaurants and holidays using SICA.
                        </Text>
                    </Flex>
                </Flex>
            </Container>
        </>
    );
};

export default Travel;

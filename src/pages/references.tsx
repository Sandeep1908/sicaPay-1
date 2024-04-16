import { type NextPage } from "next";
import Head from "next/head";
import {
    Container,
    Flex,
    Heading,Text,
} from "@chakra-ui/react";

const References: NextPage = () => {

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
                        References
                    </Heading>
                    <Flex
                        w={{
                            base: '100%',
                            lg: '50%'
                        }}
                    >
                        <Text>
                            WIP!
                        </Text>
                    </Flex>
                </Flex>
            </Container>
        </>
    );
};

export default References;

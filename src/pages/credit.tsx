import { type NextPage } from "next";
import Head from "next/head";
import {
    Container,
    Flex,
    Heading,
    Text,
} from "@chakra-ui/react";

// COMPONENTS
import {api} from "@/utils/api";

const Credit: NextPage = () => {

    return (
        <>
            <Head>
                <title>Manage your Line of credit</title>
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
                        Manage your Line of credit
                    </Heading>
                    <Flex
                        w={{
                            base: '100%',
                            lg: '50%'
                        }}
                    >
                        <Text>
                            Coming soon!
                        </Text>
                    </Flex>
                </Flex>
            </Container>
        </>
    );
};

export default Credit;

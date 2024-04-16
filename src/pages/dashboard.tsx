import { type NextPage } from "next";
import Head from "next/head";

// COMPONENTS
import SidebarWithHeader from "@/components/Layout/SideBarWithHeader";
import {Button, Container, Flex, Grid, Heading, Text} from "@chakra-ui/react";
import PortfolioItem from "@/components/Dashboard/Portfolio/Card";
import PortfolioSecondaryItem from "@/components/Dashboard/Portfolio/SecondaryCard";
import {api} from "@/utils/api";
import {useRouter} from "next/router";

const Home: NextPage = () => {

  const {data: portFolioSummary, isFetching} = api.dashboard.getPortfolioSummaries.useQuery()

    const router = useRouter()

  return (
    <>
      <Head>
        <title>Dashboard</title>
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
              <Flex
                  flexDir={'column'}
                  gap={'1rem'}
              >
                  <Heading
                      size={'md'}
                  >
                      Portfolio Summary
                  </Heading>
                  <Grid
                      gridTemplateColumns={{
                          base: 'repeat(2, 1fr)',
                          md: 'repeat(3, 1fr)',
                          lg: 'repeat(4, 1fr)',
                      }}
                      gap={'10px'}
                  >
                      <PortfolioItem
                          currency={'Indian Rupees'}
                          symbol={'INR'}
                          value={portFolioSummary?.fiat?.inr}
                          isFetching={isFetching}
                      />
                      <PortfolioItem
                          currency={'US Dollars'}
                          symbol={'USD'}
                            value={portFolioSummary?.fiat?.usd}
                          isFetching={isFetching}

                      />
                      <PortfolioItem
                          currency={'Arab Emirates Dirham'}
                          symbol={'AED'}
                            value={portFolioSummary?.fiat?.aed}
                          isFetching={isFetching}

                      />
                      <PortfolioItem
                          currency={'Singapore Dollar'}
                          symbol={'SGD'}
                            value={portFolioSummary?.fiat?.sgd}
                          isFetching={isFetching}

                      />

                  </Grid>

              </Flex>
              <Grid
                    gridTemplateColumns={{
                        base: 'repeat(1, 1fr)',
                        md: 'repeat(2, 1fr)',
                    }}
                    gap={'10px'}
              >
                  <Flex
                      flexDir={'column'}
                      gap={'1rem'}
                      bg={'white'}
                      borderRadius={'1rem'}
                      border={'1px solid'}
                      borderColor={'#e7e3eb'}
                      p={'1rem'}
                  >
                      <Heading
                          size={'md'}
                          textAlign={'center'}
                      >
                          SICA
                      </Heading>

                      <Grid
                          gridTemplateColumns={{
                              base: 'repeat(2, 1fr)',
                          }}
                          gap={'10px'}
                      >
                          <PortfolioSecondaryItem
                              currency={'Staked'}
                              symbol={'SICA'}
                              isFetching={isFetching}
                              value={Number(`${portFolioSummary?.sica?.staked}`).toFixed(2)}
                          />
                          <PortfolioSecondaryItem
                              currency={'Bonus'}
                              symbol={'SICA'}
                              isFetching={isFetching}
                              value={Number(`${portFolioSummary?.sica?.bonus}`).toFixed(2)}
                          />

                      </Grid>
                  </Flex>
                  <Flex
                      flexDir={'column'}
                      gap={'1rem'}
                      bg={'white'}
                      borderRadius={'1rem'}
                      border={'1px solid'}
                      borderColor={'#e7e3eb'}
                      p={'1rem'}
                  >
                      <Heading
                          size={'md'}
                          textAlign={'center'}
                      >
                          Carbon
                      </Heading>

                      <Grid
                          gridTemplateColumns={{
                              base: 'repeat(2, 1fr)',
                          }}
                          gap={'10px'}
                      >
                          <PortfolioSecondaryItem
                              currency={'Target'}
                              symbol={''}
                              isFetching={isFetching}
                              value={Number(`${portFolioSummary?.carbon?.target}`).toFixed(2)}
                          />
                          <PortfolioSecondaryItem
                              currency={'Bonus'}
                              symbol={''}
                              isFetching={isFetching}
                              value={Number(`${portFolioSummary?.carbon?.bonus}`).toFixed(2)}
                          />

                      </Grid>
                  </Flex>
              </Grid>
              <Flex
                  flexDir={'column'}
                  gap={'1rem'}
              >
                  <Heading
                      size={'md'}
                  >
                      Actions
                  </Heading>
                  <Grid
                        gridTemplateColumns={{
                            base: 'repeat(1, 1fr)',
                            md: 'repeat(2, 1fr)',
                        }}
                        gap={'10px'}
                  >
                      <Flex
                          flexDir={'column'}
                          gap={'1rem'}
                      >
                            <Button
                                colorScheme={'primary'}
                                size={'lg'}
                                onClick={() => router.push('/buy')}
                            >
                                Buy & Stake SICA
                            </Button>
                            <Button
                                colorScheme={'primary'}
                                variant={'outline'}
                                onClick={() => router.push('/withdraw')}
                            >
                                Redeem SICA to Fiat
                            </Button>
                      </Flex>
                      <Flex
                            flexDir={'column'}
                            width={'100%'}
                            h={'100%'}
                            border={'2px dashed'}
                            borderColor={'primary.200'}
                            bg={'primary.50'}
                            borderRadius={'1rem'}
                            justify={'center'}
                            align={'center'}
                            cursor={'pointer'}
                            transition={'all 0.2s linear'}
                            _hover={{
                                bg: 'primary.100',
                            }}
                            onClick={() => router.push('/references')}
                      >
                            <Flex
                                flexDir={'column'}
                                p={{base: '10px', lg: '0'}}
                            >
                                <Heading
                                    size={'md'}
                                    color={'gray.600'}
                                >
                                    Refer & Earn
                                </Heading>
                                <Text
                                    color={'primary.700'}
                                    fontWeight={'bold'}
                                >
                                    Refer your friends and earn upto 10% of their SICA staking rewards.
                                </Text>
                            </Flex>
                      </Flex>
                  </Grid>
              </Flex>
          </Flex>
      </Container>
    </>
  );
};

export default Home;

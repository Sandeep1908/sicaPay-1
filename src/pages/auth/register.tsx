import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Checkbox,
    Stack,
    Link,
    Button,
    Heading,
    useToast,
    useColorModeValue,
} from '@chakra-ui/react';
import React from "react";
import {useRouter} from "next/router";
import { api } from "@/utils/api";

export default function SimpleCard() {

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [fullname, setFullname] = React.useState('');
    const [phone, setPhone] = React.useState('');
    const [country, setCountry] = React.useState('')

    const router = useRouter()
    const toast = useToast()

    const {mutate, isLoading} = api.auth.register.useMutation({
        onSuccess: (data) => {
            localStorage.setItem('sica_refresh_token', data?.session?.refresh_token as string)
            localStorage.setItem('sica_token', data?.session?.access_token as string)
            router.push('/dashboard');
        },
        onError: (error) => {
            toast({
                title: "An error occurred.",
                description: error.message,
                status: "error",
                duration: 9000,
            })
        }
    })

    const hanleEmail = (e: any) => {
        setEmail(e.target.value)
    }

    const handlePassword = (e: any) => {
        setPassword(e.target.value)
    }

    const handleFullname = (e: any) => {
        setFullname(e.target.value)
    }

    const handlePhone = (e: any) => {
        setPhone(e.target.value)
    }

    const handleCountry = (e: any) => {
        setCountry(e.target.value)
    }

    const handleSubmit = async () => {
        await mutate({
            email,
            password,
            name: fullname,
            phone,
            country
        })

    }

    return (
        <Flex
            minH={'100vh'}
            align={'center'}
            justify={'center'}
            bg={useColorModeValue('gray.50', 'gray.800')}>
            <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                <Stack align={'center'}>
                    <Heading fontSize={'4xl'}>Sign in to your account</Heading>
                </Stack>
                <Box
                    rounded={'lg'}
                    bg={useColorModeValue('white', 'gray.700')}
                    boxShadow={'lg'}
                    p={8}>
                    <Stack spacing={4}>
                        <FormControl id="fullname">
                            <FormLabel>Fullname</FormLabel>
                            <Input
                                type="text"
                                onChange={handleFullname}
                                value={fullname}
                            />
                        </FormControl>
                        <FormControl id="email">
                            <FormLabel>Email address</FormLabel>
                            <Input
                                type="email"
                                onChange={hanleEmail}
                                value={email}
                            />
                        </FormControl>
                        <FormControl id="password">
                            <FormLabel>Password</FormLabel>
                            <Input
                                type="password"
                                onChange={handlePassword}
                                value={password}
                            />
                        </FormControl>
                        <FormControl id="phone">
                            <FormLabel>Phone</FormLabel>
                            <Input
                                type="number"
                                onChange={handlePhone}
                                value={phone}
                            />
                        </FormControl>
                        <FormControl id="country">
                            <FormLabel>Country</FormLabel>
                            <Input
                                type="text"
                                onChange={handleCountry}
                                value={country}
                            />
                        </FormControl>
                        <Link href={"/auth/login"}>Login</Link>
                        <Stack spacing={10}>
                            <Button
                                bg={'blue.400'}
                                color={'white'}
                                _hover={{
                                    bg: 'blue.500',
                                }}
                                onClick={handleSubmit}
                                isLoading={isLoading}
                                loadingText={'Registering User'}
                            >
                                Register
                            </Button>
                        </Stack>
                    </Stack>
                </Box>
            </Stack>
        </Flex>
    );
}
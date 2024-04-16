import React, { ReactNode } from 'react';
import {
    IconButton,
    Avatar,
    Box,
    CloseButton,
    Flex,
    HStack,
    VStack,
    Icon,
    useColorModeValue,
    Link,
    Drawer,
    DrawerContent,
    Text,
    useDisclosure,
    BoxProps,
    FlexProps,
    Menu,
    MenuButton,
    MenuDivider,
    MenuItem,
    MenuList, useToast, SkeletonCircle, Skeleton, Button, Badge,
} from '@chakra-ui/react';
import {
    FiHome,
    FiTrendingUp,
    FiCompass,
    FiStar,
    FiSettings,
    FiMenu,
    FiBell,
    FiChevronDown,
    FiUser,
    FiList,
    FiUsers,
    FiCreditCard,
} from 'react-icons/fi';
import { MdTravelExplore } from 'react-icons/md'
import { BsBank } from 'react-icons/bs'
import { RiNumbersFill } from 'react-icons/ri'
import { FaPeopleArrows } from 'react-icons/fa'
import { IoIosHelpBuoy } from 'react-icons/io'
import { RxDashboard } from 'react-icons/rx'
import {BiLogOut} from 'react-icons/bi'
 import { IconType } from 'react-icons';
import { ReactText } from 'react';
import {api} from "@/utils/api";
import {useRouter} from "next/router";
import Image from "next/image";
import Logo from "@/assets/logo.png";

interface LinkItemProps {
    name: string;
    route: string;
    icon: IconType;
    flag?: 'future';
}
const LinkItems: Array<LinkItemProps> = [
    { name: 'Dashboard', icon: RxDashboard, route: '/dashboard' },
    { name: 'Accounts', icon: FiList, route: '/activities' },
    { name: 'Personal Profile', icon: FiUser, route: '/profile' },
    { name: 'Manage References', icon: FiUsers, route: '/references' },
    { name: 'SICA Swipe', icon: FiCreditCard, flag: 'future', route: '/swipe' },
    { name: 'Carbon Exchange Marketplace', icon: FiStar, flag: 'future', route: '/exchange' },
    { name: 'Travel & Explore', icon: MdTravelExplore, flag: 'future', route: '/travel' },
    { name: 'Wealth Management', icon: BsBank, route: '/wealth', flag: 'future' },
    { name: 'Manage Your Line of Credit', icon: RiNumbersFill, route: '/credit', flag: 'future' },
    { name: 'Peer to Peer', icon: FaPeopleArrows, flag: 'future', route: '/peer' },
    { name: 'Request Withdrawal', icon: IoIosHelpBuoy, route: '/withdraw' },

];

export default function SidebarWithHeader({
                                              children,
                                          }: {
    children: ReactNode;
}) {

    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <Box minH="100vh" bg={'gray.100'}>
            <SidebarContent
                onClose={() => onClose}
                display={{ base: 'none', lg: 'block' }}
            />
            <Drawer
                autoFocus={false}
                isOpen={isOpen}
                placement="left"
                onClose={onClose}
                returnFocusOnClose={false}
                onOverlayClick={onClose}
                size="full"
            >
                <DrawerContent>
                    <SidebarContent onClose={onClose} />
                </DrawerContent>
            </Drawer>
            {/* mobilenav */}
            <MobileNav onOpen={onOpen} />
            <Box ml={{ base: 0, lg: 60 }} p="4">
                {children}
            </Box>
        </Box>
    );
}

interface SidebarProps extends BoxProps {
    onClose: () => void;
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
    return (
        <Box
            transition="3s ease"
            bg={'white'}
            borderRight="1px"
            borderRightColor={'gray.200'}
            w={{ base: 'full', lg: 60 }}
            pos="fixed"
            h="full"
            {...rest}>
            <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
                <Box
                    w={{base: '100px', lg: '150px'}}
                    h={'30px'}
                    pos={'relative'}
                >
                    <Image src={Logo} alt={'Logo'} layout={'fill'}/>
                </Box>
                <CloseButton display={{ base: 'flex', lg: 'none' }} onClick={onClose} />
            </Flex>
            {LinkItems.map((link) => (
                <NavItem key={link.name} icon={link.icon} flag={link.flag} route={link.route}>
                    {link.name}
                </NavItem>
            ))}
        </Box>
    );
};

interface NavItemProps extends FlexProps {
    icon: IconType;
    children: ReactNode;
    route: string;
    flag?: 'future';
}
const NavItem = ({ icon, children, ...rest }: NavItemProps) => {
    const router = useRouter();

    const handleClick = () => {
        router.push(rest.route)
    }

    const isActive = router.pathname === rest.route;

    return (
            <Flex
                direction={'column'}
            >
                <Flex
                    align="center"
                    p="2"
                    mx="4"
                    borderRadius="lg"
                    role="group"
                    cursor="pointer"
                    transition={'all 0.2s linear'}
                    border={'1px solid'}
                    bg={isActive ? 'primary.50' : 'transparent'}
                    borderColor={isActive ? 'primary.200' : 'transparent'}
                    _hover={{
                        bg: 'primary.50',
                        borderColor: 'primary.200',
                    }}
                    {...rest}
                    onClick={handleClick}
                >
                    {icon && (
                        <Icon
                            mr="4"
                            fontSize="16"
                            as={icon}
                        />
                    )}
                    <Flex
                        wrap={'wrap'}
                        align={'center'}
                        gap={'3px'}
                    >
                        {children}
                        <Badge colorScheme={'primary'}>
                            {rest.flag}
                        </Badge>
                    </Flex>
                </Flex>
            </Flex>
    );
};

interface MobileProps extends FlexProps {
    onOpen: () => void;
}
const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
    const {data, isLoading} = api.auth.me.useQuery()
    const router = useRouter()
    const toast = useToast()

    const {mutate, isLoading: isLoggingOut} = api.auth.logout.useMutation({
        onSuccess: () => {
            router.push('/auth/login')
        },
        onError: error => {
            toast({
                title: 'Error',
                description: error.message,
                status: 'error',
                duration: 5000,
            })
        }
    })

    const handleLogout = async () => {
        localStorage.removeItem('sica_token')
        localStorage.removeItem('sica_refesh_token')
        await mutate()
    }
    return (
        <Flex
            ml={{ base: 0, lg: 60 }}
            px={{ base: 4, lg: 4 }}
            height="20"
            alignItems="center"
            bg={'white'}
            borderBottomWidth="1px"
            borderBottomColor={'gray.200'}
            justifyContent={{ base: 'space-between', lg: 'flex-end' }}
            {...rest}>
            <IconButton
                display={{ base: 'flex', lg: 'none' }}
                onClick={onOpen}
                variant="outline"
                aria-label="open menu"
                icon={<FiMenu />}
            />

            <Box
                w={{base: '100px', lg: '150px'}}
                h={'30px'}
                pos={'relative'}
                display={{base: 'block', lg: 'none'}}
            >
                <Image src={Logo} alt={'Logo'} layout={'fill'}/>
            </Box>

            <HStack spacing={{ base: '0', lg: '6' }}>
                <Flex alignItems={'center'}>
                    <HStack>
                        <SkeletonCircle isLoaded={!isLoading}>
                            <Avatar
                                size={'sm'}
                                name={data?.name}
                            />
                        </SkeletonCircle>
                        <Skeleton isLoaded={!isLoading}>
                            <VStack
                                display={{ base: 'none', lg: 'flex' }}
                                alignItems="flex-start"
                                spacing="1px"
                                >
                                <Text fontSize="sm">{data?.name}</Text>
                            </VStack>
                        </Skeleton>
                    </HStack>
                    <IconButton
                        aria-label={'Logout'}
                        icon={<BiLogOut />}
                        isLoading={isLoggingOut}
                        onClick={handleLogout}
                        ml={'4'}
                    />
                </Flex>
            </HStack>
        </Flex>
    );
};
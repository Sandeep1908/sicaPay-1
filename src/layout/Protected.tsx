import {useRouter} from "next/router";
import React, {PropsWithChildren, useEffect} from "react";
import SidebarWithHeader from "@/components/Layout/SideBarWithHeader";
import {api} from "@/utils/api";
const Protected: React.FC<PropsWithChildren> = ({children}) => {
    const publicRoutes = ['/auth/login', '/auth/register']

    const router = useRouter()

    const {isLoading, isError, data} = api.auth.getSession.useQuery()

    if(isLoading) {
        return <>Loading...</>
    }

    if(isError) {
        if(!publicRoutes.includes(router.pathname))
        router.push('/auth/login')
    }

    if(publicRoutes.includes(router.pathname)) {
        return <>{children}</>
    }

    return <>
        <SidebarWithHeader>
            {children}
        </SidebarWithHeader>
    </>
}

export default Protected
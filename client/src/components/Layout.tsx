import React, { useEffect, useState } from 'react';
import Loading from '@/components/Loading';
import NavigationBar from "./NavigationBar";

export default function Layout({ children }: { children: React.ReactNode }){
    //loading animation
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
    setIsClient(true);
    }, []);
    
    if (!isClient) {
    return <Loading />;
    }
    
    //page layout
    return (
        <div className="min-h-screen bg-white">
            <NavigationBar />
            {children}
        </div>
    )
}
//wraps editor,check user identity 
import { useEffect, useState } from 'react';
import {supabase} from '../../lib/supabaseClient';
import { Login } from './Login';

export const Admin = ({children}) => {
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthorized, setIsAuthorized] = useState(false);

    useEffect(() => {
        const checkUser = async () => {
            const { data: {session} } = await supabase.auth.getSession();
            if (session) {
                const githubUsername = session.user.user_metadata.user_name;
                const adminUsername = import.meta.env.VITE_ADMIN_USERNAME;
                const isOwner = githubUsername?.toLowerCase() === adminUsername?.toLowerCase();
                setIsAuthorized(isOwner);
            }
            setIsLoading(false);
        }
        checkUser();
    }, []);

    if (isLoading) {
        return <div className="text-center py-10">Loading...</div>;
    }

    if (!isAuthorized) {
        return (
            <div className="container mx-auto max-w-md py-32 px-4 text-center">
                <div className="bg-card border border-border rounded-xl p-8 shadow-sm">
                    <h2 className="text-2xl font-bold mb-2 text-foreground">Secure System Login</h2>
                    <p className="text-muted-foreground mb-8 text-sm">
                        Access parameters are restricted to portfolio creators.
                    </p>
                    <Login />
                </div>
            </div>
        );
    }

    return <>{children}</>;
};

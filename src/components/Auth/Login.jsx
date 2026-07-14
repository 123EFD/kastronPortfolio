//hold Supabase signInWithOAuth function and the actual UI button itself.
import { supabase } from '../../lib/supabaseClient';

export const Login = () => {
    const handleLogin = async () => {
        try {
            const redirectUrl = `${window.location.origin}/admin`;
            await supabase.auth.signInWithOAuth({
                provider: 'github',
                options:{
                    redirectTo: redirectUrl,
                   
                    scopes: 'repo',
                }
            });
        } catch (error) {
            console.error('Error during login:', error);
        }
    }

    return (
        <button
            onClick={handleLogin}
            className="bg-blue-200 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
            Login with GitHub
        </button>
    )
};
    
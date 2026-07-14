//private route for Milkdown editor role
import {supabase} from '../../lib/supabaseClient';
//react-router-dom for navigate to logout
import { useNavigate } from 'react-router-dom';

export const Dashboard = () => {
    const navigate = useNavigate();
    const handleLogout = async () => {
        try {
            
            await supabase.auth.signOut();
        
            navigate('/');
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

    return (
        <div className="container mx-auto max-w-5xl py-24 px-4">
            <div className="flex justify-between items-center mb-12">
                <h1 className="text-4xl font-bold text-primary">Creator Dashboard</h1>
                
                <button 
                    onClick={handleLogout}
                    className="px-4 py-2 bg-destructive/10 text-destructive hover:bg-destructive/20 rounded-md transition-colors"
                >
                    Sign Out
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                {/* Sidebar for Drafts / Published Lists */}
                <div className="col-span-1 bg-card border border-border rounded-lg p-6">
                    <h2 className="text-xl font-semibold mb-4">Your Posts</h2>
                    <p className="text-muted-foreground text-sm">Post manager coming in</p>
                </div>

                {/* Main Editor Area */}
                <div className="col-span-1 md:col-span-2 bg-card border border-border rounded-lg p-6 min-h-[500px]">
                    <h2 className="text-xl font-semibold mb-4">Editor</h2>
                    <p className="text-muted-foreground text-sm">Milkdown WYSIWYG editor coming soon...</p>
                </div>
            </div>
        </div>
    );
};
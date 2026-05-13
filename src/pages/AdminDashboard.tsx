import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { LayoutDashboard, Users, CalendarDays, Image as ImageIcon, MessageSquareQuote, LogOut, UserCheck } from 'lucide-react';
import EventsAdmin from '@/components/admin/EventsAdmin';
import GeneralAdmin from '@/components/admin/GeneralAdmin';
import RegistrationsAdmin from '@/components/admin/RegistrationsAdmin';

export default function AdminDashboard() {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [authError, setAuthError] = useState('');

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setAuthError('');
    
    let targetEmail = username;
    // Map the 'uchenna' username to a real email address for Supabase Auth
    if (username.toLowerCase() === 'uchenna') {
      targetEmail = 'admin@fjoba.org'; // Recommended admin email
    } else if (!username.includes('@')) {
      setAuthError('Please enter a valid email or your admin username.');
      setLoading(false);
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({
      email: targetEmail,
      password,
    });

    if (error) {
      if (error.message.includes('Invalid login credentials')) {
        setAuthError(
          `Login failed. Supabase blocks uploads for fake/mock accounts. You must create this user in your Supabase Dashboard -> Authentication -> Add User (Email: ${targetEmail}, Password: ${password}). Also, turn off "Confirm Email" in Auth settings so you can log in immediately.`
        );
      } else {
        setAuthError(error.message);
      }
    }
    
    setLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setSession(null);
  };

  if (loading) {
    return <div className="min-h-[60vh] flex items-center justify-center">Loading dashboard...</div>;
  }

  if (!session) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">Admin Login</CardTitle>
            <CardDescription>
              Enter your credentials to access the admin dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Username or Email</Label>
                <Input 
                  id="email" 
                  type="text" 
                  placeholder="admin or user@example.com" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input 
                  id="password" 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required 
                />
              </div>
              {authError && <p className="text-sm text-destructive font-medium leading-relaxed">{authError}</p>}
              <Button type="submit" className="w-full bg-primary text-black hover:bg-primary/90" disabled={loading}>
                {loading ? 'Signing in...' : 'Sign In'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'registrations', label: 'Registrations', icon: UserCheck },
    { id: 'events', label: 'Events', icon: CalendarDays },
    { id: 'alumni', label: 'Alumni Directory', icon: Users },
    { id: 'gallery', label: 'Gallery', icon: ImageIcon },
    { id: 'testimonials', label: 'Testimonials', icon: MessageSquareQuote },
  ];

  return (
    <div className="container mx-auto py-8 px-4 max-w-7xl min-h-[80vh] flex flex-col md:flex-row gap-8">
      {/* Sidebar */}
      <aside className="w-full md:w-64 shrink-0">
        <div className="bg-secondary rounded-xl p-4 sticky top-24 border border-border/50">
          <div className="mb-6 px-4">
            <h2 className="text-lg font-bold">Admin Panel</h2>
            <p className="text-sm text-muted-foreground break-all">{session.user.email}</p>
          </div>
          <Separator className="my-4 bg-border/50" />
          <nav className="space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                  activeTab === item.id 
                    ? 'bg-primary text-black' 
                    : 'text-muted-foreground hover:bg-black/5 hover:text-black dark:hover:bg-white/5 dark:hover:text-white'
                }`}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </button>
            ))}
          </nav>
          <Separator className="my-4 bg-border/50" />
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg text-destructive hover:bg-destructive/10 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-white dark:bg-black border border-border/50 rounded-xl p-6 md:p-8">
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">Welcome Back, Admin</h2>
              <p className="text-muted-foreground">Manage your alumni association data, events, and galleries from here.</p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Total Alumni</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">--</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Upcoming Events</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">--</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Gallery Items</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">--</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Testimonials</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">--</div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {activeTab === 'registrations' && <RegistrationsAdmin />}
        {activeTab === 'events' && <EventsAdmin />}
        {activeTab === 'alumni' && (
          <GeneralAdmin 
            tableName="alumni_members" 
            title="Alumni Directory" 
            bucketName="alumni-images"
            fields={[
              { name: 'photo_url', label: 'Photo', type: 'file' },
              { name: 'full_name', label: 'Full Name' },
              { name: 'profession', label: 'Profession' },
              { name: 'bio', label: 'Biography' }
            ]} 
          />
        )}
        {activeTab === 'gallery' && (
          <GeneralAdmin 
            tableName="gallery" 
            title="Gallery Management" 
            bucketName="gallery-media"
            fields={[
              { name: 'media_url', label: 'Media', type: 'file' },
              { name: 'caption', label: 'Caption' }
            ]} 
          />
        )}
        {activeTab === 'testimonials' && (
          <GeneralAdmin 
            tableName="testimonials" 
            title="Testimonials" 
            bucketName="alumni-images"
            fields={[
              { name: 'photo_url', label: 'Photo', type: 'file' },
              { name: 'name', label: 'Name' },
              { name: 'message', label: 'Message' }
            ]} 
          />
        )}
      </main>
    </div>
  );
}

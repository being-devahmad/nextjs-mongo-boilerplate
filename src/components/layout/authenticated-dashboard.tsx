'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Settings, LogOut } from 'lucide-react';

interface User {
  email: string;
  role: string;
}

export function AuthenticatedDashboard({ user }: { user: User }) {
  const router = useRouter();
  const isAdmin = user.role === 'admin';

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });
      if (response.ok) {
        router.push('/auth/signin');
      } else {
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <div
      className={`min-h-screen ${
        isAdmin
          ? 'bg-gradient-to-r from-red-100 to-yellow-100'
          : 'bg-gradient-to-r from-blue-100 to-green-100'
      }`}
    >
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader className={isAdmin ? 'bg-red-500' : 'bg-blue-500'}>
            <CardTitle className="text-3xl font-bold text-white">
              Welcome, <span className="italic">{user.email}</span>!
            </CardTitle>
            <p className="mt-2 text-white opacity-90">
              {isAdmin ? 'Admin Dashboard' : 'User Dashboard'}
            </p>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Link
                href={isAdmin ? '/admin/dashboard' : '/user/profile'}
                className={`p-6 rounded-lg shadow-md transition flex items-center ${
                  isAdmin
                    ? 'bg-red-100 hover:bg-red-200'
                    : 'bg-blue-100 hover:bg-blue-200'
                }`}
              >
                <Shield
                  className={`w-8 h-8 mr-4 ${
                    isAdmin ? 'text-red-500' : 'text-blue-500'
                  }`}
                />
                <div>
                  <h2 className="text-xl font-semibold">
                    {isAdmin ? 'Admin Dashboard' : 'User Profile'}
                  </h2>
                  <p className="mt-1 text-gray-600">
                    {isAdmin
                      ? 'Manage your site'
                      : 'View and edit your profile'}
                  </p>
                </div>
              </Link>
              <Link
                href={isAdmin ? '/admin/settings' : '/user/settings'}
                className={`p-6 rounded-lg shadow-md transition flex items-center ${
                  isAdmin
                    ? 'bg-yellow-100 hover:bg-yellow-200'
                    : 'bg-green-100 hover:bg-green-200'
                }`}
              >
                <Settings
                  className={`w-8 h-8 mr-4 ${
                    isAdmin ? 'text-yellow-500' : 'text-green-500'
                  }`}
                />
                <div>
                  <h2 className="text-xl font-semibold">Settings</h2>
                  <p className="mt-1 text-gray-600">
                    {isAdmin
                      ? 'Configure admin settings'
                      : 'Manage your account settings'}
                  </p>
                </div>
              </Link>
            </div>
            <Button
              onClick={handleLogout}
              className="mt-8 w-full"
              variant="secondary"
            >
              <LogOut className="w-5 h-5 mr-2" />
              Logout
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

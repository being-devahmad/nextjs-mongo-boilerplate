'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { User, Shield, Settings, LogOut } from 'lucide-react';

interface UserData {
  email?: string;
  role?: string;
}

const HomePage = () => {
  const [user, setUser] = useState<UserData | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('/api/auth/user', {
          credentials: 'include', // ✅ Ensure cookies are sent
        });

        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        setUser(null);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = async () => {
    const response = await fetch('/api/auth/logout', {
      method: 'POST',
      credentials: 'include', // ✅ Ensure cookies are sent
    });

    const data = await response.json();

    if (data.success) {
      setUser(null);
      console.log('User logged out');
      router.push('/auth/signin');
    } else {
      console.error('Logout failed:', data.error);
    }
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 to-purple-100">
        <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-xl">
          <h1 className="mb-6 text-3xl font-bold text-center text-gray-800">
            Welcome
          </h1>
          <div className="space-y-4">
            <button
              onClick={() => router.push('/auth/signin')}
              className="w-full px-4 py-3 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition flex items-center justify-center"
            >
              <User className="w-5 h-5 mr-2" />
              Login
            </button>
            <button
              onClick={() => router.push('/auth/signup')}
              className="w-full px-4 py-3 text-white bg-green-500 rounded-lg hover:bg-green-600 transition flex items-center justify-center"
            >
              <Shield className="w-5 h-5 mr-2" />
              Sign Up
            </button>
          </div>
        </div>
      </div>
    );
  }

  const isAdmin = user.role === 'admin';

  return (
    // <div
    //   className={`min-h-screen ${
    //     isAdmin
    //       ? 'bg-gradient-to-r from-red-100 to-yellow-100'
    //       : 'bg-gradient-to-r from-blue-100 to-green-100'
    //   }`}
    // >
    //   <div className="container mx-auto px-4 py-8">
    //     <div className="bg-white rounded-lg shadow-xl overflow-hidden">
    //       <div className={`p-6 ${isAdmin ? 'bg-red-500' : 'bg-blue-500'}`}>
    //         <h1 className="text-3xl font-bold text-white">
    //           Welcome, <span className="italic">{user.email}</span>!
    //         </h1>
    //         <p className="mt-2 text-white opacity-90">
    //           {isAdmin ? 'Admin Dashboard' : 'User Dashboard'}
    //         </p>
    //       </div>
    //       <div className="p-6">
    //         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    //           <Link
    //             href={isAdmin ? '/admin/dashboard' : '/user/profile'}
    //             className={`p-6 rounded-lg shadow-md transition flex items-center ${
    //               isAdmin
    //                 ? 'bg-red-100 hover:bg-red-200'
    //                 : 'bg-blue-100 hover:bg-blue-200'
    //             }`}
    //           >
    //             <Shield
    //               className={`w-8 h-8 mr-4 ${
    //                 isAdmin ? 'text-red-500' : 'text-blue-500'
    //               }`}
    //             />
    //             <div>
    //               <h2 className="text-xl font-semibold">
    //                 {isAdmin ? 'Admin Dashboard' : 'User Profile'}
    //               </h2>
    //               <p className="mt-1 text-gray-600">
    //                 {isAdmin
    //                   ? 'Manage your site'
    //                   : 'View and edit your profile'}
    //               </p>
    //             </div>
    //           </Link>
    //           <Link
    //             href={isAdmin ? '/admin/settings' : '/user/settings'}
    //             className={`p-6 rounded-lg shadow-md transition flex items-center ${
    //               isAdmin
    //                 ? 'bg-yellow-100 hover:bg-yellow-200'
    //                 : 'bg-green-100 hover:bg-green-200'
    //             }`}
    //           >
    //             <Settings
    //               className={`w-8 h-8 mr-4 ${
    //                 isAdmin ? 'text-yellow-500' : 'text-green-500'
    //               }`}
    //             />
    //             <div>
    //               <h2 className="text-xl font-semibold">Settings</h2>
    //               <p className="mt-1 text-gray-600">
    //                 {isAdmin
    //                   ? 'Configure admin settings'
    //                   : 'Manage your account settings'}
    //               </p>
    //             </div>
    //           </Link>
    //         </div>
    //         <button
    //           onClick={handleLogout}
    //           className="mt-8 w-full px-4 py-3 text-white bg-gray-500 rounded-lg hover:bg-gray-600 transition flex items-center justify-center"
    //         >
    //           <LogOut className="w-5 h-5 mr-2" />
    //           Logout
    //         </button>
    //       </div>
    //     </div>
    //   </div>
    // </div>

    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Header Section */}
        <div
          className={` ${isAdmin ? 'bg-red-600' : 'bg-gray-900'} p-6 text-white`}
        >
          <h1 className="text-2xl font-semibold">
            Welcome, <span className="italic">{user.email}</span>
          </h1>
          <p className="text-gray-300">
            {isAdmin ? 'Admin Panel' : 'User Dashboard'}
          </p>
        </div>

        {/* Links Section */}
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Dashboard Link */}
            <Link
              href={isAdmin ? '/admin/dashboard' : '/user/profile'}
              className="flex items-center gap-4 p-4 border border-gray-300 rounded-lg transition hover:bg-gray-100"
            >
              <Shield className="w-6 h-6 text-gray-700" />
              <div>
                <h2 className="text-lg font-medium">
                  {isAdmin ? 'Admin Dashboard' : 'User Profile'}
                </h2>
                <p className="text-sm text-gray-500">
                  {isAdmin
                    ? 'Manage site operations'
                    : 'View and update your profile'}
                </p>
              </div>
            </Link>

            {/* Settings Link */}
            <Link
              href={isAdmin ? '/admin/settings' : '/user/settings'}
              className="flex items-center gap-4 p-4 border border-gray-300 rounded-lg transition hover:bg-gray-100"
            >
              <Settings className="w-6 h-6 text-gray-700" />
              <div>
                <h2 className="text-lg font-medium">Settings</h2>
                <p className="text-sm text-gray-500">
                  {isAdmin
                    ? 'Configure admin settings'
                    : 'Manage account preferences'}
                </p>
              </div>
            </Link>
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 text-white bg-gray-800 rounded-lg transition hover:bg-gray-900"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;

// import { AuthenticatedDashboard } from "@/components/layout/authenticated-dashboard";
// import { UnauthenticatedHome } from "@/components/layout/unauthenticated";
// import getUser from "@/utils/get-user";

// export default async function HomePage() {
//   const user = await getUser();
//   console.log("user>", user);

//   if (!user) {
//     return <UnauthenticatedHome />;
//   }

//   return <AuthenticatedDashboard user={user} />;
// }

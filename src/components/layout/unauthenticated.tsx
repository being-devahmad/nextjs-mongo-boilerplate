'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { User, Shield } from 'lucide-react';

export function UnauthenticatedHome() {
  const router = useRouter();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 to-purple-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">
            Welcome
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button
            onClick={() => router.push('/auth/signin')}
            className="w-full"
            variant="default"
          >
            <User className="w-5 h-5 mr-2" />
            Login
          </Button>
          <Button
            onClick={() => router.push('/auth/signup')}
            className="w-full"
            variant="secondary"
          >
            <Shield className="w-5 h-5 mr-2" />
            Sign Up
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

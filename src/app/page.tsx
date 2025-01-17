import { Poppins } from 'next/font/google';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import LoginButton from '@/components/auth/LoginButton';

const poppins = Poppins({
  subsets: ['latin'],
  weight: '600',
});

export default function Home() {
  return (
    <main className='flex h-full flex-col items-center justify-center bg-secondary'>
      <div className='space-y-6'>
        <h1
          className={cn(
            'text-6xl font-semibold text-primary drop-shadow-md',
            poppins.className
          )}
        >
          PRBC - Management Console
        </h1>
        <p className='text-primary text-lg'>
          Portal for managing questions and bowls nominations from prbc.com.au
        </p>
        <div>
          <LoginButton>
            <Button size='lg'>Sign In</Button>
          </LoginButton>
        </div>
      </div>
    </main>
  );
}

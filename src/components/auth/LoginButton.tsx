'use client';

import { useRouter } from 'next/navigation';

interface LoginButtonProps {
  children: React.ReactNode;
  asChild?: boolean;
}

export default function LoginButton({ children, asChild }: LoginButtonProps) {
  const router = useRouter();

  return (
    <span
      className='cursor-pointer'
      onClick={() => router.push('/login')}
    >
      {children}
    </span>
  );
}

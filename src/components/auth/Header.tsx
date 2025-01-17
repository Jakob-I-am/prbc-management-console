import { Poppins } from 'next/font/google';
import Image from 'next/image';

import { cn } from '@/lib/utils';
import logo from '../../../public/logo.png';

const poppins = Poppins({
  subsets: ['latin'],
  weight: '600',
});

interface HeaderProps {
  label: string;
}

export default function Header({ label }: HeaderProps) {
  return (
    <div className='w-full flex flex-col gap-y-4 items-center justify-center'>
      <Image
        src={logo}
        alt='company logo'
        className='object-contain'
        priority
      />
      <h1
        className={cn('text-3xl font-semibold text-center', poppins.className)}
      >
        Parkes Railway Bowling Club
      </h1>
      <p className='text-muted-foreground text-sm'>{label}</p>
    </div>
  );
}

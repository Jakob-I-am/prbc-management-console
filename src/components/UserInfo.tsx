import { Session } from 'next-auth';

import { Card, CardContent, CardHeader } from '@/components/ui/card';

interface UserInfoProps {
  user: Session['user'];
  label: string;
}

export default function UserInfo({ user, label }: UserInfoProps) {
  return (
    <Card className='w-[600px] shadow-md'>
      <CardHeader>
        <p className='text-2xl font-semibold text-center'>{label}</p>
      </CardHeader>
      <CardContent></CardContent>
    </Card>
  );
}

'use client';

import { useTransition } from 'react';
import { useRouter } from 'next/navigation';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { deleteMessage, updateStatus } from '@/actions/messageActions';
import { type Message } from '@/app/(protected)/dashboard/Columns';

interface MessageCardProps {
  contact: Message;
}

export default function MessageCard({ contact }: MessageCardProps) {
  const [isDeletePending, startDeleteTransition] = useTransition();
  const [isUpdatePending, startUpdateTransition] = useTransition();
  const [isUpdateCompletePending, startUpdateCompleteTransition] =
    useTransition();

  const router = useRouter();

  const handleDelete = (id: string) => {
    startDeleteTransition(async () => {
      await deleteMessage(id);
      router.push('/dashboard');
    });
  };

  const handleProcessingUpdate = (
    id: string,
    status: 'pending' | 'processing' | 'complete'
  ) => {
    startUpdateTransition(async () => {
      await updateStatus({ id, messageStatus: status });
    });
  };

  const handleCompleteUpdate = (
    id: string,
    status: 'pending' | 'processing' | 'complete'
  ) => {
    startUpdateCompleteTransition(async () => {
      await updateStatus({ id, messageStatus: status });
    });
  };

  return (
    <Card className='w-[600px]'>
      <CardHeader className='space-y-3'>
        <CardTitle className='text-xl text-primarys'>{contact.name}</CardTitle>
        <CardDescription>
          <Badge
            className={`
            ${contact.messageStatus === 'complete' && 'bg-green-500'} 
            ${contact.messageStatus === 'processing' && 'bg-blue-500'} 
            ${contact.messageStatus === 'pending' && 'bg-red-500'}`}
          >
            {contact.messageStatus}
          </Badge>
        </CardDescription>
        <CardDescription>Phone number: {contact.phoneNumber}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className='text-base text-primary'>{contact.message}</p>
      </CardContent>
      <CardFooter className='flex items-center justify-between'>
        <div>
          <Button
            variant='destructive'
            onClick={() => handleDelete(contact.id)}
            disabled={isDeletePending}
          >
            {isDeletePending ? 'Deleteing...' : 'Delete'}
          </Button>
        </div>
        <div className='space-x-2'>
          <Button
            className='w-44'
            disabled={isUpdatePending}
            onClick={() => handleProcessingUpdate(contact.id, 'processing')}
          >
            {isUpdatePending ? 'Changing...' : 'Marking as Processing'}
          </Button>
          <Button
            className='w-44'
            disabled={isUpdateCompletePending}
            onClick={() => handleCompleteUpdate(contact.id, 'complete')}
          >
            {isUpdateCompletePending ? 'Changing...' : 'Marking as Complete'}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}

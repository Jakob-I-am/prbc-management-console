import { getCurrentUser } from '@/lib/auth';

export default async function DashboardPage() {
  const user = await getCurrentUser();

  if (!user) return null;

  return (
    <div className='w-full'>
      {JSON.stringify(user)}

      <div>{user.loginCount <= 1 ? 'Change password' : 'Carry on'}</div>
    </div>
  );
}

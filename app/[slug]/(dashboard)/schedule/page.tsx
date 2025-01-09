import { redirect } from 'next/navigation';
import { Settings } from './settings';
import { getTeamForUser, getUser, getUsersAllTeams } from '@/lib/db/queries';
import { Dashboard } from '@/components/Dashboard';

export default async function SettingsPage() {
  const user = await getUser();

  if (!user) {
    redirect('/sign-in');
  }

  const teamData = await getTeamForUser(user.id);
  const allTeams = await getUsersAllTeams(user.id);

  if (!teamData) {
    throw new Error('Team not found');
  }

  // return <Settings teamData={teamData} />;
  return <Dashboard teamData={allTeams} />;
}

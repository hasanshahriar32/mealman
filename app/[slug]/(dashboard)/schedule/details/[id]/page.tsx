import TeamDashboard from '@/components/team-dashboard';
import { getTeamDetail } from '@/lib/db/queries';
import React from 'react';

const page =  async ({ params }: { params: Promise<{ id: string }> }) => {
  const slug = (await params).id;
  const teamData = await getTeamDetail(slug as unknown as number);
  return <TeamDashboard teamData={teamData as any} />;
};

export default page;
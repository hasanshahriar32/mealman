import BookingCalendar from '@/components/booking-calendar'
import { getTeamDetail } from '@/lib/db/queries';
import { parse } from 'path';

export default async function BookingPage({ params }: { params: Promise<{ id: string }> }) {
  const slug = parseInt((await params).id);
  const teamData = await getTeamDetail(slug as unknown as number);
  return (
    <div className="min-h-screen bg-gray-100">
      <BookingCalendar slug={slug} />
    </div>
  );
}


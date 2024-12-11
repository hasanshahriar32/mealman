"use client"

import { useState } from 'react'
import { format } from 'date-fns'
import { CalendarIcon, CreditCard, Users } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { useRouter } from 'next/navigation'

interface TeamMember {
  id: number
  adminId: number | null
  userId: number
  teamId: string
  role: string
  joinedAt: string
  isVerified: boolean
  user: {
    name: string
    email: string
  }
}

interface TeamData {
  id: number
  name: string
  createdAt: string
  updatedAt: string
  stripeCustomerId: string | null
  stripeSubscriptionId: string | null
  stripeProductId: string | null
  adminId: number
  teamCode: string
  startDate: string
  endDate: string
  planName: string | null
  subscriptionStatus: string | null
  teamMembers: TeamMember[]
}

export default function TeamDashboard({ teamData }: { teamData: TeamData }) {
  const [team, setTeam] = useState<TeamData>(teamData);
  const router = useRouter();
  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "MMM dd, yyyy");
  };

  return (
    <div className="container mx-auto p-4">
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader className='flex flex-row items-start justify-between gap-2'>
          <div>
            <CardTitle className="text-2xl">Schedule Detail</CardTitle>
            <CardDescription>
              Manage your schedule and subscription
            </CardDescription>
          </div>
          <Button onClick={()=>router.push('/schedule')} variant="outline">Back</Button>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold">{team.name}</h2>
                <p className="text-sm text-muted-foreground">
                  Team Code: {team.teamCode}
                </p>
              </div>
              <Badge variant={team.subscriptionStatus ? "default" : "outline"}>
                {team.subscriptionStatus || "No Subscription"}
              </Badge>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Subscription Period
                  </CardTitle>
                  <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {formatDate(team.startDate)} - {formatDate(team.endDate)}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Team Members
                  </CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {team.teamMembers.length}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Current Plan
                  </CardTitle>
                  <CreditCard className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {team.planName || "No Plan"}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Team Members</h3>
              <div className="space-y-4">
                {team.teamMembers.map((member) => (
                  <div key={member.id} className="flex items-center space-x-4">
                    <Avatar>
                      <AvatarImage
                        src={`https://avatar.vercel.sh/${member.user.name}`}
                      />
                      <AvatarFallback>
                        {member.user.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{member.user.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {member.user.email}
                      </p>
                    </div>
                    <Badge>{member.role}</Badge>
                    {member.isVerified && (
                      <Badge variant="outline">Verified</Badge>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full" disabled={!!team.subscriptionStatus}>
            {team.subscriptionStatus ? "Manage Subscription" : "Subscribe Now"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}


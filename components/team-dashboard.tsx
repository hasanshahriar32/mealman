"use client"

import { useState } from 'react'
import { format } from 'date-fns'
import { CalendarIcon, CreditCard, Users, Utensils, Calendar } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

import { MealListTable } from './meal-list-table'
import { TeamCalendar } from './team-calendar'

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
  mealCounts: {
    morning: number
    noon: number
    night: number
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

// const teamData: TeamData = {
//   id: 40,
//   name: 'Lol',
//   createdAt: '2024-12-10T15:24:50.830Z',
//   updatedAt: '2024-12-10T15:24:50.830Z',
//   stripeCustomerId: null,
//   stripeSubscriptionId: null,
//   stripeProductId: null,
//   adminId: 1,
//   teamCode: 'TNmQt',
//   startDate: '2024-12-01T00:00:00.000Z',
//   endDate: '2024-12-31T23:59:59.999Z',
//   planName: null,
//   subscriptionStatus: null,
//   teamMembers: [
//     {
//       id: 42,
//       adminId: null,
//       userId: 1,
//       teamId: 'TNmQt',
//       role: 'owner',
//       joinedAt: '2024-12-10T15:24:51.206Z',
//       isVerified: true,
//       user: {
//         name: 'John Doe',
//         email: 'john@example.com'
//       },
//       mealCounts: {
//         morning: 5,
//         noon: 7,
//         night: 3
//       }
//     },
//     {
//       id: 43,
//       adminId: null,
//       userId: 2,
//       teamId: 'TNmQt',
//       role: 'member',
//       joinedAt: '2024-12-11T10:00:00.000Z',
//       isVerified: true,
//       user: {
//         name: 'Jane Smith',
//         email: 'jane@example.com'
//       },
//       mealCounts: {
//         morning: 3,
//         noon: 6,
//         night: 4
//       }
//     }
//   ]
// }
export default function TeamDashboard({ teamData }: { teamData: TeamData }) {
  const [team, setTeam] = useState<TeamData>(teamData)

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'MMM dd, yyyy')
  }

  return (
    <div className="container mx-auto p-4">
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl">Team Dashboard</CardTitle>
          <CardDescription>Manage your team and subscription</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="about" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger value="meals">Meal List</TabsTrigger>
              <TabsTrigger value="calendar">Calendar</TabsTrigger>
            </TabsList>
            <TabsContent value="about">
              <div className="grid gap-6 mt-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-xl font-semibold">{team.name}</h2>
                    <p className="text-sm text-muted-foreground">Team Code: {team.teamCode}</p>
                  </div>
                  <Badge variant={team.subscriptionStatus ? 'default' : 'outline'}>
                    {team.subscriptionStatus || 'No Subscription'}
                  </Badge>
                </div>
                
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Subscription Period</CardTitle>
                      <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{formatDate(team.startDate)} - {formatDate(team.endDate)}</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Team Members</CardTitle>
                      <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{team.teamMembers.length}</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Current Plan</CardTitle>
                      <CreditCard className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{team.planName || 'No Plan'}</div>
                    </CardContent>
                  </Card>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">Team Members</h3>
                  <div className="space-y-4">
                    {team.teamMembers.map((member) => (
                      <div key={member.id} className="flex items-center space-x-4">
                        <Avatar>
                          <AvatarImage src={`https://avatar.vercel.sh/${member.user.name}`} />
                          <AvatarFallback>{member.user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">{member.user.name}</p>
                          <p className="text-xs text-muted-foreground">{member.user.email}</p>
                        </div>
                        <Badge>{member.role}</Badge>
                        {member.isVerified && <Badge variant="outline">Verified</Badge>}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="meals">
              <MealListTable teamMembers={team.teamMembers} />
            </TabsContent>
            <TabsContent value="calendar">
              <TeamCalendar teamMembers={team.teamMembers} />
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter>
          <Button className="w-full" disabled={!!team.subscriptionStatus}>
            {team.subscriptionStatus ? 'Manage Subscription' : 'Subscribe Now'}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}


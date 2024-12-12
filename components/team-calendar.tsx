"use client"

import { useState } from 'react'
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday } from 'date-fns'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface TeamMember {
  id: number
  user: {
    name: string
    email: string
  }
  role: string
  mealCounts?: {
    morning: number
    noon: number
    night: number
  }
}

interface TeamCalendarProps {
  teamMembers: TeamMember[]
}

export function TeamCalendar({ teamMembers }: TeamCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [selectedDay, setSelectedDay] = useState<Date | null>(null)
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null)

  const days = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth),
  })

  const previousMonth = () => {
    setCurrentMonth(prevMonth => new Date(prevMonth.getFullYear(), prevMonth.getMonth() - 1, 1))
  }

  const nextMonth = () => {
    setCurrentMonth(prevMonth => new Date(prevMonth.getFullYear(), prevMonth.getMonth() + 1, 1))
  }

  const getRandomMember = (day: Date) => {
    const index = day.getDate() % teamMembers.length
    return teamMembers[index]
  }

  const handleDayClick = (day: Date, member: TeamMember) => {
    setSelectedDay(day)
    setSelectedMember(member)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">{format(currentMonth, 'MMMM yyyy')}</h2>
        <div className="flex space-x-2">
          <Button variant="outline" size="icon" onClick={previousMonth}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={nextMonth}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-2 sm:gap-4">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div key={day} className="text-center font-semibold">
            {day}
          </div>
        ))}
        {days.map((day, dayIdx) => {
          const member = getRandomMember(day)
          return (
            <Dialog key={day.toString()}>
              <DialogTrigger asChild>
                <button
                  className={`
                    aspect-square flex flex-col items-center justify-center p-1 sm:p-2 rounded-lg
                    ${!isSameMonth(day, currentMonth) ? 'text-gray-400' : ''}
                    ${isToday(day) ? 'bg-blue-100 font-semibold' : ''}
                    hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500
                  `}
                  onClick={() => handleDayClick(day, member)}
                >
                  <span className="text-sm sm:text-base">{format(day, 'd')}</span>
                  <Avatar className="h-6 w-6 sm:h-8 sm:w-8">
                    <AvatarImage src={`https://avatar.vercel.sh/${member.user.name}`} />
                    <AvatarFallback>{member.user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <span className="hidden sm:block text-xs mt-1 overflow-hidden overflow-ellipsis w-full text-center">
                    {member.user.name}
                  </span>
                  <span className="block sm:hidden text-xs mt-1">
                    {member.user.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>{format(day, 'MMMM d, yyyy')}</DialogTitle>
                  <DialogDescription>Team member in charge for this day</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={`https://avatar.vercel.sh/${member.user.name}`} />
                      <AvatarFallback>{member.user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-semibold">{member.user.name}</h4>
                      <p className="text-sm text-gray-500">{member.role}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Email:</p>
                    <p className="text-sm">{member.user.email}</p>
                  </div>
                  {member.mealCounts && (
                    <div>
                      <p className="text-sm font-medium">Meal Counts:</p>
                      <ul className="text-sm list-disc list-inside">
                        <li>Morning: {member.mealCounts.morning}</li>
                        <li>Noon: {member.mealCounts.noon}</li>
                        <li>Night: {member.mealCounts.night}</li>
                      </ul>
                    </div>
                  )}
                </div>
              </DialogContent>
            </Dialog>
          )
        })}
      </div>
    </div>
  )
}


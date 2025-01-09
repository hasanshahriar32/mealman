"use client"

import { useState } from 'react'
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday, isBefore, isAfter, addMonths } from 'date-fns'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { useRouter } from 'next/navigation'

interface MealBooking {
  morning: boolean
  noon: boolean
  evening: boolean
}

interface DayBooking {
  [date: string]: MealBooking
}

export default function BookingCalendar({slug}: {slug: number}) {
  const router = useRouter()
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date())
  const [bookings, setBookings] = useState<DayBooking>({})
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  // Define the range of enabled dates (e.g., next 30 days)
  const today = new Date()
  const thirtyDaysLater = addMonths(today, 1)

  const isDateEnabled = (date: Date) => {
    return !isBefore(date, today) && !isAfter(date, thirtyDaysLater)
  }

  const handleDateClick = (date: Date) => {
    if (isDateEnabled(date)) {
      setSelectedDate(date)
    }
  }

  const handleBookingChange = (meal: keyof MealBooking) => {
    if (selectedDate) {
      const dateString = format(selectedDate, 'yyyy-MM-dd')
      setBookings(prev => ({
        ...prev,
        [dateString]: {
          ...prev[dateString],
          [meal]: !prev[dateString]?.[meal]
        }
      }))
    }
  }

  const getMealCount = (date: Date) => {
    const dateString = format(date, 'yyyy-MM-dd')
    const dayBooking = bookings[dateString]
    if (!dayBooking) return 0
    return Object.values(dayBooking).filter(Boolean).length
  }

  const previousMonth = () => {
    setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1))
  }

  const nextMonth = () => {
    setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1))
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center">
        Meal Booking Calendar
      </h1>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg md:text-xl font-semibold">
            {format(currentMonth, "MMMM yyyy")}
          </h2>
          <div className="flex space-x-2">
            <Button variant="outline" size="icon" onClick={previousMonth}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={nextMonth}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-2 md:p-4">
          <Calendar
            mode="single"
            selected={selectedDate || undefined}
            onSelect={(date) => date && handleDateClick(date)}
            className="rounded-md border w-full"
            month={currentMonth}
            modifiers={{
              disabled: (date) => !isDateEnabled(date),
            }}
            modifiersStyles={{
              disabled: { opacity: 0.5 },
            }}
            components={{
              //@ts-expect-error
              DayContent: ({ date }: { date: Date }) => (
                <div className="flex flex-col items-center justify-center h-full">
                  <span className="text-sm md:text-base">
                    {format(date, "d")}
                  </span>
                  {isDateEnabled(date) && (
                    <span className="text-xs font-semibold">
                      {getMealCount(date)}
                    </span>
                  )}
                </div>
              ),
            }}
          />
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <div className="flex items-center gap-2 flex-wrap w-full justify-center">
              <Button
                className="w-full md:w-auto"
                disabled={!selectedDate || !isDateEnabled(selectedDate!)}
              >
                Book Meals for{" "}
                {selectedDate
                  ? format(selectedDate, "MMM dd, yyyy")
                  : "Selected Date"}
              </Button>
              <Button variant={'outline'} className='' onClick={() => router.back()}>Return</Button>
            </div>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>
                Book Meals for{" "}
                {selectedDate
                  ? format(selectedDate, "MMMM d, yyyy")
                  : "Selected Date"}
              </DialogTitle>
              <DialogDescription>
                Select the meals you want to book for this day.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              {selectedDate &&
                ["morning", "noon", "evening"].map((meal) => (
                  <div key={meal} className="flex items-center space-x-2">
                    <Checkbox
                      id={meal}
                      checked={
                        bookings[format(selectedDate, "yyyy-MM-dd")]?.[
                          meal as keyof MealBooking
                        ] || false
                      }
                      onCheckedChange={() =>
                        handleBookingChange(meal as keyof MealBooking)
                      }
                    />
                    <Label htmlFor={meal} className="text-sm md:text-base">
                      {meal.charAt(0).toUpperCase() + meal.slice(1)} Meal
                    </Label>
                  </div>
                ))}
            </div>
            <DialogFooter>
              <Button variant="default" onClick={() => alert("Meals booked!")}>
                Book Meals
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}


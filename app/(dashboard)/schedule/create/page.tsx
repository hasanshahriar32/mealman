'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Lock, Trash2, Loader2, PlusIcon, FormInput } from 'lucide-react';
import { startTransition, useActionState, useState } from 'react';
import { createTeam, deleteAccount } from '@/app/(login)/actions';
import { CalendarIcon } from "@radix-ui/react-icons";
import { addDays, format, endOfMonth, startOfMonth } from "date-fns";
import { DateRange } from "react-day-picker";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
type ActionState = {
  error?: string;
  success?: string;
};

export default function SecurityPage() {
  const [createTeamState, createTeamAction, isCreateTeamPending] =
  // @ts-ignore
    useActionState<ActionState>(createTeam, { error: "", success: "" });

  const [deleteState, deleteAction, isDeletePending] = useActionState<
    ActionState,
    FormData
  >(deleteAccount, { error: "", success: "" });

  const [date, setDate] = useState<DateRange | undefined>({
    from: startOfMonth(new Date()), // First date of the current month
    to: endOfMonth(new Date()), // Last date of the current month
  });

  const handleTeamSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const scheduleName = new FormData(event.currentTarget).get("scheduleName");
    const scheduleData = {
      name: scheduleName,
      startDate: date?.from,
      endDate: date?.to,
    };

    // Format startDate and endDate with date-fns, including milliseconds
    const formattedStartDate = date?.from
      ? format(date.from, "yyyy-MM-dd HH:mm:ss.SSSSSS")
      : "";
    const formattedEndDate = date?.to
      ? format(date.to, "yyyy-MM-dd HH:mm:ss.SSSSSS")
      : "";

    const newFormData = new FormData();
    newFormData.append("name", scheduleName as string);
    newFormData.append("startDate", formattedStartDate as string);
    newFormData.append("endDate", formattedEndDate as string);

    console.log(newFormData); // For debugging purposes
    startTransition(() => {
      // @ts-ignore
      createTeamAction(newFormData);
    });
  };

  const handleJoinSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    startTransition(() => {
      deleteAction(new FormData(event.currentTarget));
    });
  };

  return (
    <section className="flex-1 p-4 lg:p-8">
      <h1 className="text-lg lg:text-2xl font-medium bold text-gray-900 mb-6">
        Create or Join a Schedule
      </h1>
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Create a schedule</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleTeamSubmit}>
            <div className={cn("grid gap-2 w-full ")}>
              <Popover>
                <Label htmlFor="Team-duration">Team Duration</Label>
                <div className="flex justify-between items-center flex-row-reverse">
                  <PopoverTrigger asChild>
                    <Button
                      id="date"
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                      )}
                    >
                      {/* <CalendarIcon /> */}
                      {date?.from ? (
                        date.to ? (
                          <>
                            {format(date.from, "LLL dd, y")} -{" "}
                            {format(date.to, "LLL dd, y")}
                          </>
                        ) : (
                          format(date.from, "LLL dd, y")
                        )
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="end">
                    <Calendar
                      initialFocus
                      mode="range"
                      defaultMonth={date?.from}
                      selected={date}
                      onSelect={setDate}
                      numberOfMonths={2}
                    />
                  </PopoverContent>
                </div>
              </Popover>
            </div>
            <div>
              <Label htmlFor="schedule-name">Schedule Name</Label>
              <Input
                id="schedule-name"
                name="scheduleName"
                type="text"
                autoComplete="schedule-name"
                required
                minLength={1}
                maxLength={100}
              />
            </div>
            {createTeamState.error && (
              <p className="text-red-500 text-sm">{createTeamState.error}</p>
            )}
            {createTeamState.success && (
              <p className="text-green-500 text-sm">
                {createTeamState.success}
              </p>
            )}
            <Button
              type="submit"
              className="bg-orange-500 hover:bg-orange-600 text-white"
              disabled={isCreateTeamPending}
            >
              {isCreateTeamPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Updating...
                </>
              ) : (
                <>
                  <FormInput className="mr-2 h-4 w-4" />
                  Create New Schedule
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Join existing Schedule</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-500 mb-4">
            Enter your manager's code to join the schedule.
          </p>
          <form onSubmit={handleJoinSubmit} className="space-y-4">
            <div>
              <Label htmlFor="join-manager">Manager Code</Label>
              <Input
                id="join-manager"
                name="joinManager"
                type="joinManager"
                required
                minLength={5}
                maxLength={10}
              />
            </div>
            {deleteState.error && (
              <p className="text-red-500 text-sm">{deleteState.error}</p>
            )}
            <Button
              type="submit"
              variant="destructive"
              className="bg-red-600 hover:bg-red-700"
              disabled={isDeletePending}
            >
              {isDeletePending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Joining...
                </>
              ) : (
                <>
                  <PlusIcon className="mr-2 h-4 w-4" />
                  Join Schedule
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </section>
  );
}

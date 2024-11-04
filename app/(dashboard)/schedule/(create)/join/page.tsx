"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Loader2, PlusIcon } from "lucide-react";
import { startTransition, useActionState } from "react";
import Link from "next/link";
import { joinTeam } from '@/app/(login)/actions';


// Define the ActionState type to include both error and success messages
type ActionState = {
  error?: string;
  success?: string;
};

// Main component for joining an existing schedule
export default function JoinSchedulePage() {
  // Use state for handling join action and managing pending state
  const [joinState, joinAction, isJoinPending] = useActionState<
    ActionState,
    FormData
  >(joinTeam, { error: "", success: "" });

  // Handle form submission for joining a schedule
  const handleJoinSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    console.log(formData); // For debugging purposes

    startTransition(() => {
        //@ts-ignore
      joinAction(formData); // Submit the form data to the join action
    });
  };

  return (
    <section>
      <Card className="mb-2">
        <CardHeader>
          <CardTitle>Join an Existing Schedule</CardTitle>
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
                name="teamCode"
                type="text"
                required
                minLength={5}
                maxLength={10}
                placeholder="Enter manager code"
              />
            </div>
            {joinState.error && (
              <p className="text-red-500 text-sm">{joinState.error}</p>
            )}
            <Button
              type="submit"
              variant="default"
              className="bg-green-600 hover:bg-green-700"
              disabled={isJoinPending}
            >
              {isJoinPending ? (
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
      <Link href="/schedule/create">
        <Button variant="link">Create new schedule</Button>
      </Link>
    </section>
  );
}

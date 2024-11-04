"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {  Loader2, PlusIcon } from "lucide-react";
import { startTransition, useActionState, useState } from "react";
import {  deleteAccount } from "@/app/(login)/actions";
import Link from "next/link";

type ActionState = {
  error?: string;
  success?: string;
};

export default function SecurityPage() {

  const [deleteState, deleteAction, isDeletePending] = useActionState<
    ActionState,
    FormData
  >(deleteAccount, { error: "", success: "" });

  

  const handleJoinSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    startTransition(() => {
      deleteAction(new FormData(event.currentTarget));
    });
  };

  return (
    <section>
      <Card className="mb-2">
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
              className="bg-green-600 hover:bg-green-700"
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
      <Link href="/schedule/create">
        <Button variant={"link"}>Create new schedule</Button>
      </Link>
    </section>
  );
}

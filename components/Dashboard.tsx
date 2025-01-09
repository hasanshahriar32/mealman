"use client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DataTable } from "./DataTable"
import { generateMockData, User } from "@/utils/mockData"
import { TeamDataWithMembers } from "@/lib/db/schema";

export function Dashboard({ teamData }: { teamData: User[] }) {
  // const mockData = generateMockData(50); // Generate 50 mock users
  // console.log(mockData)

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mx-5 sm:mx-0 mb-6">Joined schedules</h1>
      <Card>
        <CardHeader>
          <CardTitle>Schedules</CardTitle>
          <CardDescription>
            A list of all users in your organization.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable data={teamData} itemsPerPage={10} />
        </CardContent>
      </Card>
    </div>
  );
}


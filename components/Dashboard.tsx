"use client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DataTable } from "./DataTable"
import { generateMockData } from "@/utils/mockData"

export function Dashboard() {
  const mockData = generateMockData(50); // Generate 50 mock users

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mx-5 sm:mx-0 mb-6">All manager list</h1>
      <Card>
        <CardHeader>
          <CardTitle>Users</CardTitle>
          <CardDescription>A list of all users in your organization.</CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable data={mockData} itemsPerPage={10} />
        </CardContent>
      </Card>
    </div>
  )
}


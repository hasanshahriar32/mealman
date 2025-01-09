"use client"

import { useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

interface TeamMember {
  id: number
  user: {
    name: string
  }
  mealCounts?: {
    morning: number
    noon: number
    night: number
  }
}

interface MealListTableProps {
  teamMembers: TeamMember[]
}

export function MealListTable({ teamMembers }: MealListTableProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  const paginatedMembers = teamMembers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  return (
    <div className="space-y-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Member</TableHead>
            <TableHead>Morning</TableHead>
            <TableHead>Noon</TableHead>
            <TableHead>Night</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedMembers.map((member) => (
            <TableRow key={member.id}>
              <TableCell>{member.user.name}</TableCell>
              <TableCell>{member.mealCounts?.morning ?? 0}</TableCell>
              <TableCell>{member.mealCounts?.noon ?? 0}</TableCell>
              <TableCell>{member.mealCounts?.night ?? 0}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious 
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              style={{ pointerEvents: currentPage === 1 ? 'none' : 'auto', opacity: currentPage === 1 ? 0.5 : 1 }}
            />
          </PaginationItem>
          {[...Array(Math.ceil(teamMembers.length / itemsPerPage))].map((_, index) => (
            <PaginationItem key={index}>
              <PaginationLink 
                onClick={() => setCurrentPage(index + 1)}
                isActive={currentPage === index + 1}
              >
                {index + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext 
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, Math.ceil(teamMembers.length / itemsPerPage)))}
              style={{ pointerEvents: currentPage === Math.ceil(teamMembers.length / itemsPerPage) ? 'none' : 'auto', opacity: currentPage === Math.ceil(teamMembers.length / itemsPerPage) ? 0.5 : 1 }}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  )
}


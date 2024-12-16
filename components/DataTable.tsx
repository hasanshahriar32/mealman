"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { ArrowUpFromLineIcon, ArrowUpRightFromCircleIcon, ChevronLeft, ChevronRight } from 'lucide-react'
import { User } from "@/utils/mockData"
import { usePagination } from "@/hooks/usePagination"
import { TeamDataWithMembers } from "@/lib/db/schema"
import Link from "next/link"
import { useRouter } from "next/navigation";

interface DataTableProps {
  data: User[];
  itemsPerPage: number;
}

export function DataTable({ data, itemsPerPage }: DataTableProps) {
  const router = useRouter();
  const { currentPage, totalPages, paginatedItems, goToPage } = usePagination(data, itemsPerPage);

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Option</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedItems?.map((user) => (
            <TableRow key={user?.id}>
              <TableCell>{user?.id}</TableCell>
              <TableCell>{user?.name}</TableCell>
              <TableCell>
                <Link
                  className="flex hover:text-orange-700 flex-row items-center justify-center gap-1"
                  href={`schedule/details/${user?.id}`}
                >
                  Detail <ArrowUpRightFromCircleIcon className="w-3 h-3" />
                </Link>
              </TableCell>
              <TableCell>
                <Button
                  onClick={() => router.push(`schedule/book/${user?.id}`)}
                  variant="outline"
                  size="sm"
                >
                  Book
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex items-center justify-between space-x-2 py-4">
        <div className="text-sm text-muted-foreground">
          Page {currentPage} of {totalPages}
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Previous page</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Next page</span>
          </Button>
        </div>
      </div>
    </div>
  );
}


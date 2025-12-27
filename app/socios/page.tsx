"use client";

import {AppSidebar} from "@/components/app-sidebar";
// import {
//   Breadcrumb,
//   BreadcrumbItem,
//   BreadcrumbLink,
//   BreadcrumbList,
//   BreadcrumbPage,
//   BreadcrumbSeparator,
// } from "@/components/ui/breadcrumb";
// import {Separator} from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import * as React from "react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
} from "@tanstack/react-table";
import {ArrowUpDown, ChevronDown, MoreHorizontal, UserRoundPen, UserRoundSearch, UserRoundX} from "lucide-react";
import {Button} from "@/components/ui/button";
import {Checkbox} from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {Input} from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MemberDetailsDialog } from "@/components/modals/memberDetails";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export type Socio = {
  id: string
  name: string
  avatar: string
  email: string
  nSocio: string
  type: string
  phone: string
  morada: string
  whatsapp: boolean
  status: "active" | "inactive"
  joiaPaid: boolean
  quotaPaid: { [year: string]: boolean }
  birthdate: Date
  memberSince: Date
}

const data: Socio[] = [
  {
    id: "m5gr84i9",
    name: "Joaquim Barbosa",
    avatar: " ",
    nSocio: "001",
    type: "Socio",
    phone: "912345678",
    morada: "Rua A, 123",
    whatsapp: true,
    status: "active",
    email: "joaquim@example.com",
    joiaPaid: true,
    quotaPaid: {"2023": true, "2024": false},
    birthdate: new Date("1980-05-15"),
    memberSince: new Date("2010-06-20"),
  },
  {
    id: "3u1reuv4",
    name: "Abe45",
    avatar: " ",
    nSocio: "002",
    type: "Socio",
    phone: "923456789",
    morada: "Avenida B, 456",
    whatsapp: false,
    status: "active",
    email: "Abe45@example.com",
    joiaPaid: true,
    quotaPaid: {"2023": true, "2024": true},
    birthdate: new Date("1975-09-30"),
    memberSince: new Date("2012-03-15"),
  },
  {
    id: "derv1ws0",
    name: "Monserrat44",
    avatar: " ",
    nSocio: "003",
    type: "Socio",
    phone: "934567890",
    morada: "Travessa C, 789",
    whatsapp: true,
    status: "inactive",
    email: "Monserrat44@example.com",
    joiaPaid: false,
    quotaPaid: {"2023": false, "2024": false},
    birthdate: new Date("1990-12-10"),
    memberSince: new Date("2015-11-05"),
  },
  {
    id: "5kma53ae",
    name: "Silas22",
    avatar: "https://github.com/shadcn.png",
    nSocio: "004",
    type: "Socio",
    phone: "945678901",
    morada: "Largo D, 101",
    whatsapp: true,
    status: "active",
    joiaPaid: true,
    quotaPaid: {"2023": true, "2024": true},
    birthdate: new Date("1985-07-25"),
    memberSince: new Date("2018-08-12"),
    email: "Silas22@example.com",
  },
  {
    id: "bhqecj4p",
    name: "Carmella Maria Silva",
    avatar: "",
    nSocio: "005",
    type: "Socio",
    phone: "956789012",
    morada: "Rua E, 202",
    whatsapp: false,
    status: "inactive",
    joiaPaid: false,
    quotaPaid: {"2023": true, "2024": false},
    birthdate: new Date("1995-03-18"),
    memberSince: new Date("2020-01-22"),
    email: "carmella@example.com",
  },
  {
    id: "xj4lt9z6",
    name: "Domenic",
    avatar: " ",
    nSocio: "006",
    type: "Socio",
    phone: "967890123",
    morada: "Avenida F, 303",
    whatsapp: true,
    status: "active",
    joiaPaid: true,
    quotaPaid: {"2023": true, "2024": true},
    birthdate: new Date("1978-11-02"),
    memberSince: new Date("2008-04-17"),
    email: "domenic@example.com",
  },
  {
    id: "p2v3n8qj",
    name: "Eleanora",
    avatar: " ",
    nSocio: "007",
    type: "Socio",
    phone: "978901234",
    morada: "Travessa G, 404",
    whatsapp: false,
    status: "active",
    joiaPaid: true,
    quotaPaid: {"2023": false, "2024": true},
    birthdate: new Date("1988-04-09"),
    memberSince: new Date("2011-09-30"),
    email: "eleanora@example.com",
  },
  {
    id: "9w0z7yxl",
    name: "Ferdinand Costa",
    avatar: "",
    nSocio: "008",
    type: "Socio",
    phone: "989012345",
    morada: "Largo H, 505",
    whatsapp: true,
    status: "inactive",
    joiaPaid: false,
    quotaPaid: {"2023": false, "2024": false},
    birthdate: new Date("1992-06-14"),
    memberSince: new Date("2016-05-08"),
    email: "ferdinand@example.com",
  },
  {
    id: "q8r5t2vs",
    name: "Giselle",
    avatar: "https://github.com/shadcn.png",
    nSocio: "009",
    type: "Socio",
    phone: "990123456",
    morada: "Rua I, 606",
    whatsapp: false,
    status: "active",
    joiaPaid: true,
    quotaPaid: {"2023": true, "2024": false},
    birthdate: new Date("1983-02-27"),
    memberSince: new Date("2009-12-03"),
    email: "giselle@example.com",
  },
  {
    id: "t4u6v1bw",
    name: "Harrison",
    avatar: " ",
    nSocio: "010",
    type: "Socio",
    phone: "901234567",
    morada: "Avenida J, 707",
    whatsapp: true,
    status: "active",
    joiaPaid: true,
    quotaPaid: {"2023": true, "2024": true},
    birthdate: new Date("1972-10-19"),
    memberSince: new Date("2005-07-29"),
    email: "harrison@example.com",
  },
  {
    id: "z3a9b8cn",
    name: "Isadora Mendes",
    avatar: "",
    nSocio: "011",
    type: "Socio",
    phone: "912345679",
    morada: "Travessa K, 808",
    whatsapp: false,
    status: "inactive",
    joiaPaid: false,
    quotaPaid: {"2023": false, "2024": false},
    birthdate: new Date("1998-08-23"),
    memberSince: new Date("2021-03-11"),
    email: "isadora@example.com",
  },
  {
    id: "c7d2e5f0",
    name: "Jethro Silva",
    avatar: " ",
    nSocio: "012",
    type: "Socio",
    phone: "923456780",
    morada: "Largo L, 909",
    whatsapp: true,
    status: "active",
    joiaPaid: true,
    quotaPaid: {"2023": true, "2024": true},
    birthdate: new Date("1986-01-05"),
    memberSince: new Date("2013-10-21"),
    email: "jethro@example.com",
  },
  {
    id: "f1g4h7j2",
    name: "Katerina Sousa",
    avatar: " ",
    nSocio: "013",
    type: "Socio",
    phone: "934567891",
    morada: "Rua M, 111",
    whatsapp: false,
    status: "active",
    joiaPaid: true,
    quotaPaid: {"2023": false, "2024": true},
    birthdate: new Date("1991-09-12"),
    memberSince: new Date("2014-02-14"),
    email: "katerina@example.com",
  },
];

export const columns: ColumnDef<Socio>[] = [
  {
    id: "select",
    header: ({table}) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({row}) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({column}) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nome
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({row}) => {
        const nameParts = row.original.name.split(" ");
        const initials = nameParts.length > 1 
          ? (nameParts[0][0] + nameParts[nameParts.length - 1][0]).toUpperCase()
          : nameParts[0][0].toUpperCase();
      return (
      <div className="capitalize flex flex-row items-center gap-2">
        <Avatar>
          <AvatarImage src={row.original.avatar} />
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
        {row.getValue("name")}
      </div>
      );
    },
  },
  {
    accessorKey: "nSocio",
    header: ({column}) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nº Sócio
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({row}) => <div className="lowercase">{row.getValue("nSocio")}</div>,
  },
  {
    accessorKey: "type",
    header: ({column}) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Tipo
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({row}) => <div className="lowercase">{row.getValue("type")}</div>,
  },
  {
    accessorKey: "status",
    header: ({column}) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({row}) => <div className="lowercase">{row.getValue("status")}</div>,
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({row, table}) => {
      const member = row.original;
      const openDetails = (
        table.options.meta as {openDetails: (member: Socio) => void}
      ).openDetails;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Ações</DropdownMenuLabel>
            <DropdownMenuItem
              onSelect={() => {
                openDetails(member);
              }}
            >
              <UserRoundSearch />
              Ver Detalhes
            </DropdownMenuItem>
            <DropdownMenuItem>
              <UserRoundPen />
              Editar
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <UserRoundX />
              Eliminar
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

function DataTableDemo() {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})
  const [detailsOpen, setDetailsOpen] = React.useState(false)
  const [selectedMember, setSelectedMember] = React.useState<Socio | null>(null)
  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    meta: {
      openDetails: (member: Socio) => {
        setSelectedMember(member)
        setDetailsOpen(true)
      },
    },
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })
  return (
    <>
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter names..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Colunas <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="text-muted-foreground flex-1 text-sm">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
    <MemberDetailsDialog
      open={detailsOpen}
      onOpenChange={setDetailsOpen}
      member={selectedMember ?? undefined}
    />
    </>
  )
  // Render controlled dialog outside dropdown
  
}

export default function Page() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            {/*<Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
             <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">
                    Building Your Application
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb> */}
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight text-balance">
                Sócios
              </h1>
              <p className="text-muted-foreground">
                Gestão de membros do clube
              </p>
            </div>
          </div>
          <DataTableDemo />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

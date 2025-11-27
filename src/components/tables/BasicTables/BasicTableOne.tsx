import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../ui/table";

import Button from "../../ui/button/Button";

interface Order {
  id: number;
  jenisBibit: string;
  ukuran: string;
  qtyIn: number;
  qtyOut: number;
  qtyEnd: number;
  price: number;
  desc: string;
}

// Define the table data using the interface
const tableData: Order[] = [
  {
    id: 1,
    jenisBibit: "Sangkuriang",
    ukuran: "3-4",
    qtyIn: 500,
    qtyOut: 200,
    qtyEnd: 300,
    price: 350,
    desc: "-",
  },
  {
    id: 1,
    jenisBibit: "Sangkuriang",
    ukuran: "5-6",
    qtyIn: 1000,
    qtyOut: 800,
    qtyEnd: 200,
    price: 500,
    desc: "-",
  },
  {
    id: 1,
    jenisBibit: "dumbo",
    ukuran: "4-5",
    qtyIn: 2000,
    qtyOut: 800,
    qtyEnd: 1200,
    price: 450,
    desc: "-",
  },
];

export default function BasicTableOne() {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <Table>
          {/* Table Header */}
          <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
            <TableRow>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-700 text-start text-theme-sm dark:text-gray-200"
              >
                Jenis Bibit
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-700 text-start text-theme-sm dark:text-gray-200"
              >
                Ukuran
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-700 text-start text-theme-sm dark:text-gray-200"
              >
                Qty In
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-700 text-start text-theme-sm dark:text-gray-200"
              >
                Qty Out
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-700 text-start text-theme-sm dark:text-gray-200"
              >
                Qty End
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-700 text-start text-theme-sm dark:text-gray-200"
              >
                Price
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-700 text-start text-theme-sm dark:text-gray-200"
              >
                Deskripsi
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-700 text-start text-theme-sm dark:text-gray-200"
              >
                Action
              </TableCell>
            </TableRow>
          </TableHeader>

          {/* Table Body */}
          <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
            {tableData.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {order.jenisBibit}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {order.ukuran}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {order.qtyIn}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {order.qtyOut}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {order.qtyEnd}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {order.price}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {order.desc}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    <div className="flex items-center gap-5">
                      <Button size="xs" variant="warning">
                        Edit
                      </Button>
                      <Button size="xs" variant="danger">
                        Delete
                      </Button>
                    </div>
                </TableCell>



                {/* <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  <Badge
                    size="sm"
                    color={
                      order.status === "Active"
                        ? "success"
                        : order.status === "Pending"
                        ? "warning"
                        : "error"
                    }
                  >
                    {order.status}
                  </Badge>
                </TableCell> */}
                
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../ui/table";

export interface LaporanItem {
  id_laporan: number;
  bulan: string;
  tahun: string;
  qty_in: number;
  qty_out: number;
  pendapatan: number;
}

interface LaporanTableProps {
  items: LaporanItem[];
}

export default function LaporanTable({ items }: LaporanTableProps) {
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
                Bulan
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-700 text-start text-theme-sm dark:text-gray-200"
              >
                Tahun
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
                Pendapatan
              </TableCell>
            </TableRow>
          </TableHeader>

          {/* Table Body */}
          <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
            {items.map((item) => (
              <TableRow key={item.id_laporan}>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {item.bulan}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {item.tahun}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {item.qty_in}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {item.qty_out}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {item.pendapatan}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

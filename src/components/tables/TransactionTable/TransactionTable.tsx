import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../ui/table";

import Button from "../../ui/button/Button";
// Note: use parent-provided onEdit to open modal or navigate where needed

export interface TransactionItem {
  id_penjualan: number;
  id_pembeli: number;
  id_bibit: number;
  qty: number;
  tgl_penjualan: string;
  subtotal: number;
  // Joined fields
  nama_pembeli?: string;
  jenis_bibit?: string;
  ukuran?: string;
  harga_satuan?: number;
  qty_end?: number;
}

interface TransactionTableProps {
  items: TransactionItem[];
  onEdit?: (item: TransactionItem) => void;
  onDelete?: (id_penjualan: number) => void;
}

export default function TransactionTable({ items, onEdit, onDelete }: TransactionTableProps) {
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
                Nama Pembeli
              </TableCell>
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
                Qty
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-700 text-start text-theme-sm dark:text-gray-200"
              >
                Subtotal
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-700 text-start text-theme-sm dark:text-gray-200"
              >
                Tanggal Penjualan
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
            {items.map((item) => (
              <TableRow key={item.id_penjualan}>
                <TableCell className="px-4 py-3 text-gray-700 text-start text-theme-sm dark:text-gray-200">
                  {item.nama_pembeli}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {item.jenis_bibit}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {item.ukuran}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {item.qty}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  Rp{item.subtotal}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {item.tgl_penjualan}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  <div className="flex items-center gap-3">
                    <Button size="xs" variant="warning" onClick={() => onEdit?.(item)}>
                      Edit
                    </Button>
                    <Button size="xs" variant="danger" onClick={() => onDelete?.(item.id_penjualan)}>
                      Delete
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

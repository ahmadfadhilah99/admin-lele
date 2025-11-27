import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../ui/table";

import Button from "../../ui/button/Button";

export interface BibitItem {
  id_bibit: number;
  jenis_bibit: string;
  ukuran: string;
  qty_in: number;
  qty_out: number;
  qty_end: number;
  price: number;
  deskripsi: string;
}

interface BibitTableProps {
  items: BibitItem[];
  onEdit?: (item: BibitItem) => void;
  onDelete?: (id_bibit: number) => void;
}

export default function BibitTable({ items, onEdit, onDelete }: BibitTableProps) {
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
            {items.map((item) => (
              <TableRow key={item.id_bibit}>
                <TableCell className="px-4 py-3 text-gray-700 text-start text-theme-sm dark:text-gray-200">
                  {item.jenis_bibit}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {item.ukuran}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {item.qty_in}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {item.qty_out}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {item.qty_end}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  Rp{item.price}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {item.deskripsi}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  <div className="flex items-center gap-3">
                    <Button 
                      size="xs" 
                      variant="warning" 
                      onClick={() => onEdit?.(item)}
                    >
                      Edit
                    </Button>
                    <Button 
                      size="xs" 
                      variant="danger"
                      onClick={() => onDelete?.(item.id_bibit)}
                    >
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

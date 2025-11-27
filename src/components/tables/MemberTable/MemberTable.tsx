import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../ui/table";

import Button from "../../ui/button/Button";
// Note: use parent-provided onEdit to open modal or navigate where needed

export interface MemberItem {
  id_pembeli: number;
  nama_pembeli: string;
  alamat: string;
  no_tlp: string;
}

interface MemberTableProps {
  items: MemberItem[];
  onEdit?: (item: MemberItem) => void;
  onDelete?: (id_pembeli: number) => void;
}

export default function MemberTable({ items, onEdit, onDelete }: MemberTableProps) {
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
                Alamat
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-700 text-start text-theme-sm dark:text-gray-200"
              >
                No HP
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
              <TableRow key={item.id_pembeli}>
                <TableCell className="px-4 py-3 text-gray-700 text-start text-theme-sm dark:text-gray-200">
                  {item.nama_pembeli}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {item.alamat}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {item.no_tlp}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  <div className="flex items-center gap-3">
                    <Button size="xs" variant="warning" onClick={() => onEdit?.(item)}>
                      Edit
                    </Button>
                    <Button size="xs" variant="danger" onClick={() => onDelete?.(item.id_pembeli)}>
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

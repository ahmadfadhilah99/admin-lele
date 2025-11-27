import Button from "../ui/button/Button";
import { Download } from "lucide-react";

interface PrintButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

export default function PrintButton({ onClick, disabled = false }: PrintButtonProps) {
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={onClick}
      disabled={disabled}
      className="flex items-center gap-2 mb-4"
    >
      <Download className="h-4 w-4" />
      <span>Cetak Laporan</span>
    </Button>
  );
}

// Import library dan komponen yang diperlukan
import { useRef } from 'react';
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import LaporanTable, { LaporanItem } from "../../components/tables/LaporanTable/LaporanTable";
import { useLaporanList } from '../../hooks/useLaporan'; // Custom hook untuk mengambil data laporan
import Button from "../../components/ui/button/Button";
import { Download } from "lucide-react"; // Ikon download dari Lucide

export default function LaporanTables() {
  // Menggunakan custom hook useLaporanList untuk mengambil data laporan
  const { data, isLoading, isError, error } = useLaporanList();
  
  // Membuat ref untuk menangkap elemen yang akan di-print
  const printRef = useRef<HTMLDivElement>(null);

  // Mengubah data menjadi array kosong jika data tidak tersedia
  const items: LaporanItem[] = Array.isArray(data) ? data : [];

  // Fungsi untuk menangani proses print
  const handlePrint = () => {
    // Pastikan elemen yang akan di-print ada
    if (printRef.current) {
      // Simpan konten tabel yang akan di-print
      const printContent = printRef.current.innerHTML;
      // Simpan konten asli halaman
      const originalContent = document.body.innerHTML;
      
      // Ganti isi body dengan template untuk print
      document.body.innerHTML = `
        <!-- Container utama untuk print -->
        <div style="font-family: Arial, sans-serif; max-width: 210mm; margin: 0 auto; padding: 20px;">
          <!-- Kop Surat -->
          <div style="text-align: center; margin-bottom: 20px; border-bottom: 2px solid 
          #000; padding-bottom: 20px;">
            <div style="font-size: 24px; font-weight: bold; margin-bottom: 10px;">
              MayFarm
            </div>
            <div style="font-size: 18px; font-weight: bold; margin-top: 15px;">Laporan 
            Produksi dan Penjualan</div>
          </div>
                    
          <!-- Tanggal Cetak -->
          <div style="margin-bottom: 20px; text-align: left;">
            <p><strong>Tanggal Cetak:</strong> ${new Date().toLocaleDateString('id-ID',
            {
              day: '2-digit',
              month: 'long',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}</p>
          </div>
          
          <!-- Konten Tabel -->
          <div style="margin-top: 30px;">
            ${printContent}
          </div>
          
        </div>
        
        <style>
          /* Styling khusus untuk print */
          @media print {
            /* Atur ukuran dan margin halaman */
            @page {
              size: A4;
              margin: 20mm;
            }
            /* Reset styling body untuk hasil print yang konsisten */
            body {
              margin: 0;
              background: white;
              color: black;
            }
          }
        </style>
      `;
      
      // Jalankan print dialog
      window.print();
      
      // Kembalikan konten asli halaman
      document.body.innerHTML = originalContent;
      
      // Reload halaman untuk memastikan semua komponen berfungsi normal
      window.location.reload();
    }
  };

  // Render komponen
  return (
    <>
      {/* Komponen untuk meta tag halaman */}
      <PageMeta
        title="MayFarm"
        description="Website penjualan bibit ikan"
      />
      
      {/* Breadcrumb navigasi */}
      <PageBreadcrumb pageTitle="Laporan" />
      
      <div className="space-y-6">
        {/* Tombol Cetak */}
        <div className="flex justify-end">
          <Button 
            variant="outline" 
            size="sm"
            onClick={handlePrint} // Menghubungkan fungsi handlePrint dengan tombol
            disabled={isLoading || isError || items.length === 0}
            className="flex items-center gap-2"
          >
            <Download className="h-4 w-4" />
            <span>Cetak Laporan</span>
          </Button>
        </div>
        
        {/* Container untuk konten yang akan di-print */}
        <div ref={printRef}>
          {isLoading && (
            <div className="text-gray-500 text-sm">Memuat data...</div>
          )}
          {isError && (
            <div className="text-red-500 text-sm">{(error as any)?.message || 
              'Gagal memuat data'}</div>
          )}
          {!isLoading && !isError && items.length === 0 && (
            <div className="text-gray-500 text-sm">Tidak ada data.</div>
          )}
          {!isLoading && !isError && items.length > 0 && (
            <LaporanTable items={items} />
          )}
        </div>
      </div>
    </>
  );
}

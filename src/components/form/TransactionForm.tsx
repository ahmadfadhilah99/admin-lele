import { useEffect, useState } from 'react';
import Form from './Form';
import Button from '../ui/button/Button';
import { useMemberList } from '../../hooks/useMember';
import { useQuery } from '@tanstack/react-query';
import { api } from '../../services/api/clients.js';

export type TransactionFormValues = {
  id_pembeli: number;
  id_bibit: number;
  qty: number;
  tgl_penjualan: string;
  subtotal: number;
};

interface Bibit {
  id_bibit: number;
  jenis_bibit: string;
  ukuran: string;
  harga_satuan: number;
  qty_end: number;
  price: number;
}


interface TransactionFormProps {
  initialValues?: TransactionFormValues;
  onSubmit: (values: TransactionFormValues) => void;
  onCancel?: () => void;
  submitLabel?: string;
}

const defaultValues: TransactionFormValues = {
  id_pembeli: 0,
  id_bibit: 0,
  qty: 0,
  tgl_penjualan: new Date().toISOString().split('T')[0],
  subtotal: 0,
};

export default function TransactionForm({ initialValues, onSubmit, onCancel, submitLabel = 'Save' }: TransactionFormProps) {
  const [values, setValues] = useState<TransactionFormValues>(initialValues ?? defaultValues);
  const { data: pembeliList = [] } = useMemberList();
  
  // Fetch bibit list
  const { data: bibitList = [] } = useQuery<Bibit[]>({
    queryKey: ['bibit-list'],
    queryFn: async () => {
      const { data } = await api.get('bibit/read');
      return data;
    },
  });

  // Calculate subtotal whenever qty or selected bibit changes
  useEffect(() => {
    if (values.id_bibit && values.qty > 0) {
      // Convert both to number for comparison
      const selectedBibit = bibitList.find(b => Number(b.id_bibit) === Number(values.id_bibit));
      
      if (selectedBibit) {
        // Pastikan properti harga_satuan ada dan valid
        const harga = Number(selectedBibit.price || selectedBibit.harga_satuan || 0);
        const qty = Number(values.qty) || 0;
        const newSubtotal = harga * qty;
        setValues(v => ({ ...v, subtotal: newSubtotal }));
      } else {
        setValues(v => ({ ...v, subtotal: 0 }));
      }
    } else {
      setValues(v => ({ ...v, subtotal: 0 }));
    }
  }, [values.id_bibit, values.qty, bibitList]);

  useEffect(() => {
    setValues(initialValues ?? defaultValues);
  }, [initialValues]);

  return (
    <div className="bg-white rounded-xl shadow-sm p-5 w-full max-w-lg mx-auto border border-gray-100">
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-gray-800">
          {initialValues ? 'Edit Data Transaksi' : 'Tambah Transaksi Baru'}
        </h2>
      </div>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit(values);
        }}
        className="space-y-4"
      >
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">Nama Pembeli</label>
          <select
            className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={values.id_pembeli}
            onChange={(e) => setValues(v => ({ ...v, id_pembeli: Number(e.target.value) }))}
            required
          >
            <option value="">Pilih Pembeli</option>
            {pembeliList.map((pembeli) => (
              <option key={pembeli.id_pembeli} value={pembeli.id_pembeli}>
                {pembeli.nama_pembeli}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">Jenis Bibit</label>
          <select
            className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={values.id_bibit}
            onChange={(e) => {
              const newIdBibit = Number(e.target.value);
              const selectedBibit = bibitList.find(b => Number(b.id_bibit) === newIdBibit);
              
              if (selectedBibit) {
                // Coba kedua kemungkinan nama properti (price atau harga_satuan)
                const harga = Number(selectedBibit.price || selectedBibit.harga_satuan || 0);
                const newSubtotal = harga * (values.qty || 0);
                setValues(v => ({
                  ...v,
                  id_bibit: newIdBibit,
                  subtotal: newSubtotal
                }));
              } else {
                setValues(v => ({
                  ...v,
                  id_bibit: newIdBibit,
                  subtotal: 0
                }));
              }
            }}
            required
          >
            <option value="">Pilih Jenis Bibit</option>
            {bibitList.map((bibit: any) => (
              <option key={bibit.id_bibit} value={bibit.id_bibit}>
                {bibit.jenis_bibit} - Ukuran: {bibit.ukuran} (Stok: {bibit.qty_end})
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">Jumlah (Qty)</label>
          <input
            type="number"
            min="1"
            className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={values.qty || ''}
            onChange={(e) => {
              const qty = Number(e.target.value);
              
              if (values.id_bibit) {
                const selectedBibit = bibitList.find(b => Number(b.id_bibit) === Number(values.id_bibit));
                
                if (selectedBibit) {
                  // Coba kedua kemungkinan nama properti (price atau harga_satuan)
                  const harga = Number(selectedBibit.price || selectedBibit.harga_satuan || 0);
                  const newSubtotal = harga * qty;
                  setValues(v => ({
                    ...v,
                    qty,
                    subtotal: newSubtotal
                  }));
                  return;
                }
              }
              
              // If no bibit selected or bibit not found
              setValues(v => ({
                ...v,
                qty,
                subtotal: 0
              }));
            }}
            placeholder="Masukkan jumlah"
            required
          />
        </div>

        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">Tanggal Penjualan</label>
          <input
            type="date"
            className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={values.tgl_penjualan}
            onChange={(e) => setValues(v => ({ ...v, tgl_penjualan: e.target.value }))}
            required
          />
        </div>

        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">Subtotal</label>
          <div className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 bg-gray-50">
            {new Intl.NumberFormat('id-ID', {
              style: 'currency',
              currency: 'IDR',
              minimumFractionDigits: 0,
              maximumFractionDigits: 0
            }).format(values.subtotal || 0)}
          </div>
        </div>
      
        <div className="flex justify-end gap-2 pt-3 border-t border-gray-100">
          {onCancel && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={onCancel}
              className="px-4 py-1.5 text-sm"
            >
              Batal
            </Button>
          )}
          <Button
            type="submit"
            variant="primary"
            size="sm"
            className="px-4 py-1.5 text-sm"
          >
            {submitLabel}
          </Button>
        </div>
      </Form>
    </div>
  );
}

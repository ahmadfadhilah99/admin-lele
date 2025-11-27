import { useEffect, useState } from 'react';
import Form from './Form';
import Button from '../ui/button/Button';

export type BibitFormValues = {
  jenis_bibit: string;
  ukuran: string;
  qty_in: number;
  qty_out: number;
  qty_end: number;
  price: number;
  deskripsi: string;
};

interface BibitFormProps {
  initialValues?: BibitFormValues;
  onSubmit: (values: BibitFormValues) => void;
  onCancel?: () => void;
  submitLabel?: string;
}

const defaultValues: BibitFormValues = {
  jenis_bibit: '',
  ukuran: '',
  qty_in: 0,
  qty_out: 0,
  qty_end: 0,
  price: 0,
  deskripsi: ''
};

export default function BibitForm({ initialValues, onSubmit, onCancel, submitLabel = 'Save' }: BibitFormProps) {
  const [values, setValues] = useState<BibitFormValues>(initialValues ?? defaultValues);
  
  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    if (e.target.value === '0') {
      e.target.value = '';
    }
  };

  useEffect(() => {
    setValues(initialValues ?? defaultValues);
  }, [initialValues]);

  return (
    <div className="bg-white rounded-xl shadow-sm p-5 w-full max-w-lg mx-auto border border-gray-100">
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-gray-800">
          {initialValues ? 'Edit Data Bibit' : 'Tambah Bibit Baru'}
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
        <label className="block text-sm font-medium text-gray-700">Jenis Bibit</label>
        <input
          type="text"
          className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          value={values.jenis_bibit}
          onChange={(e) => setValues((v) => ({ ...v, jenis_bibit: e.target.value }))}
          placeholder="Contoh: Lele Sangkuriang"
          required
        />
      </div>

      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700">Ukuran</label>
        <input
          type="text"
          className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          value={values.ukuran}
          onChange={(e) => setValues((v) => ({ ...v, ukuran: e.target.value }))}
          placeholder="Contoh: 3-5 cm"
        />
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">Qty In</label>
          <input
            type="number"
            min="0"
            className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={values.qty_in}
            onFocus={handleFocus}
            onChange={(e) => {
              const newQtyIn = e.target.value === '' ? 0 : Number(e.target.value);
              setValues(v => ({
                ...v, 
                qty_in: newQtyIn,
                qty_end: newQtyIn - v.qty_out
              }));
            }}
          />
        </div>

        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">Qty Out</label>
          <input
            type="number"
            min="0"
            readOnly
            className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 bg-gray-50 text-gray-600"
            value={values.qty_out}
          />
        </div>

        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">Qty End</label>
          <input
            type="number"
            min="0"
            readOnly
            className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 bg-gray-50 text-gray-600 font-medium"
            value={values.qty_in - values.qty_out}
          />
        </div>
      </div>

      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700">Harga</label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-gray-500 text-sm">Rp</span>
          </div>
          <input
            type="number"
            min="0"
            className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={values.price}
            onFocus={handleFocus}
            onChange={(e) => setValues((v) => ({ ...v, price: e.target.value === '' ? 0 : Number(e.target.value) }))}
            placeholder="0"
          />
        </div>
      </div>

      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700">Deskripsi</label>
        <textarea
          className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          rows={2}
          value={values.deskripsi}
          onChange={(e) => setValues((v) => ({ ...v, deskripsi: e.target.value }))}
          placeholder="Tambahkan catatan atau deskripsi bibit..."
        />
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

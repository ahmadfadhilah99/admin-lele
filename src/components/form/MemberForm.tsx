import { useEffect, useState } from 'react';
import Form from './Form';
import Button from '../ui/button/Button';

export type MemberFormValues = {
  nama_pembeli: string;
  alamat: string;
  no_tlp: string;
};

interface MemberFormProps {
  initialValues?: MemberFormValues;
  onSubmit: (values: MemberFormValues) => void;
  onCancel?: () => void;
  submitLabel?: string;
}

const defaultValues: MemberFormValues = {
  nama_pembeli: '',
  alamat: '',
  no_tlp: '',
};

export default function MemberForm({ initialValues, onSubmit, onCancel, submitLabel = 'Save' }: MemberFormProps) {
  const [values, setValues] = useState<MemberFormValues>(initialValues ?? defaultValues);

  useEffect(() => {
    setValues(initialValues ?? defaultValues);
  }, [initialValues]);

  return (
    <div className="bg-white rounded-xl shadow-sm p-5 w-full max-w-lg mx-auto border border-gray-100">
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-gray-800">
          {initialValues ? 'Edit Data Member' : 'Tambah Member Baru'}
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
          <input
            type="text"
            className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={values.nama_pembeli}
            onChange={(e) => setValues(v => ({ ...v, nama_pembeli: e.target.value }))}
            placeholder="Contoh: Budi Santoso"
            required
          />
        </div>

        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">Alamat</label>
          <textarea
            className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            rows={3}
            value={values.alamat}
            onChange={(e) => setValues(v => ({ ...v, alamat: e.target.value }))}
            placeholder="Masukkan alamat lengkap"
          />
        </div>

        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">No HP</label>
          <input
            type="tel"
            className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={values.no_tlp}
            onChange={(e) => setValues(v => ({ ...v, no_tlp: e.target.value }))}
            placeholder="Contoh: 08123456789"
            pattern="[0-9]{10,13}"
            title="Masukkan nomor HP yang valid (10-13 angka)"
            required
          />
        </div>
      
        <div className="flex justify-end gap-2 pt-3 border-t border-gray-100">
          {onCancel && (
            <Button 
              type="button"
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

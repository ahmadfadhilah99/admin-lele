import { useEffect, useState } from 'react';
import Form from './Form';
import Button from '../ui/button/Button';

export type PostFormValues = {
  title: string;
  body?: string;
};

interface PostFormProps {
  initialValues?: PostFormValues;
  onSubmit: (values: PostFormValues) => void;
  onCancel?: () => void;
  submitLabel?: string;
}

const defaultValues: PostFormValues = { title: '', body: '' };

export default function PostForm({ initialValues, onSubmit, onCancel, submitLabel = 'Simpan' }: PostFormProps) {
  const [values, setValues] = useState<PostFormValues>(initialValues ?? defaultValues);

  useEffect(() => {
    setValues(initialValues ?? defaultValues);
  }, [initialValues]);

  return (
    <div className="bg-white rounded-xl shadow-sm p-5 w-full max-w-2xl mx-auto border border-gray-100">
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-gray-800">
          {initialValues ? 'Edit Post' : 'Buat Post Baru'}
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
          <label className="block text-sm font-medium text-gray-700">Judul</label>
          <input
            type="text"
            className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={values.title}
            onChange={(e) => setValues(v => ({ ...v, title: e.target.value }))}
            placeholder="Masukkan judul post"
            required
          />
        </div>

        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">Isi Konten</label>
          <textarea
            className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            rows={6}
            value={values.body}
            onChange={(e) => setValues(v => ({ ...v, body: e.target.value }))}
            placeholder="Tulis isi konten di sini..."
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

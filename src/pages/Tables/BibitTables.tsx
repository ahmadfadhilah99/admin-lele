import { useState } from "react";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import BibitTable, { BibitItem } from "../../components/tables/BibitTable/BibitTable";
import Button from "../../components/ui/button/Button";
import { useBibitList, useDeleteBibit } from '../../hooks/usePost'
import { useCreateBibit, useUpdateBibit } from '../../hooks/usePost'
import { useModal } from '../../hooks/useModal'
import { Modal } from '../../components/ui/modal'
import BibitForm, { BibitFormValues } from '../../components/form/BibitForm'

export default function BibitTables() {
  const { data, isLoading, isError, error } = useBibitList();
  const del = useDeleteBibit();
  const createMut = useCreateBibit();
  const updateMut = useUpdateBibit();

  const { isOpen, openModal, closeModal } = useModal(false);
  const [editing, setEditing] = useState<BibitItem | null>(null);

  const handleDelete = (id: number) => {
    if (confirm("Delete this item?")) del.mutate(id)
  };

  const items: BibitItem[] = Array.isArray(data) ? data : [];

  const handleAdd = () => {
    setEditing(null);
    openModal();
  };

  const handleEdit = (item: BibitItem) => {
    setEditing(item);
    openModal();
  };

  const handleSubmit = (values: BibitFormValues) => {
    if (editing) {
      updateMut.mutate(
        { id_bibit: editing.id_bibit, ...values }, // ✅ update butuh id
        { 
          onSuccess: () => closeModal() 
        }
      );
    } else {
      createMut.mutate(values, { 
        onSuccess: () => closeModal() 
      }); // ✅ create tanpa id
    }
  };

  return (
    <>
      <PageMeta title="MayFarm" description="Website penjualan bibit ikan" />
      <PageBreadcrumb pageTitle="Bibit" />

      <div className="space-y-6">
        <Button size="sm" variant="primary" onClick={handleAdd}>
          Tambah
        </Button>

        {isLoading && <div className="text-gray-500 text-sm">Loading...</div>}
        {isError && <div className="text-red-500 text-sm">{(error as any)?.message || "Failed to load data"}</div>}
        {!isLoading && !isError && items.length === 0 && <div className="text-gray-500 text-sm">No data.</div>}

        {!isLoading && !isError && items.length > 0 && (
          <BibitTable items={items} onEdit={handleEdit} onDelete={handleDelete} />
        )}
      </div>

      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] p-6 lg:p-10">
        <h3 className="text-lg font-semibold mb-4 dark:text-white">
          {editing ? "Update Bibit" : "Add Bibit"}
        </h3>
        <BibitForm
          initialValues={
            editing
              ? {
                  jenis_bibit: editing.jenis_bibit,
                  ukuran: editing.ukuran,
                  qty_in: editing.qty_in,
                  qty_out: editing.qty_out,
                  qty_end: editing.qty_end,
                  price: editing.price,
                  deskripsi: editing.deskripsi,
                }
              : undefined
          }
          onSubmit={handleSubmit}
          onCancel={closeModal}
          submitLabel={
            editing
              ? updateMut.isPending
                ? "Saving..."
                : "Save"
              : createMut.isPending
              ? "Adding..."
              : "Add"
          }
        />
      </Modal>
    </>
  );
}

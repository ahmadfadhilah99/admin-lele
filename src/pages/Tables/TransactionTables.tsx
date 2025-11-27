import { useState } from "react";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import TransactionTable, { TransactionItem } from "../../components/tables/TransactionTable/TransactionTable";
import Button from "../../components/ui/button/Button";
import { useTransactionList, useDeleteTransaction } from '../../hooks/useTransaction'
import { useCreateTransaction, useUpdateTransaction } from '../../hooks/useTransaction'
import { useModal } from '../../hooks/useModal'
import { Modal } from '../../components/ui/modal'
import TransactionForm, { TransactionFormValues } from '../../components/form/TransactionForm'


export default function TransactionTables() {
  const { data, isLoading, isError, error } = useTransactionList();
  const del = useDeleteTransaction();
  const createMut = useCreateTransaction();
  const updateMut = useUpdateTransaction();

  const { isOpen, openModal, closeModal } = useModal(false);
  const [editing, setEditing] = useState<TransactionItem | null>(null);

  const handleDelete = (id_penjualan: number) => {
    if (confirm('Delete this transaction?')) del.mutate(id_penjualan);
  };

  const items: TransactionItem[] = Array.isArray(data) ? data : [];

  const handleAdd = () => {
    setEditing(null);
    openModal();
  };

  const handleEdit = (item: TransactionItem) => {
    setEditing(item);
    openModal();
  };

  const handleSubmit = (values: TransactionFormValues) => {
    if (editing) {
      updateMut.mutate(
        { id: editing.id_penjualan, ...values },
        {
          onSuccess: () => closeModal(),
        }
      );
    } else {
      createMut.mutate(values, {
        onSuccess: () => closeModal(),
      });
    }
  };
  return (
    <>
      <PageMeta
        title="MayFarm"
        description="Website penjualan bibit ikan"
      />
      <PageBreadcrumb pageTitle="Transaksi" />
      <div className="space-y-6">
          <Button size="sm" variant="primary" onClick={handleAdd}>
            Tambah
          </Button>
          {isLoading && (
            <div className="text-gray-500 text-sm">Loading...</div>
          )}
          {isError && (
            <div className="text-red-500 text-sm">{(error as any)?.message || 'Failed to load data'}</div>
          )}
          {!isLoading && !isError && items.length === 0 && (
            <div className="text-gray-500 text-sm">No data.</div>
          )}
          {!isLoading && !isError && items.length > 0 && (
            <TransactionTable
              items={items}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          )}
      </div>

      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] p-6 lg:p-10">
          <h3 className="text-lg font-semibold mb-4 dark:text-white">{editing ? 'Edit Transaksi' : 'Add Transaksi'}</h3>
          <TransactionForm
            initialValues={editing ? { id_pembeli: editing.id_pembeli, id_bibit: editing.id_bibit, qty: editing.qty, tgl_penjualan: editing.tgl_penjualan, subtotal: editing.subtotal } : undefined}
            onSubmit={handleSubmit}
            onCancel={closeModal}
            submitLabel={editing ? (updateMut.isPending ? 'Saving...' : 'Save') : (createMut.isPending ? 'Creating...' : 'Create')}
          />
      </Modal>
    </>
  );
}

import { useState } from "react";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import MemberTable, { MemberItem } from "../../components/tables/MemberTable/MemberTable";
import Button from "../../components/ui/button/Button";
import { useMemberList, useDeleteMember } from '../../hooks/useMember'
import { useCreateMember, useUpdateMember } from '../../hooks/useMember'
import { useModal } from '../../hooks/useModal'
import { Modal } from '../../components/ui/modal'
import MemberForm, { MemberFormValues } from '../../components/form/MemberForm'


export default function MemberTables() {
  const { data, isLoading, isError, error } = useMemberList();
  const del = useDeleteMember();
  const createMut = useCreateMember();
  const updateMut = useUpdateMember();

  const { isOpen, openModal, closeModal } = useModal(false);
  const [editing, setEditing] = useState<MemberItem | null>(null);

  const handleDelete = (id: number) => {
    if (confirm('Delete this member?')) del.mutate(id);
  };

  const items: MemberItem[] = Array.isArray(data) ? data : [];

  const handleAdd = () => {
    setEditing(null);
    openModal();
  };

  const handleEdit = (item: MemberItem) => {
    setEditing(item);
    openModal();
  };

  const handleSubmit = (values: MemberFormValues) => {
    if (editing) {
      updateMut.mutate(
        { id_pembeli: editing.id_pembeli, ...values },
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
      <PageBreadcrumb pageTitle="Membership" />
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
            <MemberTable
              items={items}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          )}
      </div>

      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] p-6 lg:p-10">
          <h3 className="text-lg font-semibold mb-4 dark:text-white">{editing ? 'Edit Member' : 'Add Member'}</h3>
          <MemberForm
            initialValues={editing ? { nama_pembeli: editing.nama_pembeli, alamat: editing.alamat, no_tlp: editing.no_tlp } : undefined}
            onSubmit={handleSubmit}
            onCancel={closeModal}
            submitLabel={editing ? (updateMut.isPending ? 'Saving...' : 'Save') : (createMut.isPending ? 'Creating...' : 'Create')}
          />
      </Modal>
    </>
  );
}

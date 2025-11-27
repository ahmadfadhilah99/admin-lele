import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useMembers } from '@/hooks/useMembers';
import MemberForm from '@/components/form/MemberForm';

export default function EditMemberPage() {
  const router = useRouter();
  const { id } = router.query;
  const { members, updateMember } = useMembers();
  const [member, setMember] = useState(null);

  useEffect(() => {
    if (id && members.length > 0) {
      const found = members.find(m => m.id === id);
      if (found) {
        setMember(found);
      } else {
        router.push('/members'); // Redirect jika data tidak ditemukan
      }
    }
  }, [id, members, router]);

  const handleSubmit = async (values) => {
    const success = await updateMember(id, values);
    if (success) {
      router.push('/members');
    }
  };

  if (!member) return <div>Memuat...</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Edit Member</h1>
      <MemberForm 
        initialValues={member}
        onSubmit={handleSubmit}
        onCancel={() => router.push('/members')}
        submitLabel="Simpan Perubahan"
      />
    </div>
  );
}
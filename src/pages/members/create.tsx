import { useRouter } from 'next/router';
import { useMembers } from '@/hooks/useMembers';
import MemberForm from '@/components/form/MemberForm';

export default function CreateMemberPage() {
  const router = useRouter();
  const { createMember } = useMembers();

  const handleSubmit = async (values) => {
    const success = await createMember(values);
    if (success) {
      router.push('/members');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Tambah Member Baru</h1>
      <MemberForm 
        onSubmit={handleSubmit}
        onCancel={() => router.back()}
      />
    </div>
  );
}
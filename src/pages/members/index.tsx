import { useRouter } from 'next/router';
import { useMembers } from '@/hooks/useMembers';
import MemberList from '@/components/MemberList';
import Button from '@/components/ui/Button';

export default function MembersPage() {
  const router = useRouter();
  const { members, loading, error, deleteMember } = useMembers();

  const handleEdit = (member: Member) => {
    router.push(`/members/${member.id}/edit`);
  };

  if (loading) return <div>Memuat...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Daftar Member</h1>
        <Button onClick={() => router.push('/members/create')}>
          + Tambah Member
        </Button>
      </div>
      
      <MemberList 
        members={members} 
        onEdit={handleEdit}
        onDelete={deleteMember}
      />
    </div>
  );
}
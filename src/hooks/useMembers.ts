import { useState, useEffect } from 'react';
import { Member } from './useMember';

export function useMembers() {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Get all members
  const fetchMembers = async () => {
    try {
      setLoading(true);
      // Ganti dengan API call sebenarnya
      const response = await fetch('/api/members');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setMembers(data);
    } catch (err) {
      setError('Gagal memuat data member');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Create member
  const createMember = async (memberData: Omit<Member, 'id_pembeli'>) => {
    try {
      const response = await fetch('/api/members', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(memberData),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      await fetchMembers(); // Refresh list
      return true;
    } catch (err) {
      console.error('Gagal menambah member', err);
      return false;
    }
  };

  // Update member
  const updateMember = async (id_pembeli: number, memberData: Partial<Member>) => {
    try {
      const response = await fetch(`/api/members/${id_pembeli}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(memberData),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      await fetchMembers(); // Refresh list
      return true;
    } catch (err) {
      console.error('Gagal mengupdate member', err);
      return false;
    }
  };

  // Delete member
  const deleteMember = async (id_pembeli: number) => {
    if (!confirm('Apakah Anda yakin ingin menghapus member ini?')) return false;

    try {
      const response = await fetch(`/api/members/${id_pembeli}`, { method: 'DELETE' });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      await fetchMembers(); // Refresh list
      return true;
    } catch (err) {
      console.error('Gagal menghapus member', err);
      return false;
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  return {
    members,
    loading,
    error,
    createMember,
    updateMember,
    deleteMember,
    fetchMembers,
  };
}
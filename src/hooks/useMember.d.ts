import { UseMutationResult, UseQueryResult } from '@tanstack/react-query';

export type Member = {
  id_pembeli: number;
  nama_pembeli: string;
  alamat: string;
  no_tlp: string;
};

export type MemberInputs = Omit<Member, 'id_pembeli' | 'created_at' | 'updated_at'>;

export function useMemberList(): UseQueryResult<Member[], Error>;
export function useMemberDetail(id: number | undefined): UseQueryResult<Member, Error>;

export function useCreateMember(): UseMutationResult<Member, Error, MemberInputs, unknown>;

export function useUpdateMember(): UseMutationResult<
  Member, 
  Error, 
  { id_pembeli: number } & Partial<MemberInputs>, 
  unknown
>;

export function useDeleteMember(): UseMutationResult<{ success: boolean }, Error, number, unknown>;

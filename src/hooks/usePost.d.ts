import { UseMutationResult, UseQueryResult } from '@tanstack/react-query';

export type Bibit = {
  id_bibit: number;
  jenis_bibit: string;
  ukuran: string;
  qty_in: number;
  qty_out: number;
  qty_end: number;
  price: number;
  deskripsi: string;
};

export type BibitInputs = Omit<Bibit, 'id_bibit' | 'created_at' | 'updated_at'>;

export function useBibitList(): UseQueryResult<Bibit[], Error>;
export function useBibitDetail(id: number | undefined): UseQueryResult<Bibit, Error>;

export function useCreateBibit(): UseMutationResult<Bibit, Error, BibitInputs, unknown>;

export function useUpdateBibit(): UseMutationResult<
  Bibit, 
  Error, 
  { id_bibit: number } & Partial<BibitInputs>, 
  unknown
>;

export function useDeleteBibit(): UseMutationResult<{ success: boolean }, Error, number, unknown>;

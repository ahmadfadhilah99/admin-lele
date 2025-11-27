import { UseMutationResult, UseQueryResult } from '@tanstack/react-query';

export type TransactionItem = {
  id_penjualan: number;
  id_bibit: number;
  id_pembeli: number;
  qty: number;
  subtotal: number;
  tgl_penjualan: string;
  nama_pembeli?: string;
  jenis_bibit?: string;
  ukuran?: string;
  harga?: number;
  qty_end?: number;
};

export type TransactionInputs = Omit<TransactionItem, 'id_penjualan' | 'tgl_penjualan' | 'subtotal'> & {
  tgl_penjualan?: string;
  subtotal?: number;
};

export function useTransactionList(): UseQueryResult<TransactionItem[], Error>;

export function useTransactionDetail(id: number | undefined): UseQueryResult<TransactionItem, Error>;

export function useCreateTransaction(): UseMutationResult<
  TransactionItem, 
  Error, 
  TransactionInputs, 
  unknown
>;

export function useUpdateTransaction(): UseMutationResult<
  TransactionItem, 
  Error, 
  { id: number } & Partial<TransactionInputs>, 
  unknown
>;

export function useDeleteTransaction(): UseMutationResult<
  { success: boolean }, 
  Error, 
  number, 
  unknown
>;

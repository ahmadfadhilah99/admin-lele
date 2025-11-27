import { UseMutationResult, UseQueryResult } from '@tanstack/react-query';

export type Laporan = {
  id_laporan: number;
  bulan: string;
  tahun: string;
  qty_in: number;
  qty_out: number;
  pendapatan: number;
};


export function useLaporanList(): UseQueryResult<Laporan[], Error>;
export function useLaporanDetail(id: number | undefined): UseQueryResult<Laporan, Error>;

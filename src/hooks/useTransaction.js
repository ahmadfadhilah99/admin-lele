import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../services/api/clients';
import toast from 'react-hot-toast';

const transactionKeys = {
  all: ['transactions'],
  lists: () => [...transactionKeys.all, 'list'],
  detail: (id) => [...transactionKeys.all, 'detail', id],
};

export function useTransactionList() {
  return useQuery({
    queryKey: transactionKeys.lists(),
    queryFn: async () => {
      const { data } = await api.get('transaksi/read', {
        params: {
          join: 'pembeli,bibit',
          select: '*,pembeli.nama_pembeli,bibit.jenis_bibit,bibit.ukuran,bibit.harga_satuan,bibit.qty as qty_end'
        }
      });
      return data;
    },
  });
}

export function useTransactionDetail(id) {
  return useQuery({
    queryKey: transactionKeys.detail(id),
    queryFn: async () => {
      const { data } = await api.get(`transaksi/read/${id}`);
      return data;
    },
    enabled: !!id,
  });
}

export function useCreateTransaction() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (transactionData) => {
      const { data } = await api.post('transaksi/create', transactionData);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(transactionKeys.lists());
      toast.success('Transaksi berhasil ditambahkan');
    },
    onError: (error) => {
      toast.error(`Gagal menambahkan transaksi: ${error.message}`);
    },
  });
}

export function useUpdateTransaction() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, ...transactionData }) => {
      const { data } = await api.put(
        `?url=transaksi/update&id=${id}`,
        transactionData
      );
      return data;
    },
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries(transactionKeys.lists());
      queryClient.invalidateQueries(transactionKeys.detail(id));
      toast.success('Transaksi berhasil diperbarui');
    },
    onError: (error) => {
      toast.error(`Gagal memperbarui transaksi: ${error.message}`);
    },
  });
}

export function useDeleteTransaction() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id_penjualan) => {
      const { data } = await api.delete(`transaksi/delete?id_penjualan=${id_penjualan}`);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(transactionKeys.lists());
      toast.success('Transaksi berhasil dihapus');
    },
    onError: (error) => {
      toast.error(`Gagal menghapus transaksi: ${error.message}`);
    },
  });
}

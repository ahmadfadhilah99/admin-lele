import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '../services/api/clients'
import toast from 'react-hot-toast' 

const bibitKeys = {
  all: ['bibit'],
  lists: () => [...bibitKeys.all, 'list'],
  detail: (id) => [...bibitKeys.all, 'detail', id],
}

export function useBibitList() {
  return useQuery({
    queryKey: bibitKeys.lists(),
    queryFn: async () => {
      const { data } = await api.get('bibit/read')
      return data
    },
  })
}

export function useBibitDetail(id) {
  return useQuery({
    queryKey: bibitKeys.detail(id),
    queryFn: async () => {
      const { data } = await api.get('bibit/read', { params: { id } })
      return data
    },
    enabled: !!id,
  })
}

export function useCreateBibit() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async (payload) => {
      const { data } = await api.post('bibit/create', payload)
      return data
    },
    onSuccess: () => {
      toast.success('Data bibit berhasil ditambahkan')
      qc.invalidateQueries({ queryKey: bibitKeys.lists() })
    },
    onError: (err) => {
      toast.error(`Gagal menambahkan bibit: ${err.message}`)
    },
  })
}

export function useUpdateBibit() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async ({ id, ...payload }) => {
      const { data } = await api.post('bibit/update', { id, ...payload })
      return data
    },
    onSuccess: (_, variables) => {
      toast.success('Data bibit berhasil diperbarui')
      qc.invalidateQueries({ queryKey: bibitKeys.lists() })
      qc.invalidateQueries({ queryKey: bibitKeys.detail(variables.id) })
    },
    onError: (err) => {
      toast.error(`Gagal memperbarui bibit: ${err.message}`)
    },
  })
}

export function useDeleteBibit() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async (id) => {
      const { data } = await api.delete('bibit/delete',{
        data: { id_bibit: id },
      })
      return data
    },
    onSuccess: () => {
      toast.success('Data bibit berhasil dihapus')
      qc.invalidateQueries({ queryKey: bibitKeys.lists() })
    },
    onError: (err) => {
      toast.error(`Gagal menghapus bibit: ${err.message}`)
    },
  })
}


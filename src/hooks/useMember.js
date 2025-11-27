import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '../services/api/clients'
import toast from 'react-hot-toast' 

const memberKeys = {
  all: ['member'],
  lists: () => [...memberKeys.all, 'list'],
  detail: (id) => [...memberKeys.all, 'detail', id],
}

export function useMemberList() {
  return useQuery({
    queryKey: memberKeys.lists(),
    queryFn: async () => {
      const { data } = await api.get('member/read')
      return data
    },
  })
}

export function useMemberDetail(id) {
  return useQuery({
    queryKey: memberKeys.detail(id),
    queryFn: async () => {
      const { data } = await api.get('member/read', { params: { id } })
      return data
    },
    enabled: !!id,
  })
}

export function useCreateMember() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async (payload) => {
      const { data } = await api.post('member/create', payload)
      return data
    },
    onSuccess: () => {
      toast.success('Data member berhasil ditambahkan')
      qc.invalidateQueries({ queryKey: memberKeys.lists() })
    },
    onError: (err) => {
      toast.error(`Gagal menambahkan member: ${err.message}`)
    },
  })
}

export function useUpdateMember() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async ({ id, ...payload }) => {
      const { data } = await api.post('member/update', { id, ...payload })
      return data
    },
    onSuccess: (_, variables) => {
      toast.success('Data member berhasil diperbarui')
      qc.invalidateQueries({ queryKey: memberKeys.lists() })
      qc.invalidateQueries({ queryKey: memberKeys.detail(variables.id) })
    },
    onError: (err) => {
      toast.error(`Gagal memperbarui member: ${err.message}`)
    },
  })
}

export function useDeleteMember() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async (id) => {
      const { data } = await api.delete('member/delete',{
        data: { id_member: id },
      })
      return data
    },
    onSuccess: () => {
      toast.success('Data member berhasil dihapus')
      qc.invalidateQueries({ queryKey: memberKeys.lists() })
    },
    onError: (err) => {
      toast.error(`Gagal menghapus member: ${err.message}`)
    },
  })
}


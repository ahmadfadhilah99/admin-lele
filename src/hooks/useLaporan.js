import { useQuery } from '@tanstack/react-query'
import { api } from '../services/api/clients'

const laporanKeys = {
  all: ['reports'],
  lists: () => [...laporanKeys.all, 'list'],
  detail: (id) => [...laporanKeys.all, 'detail', id],
}

export function useLaporanList() {
  return useQuery({
    queryKey: laporanKeys.lists(),
    queryFn: async () => {
      const { data } = await api.get('laporan/read')
      return data
    },
  })
}

export function useLaporanDetail(id) {
  return useQuery({
    queryKey: laporanKeys.detail(id),
    queryFn: async () => {
      const { data } = await api.get('laporan/read', { params: { id } })
      return data
    },
    enabled: !!id,
  })
}
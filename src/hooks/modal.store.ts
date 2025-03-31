import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

interface Props {
  isOpen: boolean
  toggleModal: () => void
}

export const useModal = create(
  immer<Props>((set) => {
    return {
      isOpen: false,
      toggleModal: () => {
        set((state) => {
          state.isOpen = !state.isOpen
        })
      },
    }
  })
)

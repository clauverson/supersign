interface IDocument {
  id: string
  name: string
  fileKey: string
  userId: string
  status: 'PENDING' | 'SIGNED'
  createdAt: string
  updatedAt: string
}

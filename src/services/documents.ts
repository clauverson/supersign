import axios from 'axios'

function getDocuments() {
  return axios.get<IDocument[]>('/api/documents')
}

function uploadFile(email: string, file: File) {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('email', email)
  return axios.post('/api/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}

function getDocumentById(document_id: string) {
  return axios.get<IDocument>(`/api/documents/${document_id}`)
}

export const DocumentService = {
  getDocuments,
  uploadFile,
  getDocumentById,
}

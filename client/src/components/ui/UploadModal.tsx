import { useRef, useState } from 'react'
import { useImportProspects } from '../../hooks/useProspects'
import { useToast } from './Toast'

interface UploadModalProps {
  open: boolean
  onClose: () => void
  onSuccess?: () => void
}

export function UploadModal({ open, onClose, onSuccess }: UploadModalProps) {
  const importProspects = useImportProspects()
  const toast = useToast()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [uploadError, setUploadError] = useState('')
  const [uploadProgress, setUploadProgress] = useState(0)

  if (!open) {
    return null
  }

  const handleUpload = async (file: File) => {
    setUploadError('')
    setUploadProgress(0)

    if (!file.name.toLowerCase().endsWith('.csv')) {
      setUploadError('Only .csv files are accepted.')
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      setUploadError('CSV files must be 5MB or smaller.')
      return
    }

    try {
      setUploadProgress(40)
      await importProspects.mutateAsync(file)
      setUploadProgress(100)
      toast.success('Prospects imported', { duration: 4000 })
      onSuccess?.()
      onClose()
    } catch (error) {
      setUploadError(error instanceof Error ? error.message : 'Upload failed. Please try again.')
    }
  }

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-gray-900/30 p-6">
      <div role="dialog" aria-modal="true" aria-labelledby="upload-title" className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl">
        <div className="flex items-center justify-between">
          <h2 id="upload-title" className="text-[15px] font-medium text-gray-900">
            Upload prospects
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="text-sm font-medium text-gray-600 transition-colors duration-150 hover:text-gray-900 active:scale-[0.98]"
          >
            Close
          </button>
        </div>

        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          onDrop={(event) => {
            event.preventDefault()
            const file = event.dataTransfer.files[0]
            if (file) handleUpload(file)
          }}
          onDragOver={(event) => event.preventDefault()}
          className="mt-5 flex min-h-40 w-full flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 px-6 py-8 text-center text-sm text-gray-600 transition-colors duration-150 hover:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 active:scale-[0.98]"
        >
          Drop a CSV here or browse files
          <span className="mt-2 text-xs text-gray-500">CSV only, up to 5MB</span>
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept=".csv"
          className="hidden"
          onChange={(event) => {
            const file = event.target.files?.[0]
            if (file) handleUpload(file)
          }}
        />

        <a href="/templates/prospects.csv" className="mt-4 inline-flex text-sm font-medium text-indigo-600">
          Download CSV template
        </a>
        {uploadProgress > 0 ? (
          <div className="mt-4 h-2 rounded-full bg-gray-100">
            <div className="h-2 rounded-full bg-indigo-600 transition-all duration-150" style={{ width: `${uploadProgress}%` }} />
          </div>
        ) : null}
        {uploadError ? <p className="mt-4 text-sm font-medium text-red-600">{uploadError}</p> : null}
      </div>
    </div>
  )
}

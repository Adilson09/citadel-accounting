// components/FileUpload.tsx
import { useState, ChangeEvent, FormEvent } from 'react';
import { useMutation, QueryClient, QueryClientProvider } from '@tanstack/react-query';

interface FileUploadProps {
  uploadRoute: string;
}

const FileUpload: React.FC<FileUploadProps> = ({ uploadRoute }) => {
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedFiles(event.target.files);
  };

  const uploadFiles = async (files: FileList) => {
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i]);
    }
    const response = await fetch(`/upload?route=${uploadRoute}`, {
      method: 'POST',
      body: formData,
    });
    if (!response.ok) {
      throw new Error('Failed to upload files');
    }
    return response.json();
  };

  const mutation = useMutation(uploadFiles, {
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (selectedFiles) {
      mutation.mutate(selectedFiles);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" multiple onChange={handleFileChange} />
      <button type="submit" disabled={mutation.isLoading}>
        {mutation.isLoading ? 'Uploading...' : 'Upload'}
      </button>
    </form>
  );
};

export default FileUpload;

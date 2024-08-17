import React, { useState } from 'react';

interface FileDownloadButtonProps {
  fileId: number | string;
  fileType: string;
  entityType: string;
  className?: string;
  buttonText?: string;
}

const FileDownloadButton: React.FC<FileDownloadButtonProps> = ({
  fileId,
  fileType,
  entityType,
  className = '',
  buttonText
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleDownload = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/download/${entityType}/${fileId}`, {
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error(`Failed to download ${entityType}`);
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = `${entityType}_${fileId}.${fileType}`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error(`Error downloading ${entityType}:`, error);
      alert(`Failed to download ${entityType}. Please try again.`);
    } finally {
      setIsLoading(false);
    }
  };

  const defaultButtonText = isLoading ? 'Downloading...' : `Download ${entityType}`;

  return (
    <button
      onClick={handleDownload}
      disabled={isLoading}
      className={className}
    >
      {buttonText || defaultButtonText}
    </button>
  );
};

export default FileDownloadButton;
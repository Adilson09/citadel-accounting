"use client";
import React, { useState } from "react";

interface FileDownloadProps {
  entityType: string;
  entityId: number;
  fileName?: string;
  className?: string;
  buttonText?: string;
}

const FileDownload: React.FC<FileDownloadProps> = ({
  entityType,
  entityId,
  fileName,
  className = "",
  buttonText = "Download File",
}) => {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    setIsDownloading(true);

    try {
      const response = await fetch(
        `/api/files/download/${entityType}/${entityId}/`,
        {
          method: "GET",
        }
      );

      if (!response.ok) {
        throw new Error("Download failed");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.style.display = "none";
      a.href = url;
      a.download =
        fileName ||
        `${entityType}_${entityId}${getFileExtension(
          response.headers.get("Content-Type")
        )}`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download error:", error);
      alert("Failed to download file. Please try again.");
    } finally {
      setIsDownloading(false);
    }
  };

  const getFileExtension = (contentType: string | null): string => {
    switch (contentType) {
      case "application/pdf":
        return ".pdf";
      case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
        return ".xlsx";
      case "text/csv":
        return ".csv";
      default:
        return "";
    }
  };

  return (
    <button
      onClick={handleDownload}
      disabled={isDownloading}
      className={`btn btn-primary ${className}`}
    >
      {isDownloading ? "Downloading..." : buttonText}
    </button>
  );
};

export default FileDownload;

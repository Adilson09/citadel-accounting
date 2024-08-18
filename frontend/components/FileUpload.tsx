"use client";
import React, { useState, useCallback } from "react";

interface FileUploadProps {
  entityType: string;
  entityId: number;
  onUploadSuccess?: (filePath: string) => void;
  onUploadError?: (error: string) => void;
  className?: string;
}

const FileUpload: React.FC<FileUploadProps> = ({
  entityType,
  entityId,
  onUploadSuccess,
  onUploadError,
  className = "",
}) => {
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) return;

      setIsUploading(true);

      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await fetch(
          `/api/files/upload/${entityType}/${entityId}/`,
          {
            method: "POST",
            body: formData,
          }
        );

        if (!response.ok) {
          throw new Error("Upload failed");
        }

        const data = await response.json();
        onUploadSuccess?.(data.file_path);
      } catch (error) {
        console.error("Upload error:", error);
        onUploadError?.(
          error instanceof Error ? error.message : "An unknown error occurred"
        );
      } finally {
        setIsUploading(false);
      }
    },
    [entityType, entityId, onUploadSuccess, onUploadError]
  );

  return (
    <div className={className}>
      <input
        type="file"
        onChange={handleFileChange}
        disabled={isUploading}
        style={{ display: "none" }}
        id={`file-upload-${entityType}-${entityId}`}
        className="hover:cursor-pointer"
      />
      <label
        htmlFor={`file-upload-${entityType}-${entityId}`}
        className="btn btn-primary"
      >
        {isUploading ? "Uploading..." : "Upload File"}
      </label>
    </div>
  );
};

export default FileUpload;

// "use client";
// import React, { useCallback } from "react";
// import { useMutation } from "@tanstack/react-query";

// interface FileUploadProps {
//   entityType: string;
//   entityId: number;
//   onUploadSuccess?: (filePath: string) => void;
//   onUploadError?: (error: string) => void;
//   className?: string;
// }

// const uploadFile = async (
//   formData: FormData,
//   entityType: string,
//   entityId: number
// ) => {
//   const response = await fetch(`/api/files/upload/${entityType}/${entityId}/`, {
//     method: "POST",
//     body: formData,
//   });

//   if (!response.ok) {
//     throw new Error("Upload failed");
//   }

//   return response.json();
// };

// const FileUpload: React.FC<FileUploadProps> = ({
//   entityType,
//   entityId,
//   onUploadSuccess,
//   onUploadError,
//   className = "",
// }) => {
//   const mutation = useMutation(
//     (formData: FormData) => uploadFile(formData, entityType, entityId),
//     {
//       onSuccess: (data) => {
//         onUploadSuccess?.(data.file_path);
//       },
//       onError: (error: unknown) => {
//         console.error("Upload error:", error);
//         if (error instanceof Error) {
//           onUploadError?.(error.message);
//         } else {
//           onUploadError?.("An unknown error occurred");
//         }
//       },
//     }
//   );

//   const handleFileChange = useCallback(
//     (event: React.ChangeEvent<HTMLInputElement>) => {
//       const file = event.target.files?.[0];
//       if (!file) return;

//       const formData = new FormData();
//       formData.append("file", file);

//       mutation.mutate(formData);
//     },
//     [mutation]
//   );

//   return (
//     <div className={className}>
//       <input
//         type="file"
//         onChange={handleFileChange}
//         disabled={mutation.isLoading}
//         style={{ display: "none" }}
//         id={`file-upload-${entityType}-${entityId}`}
//         className="hover:cursor-pointer"
//       />
//       <label
//         htmlFor={`file-upload-${entityType}-${entityId}`}
//         className="btn btn-primary"
//       >
//         {mutation.isLoading ? "Uploading..." : "Upload File"}
//       </label>
//     </div>
//   );
// };

// export default FileUpload;

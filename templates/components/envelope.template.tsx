import { useState, useRef, useCallback } from "react";
import { Upload, X, File, FileText, FileImage, Maximize2 } from "lucide-react";
import { cn } from "@maid_melisa/shared/cn";
import type { EnvelopeProps, EnvelopeFile } from "../types/envelope.type";

const generateId = () => Math.random().toString(36).slice(2, 9);
const formatSize = (bytes: number): string => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};
const isImage = (file: File) => file.type.startsWith("image/");
const toEnvelopeFile = (file: File): EnvelopeFile => ({
  id: generateId(),
  file,
  preview: isImage(file) ? URL.createObjectURL(file) : undefined,
});

const t = {
  surface: "var(--surface)",
  text: "var(--text)",
  muted: "var(--muted)",
  border: "var(--border)",
  primary: "var(--primary)",
  error: "var(--error)",
  fontFamily: "var(--mm-font-family)",
} as const;

const sizes = {
  demi: { padding: "16px", fontSize: "12px" },
  standard: { padding: "24px", fontSize: "14px" },
  grand: { padding: "32px", fontSize: "16px" },
} as const;

const Label = ({ text, fontSize }: { text: string; fontSize: string }) => (
  <label
    style={{
      fontSize,
      marginBottom: "6px",
      display: "block",
      color: t.text,
      fontFamily: t.fontFamily,
    }}
  >
    {text}
  </label>
);

const ErrorMessage = ({ text }: { text: string }) => (
  <span
    style={{
      fontSize: "12px",
      color: t.error,
      marginTop: "4px",
      display: "block",
    }}
  >
    {text}
  </span>
);

const FileIcon = ({ file }: { file: File }) => {
  if (isImage(file)) return <FileImage size={20} />;
  if (file.type === "application/pdf") return <FileText size={20} />;
  return <File size={20} />;
};

const FileCard = ({
  envelopeFile,
  onRemove,
  onPreview,
  fontSize,
}: {
  envelopeFile: EnvelopeFile;
  onRemove: (id: string) => void;
  onPreview: (ef: EnvelopeFile) => void;
  fontSize: string;
}) => (
  <div
    className="flex items-center gap-2"
    style={{
      padding: "8px 10px",
      borderRadius: "6px",
      border: `1px solid ${t.border}`,
      background: t.surface,
      fontSize,
      fontFamily: t.fontFamily,
    }}
  >
    {envelopeFile.preview ? (
      <img
        src={envelopeFile.preview}
        alt={envelopeFile.file.name}
        style={{
          width: "36px",
          height: "36px",
          objectFit: "cover",
          borderRadius: "4px",
          flexShrink: 0,
        }}
      />
    ) : (
      <span style={{ color: t.muted, flexShrink: 0 }}>
        <FileIcon file={envelopeFile.file} />
      </span>
    )}

    <div className="flex-1 min-w-0">
      <div
        style={{
          fontWeight: 500,
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          color: t.text,
        }}
      >
        {envelopeFile.file.name}
      </div>
      <div style={{ color: t.muted, fontSize: "11px" }}>
        {formatSize(envelopeFile.file.size)}
      </div>
    </div>

    {envelopeFile.preview && (
      <button
        type="button"
        onClick={() => onPreview(envelopeFile)}
        aria-label="Preview file"
        style={{
          color: t.muted,
          background: "none",
          border: "none",
          cursor: "pointer",
          display: "flex",
        }}
      >
        <Maximize2 size={14} />
      </button>
    )}

    <button
      type="button"
      onClick={() => onRemove(envelopeFile.id)}
      aria-label="Remove file"
      style={{
        color: t.muted,
        background: "none",
        border: "none",
        cursor: "pointer",
        display: "flex",
      }}
    >
      <X size={14} />
    </button>
  </div>
);

const PreviewModal = ({
  envelopeFile,
  onClose,
}: {
  envelopeFile: EnvelopeFile;
  onClose: () => void;
}) => (
  <div
    role="dialog"
    aria-modal="true"
    aria-label={`Preview ${envelopeFile.file.name}`}
    onKeyDown={(e) => e.key === "Escape" && onClose()}
    onClick={onClose}
    className="fixed inset-0 z-50 flex items-center justify-center"
    style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(4px)" }}
  >
    <div
      onClick={(e) => e.stopPropagation()}
      style={{
        position: "relative",
        maxWidth: "90vw",
        maxHeight: "90vh",
        borderRadius: "8px",
        overflow: "hidden",
        background: t.surface,
      }}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close preview"
        className="absolute flex items-center justify-center"
        style={{
          top: "12px",
          right: "12px",
          width: "32px",
          height: "32px",
          borderRadius: "50%",
          background: "rgba(0,0,0,0.5)",
          border: "none",
          cursor: "pointer",
          color: "#fff",
          zIndex: 1,
        }}
      >
        <X size={16} />
      </button>

      <img
        src={envelopeFile.preview}
        alt={envelopeFile.file.name}
        style={{ maxWidth: "90vw", maxHeight: "90vh", display: "block" }}
      />

      <div
        className="absolute bottom-0 left-0 right-0"
        style={{
          padding: "8px 16px",
          background: "rgba(0,0,0,0.5)",
          color: "#fff",
          fontSize: "13px",
        }}
      >
        {envelopeFile.file.name} · {formatSize(envelopeFile.file.size)}
      </div>
    </div>
  </div>
);

export const Envelope = ({
  variant = "steeped",
  size = "standard",
  accept = "*",
  multiple = false,
  maxSize,
  disabled = false,
  error,
  label,
  placeholder = "Drop files here or click to upload",
  onChange,
  className,
  "aria-label": ariaLabel,
}: EnvelopeProps) => {
  const [files, setFiles] = useState<EnvelopeFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [preview, setPreview] = useState<EnvelopeFile | null>(null);
  const [sizeError, setSizeError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const addFiles = useCallback(
    (incoming: File[]) => {
      setSizeError(null);
      const valid = incoming.filter((f) => {
        if (maxSize && f.size > maxSize * 1024 * 1024) {
          setSizeError(`"${f.name}" exceeds ${maxSize}MB limit`);
          return false;
        }
        return true;
      });
      if (!valid.length) return;
      const next = multiple
        ? [...files, ...valid.map(toEnvelopeFile)]
        : [toEnvelopeFile(valid[0])];
      setFiles(next);
      onChange?.(next.map((ef) => ef.file));
    },
    [files, multiple, maxSize, onChange],
  );

  const removeFile = (id: string) => {
    const removed = files.find((f) => f.id === id);
    if (removed?.preview) URL.revokeObjectURL(removed.preview);
    const next = files.filter((f) => f.id !== id);
    setFiles(next);
    onChange?.(next.map((ef) => ef.file));
  };

  const clearAll = () => {
    files.forEach((f) => {
      if (f.preview) URL.revokeObjectURL(f.preview);
    });
    setFiles([]);
    onChange?.([]);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (!disabled) addFiles(Array.from(e.dataTransfer.files));
  };
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (!disabled) setIsDragging(true);
  };
  const handleDragLeave = () => setIsDragging(false);
  const handleClick = () => {
    if (!disabled) inputRef.current?.click();
  };
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (["Enter", "Space"].includes(e.key)) handleClick();
  };
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) addFiles(Array.from(e.target.files));
    e.target.value = "";
  };

  const activeError = sizeError ?? error;

  const borderColor = activeError ? t.error : isDragging ? t.primary : t.border;

  const borderStyle = variant === "glazed" ? "dashed" : "solid";
  const bgColor = isDragging
    ? `color-mix(in srgb, ${t.primary} 5%, ${t.surface})`
    : t.surface;

  return (
    <div style={{ fontFamily: t.fontFamily, width: "100%" }}>
      {label && <Label text={label} fontSize={sizes[size].fontSize} />}

      {/* drop zone */}
      <div
        role="button"
        tabIndex={disabled ? -1 : 0}
        aria-label={ariaLabel ?? placeholder}
        aria-disabled={disabled}
        aria-invalid={!!activeError}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={cn(
          "w-full rounded-md transition-all duration-150 cursor-pointer",
          disabled && "opacity-40 cursor-not-allowed",
          className,
        )}
        style={{
          padding: sizes[size].padding,
          fontSize: sizes[size].fontSize,
          border: `2px ${borderStyle} ${borderColor}`,
          background: disabled ? t.muted : bgColor,
          outline: isDragging
            ? `3px solid color-mix(in srgb, ${t.primary} 30%, transparent)`
            : "none",
          outlineOffset: "2px",
        }}
      >
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          disabled={disabled}
          onChange={handleInput}
          style={{ display: "none" }}
          aria-hidden="true"
        />

        <div
          className="flex flex-col items-center gap-2 text-center"
          style={{ color: t.muted }}
        >
          <div
            className="flex items-center justify-center rounded-full"
            style={{
              width: "56px",
              height: "56px",
              border: `1.5px solid ${isDragging ? t.primary : t.border}`,
              background: isDragging
                ? `color-mix(in srgb, ${t.primary} 8%, ${t.surface})`
                : "transparent",
              transition: "all 0.15s ease",
            }}
          >
            <Upload
              size={24}
              style={{ color: isDragging ? t.primary : t.muted }}
            />
          </div>
          <span>{isDragging ? "Release to upload" : placeholder}</span>
          {maxSize && (
            <span style={{ fontSize: "11px" }}>Max {maxSize}MB per file</span>
          )}
        </div>
      </div>

      {activeError && <ErrorMessage text={activeError} />}

      {files.length > 0 && (
        <div className="flex flex-col gap-2" style={{ marginTop: "12px" }}>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={clearAll}
              className="flex items-center gap-1"
              style={{
                fontSize: "12px",
                color: t.muted,
                background: "none",
                border: "none",
                cursor: "pointer",
              }}
            >
              <X size={12} /> Clear all
            </button>
          </div>

          {files.map((ef) => (
            <FileCard
              key={ef.id}
              envelopeFile={ef}
              onRemove={removeFile}
              onPreview={setPreview}
              fontSize={sizes[size].fontSize}
            />
          ))}
        </div>
      )}

      {preview && (
        <PreviewModal envelopeFile={preview} onClose={() => setPreview(null)} />
      )}
    </div>
  );
};

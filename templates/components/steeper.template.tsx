// templates/components/steeper.template.tsx
import { useState, useRef } from "react";
import { Search, X, Eye, EyeOff } from "lucide-react";
import { cn } from "@maid_melisa/shared/cn";
import type { SteepperProps } from "../types/steeper.type";

const variants = {
  steeped: {
    base: "bg-surface text-text border-border",
    hover: "hover:border-primary",
    active: "focus-within:ring-2 focus-within:ring-primary",
    disabled: "opacity-40 cursor-not-allowed bg-muted",
  },
  plain: {
    base: "bg-transparent text-text border-border",
    hover: "hover:border-primary",
    active: "focus-within:ring-2 focus-within:ring-primary",
    disabled: "opacity-40 cursor-not-allowed",
  },
  glazed: {
    base: "bg-transparent text-text border-transparent border-b border-b-border rounded-none",
    hover: "hover:border-b-primary",
    active: "focus-within:border-b-2 focus-within:border-b-primary",
    disabled: "opacity-40 cursor-not-allowed",
  },
} as const;

const sizes = {
  demi: { padding: "6px 10px", fontSize: "12px" },
  standard: { padding: "10px 14px", fontSize: "14px" },
  grand: { padding: "14px 18px", fontSize: "16px" },
} as const;

const Label = ({ text, fontSize }: { text: string; fontSize: string }) => (
  <label
    style={{
      fontSize,
      marginBottom: "4px",
      display: "block",
      color: "var(--text)",
    }}
  >
    {text}
  </label>
);

const ErrorMessage = ({ text }: { text: string }) => (
  <span
    style={{
      fontSize: "12px",
      color: "var(--error)",
      marginTop: "4px",
      display: "block",
    }}
  >
    {text}
  </span>
);

const IconSlot = ({ children }: { children: React.ReactNode }) => (
  <span
    style={{
      display: "flex",
      alignItems: "center",
      padding: "0 8px",
      color: "var(--muted)",
    }}
  >
    {children}
  </span>
);

const ActionButton = ({
  onClick,
  label,
  children,
}: {
  onClick: () => void;
  label: string;
  children: React.ReactNode;
}) => (
  <button
    type="button"
    onClick={onClick}
    aria-label={label}
    style={{
      display: "flex",
      alignItems: "center",
      padding: "0 8px",
      color: "var(--muted)",
      cursor: "pointer",
      background: "none",
      border: "none",
    }}
  >
    {children}
  </button>
);

const usePasswordToggle = () => {
  const [visible, setVisible] = useState(false);
  const toggle = () => setVisible((v) => !v);
  return { visible, toggle };
};

const PasswordAddon = ({
  visible,
  toggle,
}: {
  visible: boolean;
  toggle: () => void;
}) => (
  <ActionButton
    onClick={toggle}
    label={visible ? "Hide password" : "Show password"}
  >
    {visible ? <EyeOff size={16} /> : <Eye size={16} />}
  </ActionButton>
);

const SearchAddon = ({
  value,
  onClear,
}: {
  value: string;
  onClear: () => void;
}) => (
  <>
    <IconSlot>
      <Search size={16} />
    </IconSlot>
    {value && (
      <ActionButton onClick={onClear} label="Clear search">
        <X size={14} />
      </ActionButton>
    )}
  </>
);

export const Steeper = ({
  variant = "steeped",
  size = "standard",
  type = "text",
  value,
  defaultValue,
  placeholder = "",
  disabled = false,
  readOnly = false,
  error,
  icon: Icon,
  label,
  onChange,
  onClear,
  className,
  "aria-label": ariaLabel,
}: SteepperProps) => {
  const { visible: showPassword, toggle: togglePassword } = usePasswordToggle();
  const [internalValue, setInternalValue] = useState(defaultValue ?? "");
  const inputRef = useRef<HTMLInputElement & HTMLTextAreaElement>(null);

  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;
  const resolvedType = type === "password" && showPassword ? "text" : type;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    if (!isControlled) setInternalValue(e.target.value);
    onChange?.(e.target.value);
  };

  const handleClear = () => {
    if (!isControlled) setInternalValue("");
    onChange?.("");
    onClear?.();
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape" && type === "search") handleClear();
  };

  const sharedProps = {
    ref: inputRef,
    value: currentValue,
    placeholder,
    disabled,
    readOnly,
    onChange: handleChange,
    onKeyDown: handleKeyDown,
    className:
      "flex-1 bg-transparent outline-none placeholder:text-muted w-full",
    style: {
      padding: sizes[size].padding,
      fontSize: sizes[size].fontSize,
      fontFamily: "var(--mm-font-family)",
    },
    "aria-label": ariaLabel,
    "aria-invalid": !!error,
  };

  return (
    <div style={{ fontFamily: "var(--mm-font-family)", width: "100%" }}>
      {label && <Label text={label} fontSize={sizes[size].fontSize} />}

      <div
        className={cn(
          "flex items-center w-full border rounded transition-all duration-150",
          variants[variant].base,
          !disabled && variants[variant].hover,
          !disabled && variants[variant].active,
          disabled && variants[variant].disabled,
          error &&
            "border-error bg-error-bg focus-within:ring-error focus-within:ring-1",
          className,
        )}
      >
        {type === "search" && (
          <span
            style={{
              paddingLeft: "10px",
              color: "var(--muted)",
              display: "flex",
            }}
          >
            {Icon ? <Icon size={16} /> : <Search size={16} />}
          </span>
        )}

        {type === "textarea" ? (
          <textarea
            {...sharedProps}
            rows={4}
            style={{ ...sharedProps.style, resize: "vertical" }}
          />
        ) : (
          <input {...sharedProps} type={resolvedType} />
        )}

        {type === "password" && !disabled && (
          <PasswordAddon visible={showPassword} toggle={togglePassword} />
        )}
      </div>

      {error && <ErrorMessage text={error} />}
    </div>
  );
};

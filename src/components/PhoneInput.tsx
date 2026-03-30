import * as React from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface PhoneInputProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  disabled?: boolean;
}

function formatPhone(digits: string): string {
  // digits should be without country code (max 10 digits)
  const d = digits.slice(0, 10);
  if (d.length === 0) return "";
  if (d.length <= 3) return `(${d}`;
  if (d.length <= 6) return `(${d.slice(0, 3)}) ${d.slice(3)}`;
  if (d.length <= 8) return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6, 8)}-${d.slice(8)}`;
}

function extractDigits(raw: string): string {
  // Remove everything except digits
  let digits = raw.replace(/\D/g, "");
  // If starts with 7 or 8 and length > 10, strip country code
  if (digits.length > 10) {
    if (digits.startsWith("7") || digits.startsWith("8")) {
      digits = digits.slice(1);
    }
    // If starts with 79, 89 etc after paste with +7
    if (digits.length > 10) {
      digits = digits.slice(digits.length - 10);
    }
  }
  return digits.slice(0, 10);
}

const PhoneInput = React.forwardRef<HTMLDivElement, PhoneInputProps>(
  ({ value, onChange, className, disabled }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const rawInput = e.target.value;
      // Remove the "+7 " prefix if user somehow edited it
      const afterPrefix = rawInput.startsWith("+7 ") ? rawInput.slice(3) : rawInput;
      const digits = extractDigits(afterPrefix);
      onChange("+7" + digits);
    };

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
      e.preventDefault();
      const pasted = e.clipboardData.getData("text");
      const digits = extractDigits(pasted);
      onChange("+7" + digits);
    };

    // Extract digits from value for display
    const currentDigits = value.startsWith("+7") ? value.slice(2).replace(/\D/g, "") : extractDigits(value);
    const displayValue = "+7 " + formatPhone(currentDigits);

    return (
      <div ref={ref} className={cn("relative", className)}>
        <Input
          type="tel"
          value={displayValue}
          onChange={handleChange}
          onPaste={handlePaste}
          disabled={disabled}
          placeholder="+7 (___) ___-__-__"
        />
      </div>
    );
  }
);
PhoneInput.displayName = "PhoneInput";

export { PhoneInput };

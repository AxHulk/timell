import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface ConsentCheckboxProps {
  id?: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  variant?: "light" | "dark";
  className?: string;
}

const ConsentCheckbox = ({ id = "consent-pd", checked, onCheckedChange, variant = "light", className = "" }: ConsentCheckboxProps) => {
  const textClass = variant === "dark" ? "text-primary-foreground/80" : "text-muted-foreground";
  const linkClass = variant === "dark" ? "text-primary-foreground underline" : "text-primary underline";

  return (
    <div className={`flex items-start gap-2 ${className}`}>
      <Checkbox
        id={id}
        checked={checked}
        onCheckedChange={(c) => onCheckedChange(!!c)}
        className={variant === "dark" ? "border-primary-foreground/50 data-[state=checked]:bg-primary-foreground data-[state=checked]:text-primary" : ""}
      />
      <Label htmlFor={id} className={`text-xs leading-relaxed cursor-pointer ${textClass}`}>
        Я свободно, своей волей и в своем интересе даю конкретное, информированное и сознательное согласие на обработку моих персональных данных и полностью принимаю условия{" "}
        <a href="/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className={linkClass}>
          Политики конфиденциальности
        </a>
      </Label>
    </div>
  );
};

export default ConsentCheckbox;

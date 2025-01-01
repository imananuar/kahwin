import { Checkbox } from "@/components/ui/checkbox"
import { useEffect } from "react";

interface CheckboxProps {
  id: string;
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export default function UICheckbox ({id, label, checked, onChange}: CheckboxProps){

    useEffect(() => {
        checked ? onChange(true): onChange(false);
        
    }, [])
  return (
    <div className="flex items-center">
        <Checkbox 
        id={id}
        defaultChecked={checked}
        onCheckedChange={(value) => onChange(value as boolean)}
        />
        <label
        htmlFor={id}
        className="ml-4 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
            {label}
        </label>
    </div>
  );
};

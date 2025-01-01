import React from "react";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

interface SelectProps {
  id: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}

export default function UISelect ({ id, value, options, onChange }: SelectProps) {
  return (
    <Select onValueChange={onChange}>
      <SelectTrigger id={id}>
        <SelectValue placeholder="Select" />
      </SelectTrigger>
      <SelectContent>
        {options.map((option, index) => (
          <SelectItem key={index} value={option}>
            {option}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

import React, { useEffect, useState } from "react";
import { useForm, FieldValues, SubmitHandler, UseFormReset, UseFormReturn } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Validation {
  required?: string | boolean;
  minLength?: { value: number; message: string };
  maxLength?: { value: number; message: string };
  pattern?: { value: RegExp; message: string };
  // Add other validation rules as needed
}

interface Field {
  name: string;
  label: string;
  placeholder?: string;
  type?: string;
  options?: string[];  // Add options for select fields
  validation?: Validation;
  defaultValue: string;  // Add defaultValue option for flexibility
}

interface ShadFormProps {
  fields: Field[];
  onSubmit: SubmitHandler<FieldValues>;
  footerContent?: React.ReactNode;
  buttonName?: string;
  reset: Boolean;
}

const CommonForm: React.FC<ShadFormProps> = ({
  fields,
  onSubmit,
  footerContent,
  buttonName,
  reset
}) => {
  const form = useForm({ mode: "onChange", shouldFocusError: true });
  // const { register, handleSubmit, setValue } = useForm();
  useEffect(() => {
    if (reset) {
      form.reset({});
      fields.map((field, i) => {
        form.setValue(field.name, "");
      })
    }
  }, [reset])
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 py-4">
        {fields.map((field, index) => (
          <FormField
            key={index}
            control={form.control}
            name={field.name}
            render={({ field: formField }) => (
              <FormItem>
                <FormControl>
                  <div className="items-center gap-4 mb-2">
                    <Label htmlFor={field.name} className="text-right">
                      {field.label}
                      {field.validation?.required && (
                        <span className="text-red-500 ml-1">*</span>
                      )}
                    </Label>
                    {/* Check if the field type is select */}
                    {field.type === "select" ? (
                      <Select >
                        <SelectTrigger id={field.name} className="border border-blue-300 m-0">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent className="">
                          {field.options?.map((option, index) => (
                            <SelectItem key={index} value={option || ''}>
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ) : (
                      <Input
                        id={field.name}
                        type={field.type || "text"}
                        placeholder={field.placeholder}
                        {...formField}
                        {...form.register(field.name, field.validation)}
                        value={formField.value || ''}
                        className="col-span-3"
                      />
                    )}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}

        {footerContent && (
          <div className="text-sm text-gray-600 text-center mt-4">
            {footerContent}
          </div>
        )}

        <div className="mt-4">
          <Button
            type="submit"
            className="w-full"
            disabled={!form.formState.isValid}
          >
            {buttonName}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CommonForm;

// Sample User

{
  /* <ReusableForm
fields={registerFields}
onSubmit={handleSubmit}
//   footerContent={
//     <>
//       Not registered yet?{" "}
//       <Link href="/register" className="underline">
//         Register now
//       </Link>
//     </>
//   }
/> */
}

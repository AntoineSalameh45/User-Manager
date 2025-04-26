import { UseFormRegister } from "react-hook-form";

export interface iLabelledSelectProps {
    label: string;
    name: string;
    options: string[];
    register: UseFormRegister<any>;
    error?: string;
  }
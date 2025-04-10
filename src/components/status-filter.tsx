import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function StatusFilter({ onFilterChange } : { onFilterChange: (status: string) => void }) {
  const [status, setStatus] = useState("all");

  const handleStatusChange = (value : string) => {
    setStatus(value);
    onFilterChange(value);
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium">Filter by status:</span>
      <Select value={status} onValueChange={handleStatusChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select a status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Statuses</SelectItem>
          <SelectItem value="Applied">Applied</SelectItem>
          <SelectItem value="Interview">Interview</SelectItem>
          <SelectItem value="Offer">Offer</SelectItem>
          <SelectItem value="Rejected">Rejected</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

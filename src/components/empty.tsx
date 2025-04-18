import { InfoIcon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";

interface EmptyProps {
  title?: string;
  description?: string;
  actionText?: string;
  onActionClick?: () => void;
}

export default function Empty({
  title = "No Data Found",
  description = "There is currently no data to display.",
  actionText = "Add",
  onActionClick,
}: EmptyProps) {
  return (
    <div className=" absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-center items-center">
      <Alert className="flex flex-col items-center justify-center px-20 gap-2">
        <InfoIcon className="h-6 w-6 text-blue-500" />
        <AlertTitle>{title}</AlertTitle>
        <AlertDescription>
          <p>
            {description}{" "}
            {onActionClick && (
              <span
                className="hover:underline text-blue-300 cursor-pointer"
                onClick={onActionClick}
              >
                {actionText}
              </span>
            )}
          </p>
        </AlertDescription>
      </Alert>
    </div>
  );
}

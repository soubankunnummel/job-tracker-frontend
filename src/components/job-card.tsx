import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { CalendarIcon, LinkIcon, MoreVerticalIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { AlertDialogCard } from "./alert-dilog";

export interface CardProps {
  data: {
    _id: string;
  company: string;
  role: string;
  status: string;
  applicationDate: Date;
  link: string;
  createdAt: Date;
  };
  onUpdate?: (id: string, status: string) => void;
  onDelete?: (id: string) => void;
}

export default function JobCard({ data, onUpdate, onDelete }: CardProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const handleDeleteClick = () => {
    setIsMenuOpen(false);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = (id: string) => {
    if (onDelete) {
      onDelete(id);
    }
    setIsDeleteDialogOpen(false);
  };

  // Status badge color mapping
  const statusColors: Record<string, string> = {
    Applied: "bg-blue-100 text-blue-800 hover:bg-blue-200",
    Interview: "bg-yellow-100 text-yellow-800 hover:bg-yellow-200",
    Offer: "bg-green-100 text-green-800 hover:bg-green-200",
    Rejected: "bg-red-100 text-red-800 hover:bg-red-200",
  };

  const statusColorClass =
    statusColors[data.status] || "bg-gray-100 text-gray-800";

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl font-semibold">{data.role}</CardTitle>
            <CardDescription className="text-base font-medium mt-1">
              {data.company}
            </CardDescription>
          </div>

          {(onUpdate || onDelete) && (
            <DropdownMenu open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreVerticalIcon className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {onUpdate && data.status !== "Applied" && (
                  <DropdownMenuItem
                    onClick={() => onUpdate(data?._id, "Applied")}
                  >
                    Mark as Applied
                  </DropdownMenuItem>
                )}
                {onUpdate && data.status !== "Interview" && (
                  <DropdownMenuItem
                    onClick={() => onUpdate(data?._id, "Interview")}
                  >
                    Mark as Interview
                  </DropdownMenuItem>
                )}
                {onUpdate && data.status !== "Offer" && (
                  <DropdownMenuItem
                    onClick={() => onUpdate(data?._id, "Offer")}
                  >
                    Mark as Offer
                  </DropdownMenuItem>
                )}
                {onUpdate && data.status !== "Rejected" && (
                  <DropdownMenuItem
                    onClick={() => onUpdate(data?._id, "Rejected")}
                  >
                    Mark as Rejected
                  </DropdownMenuItem>
                )}
                {onDelete && (
                  <DropdownMenuItem
                    className="text-red-600 focus:text-red-600"
                    onClick={handleDeleteClick}
                  >
                    Delete
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </CardHeader>

      <CardContent className="pb-3">
        <div className="flex flex-wrap gap-2 mb-3">
          <Badge className={`font-normal ${statusColorClass}`}>
            {data.status}
          </Badge>
          <div className="flex items-center text-sm text-gray-500">
            <CalendarIcon className="mr-1 h-3 w-3" />
            Applied: {formatDate(data.applicationDate)}
          </div>
        </div>
      </CardContent>
      <AlertDialogCard
        isOpen={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onConfirm={handleDeleteConfirm}
        jobId={data._id}
        jobTitle={data.role}
      />

      <CardFooter className="pt-0 flex justify-between items-center">
        <div className="text-xs text-gray-500">
          Added: {formatDate(data.createdAt)}
        </div>

        {data.link && (
          <a
            href={data.link}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800 hover:underline"
          >
            <LinkIcon className="mr-1 h-3 w-3" />
            View job
          </a>
        )}
      </CardFooter>
    </Card>
  );
}

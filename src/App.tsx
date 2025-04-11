import { AppSidebar } from "@/components/app-sidebar";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import JobCard from "./components/job-card";
import { useDeleteJob, useJob, useUpdateJob } from "./hooks/use-job";
import { Button } from "./components/ui/button";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { AddJob } from "./components/add-job-form";
import { Job } from "./types/job";
import { StatusFilter } from "./components/status-filter";
import Skeleton from "./components/skeleton ";
import Empty from "./components/empty";

export default function Page() {
  const { data, isError, isLoading } = useJob();
  const [isActive, setIsActive] = useState({
    index: 0,
    title: "View Jobs",
  });
  const [statusFilter, setStatusFilter] = useState("all");
  const updateJobMutation = useUpdateJob();
  const deleteJobMutation = useDeleteJob();
  const queryClient = useQueryClient();

  console.log(isActive);

  const filteredJobs = useMemo(() => {
    if (!data) return [];
    if (statusFilter === "all") return data;
    return data.filter((job: Job) => job.status === statusFilter);
  }, [data, statusFilter]);

  const handleUpdate = (id: string, status: string) => {
    updateJobMutation.mutate(
      { id, status },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["jobs"] });
          toast.success(
            <>
              <span>Status updated</span>
              <span>Job status changed to {status}</span>
            </>
          );
        },
        onError: (error) => {
          toast.error(
            <>
              <span>
                {error instanceof Error ? error.message : String(error)}
              </span>
              <span>Failed to update job status. Please try again.</span>
            </>
          );
        },
      }
    );
  };

  const handleDelete = (id: string) => {
    deleteJobMutation.mutate(
      { id },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["jobs"] });
          toast.success(
            <>
              <span>Job deleted</span>
            </>
          );
        },
        onError: (error) => {
          toast.error(
            <>
              <span>
                {error instanceof Error ? error.message : String(error)}
              </span>
              <span>Failed to delete job. Please try again.</span>
            </>
          );
        },
      }
    );
  };

  const handleFilterChange = (status: string) => {
    setStatusFilter(status);
  };

  return (
    <SidebarProvider>
      <AppSidebar isActive={isActive} setIsActive={setIsActive} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
        </header>
        
        {isActive.title === "View Jobs" ? (
          <div className="flex flex-1 relative flex-col gap-4 p-4">
            <div className="mb-4">
              <StatusFilter onFilterChange={handleFilterChange} />
            </div>
            <div className="grid auto-rows-min gap-4 md:grid-cols-3">
              {isLoading && <Skeleton />}
              {!isLoading && !isError && isActive.title === "View Jobs"  && filteredJobs.length === 0 && (
          <Empty
            title="No Jobs Found"
            description="You currently have no jobs to display."
            actionText="Add"
            onActionClick={() => setIsActive({ index: 1, title: "Add Job" })}
          />
        )}

              {isError && (
                <div className="flex flex-col items-center justify-center gap-4 p-4">
                  <p>Error fetching jobs</p>
                  <Button onClick={() => window.location.reload()}>
                    Try again
                  </Button>
                </div>
              )}

              {!isLoading &&
                !isError &&
                filteredJobs.map((item: Job, index: number) => (
                  <JobCard
                    key={index}
                    data={item}
                    onUpdate={handleUpdate}
                    onDelete={handleDelete}
                  />
                ))}
            </div>
          </div>
        ) : (
          <div className="p-5 md:mx-24">
            <AddJob />
          </div>
        )}
      </SidebarInset>
    </SidebarProvider>
  );
}

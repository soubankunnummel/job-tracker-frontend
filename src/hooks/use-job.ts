import { JobService } from "@/services/job-service";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useJob = () => {
    return useQuery({
        queryFn: JobService.getJobs,
        queryKey: ["jobs"],
    })
};

export const useUpdateJob = ()=> {
    return  useMutation({
         mutationFn: ({ id, status }: { id: string; status: string }) => JobService.updateJob(id, status),
        mutationKey: ["update-job"],
        onSuccess: (data) => {
            console.log(data);
        },
    })
}


export const useDeleteJob = () => {
    return  useMutation({
         mutationFn: ({ id }: { id: string }) => JobService.deleteJob(id),
        mutationKey: ["delete-job"],
        onSuccess: (data) => {
            console.log(data);
        },
    })
}


export const useAddJob = () => {
  return useMutation({
    mutationFn: (job: any) => JobService.addJob(job),
    mutationKey: ["add-job"],
    onSuccess: (data) => {
      console.log(data);
    },
  });
};
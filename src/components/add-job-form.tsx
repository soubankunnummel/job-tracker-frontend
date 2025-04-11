"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { JobForm } from "@/types/job";
import { useAddJob } from "@/hooks/use-job";
import { useQueryClient } from "@tanstack/react-query";

const formSchema = z.object({
  company: z.string().min(1, {
    message: "Company name is required.",
  }),
  role: z.string().min(1, {
    message: "Job role is required.",
  }),
  link: z
    .string()
    .url({
      message: "Please enter a valid URL.",
    })
    .optional()
    .or(z.literal("")),
});

export function AddJob() {
  const queryClient = useQueryClient();

  const addJobMutation = useAddJob();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      company: "",
      role: "",
      link: "",
    },
  });

  function onSubmit(values: JobForm) {
    // Add current date as applicationDate and createdAt
    const jobData = {
      ...values,
      applicationDate: new Date(),
      createdAt: new Date(),
      status: "Applied", // Default status
    };
    console.log(values);

    // Call the parent's onSubmit function with the form data
    // if (onSubmitProp) {
    //   onSubmitProp(jobData);
    // }

    addJobMutation.mutate(jobData, {
      onSuccess: (data) => {
        queryClient.invalidateQueries({ queryKey: ["jobs"] });
        console.log(data);
      },
      onError: (error: any) => {
        toast.error(error?.response?.data?.message || "An error occurred");
      },
    });

    // Show success message
    toast.success("Job application added successfully");

    // Reset the form
    form.reset();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="company"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company</FormLabel>
              <FormControl>
                <Input placeholder="Company Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Job Role</FormLabel>
              <FormControl>
                <Input placeholder="Software Engineer" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="link"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Job URL (Optional)</FormLabel>
              <FormControl>
                <Input placeholder="https://example.com/job" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          Add Job Application
          {addJobMutation.isPending && <Loader2 className="animate-spin" />}
        </Button>
      </form>
    </Form>
  );
}

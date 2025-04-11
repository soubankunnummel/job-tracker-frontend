import api from "@/lib/axios";

export const JobService = {
  async getJobs() {
    const response = await api.get("/jobs");
    return response.data;
  },

  async updateJob(id: string, status: string) {
    const response = await api.patch(`/jobs/${id}`, {
      status,
    });
    return response.data;
  },

  async deleteJob(id: string) {
    const response = await api.delete(`/jobs/${id}`);
    return response.data;
  },

  async addJob(job: any) {
    const response = await api.post("/jobs/add", job);
    return response.data;
  },
};

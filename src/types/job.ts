export interface Job {
  _id: string;
  company: string;
  role: string;
  link: string;
  status: string;
  createdAt: Date;
  applicationDate: Date;
}

export interface JobForm {
  company: string;
  role: string;
  link?: string | undefined;
}

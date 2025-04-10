import {
//   useQuery,
//   useMutation,
//   useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

const queryClient = new QueryClient();
export default function QueryProvider({children}: React.PropsWithChildren) {
  return <QueryClientProvider client={queryClient}> {children} </QueryClientProvider>;
}

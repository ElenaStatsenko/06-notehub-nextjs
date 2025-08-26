import { fetchNotes } from "@/lib/api";
import { QueryClient } from "@tanstack/react-query";
import NoteClient from "./Notes.client";



const App = async ({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; search?: string }>;
}) => {
  const params = await searchParams; // ждем searchParams
  const queryClient = new QueryClient();

  const page = Number(params.page) || 1;
  const search = params.search || "";

  await queryClient.prefetchQuery({
    queryKey: ["notes", page, search],
    queryFn: () => fetchNotes(page, search),
  });

  return <NoteClient />;
};

export default App;

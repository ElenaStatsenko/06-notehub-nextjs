import { fetchNotes } from "@/lib/api";
import { QueryClient } from "@tanstack/react-query";
import NoteClient from "./Notes.client";




const App = async ({
  searchParams,
}: {
  searchParams: { page?: string; search?: string };
}) => {
  const queryClient = new QueryClient();
  const page = Number(searchParams.page) || 1;
  const search = searchParams.search || "";
  await queryClient.prefetchQuery({
    queryKey: ["notes", page, search],
    queryFn: () => fetchNotes(page, search),
  });

  return <NoteClient />;
};

export default App;

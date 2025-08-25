
import { fetchNotes } from "@/lib/api";
import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";
// import NoteList from "@/components/NoteList/NoteList";
import NoteClient from "./Notes.client";


type Props = {
  params: Promise<{ id: string }>;
};
const App = async ({ params }: Props) => {
  const { id } = await params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNotes(),
  });

  return (
    <div >
      <HydrationBoundary state={dehydrate(queryClient)}>
        <NoteClient />
        
      </HydrationBoundary>
    </div>
  );
};

export default App;

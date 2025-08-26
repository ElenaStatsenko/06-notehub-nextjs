import axios from "axios";
import type { Note } from "../types/note";
import type { ValuesFormProps } from "../types/note";
;

export default interface NotesResponse {
  notes: Note[];
  totalPages: number;
  page: number;
}

const myKey = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;
export const notehubAPI = axios.create({
  baseURL: "https://notehub-public.goit.study/api",
  headers: {
    Authorization: `Bearer ${myKey}`,
  },
});

export const fetchNotes = async (
  page: number = 1,
  search: string = ""
): Promise<NotesResponse> => {
  const { data } = await notehubAPI.get<NotesResponse>("/notes", {
    params: {
      page,
      perPage: 12,
      search: search || undefined,
    },
  });

  return data;
};
export const createNote = async (note: ValuesFormProps) => {
  const response = await notehubAPI.post<Note>("/notes", note);

  return response.data;
};

export const deleteNote= async (noteId: string) => {
  const response = await notehubAPI.delete<Note>(`/notes/${noteId}`)
  return response.data
};
export const fetchNoteById= async (id:string) => {
  const response = await notehubAPI.get<Note>(`/notes/${id}`)
  return response.data
}
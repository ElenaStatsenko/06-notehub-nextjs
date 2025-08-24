import css from "./notes.module.css";
import { fetchNotes } from "@/lib/api";

const App = async () => {
  const responce = await fetchNotes();
  console.log(responce);
  return <div className={css.app}></div>;
};

export default App;

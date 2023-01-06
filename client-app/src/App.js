import { BrowserRouter, Routes, Route } from "react-router-dom";
import FirstPage from "./components/FirstPage";
import NotFound from "./components/NotFound";
import NotesList from "./components/NotesList";
import GroupsList from "./components/GroupsList";
function App() {
  return (
    <div className="container">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<FirstPage/>}></Route>
        <Route path="/students/:id/notes" element={<NotesList/>}></Route>
        <Route path="/students/:id/groups" element={<GroupsList/>}></Route>
        <Route path="*" element={<NotFound/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Expand_Result from "./expand_result";
import Search from "./search";
import { useState } from "react";

function App() {
  const [current_id,setCurrentId] = useState(0);

  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<Search uid={setCurrentId}/>} />
          <Route path="/expand" element={<Expand_Result id={current_id}/>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;

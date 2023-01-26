import { Route, Routes } from "react-router";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<div>Home</div>}/>
        <Route path="/attendees" element={<div>Attendees</div>} />
      </Routes>
    </div>
  );
}

export default App;

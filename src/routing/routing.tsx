import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import About from "../views/About/About";

import Home from "../views/Home/Home";
import NotFound from "../views/NotFound/NotFound";
// import your route components too

const Routing = () => {
  return (
    <BrowserRouter>
    <Routes>
        <Route index element={<Home />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="*" element={<NotFound />}></Route>
    </Routes>
  </BrowserRouter>
  )
}

export default Routing
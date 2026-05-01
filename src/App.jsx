import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./Pages/Home";
import { NotFound } from "./Pages/NotFound";
import { Toaster } from "@/components/UI/toaster";
import { BlogIndex } from './Pages/Blog/BlogIndex';
import { BlogPost } from './Pages/Blog/BlogPost';
// 1. Import the Navbar component
import { Navbar } from "./components/Navbar"; 

function App() {
  return (
    <>
      <Toaster />
      <BrowserRouter>
        {/* 2. Place Navbar inside the Router, but outside the Routes */}
        <Navbar />
        
        <Routes>
          <Route index element={<Home />}/>
          <Route path="blog" element={<BlogIndex />}/>
          <Route path="blog/:slug" element={<BlogPost />}/>
          <Route path="*" element={<NotFound />}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
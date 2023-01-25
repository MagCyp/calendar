import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from './Home'
import RegisterPage from './RegisterPage'
import { TopBar } from "./UI/TopBar/TopBar";



export default function App() {
    return (
      <>
        <TopBar/>
        <BrowserRouter>
            <Routes>
                {/* <Route path="/" element={<TopBar />}> */}
                    <Route path="/" element={<Home />} />
                    <Route path="register" element={<RegisterPage />} />
                {/* </Route> */}
            </Routes>
        </BrowserRouter>
        </>
    );
}
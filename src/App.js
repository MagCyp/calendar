import { gapi } from "gapi-script";
import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from './Home'
import RegisterPage from './RegisterPage'



export default function App() {

    return (
        <BrowserRouter>
            <Routes>
                {/* <Route path="/" element={<TopBar />}> */}
                    <Route path="/" element={<Home />} />
                    <Route path="register" element={<RegisterPage />} />
                {/* </Route> */}
            </Routes>
        </BrowserRouter>
    );
}
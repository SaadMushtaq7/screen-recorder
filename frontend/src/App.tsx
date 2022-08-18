import React, { FC } from "react";
import { Route, Routes } from "react-router-dom";
import AppHeader from "components/AppHeader";
import MainRecorder from "Pages/MainRecorder";
import "./App.css";
import HomePage from "Pages/HomePage";
import PreviewPage from "Pages/PreviewPage";

const App: FC = () => {
  return (
    <div className="App">
      <AppHeader />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/previewVideo" element={<PreviewPage />} />
        <Route path="/recording" element={<MainRecorder />} />
      </Routes>
    </div>
  );
};

export default App;

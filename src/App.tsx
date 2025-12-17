import { Route, Routes } from "react-router-dom";

import { Suspense, lazy } from "react";
import PageLoading from "../src/components/common/PageLoading";
import Header from "./components/common/Header";

const HomePage = lazy(() => import("./pages/HomePage"));
const ParticularPage = lazy(() => import("./pages/ParticularPage"));
const NotFoundPage = lazy(() => import("./pages/NotFound"));

function App() {
  return (
    <div className="h-screen flex flex-col bg-slate-700">
      <Header />

      <div className="flex-1 relative">
        <Suspense fallback={<PageLoading />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/post/:id" element={<ParticularPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </div>
    </div>
  );
}

export default App;

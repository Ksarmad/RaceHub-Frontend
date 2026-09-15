import { Toaster } from "react-hot-toast";
import { SpeedInsights } from "@vercel/speed-insights/react";
import AppRoutes from "./routes";

function App() {
  return (
    <>
      <Toaster position="top-center" />
      <AppRoutes />
      <SpeedInsights />
    </>
  );
}

export default App;

import { RouterProvider } from "react-router-dom";
import router from "./router/index";

export default function App() {
  return (
    <>
      <div className="p-0">
        <RouterProvider router={router} />
      </div>
    </>
  );
}

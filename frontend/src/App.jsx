import { Routes, Route, Navigate } from "react-router-dom";
import { Dashboard } from "@/layouts";
import { SignIn, SignUp } from "./pages/auth";
import AddCategoryScreen from "./pages/dashboard/category/add_category_screen";

function App() {
  return (
    <Routes>
      <Route path="/dashboard/*" element={<Dashboard />} />
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/sign-up" element={<SignUp />} />

      <Route path="/dashboard/add-category" element={<AddCategoryScreen />} />
      <Route path="*" element={<Navigate to="/dashboard/home" replace />} />
    </Routes>
  );
}

export default App;

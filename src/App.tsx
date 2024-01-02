import React, { useState, lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CreateMebel from "./pages/CreateMebelPage/CreateMebel";
import UserAccount from "./pages/UserAccountPage/UserAccount";
import Navbar from "./components/Navbar/Navbar";
import MebelForm from "./pages/AddFurnitureForm/AddFurnitureForm";

const Home = lazy(() => import("./pages/HomePage/Home"));
const Favorites = lazy(() => import("./pages/Favorites/Favorites"));
const Cart = lazy(() => import("./pages/CartPage/Cart"));
const Contact = lazy(() => import("./pages/Contact/Contact"));
const AddFurnitureForm = lazy(
  () => import("./pages/AddFurnitureForm/AddFurnitureForm")
);

const MebelDetails = lazy(
  () => import("./pages/MebelDetailsPage/MebelDetails")
);

const App: React.FC = () => {
  const [notification, setNotification] = useState<React.ReactNode | null>(
    null
  );

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route
            path="/"
            index
            element={
              <Suspense fallback={<h2>loading</h2>}>
                <Home />
              </Suspense>
            }
          />
          <Route
            path="/mebel-details/:id"
            element={
              <Suspense fallback={<h2>loading</h2>}>
                <MebelDetails />
              </Suspense>
            }
          />
          <Route
            path="/favorites"
            element={
              <Suspense fallback={<h2>loading</h2>}>
                <Favorites />
              </Suspense>
            }
          />
          <Route
            path="/cart"
            element={
              <Suspense fallback={<h2>loading</h2>}>
                <Cart />
              </Suspense>
            }
          />
          <Route
            path="/contact"
            element={
              <Suspense fallback={<h2>loading</h2>}>
                <Contact />
              </Suspense>
            }
          />
          <Route
            path="/new"
            element={
              <Suspense fallback={<h2>loading</h2>}>
                <MebelForm />
              </Suspense>
            }
          />
          {/* <Route
        path="/create-mebel"
        element={
          <PrivateRoute
          path="/create-mebel"
          roles={["master"]}
          component={<CreateMebel />}
          />
        }
        />
        
        <Route
        path="/cart"
        element={
          <PrivateRoute
          path="/cart"
          roles={["customer"]}
          component={<Cart />}
          />
        }
        />
        
        <Route
        path="/user-account"
        element={
          <PrivateRoute
          path="/user-account"
          roles={["customer", "master"]}
          component={<UserAccount />}
          />
        }
      /> */}
        </Routes>
      </Router>
    </>
  );
};

export default App;

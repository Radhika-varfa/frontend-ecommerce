import { Route, Routes } from "react-router-dom";
import AuthLayout from "./components/auth/layout";
import AuthRegister from "./pages/auth/register";
import AuthLogin from "./pages/auth/login";
import AdminLayout from "./components/admin-view/layout";
import AdminDashboard from "./pages/admin-view/dashboard";
import AdminOrders from "./pages/admin-view/orders";
import AdminFeatures from "./pages/admin-view/features";
import AdminProducts from "./pages/admin-view/products";
import ShoppingLayout from "./components/shopping-view/layout";
import NotFound from "./pages/not-found";
import ShoppingHome from "./pages/shopping-view/home";
import ShoppingCheckout from "./pages/shopping-view/checkout";
import ShoppingAccount from "./pages/shopping-view/account";
import ShoppingListing from "./pages/shopping-view/listing";
import CheckAuth from "./components/common/check-auth";
import UnauthPage from "./pages/unauth-page";
import { useDispatch, useSelector } from "react-redux";
import { Toaster } from 'react-hot-toast';
import { useEffect } from "react";
import { checkAuth } from "./store/auth-slice";
import { Skeleton } from "./components/ui/skeleton";
import PaypalReturnPage from "./pages/shopping-view/paypal-return";
import PaymentSuccessPage from "./pages/shopping-view/payment-success";
import SearchProducts from "./pages/shopping-view/search";

function App() { 
  const {user, isAuthenticated,isLoading} = useSelector(state => state.auth)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  if (isLoading) return <Skeleton className="w-[800] bg-black h-[600px]" />;

  // console.log(isLoading, user);
  return (
    <div className="flex flex-col overflow-hidden bg-white">
        <Toaster position="top-right" reverseOrder={false} />
      <Routes>
        {/* Auth Routes (No Protection) */}
        <Route path="/auth" element={<AuthLayout />}>
          <Route path="login" element={<AuthLogin />} />
          <Route path="register" element={<AuthRegister />} />
        </Route>

        {/* Protected Admin Routes */}
        <Route
          path="/admin"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user} />
          }
        >
          <Route element={<AdminLayout />}>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="orders" element={<AdminOrders />} />
            <Route path="features" element={<AdminFeatures />} />
            <Route path="products" element={<AdminProducts />} />
          </Route>
        </Route>

        {/* Protected Shop Routes */}
        <Route
          path="/shop"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user} />
          }
        >
          <Route element={<ShoppingLayout />}>
            <Route path="home" element={<ShoppingHome />} />
            <Route path="checkout" element={<ShoppingCheckout />} />
            <Route path="account" element={<ShoppingAccount />} />
            <Route path="listing" element={<ShoppingListing />} />
            <Route path="paypal-return" element={<PaypalReturnPage />} />
            <Route path="payment-success" element={<PaymentSuccessPage />} />
            <Route path="search" element={<SearchProducts  />} />
          </Route>
        </Route>

        {/* Not Found Route */}
        <Route path="*" element={<NotFound />} />
        <Route path="/unauth-page" element={<UnauthPage />} />
      </Routes>
    </div>
  );
}

export default App;

import { Navigate, Outlet,useLocation } from "react-router";

function CheckAuth({isAuthenticated, user}) {
  const location = useLocation();

  //if user is not authenticate and not in login and register page it redirect to login and register page
  if (
    !isAuthenticated &&
    !(
      location.pathname.includes("/login") ||
      location.pathname.includes("/register")
    )
  ) {
    return <Navigate to="/auth/login" />;
  }
  //if user login and authenticate then page redirect to admin page (if admin) and shop home (normal user) page according to his role
  if (
    isAuthenticated &&
    (location.pathname.includes("/login") ||
      location.pathname.includes("/register"))
  ) {
    if (user?.role === "admin") {
      return <Navigate to="/admin/dashboard" />;
    } else {
      return <Navigate to="/shop/home" />;
    }
  }
  //if normal user is authenticate but it try to access admin page than page redirect to unauth page
  if (
    isAuthenticated &&
    user?.role !== "admin" &&
    location.pathname.includes("admin")
  ) {
    return <Navigate to="/unauth-page" />;
  }
  //if user is authenticated and his role is admin he try to access shop page than page redirect to
  if (
    isAuthenticated &&
    user?.role === "admin" &&
    location.pathname.includes("shop")
  ) {
    return <Navigate to="/admin/dashboard" />;
  }
//   return<>{children}</>
return <Outlet />;
}
export default CheckAuth;

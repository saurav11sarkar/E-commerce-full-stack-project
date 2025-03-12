import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";

const DashbordLayout = () => {
  const { data } = useSelector((state) => state.auth);
  if (!data) {
    return <Navigate to={"/login"} replace />;
  }
  const randerDashbord = () => {
    switch (data?.role) {
      case "admin":
        return <div>Admin dashbord</div>;
      case "user":
        return <div>User Dashbord</div>;
      default:
        return <Navigate to="/login" replace />;
    }
  };
  return (
    <div
      style={{ margin: "auto" }}
      className="container mx-auto flex flex-col md:flex-row gap-4 items-start justify-start"
    >
      <header className="lg:w-1/5 sm:w-2/5 w-full border">
      {randerDashbord()}
      </header>
      <main
        style={{ padding: "32px", marginTop: "20px" }}
        className="bg-white w-full border"
      >
        <Outlet />
      </main>
    </div>
  );
};

export default DashbordLayout;

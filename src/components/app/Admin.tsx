import { useAuth } from "../../hooks/useAuth";
import { useAuthStore } from "../../store/auth.store";

function Admin() {
  const { Logout } = useAuth();
  const { isLoading } = useAuthStore();

  return (
    <div
      style={{
        height: "60px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
      className="w-100 container bg-dark"
    >
      <p style={{ cursor: "pointer", color: "white" }}>azizahadovv\admin</p>
      <button className="btn btn-info" onClick={Logout} disabled={isLoading}>
        {isLoading && "...loading"} Exit
      </button>
    </div>
  );
}

export default Admin;

import { Auth, useAuth } from "@arcana/auth-react";

const onLogin = () => {
  // Route to authenticated page
  console.log("Logged in");
}

function App() {
  const auth = useAuth();
  return (
    <div>
      {auth.loading ? (
        "Loading"
      ) : auth.isLoggedIn ? (
        <p>Logged In</p>
      ) : (
        <div>
          <Auth externalWallet={true} theme={"light"} onLogin={onLogin}/>
        </div>
      )}
    </div>
  );
}

export default App;

import { Auth, useAuth } from "@arcana/auth-react";
import NFTScreen from "./Components/AppScreen/NFTScreen";

const onLogin = () => {
  // Route to authenticated page
  console.log("Logged in");
}

function App() {
  const auth = useAuth();
  return (
    <div className="bg-black text-white flex items-center justify-center min-h-screen">
      {auth.loading ? (
        "Loading"
      ) : auth.isLoggedIn ? (
        <NFTScreen />
      ) : (
        <div>
          <Auth externalWallet={true} theme="light" onLogin={onLogin}/>
        </div>
      )}
    </div>
  );
}

export default App;

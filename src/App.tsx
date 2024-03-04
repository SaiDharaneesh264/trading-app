import { Fragment } from "react";
import { Navigate, Route, Routes, redirect } from "react-router";
import { SignUpPage } from "./pages/SignUp";
import { LogInPage } from "./pages/LogIn";
import ForgotPage from "./pages/Forgot";
import DashboardPage from "./pages/DashboardPage";
import TradePage from "./pages/Trade";
import { useAuth } from "./store/auth";
const App = () => {
  const { isAuthenticated } = useAuth();
  return (
    <Fragment>
      <Routes>
        <Route path="/" element={<LogInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LogInPage />} />
        <Route path="/forgot-password" element={<ForgotPage />} />
        <Route path="/dashboard" element={isAuthenticated ? <DashboardPage />: <Navigate to="/login"/>} />
        <Route path="/asset" element={<TradePage />} />
        {/* <Route path="/wallet-detail/:cryptoId" element={<CryptoAssetsPage />} />
        <Route
          path="/purchase-payment/:cryptoLabel"
          element={<BuyingAssetPage />}
        />
        <Route path="/sell-payment/:cryptoLabel" element={<SellPage />} />
        <Route path="/trade-wallet" element={<TradeWalletUSDPage />} /> */}
      </Routes>
    </Fragment>
  );
};
export default App;

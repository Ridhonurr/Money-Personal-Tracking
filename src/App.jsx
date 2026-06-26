import { useState, useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router";
import NotFoundPage from "./components/NotFoundPage";
import MainMenuPage from "./features/MainMenu/Page";
import Navbar from "./components/Navbar";
import MutationPage from "./features/Mutation/Page";
import ReportPage from "./features/Report/Page";
import WalletPage from "./features/Wallet/Page";
import AddWalletPage from "./features/Wallet/AddPage";
import EditWalletPage from "./features/Wallet/EditPage";
import AddMutationPage from "./features/Mutation/AddPage";
import LoginPage from "./features/Authentication/LoginPage";
import RegisterPage from "./features/Authentication/RegisterPage";
import { GetData } from "./helper/StorageData";
import { setOnSessionExpired } from "./services/api";

const SESSION_KEY = "session_id";

// Halaman yang tidak perlu session (auth pages)
const AUTH_PATHS = ["/login", "/register"];

function App() {
    const navigate = useNavigate();
    const location = useLocation();

    const [checkingSession, setCheckingSession] = useState(true);
    const [hasSession, setHasSession] = useState(false);

    // Cek session_id saat app pertama kali load
    useEffect(() => {
        const checkSession = async () => {
            const sessionData = await GetData(SESSION_KEY);
            const sessionId = sessionData?.value || null;

            if (!sessionId) {
                // Tidak ada session, redirect ke login
                // Kecuali jika sudah di halaman auth
                if (!AUTH_PATHS.includes(location.pathname)) {
                    navigate("/login", { replace: true });
                }
                setHasSession(false);
            } else {
                setHasSession(true);
            }

            setCheckingSession(false);
        };

        checkSession();
    }, []);

    // Register callback untuk session expired dari api.js
    useEffect(() => {
        setOnSessionExpired(() => {
            setHasSession(false);
            navigate("/login", { replace: true });
        });
    }, [navigate]);

    // Tentukan apakah Navbar perlu ditampilkan
    const isAuthPage = AUTH_PATHS.includes(location.pathname);

    // Saat masih ngecek session, tampilkan loading
    if (checkingSession) {
        return (
            <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
                <div className="text-gray-400">Memuat...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-950 text-white">
            {!isAuthPage && <Navbar />}
            <main className={!isAuthPage ? "pb-16" : ""}>
                <Routes>
                    {/* Auth routes */}
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />

                    {/* Protected routes */}
                    <Route path="/" element={<MainMenuPage />} />
                    <Route path="/mutation" element={<MutationPage />} />
                    <Route path="/mutation/add" element={<AddMutationPage />} />
                    <Route path="/report" element={<ReportPage />} />
                    <Route path="/wallet" element={<WalletPage />} />
                    <Route path="/wallet/:id" element={<EditWalletPage />} />
                    <Route path="/wallet/add" element={<AddWalletPage />} />
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </main>
        </div>
    );
}

export default App;

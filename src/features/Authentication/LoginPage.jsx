import { useState } from "react";
import { useNavigate, Link } from "react-router";
import { login, verifyOtp } from "../../services/AuthService";

export default function LoginPage() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // OTP state
    const [tokenId, setTokenId] = useState(null);
    const [otp, setOtp] = useState("");
    const [otpLoading, setOtpLoading] = useState(false);
    const [otpError, setOtpError] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");

        if (!email.trim() || !password.trim()) {
            setError("Email dan password wajib diisi");
            return;
        }

        try {
            setLoading(true);
            const resp = await login(email, password);

            if (resp.token_id) {
                setTokenId(resp.token_id);
            } else {
                setError(resp.message || "Login gagal");
            }
        } catch (err) {
            setError("Terjadi kesalahan, silakan coba lagi");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        setOtpError("");

        if (!otp.trim()) {
            setOtpError("Kode OTP wajib diisi");
            return;
        }

        try {
            setOtpLoading(true);
            const resp = await verifyOtp(tokenId, otp, "login");

            if (resp.session_id) {
                navigate("/");
            } else {
                setOtpError(resp.message || "Verifikasi OTP gagal");
            }
        } catch (err) {
            setOtpError("Terjadi kesalahan, silakan coba lagi");
            console.error(err);
        } finally {
            setOtpLoading(false);
        }
    };

    // Tampilkan form OTP setelah login berhasil
    if (tokenId) {
        return (
            <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center p-4">
                <div className="w-full max-w-sm space-y-6">
                    <div className="text-center">
                        <h1 className="text-2xl font-bold">Verifikasi OTP</h1>
                        <p className="text-sm text-gray-400 mt-2">
                            Masukkan kode OTP yang dikirim ke email Anda
                        </p>
                    </div>

                    <form onSubmit={handleVerifyOtp} className="space-y-4">
                        {otpError && (
                            <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-4 text-sm text-red-400 text-center">
                                {otpError}
                            </div>
                        )}

                        <div>
                            <label className="text-sm text-gray-400">Kode OTP</label>
                            <input
                                type="text"
                                inputMode="numeric"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                placeholder="Masukkan kode OTP"
                                className="w-full mt-1 rounded-2xl bg-[#141622] border border-gray-800 p-4 outline-none focus:border-green-500/50 text-center text-lg tracking-widest"
                                maxLength={6}
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={otpLoading}
                            className="w-full rounded-2xl bg-green-600 p-4 font-semibold disabled:opacity-50 active:scale-95 transition-all"
                        >
                            {otpLoading ? "Memverifikasi..." : "Verifikasi"}
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    // Form login
    return (
        <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center p-4">
            <div className="w-full max-w-sm space-y-6">
                <div className="text-center">
                    <h1 className="text-2xl font-bold">Masuk</h1>
                    <p className="text-sm text-gray-400 mt-2">
                        Masuk ke akun Anda untuk melanjutkan
                    </p>
                </div>

                <form onSubmit={handleLogin} className="space-y-4">
                    {error && (
                        <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-4 text-sm text-red-400 text-center">
                            {error}
                        </div>
                    )}

                    <div>
                        <label className="text-sm text-gray-400">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Masukkan email"
                            className="w-full mt-1 rounded-2xl bg-[#141622] border border-gray-800 p-4 outline-none focus:border-green-500/50"
                        />
                    </div>

                    <div>
                        <label className="text-sm text-gray-400">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Masukkan password"
                            className="w-full mt-1 rounded-2xl bg-[#141622] border border-gray-800 p-4 outline-none focus:border-green-500/50"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-2xl bg-green-600 p-4 font-semibold disabled:opacity-50 active:scale-95 transition-all"
                    >
                        {loading ? "Memproses..." : "Masuk"}
                    </button>
                </form>

                <p className="text-center text-sm text-gray-400">
                    Belum punya akun?{" "}
                    <Link to="/register" className="text-green-400 hover:text-green-300 font-medium">
                        Daftar
                    </Link>
                </p>
            </div>
        </div>
    );
}

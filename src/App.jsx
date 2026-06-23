import { Routes, Route } from "react-router";
import NotFoundPage from "./components/NotFoundPage";
import MainMenuPage from "./features/MainMenu/Page";
import Navbar from "./components/Navbar";
import MutationPage from "./features/Mutation/Page";
import ReportPage from "./features/Report/Page";
import WalletPage from "./features/Wallet/Page";
import AddWalletPage from "./features/Wallet/AddPage";
import EditWalletPage from "./features/Wallet/EditPage";
import AddMutationPage from "./features/Mutation/AddPage";

function App() {

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Navbar />
      <main className="pb-16"> {/* padding bawah untuk navbar */}
        <Routes>
          <Route path="/" element={<MainMenuPage />} />
          <Route path="/mutation" element={<MutationPage />} />
          <Route path="/mutation/add" element={<AddMutationPage />} />
          <Route path="/report" element={<ReportPage />} />
          <Route path="/wallet" element={<WalletPage />}/>
          <Route path="/wallet/:id" element={<EditWalletPage />}/>
          <Route path="/wallet/add"  element={<AddWalletPage />}/>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Navbar from './components/layout/Navbar';
import Toast from './components/ui/Toast';
import Home from './pages/Home';
import Marketplace from './pages/Marketplace';
import ListingDetail from './pages/ListingDetail';
import Feed from './pages/Feed';
import Collection from './pages/Collection';

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/marketplace/:id" element={<ListingDetail />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/collection" element={<Collection />} />
          <Route path="*" element={<div style={{padding:'4rem 2rem', textAlign:'center'}}><h2>Page not found</h2></div>} />
        </Routes>
        <Toast />
      </BrowserRouter>
    </AppProvider>
  );
}

import Footer from './components/Footer';
import Navbar from './components/Navbar';
import SiteContent from './components/SiteContent';

function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main id="main-content" tabIndex={-1} className="flex-1">
        <SiteContent />
      </main>

      <Footer />
    </div>
  );
}

export default App;
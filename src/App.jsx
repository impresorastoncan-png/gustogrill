import { useState } from 'react';
import TableWizard from './components/TableWizard';

function App() {
  const [isWizardVisible, setIsWizardVisible] = useState(false);

  const heroStyle = {
    backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=2574&auto=format&fit=crop')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  return (
    <div className="min-h-screen">
      <main className={`relative transition-opacity duration-1000 ${isWizardVisible ? 'opacity-30' : 'opacity-100'}`}>
        <section
          className="min-h-screen flex flex-col items-center justify-center text-center text-white p-4"
          style={heroStyle}
        >
          <div className="max-w-2xl">
            <h1 className="text-5xl md:text-7xl font-serif font-bold leading-tight">
              Taste the Extraordinary.
            </h1>
            <p className="mt-4 text-lg md:text-xl text-gray-300">
              Experience culinary excellence in an atmosphere of pure elegance.
            </p>
            <button
              onClick={() => setIsWizardVisible(true)}
              className="mt-8 px-8 py-3 bg-brand-red hover:bg-red-700 text-white font-bold text-lg rounded-md transition-transform duration-300 transform hover:scale-105"
            >
              Reserve Your Table
            </button>
          </div>
        </section>
      </main>

      {isWizardVisible && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
                className="absolute inset-0 bg-black/50"
                onClick={() => setIsWizardVisible(false)}
            ></div>
            <TableWizard closeWizard={() => setIsWizardVisible(false)} />
        </div>
      )}
    </div>
  );
}

export default App;

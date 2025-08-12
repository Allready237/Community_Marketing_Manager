import React from 'react';
import Header from './components/Header';
import ProductForm from './components/ProductForm';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      <Header />
      
      <main className="flex-1 py-8 px-4 sm:px-6 lg:px-8">
        <ProductForm />
      </main>
      
      <Footer />
    </div>
  );
}

export default App;
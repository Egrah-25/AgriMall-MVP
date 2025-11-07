// src/App.jsx
import { useState, useEffect } from 'react';
import { auth } from './firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import Auth from './components/Auth';
import './App.css';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  if (!user) {
    return <Auth />;
  }

  return (
    <div className="min-h-screen bg-green-50 p-4">
      <div className="max-w-6xl mx-auto">
        <header className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-green-800">AgriMall</h1>
            <div className="flex items-center gap-4">
              <span className="text-gray-700">Welcome, {user.email}</span>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Logout
              </button>
            </div>
          </div>
        </header>

        <main className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Dashboard
          </h2>
          <p className="text-gray-600">
            Welcome to AgriMall! Your authentication is working perfectly. 
            Next, we'll build the farmer and buyer dashboards.
          </p>
          <div className="mt-6 p-4 bg-green-100 rounded">
            <p className="text-green-800">
              ✅ Firebase Authentication is connected!
            </p>
            <p className="text-green-800">
              ✅ User session is being maintained!
            </p>
            <p className="text-green-800">
              ✅ Ready to build the marketplace features!
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;

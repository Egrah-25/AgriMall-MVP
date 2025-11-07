// src/components/Auth.jsx
import { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [userType, setUserType] = useState('buyer'); // 'farmer' or 'buyer'

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
        alert('Login successful!');
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
        alert('Account created successfully!');
        // TODO: Save user type to Firestore
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-green-50 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-green-800 mb-6 text-center">
          {isLogin ? 'Login to AgriMall' : 'Join AgriMall'}
        </h2>
        
        {!isLogin && (
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">I am a:</label>
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => setUserType('farmer')}
                className={`flex-1 py-2 rounded ${
                  userType === 'farmer' 
                    ? 'bg-green-600 text-white' 
                    : 'bg-gray-200 text-gray-700'
                }`}
              >
                Farmer
              </button>
              <button
                type="button"
                onClick={() => setUserType('buyer')}
                className={`flex-1 py-2 rounded ${
                  userType === 'buyer' 
                    ? 'bg-green-600 text-white' 
                    : 'bg-gray-200 text-gray-700'
                }`}
              >
                Buyer
              </button>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>
          
          <div>
            <label className="block text-gray-700 mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded hover:bg-green-700 transition duration-200"
          >
            {isLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>

        <p className="mt-4 text-center text-gray-600">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-green-600 hover:underline"
          >
            {isLogin ? 'Sign Up' : 'Login'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Auth;

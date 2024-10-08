import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { ADD_PARENT } from '../utils/mutations';
import Auth from '../utils/auth';
import errorHandler from '../utils/errorHandler';

const Signup = () => {
  const [formState, setFormState] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [addParent, { error, data }] = useMutation(ADD_PARENT);

  // Update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // Submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await addParent({
        variables: { ...formState },
      });
      Auth.login(data.addParent.token);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <main className="flex items-center justify-center min-h-screen py-6 px-4">
      <div className="w-full max-w-sm p-6 bg-gray-800 rounded-lg shadow-lg">
        <h4 className="text-3xl font-bold permanent-marker-regular text-white mb-4">Sign Up</h4>
        <div>
          {data ? (
            <p className="text-green-500">
              Success! You may now head{' '}
              <Link to="/" className="text-blue-500 underline">back to the homepage.</Link>
            </p>
          ) : (
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-1">Username</label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  value={formState.username}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-600 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your username"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formState.email}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-600 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">Password</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={formState.password}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-600 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your password"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 wood-sign btn-sign"
              >
                <p className='mb-7'>Sign Up</p>
              </button>
            </form>
          )}

          {error && (
            <div className="mt-4 p-3 bg-red-600 text-white rounded-md">
              {errorHandler(error.message)}
            </div>
          )}
        </div>
        <div className="mt-4 text-center">
          <p className="permanent-marker-regular text-gray-300">Already have an account?</p>
          <Link to="/login" className="btn-sign text-white rounded-md px-4 py-2 permanent-marker-regular">
            Login
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Signup;

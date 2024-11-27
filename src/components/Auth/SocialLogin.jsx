import { useAuth0 } from '@auth0/auth0-react';
import { GoogleLogin } from 'react-oauth-google';
import { socialLogin } from '../../services/auth';
import useAuth from '../../hooks/useAuth';
import toast from 'react-hot-toast';

export default function SocialLogin() {
  const { loginWithRedirect: auth0Login } = useAuth0();
  const login = useAuth(state => state.login);

  // Only render Google Login if client ID is configured
  const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  const auth0Domain = import.meta.env.VITE_AUTH0_DOMAIN;

  const handleGoogleSuccess = async (response) => {
    try {
      const result = await socialLogin('google', response.credential);
      login(result.user);
      toast.success('Login successful!');
    } catch (error) {
      toast.error('Google login failed');
    }
  };

  const handleGoogleError = () => {
    toast.error('Google login failed');
  };

  if (!googleClientId && !auth0Domain) {
    return (
      <div className="mt-6 text-center text-sm text-gray-500">
        Social login is not configured. Please set up OAuth credentials.
      </div>
    );
  }

  return (
    <div className="mt-6">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="bg-white px-2 text-gray-500">Or continue with</span>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3">
        {auth0Domain && (
          <div>
            <button
              onClick={() => auth0Login()}
              className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-500 shadow-sm hover:bg-gray-50"
            >
              <span className="sr-only">Sign in with Auth0</span>
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 0C4.477 0 0 4.477 0 10c0 4.42 2.865 8.166 6.84 9.49.5.09.68-.22.68-.485 0-.236-.008-.866-.013-1.7-2.782.603-3.37-1.34-3.37-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.532 1.03 1.532 1.03.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.09.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.377.203 2.394.1 2.647.64.699 1.028 1.593 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C17.137 18.163 20 14.418 20 10c0-5.523-4.477-10-10-10z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        )}

        {googleClientId && (
          <div className={!auth0Domain ? 'col-span-2' : ''}>
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleError}
              useOneTap
              theme="outline"
              size="large"
              width="100%"
              logo_alignment="center"
              text="continue_with"
            />
          </div>
        )}
      </div>
    </div>
  );
}
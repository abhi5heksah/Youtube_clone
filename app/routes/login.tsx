export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white rounded-xl shadow-md w-full max-w-md p-8 space-y-6">
        <div className="flex justify-center">
          <img
            src="https://www.gstatic.com/youtube/img/branding/youtubelogo/svg/youtubelogo.svg"
            alt="YouTube Logo"
            className="w-32"
          />
        </div>
        <h2 className="text-center text-2xl font-semibold text-gray-800">
          Sign in to YouTube
        </h2>
        <p className="text-center text-sm text-gray-500">
          Continue to your personalized video feed
        </p>
        <a
          href="/api/auth/google"
          className="flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md font-medium transition duration-200"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google Icon"
            className="w-5 h-5"
          />
          Login with Google
        </a>
        <div className="text-xs text-center text-gray-400">
          This login uses your Google account to authenticate with YouTube.
        </div>
      </div>
    </div>
  );
}

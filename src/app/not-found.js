export default function NotFound() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-5xl font-extrabold text-gray-800 mb-4">
          404 - Page Not Found
        </h1>
        <p className="text-lg text-gray-600">
          Oops! The page you are looking for might be in another castle.
        </p>
        <img
          className="mt-8 w-40 h-40 mx-auto"
          src="/modern_404_image.svg" // Replace with your custom image
          alt="404 Illustration"
        />
        <a
          href="/"
          className="mt-6 inline-block px-6 py-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition duration-300"
        >
          Go Home
        </a>
      </div>
    </div>
  );
}

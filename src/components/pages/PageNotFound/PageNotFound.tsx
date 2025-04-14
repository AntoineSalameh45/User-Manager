import { useNavigate } from "react-router";

const PageNotFound = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate("/dashboard");
  };

  return (
    <div className="flex justify-center items-center h-screen bg-pagebg">
      <div className="bg-white shadow-lg rounded-2xl p-8 text-center">
        <h1 className="text-4xl font-bold text-gray-700 mb-4">404</h1>
        <h2 className="text-2xl font-bold text-gray-700 mb-2">Page Not Found</h2>
        <p className="text-gray-500 mb-6">
          Sorry, the page you're looking for doesn't exist.
        </p>
        <button
          onClick={handleGoBack}
          className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-secondary hover:border-secondary transition duration-300"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default PageNotFound;

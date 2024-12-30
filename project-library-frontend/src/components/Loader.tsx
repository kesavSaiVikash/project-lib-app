const Loader = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-blue-500 border-solid rounded-full animate-spin border-t-transparent"></div>
        <p className="absolute top-20 w-full text-center text-gray-600 dark:text-gray-300 font-medium text-sm">
          Loading...
        </p>
      </div>
    </div>
  );
};

export default Loader;

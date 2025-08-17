const categoryContent: Record<string, { title: string; description: string }> =
  {
    ios: {
      title: "iOS Devices",
      description: "Explore our range of iOS devices.",
    },
    bluetooth: {
      title: "Bluetooth Devices",
      description: "Connect wirelessly with our Bluetooth accessories.",
    },
    watches: {
      title: "Smartwatches",
      description: "Stay connected with our smartwatches.",
    },
    accessories: {
      title: "Accessories",
      description: "Enhance your devices with our accessories.",
    },
    androids: {
      title: "Android Devices",
      description: "Discover the latest Android smartphones.",
    },
    laptops: {
      title: "Laptops",
      description: "Powerful laptops for all your needs.",
    },
  };

export default function CategoryPage() {
  return (
    <div className="container mx-auto p-8 max-w-4xl bg-white shadow-lg rounded-lg my-8">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-4 text-center">
        Product Categories
      </h1>
      <p className="text-xl text-gray-700 mb-6 text-center">
        Explore our wide range of product categories below.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.entries(categoryContent).map(
          ([key, { title, description }]) => (
            <div
              key={key}
              className="p-6 bg-gray-100 rounded-lg shadow-md hover:shadow-lg transition duration-300"
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-2">{title}</h2>
              <p className="text-gray-600 mb-4">{description}</p>
              <div className="text-center">
                <button className="px-6 py-2 bg-green-600 text-white text-lg font-semibold rounded-lg hover:bg-green-700 transition duration-300">
                  Explore {title}
                </button>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}

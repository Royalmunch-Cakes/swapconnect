export default function BluetoothPage() {
  return (
    <div className="container mx-auto p-8 max-w-4xl bg-white shadow-lg rounded-lg my-8">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-4 text-center">
        Bluetooth Devices
      </h1>
      <p className="text-xl text-gray-700 mb-6 text-center">
        Connect wirelessly with our Bluetooth accessories.
      </p>
      <div className="text-center">
        <button className="px-8 py-3 bg-green-600 text-white text-lg font-semibold rounded-lg hover:bg-green-700 transition duration-300">
          Explore Bluetooth Products
        </button>
      </div>
    </div>
  );
}

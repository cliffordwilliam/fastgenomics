import { getOrders } from "@/db/models/order";

const Page = async () => {
  const orders = await getOrders();
  return (
    <main className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-4">Orders</h1>
      <div className="grid gap-8 grid-cols-1">
        {orders.map(({ name, phoneNumber, email, serviceDescription }) => (
          <div
            key={name}
            className="bg-white p-6 rounded-md shadow-md transition duration-300 ease-in-out transform hover:scale-105"
          >
            <h2 className="text-3xl font-bold mb-2">Name: {name}</h2>
            <p className="text-gray-600 mb-2">Phone number: {phoneNumber}</p>
            <p className="text-gray-600 mb-2">Email: {email}</p>
            <p className="text-gray-600 mb-2">
              Service description: {serviceDescription}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
};

export default Page;

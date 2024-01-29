import { postOrder } from "@/db/models/order";
import { ZodOrderInput } from "@/db/types";
import { redirect } from "next/navigation";

const Page = () => {
  const actionSubmit = async (formData: FormData) => {
    "use server";
    const name = formData.get("name");
    const phoneNumber = formData.get("phoneNumber");
    const email = formData.get("email");
    const serviceDescription = formData.get("serviceDescription");
    // zod bad? throw
    const zRes = ZodOrderInput.safeParse({
      name,
      phoneNumber,
      email,
      serviceDescription,
    });
    if (!zRes.success) {
      // throw errFinalMessage
      const errPath = zRes.error.issues[0].path[0];
      const errMessage = zRes.error.issues[0].message;
      const errFinalMessage = `${errPath} - ${errMessage}`;
      throw new Error(errFinalMessage);
    }
    // POST
    const publication = await postOrder({
      name: zRes.data.name,
      phoneNumber: zRes.data.phoneNumber,
      email: zRes.data.email,
      serviceDescription: zRes.data.serviceDescription,
    });
    redirect("/?ok=true");
  };
  return (
    <main className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-4">Order Form</h1>
      <form action={actionSubmit}>
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="mt-1 p-2 w-full border-2"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="phoneNumber"
            className="block text-sm font-medium text-gray-700"
          >
            Phone Number:
          </label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            className="mt-1 p-2 w-full border-2"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="mt-1 p-2 w-full border-2"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="serviceDescription"
            className="block text-sm font-medium text-gray-700"
          >
            Service Description:
          </label>
          <textarea
            id="serviceDescription"
            name="serviceDescription"
            className="mt-1 p-2 w-full border-2"
            required
          />
        </div>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Submit
        </button>
      </form>
    </main>
  );
};

export default Page;

import { postPublication } from "@/db/models/publication";
import { ZodPublicationInput } from "@/db/types";
import { redirect } from "next/navigation";

const Page = () => {
  const actionSubmit = async (formData: FormData) => {
    "use server";
    // get form
    const year = formData.get("year");
    const title = formData.get("title");
    const totalCitation = formData.get("totalCitation");
    const recentCitation = formData.get("recentCitation");
    const author = formData.get("author");
    const doi = formData.get("doi");
    const linkToScholar = formData.get("linkToScholar");
    const publications = formData.get("publications");
    // zod bad? throw
    const zRes = ZodPublicationInput.safeParse({
      year,
      title,
      totalCitation,
      recentCitation,
      author,
      doi,
      linkToScholar,
      publications,
    });
    if (!zRes.success) {
      // throw errFinalMessage
      const errPath = zRes.error.issues[0].path[0];
      const errMessage = zRes.error.issues[0].message;
      const errFinalMessage = `${errPath} - ${errMessage}`;
      throw new Error(errFinalMessage);
    }
    // POST
    const publication = await postPublication({
      year: zRes.data.year,
      title: zRes.data.title,
      totalCitation: zRes.data.totalCitation,
      recentCitation: zRes.data.recentCitation,
      author: zRes.data.author,
      doi: zRes.data.doi,
      linkToScholar: zRes.data.linkToScholar,
      publications: zRes.data.publications,
    });
    redirect("/publications");
  };
  return (
    <main className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-4">Publication Form</h1>
      <form action={actionSubmit}>
        <div className="mb-4">
          <label
            htmlFor="year"
            className="block text-sm font-medium text-gray-700"
          >
            Year:
          </label>
          <input
            type="text"
            id="year"
            name="year"
            className="mt-1 p-2 w-full border-2"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Title:
          </label>
          <input
            type="text"
            id="title"
            name="title"
            className="mt-1 p-2 w-full border-2"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="totalCitation"
            className="block text-sm font-medium text-gray-700"
          >
            Total Citation:
          </label>
          <input
            type="text"
            id="totalCitation"
            name="totalCitation"
            className="mt-1 p-2 w-full border-2"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="recentCitation"
            className="block text-sm font-medium text-gray-700"
          >
            Recent Citation:
          </label>
          <input
            type="text"
            id="recentCitation"
            name="recentCitation"
            className="mt-1 p-2 w-full border-2"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="author"
            className="block text-sm font-medium text-gray-700"
          >
            Author:
          </label>
          <input
            type="text"
            id="author"
            name="author"
            className="mt-1 p-2 w-full border-2"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="doi"
            className="block text-sm font-medium text-gray-700"
          >
            DOI:
          </label>
          <input
            type="text"
            id="doi"
            name="doi"
            className="mt-1 p-2 w-full border-2"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="linkToScholar"
            className="block text-sm font-medium text-gray-700"
          >
            Link to Scholar:
          </label>
          <input
            type="text"
            id="linkToScholar"
            name="linkToScholar"
            className="mt-1 p-2 w-full border-2"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="publications"
            className="block text-sm font-medium text-gray-700"
          >
            Publications:
          </label>
          <textarea
            id="publications"
            name="publications"
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

import { getPublications } from "@/db/models/publication";

const Page = async () => {
  const publications = await getPublications();
  return (
    <main className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-4">Publications</h1>
      <div className="grid gap-8 grid-cols-1">
        {publications.map(
          ({
            year,
            title,
            totalCitation,
            recentCitation,
            author,
            doi,
            linkToScholar,
            publications,
          }) => (
            <div
              key={title}
              className="bg-white p-6 rounded-md shadow-md transition duration-300 ease-in-out transform hover:scale-105"
            >
              <h2 className="text-3xl font-bold mb-2">{title}</h2>
              <p className="text-gray-600 mb-2">{author}</p>
              <p className="text-gray-600 mb-2">{year}</p>
              <p className="text-gray-600 mb-2">
                Total Citations: {totalCitation}
              </p>
              <p className="text-gray-600 mb-2">
                Recent Citations: {recentCitation}
              </p>
              <p className="text-blue-500 underline mb-2">
                <a
                  href={linkToScholar}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Link to Scholar
                </a>
              </p>
              <p className="mb-2">
                <strong>DOI:</strong> {doi}
              </p>
              <p className="mb-2">{publications}</p>
            </div>
          )
        )}
      </div>
    </main>
  );
};

export default Page;

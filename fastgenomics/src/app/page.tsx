import Link from "next/link";
import { redirect } from "next/navigation";
import Image from "next/image";

const Page = ({ searchParams }: { searchParams: { ok: boolean } }) => {
  return (
    <main className="flex items-center justify-center h-screen relative">
      <Image
        src="/h.png"
        width={2000}
        height={1216}
        alt="Fastgenomics logo"
        className="absolute top-0 left-0 right-0 bottom-0 h-auto w-full object-cover -z-10"
      />
      <div className="flex flex-col items-center">
        <Image
          src="/fastgenomics.png"
          width={500}
          height={500}
          alt="Fastgenomics logo"
          className="mb-4"
        />
        <Link
          href={"/order"}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Order Now
        </Link>
        {searchParams.ok && (
          <div className="absolute top-0 left-0 right-0 bottom-0 bg-white flex flex-col items-center justify-center">
            <p className="mt-4 text-green-500">
              Thank you for reaching out to us. We will contact you shortly.
            </p>
            <form
              action={async () => {
                "use server";
                redirect("/");
              }}
            >
              <button className="button">Back</button>
            </form>
          </div>
        )}
      </div>
    </main>
  );
};

export default Page;

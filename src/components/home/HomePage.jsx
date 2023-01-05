import Image from "next/image";
import Link from "next/link";

const HomePage = ({ data }) => {
  return (
    <main>
      {data?.map((ev) => (
        <Link href={`/events/${ev.id}`} key={ev.id}>
          <Image src={ev.image} alt="Event" width={300} height={300} />
          <h2>{ev.title}</h2>
          <p>{ev.description}</p>
        </Link>
      ))}
    </main>
  );
};

export default HomePage;

import Image from "next/image";
import Link from "next/link";
import React from "react";

const Events = ({ data }) => {
  return (
    <div>
      <h1>Events</h1>
      <div>
        {data.map((ev) => (
          <Link href={`/events/${ev.id}`} key={ev.id}>
            <Image src={ev.image} alt={ev.id} width={300} height={300} />
            <h2>{ev.title}</h2>
          </Link>
        ))}{" "}
      </div>
    </div>
  );
};

export default Events;

export async function getStaticProps() {
  const { events_categories } = await import("/data/data.json");
  return {
    props: {
      data: events_categories,
    },
  };
}

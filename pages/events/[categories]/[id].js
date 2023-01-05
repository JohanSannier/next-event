import Image from "next/image";
import { useRouter } from "next/router";
import { useRef, useState } from "react";

const Page = ({ data }) => {
  const inputEmail = useRef();
  const router = useRouter();
  const [message, setMessage] = useState();

  const onSubmit = async (e) => {
    e.preventDefault();
    const email = inputEmail.current.value;
    const eventId = router?.query.id;

    const validRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (!email.match(validRegex)) {
      setMessage("Please introduce a correct email address");
    }

    try {
      const response = await fetch("/api/email-registration", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email, eventId }),
      });

      if (!response.ok) throw new Error(`Error: ${response.status}`);
      const data = await response.json();
      setMessage(data.message);
      inputEmail.current.value = "";
    } catch (e) {
      console.log("ERROR", e);
    }
  };
  return (
    <div>
      <h1>{data.title}</h1>
      <Image src={data.image} width={400} height={300} alt={data.title} />
      <p>{data.description}</p>
      <form onSubmit={onSubmit}>
        <label>
          Get register for this event
          <input
            type="email"
            id="email"
            placeholder="Please input your email"
            ref={inputEmail}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Page;

export async function getStaticPaths() {
  const { allEvents } = await import("/data/data.json");
  const allPaths = allEvents.map((ev) => {
    return {
      params: {
        categories: ev.city,
        id: ev.id,
      },
    };
  });

  return {
    paths: allPaths,
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const { allEvents } = await import("/data/data.json");
  const id = context?.params.id;
  const data = allEvents.find((ev) => ev.id === id);

  return {
    props: { data },
  };
}

import Link from "next/link";

const Header = () => {
  return (
    <header>
      <nav>
        <Link href="/">Home</Link>
        <Link href="/events">Events</Link>
        <Link href="/about">About us</Link>
      </nav>
    </header>
  );
};

export default Header;

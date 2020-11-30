import Link from 'next/link';

export default function Header() {
  return (
    <div>
      <div className="headerStyles">
        <Link href="/">
          <a>
            <img
              className="logoStyles"
              src="/hobbyMarketPlaceLogo.svg"
              alt="Logo"
            />
          </a>
        </Link>
      </div>
    </div>
  );
}

import Link from 'next/link';

export default function Header() {
  return (
    <div className="headerFlexStyles">
      <div>
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
      {/* <div className="headerStyles">Hobby Marketplace</div> */}
    </div>
  );
}

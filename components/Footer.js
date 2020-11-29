import Link from 'next/link';

export default function Footer() {
  return (
    <div className="footerStyles">
      <Link href="/newsfeed">
        <a>
          <img
            className="iconStyles"
            src="/search-icon.svg"
            alt="search icon"
          />
        </a>
      </Link>

      <Link href="/inbox">
        <a>
          <img
            className="iconStyles"
            src="/messages-icon.png"
            alt="messages icon"
          />
        </a>
      </Link>

      <Link href="/profile">
        <a>
          <img
            className="iconStyles"
            src="/profile-icon.svg"
            alt="profile icon"
          />
        </a>
      </Link>
    </div>
  );
}

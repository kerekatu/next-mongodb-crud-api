import Link from 'next/Link'

const Header = () => {
  return (
    <>
      <header>
        <ul>
          <li>
            <Link href="/">
              <a>JokesOnDemand</a>
            </Link>
          </li>
        </ul>
      </header>

      <style jsx>{`
        header {
          display: flex;
          width: 100%;
          justify-content: flex-end;
          align-items: center;
          height: 10rem;
          padding: 0 6rem;
        }

        ul {
          list-style: none;
          display: flex;
          gap: 3rem;
        }

        a {
          text-decoration: none;
          color: #27ae60;
          font-weight: 700;
          letter-spacing: 0.04rem;
        }

        a:hover {
          color: #2ecc71;
        }
      `}</style>
    </>
  )
}

export default Header

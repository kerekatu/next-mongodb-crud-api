import Header from '@/layouts/Header'
import PropTypes from 'prop-types'

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <main className="container">{children}</main>

      <style jsx>{`
        .container {
          margin: 4rem auto;
          width: 60rem;
        }
      `}</style>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node
}

export default Layout

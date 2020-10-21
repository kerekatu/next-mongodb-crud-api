import { useState } from 'react'
import Link from 'next/Link'
import PropTypes from 'prop-types'

const Card = ({ title, description, spoiler, buttonOpen, id }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="joke">
      <h2>{title}</h2>
      <p
        className={spoiler ? 'joke-description--active' : 'joke-description'}
        onClick={() => spoiler && setIsOpen(!isOpen)}
      >
        {(isOpen && description) ||
          (spoiler && !isOpen && 'Click to show...') ||
          (!spoiler && !isOpen && description)}
      </p>
      <div className="joke-bottom">
        {buttonOpen && (
          <Link href={`/${id}`}>
            <a className="button--secondary">Open</a>
          </Link>
        )}
      </div>
    </div>
  )
}

Card.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  spoiler: PropTypes.bool,
  id: PropTypes.string,
  buttonOpen: PropTypes.bool
}

export default Card

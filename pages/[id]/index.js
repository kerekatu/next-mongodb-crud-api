import Card from '@/components/Card'
import PropTypes from 'prop-types'
import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'

const Joke = ({ jokeData }) => {
  const { title, description, spoiler } = jokeData

  const router = useRouter()
  const { handleSubmit, register, errors } = useForm()
  const [formData, setFormData] = useState({
    title,
    description,
    spoiler: spoiler || false
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isDeleted, setIsDeleted] = useState(false)

  useEffect(() => {
    const timer =
      isSubmitted &&
      setTimeout(() => {
        setIsSubmitted(false)
        router.push('/')
      }, 3000)

    return () => clearTimeout(timer)
  }, [isSubmitted])

  const editJoke = async () => {
    const jokeId = router.query.id

    try {
      return await fetch(`http://localhost:3000/api/jokes/${jokeId}`, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
    } catch (error) {
      console.log(error)
    }
  }

  const deleteJoke = async () => {
    const jokeId = router.query.id

    try {
      return await fetch(`http://localhost:3000/api/jokes/${jokeId}`, {
        method: 'DELETE'
      })
    } catch (error) {
      console.log(error)
    }
  }

  const handleFormSubmit = () => {
    if (!isDeleted) {
      setIsSubmitted(true)
      editJoke()
    } else {
      deleteJoke()
      router.push('/')
    }
  }

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
      spoiler: e.target.checked
    })
  }

  return (
    <div className="jokes">
      <Card title={title} spoiler={spoiler} description={description} />

      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <h1>Edit Joke</h1>
        <div className="form-container">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            placeholder="Title"
            value={formData.title}
            ref={register({
              required: true,
              minLength: 3,
              maxLength: 40
            })}
            onChange={handleInputChange}
          />
          {errors.title && (
            <p className="error">Title is required (min: 3, max: 40)</p>
          )}
        </div>

        <div className="form-container">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            name="description"
            id="description"
            placeholder="Description"
            value={formData.description}
            ref={register({
              required: true,
              minLength: 4,
              maxLength: 200
            })}
            onChange={handleInputChange}
          />

          {errors.description && (
            <p className="error">Description is required (min: 4, max: 200)</p>
          )}
        </div>
        <div className="form-container--alt">
          <label htmlFor="spoiler">Add Spoiler?</label>
          <input
            type="checkbox"
            name="spoiler"
            id="spoiler"
            checked={formData.spoiler}
            ref={register({
              required: false
            })}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit" className="button--primary">
          Submit
        </button>
        <button
          className="button--primary red"
          onClick={() => setIsDeleted(true)}
        >
          Delete
        </button>
        {isSubmitted && <p>Joke edited</p>}
      </form>
    </div>
  )
}

export const getStaticPaths = async () => {
  const response = await fetch(`http://localhost:3000/api/jokes`)
  const results = await response.json()

  const paths = results.data.map((result) => ({
    params: {
      id: result._id
    }
  }))

  return {
    paths,
    fallback: true
  }
}

export const getStaticProps = async ({ params }) => {
  const response = await fetch(`http://localhost:3000/api/jokes/${params.id}`)
  const jokeData = await response.json()

  return {
    props: {
      jokeData: jokeData.data
    }
  }
}

Joke.propTypes = {
  jokeData: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired
}

export default Joke

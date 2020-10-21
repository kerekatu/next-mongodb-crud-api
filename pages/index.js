import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useForm } from 'react-hook-form'
import Card from '@/components/Card'

const Home = ({ jokesData }) => {
  const { handleSubmit, register, errors } = useForm()
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    spoiler: false
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  useEffect(() => {
    const timer =
      isSubmitted &&
      setTimeout(() => {
        setIsSubmitted(false)
        console.log('dupa')
      }, 6000)

    return () => clearTimeout(timer)
  }, [isSubmitted])

  const createJoke = async () => {
    try {
      return await fetch('http://localhost:3000/api/jokes', {
        method: 'POST',
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

  const handleFormSubmit = () => {
    if (isSubmitted) return

    createJoke()
    setIsSubmitted(true)
    setFormData({
      title: '',
      description: '',
      spoiler: false
    })
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
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <h1>Add Joke</h1>
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
        {isSubmitted && <p>Thank you for submitting a joke</p>}
      </form>
      {jokesData.map((joke) => {
        const { title, description, spoiler, _id } = joke

        return (
          <Card
            title={title}
            description={description}
            id={_id}
            spoiler={spoiler}
            buttonOpen
            key={_id}
          />
        )
      })}
    </div>
  )
}

export const getStaticProps = async () => {
  const response = await fetch('http://localhost:3000/api/jokes')
  const jokesData = await response.json()

  return {
    props: {
      jokesData: jokesData.data
    }
  }
}

Home.propTypes = {
  jokesData: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired
}

export default Home

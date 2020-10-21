import Card from '@/components/Card'
import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import useSWR from 'swr'

const Joke = () => {
  const router = useRouter()
  const { data: jokeData, error } = useSWR(`/api/jokes/${router.query.id}`)
  const { handleSubmit, register, errors } = useForm()
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    spoiler: false
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isDeleted, setIsDeleted] = useState(false)

  useEffect(() => {
    if (jokeData) {
      setFormData({
        title: jokeData.data.title,
        description: jokeData.data.description,
        spoiler: jokeData.data.spoiler || false
      })
    }
  }, [jokeData])

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

  if (!jokeData) {
    return <div>Loading...</div>
  } else if (error) {
    return <div>Something went wrong</div>
  }

  return (
    <div className="jokes">
      <Card
        title={jokeData.data.title}
        spoiler={jokeData.data.spoiler}
        description={jokeData.data.description}
      />

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

export default Joke

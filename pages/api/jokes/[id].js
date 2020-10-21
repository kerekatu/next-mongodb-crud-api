import { databaseConnect } from '@/lib/database-connect'
import Joke from '@/models/Joke'

databaseConnect()

export default async (req, res) => {
  const {
    query: { id },
    method
  } = req

  switch (method) {
    case 'GET':
      try {
        const joke = await Joke.findById(id)

        if (!joke) {
          return res.status(400).json({ success: false })
        }

        res.status(200).json({ success: true, data: joke })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    case 'PUT':
      try {
        const joke = await Joke.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true
        })

        if (!joke) {
          return res.status(400).json({ success: false })
        }

        res.status(200).json({ success: true, data: joke })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    case 'DELETE':
      try {
        const deletedJoke = await Joke.deleteOne({ _id: id })

        if (!deletedJoke) {
          return res.status(400).json({ success: false })
        }

        res.status(200).json({ success: true, data: {} })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    default:
      res.status(400).json({ success: false })
      break
  }
}

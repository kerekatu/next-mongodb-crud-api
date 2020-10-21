import { databaseConnect } from '@/lib/database-connect'
import Joke from '@/models/Joke'

databaseConnect()

export default async (req, res) => {
  const { method } = req

  switch (method) {
    case 'GET':
      try {
        const jokes = await Joke.find({})
        res.status(200).json({ success: true, data: jokes })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    case 'POST':
      try {
        const joke = await Joke.create(req.body)
        res.status(201).json({ success: true, data: joke })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    default:
      res.status(400).json({ success: false })
      break
  }
}

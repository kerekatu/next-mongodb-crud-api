import mongoose from 'mongoose'

const { MONGODB_URI, MONGODB_DB } = process.env

if (!MONGODB_DB || !MONGODB_URI) {
  throw new Error('Define MongoDB enviornment variables!')
}

const connection = {}

export const databaseConnect = async () => {
  if (connection.isConnected) return

  const databaseConnection = await mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })

  connection.isConnected = databaseConnection.connections[0].readyState
}

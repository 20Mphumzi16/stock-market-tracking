import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import authRoutes from './routes/authRoutes.js'

// Load environment variables
dotenv.config()

const app = express()

// Middleware
app.use(cors())
app.use(express.json())

// Routes
app.use('/api/auth', authRoutes)

// Health check route
app.get('/api/health', (req, res) => {
    res.json({ message: 'Server is running' })
})

// Connect to MongoDB
const MONGODB_URI = process.env.MONGODB_URI
const PORT = process.env.PORT

if (!MONGODB_URI) {
    console.error('Error: MONGODB_URI is not defined in environment variables')
    process.exit(1)
}

if (!PORT) {
    console.error('Error: PORT is not defined in environment variables')
    process.exit(1)
}

mongoose.connect(MONGODB_URI)
    .then(() => {
        console.log('Connected to MongoDB')
        
        // Start server
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`)
        })
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error.message)
        process.exit(1)
    })

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).json({ 
        message: 'Something went wrong!',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
    })
})


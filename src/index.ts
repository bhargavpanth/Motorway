import express from 'express'
import bodyParser from 'body-parser'
import api from './routes'

const port = process.env.PORT || 8080

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

app.use('/api', api)

app.listen(port, () => {
	// @ts-ignore
	console.log(`App listening to port: ${port}`)
})

export default app

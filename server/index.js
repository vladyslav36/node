const express = require('express')
require('dotenv').config()
const cors=require('cors')
const { graphqlHTTP } = require('express-graphql')

const schema=require('./schema/schema')

const port=process.env.PORT||5000
const app = express()

app.use(cors())
 
app.use('/graphql', graphqlHTTP({
  schema,
  graphiql:process.env.NODE_MODE==='development'
}))

app.listen(port,console.log(`Server running on port ${port} in ${process.env.NODE_MODE} mode`))
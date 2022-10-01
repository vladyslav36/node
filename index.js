const express = require('express')
require('dotenv').config()
const cors=require('cors')


const port=process.env.PORT||5000
const app = express()

app.use(cors())
 

app.use('/',(req,res)=>res.json({msg:'hello'}))

app.listen(port,console.log(`Server running on port ${port} in ${process.env.NODE_MODE} mode`))
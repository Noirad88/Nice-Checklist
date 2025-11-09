import express from 'express'
import path from 'path'

const app = express()
const PORT = 3000
const __dirname = path.resolve()

let items = [
    {
        name: 'chips',
        price: '3.99'
    },
    {
        name: 'eggs',
        price: '2.99'
    },
    {
        name: 'bread',
        price: '13.99'
    },
    
]

app.use(express.static(__dirname))

app.get('/item/:id',(req,res,next)=>{
    res.send(items)
})

app.listen(PORT,()=>{
    console.log(`listening on ${PORT}`)
})
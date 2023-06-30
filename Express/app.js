const express = require('express')      // import express package
const morgan = require('morgan')
require('dotenv').config()
const bodyParser = require('body-parser')
const cors = require('cors')
const uuid = require('uuid')
const db = require('./db')

// create express app
const app = express()

const PORT = process.env.PORT || 3000

//  // middlewares
app.use(morgan('dev'))
app.use(bodyParser.json())

app.use((req, res, next) => {
    console.log('Entered')

    next()
})

app.use(cors({
    origin: ["http://127.0.0.1:5500"],
    credentials: true
}))



app.post('/addproperty', async (req, res) => {
    const { username, address, price } = req.body

    try {

        if (!username) throw Error('Insert room name')
        if (!address) throw Error('Insert room address')
        if (!price) throw Error('Insert room price')

        const id = uuid.v4()        // generate id

        //  create sql statement
        let sql = `INSERT INTO roomdata(
            id, username, address, price
            ) VALUES(
                '${id}', '${username}', '${address}', '${price}'
                )`


        await db.execute(sql)   // execute sql statement

        res.status(200).json({ message: 'Property Added Successfully' })
    } catch (error) {
        res.status(400).json({ erorr: error.message })
    }
})

app.get('/getAllproperty', async (req, res) => {
    try {
        let sql = 'SELECT * FROM roomdata'

        const [items] = await db.execute(sql)   // execute sql statement

        res.status(200).json({ items })
    } catch (error) {
        res.status(400).json({ erorr: error.message })
    }
})

app.get('/getAllproperty/:id', async (req, res) => {

    const { id } = req.params

    try {
        let sql = `SELECT * FROM roomdata WHERE id = '${id}'`

        const [item] = await db.execute(sql)   // execute sql statement

        res.status(200).json({ item })
    } catch (error) {
        res.status(400).json({ erorr: error.message })
    }
})

app.delete('/deleteproperty/:id', async (req, res) => {
    const { id } = req.params

    try {

        let exitsSql = `SELECT * FROM roomdata WHERE id = '${id}'`

        const [item] = await db.execute(exitsSql)

        if (!item[0]) throw Error('Property does not exist')

        let updateSql = `DELETE FROM roomdata WHERE id='${id}'`

        await db.execute(updateSql)

        res.status(200).json({ message: 'Property Deleted Successfully' })

    } catch (error) {
        res.status(400).json({ erorr: error.message })
    }
})


app.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`)
})
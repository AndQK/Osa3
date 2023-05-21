require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

app.use(cors())
app.use(express.json())

morgan.token('body', (req, res) => {
    if (req.method === 'POST') {
        return JSON.stringify(req.body || {})
    }
    return " "
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

app.use(express.static('build'))



app.get('/api/persons', (req, res) => {
    Person.find({}).then(persons => {
        res.json(persons)
    })
})

app.get('/info', (req, res) => {
    Person.find({}).then(persons => {
        res.send(

            `<div>
                <p><b>Phonebook has info for ${persons.length} people</b></p>
                <p><b>${Date()}</b></p>
            </div>`
        )
    })

})

app.get('/api/persons/:id', (req, res) => {
    Person.findById(req.params.id).then(person => {
        res.json(person)
    })
        .catch(error => {
            console.log(error)
            res.status(500).end()
        })
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    res.status(204).end()
})

app.post('/api/persons', (req, res) => {
    const body = req.body
    if (!body.name || !body.number) {
        return res.status(400).json({
            error: 'name or number missing'
        })
    }
    const person = new Person({
        name: body.name,
        number: body.number
    })
    person.save().then(savedPerson => {
        res.json(savedPerson)
    })
})

const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
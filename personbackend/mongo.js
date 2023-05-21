const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('give password as argument')
    process.exit(1)
}

const password = process.argv[2]

const url =
    `mongodb+srv://antonioskondras:${password}@cluster0.czq10v7.mongodb.net/personApp?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(url)


const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Person = mongoose.model("Person", personSchema)

const printPerson = (person) => {
    console.log(person.name, person.number)
}

if (process.argv.length === 5) {
    const person = new Person({
        name: process.argv[3],
        number: process.argv[4],
    })

    person.save().then(result => {
        console.log('added', person.name, 'number', person.number, 'to phonebook')
        mongoose.connection.close()
    })
} else if (process.argv.length === 3) {
    Person.find({})

        .then(result => {
            console.log('phonebook:')
            result.forEach(person => {
                printPerson(person)
            })
            mongoose.connection.close()
        })
} else {
    console.log('you gave incorrect amount of arguments')
    process.exit(1)
}
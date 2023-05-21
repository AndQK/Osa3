import { useEffect, useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'
import Notification from './components/Notification'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterValue, setFilterValue] = useState('')
  const [message, setMessage] = useState([null, false])


  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    //console.log('button clicked', event.target)
    const personObj = {
      name: newName,
      number: newNumber
    }
    // check if user tries to add person who is already in the list.
    const checkPerson = persons.find(person => person.name === newName)

    if (checkPerson !== undefined) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        personService
          .update(checkPerson.id, personObj)
          .then(response => {
            setPersons(persons.map(person => person.id !== checkPerson.id ? person : response.data))
            setNewName('')
            setNewNumber('')
            setMessage([`Changed ${response.data.name} number`, true])
            setTimeout(() => {
              setMessage([null, false])
            }, 5000)
          })
          .catch(error => {
            setMessage([`Information of ${checkPerson.name} has already been removed from server`, false])
            setTimeout(() => {
              setMessage([null, false])
            }, 5000)
            setPersons(persons.filter(person => person.id !== checkPerson.id))
          })
      }
    } else {
      personService
        .create(personObj)
        .then(response => {
          setPersons(persons.concat(response.data))
          setNewName('')
          setNewNumber('')
          setMessage([`Added ${response.data.name}`, true])
          setTimeout(() => {
            setMessage([null, false])
          }, 5000)
        })
        .catch(error => {
          //console.log(error)
          setMessage([`${error.response.data.error}`, false])
          setTimeout(() => {
            setMessage([null, false])
          }, 5000)
        })

    }

  }
  const removePerson = (name, id) => {
    if (window.confirm(`Delete ${name} ?`)) {
      personService
        .remove(id)
        .then(response => {
          //console.log(response)
          setPersons(
            persons
              .filter(person => person.id !== id))

          setMessage([`Deleted ${name}`, true])
          setTimeout(() => {
            setMessage([null, false])
          }, 5000)
        })
    }
  }
  const handlePersonChange = (event) => {
    //console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    //console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    //console.log(event.target.value)
    setFilterValue(event.target.value)
  }

  const getFilteredData = () => {
    if (filterValue === '') {
      return persons
    } else {
      return persons.filter(elem => {
        const substring = elem.name.substring(0, filterValue.length).toLowerCase()
        return substring === filterValue.toLowerCase()
      })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />

      <Filter filterVal={filterValue} handler={handleFilterChange} />

      <h3>add a new</h3>

      <PersonForm
        add={addPerson}
        name={newName}
        number={newNumber}
        personHandler={handlePersonChange}
        numberHandler={handleNumberChange}
      />

      <h3>Numbers</h3>

      <Persons persons={getFilteredData()} remove={removePerson} />
    </div>
  )
}
export default App;
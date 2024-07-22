import { useEffect, useState } from "react"
import axios from "axios"

const Filter = ({ filter, handler }) => {
  return (
    <div>
      Filter by name:
      <input
        value={filter}
        onChange={handler}
      />
    </div>
  )
}

const PersonForm = (props) => {
  const {
    submitNewName,
    newName,
    handleNameInput,
    newNumber,
    handleNumberInput
  } = props

  return (
    <form onSubmit={submitNewName}>
      <div>
        name: <input
          value={newName}
          onChange={handleNameInput}
        />
      </div>
      <div>
        number: <input
          value={newNumber}
          onChange={handleNumberInput}
        />
      </div>
      <button type="submit">Add</button>
    </form>
  )
}

const Person = (props) => {
  const name = props.name
  const number = props.number
  return (
    <p>{name} {number}</p>
  )
}

const Persons = ({ persons }) => {
  return (
    <div>
      {
        persons.map(person => {
          return (
            <Person
              key={person.name}
              name={person.name}
              number={person.number}
            />
          )
        })
      }
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    {
      name: "",
      number: ""
    }
  ])
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [filter, setFilter] = useState("")

  const handleFilterinput = (event) => {
    const newFilter = event.target.value.toLowerCase()
    setFilter(newFilter)
  }

  const handleNameInput = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberInput = (event) => {
    setNewNumber(event.target.value)
  }

  const submitNewName = (event) => {
    event.preventDefault()

    if (persons.map(person => person.name).includes(newName)) {
      alert(`${newName} is already added to the phonebook`)
      return "Name already in phonebook"
    }

    const newPersonObject = {
      name: newName,
      number: newNumber
    }

    setPersons(persons.concat(newPersonObject))
    setNewName("")
    setNewNumber("")
  }

  useEffect(() => {
    axios
    .get("http://localhost:3001/persons")
    .then(response => {
      setPersons(response.data)
    })
  }, [])

  const filteredPersons = persons.filter(person => {
    if (person.name.toLowerCase().includes(filter))
      return person
  })

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter filter={filter} handler={handleFilterinput} />
      <h2>Add a new entry</h2>
      <PersonForm
        submitNewName={submitNewName}
        newName={newName}
        handleNameInput={handleNameInput}
        newNumber={newNumber}
        handleNumberInput={handleNumberInput}
      />
      <h2>Numbers</h2>
      <Persons persons={filteredPersons} />
    </div>
  )
}

export default App

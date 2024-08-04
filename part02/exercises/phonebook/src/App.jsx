import { useEffect, useState } from "react"
import numberService from "./services/numbers.js"

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
  const handler = props.deleteHandler
  return (
    <p>{name} {number}
      <span>  </span>
      <button onClick={handler}>Delete</button>
    </p>
  )
}

const Persons = ({ persons, deleteHandler }) => {
  return (
    <div>
      {
        persons.map(person => {
          return (
            <Person
              key={person.name}
              name={person.name}
              number={person.number}
              deleteHandler={() => deleteHandler(person.id)}
            />
          )
        })
      }
    </div>
  )
}

const Notification = ({message, mode}) => {
  if (message === null)
    return null

  const notifStyle = {
    fontSize: 20,
    backgroundColor: "lightgrey",
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    margin: 5
  }

  notifStyle.color = mode === "error" ? "red" : "green"

  return (
    <div style={notifStyle}>
      {message}
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
  const [message, setMessage] = useState(null)
  const [notifMode, setNotifMode] = useState("notif")

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

  const updateName = () => {
    const person = persons.find(n => n.name.toLowerCase() === newName.toLowerCase())
    const newPerson = {...person, number: newNumber}
    numberService
    .update(newPerson)
    .then(updatedPerson => {
      setPersons(persons.map(n =>
        n.id === updatedPerson.id
        ? updatedPerson
        : n
      ))
      setNewName("")
      setNewNumber("")
      setNotifMode("notif")
      setMessage(`Updated ${updatedPerson.name}`)
      setTimeout(() => setMessage(null), 5000)
    })
    .catch(() => {
      setNewName("")
      setNewNumber("")
      setNotifMode("error")
      setMessage(
        `Information of ${newName} has already been removed from the server`
      )
      setTimeout(() => setMessage(null), 5000)
    })
    return
  }

  const submitNewName = (event) => {
    event.preventDefault()

    if (
      persons.map(person => person.name.toLowerCase())
      .includes(newName.toLowerCase())
    ) {
      if (
        !confirm(
          `${newName} is already added to phonebook, replace old number with a new one?`
        )
      ) {
        console.log("name already in phonebook")
        return
      } else {
        updateName()
        return
      }
    }

    const newPersonObject = {
      name: newName,
      number: newNumber
    }

    numberService
    .create(newPersonObject)
    .then(returnedObject => {
      setPersons(persons.concat(returnedObject))
      setNotifMode("notif")
      setMessage(
        `Added ${returnedObject.name}`
      )
      setTimeout(() => setMessage(null), 5000);
      setNewName("")
      setNewNumber("")
    })

  }

  const deletePerson = (id) => {
    const person = persons.find(n => n.id === id);

    if (!confirm(`Delete ${person.name}?`))
      return;

    numberService
    .deleteNumber(id)
    .then(() => {
      const newPersons = persons.filter(n => n.id !== id)
      setPersons(newPersons)
    })
    .catch(error => console.error(error))
  }

  useEffect(() => {
    numberService
    .getAll()
    .then(numberData => {
      setPersons(numberData)
    })
  }, [])

  const filteredPersons = persons.filter(person => {
    if (person.name.toLowerCase().includes(filter))
      return person
  })

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={message} mode={notifMode}/>
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
      <Persons
        persons={filteredPersons}
        deleteHandler={deletePerson}
      />
    </div>
  )
}

export default App

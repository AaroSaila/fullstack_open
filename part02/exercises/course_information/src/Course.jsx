const Part = ({ partName, exercises }) => {
  return (
    <p>{partName} {exercises}</p>
  )
}

const Content = ({ parts }) => {
  const exercisesTotal = (
    parts.reduce(((accumulator, part) => accumulator + part.exercises), 0)
  )

  return (
    <div>
        {parts.map(part =>
          <Part key={part.id} partName={part.name} exercises={part.exercises} />
        )}
      <p>
        <b>Total of {exercisesTotal} exercises</b>
      </p>
    </div>
  )
}

const Header = ({ text }) => {
  return (
    <h2>{text}</h2>
  )
}

const Course = ({ course }) => {
  return (
    <div>
      <Header text={course.name} />
      <Content parts={course.parts} />
    </div>
  )
}

export default Course

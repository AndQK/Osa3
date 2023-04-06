const Persons = (props) => {
    return (
      <div>
          {props.persons.map(a =>
            <div key={a.id}>
              {a.name} {a.number}
              <button onClick={() => props.remove(a.name, a.id)}>delete</button>
            </div>
        )}
        
      </div>
    )
}
export default Persons
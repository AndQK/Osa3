const PersonForm = ({add, name, number, personHandler, numberHandler}) => {
    return (
      <form onSubmit={add}>
          <div>
            name: <input value={name} onChange={personHandler} />
          </div>
          <div>
            number: <input value={number} onChange={numberHandler} />
          </div>
          <div>
            <button type="submit">add</button>
          </div>
      </form>
   )
  
}
export default PersonForm
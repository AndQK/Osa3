

const Filter = ({filterVal, handler}) => {
    return <div>
      filter shown with <input value={filterVal} onChange={handler} />
    </div>
}
export default Filter
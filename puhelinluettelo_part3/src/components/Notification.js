const Notification = ({ message }) => {

    if (message[0] === null) {
      return null
    }
    // flag is false then message is a error message, success message otherwise
    if (message[1]) {
      return (
        <div className="success">
          {message}
        </div>
      )
    }
    return (
      <div className="error">
        {message}
      </div>
    )
}
export default Notification
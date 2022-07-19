import React from "react"

const ContactUsForm = () => {
  const [name, setName] = React.useState("")
  const [email, setEmail] = React.useState("")
  const [message, setMessage] = React.useState("")
  const [submitStatus, setSubmitStatus] = React.useState("")

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    try {
      const res = await fetch(process.env.CONTACT_US_SUBMIT_API_ENDPOINT ?? '/contact-us-submit', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name,
          email: email,
          message: message,
        }),
      })
      const resJson = await res.json()
      if (res.status === 201) {
        setName("")
        setEmail("")
        setMessage("")
        setSubmitStatus("Form submitted successfully")
      } else {
        setSubmitStatus("Some error occured")
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="contact-page-form">
      <form onSubmit={handleSubmit}>
        <div className="input-fields">
          <input
            type="text"
            value={name}
            placeholder="Name"
            onChange={e => setName(e.target.value)}
          />
        </div>
        <div className="input-fields">
          <input
            type="text"
            value={email}
            placeholder="Email"
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        <div className="text-field">
          <input
            type="text"
            value={message}
            placeholder="Message"
            onChange={e => setMessage(e.target.value)}
          />
        </div>
        <button type="submit" className="btn primary-btn">
          Send Message
        </button>
        <div className="mt-3">{submitStatus ? <p>{submitStatus}</p> : null}</div>
      </form>
    </div>
  )
}

export default ContactUsForm
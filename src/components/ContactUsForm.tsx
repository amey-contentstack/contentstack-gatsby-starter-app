import React from "react"

const ContactUsForm = () => {

  return (
    <div className="contact-page-form">
      <form>
        <div className="input-fields">
          <input
            type="text"
            placeholder="Name"
          />
        </div>
        <div className="input-fields">
          <input
            type="text"
            placeholder="Email"
          />
        </div>
        <div className="text-field">
          <input
            type="text"
            placeholder="Message"
          />
        </div>
        <button type="submit" className="btn primary-btn">
          Send Message
        </button>
      </form>
    </div>
  )
}

export default ContactUsForm

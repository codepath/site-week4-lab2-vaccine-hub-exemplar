import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import axios from "axios"
import MedicalResearch from "../MedicalResearch/MedicalResearch"
import "./Register.css"

const locationOptions = [
  { key: 1, label: "Local Clinic", value: "local clinic" },
  { key: 2, label: "Regional Hospital", value: "regional hospital" },
  { key: 3, label: "Care Center", value: "care center" },
  { key: 4, label: "Department of Health", value: "department of health" },
]

export default function Signup({ setAppState }) {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    date: "",
    password: "",
    passwordConfirm: "",
    location: "Local Clinic",
    agreeToTerms: false,
  })

  const handleOnInputChange = (event) => {
    if (event.target.name === "password") {
      if (form.passwordConfirm && form.passwordConfirm !== event.target.value) {
        setErrors((e) => ({ ...e, passwordConfirm: "Password's do not match" }))
      } else {
        setErrors((e) => ({ ...e, passwordConfirm: null }))
      }
    }
    if (event.target.name === "passwordConfirm") {
      if (form.password && form.password !== event.target.value) {
        setErrors((e) => ({ ...e, passwordConfirm: "Password's do not match" }))
      } else {
        setErrors((e) => ({ ...e, passwordConfirm: null }))
      }
    }
    if (event.target.name === "email") {
      if (event.target.value.indexOf("@") === -1) {
        setErrors((e) => ({ ...e, email: "Please enter a valid email." }))
      } else {
        setErrors((e) => ({ ...e, email: null }))
      }
    }

    setForm((f) => ({ ...f, [event.target.name]: event.target.value }))
  }

  const handleOnSubmit = async () => {
    setIsLoading(true)
    setErrors((e) => ({ ...e, form: null }))

    if (form.passwordConfirm !== form.password) {
      setErrors((e) => ({ ...e, passwordConfirm: "Passwords do not match." }))
      setIsLoading(false)
      return
    } else {
      setErrors((e) => ({ ...e, passwordConfirm: null }))
    }

    try {
      const res = await axios.post("http://localhost:3001/auth/register", {
        date: form.date,
        location: form.location,
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        password: form.password,
      })

      if (res?.data?.user) {
        setAppState(res.data)
        setIsLoading(false)
        navigate("/portal")
      } else {
        setErrors((e) => ({ ...e, form: "Something went wrong with registration" }))
        setIsLoading(false)
      }
    } catch (err) {
      console.log(err)
      const message = err?.response?.data?.error?.message
      setErrors((e) => ({ ...e, form: message ? String(message) : String(err) }))
      setIsLoading(false)
    }
  }

  return (
    <div className="Register">
      <div className="media">
        <MedicalResearch width={555} />
      </div>
      <div className="card">
        <h2>Register For a Vaccine</h2>

        {errors.form && <span className="error">{errors.form}</span>}
        <br />

        <div className="form">
          <div className="split-inputs">
            <div className="input-field">
              <label htmlFor="name">Select a date</label>
              <input type="date" name="date" value={form.date} onChange={handleOnInputChange} />
              {errors.date && <span className="error">{errors.date}</span>}
            </div>

            <div className="input-field">
              <label htmlFor="name">Select a location</label>
              <select name="location" onChange={(event) => setForm((f) => ({ ...f, location: event.target.value }))}>
                {locationOptions.map((location) => (
                  <option key={location.key} value={location.label}>
                    {location.label}
                  </option>
                ))}
              </select>
              {errors.location && <span className="error">{errors.location}</span>}
            </div>
          </div>

          <br />

          <div className="split-inputs">
            <div className="input-field">
              <label htmlFor="name">First Name</label>
              <input
                type="text"
                name="firstName"
                placeholder="Jane"
                value={form.firstName}
                onChange={handleOnInputChange}
              />
              {errors.firstName && <span className="error">{errors.firstName}</span>}
            </div>
            <div className="input-field">
              <label htmlFor="name">Last Name</label>
              <input
                type="text"
                name="lastName"
                placeholder="Doe"
                value={form.lastName}
                onChange={handleOnInputChange}
              />
              {errors.lastName && <span className="error">{errors.lastName}</span>}
            </div>
          </div>

          <div className="input-field">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              placeholder="jane@doe.io"
              value={form.email}
              onChange={handleOnInputChange}
            />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>

          <div className="input-field">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              placeholder="password"
              value={form.password}
              onChange={handleOnInputChange}
            />
            {errors.password && <span className="error">{errors.password}</span>}
          </div>

          <div className="input-field">
            <label htmlFor="passwordConfirm">Confirm Password</label>
            <input
              type="password"
              name="passwordConfirm"
              placeholder="confirm password"
              value={form.passwordConfirm}
              onChange={handleOnInputChange}
            />
            {errors.passwordConfirm && <span className="error">{errors.passwordConfirm}</span>}
          </div>

          <button className="btn" disabled={isLoading} onClick={handleOnSubmit}>
            {isLoading ? "Loading..." : "Create Account"}
          </button>
        </div>

        <div className="footer">
          <p>
            Already have an account? Login <Link to="/login">here</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

// import React from "react"
// import apiClient from "../../services/apiClient"
// import { useNavigate } from "react-router-dom"
// import { Box, Button, FieldStack, FieldWrapper, InputField, SelectMenu, Heading, Stack, Text } from "bumbag"

// import "./Register.css"

// function sleep(ms) {
//   return new Promise((resolve) => setTimeout(resolve, ms))
// }

// const Register = ({ setAppState }) => {
//   const navigate = useNavigate()
//   const [isLoading, setIsLoading] = React.useState(false)
//   const [form, setForm] = React.useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     date: "",
//     password: "",
//     passwordConfirm: "",
//     location: 1,
//     agreeToTerms: false,
//   })
//   const [errors, setErrors] = React.useState({})

//   const handleOnSubmit = async (e) => {
//     e.preventDefault()
//     setIsLoading(true)

//     await sleep(2000)

//     try {
//       const { data, error, message } = await apiClient.register({
//         firstName: form.firstName,
//         lastName: form.lastName,
//         email: form.email,
//         password: form.password,
//         date: form.date,
//         location: form.location?.label,
//       })
//       if (error) {
//         setErrors((e) => ({ ...e, form: message }))
//         setIsLoading(false)
//         return
//       }

//       if (data) {
//         setAppState(data)
//         navigate("/portal")
//       }
//     } catch (err) {
//       setErrors((e) => ({ ...e, form: err }))
//       setIsLoading(false)
//     }
//   }

//   const handleOnChange = (e) => {
// if (e.target.name === "password") {
//   if (form.passwordConfirm && form.passwordConfirm !== e.target.value) {
//     setErrors((e) => ({ ...e, passwordConfirm: "Password's do not match" }))
//   } else {
//     setErrors((e) => ({ ...e, passwordConfirm: null }))
//   }
// }
// if (e.target.name === "passwordConfirm") {
//   if (form.password && form.password !== e.target.value) {
//     setErrors((e) => ({ ...e, passwordConfirm: "Password's do not match" }))
//   } else {
//     setErrors((e) => ({ ...e, passwordConfirm: null }))
//   }
// }
// if (e.target.name === "email") {
//   if (e.target.value.indexOf("@") === -1) {
//     setErrors((e) => ({ ...e, email: "Please enter a valid email." }))
//   } else {
//     setErrors((e) => ({ ...e, email: null }))
//   }
// }
//     setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
//   }

//   return (
//     <>
//       <form onSubmit={handleOnSubmit} className="Register">
//         <Heading use="h1" className="title">
//           Register For a Vaccine
//         </Heading>

//         <br />

//         <Box>
//           <Heading use="h5">
//             <>{Boolean(errors.form) ? <Text color="danger">{String(errors.form)}</Text> : null}</>
//           </Heading>
//         </Box>

//         <br />

// <Stack spacing="major-1">
//   <FieldWrapper label="Choose a date" isRequired>
//     <InputField type="date" name="date" value={form.date} onChange={handleOnChange} />
//   </FieldWrapper>
// </Stack>

// <br />

// <SelectMenu
//   label="Select a location..."
//   isRequired
//   onChange={(location) => setForm((f) => ({ ...f, location }))}
//   options={[
//     { key: 1, label: "Local Clinic", value: "local clinic" },
//     { key: 2, label: "Regional Hospital", value: "regional hospital" },
//     { key: 3, label: "Care Center", value: "care center" },
//     { key: 4, label: "Department of Health", value: "department of health" },
//   ]}
//   value={form.location}
// />

//         <br />
//         <br />

//         <FieldStack>
//           <FieldStack orientation="horizontal">
//             <FieldWrapper label="First Name" isRequired>
//               <InputField name="firstName" value={form.firstName} onChange={handleOnChange} />
//             </FieldWrapper>
//             <FieldWrapper label="Last Name" isRequired>
//               <InputField name="lastName" value={form.lastName} onChange={handleOnChange} />
//             </FieldWrapper>
//           </FieldStack>
//           <FieldWrapper
//             label="Email"
//             isRequired
//             description={errors.email ? <Text color="danger">{errors.email}</Text> : undefined}
//           >
//             <InputField name="email" type="email" value={form.email} onChange={handleOnChange} />
//           </FieldWrapper>

//           <InputField
//             name="password"
//             label="Password"
//             type="password"
//             isRequired
//             value={form.password}
//             onChange={handleOnChange}
//           />
//           <FieldWrapper
//             label="Confirm Password"
//             isRequired
//             description={errors.passwordConfirm ? <Text color="danger">{errors.passwordConfirm}</Text> : undefined}
//           >
//             <InputField
//               name="passwordConfirm"
//               type="password"
//               state={errors.passwordConfirm ? "danger" : undefined}
//               value={form.passwordConfirm}
//               onChange={handleOnChange}
//             />
//           </FieldWrapper>
//           <Button isLoading={isLoading} palette="primary" type="submit">
//             Register
//           </Button>
//         </FieldStack>
//       </form>
//     </>
//   )
// }

// export default Register

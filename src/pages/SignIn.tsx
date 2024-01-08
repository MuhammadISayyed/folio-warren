import { useState } from 'react'
import { Form, Label, Input, Button, TextField } from 'react-aria-components'
import { signInWithEmail } from '../../lib/authActions'

const SignIn = () => {
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSignInClick = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(email)
    await signInWithEmail(email)
    setIsSubmitted(true)
    setEmail('')
  }
  return (
    <div>
      <Form onSubmit={handleSignInClick}>
        <TextField>
          <Label>Email</Label>
          <Input value={email} onChange={(e) => setEmail(e.target.value)} />
        </TextField>
        <Button type="submit">Sign In</Button>
      </Form>
      {isSubmitted && <p>Please check your email to sign in...</p>}
    </div>
  )
}

export default SignIn

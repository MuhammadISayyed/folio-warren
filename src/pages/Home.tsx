import { useLoaderData } from 'react-router-dom'
import Nav from '../components/HomeNav'

const Home = () => {
  const loader = useLoaderData()
  let email
  let id

  if (
    loader != null &&
    typeof loader === 'object' &&
    'email' in loader &&
    typeof loader.email === 'string' &&
    'id' in loader &&
    typeof loader.id === 'string'
  ) {
    email = loader.email
    id = loader.id
  }

  return (
    <div>
      <p>You're signed in as {email}</p>
      <p>Here should be a nav</p>
      <Nav userId={id} />
    </div>
  )
}

export default Home

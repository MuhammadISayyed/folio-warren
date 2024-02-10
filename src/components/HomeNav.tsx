import { Button } from 'react-aria-components'
import { Link, useNavigate } from 'react-router-dom'

type NavProps = {
  userId: string | undefined
}

const HomeNav = ({ userId }: NavProps) => {
  const navigate = useNavigate()
  const handleSignInPress = () => {
    if (userId != undefined) {
      return navigate('/goals')
    }
    return navigate('/sign-in')
  }
  return (
    <div>
      <Link to="/">Warren Goals</Link>
      <nav>
        <div>
          <Button onPress={handleSignInPress}>Sign in</Button>
          <Button>Check my CV</Button>
        </div>
      </nav>
    </div>
  )
}

export default HomeNav

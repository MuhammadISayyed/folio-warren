import Nav from '../components/HomeNav'

const Home = ({ userId }: { userId: string | undefined }) => {
  return (
    <div>
      <Nav userId={userId} />
    </div>
  )
}

export default Home

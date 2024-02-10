import { Outlet, useLoaderData } from 'react-router-dom'
// import HomeNav from '../components/HomeNav'

const Home = () => {
  const loader = useLoaderData()
  // let id

  if (
    loader != null &&
    typeof loader === 'object' &&
    'id' in loader &&
    typeof loader.id === 'string'
  ) {
    // id = loader.id
  }
  return (
    <>
      {/* <HomeNav userId={id} /> */}
      <Outlet />
    </>
  )
}

export default Home

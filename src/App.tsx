import SearchUser from './components/molecules/SearchUser'
import Navbar from './components/organisims/Navbar'
import UserList from './components/organisims/UserList'

function App() {

  return (
    <>
      <Navbar />
      <div className='p-4'>
        <SearchUser />
        <div>
          <UserList />
        </div>
      </div>
    </>
  )
}

export default App

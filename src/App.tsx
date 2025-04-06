import SearchUser from './components/molecules/SearchUser'
import Navbar from './components/organisims/Navbar'
// import UserList from './components/organisims/UserList'
import StaticUserList from './components/organisims/StaticUserList'

function App() {

  return (
    <>
      <Navbar />
      <div className='p-4'>
        <SearchUser />
        <div>
          {/* <UserList /> */}
          <StaticUserList />
        </div>
      </div>
    </>
  )
}

export default App

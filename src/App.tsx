import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import SelectRole from './screens/SelectRole'
import Host from './screens/Host'
import Member from './screens/Member'
import Room from './screens/Room'
import { ToastContainer } from 'react-toastify';

function App() {

  return (
    <>
      <Router>
        <ToastContainer />
        <Routes>
          <Route path="/" element={<SelectRole />} />
          <Route path="/host" element={<Host />} />
          <Route path="/member" element={<Member />} />
          <Route path="/room/:roomId" element={<Room />} />
        </Routes>
      </Router>
    </>
  )
}

export default App

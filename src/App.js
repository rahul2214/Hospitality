import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignUp from './Credentials/SingUp';
import "bootstrap/dist/css/bootstrap.min.css"
import Login from './Credentials/Login';
import Home from './home';
import Hotels from './components/Hotels';
import Bookings from './components/Bookings';
import BookRoom from './components/Bookroom';
import Reshedule from './components/Reshedule';
import AddReview from './components/AddReview';
import ViewReview from './components/ViewReview';



function App() {
  
  return (
    <div>
      <BrowserRouter>
      <Routes>
          <Route path="/" element={<SignUp />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/Hotels" element={<Hotels />} />

          <Route path="/bookings" element={<Bookings />} />
          <Route path="/bookroom/:hotelName/*" element={<BookRoom/>} />
          <Route path="/reshedule/:id/*" element={<Reshedule />} />
          <Route path="/addreview/:hotelName/*" element={<AddReview />} />
          <Route path="/viewreview/:hotelName/*" element={<ViewReview />} />





          




      </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;

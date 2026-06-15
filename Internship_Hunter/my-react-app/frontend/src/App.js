import './App.css';

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from './Header';
import Footer from './Footer';

import StudentSignUp from './StudentSignUp';
import StudentLogin from './StudentLogin';
import StudentProfile from './StudentProfile';
import AdminPanel from './AdminPanel';
import Internships from './Internships';
import InternshipDetails from './InternshipDetails';
import About from './About';

function App() {

  return (

    <BrowserRouter>

      <div className="App">

        <Header />

        <main className="main-content">

          <Routes>

              <Route path="/" element={<Internships />} />
            <Route path="/internship/:id" element={<InternshipDetails />} />
            <Route path="/signup" element={<StudentSignUp />} />
            <Route path="/login" element={<StudentLogin />} />
            <Route path="/profile" element={<StudentProfile />} />
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="/about" element={<About />} />

          </Routes>

        </main>

        <Footer />

      </div>

    </BrowserRouter>

  );
}

export default App;
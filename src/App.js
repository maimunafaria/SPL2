import { BrowserRouter, Routes, Route } from "react-router-dom";
import Welcome from './Welcome/Welcome';
import Teacher from './signup/Teacher';
import Director from './signup/Director';
import Student from './signup/Student';
import LogIn from './login/LogIn';
import AdminDashboard from './Dashboard/Admin/adminDashboard';
import AdminProfile from './Dashboard/Admin/adminProfile';
import DirectorDashboard from './Dashboard/Director/directorDashboard';
import TeacherDashboard from './Dashboard/Teacher/teacherDashboard';
import StudentDashboard from './Dashboard/Student/studentDashboard';
import AdminResetPassword from './Dashboard/Admin/adminResetPassword';
import AdminEditInfo from './Dashboard/Admin/adminEditInfo';
import DirectorResetPassword from './Dashboard/Director/directorResetPassword';
import DirectorEditInfo from './Dashboard/Director/directorEditInfo';
import DirectorProfile from './Dashboard/Director/directorProfile';
import TeacherResetPassword from './Dashboard/Teacher/teacherResetPassword';
import TeacherEditInfo from './Dashboard/Teacher/teacherEditInfo';
import TeacherProfile from './Dashboard/Teacher/teacherProfile';
import StudentResetPassword from './Dashboard/Student/studentResetPassword';
import StudentEditInfo from './Dashboard/Student/studentEditInfo';
import StudentProfile from './Dashboard/Student/studentProfile';
import ManageCourse from "./Dashboard/Admin/manageCourse";
import ManageUser from "./Dashboard/Admin/manageUser";
import App1 from "./scanner";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/director" element={<Director />} />
          <Route path="/student" element={<Student />} />
          <Route path="/teacher" element={<Teacher />} />
          <Route path="/adminDashboard/:email" element={<AdminDashboard />} />
          <Route path="/directorDashboard/:email" element={< DirectorDashboard />} />
          <Route path="/teacherDashboard/:email" element={< TeacherDashboard />} />
          <Route path="/studentDashboard/:email" element={< StudentDashboard />} />

          <Route path="/adminDashboard/:email/profile" element={<AdminProfile />} />
          <Route path="/adminDashboard/:email/adminResetPassword" element={<AdminResetPassword />} />
          <Route path="/adminDashboard/:email1/adminEditInfo" element={<AdminEditInfo />} />
          <Route path="/adminDashboard/:email1/manageUser" element={<ManageUser />} />
          <Route path="/adminDashboard/:email/manageCourse" element={<ManageCourse />} />


          <Route path="/directorDashboard/:email/profile" element={<DirectorProfile />} />
          <Route path="/directorDashboard/:email/directorResetPassword" element={<DirectorResetPassword />} />
          <Route path="/directorDashboard/:email1/directorEditInfo" element={<DirectorEditInfo />} />


          <Route path="/teacherDashboard/:email/profile" element={<TeacherProfile />} />
          <Route path="/teacherDashboard/:email/teacherResetPassword" element={<TeacherResetPassword />} />
          <Route path="/teacherDashboard/:email1/teacherEditInfo" element={<TeacherEditInfo />} />


          <Route path="/studentDashboard/:email/profile" element={<StudentProfile />} />
          <Route path="/studentDashboard/:email/studentResetPassword" element={<StudentResetPassword />} />
          <Route path="/studentDashboard/:email1/studentEditInfo" element={<StudentEditInfo />} />
          <Route path="/scanner" element={<App1/>}/>

        </Routes>

      </BrowserRouter>
    </div>
  );
}

export default App;
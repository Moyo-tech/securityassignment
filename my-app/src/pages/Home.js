import React from "react";
import StudentHome from "../features/Student/StudentHome";
import { useAuthContext } from "../hooks/useAuthContext";
import Facilitatorhome from "../features/Facilitator/Facilitatorhome";
import Teamleadhome from "../features/Teamlead/Teamleadhome";

const Home = () => {
  const { user } = useAuthContext();

  return (
    <div>
      {user && user.role === 'student' && <StudentHome />}
      {user && user.role === 'facilitator' && <Facilitatorhome />}
      {user && user.role === 'teamlead' && <Teamleadhome />}    </div>
  );
};

export default Home;

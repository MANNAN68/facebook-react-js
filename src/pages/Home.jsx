import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Home = () => {
  const { auth } = useAuth();
  console.log(auth);
  return (
    <>
      <Link to="/me">Profile page</Link>
    </>
  );
};

export default Home;

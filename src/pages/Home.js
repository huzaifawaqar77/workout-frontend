import { useEffect } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { useAuthContext } from "../hooks/useAuthContext";
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";
const Home = () => {
  const { workouts, dispatch } = useWorkoutsContext();
  const { user } = useAuthContext();
  console.log(user);
  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch(
        "https://workout-backend-nine.vercel.app/api/workouts",
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );
      const json = await response.json();
      if (response.ok) {
        dispatch({ type: "SET_WORKOUTS", payload: json });
      }
    };
    if (user) {
      console.log(user.token);
      fetchWorkouts();
    }
  }, [dispatch, user]);
  return (
    <div className="home">
      <div className="workouts">
        {workouts &&
          workouts.map((workout) => (
            <WorkoutDetails key={workout._id} workout={workout} />
          ))}
      </div>
      <WorkoutForm />
    </div>
  );
};

export default Home;

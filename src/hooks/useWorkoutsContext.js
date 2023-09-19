import { useContext } from "react";
import { WorkoutsContext } from "../contexts/WorkoutContext";

export const useWorkoutsContext = () => {
  const context = useContext(WorkoutsContext);

  if (!context) {
    throw Error("useWorkouts Context must be inside workoutsContextProvider ");
  }

  return context;
};

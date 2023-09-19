import { useAuthContext } from "./useAuthContext";
import { useWorkoutsContext } from "./useWorkoutsContext";
export const UseLogout = () => {
  const { dispatch } = useAuthContext();
  const { dispatch: workoutsDispatch } = useWorkoutsContext();

  const logout = () => {
    // remove from storage
    localStorage.removeItem("user");

    // dispatch a LOGOUT method
    dispatch({ type: "LOGOUT" });
    // clear the workouts
    workoutsDispatch({ type: "SET_WORKOUTS", payload: null });
  };
  return { logout };
};

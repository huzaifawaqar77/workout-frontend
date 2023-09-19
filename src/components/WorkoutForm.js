import { useState } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { useAuthContext } from "../hooks/useAuthContext";
const WorkoutForm = () => {
  const { dispatch } = useWorkoutsContext();
  const { user } = useAuthContext();

  const [title, setTitle] = useState("");
  const [load, setLoad] = useState("");
  const [reps, setReps] = useState("");
  const [error, setError] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const workout = { title, load, reps };

    if (!user) {
      setError("You must be logged in.");
      return;
    }
    const response = await fetch(
      "https://workout-backend-nine.vercel.app/api/workouts",
      {
        method: "POST",
        body: JSON.stringify(workout),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    const json = await response.json();
    if (!response.ok) {
      setError(json.error);
    }
    if (response.ok) {
      setError(null);
      setTitle("");
      setLoad("");
      setReps("");
      dispatch({ type: "CREATE_WORKOUT", payload: json });
      console.log("new workout added", json);
    }
  };
  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a new workout</h3>
      <label>Exercise Title:</label>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <label>Load:</label>
      <input
        type="number"
        value={load}
        onChange={(e) => setLoad(e.target.value)}
      />
      <label>Reps:</label>
      <input
        type="number"
        value={reps}
        onChange={(e) => setReps(e.target.value)}
      />
      <button>Add Workout</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default WorkoutForm;

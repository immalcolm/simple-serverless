export default function handler(req, res) {
  const {
    query: { params = [] },
    method,
  } = req;

  // If no params, return a simple message
  if (params.length === 0) {
    return res.status(200).json({ message: "All goals endpoint works!" });
  }

  // If one param, return it
  if (params.length === 1) {
    return res.status(200).json({ message: `Goal ID is ${params[0]}` });
  }

  // If more than one param, return them all
  return res.status(200).json({ message: `Params: ${params.join(", ")}` });
}
/*
let goals = [
  { id: 1, title: "Learn JavaScript", completed: false },
  { id: 2, title: "Build a web app", completed: false },
  { id: 3, title: "Master Node.js", completed: false },
];
let id = 4;

export default function handler(req, res) {
  const {
    method,
    query: { params },
    body,
  } = req;

  const goalId = params?.[0] ? parseInt(params[0], 10) : null;

  switch (method) {
    case "GET":
      if (goalId !== null) {
        const goal = goals.find((g) => g.id === goalId);
        return goal
          ? res.status(200).json(goal)
          : res.status(404).json({ error: "Goal not found" });
      }
      return res.status(200).json(goals);

    case "POST":
      if (!body || !body.title) {
        return res.status(400).json({ error: "Title is required" });
      }
      const newGoal = { id: id++, title: body.title, completed: false };
      goals.push(newGoal);
      return res.status(201).json(newGoal);

    case "PUT":
      if (goalId === null) return res.status(400).json({ error: "No ID provided" });
      const idx = goals.findIndex((g) => g.id === goalId);
      if (idx === -1) return res.status(404).json({ error: "Goal not found" });
      goals[idx] = { ...goals[idx], ...body };
      return res.status(200).json(goals[idx]);

    case "DELETE":
      if (goalId === null) return res.status(400).json({ error: "No ID provided" });
      const delIdx = goals.findIndex((g) => g.id === goalId);
      if (delIdx === -1) return res.status(404).json({ error: "Goal not found" });
      const deleted = goals.splice(delIdx, 1);
      return res.status(200).json(deleted[0]);

    default:
      return res.status(405).json({ error: `Method ${method} not allowed` });
  }
}
*/
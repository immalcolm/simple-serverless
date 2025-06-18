//reset on every request
let goals = [
  { id: 1, title: "Learn JavaScript", completed: false },
  { id: 2, title: "Build a web app", completed: false },
  { id: 3, title: "Master Node.js", completed: false },
];

export default function handler(req, res) {
  const {
    method,
    query: { id },
    body,
  } = req;

  const goalId = parseInt(id, 10);
  if (isNaN(goalId)) {
    return res.status(400).json({ error: "Invalid goal ID." });
  }

  const index = goals.findIndex((g) => g.id === goalId);
  if (index === -1) {
    return res.status(404).json({ error: "Goal not found." });
  }

  switch (method) {
    case "GET":
      return res.status(200).json(goals[index]);

    case "PUT":
      goals[index] = {
        ...goals[index],
        ...body,
        id: goalId, // preserve ID
      };
      return res.status(200).json(goals[index]);

    case "DELETE":
      const [deleted] = goals.splice(index, 1);
      return res.status(200).json(deleted);

    default:
      res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
      return res.status(405).json({ error: `Method ${method} not allowed.` });
  }
}

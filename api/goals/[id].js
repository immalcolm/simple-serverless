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
  const index = goals.findIndex((g) => g.id === goalId);

  if (isNaN(goalId)) {
    return res.status(400).json({ error: "Invalid ID" });
  }

  switch (method) {
    case "GET":
      if (index === -1) return res.status(404).json({ error: "Goal not found" });
      return res.status(200).json(goals[index]);

    case "PUT":
      if (index === -1) return res.status(404).json({ error: "Goal not found" });
      goals[index] = { ...goals[index], ...body };
      return res.status(200).json(goals[index]);

    case "DELETE":
      if (index === -1) return res.status(404).json({ error: "Goal not found" });
      const deleted = goals.splice(index, 1)[0];
      return res.status(200).json(deleted);

    default:
      res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
      return res.status(405).json({ error: `Method ${method} not allowed` });
  }
}

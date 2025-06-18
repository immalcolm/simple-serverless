// In-memory database
let goals = [
  { id: 1, title: "Learn JavaScript", completed: false },
  { id: 2, title: "Build a web app", completed: false },
  { id: 3, title: "Master Node.js", completed: false },
];
let id = 4;

export default function handler(req, res) {
  const { method, url } = req;

  // Log method and URL
  console.log(`${method} ${url}`);

  // Extract ID if available
  const urlParts = url.split("/");
  const goalId = parseInt(urlParts[urlParts.length - 1], 10);

  if (url.startsWith("/api/goals")) {
    switch (method) {
      case "GET":
        if (!isNaN(goalId) && urlParts.length > 4) {
          // GET /api/v1/goals/:id
          const goal = goals.find((g) => g.id === goalId);
          if (goal) {
            return res.status(200).json(goal);
          } else {
            return res.status(404).json({ error: "Goal not found" });
          }
        }
        // GET /api/v1/goals
        return res.status(200).json(goals);

      case "POST":
        const body = req.body;
        if (!body || !body.title) {
          return res.status(400).json({ error: "Goal title is required" });
        }
        const newGoal = { id: id++, ...body };
        if (newGoal.completed === undefined) newGoal.completed = false;
        goals.push(newGoal);
        return res.status(201).json(newGoal);

      case "PUT":
        const updateIndex = goals.findIndex((g) => g.id === goalId);
        if (updateIndex === -1) {
          return res.status(404).json({ error: "Goal not found" });
        }
        goals[updateIndex] = { ...goals[updateIndex], ...req.body };
        return res.status(200).json(goals[updateIndex]);

      case "DELETE":
        const deleteIndex = goals.findIndex((g) => g.id === goalId);
        if (deleteIndex === -1) {
          return res.status(404).json({ error: "Goal not found" });
        }
        const deleted = goals.splice(deleteIndex, 1);
        return res.status(200).json(deleted[0]);

      default:
        return res.status(405).json({ error: "Method not allowed" });
    }
  } else {
    res.status(404).json({ error: "Not Found" });
  }
}

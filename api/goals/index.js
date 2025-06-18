let goals = [
  { id: 1, title: "Learn JavaScript", completed: false },
  { id: 2, title: "Build a web app", completed: false },
  { id: 3, title: "Master Node.js", completed: false },
];
let nextId = 4;

export default function handler(req, res) {
  const { method, body } = req;

  switch (method) {
    case "GET":
      return res.status(200).json(goals);

    case "POST":
      if (!body || typeof body.title !== "string" || !body.title.trim()) {
        return res.status(400).json({ error: "Valid 'title' is required." });
      }
      const newGoal = {
        id: nextId++,
        title: body.title.trim(),
        completed: !!body.completed,
      };
      goals.push(newGoal);
      return res.status(201).json(newGoal);

    default:
      res.setHeader("Allow", ["GET", "POST"]);
      return res.status(405).json({ error: `Method ${method} not allowed.` });
  }
}

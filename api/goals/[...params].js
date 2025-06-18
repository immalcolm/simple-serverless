module.exports = (req, res) => {
  if (req.method === 'GET') {
    res.status(200).json(items);
  } else if (req.method === 'POST') {
    const item = JSON.parse(req.body);
    items.push(item);
    res.status(201).json(item);
  } else if (req.method === 'PUT') {
    const { index, newItem } = JSON.parse(req.body);
    items[index] = newItem;
    res.status(200).json({ updated: true });
  } else if (req.method === 'DELETE') {
    const { index } = JSON.parse(req.body);
    items.splice(index, 1);
    res.status(200).json({ deleted: true });
  }
};

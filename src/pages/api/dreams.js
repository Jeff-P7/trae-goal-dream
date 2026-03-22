import { initializeDB } from '../../db/db';

export default async function handler(req, res) {
  const db = await initializeDB();

  if (req.method === 'POST') {
    const { title, description, targetDate, category } = req.body;
    const result = await db.run(
      'INSERT INTO dreams (title, description, target_date, category) VALUES (?, ?, ?, ?)',
      title,
      description,
      targetDate,
      category
    );
    res.status(201).json({ id: result.lastID, title, description, targetDate, category });
  } else if (req.method === 'GET') {
    const dreams = await db.all('SELECT * FROM dreams');
    res.status(200).json(dreams);
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

import type { NextApiRequest, NextApiResponse } from 'next';

const salesData = [
  { year: 2022, sales: 120000 },
  { year: 2023, sales: 175000 },
  { year: 2024, sales: 210000 },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json(salesData);
} 
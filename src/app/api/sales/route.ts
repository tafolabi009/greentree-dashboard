import { NextResponse } from 'next/server';

const salesData = [
  { year: 2020, sales: 85000 },
  { year: 2021, sales: 95000 },
  { year: 2022, sales: 120000 },
  { year: 2023, sales: 175000 },
  { year: 2024, sales: 210000 },
  { year: 2025, sales: 185000 },
];

export async function GET() {
  return NextResponse.json(salesData);
} 
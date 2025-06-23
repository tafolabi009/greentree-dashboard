# GreenTree Dashboard

A modern, atomic-structured Next.js 15 dashboard for visualizing sales data (2022-2024) with advanced charting, filtering, and extensibility.

## Features

- **Atomic Design**: Components organized by atomic design principles (Atoms, Molecules, Organisms).
- **Sales Charts**: Visualize sales for 2022, 2023, 2024 using mock data (inspired by real Kaggle datasets).
- **Multiple Chart Types**: Switch between Bar, Line, and Pie charts (powered by Recharts).
- **Custom Filter**: Input field to filter sales by threshold.
- **API Ready**: Easily switch to real API data.
- **Beautiful UI**: Built with Tailwind CSS for a world-class, responsive design.

## Project Structure

- `src/components/atoms` – Smallest UI elements (e.g., Button, Input)
- `src/components/molecules` – Combinations of atoms (e.g., ChartSwitcher)
- `src/components/organisms` – Complex UI blocks (e.g., SalesChartPanel)
- `src/app/dashboard` – Dashboard page

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```
2. **Run the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   ```
3. **Open [http://localhost:3000/dashboard](http://localhost:3000/dashboard) to view the dashboard.**

## Enhancements
- Add your own sales threshold via the filter input.
- Switch chart types with a single click.
- Ready for real API integration (see `SalesChartPanel` for API hook).

## Libraries Used
- [Next.js 15](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Recharts](https://recharts.org/)

---

**Enjoy a beautiful, extensible sales dashboard!**

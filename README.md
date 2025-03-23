# Dump.fun

An AI-powered dashboard that tracks and analyzes developers on Pump.fun, providing insights into their project history, success rates, and trustworthiness.

## Features

- **Dashboard Overview**: Get a quick view of developer statistics and ratings
- **Top Dumpers**: View developers ranked by their Dumper Rating (0-10 scale)
- **Bonders**: Track developers with the highest bonding curve success rates
- **Pumpers**: See which developers are best at pumping their project values
- **Developer Profiles**: Detailed developer history and project metrics

## Metrics Explained

- **Dumper Rating**: A composite score (0-10) based on project success, bonding rate, and whether developers have rugged projects
- **Bonding Rate**: Percentage of a developer's projects that successfully met bonding curve requirements
- **Pump Rate**: A measure of how successful a developer is at increasing the value of their projects
- **Rug Rate**: Percentage of a developer's projects that were "rug pulled" (developer sold their tokens)

## Tech Stack

- React
- Tailwind CSS
- Recharts for data visualization
- Vite for build tooling

## Development

```bash
# Install dependencies
npm install

# Run in development mode
npm run dev

# Build for production
npm run build

# Preview production build
npm run serve
```

## Deployment

The app is deployed using Vercel.
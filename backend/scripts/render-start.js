/**
 * Render startup: validate env, push schema to Neon, then start API.
 */
const { execSync } = require('child_process');

const dbUrl = process.env.DATABASE_URL;

if (!dbUrl) {
  console.error(
    'ERROR: DATABASE_URL is not set.\n' +
      'Set it in Render → beleqet-api → Environment.\n' +
      'Use your Neon connection string, e.g.:\n' +
      'postgresql://user:pass@ep-xxxx.region.aws.neon.tech/neondb?sslmode=require',
  );
  process.exit(1);
}

if (dbUrl.includes('localhost') || dbUrl.includes('127.0.0.1')) {
  console.error(
    'ERROR: DATABASE_URL points to localhost.\n' +
      'For Render, use your Neon Postgres URL (from console.neon.tech → Connect).',
  );
  process.exit(1);
}

console.log('Applying Prisma schema to database...');
execSync('npx prisma db push --accept-data-loss', { stdio: 'inherit' });

console.log('Starting API...');
execSync('node dist/main', { stdio: 'inherit' });

import fs from 'fs';
import path from 'path';
import { getInitialData } from './initialData';

export const DB_PATH = process.env.VERCEL
  ? path.join('/tmp', 'database.json')
  : path.join(process.cwd(), 'data', 'database.json');

export function getInitialSeedData() {
  return getInitialData();
}

export function ensureDatabaseExists() {
  const dir = path.dirname(DB_PATH);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  if (!fs.existsSync(DB_PATH)) {
    let data;
    const defaultDataPath = path.join(process.cwd(), 'data', 'database.json');
    if (fs.existsSync(defaultDataPath)) {
      try {
        data = JSON.parse(fs.readFileSync(defaultDataPath, 'utf-8'));
      } catch (e) {
        data = getInitialSeedData();
      }
    } else {
      data = getInitialSeedData();
    }
    try {
      fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), 'utf-8');
    } catch (e) {
      console.warn('Could not write DB file in serverless env:', e);
    }
    return data;
  }
  try {
    const raw = fs.readFileSync(DB_PATH, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    const data = getInitialSeedData();
    return data;
  }
}

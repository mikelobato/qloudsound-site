import { promises as fs } from 'fs';
import path from 'path';

export interface StoredRequest {
  id: string;
  name: string;
  email: string;
  style: string;
  description?: string;
  filename?: string;
  createdAt: string;
  status: 'pending' | 'in_progress' | 'completed';
}

const dataDir = path.join(process.cwd(), 'data');
const uploadsDir = path.join(dataDir, 'uploads');
const dataFile = path.join(dataDir, 'requests.json');

async function ensureDataFile() {
  await fs.mkdir(dataDir, { recursive: true });
  await fs.mkdir(uploadsDir, { recursive: true });
  try {
    await fs.access(dataFile);
  } catch (_err) {
    await fs.writeFile(dataFile, '[]', 'utf-8');
  }
}

export async function getUploadsDir() {
  await ensureDataFile();
  return uploadsDir;
}

export async function readRequests(): Promise<StoredRequest[]> {
  await ensureDataFile();
  const data = await fs.readFile(dataFile, 'utf-8');
  try {
    return JSON.parse(data) as StoredRequest[];
  } catch (_err) {
    return [];
  }
}

export async function appendRequest(entry: StoredRequest): Promise<void> {
  await ensureDataFile();
  const current = await readRequests();
  current.push(entry);
  await fs.writeFile(dataFile, JSON.stringify(current, null, 2), 'utf-8');
}

export async function findRequest(id: string): Promise<StoredRequest | undefined> {
  const all = await readRequests();
  return all.find((req) => req.id === id);
}

export { dataFile, dataDir }; // retained for reference, but not used in worker environment

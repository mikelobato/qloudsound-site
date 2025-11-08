import type { StoredRequest } from '../types/requests';

const CF_ACCOUNT_ID = 'b7eb9a280f73e95d5d278026959c1a60';
const CF_D1_DATABASE_ID = '62930b15-a8a9-4863-bb42-374c5d7a6d8d';
const CF_D1_TOKEN = 'Ym59gOTHFK8U3lXyuHdGLJ9XVaypjaQw2OMlbwcI';

type D1Row = {
  id: string;
  name: string;
  email: string;
  style: string;
  description?: string | null;
  filename?: string | null;
  created_at: string;
  status: string;
};

const TABLE_SQL = `CREATE TABLE IF NOT EXISTS requests (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  style TEXT NOT NULL,
  description TEXT,
  filename TEXT,
  created_at TEXT NOT NULL,
  status TEXT NOT NULL
)`;

async function ensureTable() {
  await runD1(TABLE_SQL);
}

function rowToStoredRequest(row: D1Row): StoredRequest {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    style: row.style,
    description: row.description ?? undefined,
    filename: row.filename ?? undefined,
    createdAt: row.created_at,
    status: (row.status as StoredRequest['status']) ?? 'pending'
  };
}

export async function saveRequest(entry: StoredRequest) {
  await ensureTable();
  await runD1(
    `INSERT OR REPLACE INTO requests (id, name, email, style, description, filename, created_at, status)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [entry.id, entry.name, entry.email, entry.style, entry.description ?? null, entry.filename ?? null, entry.createdAt, entry.status]
  );
}

export async function listRequests(): Promise<StoredRequest[]> {
  await ensureTable();
  const rows = await runD1<D1Row>('SELECT * FROM requests ORDER BY datetime(created_at) DESC');
  return rows.map(rowToStoredRequest);
}

export async function getRequest(id: string): Promise<StoredRequest | undefined> {
  await ensureTable();
  const rows = await runD1<D1Row>('SELECT * FROM requests WHERE id = ? LIMIT 1', [id]);
  return rows.length ? rowToStoredRequest(rows[0]) : undefined;
}

async function runD1<T = Record<string, unknown>>(sql: string, params: (string | null)[] = []) {
  const response = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${CF_ACCOUNT_ID}/d1/database/${CF_D1_DATABASE_ID}/query`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${CF_D1_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ sql, params })
    }
  );

  const data = await response.json();
  if (!response.ok || data.success === false) {
    throw new Error('D1 query failed');
  }

  const results = (data.result?.results ?? []) as T[];
  return results;
}

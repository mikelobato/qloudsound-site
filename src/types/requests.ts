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

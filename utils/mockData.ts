export type User = {
  id: number;
  name: string;
  email: string;
  role: string;
};

export function generateMockData(count: number): User[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    name: `User ${i + 1}`,
    email: `user${i + 1}@example.com`,
    role: i % 3 === 0 ? 'Admin' : i % 3 === 1 ? 'Editor' : 'Viewer',
  }));
}


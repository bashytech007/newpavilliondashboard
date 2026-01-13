export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar: string;
  bio: string;
  notifications: boolean;
}

const users: User[] = [
  {
    id: "1",
    name: "Chukwudi Lawal",
    email: "test@example.com",
    role: "Senior Associate",
    avatar: "/placeholder-user.jpg",
    bio: "Mock bio",
    notifications: true,
  },
  // Add more users as needed
];

export const db = {
  user: {
    findUnique: async ({ where }: { where: { email?: string; id?: string } }) => {
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 500));
      
      if (where.email) {
        return users.find((u) => u.email.toLowerCase() === where.email!.toLowerCase()) || null;
      }
      if (where.id) {
        return users.find((u) => u.id === where.id) || null;
      }
      return null;
    },
    // Add other methods like create, update, delete as needed
  },
};

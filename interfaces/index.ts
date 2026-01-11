export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  image?: string;
  theme?: Theme;
}

export type Theme = "light" | "dark" | "system";

export interface UserWithPassword extends User {
  password: string;
}

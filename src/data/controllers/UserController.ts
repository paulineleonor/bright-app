import { User } from "../models/User";

export const mockUsers = [
  { id: 1, name: "batman", dateCompleted: null },
  { id: 2, name: "robin", dateCompleted: "2025-06-09T11:45:18Z" },
];

export class UserController {
  private user: User | null = null;

  static getUser(userName: string): User | null {
    return mockUsers.find((u) => u.name === userName) || null;
  }
}

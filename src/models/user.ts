import { v4 as uuidv4 } from "uuid";
interface User {
  id: string;
  username: string;
  age: number;
  hobbies: string[];
}

const createUser = (
  username: string,
  age: number,
  hobbies: string[]
): User => ({
  id: uuidv4(),
  username,
  age,
  hobbies,
});

export { User, createUser };

import { faker } from "@faker-js/faker";

export interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
}

export function generateUser(passIsValid: boolean) : UserData {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const password = passIsValid 
    ? faker.internet.password({length:8})
    : faker.internet.password({length:7});

    return  {
    firstName, 
    lastName, 
    email: faker.internet.email({firstName: firstName, lastName:lastName}),
    username: faker.internet.username(),
    password,  
    };
}

export function toInvalidEmailFormat(email: string): string {
  return email.slice(0, email.indexOf('@') + 1);
}
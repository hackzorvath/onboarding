import { PhoneModel } from "../phone/phone.model"

export class UserModel {
  userId: string;
  firstName: string;
  lastName: string;
  username: string;

  phones: PhoneModel[];
}

// DONE

import { Model } from 'mongoose';

type TOrder = {
  productName: string;
  price: number;
  quantity: number;
};

// user type
export type TUser = {
  userId: number;
  username: string;
  password: string;
  fullName: {
    firstName: string;
    lastName: string;
  };
  age?: number;
  email?: string;
  isActive: boolean;
  hobbies?: string[];
  address?: {
    street: string;
    city: string;
    country: string;
  };
  orders?: TOrder[];
};

export interface UserModel extends Model<TUser> {
  // eslint-disable-next-line no-unused-vars
  isUserExists: (id: number) => Promise<TUser | null>;
}

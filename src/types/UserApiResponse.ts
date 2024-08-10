type Address = {
  address: string;
  city: string;
  state: string;
  stateCode: string;
  postalCode: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  country: string;
};
export type User = {
  id: number;
  firstName: string;
  lastName: string;
  company: {
    department: string;
    name: string;
    title: string;
    address: Address;
  };
  address?: Address;
};

export type UsersApiResponse = {
  users: User[];
};

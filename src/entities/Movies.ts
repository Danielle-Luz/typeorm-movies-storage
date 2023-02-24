import { Entity } from "typeorm";

@Entity()
class Movies {
  id: number;
  name: string;
  description: string;
  duration: number;
  price: number;
}

export { Movies };

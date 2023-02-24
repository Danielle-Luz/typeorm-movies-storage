import { type } from "os";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
class Movies {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 50, unique: true })
  name: string;

  @Column({ type: "text", nullable: true })
  description: string;

  @Column()
  duration: number;

  @Column()
  price: number;
}

export { Movies };

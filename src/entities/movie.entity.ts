import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
class Movie {
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

export { Movie };

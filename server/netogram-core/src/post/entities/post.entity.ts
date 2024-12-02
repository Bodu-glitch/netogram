import {
  Column,
  CreateDateColumn,
  Entity, JoinColumn,
  ManyToOne,
  OneToMany, PrimaryColumn,
  PrimaryGeneratedColumn, Unique,
  UpdateDateColumn
} from "typeorm";
import { Profile } from "../../profile/entities/profile.entity";

@Entity()
@Unique([ 'uid','id'])
export class Post {
  @PrimaryColumn({type: 'bigint' })
  id: string;

  @Column({ type: 'text' })
  content: string;

  @Column({type: 'timestamp'})
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;

  @Column({ type: 'text'})
  uid: string;

  @Column('text', { array: true, nullable: true })
  imageUrls: string[];


  @ManyToOne(() => Profile)
  @JoinColumn({ name: 'uid', referencedColumnName: 'uid' })
  profile: Profile;


}

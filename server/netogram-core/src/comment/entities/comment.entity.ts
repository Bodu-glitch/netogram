import {Column, Entity, ManyToOne, PrimaryColumn, Unique} from "typeorm";
import {Post} from "../../post/entities/post.entity";

@Entity()
@Unique(['id'])
export class Comment {
    @PrimaryColumn({type: 'bigint' })
    id: number;

    @ManyToOne(() => Post,  { onDelete: 'CASCADE' })
    @Column({type: "bigint"})
    postId: string;

    @Column({ type: 'text'})
    uid: string;

    @Column({ type: 'text'})
    text: string;

    @Column({ type: 'timestamp'})
    createdAt: string;
}

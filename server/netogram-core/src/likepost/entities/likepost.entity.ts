import {Column, Entity, ManyToOne, PrimaryColumn, Unique} from "typeorm";
import {Post} from "../../post/entities/post.entity";


@Entity()
@Unique(['likeId'])
export class Likepost {
    @PrimaryColumn({type: "bigint"})
    likeId: number;

    @ManyToOne(() => Post )
    @Column({type: "bigint"})
    postId: string;

    @Column({type: "text"})
    uid: string;

    @Column({type: "timestamp"})
    createdAt: string;
}

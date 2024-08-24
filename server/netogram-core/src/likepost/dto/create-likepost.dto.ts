import {IsNotEmpty} from "class-validator";


export class CreateLikepostDto {
    @IsNotEmpty()
    likeId: number;

    @IsNotEmpty()
    postId: number;

    @IsNotEmpty()
    uid: string;
}

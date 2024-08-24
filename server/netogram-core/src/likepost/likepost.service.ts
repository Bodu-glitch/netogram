import {Injectable, NotFoundException} from '@nestjs/common';
import { CreateLikepostDto } from './dto/create-likepost.dto';
import { UpdateLikepostDto } from './dto/update-likepost.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Likepost} from "./entities/likepost.entity";
import {IdgenService} from "../utils/idgen/idgen.service";
import {Profile} from "../profile/entities/profile.entity";
import {Post} from "../post/entities/post.entity";

@Injectable()
export class LikepostService {

  constructor(@InjectRepository(Likepost)
              private readonly LikepostRepository: Repository<Likepost>,
              @InjectRepository(Profile)
              private profileRepository: Repository<Profile>,
              @InjectRepository(Post)
              private postRepository: Repository<Post>,
              private idGenService: IdgenService,
  ) {
  }

  async create(createLikepostDto: CreateLikepostDto, uid : string) {


    const post = await this.postRepository.findOne({ where: { id: createLikepostDto.postId } });

    if(!post){
        throw new NotFoundException('Post not found');
    }

    const profile = await this.profileRepository.findOne({ where: { uid } });

    if (!profile) {
      throw new NotFoundException('Profile not found');
    }

    let like = new Likepost();
    like.likeId = this.idGenService.generateId();

    like.postId = createLikepostDto.postId;
    like.uid = uid;

    like.createdAt = new Date().toISOString();

    return await this.LikepostRepository.save(like);
  }

  delete (likeId: number) {
    let deletedLike = this.LikepostRepository.findOne({ where: { likeId } });
    if (!deletedLike) {
      throw new NotFoundException('Like not found');
    }
    return this.LikepostRepository.delete(likeId);
  }

  countLikes(postId: number) {
    return this.LikepostRepository.count({ where: { postId } });
  }
}

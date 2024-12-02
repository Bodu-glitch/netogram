import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profile } from '../profile/entities/profile.entity';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Post } from './entities/post.entity';
import { SearchService } from '../search/search.service';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
    @InjectRepository(Profile)
    private profileRepository: Repository<Profile>,
    private readonly searchService: SearchService,
  ) {}
  async create(createPostDto: CreatePostDto, uid: string, urls: string[]) {
    if (!createPostDto.uid) {
      throw new BadRequestException('uid cannot be empty');
    }
    const profile = await this.profileRepository.findOne({ where: { uid } });

    if (!profile) {
      throw new NotFoundException('Profile not found');
    }
    //call the storage service to upload the image

    // Create the post
    createPostDto.imageUrls = [...urls];
    console.log('url', createPostDto.imageUrls);
    const newPost = this.postRepository.create({ ...createPostDto, uid });
    newPost.createdAt = new Date().toISOString();

    // Save the post
    const savedPost = await this.postRepository.save(newPost);
    // Index the post
    await this.searchService.indexPost(newPost);

    return savedPost;
  }

  async findAll(pageNumber: number, limitNumber: number) {
    const skip = (pageNumber - 1) * limitNumber;
    if (isNaN(skip)) {
      throw new BadRequestException(
        'Calculated skip value must be a valid number',
      );
    }
    const [result, total] = await this.postRepository.findAndCount({
      skip,
      take: limitNumber,
      order: { createdAt: 'DESC' }

    });

    return {
      data: result,
      count: total,
      pageNumber,
      limitNumber,
    };
  }

  //get post by uid in profile
  async findPostByUid(uid: string, pageNumber: number, limitNumber: number) {
    const skip = (pageNumber - 1) * limitNumber;
    if (isNaN(skip)) {
      throw new BadRequestException(
        'Calculated skip value must be a valid number',
      );
    }
    const [result, total] = await this.postRepository.findAndCount({
      where: { uid },
      skip,
      take: limitNumber,
      order: { createdAt: 'DESC' },
    });

    return {
      data: result,
      count: total,
      pageNumber,
      limitNumber,
    };
  }

  //get post by id
  async findPostById(id: string) {
    const post = await this.postRepository.findOne({ where: { id } });
    if (!post) {
      throw new NotFoundException('Post not found');
    }
    return post;
  }

  //update post
  async updatePost(postId: string, updatePostDto: UpdatePostDto) {
    const post = await this.findPostById(postId);
    console.log(post.uid);
    console.log(updatePostDto.uid);
    //check if the post is owned by the user
    if (post.uid !== updatePostDto.uid) {
      throw new NotFoundException('You are not the owner of this post');
    }

    const updatedPost = await this.postRepository.save({
      ...post,
      ...updatePostDto,
    });

    return updatedPost;
  }

  //delete post
  async deletePost(id: string, uid: string) {
    const post = await this.findPostById(id);
    //check if the post is owned by the user
    console.log("post id",post.uid);
    console.log("post id",uid);


    if (post.uid !== uid) {
      throw new NotFoundException('You are not the owner of this post');
    }

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    //delete post from the index

    await this.postRepository.delete({ id });
    await this.searchService.deletePost(post.id);
  }


}

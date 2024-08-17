import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFiles,
  BadRequestException, Query, Req, Put,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { StorageService } from '../storage/storage.service';
import { IdgenService } from '../utils/idgen/idgen.service';
import { FilesInterceptor } from '@nestjs/platform-express';


@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService,
              private readonly storageService: StorageService,
              private idGenService: IdgenService
  ) {
  }


  @Post()
  @UseInterceptors(FilesInterceptor('imageUrl'))
  async create(@UploadedFiles() photos: Express.Multer.File[], @Body() createPostDto: CreatePostDto, @Req() req) {
    createPostDto.id = this.idGenService.generateId();
    console.log(createPostDto.id);
    const urls = await this.storageService.uploadFilesToFirebase(photos, 'post/' + createPostDto.id);
    console.log("postImage :", urls);
    const { uid } = req.user;
    return this.postService.create(createPostDto, uid, urls);
  }

  @Get()
  async findAll(@Query('page') page: string, @Query('limit') limit: string) {
    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);

    if (isNaN(pageNumber) || isNaN(limitNumber)) {
      throw new BadRequestException('Page and limit must be valid numbers');
    }

    return this.postService.findAll(pageNumber, limitNumber);
  }

  @Get(':id')
  async findPostById(@Param('id') id: string) {
    return this.postService.findPostById(+id);
  }

  @Get(':uid')
  async findPostByUid(@Query('uid') uid: string) {
    return this.postService.findPostByUid(uid);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postService.updatePost(+id, updatePostDto);
  }


  //delete post by id with uid
  @Delete(':id')
  async remove(@Param('id') id: number, @Body("uid") uid: string) {

    return this.postService.deletePost(id, uid);
  }
}
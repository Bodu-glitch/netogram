import {Controller, Get, Post, Body, Patch, Param, Delete, Req, HttpStatus, HttpException, Query} from '@nestjs/common';
import { LikepostService } from './likepost.service';
import { CreateLikepostDto } from './dto/create-likepost.dto';
import { UpdateLikepostDto } from './dto/update-likepost.dto';

@Controller('likepost')
export class LikepostController {
  constructor(private readonly likepostService: LikepostService) {}

  @Post()
  create(@Body() createLikepostDto: CreateLikepostDto,
         @Req() req) {
    try {
      const { uid } = req.user;
      return this.likepostService.create(createLikepostDto,uid);
    }catch (e){
      if (e.status === HttpStatus.BAD_REQUEST) {
        throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
      } else if (e.status === HttpStatus.NOT_FOUND) {
        throw new HttpException(e.message, HttpStatus.NOT_FOUND);
      }
    }
  }

  @Delete()
    delete(@Query('postId') postId: string,
             @Req() req) {
        try {
        const { uid } = req.user;
        return this.likepostService.delete(uid, postId);
        }catch (e){
        if (e.status === HttpStatus.BAD_REQUEST) {
            throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
        } else if (e.status === HttpStatus.NOT_FOUND) {
            throw new HttpException(e.message, HttpStatus.NOT_FOUND);
        }
        }
    }

    @Get()
    countLikes(@Query('postId') postId: string) {
        try {
        return this.likepostService.countLikes(postId);
        }catch (e){
        if (e.status === HttpStatus.BAD_REQUEST) {
            throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
        } else if (e.status === HttpStatus.NOT_FOUND) {
            throw new HttpException(e.message, HttpStatus.NOT_FOUND);
        }
        }
    }

    @Get('isLiked')
    async isLiked(@Query('postId') postId: string,
            @Req() req) {
        try {
        const { uid } = req.user;
        let isLike = await this.likepostService.isLiked(postId, uid);
        if(isLike !== null) {
            return true;
        }
        return false;
        }catch (e){
        if (e.status === HttpStatus.BAD_REQUEST) {
            throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
        } else if (e.status === HttpStatus.NOT_FOUND) {
            throw new HttpException(e.message, HttpStatus.NOT_FOUND);
        }
        }
    }
}

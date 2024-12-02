import {Controller, Get, Post, Body, Patch, Param, Delete, Req, HttpStatus, HttpException, Query} from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  create(@Body() createCommentDto: CreateCommentDto,
         @Req() req,) {
    try {
      const { uid } = req.user;
      console.log(uid);
      return this.commentService.create(createCommentDto, uid);
    }catch (e){
      if (e.status === HttpStatus.BAD_REQUEST) {
        throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
      } else if (e.status === HttpStatus.NOT_FOUND) {
        throw new HttpException(e.message, HttpStatus.NOT_FOUND);
      }
    }
  }

  @Get()
  async findAll(@Query('postId') postId: string) {
    try {
      return await this.commentService.findAll(postId);
    } catch (e) {
      if (e.status === HttpStatus.NOT_FOUND) {
        throw new HttpException(e.message, HttpStatus.NOT_FOUND);
      }
    }
  }

  @Get('count')
  async countComments(@Body() comment: CreateCommentDto) {
    return await this.commentService.countComments(comment.postId);
  }

  @Delete()
  remove(@Body() deleteCommentDto: CreateCommentDto) {
    console.log(deleteCommentDto);
    return this.commentService.delete(deleteCommentDto.commentId);
  }
}

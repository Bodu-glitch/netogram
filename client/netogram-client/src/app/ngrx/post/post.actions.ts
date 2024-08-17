import {createAction, props} from "@ngrx/store";
import {PostModel, PostResponse} from "../../models/post.model";
import {HttpErrorResponseModel} from "../../models/http-error-response.model";

//create post
export const CreatePost = createAction(
  '[Post] Create Post',
  props<{ post: PostModel }>(),
)

export const CreatePostSuccess = createAction(
  '[Post] Create Post Success',
)

export const CreatePostFailure = createAction(
  '[Post] Create Post Failure',
  props<{ createPostErrorMessage: HttpErrorResponseModel }>(),
)

//update post

export const UpdatePost = createAction(
  '[Post] Update Post',
  props<{ post: PostModel }>(),
)

export const UpdatePostSuccess = createAction(
  '[Post] Update Post Success',
)

export const UpdatePostFailure = createAction(
  '[Post] Update Post Failure',
  props<{ updatePostErrorMessage: HttpErrorResponseModel }>(),
)

//get post by id

export const GetPostById = createAction(
  '[Post] Get Post By Id',
  props<{ id: BigInt }>(),
)

export const GetPostByIdSuccess = createAction(
  '[Post] Get Post By Id Success',
  props<{ postDetail: PostModel }>(),
)

export const GetPostByIdFailure = createAction(
  '[Post] Get Post By Id Failure',
  props<{ getPostByIdErrorMessage: HttpErrorResponseModel }>(),
)

//get all post

export const GetAllPost = createAction(
  '[Post] Get All Post',
  props<{ page: number, limit: number }>(),
)

export const GetAllPostSuccess = createAction(
  '[Post] Get All Post Success',
  props<{ posts: PostResponse }>(),
)

export const GetAllPostFailure = createAction(
  '[Post] Get All Post Failure',
  props<{ getAllPostErrorMessage: HttpErrorResponseModel }>(),
)

//getMinePost

export const GetMinePost = createAction(
  '[Post] Get Mine Post',
  props<{ uid: string }>(),
)

export const GetMinePostSuccess = createAction(
  '[Post] Get Mine Post Success',
  props<{ minePosts: PostResponse }>(),
)

export const GetMinePostFailure = createAction(
  '[Post] Get Mine Post Failure',
  props<{ getMinePostErrorMessage: HttpErrorResponseModel }>(),
)
import { createAction, props } from '@ngrx/store';
import { CommentModel } from '../../models/comment.model';

export const getComments = createAction(
  '[Comment] Get Comments',
  props<{ postId: bigint }>(),
);
export const getCommentsSuccess = createAction(
  '[Comment] Get Comments Success',
  props<{ comments: CommentModel[] }>(),
);
export const getCommentsFailure = createAction(
  '[Comment] Get Comments Failure',
);

export const createComment = createAction(
  '[Comment] Create Comment',
  props<{ comment: CommentModel }>(),
);
export const createCommentSuccess = createAction(
  '[Comment] Create Comment Success',
);
export const createCommentFailure = createAction(
  '[Comment] Create Comment Failure',
);

export const clearState = createAction('[Comment] Clear State');

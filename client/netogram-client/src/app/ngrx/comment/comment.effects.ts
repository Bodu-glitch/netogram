import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CommentService } from '../../services/comment/comment.service';
import * as CommentActions from './comment.actions';
import { exhaustAll, exhaustMap, mergeMap, of, switchMap } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { CommentModel } from '../../models/comment.model';

@Injectable()
export class CommentEffects {
  constructor(
    private actions$: Actions,
    private commentService: CommentService,
  ) {}

  createComment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CommentActions.createComment),
      exhaustMap((action) =>
        this.commentService.createComment(action.comment).pipe(
          map((comment: CommentModel) => {
            return CommentActions.createCommentSuccess();
          }),
          catchError(() => {
            return of(CommentActions.createCommentFailure());
          }),
        ),
      ),
    ),
  );

  getAllComments$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CommentActions.getComments),
      exhaustMap((action) =>
        this.commentService.getComments(action.postId.toString()).pipe(
          map((comments) => {
            let commentsList = comments.map((comment: any) => {
              return {
                id: comment.id,
                postId: comment.postId,
                uid: comment.uid,
                text: comment.text,
                createdAt: comment.createdAt,
              };
            });
            return CommentActions.getCommentsSuccess({
              comments: commentsList,
            });
          }),
          catchError(() => {
            return of(CommentActions.getCommentsFailure());
          }),
        ),
      ),
    ),
  );
}

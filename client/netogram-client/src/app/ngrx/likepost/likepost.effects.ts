import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {LikepostService} from "../../services/likepost/likepost.service";
import * as LikepostActions from "./likepost.actions";
import {mergeMap, of, switchMap} from "rxjs";
import {catchError, map} from "rxjs/operators";
import {LikepostModel} from "../../models/likepost.model";

@Injectable()
export class LikepostEffects {

  constructor(
    private actions$: Actions,
    private likepostService: LikepostService
  ) {

  }

  createLikePost$ = createEffect(() => this.actions$.pipe(
    ofType(LikepostActions.createLikepost),
    switchMap((action) => this.likepostService.createLikePost(action.likePost).pipe(
        map((likePost: LikepostModel) => {
          return  LikepostActions.createLikepostSuccess({likePost});
        }),
        catchError(() => {
          return of(LikepostActions.createLikepostFailure());
        })
    ))
  ));
  getLikePostCount$ = createEffect(() => this.actions$.pipe(
    ofType(LikepostActions.getLikepostCount),
    switchMap((action) => this.likepostService.getLikePostCount(action.postId.toString()).pipe(
        map((likeCount: number) => {
          return LikepostActions.getLikepostCountSuccess({likepostCount: likeCount});
        }),
        catchError(() => {
          return of(LikepostActions.getLikepostCountFailure());
        })
    ))
  ));
  getIsLiked$ = createEffect(() => this.actions$.pipe(
    ofType(LikepostActions.getIsLiked),
    switchMap((action) => this.likepostService.getIsLiked(action.postId.toString()).pipe(
        map((isLiked: boolean) => {
          return LikepostActions.getIsLikedSuccess({isLiked});
        }),
        catchError(() => {
          return of(LikepostActions.getIsLikedFailure());
        })
    ))
  ));

  deleteLiked$ = createEffect(() => this.actions$.pipe(
    ofType(LikepostActions.deleteLike),
    switchMap((action) => this.likepostService.deleteLiked(action.postId.toString()).pipe(
        map(() => {
          return LikepostActions.deleteLikeSuccess();
        }),
        catchError(() => {
          return of(LikepostActions.deleteLikeFailure());
        })
    ))
  ));

  clearLikePostState$ = createEffect(() => this.actions$.pipe(
    ofType(LikepostActions.clearLikePostState),
    switchMap(() => {
      return of(LikepostActions.clearLikePostSuccess());
    })
  ));
};

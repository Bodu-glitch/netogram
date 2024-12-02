import {createAction, props} from "@ngrx/store";
import {LikepostModel} from "../../models/likepost.model";

export const getLikepostCount = createAction('[Likepost] Get Likepost Count',props<{postId: bigint}>());
export const getLikepostCountSuccess = createAction('[Likepost] Get Likepost Count Success',props<{likepostCount: number}>());
export const getLikepostCountFailure = createAction('[Likepost] Get Likepost Count Failure');

export const createLikepost = createAction('[Likepost] Create Likepost',props<{likePost: LikepostModel}>());
export const createLikepostSuccess = createAction('[Likepost] Create Likepost Success',props<{likePost: LikepostModel }>());
export const createLikepostFailure = createAction('[Likepost] Create Likepost Failure');

export const getIsLiked = createAction('[Likepost] Get Is Liked',props<{postId: bigint}>());
export const getIsLikedSuccess = createAction('[Likepost] Get Is Liked Success',props<{isLiked: boolean}>());
export const getIsLikedFailure = createAction('[Likepost] Get Is Liked Failure');

export const deleteLike = createAction('[Comment] Delete Like Post', props<{ postId: bigint }>());
export const deleteLikeSuccess = createAction('[Comment] Delete Like Post Success');
export const deleteLikeFailure = createAction('[Comment] Delete Like Post Failure');

export const clearLikePostState = createAction('[Likepost] Clear Like Post State');
export const clearLikePostError = createAction('[Likepost] Clear Like Post Error');
export const clearLikePostSuccess = createAction('[Likepost] Clear Like Post Success');

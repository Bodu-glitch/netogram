import { LikepostState } from './likepost.state';
import { createReducer, on } from '@ngrx/store';
import * as LikepostActions from './likepost.actions';
import { act } from '@ngrx/effects';

const initialState: LikepostState = {
  likePost: {
    likeId: 0,
    postId: BigInt(0),
    uid: '',
    createdAt: '',
  },
  isLoading: false,
  error: '',
  success: false,

  likeCount: 0,
  likeCountError: '',
  likeCountLoading: false,
  likeCountSuccess: false,

  isLiked: false,
  isLikedError: '',
  isLikedLoading: false,
  isLikedSuccess: false,

  isUnLikedError: '',
  isUnLikedLoading: false,
  isUnLikedSuccess: false,
};

export const likepostReducer = createReducer(
  initialState,
  on(LikepostActions.createLikepost, (state, action) => {
    console.log(action.type);
    return <LikepostState>{
      ...state,
      success: false,
      isLoading: true,
    };
  }),
  on(LikepostActions.createLikepostSuccess, (state, action) => {
    console.log(action.type);
    return <LikepostState>{
      ...state,
      isLoading: false,
      success: true,
      likePost: action.likePost,
    };
  }),
  on(LikepostActions.createLikepostFailure, (state, action) => {
    console.log(action.type);
    return <LikepostState>{
      ...state,
      isLoading: false,
      success: false,
      error: 'Error liking post',
    };
  }),

  on(LikepostActions.getLikepostCount, (state, action) => {
    console.log(action.type);
    return <LikepostState>{
      ...state,
      likeCountSuccess: false,
      likeCountLoading: true,
    };
  }),
  on(LikepostActions.getLikepostCountSuccess, (state, action) => {
    console.log(action.type);
    return <LikepostState>{
      ...state,
      likeCountLoading: false,
      likeCountSuccess: true,
      likeCount: action.likepostCount,
    };
  }),
  on(LikepostActions.getLikepostCountFailure, (state, action) => {
    console.log(action.type);
    return <LikepostState>{
      ...state,
      likeCountLoading: false,
      likeCountSuccess: false,
      likeCountError: 'Error getting like count',
    };
  }),
  on(LikepostActions.getIsLiked, (state, action) => {
    console.log(action.type);
    return <LikepostState>{
      ...state,
      isLikedSuccess: false,
      isLikedLoading: true,
    };
  }),
  on(LikepostActions.getIsLikedSuccess, (state, action) => {
    console.log(action.type);
    return <LikepostState>{
      ...state,
      isLikedLoading: false,
      isLikedSuccess: true,
      isLiked: action.isLiked,
    };
  }),
  on(LikepostActions.getIsLikedFailure, (state, action) => {
    console.log(action.type);
    return <LikepostState>{
      ...state,
      isLikedLoading: false,
      isLikedSuccess: false,
      isLikedError: 'Error getting is liked',
    };
  }),
  on(LikepostActions.deleteLike, (state, action) => {
    console.log(action.type);
    return <LikepostState>{
      ...state,
      isUnLikedSuccess: false,
      isUnLikedLoading: true,
    };
  }),
  on(LikepostActions.deleteLikeSuccess, (state, action) => {
    console.log(action.type);
    return <LikepostState>{
      ...state,
      isUnLikedLoading: false,
      isUnLikedSuccess: true,
    };
  }),
  on(LikepostActions.deleteLikeFailure, (state, action) => {
    console.log(action.type);
    return <LikepostState>{
      ...state,
      isUnLikedLoading: false,
      isUnLikedSuccess: false,
      isUnLikedError: 'Error unliking post',
    };
  }),
  on(LikepostActions.clearLikePostState, (state, action) => {
    console.log(action.type);
    return <LikepostState>{
      ...state,
      likePost: {
        likeId: 0,
        postId: BigInt(0),
        uid: '',
        createdAt: '',
      },
      isLoading: false,
      error: '',
      success: false,
      likeCount: 0,
      likeCountError: '',
      likeCountLoading: false,
      likeCountSuccess: false,
      isLiked: false,
      isLikedError: '',
      isLikedLoading: false,
      isLikedSuccess: false,
      isUnLikedSuccess: false,
      isUnLikedError: '',
      isUnLikedLoading: false,
    };
  }),
  on(LikepostActions.clearLikePostError, (state, action) => {
    console.log(action.type);
    return <LikepostState>{
      ...state,
    };
  }),
  on(LikepostActions.clearLikePostSuccess, (state, action) => {
    console.log(action.type);
    return <LikepostState>{
      ...state,
    };
  }),
);

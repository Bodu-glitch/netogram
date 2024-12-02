import { Injectable } from '@angular/core';
import {HttpClientAuth} from "../../util/http-client-auth";
import {LikepostModel} from "../../models/likepost.model";

@Injectable({
  providedIn: 'root'
})
export class LikepostService {

  constructor(private httpClient: HttpClientAuth) { }

  createLikePost(like: LikepostModel) {
    console.log(like.postId);
    return this.httpClient.post('likepost', like);
  }

  getLikePostCount(postId: string) {
    return this.httpClient.get(`likepost?postId=${postId}`);
  }

  getIsLiked(postId: string) {
    return this.httpClient.get(`likepost/isLiked?postId=${postId}`);
  }

  deleteLiked(postId: string) {
    return this.httpClient.delete(`likepost?postId=${postId}`);
  }
}

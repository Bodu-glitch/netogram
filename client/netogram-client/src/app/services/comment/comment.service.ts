import { Injectable } from '@angular/core';
import { HttpClientAuth } from '../../util/http-client-auth';
import {CommentModel} from "../../models/comment.model";


@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private httpClient: HttpClientAuth) { }

  createComment(comment: CommentModel) {
    return this.httpClient.post('comment', comment);
  }

  getComments(postId: string) {
    return this.httpClient.get(`comment?postId=${postId}`);  }

}

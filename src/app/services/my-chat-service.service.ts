import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFire } from 'angularfire2';
import { ChatMessage } from '../models';

@Injectable()
export class MyChatServiceService {

  constructor(private _af: AngularFire) { }

  getMessages(): Observable<ChatMessage[]> {
    return this._af.database.list('/messages/', {
      query: {
        limitToLast: 4
      }
    });
  }

  createNewMessage(newMessage: ChatMessage): Promise<void> {
    newMessage.created = new Date().toUTCString();
    return new Promise((resolve) => {
      this._af.database.list('messages/').push(newMessage).then(() => {
        resolve();
      });
    });
  }

}

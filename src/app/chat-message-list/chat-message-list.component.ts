import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ChatMessage } from '../models';
import { MyChatServiceService } from '../services';

@Component({
  selector: 'app-chat-message-list',
  templateUrl: './chat-message-list.component.html',
  styleUrls: ['./chat-message-list.component.css']
})
export class ChatMessageListComponent implements OnInit {

  messages: Observable<ChatMessage[]>;

  constructor(private _cs: MyChatServiceService) { }

  ngOnInit() {
    this.messages = this._cs.getMessages();
  }

  trackByKey(index: number, entry: ChatMessage) {
    return entry.$key;
  }
}

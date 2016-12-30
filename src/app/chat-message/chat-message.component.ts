import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { ChatMessage } from '../models';

@Component({
  selector: 'app-chat-message',
  templateUrl: './chat-message.component.html',
  styleUrls: ['./chat-message.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatMessageComponent {

  @Input() message: ChatMessage;

}

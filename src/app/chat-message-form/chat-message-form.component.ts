import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MyChatServiceService } from '../services';
import { ChatMessage } from '../models';
import { LocalStorageService } from 'angular-2-local-storage';


class ChatMessageFormModel {
  name: string;
  text: string;
}

@Component({
  selector: 'app-chat-message-form',
  templateUrl: './chat-message-form.component.html',
  styleUrls: ['./chat-message-form.component.css']
})
export class ChatMessageFormComponent {

  private chatMessageForm: FormGroup;
  user = {};
  name: String;

  constructor(private _fb: FormBuilder, private _cs: MyChatServiceService, public localStorageService: LocalStorageService) {
    this.chatMessageForm = this._fb.group({
      'name': ['', Validators.required],
      'text': ['', Validators.required],
    });

    this.user = localStorageService.get('user');
    console.log(this.user);
  }

  saveMessage() {
    if (this.chatMessageForm.valid) {
      this._cs.createNewMessage(<ChatMessage> this.chatMessageForm.value);
      const name = this.chatMessageForm.controls['name'].value;
      this.chatMessageForm.reset();
      this.chatMessageForm.controls['name'].setValue(name);
    }
  }

}

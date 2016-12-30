/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MyChatServiceService } from './my-chat-service.service';

describe('MyChatServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MyChatServiceService]
    });
  });

  it('should ...', inject([MyChatServiceService], (service: MyChatServiceService) => {
    expect(service).toBeTruthy();
  }));
});

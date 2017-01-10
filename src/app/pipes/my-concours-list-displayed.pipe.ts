import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'myConcoursListDisplayed',
  pure: false
})
export class MyConcoursListDisplayedPipe implements PipeTransform {

  transform(value: any, args?: any): any {

    return value.filter(
      val => val.displayIt === true
    );
  }

}

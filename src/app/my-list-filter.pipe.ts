import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'myListFilter'
})
export class MyListFilterPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return null;
  }

}

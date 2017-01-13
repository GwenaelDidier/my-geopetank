import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'myListFilter'
})
export class MyListFilterPipe implements PipeTransform {

  transform(boulodromes: any, args?: any): any {
    if(boulodromes !== null && args !== undefined && args !== null && args[0] !== undefined){
      return boulodromes.filter(
       boulodrome => (boulodrome.nom.toLowerCase().indexOf(args.toLowerCase()) !== -1 || boulodrome.secteur.toLowerCase().indexOf(args.toLowerCase()) !== -1)
      );
    }else{
      return boulodromes;
    }
  }

}

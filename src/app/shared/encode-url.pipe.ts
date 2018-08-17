import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'encodeUrl'
})
export class EncodeUrlPipe implements PipeTransform {

  transform(href: string) {
    return encodeURIComponent(href);
  }

}

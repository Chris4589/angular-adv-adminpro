import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string, type: 'users' | 'hospitals' | 'doctors'):string {
    let url;
    if(img)
    {
      if(img.includes('http'))
        return img;
      else
        return `${base_url}/upload/?collection=${type}&file=${img}`;
    }
    else
      return `${base_url}/upload/?collection=${type}&file=no-img`;
  }

}

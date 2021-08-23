import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CameraService {
  max_x: number = 0;
  max_y: number = 0;

  diff_x: number = 500;
  diff_y: number = 400;

  constructor() { }

  init(x: number, y: number) {
    this.max_x = x;
    this.max_y = y;
    
  }

  zoomCamera(x:number, y:number) {
    
    let screen_x=x-this.diff_x;
    let screen_y=y-this.diff_y;
  
 
    window.scrollTo(screen_x, screen_y);
    



  }

}

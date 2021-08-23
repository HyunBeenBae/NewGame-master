import { getParseErrors } from '@angular/compiler';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  MAX_X: number = 3500;
  MAX_Y: number = 2000;

  constructor() { }

  init(two:any) {
    //var texture = new two.Texture();
    //let grass= two.makeRectangle(0,0,7000,2000);
    //grass.fill = texture;
    let sky = two.makeRectangle(0,0,7000,4000);
    sky.fill = '#33ffff';
    sky.opacity=.65;
    let land = two.makeRectangle(0,2000, 7000, 800);
    land.fill = '#006600';
  }


}

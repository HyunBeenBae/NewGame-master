import { Injectable } from '@angular/core';
import { MapService } from './map.service';
import { Sprite } from './sprite.service';

@Injectable({
  providedIn: 'root'
})



export class CollisionService {

  constructor(private _mapService: MapService) { }

  detectBorder(sprite: Sprite, oldX: number, oldY: number, newX: number, newY: number) {
    let OFFSET=2
    let width=sprite.spriteReference.width;
    let height=sprite.spriteReference.height * sprite.scale;

    let leftBound=oldX-(width/OFFSET);
    let rightBound=oldX+(width/OFFSET);
    let upperBound=oldY-(height/OFFSET);
    let lowerBound=oldY+(height/OFFSET);

    if (leftBound<500 && newX<oldX) return true
    if (rightBound>this._mapService.MAX_X && newX>oldX) return true
    if (upperBound<1 && newY<oldY) return true
    if (lowerBound>this._mapService.MAX_Y && newY>oldY) return true
    return false
  }

  detectCollision(mySprite: Sprite, targetSprite: Sprite) {
    
    const OFFSET = 4;

    let width=mySprite.spriteReference.width;
    let height = mySprite.spriteReference.height;

    let leftBound = mySprite.x-(width/OFFSET);
    let rightBound = mySprite.x+(width/OFFSET);
    let upperBound = mySprite.y-(height/OFFSET);
    let lowerBound = mySprite.y+(height/OFFSET);

    width=targetSprite.spriteReference.width;
    height = targetSprite.spriteReference.height;

    let targetLeftBound = targetSprite.x-(width/OFFSET);
    let targetRightBound = targetSprite.x+(width/OFFSET);
    let targetUpperBound = targetSprite.y-(height/OFFSET);
    let targetLowerBound = targetSprite.y+(height/OFFSET);

    if((leftBound<targetLeftBound && targetLeftBound<rightBound)
    || (leftBound<targetRightBound && targetRightBound<rightBound)) {
      if ((upperBound<targetUpperBound && targetUpperBound<lowerBound)
      || (upperBound<targetLowerBound && targetLowerBound<lowerBound)) {
        if (targetSprite.type == 'prey') {
          targetSprite.scale=0
        }
        else if (targetSprite.type =='predator'){

        }
      }
    }

  }
}

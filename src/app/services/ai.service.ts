import { ChangeDetectorRef, Injectable } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { Sprite, SpriteService } from './sprite.service';

@Injectable({
  providedIn: 'root'
})
export class AiService {

  private _changeDirectionChance = .005;
  private _updateMovementXChance = .8;
  private _updateMovementYChance = .3;

  constructor() { }

  basicAI(sprite: Sprite) {
    if (sprite.type == 'object') return sprite;
    let chance = Math.random();
    if (chance < this._changeDirectionChance) {
      if (sprite.direction == 'right') {
        sprite.direction = 'left';
      }
      else {
        sprite.direction = 'right';
      }
    }
    chance = Math.random();
    if (chance < this._updateMovementXChance) {
      if (sprite.direction == 'right') {
        sprite.x = sprite.x + 3;
      }
      else {
        sprite.x = sprite.x - 3;
      }
    }
    chance = Math.random();
    if (chance < this._updateMovementYChance) {
      chance = Math.random();
      if (chance < .5) {
        sprite.y = sprite.y - 3;
      }
      else {
        sprite.y = sprite.y + 3;
      }
    }
    return sprite;
  }

  predetorAI(targetSprite: Sprite, myX: number, myY: number, range: number){
    let distance = Math.pow(myX-targetSprite.x, 2)+Math.pow(myY-targetSprite.y, 2)
    if (distance<=range){
      if (myX>=targetSprite.x){
        targetSprite.x=targetSprite.x+10
      }
      else {
        targetSprite.x=targetSprite.x-10
      }
      if (myY>=targetSprite.y){
        targetSprite.y=targetSprite.y+10
      }
      else {
        targetSprite.y=targetSprite.y-10
      }
    }
    else {
      return this.basicAI(targetSprite);
    }
    return targetSprite;
  }


  preyAI(targetSprite: Sprite, myX: number, myY: number, range: number){
    let distance = Math.pow(myX-targetSprite.x, 2)+Math.pow(myY-targetSprite.y, 2)
    if (distance<=range){
      if (myX>=targetSprite.x){
        targetSprite.x=targetSprite.x-10
      }
      else {
        targetSprite.x=targetSprite.x+10
      }
      if (myY>=targetSprite.y){
        targetSprite.y=targetSprite.y-10
      }
      else {
        targetSprite.y=targetSprite.y+10
      }

    }
    else {
      return this.basicAI(targetSprite);
    }
    return targetSprite;
  }
}







































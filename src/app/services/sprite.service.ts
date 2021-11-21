import { Injectable } from '@angular/core';
//import { ExecOptionsWithStringEncoding } from 'child_process';

export interface Sprite{
  name:string;
  visibility:boolean;
  state:number;
  direction: string;
  lastDirection:string;
  maxSpeed:number;
  acceleration:number;
  scale:number;
  playable:boolean;
  type: string;

  url:string;
  fps:number;
  x:number;
  y:number;

  rows:number;
  columns:number;

  spriteReference: any;

  leftFrames: number[];
  rightFrames: number[];
}

@Injectable({
  providedIn: 'root'
})
export class SpriteService {
  sprites:Sprite[]=[{
    name: 'archlich',
    visibility: true,
    state:0,
    direction: 'right',
    lastDirection:'right',
    maxSpeed: 10,
    acceleration: 0,
    scale:2,
    playable:true,
    type: 'self',
  
    url: '../assets/images/archlich_default.png',
    fps:9,
    x:500,
    y:500,
  
    rows:2,
    columns:7,
  
    spriteReference: null,
  
    leftFrames: [7,13],
    rightFrames: [0,6]
  
  
}
]

coin: Sprite={
  
    name: 'coin',
    visibility: true,
    state:0,
    direction: 'right',
    lastDirection:'right',
    maxSpeed: 10,
    acceleration: 0,
    scale:.4,
    playable:false,
    type: 'prey',
    
  
    url: '../assets/images/coin.png',
    fps:9,
    x:300,
    y:300,
  
    rows:1,
    columns:6,
  
    spriteReference: null,
  
    leftFrames: [0,6],
    rightFrames: [0,6]
  
  
  
}

galactaknight: Sprite={
    name: 'galacta_knight',
    visibility: true,
    state:0,
    direction: 'right',
    lastDirection:'right',
    maxSpeed: 10,
    acceleration: 0,
    scale:2,
    playable:true,
    type: 'predator',
  
    url: '../assets/images/galacta_knight.png',
    fps:9,
    x:400,
    y:400,
  
    rows:2,
    columns:5,
  
    spriteReference: null,
  
    leftFrames: [0,4],
    rightFrames: [5,9]
  
}

cloud: Sprite={
  name: 'cloud',
  visibility: true,
  state:0,
  direction: 'right',
  lastDirection:'right',
  maxSpeed: 10,
  acceleration: 0,
  scale:6,
  playable:true,
  type: 'object',

  url: '../assets/images/cloud.png',
  fps:9,
  x:400,
  y:400,

  rows:2,
  columns:2,

  spriteReference: null,

  leftFrames: [0,1],
  rightFrames: [2,3]

}

grass: Sprite={
  name: 'grass',
  visibility: true,
  state:0,
  direction: 'right',
  lastDirection:'right',
  maxSpeed: 10,
  acceleration: 0,
  scale:6,
  playable:true,
  type: 'object',

  url: '../assets/images/grass.png',
  fps:9,
  x:400,
  y:400,

  rows:2,
  columns:1,

  spriteReference: null,

  leftFrames: [0,1],
  rightFrames: [0,1]

}


  constructor() { }

  populateCoin(numberToPopulate: number) {
    for (let i=0; i<numberToPopulate; i++) {
      let coin = this.coin;
      coin.x = Math.floor(Math.random()* 100* i);
      coin.y = Math.floor(Math.random()* 100* i);
      this.sprites.push(JSON.parse(JSON.stringify(coin)))
    }

  
  
  }
  populateGalactaknight(numberToPopulate: number) {
    for (let i=0; i<numberToPopulate; i++) {
      let Galactaknight = this.galactaknight;
      Galactaknight.x = Math.floor(Math.random()* 1500* i+700);
      Galactaknight.y = Math.floor(Math.random()* 1500* i+200);
      this.sprites.push(JSON.parse(JSON.stringify(Galactaknight)))
    }
    //Math.random()* 1500* i
  }  
  populateCloud(numberToPopulate: number) {
    for (let i=0; i<numberToPopulate; i++) {
      let Cloud = this.cloud;
      Cloud.x = Math.floor(Math.random()* 2000* i);
      Cloud.y = 400;
      this.sprites.push(JSON.parse(JSON.stringify(Cloud)))
    }
  }  
  populateGrass(numberToPopulate: number) {
    for (let i=0; i<numberToPopulate; i++) {
      let Grass = this.grass;
      Grass.x = Math.floor(Math.random()* 1500* i);
      Grass.y = 1600+(Math.random()*100);
      this.sprites.push(JSON.parse(JSON.stringify(Grass)))
    }
  }  
}

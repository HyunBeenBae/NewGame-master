import { createInjectable } from '@angular/compiler/src/core';
import { Component, HostListener, OnInit } from '@angular/core';
import Two from '../assets/two.min.js'
import { AiService } from './services/ai.service';
import { CameraService } from './services/camera.service';
import { CollisionService } from './services/collision.service';
import { GameService } from './services/game.service';
import { MapService } from './services/map.service';
import { SpriteService } from './services/sprite.service';
import { Stage, StageService } from './services/stage.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'newgame';

  x: number = 500;
  y: number = 500;

  gameState: string = 'opening';
  gameStage: number = 0;
  stageData: Stage
  

  constructor(private _spriteService: SpriteService, private _gameService: GameService, private _cameraService: CameraService, private _aiService: AiService, private _mapService: MapService, private _collisionService: CollisionService, private _stageService: StageService) { }


  @HostListener('document:keydown', ['$event'])
  handleKey(event: KeyboardEvent) {

    if (this.gameState == 'gameover') {
      event.preventDefault();
      return;
    }
    console.log(this.y)
    if (event.key == 'ArrowRight') {
      this.x = this.x + 10;
      //this._spriteService.sprites[0].direction = 'right'
      event.preventDefault();
    }
    else if (event.key == 'ArrowLeft') {
      this.x = this.x - 10;
      this._spriteService.sprites[0].direction = 'left'
      event.preventDefault();
    }
    else if (event.key == 'ArrowUp') {
      this.y = this.y - 10;
      event.preventDefault();
    }
    else if (event.key == 'ArrowDown') {
      this.y = this.y + 10;

      event.preventDefault();
    }

  }
  ngOnInit() {
    let elem = document.getElementById('draw-shapes');

    let params = {
      width: this._mapService.MAX_X,
      height: this._mapService.MAX_Y
    };

    let two = new Two(params).appendTo(elem);



    document.addEventListener('click', ()=>{
      if (this.gameState == 'opening') {
        this._gameService.state = 'playing';
      }
      else if (this.gameState == 'gameover') {
        this._gameService.state = 'playing'
      }
      else if (this.gameState == 'gameclear') {
        this._gameService.state = 'playing'
      }
    });

    


    

    this._gameService.stateObservable.subscribe((value)=>{
      this.gameState=value;
      console.log(value)
      switch(value) {
        case 'opening':
          this._gameService.displayTitle(two)
          this._gameService.hideScore()
          break;
        case 'playing':
          this.initialize(two)
          this._gameService.hideTitle()
          this._gameService.initscore(two)
          break;
        case 'gameover':

          this._gameService.gameoverTitle(two)
          this._gameService.hideScore()
          break;
          case 'gameclear':

            this._gameService.displayGameClear(two, this.gameStage+1, this._stageService.stages.length)
            
            break;
      }

    });

    this._gameService.stageObserveable.subscribe((value)=>{
      this.gameStage = value;
      this.stageData = this._stageService.stages[this.gameStage]
      this.initialize(two)
    })
    
    

    

    two.bind('update', (framesPerSecond) => {
      if (this.gameState=='opening') {
        this._gameService.animateTitle()
        this.playing(two, true)
      }
      else if (this.gameState=='playing') {
        this.playing(two)
        
        
      }
      else if (this.gameState=='gameover') {
        
        this._gameService.animateTitle()


      }

    
    }).play();
  }
  initialize(two: any) {
    for (let i=this._spriteService.sprites.length-1; i>0; i--) {
      if (this._spriteService.sprites[i] && this._spriteService.sprites[i].spriteReference ) {
        this._spriteService.sprites[i].spriteReference.scale = 0
      }
      this._spriteService.sprites.splice(i,1);
    }

    this._spriteService.sprites[0].x = 200;
    this._spriteService.sprites[0].y = 200;
    this._spriteService.sprites[0].state = 0;
    if (this._spriteService.sprites[0].spriteReference) this._spriteService.sprites[0].spriteReference.scale = 0

    this.x = 200;
    this.y = 200;
    this._spriteService.populateCoin(this.stageData.numberOfPreys);
    this._spriteService.populateGalactaknight(this.stageData.numberOfPredators);
    this._spriteService.populateCloud(10)
    this._spriteService.populateGrass(10)

    this._mapService.init(two);
    
    

    for (let i = 0; i < this._spriteService.sprites.length; i++) {
      this._spriteService.sprites[i].spriteReference = two.makeSprite
        (this._spriteService.sprites[i].url,
          this._spriteService.sprites[i].x,
          this._spriteService.sprites[i].y,
          this._spriteService.sprites[i].columns,
          this._spriteService.sprites[i].rows,
          this._spriteService.sprites[i].fps,
          this._spriteService.sprites[i].lastDirection);
      this._spriteService.sprites[i].spriteReference.play(this._spriteService.sprites[i].rightFrames[0], this._spriteService.sprites[i].rightFrames[1]);
      this._spriteService.sprites[i].spriteReference.scale = this._spriteService.sprites[i].scale;

    }
  }
   playing(two: any, auto = false) {
    if (!auto) {

      


      if (!this._collisionService.detectBorder(this._spriteService.sprites[0],
        this._spriteService.sprites[0].x,
        this._spriteService.sprites[0].y, this.x, this.y)) {
        this._spriteService.sprites[0].spriteReference.translation.x = this.x;
        this._spriteService.sprites[0].x = this.x;
        this._spriteService.sprites[0].spriteReference.translation.y = this.y;
        this._spriteService.sprites[0].y = this.y;
        this._cameraService.zoomCamera(this.x, this.y);
      }
      else {
        this.x = this._spriteService.sprites[0].x
        this.y = this._spriteService.sprites[0].y
      }
    }

    for (let i = 0; i < this._spriteService.sprites.length; i++) {
      if (!this._spriteService.sprites[i])continue
      let oldX=this._spriteService.sprites[i]?.x
      let oldY=this._spriteService.sprites[i]?.y

      if (i > 0 || auto) {
        
        if (this._spriteService.sprites[i].type=='predator'){
          this._spriteService.sprites[i]=this._aiService.predetorAI(this._spriteService.sprites[i], this.x, this.y, this.stageData.rangeToTriggerBetterAI);
  
        }
        else {
          this._spriteService.sprites[i]=this._aiService.preyAI(this._spriteService.sprites[i], this.x, this.y, this.stageData.rangeToTriggerBetterAI);
        }

        if (!this._collisionService.detectBorder(this._spriteService.sprites[i], oldX, oldY, this._spriteService.sprites[i].x, this._spriteService.sprites[i].y)){
          this._spriteService.sprites[i].spriteReference.translation.x = this._spriteService.sprites[i].x;
          this._spriteService.sprites[i].spriteReference.translation.y = this._spriteService.sprites[i].y;
          this._spriteService.sprites[i].spriteReference.scale = this._spriteService.sprites[i].scale;
        }
        else{
          this._spriteService.sprites[i].x=oldX
          this._spriteService.sprites[i].y=oldY
        }
        if (!auto) this._collisionService.detectCollision(this._spriteService.sprites[0], this._spriteService.sprites[i]);
      }

      

      
      
      if (this._spriteService.sprites[i].direction != this._spriteService.sprites[i].lastDirection) {
        this._spriteService.sprites[i].lastDirection = this._spriteService.sprites[i].direction;
        if (this._spriteService.sprites[i].direction == 'right') {
          this._spriteService.sprites[i].spriteReference.play(this._spriteService.sprites[i].rightFrames[0],
            this._spriteService.sprites[i].rightFrames[1])
        }
        else {
          this._spriteService.sprites[i].spriteReference.play(this._spriteService.sprites[i].leftFrames[0],
            this._spriteService.sprites[i].leftFrames[1])
        }
      }
      
    }
    let numberOfCoins=0
    for (let sprite of this._spriteService.sprites){
      if (sprite.type=='prey' && sprite.spriteReference.scale>0) {
        numberOfCoins++
      }
      
    }
    if (numberOfCoins==0){
      this._gameService.state='gameclear'
      if (this._stageService.stages.length-1==this.gameStage){
        this._gameService.stage=0;
      }
      else {
        this._gameService.stage=this.gameStage+1;
      }

    }
    
    if (!auto) this._gameService.displayScore(two, this.x, this.y, numberOfCoins);
  }

}

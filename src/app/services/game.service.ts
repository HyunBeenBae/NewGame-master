import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import Two from '../../assets/two.min.js';
import { SpriteService } from "./sprite.service";

@Injectable({
    providedIn: 'root'
})
export class GameService {
    constructor(private _spriteService: SpriteService) {}
    private _coin : any;
    private _score: any
    private _defaultX: number = 1300
    private _defaultY: number = 20
    private _maxY: number = 330
    private _maxX: number = 3400

    private _scoreXOffset = 40
    private _scoreYOffset= 4

    public numberOfCoins = 15

    private _state = new BehaviorSubject<string>('opening')
    private _title
    private _subtitle
    private _increment = 0.02
    public stateObservable = this._state.asObservable()

    private _gameClear
    private _gameClear2
    
    private _stage = new BehaviorSubject<number>(0);
    public stageObserveable = this._stage.asObservable();

    get state() {
        return this._state.getValue()
    }
    set state(value) {
        this._state.next(value)
    
    }

    get stage(){
        return this._stage.getValue()
    }
    set stage(number) {
        this._stage.next(number)
    }

    displayTitle(two: any) {
        this._title = new Two.Text('Title', window.scrollX+(window.innerWidth/2), window.scrollY+(window.innerHeight/2)-50, 'normal')
        this._title.fill ='#ff0000'
        this._title.stroke = '#ff0000'
        this._title.scale = 11
        two.add(this._title);
        this._subtitle = new Two.Text('Click anywhere to begin', window.scrollX+(window.innerWidth/2), window.scrollY+(window.innerHeight/2)+50, 'normal')
        this._subtitle.fill ='#0000ff'
        this._subtitle.stroke = '#0000ff'
        this._subtitle.scale = 5
        two.add(this._subtitle);
    }
    gameoverTitle(two: any){
        this._title = new Two.Text('Game Over', window.scrollX+(window.innerWidth/2), window.scrollY+(window.innerHeight/2)-50, 'normal')
        this._title.fill ='#ff0000'
        this._title.stroke = '#ff0000'
        this._title.scale = 11
        two.add(this._title);
        this._subtitle = new Two.Text('Click anywhere to restart', window.scrollX+(window.innerWidth/2), window.scrollY+(window.innerHeight/2)+50, 'normal')
        this._subtitle.fill ='#0000ff'
        this._subtitle.stroke = '#0000ff'
        this._subtitle.scale = 5
        two.add(this._subtitle);
    }

    animateTitle(){
        if (this._title.scale>12) {
            this._increment=-0.02
        }
        else if (this._title.scale<10) {
            this._increment=0.02
        }
        this._title.scale=this._title.scale+this._increment
        this._subtitle.scale=this._subtitle.scale+this._increment
    }
    

    hideTitle(){
        this._title.scale=0
        this._subtitle.scale=0
        if (this._gameClear) this._gameClear.scale=0
        if (this._gameClear2) this._gameClear2.scale=0
    }

    

    initscore(two:any){
        this._coin = two.makeSprite(this._spriteService.coin.url,this._defaultX, this._defaultY, this._spriteService.coin.columns, this._spriteService.coin.rows, this._spriteService.coin.fps);
        this._coin.scale = .3;
        this._coin.play(0,0)
        this._score = new Two.Text('X'+this.numberOfCoins, this._defaultX+this._scoreXOffset, this._defaultY+this._scoreYOffset, 'normal')
        this._score.fill = '#ddddFF';
        this._score.stroke = '#FFFFFF';
        this._score.scale = 1.75;
        two.add(this._score);
    }

    displayScore(two:any, x:number, y:number, num:number){
        y=y-380
        if (y<this._defaultY) y=this._defaultY
        if (y>this._maxY) y=this._maxY

        x=x+850 
        if (x<this._defaultX) x=this._defaultX
        if (x>this._maxX) x=this._maxX
        this._coin.translation.x=x
        this._coin.translation.y=y
        this._score.translation.x = x+this._scoreXOffset
        this._score.translation.y = y+this._scoreYOffset
        this._score.value = 'X '+num
    }
    hideScore(){
        if (this._coin) this._coin.scale = 0;
        if (this._score) this._score.scale = 0;
    }

    displayGameClear(two: any, stage:number, maxStage: number) {
        this._gameClear = new Two.Text('Game Clear', window.scrollX+(window.innerWidth/2), window.scrollY+(window.innerHeight/2)-50, 'normal')
        this._gameClear.fill = 'yellow'
        this._gameClear.stroke = 'orange'
        this._gameClear.scale = 11
        two.add(this._gameClear);
        let textToSay=''
        if (stage+1<=maxStage) {
            textToSay='Click Anywhere to advance to stage '+(stage+1);
        }
        else {
            textToSay='Click Anywhere to Restart'
        }

        this._gameClear2 = new Two.Text(textToSay, window.scrollX+(window.innerWidth/2), window.scrollY+(window.innerHeight/2)+50, 'normal')
        this._gameClear2.fill = 'orange'
        this._gameClear2.stroke = 'yellow'
        this._gameClear2.scale = 5
        two.add(this._gameClear2);
    }

}



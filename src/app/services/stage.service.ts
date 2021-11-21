import { Injectable } from "@angular/core";

export interface Stage {
    level: number;
    speedFactor: number;
    numberOfPreys: number;
    numberOfPredators: number;
    chanceOfBetterAI: number;
    rangeToTriggerBetterAI: number;
}

@Injectable ({providedIn: 'root'})
export class StageService {
    public stages: Stage[] = [
        {
        level: 1,
        speedFactor: 1,
        numberOfPreys: 5,
        numberOfPredators: 1,
        chanceOfBetterAI: 0,
        rangeToTriggerBetterAI: 80
        
        },
        {
        level: 2,
        speedFactor: 1.2,
        numberOfPreys: 10,
        numberOfPredators: 2,
        chanceOfBetterAI: 0.2,
        rangeToTriggerBetterAI: 150
        },
        {
        level: 3,
        speedFactor: 1.3,
        numberOfPreys: 15,
        numberOfPredators: 2,
        chanceOfBetterAI: 0.3,
        rangeToTriggerBetterAI: 200
        },
    ]
}
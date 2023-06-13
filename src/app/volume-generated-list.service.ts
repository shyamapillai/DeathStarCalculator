import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VolumeGeneratedListService {
  private enemyPlanetVolumeList: any[] = [];
  constructor() { }

  getEnemyPlanetList(): any[] {
    return this.enemyPlanetVolumeList;
  }

  setEnemyPlanetList(data: any[]): void {
    data.forEach(el => {
      this.enemyPlanetVolumeList.push(el);
    });
  }
}

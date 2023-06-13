//Component load potential rebel enemies list for the user to select
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SwapidevService } from '../swapidev.service';

@Component({
  selector: 'app-rebel-enemies-list',
  templateUrl: './rebel-enemies-list.component.html',
  styleUrls: ['./rebel-enemies-list.component.scss']
})
export class RebelEnemiesListComponent implements OnInit {

  constructor(private swapidev: SwapidevService) { }

  enemiesSuggestions: any = [];
  enemiesList: any = [];
  selectedEnemies: any = [];
  @Output() arrayEmitter = new EventEmitter<any[]>();
  enemyName: string = '';

  ngOnInit() {
    this.swapidev.getPersonData().subscribe(response => {
      this.enemiesList = response.results;
    }, error => {
      console.log(error);
    });
  }

  searchEnemies() {
    this.enemiesSuggestions = this.enemiesList;
    if (this.enemyName.length >= 2) {
      this.enemiesSuggestions = this.getMatchingNames(this.enemyName);
    } else {
      this.enemiesSuggestions = [];
    }
  }

  private getMatchingNames(personName: string): string[] {
    return this.enemiesSuggestions.filter((enemy: any) => {
      const propertyValue: any = enemy.name.toLowerCase();
      const searchValue = personName.toLowerCase();
      return propertyValue.includes(searchValue);
    }
    );
  }

  addToEnemiesList(event: Event) {
    this.selectedEnemies.push(event);
    this.arrayEmitter.emit(this.selectedEnemies);
  }
}

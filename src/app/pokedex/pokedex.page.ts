import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from '../services/apiservice.service';

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.page.html',
  styleUrls: ['./pokedex.page.scss'],
})
export class PokedexPage implements OnInit {
  offset: number = 0;
  searchText: string = '';
  headerVisible: boolean = false;
  pokemon:Object[] = [];

  constructor(private service: ApiserviceService){ }

  ngOnInit() {
  }

  loadPokemons(loadMore = false){
    if(loadMore){
      this.offset += 25;
    }
    this.service.getPokedex(this.offset)
      .subscribe((res: any) => {
        this.pokemon=[...this.pokemon, ...res];      
  }
  )}
}
import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiserviceService } from '../services/apiservice.service';
import { IonInfiniteScroll } from '@ionic/angular';
import { pipe } from 'rxjs';

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.page.html',
  styleUrls: ['./pokedex.page.scss'],
})
export class PokedexPage implements OnInit {
  offset = 0;
  pokemon:any;
  detail:any;
  loaded: boolean = false;
  types: string[] = ['Normal', 'Fire', 'Water', 'Electric', 'Grass', 'Ice', 'Fighting', 'Poison', 'Ground', 'Flying', 'Psychic', 'Bug', 'Rock', 'Ghost', 'Dragon'];

  @ViewChild(IonInfiniteScroll) infinite: IonInfiniteScroll | undefined;

  constructor(private service: ApiserviceService){ }

  ngOnInit() {
    this.loadPokemons();
  }
  // On start loadPokemons
  loadPokemons(loadMore = false, event?: { target: { complete: () => void; }; } | undefined) {
    if (loadMore) {
      this.offset += 25;
    }

    this.service.getPokedex(this.offset).subscribe((res: any) => {
      this.pokemon = res;
      this.loaded = true;
      console.log('pok', this.pokemon);

      if (event) {
        event.target.complete();
      }

      // Optional
      if (this.offset == 125 && this.infinite != null) {
        this.infinite.disabled = true;
      }
    });
  }
  onSearchChange(e: any) {
    let value = e.detail.value;

    if (value == '') {
      this.offset = 0;
      this.loadPokemons();
      return;
    }
    console.log('called');
    this.service.findPokemon(value)
      console.log('called2'); 
      console.log("pokemon", this.pokemon);
      this.loaded = false;
    (err: any) => {
      console.log('err', err);
      this.pokemon = [];
    };
  }
}
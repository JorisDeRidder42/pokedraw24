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

    this.service.findPokemon(value).subscribe(res => {
      this.pokemon = [res];
      this.loaded = false;
    }, (err: any) => {
      console.log('err', err);
      this.pokemon = [];
    });
  }
}
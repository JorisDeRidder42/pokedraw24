import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiserviceService } from '../services/apiservice.service';
import { IonInfiniteScroll } from '@ionic/angular';

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.page.html',
  styleUrls: ['./pokedex.page.scss'],
})
export class PokedexPage implements OnInit {
  offset: number = 0;
  pokemon:any;
  loaded: boolean = false;

  @ViewChild(IonInfiniteScroll) infinite: IonInfiniteScroll | undefined;

  constructor(private service: ApiserviceService){ }

  ngOnInit() {
    this.loadPokemons();
  }
  // On start loadPokemons
  loadPokemons(loadMore = false, event?: any) {
    if (loadMore) {
      this.offset += 25;
    }
    this.service.getPokedex(this.offset)
    .subscribe((res: any) => {
      this.pokemon = [...res.results];
      console.log('pok', this.pokemon)
      this.loaded = true;
  
      if (event) {
        event.target.complete();
      }

      // Optional
      if (this.offset == 125 && this.infinite != null) {
        this.infinite.disabled = true;
      }
    });
  }
}
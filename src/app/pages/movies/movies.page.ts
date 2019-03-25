import { Component, OnInit } from '@angular/core';
import { MoviedbService } from 'src/app/services/moviedb.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.page.html',
  styleUrls: ['./movies.page.scss'],
})
export class MoviesPage implements OnInit {

  constructor(private mDBService: MoviedbService) { }

  //MÉTODO É EXECUTADO QUANDO SE ENTRA NA PÁGINA
  ngOnInit() {
    this.topRatedMovies()
  }

  topRatedMovies(){
    this.mDBService.getTopRatedMovies().subscribe(
      data=>{
        //page a resposta
        let resposta = (data as any)._body;
        //converte para obj JSON
        resposta = JSON.parse(resposta);
        console.log(resposta);
      },
      error=>{
        console.log(error);
      }
    ).add();    
    }

}

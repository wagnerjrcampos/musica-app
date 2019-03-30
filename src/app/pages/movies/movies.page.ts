import { Component, OnInit } from '@angular/core';
import { MoviedbService } from 'src/app/services/moviedb.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.page.html',
  styleUrls: ['./movies.page.scss'],
})
export class MoviesPage implements OnInit {

  movies = [];
  private arrayCategory=  ["popular", "top_rated", "become", "upcoming"];
  private movie_name:string;

  constructor(private mDBService: MoviedbService, private LoadingController: LoadingController) { }
  //MÉTODO É EXECUTADO QUANDO SE ENTRA NA PÁGINA
  ngOnInit() {
    this.consultaMovies()
  }

  async consultaMovies(index?){
    //verifica se o parametro index está setado, senão ele um valor random
    index = (typeof index === 'undifined') ? 3 : Math.floor(Math.random() * 4);
    let param = (typeof this.movie_name === 'undefined') ? `movie/${this.arrayCategory[index]}?`: `search/movie?query=${this.movie_name}&include_adult=false&`; 
    //loading..
    const loading = await this.LoadingController.create({
      message: 'Carreagando filmes...'
    });
    //exibir a caixa de dialogo
    await loading.present();


    await this.mDBService.getMovies(param).subscribe(
      data=>{
        //page a resposta
        //let resposta = (data as any)._body;
        //converte para obj JSON
        //resposta = JSON.parse(resposta);
        //atribui a resposta do array de filmes
        this.movies = data;
        // TESTA console.log(resposta);
        loading.dismiss();
      },
      error=>{
        console.log(error);
        loading.dismiss();
      }
    ).add();    
    }
    doRefresh(event) {
      this.consultaMovies('Caiu');
      setTimeout(() => {
        event.target.complete();
      }, 2000);
    }
}

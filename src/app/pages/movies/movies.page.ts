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
  
  private param:string = "popular";

  constructor(private mDBService: MoviedbService, private LoadingController: LoadingController) { }

  //MÉTODO É EXECUTADO QUANDO SE ENTRA NA PÁGINA
  ngOnInit() {
    this.consultaMovies()
  }

  async consultaMovies(){
    //loading..

    const loading = await this.LoadingController.create({
      message: 'Carreagando filmes...'
    });
    //exibir a caixa de dialogo
    await loading.present();


    await this.mDBService.getMovies(this.param).subscribe(
      data=>{
        //page a resposta
        let resposta = (data as any)._body;
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

    exibeMsg(id:string) {
      console.log(`O id do filme clicado é: ${id}`);
    }

}

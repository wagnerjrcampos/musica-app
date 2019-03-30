import { Component, OnInit } from '@angular/core';
import { MoviedbService } from 'src/app/services/moviedb.service';
import { LoadingController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-movies-details',
  templateUrl: './movies-details.page.html',
  styleUrls: ['./movies-details.page.scss'],
})
export class MoviesDetailsPage implements OnInit {

  private movie = {};

  constructor(private mDBService: MoviedbService,private LoadingController: LoadingController, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.consultaMovies();
  }

  async consultaMovies(){
    //loading..

    const loading = await this.LoadingController.create({
      message: 'Carreagando filme...'
    });
    //exibir a caixa de dialogo
    await loading.present();

    //resgatar o id passado 'datails/:id'
    await this.mDBService.getMovies(this.route.snapshot.paramMap.get('id')).subscribe(
      data=>{
        this.movie = data;
        console.log(this.movie);
        loading.dismiss();
      },
      error=>{
        console.log(error);
        loading.dismiss();
      }
    ).add();    
    }
    exibeMsg(id:string){
      console.log(`O id do filme clicado é: ${id}`);
    }

}

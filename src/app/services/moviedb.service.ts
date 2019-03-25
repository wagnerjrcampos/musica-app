import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class MoviedbService {
  
  private URL_API:string = "https://api.themoviedb.org/3";
  private API_KEY:string = "e8f29ddf2a67148462eb121466654690";
  
  constructor(private http: Http) { }

  //retorna a lista de top rating Movies
  getTopRatedMovies() {
    //retorna o resultado baseado na URL de requisição
    return this.http.get(`${this.URL_API}/movie/top_rated?api_key=${this.API_KEY}`)
  }
  
  //https://api.themoviedb.org/3/movie/top_rated?api_key=<<api_key>>
          //url              //versao  //uri     //Query string 
} 

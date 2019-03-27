import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

const httpOption = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class MoviedbService {
  
  private URL_API:string = "https://api.themoviedb.org/3";
  private API_KEY:string = "e8f29ddf2a67148462eb121466654690";
  
  constructor(private http: HttpClient) { }

  //retorna a lista de top rating Movies
  //getTopRatedMovies() {
    //retorna o resultado baseado na URL de requisição
    //return this.http.get(`${this.URL_API}/movie/top_rated?api_key=${this.API_KEY}`)
  //}
  
  //função (método) terá um retorno do tipo Observable
  getMovies(param:string):Observable<any> {
    const url = `${this.URL_API}/movie/${param}?api_key=${this.API_KEY}`
    return this.http.get<any>(url).pipe(
      tap(_ => console.log(`O parametro requisitado foi: ${param}`)),
      catchError(this.handleError<any>(`Falha no getMovies parametro =${param}`))
    );
  }

  //método privado para exibir o erro
  private handleError<T>(Operator = 'operation', result?: T){
    return (error: any):Observable<T> => {
      console.error(error); //log do erro na console

      //mantem o app rodando por ter retornado o obj vazio
      return of(result as T);
    };
  }
} 
 //https://api.themoviedb.org/3/movie/top_rated?api_key=<<api_key>>
          //url              //versao  //uri     //Query string 
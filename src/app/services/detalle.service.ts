import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {ApiResponse,PeliculaDetalle} from '../model/pelicula';
import {environment} from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class DetalleService {
  private readonly baseUrl = environment.baseUrl;
  private readonly apiKey = environment.apiKey;

  private readonly baseIdUrl = environment.baseIdUrl;
  private accessToken = environment.accessToken;

  constructor(private _httpClient: HttpClient) { 
    
  }

  public ObtenerPeliculasService(): Observable<ApiResponse> {
    return this._httpClient.get<ApiResponse>(
      `${this.baseUrl}/movie/popular?api_key=${this.apiKey}&language=es-ES&page=1`
    );
  }

  public ObtenerPeliculaPorIDService(id:number):Observable<PeliculaDetalle>{
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.accessToken}`,
      'Content-Type': 'application/json'
    });
    return this._httpClient.get<PeliculaDetalle>(
      `${this.baseIdUrl}/${id}?language=es-ES`,
      {headers}
    );

  }
}
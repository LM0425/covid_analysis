import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConexionService {
  url="http://34.133.75.235:80";

  constructor(private http: HttpClient) { }

  public testPost(body:any){
    let url=this.url+"/reporte"
     return this.http.post(url,body)
  }
}

//BEGIN LICENSE BLOCK 
//Interneuron Terminus

//Copyright(C) 2025  Interneuron Limited

//This program is free software: you can redistribute it and/or modify
//it under the terms of the GNU General Public License as published by
//the Free Software Foundation, either version 3 of the License, or
//(at your option) any later version.

//This program is distributed in the hope that it will be useful,
//but WITHOUT ANY WARRANTY; without even the implied warranty of
//MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.

//See the
//GNU General Public License for more details.

//You should have received a copy of the GNU General Public License
//along with this program.If not, see<http://www.gnu.org/licenses/>.
//END LICENSE BLOCK 
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  public GetRequest(url: string, options: any){
    return this.http.get(url, options)
    .toPromise()
    .catch((error: HttpErrorResponse) => {
      throw error;
    });
  }

  public PutRequest(url: string, body: any, options: any){
    return this.http.put(url, body, options)
    .toPromise()
    .catch((error: HttpErrorResponse) => {
      throw error;
    });
  }

  public PostRequest(url: string, body: any, options: any){
    return this.http.post(url, body, options)
    .toPromise()
    .catch((error: HttpErrorResponse) => {
      throw error;
    });
  }

  public DeleteRequest(url: string, options: any){
    return this.http.delete(url, options)
    .toPromise()
    .catch((error: HttpErrorResponse) => {
      throw error;
    });
  }
}

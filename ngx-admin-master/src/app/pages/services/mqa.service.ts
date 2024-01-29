import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { resolve } from 'dns';

@Injectable({
  providedIn: 'root'
})
export class MqaService {

  constructor(
    private http: HttpClient,
    ) { }

    getCatalogue(id: String): any {
      return new Promise((resolve,reject)=>{
        this.http.get('http://localhost:8000/get/catalogue/'+id, {
          headers: {
            'Content-Type':  'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Methods': 'GET',
          },
        },
        
        )
        .subscribe((data: any) => {
          resolve(data)
          return data
        }, error => {
          reject(error.message)
          console.log(error);
        })
      })
    }
    


    
    getFiltered(id: String, jsonData : Object): any {
      return new Promise((resolve,reject)=>{
        this.http.post('http://localhost:8000/get/catalogue/'+id, jsonData, {
          headers: {
            'Content-Type':  'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Methods': 'POST',
          },
        },
        
        )
        .subscribe((data: any) => {
          resolve(data)
          return data
        }, error => {
          reject(error.message)
          console.log(error);
        })
      })
    }

    async submitAnalisysJSON(id : String, url: String, xml: String): Promise<any> {
      let json
      if(url == "" && id != ""){
        json = {
          "id": id,
          "file_url": xml,
        }
      } else if (url != "" && id == ""){
        json = {
          "url": url,
          "file_url": xml,
        }
      } else if (url != "" && id != ""){
        json = {
          "id": id,
          "url": url,
          "file_url": xml,
        }
      } else {
        json = {
          "file_url": xml,
        }
      }
      return new Promise((resolve,reject)=>{
        this.http.post('http://localhost:8000/submit', json, {
          headers: {
            'Content-Type':  'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Methods': 'POST',
          },
        },
        
        )
        .subscribe((data: any) => {
          resolve(data)
          return data
        }, error => {
          reject(error.message)
          console.log(error);
        })
      })
    }
}

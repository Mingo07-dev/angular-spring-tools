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
        this.http.get('https://platform.beopen-dep.it/mqa-validator/get/catalogue/'+id, {
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
        this.http.post('https://platform.beopen-dep.it/mqa-validator/get/catalogue/'+id, jsonData, {
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

    async submitAnalisysJSON(id : String, url: String): Promise<any> {
      let xml = await  new Promise(async(resolve,reject)=>{
      this.http.get("/assets/interstat_rdf.json").subscribe((data: any) => {
          resolve(data.xml)
        })
      })
      return new Promise((resolve,reject)=>{
        this.http.post('https://platform.beopen-dep.it/mqa-validator/submit', {
            "id": id,
            "url": url,
            "xml": xml,
          }, {
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


    async getXML(): Promise<any> {
      let xml = await  new Promise(async(resolve,reject)=>{
      this.http.get("/assets/interstat_rdf.json").subscribe((data: any) => {
          resolve(data.xml)
        })
      })
      return xml
    }
}

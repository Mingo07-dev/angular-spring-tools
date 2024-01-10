import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IdraPageService {

  constructor(
    private http: HttpClient,
    ) { }

    logIn(jsonData : Object): any {
      return new Promise((resolve,reject)=>{
        this.http.post('http://localhost:8082/api/0.1/idra/login', {
          jsonData
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


    getCats(): any {
      return new Promise((resolve,reject)=>{
        this.http.get('http://localhost:8082/api/0.1/idra/get/catalogues', {
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
    
    measurement(): any {
      let json = {"id":55,"name":"INTERSTAT","host":"https://framework.cef-interstat.eu/graphdb/repositories/","homepage":"https://framework.cef-interstat.eu/graphdb/","nodeType":"SPARQL","publisherName":"INTERSTAT CEF Project","datasetCount":15,"nodeState":"ONLINE","lastUpdateDate":"2023-06-22T16:11:52Z","description":"Data produced within INTERSTAT CEF Project","location":"","locationDescription":"","isActive":true,"country":"","category":"Municipality","isFederatedInCb":false}
      this.http.post('http://localhost:8082/api/0.1/idra/catalogue/add', {
        json
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
        return data
      }, error => {
        console.log(error);
      })
    }

// {"id":null,"name":"Comune di Pisa","publisherName":"Comune di Pisa","nameInvalid":false,"pubNameInvalid":false,"nodeType":"SPOD",
// "federationLevel":"LEVEL_2","host":"https://opendata.comune.pisa.it/content/api","hostInvalid":false,
// "homepage":"http://opendata.comune.pisa.it/","homepageInvalid":false,"refreshPeriod":"3600","description":"Comune di Pisa",
// "APIKey":"","location":"","locationDescription":"","dcatProfile":"","image":
// {"imageData":"data:image/png;base64,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"},
// "sitemap":{},"dumpURL":"","dumpFilePath":null,"dumpString":"","country":"IT","category":"Municipality","isActive":true,"additionalConfig":{}}

    addCatalogue(json : Object) : any{
      return new Promise((resolve,reject)=>{
        this.http.post('http://localhost:8082/api/0.1/idra/catalogue/add', {
          json
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

    search(params : String): any {
      return new Promise((resolve,reject)=>{
        this.http.post('http://localhost:8082/api/0.1/idra/search', {
          params
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

    getDatabase(id_DB : String): any {
      return new Promise((resolve,reject)=>{
        this.http.post('http://localhost:8082/api/0.1/idra/get/dataset', {
          id_DB
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
}

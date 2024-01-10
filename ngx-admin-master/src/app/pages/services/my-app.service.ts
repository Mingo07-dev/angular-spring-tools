import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class MyAppService {

  constructor(
    private http: HttpClient,
    ) { }

  getContextInformation(): any {
    return new Promise((resolve,reject)=>{
      this.http.get('http://localhost:8082/api/0.1/get/context/information', { 
        headers: {
          'Content-Type':  'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Access-Control-Allow-Methods': 'GET',
        },
        responseType: 'json'
      })
      .subscribe((data: any) => {
        // console.log(JSON.stringify (data))
        resolve(data)
      }, error => {
        console.log(error.message);
        reject(error)
      })
    })
  }

  createBuildingEntity(jsonData : Object): any {
    return new Promise((resolve,reject)=>{
      this.http.post('http://localhost:8082/api/0.1/post/context/information', {
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

  subscribeToEntity(entity : String, attrs: String[]): any{
    return new Promise((resolve,reject)=>{
      this.http.post('http://localhost:8082/api/0.1/post/subscribe/entity',{
        entity,
        attrs
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
        reject(error)
        console.log(error.message);
      })
    })
  }

  getNotifications(): any{
    return new Promise((resolve,reject)=>{
      this.http.get('http://localhost:8082/api/0.1/get/notifications', {
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
        reject(error)
        console.log(error.message);
      })
    }
    )}


}

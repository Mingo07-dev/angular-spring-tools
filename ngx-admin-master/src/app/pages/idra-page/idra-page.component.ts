import { Component, OnInit } from '@angular/core';
import { IdraPageService } from '../services/idra-page.service';

@Component({
  selector: 'ngx-idra-page',
  templateUrl: './idra-page.component.html',
  styleUrls: ['./idra-page.component.scss']
})
export class IdraPageComponent implements OnInit {

  constructor(
    private idraService : IdraPageService,
  ) { 
    logged: false
  }

  ngOnInit(): void {
    this.getAlltags();
  }
  
  addCatalogue(name : String,publisherName : String,country : String,category : String,description : String,homepage : String,host : String,nodeType : String,active : String,refreshPeriod : string) : any{
    let jsonStrano = `-----------------------------24231923511176544601214719823
    Content-Disposition: form-data; name="dump"
    
    
    -----------------------------24231923511176544601214719823
    Content-Disposition: form-data; name="node"
    {
      "name": `+name+`,
      "host": `+homepage+`,
      "nodeType": `+nodeType+`,
      "federationLevel": "LEVEL_2",
      "refreshPeriod": `+parseInt(refreshPeriod)+`,
      "id": null,
      "APIKey": `+host+`,
      "publisherName": `+publisherName+`,
      "description": `+description+`,
      "isActive": true,
      "country": `+country+`,
      "category": `+category+`
    }
    -----------------------------24231923511176544601214719823--`
    
    let json =  {
      "name": name,
      "host": homepage,
      "nodeType": nodeType,
      "federationLevel": "LEVEL_2",
      "refreshPeriod": parseInt(refreshPeriod),
      "id": null,
      "APIKey": host,
      "publisherName": publisherName,
      "description": description,
      "isActive": true,
      "country": country,
      "category": category
    }
    console.log(jsonStrano)
    this.idraService.addCatalogue(json);
  }

  async getAlltags(){
    let res = await this.searchQuery(0);
    let resTag = document.getElementById('allTag')
    let tags = '';
    res?.facets.forEach(element => {
      element?.values?.forEach(el => {
        tags += el?.search_value + '<br>';
      });
    });
    resTag.innerHTML = tags;

  }
  
  measure(){
    this.idraService.measurement();
  }


  login(userName: any, passwd: any){
    let res = this.idraService.logIn({username: userName, password: passwd})
    this.getAlltags();
    console.log(res)
  }
  
  async searchQuery(searchParams: any){
    let res = await this.idraService.search(searchParams)
    let resTag = document.getElementById('resTag')
    let ids = '';
    res?.results.forEach(element => {
      ids += element.id + '<br>';
    });
    // resTag.innerHTML = JSON.stringify(res?.results)
    resTag.innerHTML = ids;
    console.log(res)
    return res;
  }

  async getDataDatabase(idDatabase: any){
    let res = await this.idraService.getDatabase(idDatabase)
    let resDS = document.getElementById('resDS')
    let jsonformatted = JSON.stringify(res, null, "\t")
    resDS.innerHTML = jsonformatted
    console.log(jsonformatted)
  }

}

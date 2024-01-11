import { Component, OnInit } from '@angular/core';
import { MqaService } from '../services/mqa.service';

@Component({
  selector: 'ngx-mqa',
  templateUrl: './mqa.component.html',
  styleUrls: ['./mqa.component.scss']
})
export class MqaComponent implements OnInit {

  constructor(
    private mqaService : MqaService,
  ) { 
  }

  ngOnInit(): void {
    this.mqaService.getXML().then((data)=>{
      let input = <HTMLInputElement>document.getElementById("RDF");
      input.value = data;
    })
  }

  async getCatalogue(id : String) : Promise<any>{
    let response = await this.mqaService.getCatalogue("659fd47c58771f020b83e39d");
    document.getElementById("response").innerHTML = JSON.stringify(response, null, "\t");
  }

  async getFiltered(id : String, filters : String) : Promise<any>{
    let json =  {
      "parameters": filters,
    }
    let response = await this.mqaService.getFiltered("659fd47c58771f020b83e39d",json);
    document.getElementById("response").innerHTML = JSON.stringify(response, null, "\t");
  }

  async submitAnalisysJSON(id : String, url : String, xml : String) : Promise<any>{
    //xml will be added to the body of the request from a local json file because it is too long to be added here
    let response = await this.mqaService.submitAnalisysJSON("659fd47c58771f020b83e39d",url);
    document.getElementById("response").innerHTML = JSON.stringify(response, null, "\t");
  }


}

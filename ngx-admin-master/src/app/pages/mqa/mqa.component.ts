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
  }

  async getCatalogue(id : String) : Promise<any>{
    let response = await this.mqaService.getCatalogue(id);
    document.getElementById("response").innerHTML = JSON.stringify(response, null, "\t");
  }

  async getFiltered(id : String, filters : String) : Promise<any>{
    let json =  {
      "parameters": filters,
    }
    let response = await this.mqaService.getFiltered(id,json);
    document.getElementById("response").innerHTML = JSON.stringify(response, null, "\t");
  }

  async submitAnalisysJSON(id : String, url : String, xml : String) : Promise<any>{
    //xml will be added to the body of the request from a local json file because it is too long to be added here
    let response = await this.mqaService.submitAnalisysJSON(id,url);
    document.getElementById("response").innerHTML = JSON.stringify(response, null, "\t");
  }


}

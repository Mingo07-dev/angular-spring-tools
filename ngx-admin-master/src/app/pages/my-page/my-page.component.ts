import { Component, OnInit } from '@angular/core';
import { MyAppService } from '../services/my-app.service';
import * as L from "leaflet";
import { FormLayoutsComponent } from '../forms/form-layouts/form-layouts.component';
import { NbDialogService } from '@nebular/theme';
import { ShowcaseDialogComponent } from '../modal-overlays/dialog/showcase-dialog/showcase-dialog.component';

@Component({
  selector: 'ngx-my-page',
  templateUrl: './my-page.component.html',
  styleUrls: ['./my-page.component.scss']
})
export class MyPageComponent implements OnInit {

  constructor(
    private myAppServices : MyAppService,
    private dialogService: NbDialogService
  ) { }

  async ngOnInit(): Promise<void> {
    let entities = await this.myAppServices.getContextInformation()
    console.log(entities)
    var map = L.map('map').setView([52.5547, 13.3986], 13);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
    map.eachLayer((e)=>{
      e.bindPopup
    })
    entities.forEach( (element) => {
      let marker = L.marker([element?.location?.value?.coordinates[1], element?.location?.value?.coordinates[0]]);
      if(element?.temperature?.value > 35){
        marker.setIcon(
          L.icon({
            iconSize: [25, 41],
            iconAnchor: [10, 41],
            popupAnchor: [2, -40],
            // specify the path here
            iconUrl:
              "https://www.svgrepo.com/download/292182/pointer-pin.svg",
          })
        )
      } else{
        marker.setIcon(
          L.icon({
            iconSize: [25, 41],
            iconAnchor: [10, 41],
            popupAnchor: [2, -40],
            // specify the path here
            iconUrl:
              "https://www.svgrepo.com/download/292085/pointer-map-pointer.svg",
          })
        )
      }
      
      // .temperature.value
      if(element?.temperature?.value != null){
        marker.bindPopup("<b>"+element?.description?.value+"</b><br>"+element?.type+"<br><br>"+element?.temperature?.value+"<br><button id="+element?.id+">Subscribe</button>");
        marker.addEventListener('click',()=>{
          let button = document.getElementById(element?.id);
          if(marker.isPopupOpen() && button != null){
            button.addEventListener('click', ()=>{
              let attrs = ["temperature", "location"]
              this.subscribeEntity(element.id, attrs, element?.description?.value, element?.type, element?.temperature?.value, map, element?.location?.value?.coordinates[1], element?.location?.value?.coordinates[0], marker)
            })
          }
        })
        marker.getPopup().addEventListener('remove', ()=>{
          let button = document.getElementById(element?.id);
          if(!marker.isPopupOpen() && button != null){
            button.removeAllListeners('click');
          }
        })
      }else{
        marker.bindPopup("<b>"+element?.description?.value+"</b><br>"+element?.type+"<br>");
      }

      marker.addTo(map);
    });
    await this.getNotified(map);
    setInterval( async () => {await this.getNotified(map)}, 10000); 
    
  }

  async createEntity(value: string): Promise<any> {
    let jsonData = JSON.parse(value)
    let response = await this.myAppServices.createBuildingEntity(jsonData);
    if(response == true){
      this.dialogService.open(ShowcaseDialogComponent, {
        context: {
          title: 'Entità aggiunta',
        },
      });
    } else{
      this.dialogService.open(ShowcaseDialogComponent, {
        context: {
          title: 'Entità non aggiunta',
        },
      });
    }
  }
  
  async subscribeEntity(entity_id: string, attrs: String[], description: String, type: String, temperature: number, map: any, lat: any, lang: any, marker_old: any) : Promise<any>{
    let response = await this.myAppServices.subscribeToEntity(entity_id,attrs);
    console.log(response)
    if(response == true){
      marker_old.remove()

      let marker_new = L.marker([lat, lang]);
      if(temperature > 35){
        marker_new.setIcon(
          L.icon({
            iconSize: [25, 41],
            iconAnchor: [10, 41],
            popupAnchor: [2, -40],
            // specify the path here
            iconUrl:
              "https://www.svgrepo.com/download/292182/pointer-pin.svg",
          })
        )
      } else{
        marker_new.setIcon(
          L.icon({
            iconSize: [25, 41],
            iconAnchor: [10, 41],
            popupAnchor: [2, -40],
            // specify the path here
            iconUrl:
              "https://www.svgrepo.com/download/292085/pointer-map-pointer.svg",
          })
        )
      }
      
      marker_new.bindPopup("<b>"+description+"</b><br>"+type+"<br><br>"+temperature+"<br><button id="+'un'+entity_id+">Unsubscribe</span>");
      marker_new.addEventListener('click',()=>{
      let button = document.getElementById('un'+entity_id);
        if(marker_new.isPopupOpen() && button != null){

          button.addEventListener('click', ()=>{
            this.unsubscribeEntity('1')
          })
        }
      })
      marker_new.getPopup().addEventListener('remove', ()=>{
        let button = document.getElementById('un'+entity_id);
        if(!marker_new.isPopupOpen() && button != null){
          button.removeAllListeners('click');
        }
      })
      marker_new.addTo(map);
    }
  }

  unsubscribeEntity(id: String){
    console.log(id)
    return id
  }

  async getNotified(map: any): Promise<any> {
    let response = await this.myAppServices.getNotifications();
    response.forEach((element : any) => {
      console.log(element)
      map.eachLayer((e:any)=>{
        if(e.options.icon != null && e._latlng.lng == element.data[0].location.value.coordinates[0] && e._latlng.lat == element.data[0].location.value.coordinates[1]){
          e.bindPopup("<b>"+element?.data[0]?.description?.value+"</b><br>"+element?.data[0]?.type+"<br><br>"+element?.data[0]?.temperature?.value+"<br><button id="+'un'+element?.data[0]?.id+">Unsubscribe</button>");
          if(element.data[0].temperature.value > 35){
            e.setIcon(
              L.icon({
                iconSize: [25, 41],
                iconAnchor: [10, 41],
                popupAnchor: [2, -40],
                // specify the path here
                iconUrl:
                  "https://www.svgrepo.com/download/292182/pointer-pin.svg",
              })
            )
          } else{
            e.setIcon(
              L.icon({
                iconSize: [25, 41],
                iconAnchor: [10, 41],
                popupAnchor: [2, -40],
                // specify the path here
                iconUrl:
                  "https://www.svgrepo.com/download/292085/pointer-map-pointer.svg",
              })
            )
          }
        }
        console.log(e)
      })
      
    });
  }
}

import { Component, Input, OnInit } from '@angular/core';
import { MqaService } from '../services/mqa.service';
import { NbSortDirection, NbSortRequest, NbThemeService, NbTreeGridDataSource, NbTreeGridDataSourceBuilder } from '@nebular/theme';
import { delay } from 'rxjs/operators';

interface TreeNode<T> {
  data: T;
  children?: TreeNode<T>[];
  expanded?: boolean;
}

interface FSEntry {
  metric: string;
  value: number;
  max: string;
  items?: number;
}
@Component({
  selector: 'ngx-mqa',
  templateUrl: './mqa.component.html',
  styleUrls: ['./mqa.component.scss']
})
export class MqaComponent implements OnInit {

  constructor(
    private mqaService : MqaService,
    private theme: NbThemeService,
    private dataSourceBuilder: NbTreeGridDataSourceBuilder<FSEntry>
  ) { 
    this.dataSource = this.dataSourceBuilder.create(this.data);
  }

  ngOnInit(): void {
  }
  
  customColumn = 'metric';
  defaultColumns = [ 'value', 'max', 'items' ];
  allColumns = [ this.customColumn, ...this.defaultColumns ];

  dataSource: NbTreeGridDataSource<FSEntry>;

  sortColumn: string;
  sortDirection: NbSortDirection = NbSortDirection.NONE;


  updateSort(sortRequest: NbSortRequest): void {
    this.sortColumn = sortRequest.column;
    this.sortDirection = sortRequest.direction;
  }

  getSortDirection(column: string): NbSortDirection {
    if (this.sortColumn === column) {
      return this.sortDirection;
    }
    return NbSortDirection.NONE;
  }

  private data: TreeNode<FSEntry>[] = [];

  getShowOn(index: number) {
    const minWithForMultipleColumns = 400;
    const nextColumnStep = 100;
    return minWithForMultipleColumns + (nextColumnStep * index);
  }

  private value = 0;

  @Input()
  set chartValue(value: number) {
    this.value = value;

    if (this.option.series) {
      this.option.series[0].data[0].value = value;
      this.option.series[0].data[1].value = 100 - value;
      this.option.series[1].data[0].value = value;
    }
  }

  option: any = {};
  themeSubscription: any;

  ngAfterViewInit() {
    this.themeSubscription = this.theme.getJsTheme().pipe(delay(1)).subscribe(config => {

      const solarTheme: any = config.variables.solar;

      this.option = Object.assign({}, {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)',
        },
        series: [
          {
            name: ' ',
            clockWise: true,
            hoverAnimation: false,
            type: 'pie',
            center: ['45%', '50%'],
            radius: solarTheme.radius,
            data: [
              {
                value: this.value,
                name: ' ',
                label: {
                  normal: {
                    position: 'center',
                    formatter: '{d}%',
                    textStyle: {
                      fontSize: '22',
                      fontFamily: config.variables.fontSecondary,
                      fontWeight: '600',
                      color: config.variables.fgHeading,
                    },
                  },
                },
                tooltip: {
                  show: false,
                },
                itemStyle: {
                  normal: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                      {
                        offset: 0,
                        color: solarTheme.gradientLeft,
                      },
                      {
                        offset: 1,
                        color: solarTheme.gradientRight,
                      },
                    ]),
                    shadowColor: solarTheme.shadowColor,
                    shadowBlur: 0,
                    shadowOffsetX: 0,
                    shadowOffsetY: 3,
                  },
                },
                hoverAnimation: false,
              },
              {
                value: 100 - this.value,
                name: ' ',
                tooltip: {
                  show: false,
                },
                label: {
                  normal: {
                    position: 'inner',
                  },
                },
                itemStyle: {
                  normal: {
                    color: solarTheme.secondSeriesFill,
                  },
                },
              },
            ],
          },
          {
            name: ' ',
            clockWise: true,
            hoverAnimation: false,
            type: 'pie',
            center: ['45%', '50%'],
            radius: solarTheme.radius,
            data: [
              {
                value: this.value,
                name: ' ',
                label: {
                  normal: {
                    position: 'inner',
                    show: false,
                  },
                },
                tooltip: {
                  show: false,
                },
                itemStyle: {
                  normal: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                      {
                        offset: 0,
                        color: solarTheme.gradientLeft,
                      },
                      {
                        offset: 1,
                        color: solarTheme.gradientRight,
                      },
                    ]),
                    shadowColor: solarTheme.shadowColor,
                    shadowBlur: 7,
                  },
                },
                hoverAnimation: false,
              },
              {
                value: 28,
                name: ' ',
                tooltip: {
                  show: false,
                },
                label: {
                  normal: {
                    position: 'inner',
                  },
                },
                itemStyle: {
                  normal: {
                    color: 'none',
                  },
                },
              },
            ],
          },
        ],
      });
    });
  }

  ngOnDestroy() {
    this.themeSubscription.unsubscribe();
  }

  async getCatalogue(id : String) : Promise<any>{
    if(id == ""){
      return alert("Please insert an id");
    }
    let response = await this.mqaService.getCatalogue(id);
    if(response.catalogue != null){
      this.data = [
        {
          data: { metric: 'Findability', value: response.catalogue.score.findability, max: '100', items: 4, },
          children: [
            { data: { metric: 'keyword', value: response.catalogue.score.keyword_Weight, max: '30' } },
            { data: { metric: 'theme', value: response.catalogue.score.theme_Weight, max: '30' } },
            { data: { metric: 'spatial', value: response.catalogue.score.spatial_Weight, max: '20' } },
            { data: { metric: 'temporal', value: response.catalogue.score.temporal_Weight, max: '20' } },
          ],
        },
        {
          data: { metric: 'Accessibility', value: response.catalogue.score.accessibility, items: 3, max: '100' },
          children: [
            { data: { metric: 'AccessURL accessibility', value: response.catalogue.score.accessURL_Weight, max: '50' } },
            { data: { metric: 'DownloadURL', value: response.catalogue.score.downloadURLResponseCode_Weight, max: '20' } },
            { data: { metric: 'DownloadURL accessibility', value: response.catalogue.score.downloadURL_Weight, max: '20' } },
          ],
        },
        {
          data: { metric: 'Interoperability', value: response.catalogue.score.interoperability, items: 6, max: '110' },
          children: [
            { data: { metric: 'Format', value: response.catalogue.score.format_Weight, max: '20' } },
            { data: { metric: 'Media type', value: response.catalogue.score.mediaType_Weight, max: '10' } },
            { data: { metric: 'Format / Media type from vocabulary', value: response.catalogue.score.dctFormat_dcatMediaType_Weight, max: '10' } },
            { data: { metric: 'Non-proprietary', value: response.catalogue.score.formatNonProprietary_Weight, max: '20' } },
            { data: { metric: 'Machine readable', value: response.catalogue.score.formatMachineReadable_Weight, max: '20' } },
            { data: { metric: 'DCAT-AP compliance', value: response.catalogue.score.shacl_validation_Weight, max: '30' } },
          ],
        },
        {
          data: { metric: 'Reusability', value: response.catalogue.score.reusability, items: 6, max: '75' },
          children: [
            { data: { metric: 'License information', value: response.catalogue.score.license_Weight, max: '20' } },
            { data: { metric: 'License vocabulary', value: response.catalogue.score.licenseVocabulary_Weight, max: '10' } },
            { data: { metric: 'Access restrictions', value: response.catalogue.score.accessRights_Weight, max: '10' } },
            { data: { metric: 'Access restrictions vocabulary', value: response.catalogue.score.accessRightsVocabulary_Weight, max: '5' } },
            { data: { metric: 'Contact point', value: response.catalogue.score.contactPoint_Weight, max: '20' } },
            { data: { metric: 'Publisher', value: response.catalogue.score.publisher_Weight, max: '10' } },
          ],
        },
        {
          data: { metric: 'Contextuality', value: response.catalogue.score.contextuality, items: 4, max: '20' },
          children: [
            { data: { metric: 'Rights', value: response.catalogue.score.rights_Weight, max: '5' } },
            { data: { metric: 'File size', value: response.catalogue.score.byteSize_Weight, max: '5' } },
            { data: { metric: 'Date of issue', value: response.catalogue.score.issued_Weight, max: '5' } },
            { data: { metric: 'Modification date', value: response.catalogue.score.modified_Weight, max: '5' } },
          ],
        },
      ]
      this.dataSource = this.dataSourceBuilder.create(this.data);
      
      this.value = Math.floor((response.catalogue.score.overall/405) * 100);
      //update chart value
      this.ngAfterViewInit();
      document.getElementById("overall").innerHTML = response.catalogue.score.overall;
      document.getElementById("response-type").innerHTML = "catalogue";
    } else {
      this.data = []
      this.dataSource = this.dataSourceBuilder.create(this.data);
      this.value = 0;
      //update chart value
      this.ngAfterViewInit();
      document.getElementById("overall").innerHTML = "0";
      document.getElementById("response-type").innerHTML = "dataset";
    }
    document.getElementById("response-get").innerHTML = JSON.stringify(response, null, "\t");
  }

  async getFiltered(id : String, filters : String, start_date : String, end_date : String) : Promise<any>{
    if(id == "" || filters == ""){
      return alert("Please check the inputs");
    }
    let json
    if(start_date != "" && end_date != ""){
      json =  {
        "parameters": filters,
        "start_date": start_date,
        "end_date": end_date
      }
    } else if (start_date != "" && end_date == ""){
      json =  {
        "parameters": filters,
        "start_date": start_date
      }
    } else {
      json =  {
        "parameters": filters
      }
    }

    let response = await this.mqaService.getFiltered(id,json);
    document.getElementById("response-getfiltered").innerHTML = JSON.stringify(response, null, "\t");
  }

  async submitAnalisysJSON(id : String, url : String, xml : String) : Promise<any>{
    if(xml == ""){
      return alert("Please insert an url");
    }
    //xml will be added to the body of the request from a local json file because it is too long to be added here
    let response = await this.mqaService.submitAnalisysJSON(id,url,xml);
    document.getElementById("response-submit").innerHTML = JSON.stringify(response, null, "\t");
  }


}

@Component({
  selector: 'ngx-fs-icon',
  template: `
    <nb-tree-grid-row-toggle [expanded]="expanded" *ngIf="isDir(); else fileIcon">
    </nb-tree-grid-row-toggle>
    <ng-template #fileIcon>
      <nb-icon icon="file-text-outline"></nb-icon>
    </ng-template>
  `,
})
export class FsIconComponent {
  @Input() kind: string;
  @Input() expanded: boolean;

  isDir(): boolean {
    return this.kind === 'dir';
  }
}

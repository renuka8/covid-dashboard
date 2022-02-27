import { Component, OnInit } from '@angular/core';
import { CoronaService } from '../shared/corona.service';

@Component({
  selector: '[app-district]',
  templateUrl: './district.component.html',
  styleUrls: ['./district.component.css']
})
export class DistrictComponent implements OnInit {

   showArrows = {
    uparrow: false,
    downarrow: false,
    downarrowcases:false,
    uparrowowcases:false
}
  districtdata: any;
  isAscendingSort: boolean = false;
  districtdata1:any;
  //districtdata1: any[];

  constructor(private cs: CoronaService, ) { }

  ngOnInit(): void {
    this.cs.districtdata.subscribe(data => {

      let districtDataArray: any = [];
      Object.keys(data).forEach((key, index) => {
        districtDataArray.push(
          Object.assign({}, { stateName: key }, data[key])
        );
      });
      this.districtdata = districtDataArray
      console.log(data)
    })

  }

  sortDistrict(districtdata:any) {
    this.resetArrow()
    this.isAscendingSort = !this.isAscendingSort;
    this.showArrows.uparrow=!this.showArrows.uparrow
    const compare = (a:any, b:any) => {
      return a.stateName.localeCompare(b.stateName);
    };
    this.districtdata = districtdata.sort(compare)

    if (!this.isAscendingSort) {
      this.resetArrow()
      this.showArrows.downarrow=!this.showArrows.downarrow
      const compare = (a:any, b:any) => {
        return b.stateName.localeCompare(a.stateName);
      };
      this.districtdata = districtdata.sort(compare)
    }

  }
  resetArrow() {
    this.showArrows = {
      uparrow: false,
      downarrow: false,
      downarrowcases:false,
      uparrowowcases:false
  }
  }

  sortDistrictCases(districtdata:any){
    this.resetArrow()
    this.isAscendingSort = !this.isAscendingSort;
    this.showArrows.uparrowowcases=!this.showArrows.uparrowowcases

    const compare = (a:any, b:any) => {
      return b.confirmed-a.confirmed;
    };
    this.districtdata = districtdata.sort(compare)
    if (!this.isAscendingSort) {
      this.resetArrow()
      this.showArrows.downarrowcases=!this.showArrows.downarrowcases
      const compare = (a:any, b:any) => {
        return a.confirmed-b.confirmed;
      };
      this.districtdata = districtdata.sort(compare)
    }

  }
}








import { Component, OnInit } from '@angular/core';
import { CoronaService } from '../shared/corona.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
 
  showArrows = {
    uparrowState: false,
    downarrowState: false,
    downarrowConfirmed:false,
    uparrowowConfirmed:false,
    downarrowActive:false,
    uparrowActive:false,
    downarrowRecovered:false,
    uparrowRecovered:false,
    downarrowDeath:false,
    uparrowDeath:false,
}


  showDistrict:boolean=false
  sortedDataBasedOnDate: any
  private isAscendingSort: boolean = false;

  DailystateStatus: Array<any> = [{ state: '', confirmed: '', recovered: '', deaths: '', active: '' }];
  DailyStatus: any = { total: '' }
  statewisedata: Array<any> = [{ state: '', confirmed: '', recovered: '', deaths: '', active: '' }];
  statewisecase: any = { confirmed: '', active: '', recovered: '', deaths: '' }
  startdate = new Date()
  lastupdateddate = new Date();
  lastupdated: any = { hour: 0, minute: 0, second: 0 }
  SingleStateData: any;
  lastrefreshedtime: any;

  constructor(private cs: CoronaService) { }

  ngOnInit(): void {

    this.getStateWise()
    this.testData()
  }

  testData() {
    this.cs.getDailyCaseStatus().subscribe(
      response => {
        this.sortedDataBasedOnDate = response.data.history
        this.sortByMaxCases(this.sortedDataBasedOnDate)
       
       // console.log(this.sortedDataBasedOnDate);
        this.calculateDiff(this.sortedDataBasedOnDate)
        this.statewisedata = this.sortedDataBasedOnDate[this.sortedDataBasedOnDate.length - 1].statewise
        this.statewisecase= this.sortedDataBasedOnDate[this.sortedDataBasedOnDate.length - 1].total
     //   console.log(this.statewisecase)
      },
      error => {
        console.log(error);
      }
    );
  }

  calculateDiff(data: any) {
    let x = data
    let last: any = x[x.length - 1];
    let last2: any = x[x.length - 2];

    function calculate(schema1: any, schema2: any) {
      var ret: any = {};
      for (var key in schema1) {
        if (schema1.hasOwnProperty(key) && schema2.hasOwnProperty(key)) {
          var obj = schema1[key];
          var obj2 = schema2[key]
          if (typeof obj === "number" && !isNaN(obj) && typeof obj2 === "number" && !isNaN(obj2)) {
            ret[key] = obj - obj2;
          }
          else {
            if (typeof obj === 'object' && typeof obj2 === 'object') {
              ret[key] = calculate(obj, obj2);
            }
            else {
              ret[key] = obj;
            }
          }
        }
      }
      return ret;
    }
    let test = calculate(last, last2);
    this.DailyStatus = test;
    this.DailystateStatus = this.DailyStatus.statewise
  }







  getStateWise() {
    this.cs.getDataStateWise().subscribe(data => {
    this.lastrefreshedtime=data.data.lastRefreshed   
      this.lastupdateddate = data.data.lastRefreshed
     // console.log(this.lastupdated)

      function getDataDiff(startDate: any, endDate: any) {
        var diff = endDate.getTime() - startDate.getTime();
        var days = Math.floor(diff / (60 * 60 * 24 * 1000));
        var hours = Math.floor(diff / (60 * 60 * 1000)) - (days * 24);
        var minutes = Math.floor(diff / (60 * 1000)) - ((days * 24 * 60) + (hours * 60));
        var seconds = Math.floor(diff / 1000) - ((days * 24 * 60 * 60) + (hours * 60 * 60) + (minutes * 60));
        return { day: days, hour: hours, minute: minutes, second: seconds };
      }

      this.lastupdated = getDataDiff(new Date(this.lastupdateddate), new Date(this.startdate));

    },
      err => {
        console.log(err)
      })
  }

  OngetState(state: any) {

  this.getDataofState(state)

    this.cs.getState(state)
    this.cs.getDataDistrictWise(state)
 
  }
  getDataofState(state: any) {
   // console.log(this.statewisedata)
   const f = this.statewisedata.filter(a => a.state==state);
    this.SingleStateData=f[0]
    console.log(this.SingleStateData);
  }

  showHideData(data: any) {
    if(data && data['show'] == true) {
      data['show'] = false;
    } else {
      data['show'] = true;
    }
  }

  sortAscending(data: any) {
    this.resetArrows()
    this.isAscendingSort = !this.isAscendingSort;
   this.showArrows.uparrowState=!this.showArrows.uparrowState
    
    data.forEach((item: any) => item.statewise.sort(function (a: any, b: any) {
      if (a.state < b.state) {
        return -1;
      }
      if (a.state > b.state) {
        return 1;
      }
      return 0;
    }))


    this.calculateDiff(this.sortedDataBasedOnDate)

    if (!this.isAscendingSort) {
      this.resetArrows()
      this.showArrows.downarrowState=!this.showArrows.downarrowState
      let a = data.forEach((item: any) => item.statewise.sort(function (a: any, b: any) {
      
      if (b.state < a.state) {
        return -1;
      }
      if (b.state > a.state) {
        return 1;
      }
      return 0;
    }))
      this.calculateDiff(this.sortedDataBasedOnDate)
    }
  }
  resetArrows() {
    this.showArrows = {
      uparrowState: false,
      downarrowState: false,
      downarrowConfirmed:false,
      uparrowowConfirmed:false,
      downarrowActive:false,
      uparrowActive:false,
      downarrowRecovered:false,
      uparrowRecovered:false,
      downarrowDeath:false,
      uparrowDeath:false,
  }
    
  }

  sortByMaxCases(sortedDataBasedOnDate: any) {
    this.resetArrows()
    this.isAscendingSort = !this.isAscendingSort;
   this.showArrows.downarrowConfirmed=!this.showArrows.downarrowConfirmed


 
    sortedDataBasedOnDate.forEach((item: any) => item.statewise.sort(function (a: any, b: any) {
      if (b.confirmed < a.confirmed) {
        return -1;
      }
      if (b.confirmed > a.confirmed) {
        return 1;
      }
      return 0;
    }))
    this.calculateDiff(this.sortedDataBasedOnDate)

    if (!this.isAscendingSort) {
      this.resetArrows()
     this.showArrows.uparrowowConfirmed=!this.showArrows.uparrowowConfirmed
    sortedDataBasedOnDate.forEach((item: any) => item.statewise.sort(function (a: any, b: any) {
        if (a.confirmed < b.confirmed) {
          return -1;
        }
        if (a.confirmed > b.confirmed) {
          return 1;
        }
        return 0;
      }))

      this.calculateDiff(this.sortedDataBasedOnDate)
    }
  }

  sortByMaxActive(sortedDataBasedOnDate: any) {
    this.resetArrows()
    this.isAscendingSort = !this.isAscendingSort;
   this.showArrows.uparrowActive=!this.showArrows.uparrowActive
   
    sortedDataBasedOnDate.forEach((item: any) => item.statewise.sort(function (a: any, b: any) {
      if (a.active < b.active) {
        return -1;
      }
      if (a.active > b.active) {
        return 1;
      }
      return 0;
    }))
    this.calculateDiff(this.sortedDataBasedOnDate)

    if (!this.isAscendingSort) {
      this.resetArrows()
     this.showArrows.downarrowActive=!this.showArrows.downarrowActive

      sortedDataBasedOnDate.forEach((item: any) => item.statewise.sort(function (a: any, b: any) {
        if (b.active < a.active) {
          return -1;
        }
        if (b.active > a.active) {
          return 1;
        }
        return 0;
      }))
      this.calculateDiff(this.sortedDataBasedOnDate)
    }

  }

  sortByMaxRecovered(sortedDataBasedOnDate: any) {

    this.resetArrows()
    this.isAscendingSort = !this.isAscendingSort;
   this.showArrows.uparrowRecovered=!this.showArrows.uparrowRecovered
    sortedDataBasedOnDate.forEach((item: any) => item.statewise.sort(function (a: any, b: any) {
      if (b.recovered < a.recovered) {
        return -1;
      }
      if (b.recovered > a.recovered) {
        return 1;
      }
      return 0;
    }))
    this.calculateDiff(this.sortedDataBasedOnDate)

    if (!this.isAscendingSort) {

      this.resetArrows()
     this.showArrows.downarrowRecovered=!this.showArrows.downarrowRecovered
      sortedDataBasedOnDate.forEach((item: any) => item.statewise.sort(function (a: any, b: any) {
        if (a.recovered < b.recovered) {
          return -1;
        }
        if (a.recovered > b.recovered) {
          return 1;
        }
        return 0;
      }))

      this.calculateDiff(this.sortedDataBasedOnDate)
    }

  }

  sortByMaxDeath(sortedDataBasedOnDate: any) {
    
    this.resetArrows()
    this.isAscendingSort = !this.isAscendingSort;
   this.showArrows.uparrowDeath=!this.showArrows.uparrowDeath
    sortedDataBasedOnDate.forEach((item: any) => item.statewise.sort(function (a: any, b: any) {
     
    if (a.deaths < b.deaths) {
      return -1;
    }
    if (a.deaths > b.deaths) {
      return 1;
    }
    return 0;
  }))
    this.calculateDiff(this.sortedDataBasedOnDate)

    if (!this.isAscendingSort) {
      this.resetArrows()
         this.showArrows.downarrowDeath=!this.showArrows.downarrowDeath
      sortedDataBasedOnDate.forEach((item: any) => item.statewise.sort(function (a: any, b: any) {
        if (b.deaths < a.deaths) {
          return -1;
        }
        if (b.deaths > a.deaths) {
          return 1;
        }
        return 0;
      }))
  
  

      this.calculateDiff(this.sortedDataBasedOnDate)
    }

  }

}
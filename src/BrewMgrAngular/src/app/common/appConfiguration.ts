import { Injectable } from '@angular/core';


import {RequestOptions} from "@angular/http";
//import {ApplicationStats} from "./entities";
declare var toastr: any;
declare var location: any;

@Injectable()
export class AppConfiguration {
      constructor(){
          this.setToastrOptions();
          console.log("AppConfiguration ctor");

          if(location.port && (location.port == "3000") || (location.port== "4200") )
            this.urls.baseUrl = "http://localhost:1434/"; // kestrel

      }

      // top level search text
      //searchText = "";
      //activeTab = "albums";
      //isSearchAllowed = true;

      urls = {
        baseUrl: "./",
        hops: "api/hops",
        hop: "api/hop",
        searchhops: "api/hop/search",
        url: (name,parm1?,parm2?,parm3?) => {
          var url = this.urls.baseUrl + this.urls[name];
          if (parm1)
            url += "/" + parm1;
          if (parm2)
            url += "/" + parm2;
          if (parm3)
            url += "/" + parm3;
            console.log("AppConfiguration returned url:" + url)
          return url;
        }
      };


      setToastrOptions() {
        toastr.options.closeButton = true;
        toastr.options.positionClass = "toast-bottom-right";
      }

  /**
   * Http Request options to for requests
   * @type {RequestOptions}
   */
  requestOptions =  new RequestOptions({  withCredentials: true });
}


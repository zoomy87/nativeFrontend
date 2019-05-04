import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Config } from "../config";
import { Tweet } from './tweet';
import { request, getFile, getImage, getJSON, getString } from "tns-core-modules/http";


@Injectable({
  providedIn: 'root'
})
export class TwitterService {
  private list: Tweet[];
  
  constructor(private httpClient: HttpClient) { }

  async timeline_home():Promise<string> {
    console.log("print timeline async method");
    var url = Config.twitterApiUrl + "user_home";
    var response: string;
    await getString(url).then(str => {this.list = <Tweet[]>(JSON.parse(str)); response = str;});;

    return response;
  }

  getItem(id: number): Tweet {
    return this.list.filter((item) => item.id === id)[0];
}
}

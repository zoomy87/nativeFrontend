import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { isAndroid } from "tns-core-modules/platform";
import { TabView } from "tns-core-modules/ui/tab-view/tab-view";
import { SwipeGestureEventData, SwipeDirection } from "tns-core-modules/ui/gestures/gestures";

import { ActivatedRoute } from "@angular/router";
import { RouterExtensions } from "nativescript-angular/router";

@Component({
    selector: "ns-app",
    moduleId: module.id,
    templateUrl: "app.component.html",
    styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
    @ViewChild("tabview") tabview!: ElementRef<TabView>;
    
    constructor(private _route: ActivatedRoute, private _routerExtensions: RouterExtensions) {
        
    }

    ngOnInit(): void {
        const id = +this._route.snapshot.params.id;
    }

    getIconSource(icon: string): string {
        const iconPrefix = isAndroid ? "res://" : "res://tabIcons/";

        return iconPrefix + icon;
    }

    onSwipe(event: SwipeGestureEventData){
        //console.log(event.view._moduleName!);
        if (this.tabview.nativeElement.selectedIndex === 0 && event.direction === SwipeDirection.left){
            console.log("left swipe");
            this.tabview.nativeElement.selectedIndex = 1;
          } else if(this.tabview.nativeElement.selectedIndex === 1 && event.direction === SwipeDirection.right){
            console.log("right swipe");
            this.tabview.nativeElement.selectedIndex = 0;
          } else if(this.tabview.nativeElement.selectedIndex === 1 && event.direction === SwipeDirection.left){
            console.log("left swipe");
            this.tabview.nativeElement.selectedIndex = 2;
          }else if(this.tabview.nativeElement.selectedIndex === 2 && event.direction === SwipeDirection.right){
            console.log("right swipe");
            this.tabview.nativeElement.selectedIndex = 1;
          }
    }
}

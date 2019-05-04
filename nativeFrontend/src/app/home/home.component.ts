import { Component, OnInit, ViewChild, ElementRef, ViewContainerRef } from "@angular/core";
import { TwitterService } from "../shared/twitter/twitter.service";
import { Tweet } from "../shared/twitter/tweet";
import { SwipeGestureEventData, SwipeDirection } from "tns-core-modules/ui/gestures/gestures";
import { TabView } from "tns-core-modules/ui/tab-view/tab-view";
import { ModalViewComponent } from "../modal-view/modal-view.component";
import { ModalDialogService, ModalDialogOptions } from "nativescript-angular/modal-dialog";

@Component({
    selector: "Home",
    moduleId: module.id,
    templateUrl: "./home.component.html"
})
export class HomeComponent implements OnInit {
    items: Tweet[];
    @ViewChild("tabview") tabview0!: ElementRef<TabView>;
   //@ViewChild(ModalViewComponent) modal: ModalViewComponent;


    constructor(private _itemService: TwitterService, private modalDialog: ModalDialogService, private vcRef: ViewContainerRef) {

     }

    ngOnInit(): void {
        this._itemService.timeline_home()
            .then(str => {this.items = <Tweet[]>(JSON.parse(str))});        
    }

    onSwipe(event: SwipeGestureEventData){
        console.log(event.view._moduleName!);
        if (this.tabview0.nativeElement.selectedIndex === 0 && event.direction === SwipeDirection.left){
            console.log("left swipe");
            this.tabview0.nativeElement.selectedIndex = 1;
          }
    }

    modalTap(): void {
        let options = {
            // context: { sortType },
            fullscreen: false,
            viewContainerRef: this.vcRef
        };
        console.log("trying to show modal");
        this.modalDialog.showModal(ModalViewComponent, options)
    }

    closeModal() {
    }

    itemTapped(event){
        console.log(event);
    }

    printTimeline(): void {
        console.log("Print timeline");
        // this.items = this._itemService.timeline_home();
        
    }
}

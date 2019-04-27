import { Component, OnInit, ViewChild, ElementRef, ViewContainerRef } from "@angular/core";
import { DataService, IDataItem } from "../shared/data.service";
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
    items: Array<IDataItem>;
    @ViewChild("tabview") tabview0!: ElementRef<TabView>;
   //@ViewChild(ModalViewComponent) modal: ModalViewComponent;


    constructor(private _itemService: DataService, private modalDialog: ModalDialogService, private vcRef: ViewContainerRef) {

     }

    ngOnInit(): void {
        this.items = this._itemService.getItems();
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
}

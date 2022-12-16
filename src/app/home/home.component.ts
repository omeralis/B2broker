
import { Component, Input, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { plainToClass } from 'class-transformer';
import { PseudoSocketService } from '../shared/services/pseudo-socket.service';
import { ArrayFields } from '../shared/model/ArrayFields';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  arrayFields: any;
  interval: any;
  subscription: Subscription;
  DataFormGroup: FormGroup;
  FormValuePseudoSocket: {
    timer: any
    size: any
    AdditionalArrayIds: any
  }
 IdsAdditionalArray:any;
  worker!: Worker;
  // @Input() ids: string[] = new Array<string>();

  constructor(private fb: FormBuilder,
    private pseudosocke: PseudoSocketService) { }


  ngOnInit(): void {
    this.GeneratePseudoSocket();
    this.pseudosocke.setIds();
    this.initForm();
    this.initWorker();
    this.initpseudosocke();
  }

  initForm() {
    this.DataFormGroup = this.fb.group({
      timer: [1000],
      ArraySize: [1000]
      // AdditionalArrayIds: ["1000,999,998"]
    })
    this.ChangeOfData();
    this.DataFormGroup.value.timer = 1001;          
  }

  GeneratePseudoSocket() {
    this.subscription = this.pseudosocke.getPseudoSocketFormValue().subscribe(value => {
      if (value.timer && value.size) {
        this.interval = setInterval(() => {
          this.initWorker(value.size)
        }, value.timer);
      } else {
        this.initWorker(value.size)
      }

    })
  }
  ChangeOfData() {
    this.DataFormGroup.valueChanges.subscribe((value) => {
      this.FormValuePseudoSocket = {
        timer: value.timer,
        size: value.ArraySize,
        AdditionalArrayIds: value.AdditionalArrayIds
      }
      console.log(this.DataFormGroup.value);
      console.log('form changed');
      this.pseudosocke.setPseudoSocketFormValue.next(this.FormValuePseudoSocket);
      // this.initPse(value.timer,value.ArraySize,value.ArraySize);
    })
  }

  initpseudosocke(timer: number = 1000, size: number = 1000, AdditionalArrayIds: number[]=[1000,999,998]) {
    this.FormValuePseudoSocket = {
      timer: timer,
      size: size,
      AdditionalArrayIds: AdditionalArrayIds,
    }
    console.log(this.DataFormGroup.value);
    
    this.pseudosocke.setPseudoSocketFormValue.next(this.FormValuePseudoSocket);
  }


  // init Worker
  initWorker(ArraySize: number = 1000) {
    // console.log('ArraySize', ArraySize)
    if (typeof Worker !== 'undefined') {
      // Create a new
       this.worker = new Worker(new URL('../web-worker/app.worker.ts', import.meta.url));
       this.worker.onmessage = ({ data }) => {
        this.arrayFields = plainToClass(ArrayFields, data.splice(-10));
        this.IdsAdditionalArray =  this.arrayFields.map((res:any)=>{
            return res.id;
        });

        this.IdsAdditionalArray.reverse().splice(3);
        
      };
      this.worker.postMessage(ArraySize);
    } else {
      console.log('Web workers are not supported in this environment');
    }
    return this.worker;
  }


  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}

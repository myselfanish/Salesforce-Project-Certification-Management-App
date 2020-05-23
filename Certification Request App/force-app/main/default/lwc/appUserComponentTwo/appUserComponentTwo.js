import { LightningElement,wire,track } from 'lwc';
import getdata from '@salesforce/apex/CertificationRequests.getDraftRequests';
import updateRequest from '@salesforce/apex/CertificationRequests.updateRequest';

import { refreshApex } from '@salesforce/apex';
import { CurrentPageReference } from 'lightning/navigation';
import { registerListener, unregisterAllListeners } from 'c/pubsub';


export default class AppUserComponentTwo extends LightningElement {

    @track Requests;
    @wire(CurrentPageReference) pageRef;

    valueOfDraftRequests;
    @wire (getdata)
    getApexData(value){
        this.valueOfDraftRequests=value;
        const {error,data}=value;
        if(data){
            //console.log(data);
            this.Requests=data;
            //var req=data[0];
            //console.log(req.Name);
        }
        if(error){
            console.log('error has occured');
        }
    }

    connectedCallback() {
        registerListener('usercomp1click', this.handleRegusercomp1click, this);
    }
    // disconnectedCallback() {
    //     unregisterAllListeners(this);
    //     //unregisterListener('usercomp1click',this.handleDeregusercomp1click,this);
    // }

    handleRegusercomp1click(dataFromComp) {
        this.RecallWiredData();
    }

    ind;
    submitreq(event){
       // alert('button working');
        this.ind=event.target.value;
        //alert('index : '+this.ind);
        this.ReqRecordId = this.Requests[this.ind].Id;
       // alert('Record Id : '+this.ReqRecordId);
       updateRequest({ReqRecordId:this.ReqRecordId,status:'Submitted'}).then(result=>{if(result=='Request Updated Successfully'){alert(result);this.RecallWiredData();var payLoad={'Status':'Submitted'};fireEvent(this.pageRef, 'usercomp2click',payLoad);}else alert(result);});



    }


    RecallWiredData() {
        // setTimeout(function () { this.callItOnceMore = !this.callItOnceMore; }, 10000);
          refreshApex(this.valueOfDraftRequests);
     }




}
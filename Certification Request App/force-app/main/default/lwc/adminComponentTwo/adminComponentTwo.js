import { LightningElement,wire,track } from 'lwc';
import getdata from '@salesforce/apex/CertificationRequests.getSubmittedRequests';
import updateRequest from '@salesforce/apex/CertificationRequests.updateRequest';

import { refreshApex } from '@salesforce/apex';
import { registerListener, unregisterAllListeners } from 'c/pubsub';
import { fireEvent } from 'c/pubsub';
import { CurrentPageReference } from 'lightning/navigation';

export default class AdminComponentTwo extends LightningElement {
    @wire(CurrentPageReference) pageRef;
    @track Requests;
    @track comment;
    selectedRejection = false;

    valueOfDraftRequests;
    @wire (getdata)
    getApexData(value){
        this.valueOfDraftRequests=value;
        const { error, data } = value;
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
    disconnectedCallback() {
        unregisterAllListeners(this);
        //unregisterListener('usercomp1click',this.handleDeregusercomp1click,this);
    }

    handleRegusercomp1click(dataFromComp) {
        this.refreshButtonClicked();
    }
    refreshButtonClicked(){
        refreshApex(this.valueOfDraftRequests);
    }

    ind;
    approvereq(event){
        // alert('button working');
         this.ind=event.target.value;
         //alert('index : '+this.ind);
         this.ReqRecordId = this.Requests[this.ind].Id;
        // alert('Record Id : '+this.ReqRecordId);
        updateRequest({ReqRecordId:this.ReqRecordId,status:'Approved'}).then(result=>{if(result=='Request Updated Successfully'){alert(result); var payload ='Approved';
        fireEvent(this.pageRef, 'adminapproved', payload); refreshApex(this.valueOfDraftRequests);}else alert(result);});
     }
    rejectreq(event){
        // alert('button working');
         this.ind=event.target.value;
         //alert('index : '+this.ind);
         this.ReqRecordId = this.Requests[this.ind].Id;
        // alert('Record Id : '+this.ReqRecordId);
        updateRequest({ReqRecordId:this.ReqRecordId,status:'Rejected'}).then(result=>{if(result=='Request Updated Successfully'){alert(result); var payload ='Rejected';
        fireEvent(this.pageRef, 'adminrejected', payload); refreshApex(this.valueOfDraftRequests);}else alert(result);});
     }

}
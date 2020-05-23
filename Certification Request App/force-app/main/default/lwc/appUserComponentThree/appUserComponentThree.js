import { LightningElement,wire,track } from 'lwc';
import getdata from '@salesforce/apex/CertificationRequests.getAssignedRequests';
import getdata1 from '@salesforce/apex/CertificationRequests.getPassedRequests';
import getdata2 from '@salesforce/apex/CertificationRequests.getFailedRequests';
import updateRequest from '@salesforce/apex/CertificationRequests.updateRequest';

import { refreshApex } from '@salesforce/apex';

export default class AppUserComponentThree extends LightningElement {
    @track Requests;
    @track Requests1;
    @track Requests2;


    valueOfAssignedRequests;
    @wire (getdata)
    getApexData(value){
        this.valueOfAssignedRequests=value;
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

    valueOfPassedRequests;
    @wire(getdata1)
    getApexData1(value) {
        this.valueOfPassedRequests=value;
        const {error,data}=value;
        if (data) {
            //console.log(data);
            this.Requests1 = data;
            //var req1 = data[0];
            //console.log(req1.Name);
        }
        if (error) {
            console.log('error has occured');
        }
    }


    valueOfFailedRequests;
    @wire(getdata2)
    getApexData2(value) {
        this.valueOfFailedRequests=value;
        const {error,data}=value;
        if (data) {
            console.log(data);
            this.Requests2 = data;
            var req2 = data[0];
            console.log(req2.Name);
        }
        if (error) {
            console.log('error has occured');
        }
    }

    ind;
    passedreq(event){
         //alert('button working');
         this.ind=event.target.value;
         //alert('index : '+this.ind);
         this.ReqRecordId = this.Requests[this.ind].Id;
        // alert('Record Id : '+this.ReqRecordId);
        updateRequest({ReqRecordId:this.ReqRecordId,status:'Passed'}).then(result=>{if(result=='Request Updated Successfully'){alert(result);refreshApex(this.valueOfAssignedRequests);refreshApex(this.valueOfPassedRequests);}else alert(result);});
     }
    failedreq(event){
         //alert('button working');
         this.ind=event.target.value;
         //alert('index : '+this.ind);
         this.ReqRecordId = this.Requests[this.ind].Id;
        // alert('Record Id : '+this.ReqRecordId);
        updateRequest({ReqRecordId:this.ReqRecordId,status:'Failed'}).then(result=>{if(result=='Request Updated Successfully'){alert(result);refreshApex(this.valueOfAssignedRequests);refreshApex(this.valueOfFailedRequests);}else alert(result);});
     }

}
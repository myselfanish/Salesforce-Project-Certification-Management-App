import { LightningElement, wire,track } from 'lwc';
import getdata from '@salesforce/apex/CertificationRequests.getApprovedRequests';
import getdata1 from '@salesforce/apex/CertificationRequests.getRejectedRequests';
import getdata2 from '@salesforce/apex/CertificationRequests.getAssignedRequests';

import { registerListener, unregisterAllListeners } from 'c/pubsub';
import { refreshApex } from '@salesforce/apex';
import { CurrentPageReference } from 'lightning/navigation';

export default class AdminComponentThree extends LightningElement {
    @track Requests;
    @track Requests1;
    @track Requests2;
    @wire(CurrentPageReference) pageRef;

    valueOfViewApproved;
    @wire(getdata)
    getApexData(value) {
        this.valueOfViewApproved = value;
        const {error,data} = value;
        if (data) {
            console.log(data);
            this.Requests = data;
        }

        if (error) {
            console.log('error has occured');
        }
        // if(value!=null)
        // alert('hi');
    }



    valueOfViewRejected;
    @wire(getdata1)
    getApexData1(value) {
        this.valueOfViewRejected=value;
        const {error,data}=value;
        if (data) {
            //console.log(data);
            this.Requests1 = data;
            //var req1 = data[0];
            console.log(data);
        }
        if (error) {
            console.log('error has occured');
        }
        //alert('hello');
    }



    valueOfViewAssigned;
    @wire(getdata2)
    getApexData2(value) {
        this.valueOfViewAssigned=value;
        const{error,data}=value;
        if (data) {
            console.log(data);
            this.Requests2 = data;
            //var req2 = data[0];
            //console.log(req2.Name);
        }
        if (error) {
            console.log('error has occured');
        }
        //alert('gd');
    }





    connectedCallback() {

        registerListener('adminapproved', this.handleAdminApproved, this);
        registerListener('adminrejected', this.handleAdminRejected, this);
    }

    disconnectedCallback() {
        unregisterAllListeners(this);
    }

    handleAdminApproved(payLoad) {
      //  var message = payLoad.message;
        refreshApex(this.valueOfViewApproved);
        refreshApex(this.valueOfViewAssigned);
    }
    handleAdminRejected(payLoad) {
       // var message = payLoad.message;
        refreshApex(this.valueOfViewRejected);
    }


}
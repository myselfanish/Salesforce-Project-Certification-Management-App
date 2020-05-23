import { LightningElement,wire } from 'lwc';
import addrequest from '@salesforce/apex/CertificationRequests.addNewReq';
import addemployee from '@salesforce/apex/CertificationRequests.addNewEmp';

import { CurrentPageReference } from 'lightning/navigation';
import { fireEvent } from 'c/pubsub';

export default class AppUserComponentOne extends LightningElement {
    
    @wire(CurrentPageReference) pageRef;
    
    reqflag;
    empflag;
    
    EmpName;
    EmpId;
    EmpMail;
    EmpPS;
    EmpSS;
    EmpExp;
    EmpComm;

    ReqEmp;
    ReqCert;
    ReqDueDate;
    ReqComm;

    CertRecordId;
    EmpRecordId;

    EmpNameChange(event) {
        this.EmpName = event.target.value;
    }
    EmpIdChange(event) {
        this.EmpId = event.target.value;
    }
    EmpMailChange(event) {
        this.EmpMail = event.target.value;
    }
    EmpPSChange(event) {
        this.EmpPS = event.target.value;
    }
    EmpSSChange(event) {
        this.EmpSS = event.target.value;
    }
    EmpExpChange(event) {
        this.EmpExp = event.target.value;
    }
    EmpCommChange(event) {
        this.EmpComm = event.target.value;
    }

    ReqDueDateChange(event){
        this.ReqDueDate=event.target.value;
    }
    ReqCommChange(event){
        this.ReqComm=event.target.value;
    }
    handleAutoSelect(event){
        var nav=event.detail;
   
        this.VouCert=nav.selectedRecordName;
        this.CertRecordId=nav.selectedRecordId;
       
    }
    handleAutoSelect1(event){
        var emp = event.detail;
        this.ReqEmp=emp.selectedRecordName;
        this.EmpRecordId=emp.selectedRecordId;
       
    }

    empform() {
        // alert('Button Working');
        this.empflag = true;
    }

    addemp() {
        // alert(this.EmpName+' '+this.EmpId+' '+this.EmpMail);
        addemployee({ EmpName: this.EmpName, EmpId: this.EmpId, EmpMail: this.EmpMail, EmpPS: this.EmpPS, EmpSS: this.EmpSS, EmpExp: this.EmpExp, EmpComm: this.EmpComm }).then(result => { if (result == 'Employee Created Successfully') { alert(result); } else alert(result); });
        this.empflag = false;
        this.EmpName = '';
        this.EmpId = '';
        this.EmpMail = '';
        this.EmpExp = '';
        this.EmpPS = '';
        this.EmpSS = '';
        this.EmpComm = '';
        //location.reload();
        // alert('Employee Added Successfully');
    }

    reqform(){
        this.reqflag=true;
    }
    addreq(){
        addrequest({ReqEmp:this.EmpRecordId, ReqCert:this.CertRecordId, ReqDueDate:this.ReqDueDate, ReqComm:this.ReqComm}).then(result=>{if(result=='Request Added Successfully'){alert(result); this.reqflag=false; var payLoad={'Status':'Draft'};
        fireEvent(this.pageRef, 'usercomp1click',payLoad);}else alert(result);});
        this.reqflag=false;
        this.ReqDueDate = '';
        this.ReqComm = '';
    }

    closepopup(){
        this.reqflag=false;
        this.ReqDueDate = '';
        this.ReqComm = '';
        
        this.empflag=false;
        this.EmpName = '';
        this.EmpId = '';
        this.EmpMail = '';
        this.EmpExp = '';
        this.EmpPS = '';
        this.EmpSS = '';
        this.EmpComm = '';
    }



}
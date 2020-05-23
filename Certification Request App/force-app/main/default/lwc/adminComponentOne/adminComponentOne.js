import { LightningElement,wire } from 'lwc';
import addemployee from '@salesforce/apex/CertificationRequests.addNewEmp';
import addcertification from '@salesforce/apex/CertificationRequests.addNewCert';
import addvoucher from '@salesforce/apex/CertificationRequests.addNewVou';
import viewemployees from '@salesforce/apex/CertificationRequests.getAllEmployees';
import viewcertifications from '@salesforce/apex/CertificationRequests.getAllCertifications';
import viewvouchers from '@salesforce/apex/CertificationRequests.getAllVouchers';
import {refreshApex} from '@salesforce/apex';
import { registerListener, unregisterAllListeners } from 'c/pubsub';
import { fireEvent } from 'c/pubsub';
import { CurrentPageReference } from 'lightning/navigation';

export default class AdminComponentOne extends LightningElement {
    @wire(CurrentPageReference) pageRef;
    // empflag;
    certflag;
    vouflag;

    viewempflag;
    viewcertflag;
    viewvouflag;

    Employees;
    Certifications;
    Vouchers;

    connectedCallback() {
        registerListener('usercomp1click', this.handleRegusercomp1click, this);
    }
    connectedCallback() {
        registerListener('usercomp2click', this.handleRegusercomp2click, this);
    }
    // disconnectedCallback() {
    //     unregisterAllListeners(this);
    //     //unregisterListener('usercomp1click',this.handleDeregusercomp1click,this);
    // }

    handleRegusercomp1click(dataFromComp) {
        this.refreshButtonClicked1();
    }
    refreshButtonClicked1(){
        refreshApex(this.valueOfViewEmployees);
    }

    handleRegusercomp2click(dataFromComp) {
        this.refreshButtonClicked1();
    }
    refreshButtonClicked2(){
        refreshApex(this.valueOfViewEmployees);
    }


    valueOfViewEmployees;
    @wire (viewemployees)
    getApexData(value){
        this.valueOfViewEmployees=value;
        const {error,data}=value;
        if(data){
            //console.log(data);
            this.Employees=data;
            //var req=data[0];
            //console.log(req.Name);
        }
        if(error){
            console.log('error has occured');
        }
    }


    valueOfViewCertifications;
    @wire (viewcertifications)
    getApexData1(value){
        this.valueOfViewCertifications=value;
        const {error,data}=value;
        if(data){
            //console.log(data);
            this.Certifications=data;
            //var req=data[0];
            //console.log(req.Name);
        }
        if(error){
            console.log('error has occured');
        }
    }


    valueOfViewVouchers;
    @wire (viewvouchers)
    getApexData2(value){

        this.valueOfViewVouchers=value;
        const {error,data}=value;
        if(data){
            //console.log(data);
            this.Vouchers=data;
            //var req=data[0];
            //console.log(req.Name);
        }
        if(error){
            console.log('error has occured');
        }
    }

    viewemps() {
        this.viewempflag = true;
    }

    viewcerts() {
        this.viewcertflag = true;
    }
    viewvous() {
        this.viewvouflag = true;
    }

    // EmpName;
    // EmpId;
    // EmpMail;
    // EmpPS;
    // EmpSS;
    // EmpExp;
    // EmpComm;

    CertName;
    CertId;
    CertCost;
    CertComm;

    VouId;
    VouCost;
    VouValid;
    VouCert;
    VouComm;

    CertRecordId;

    // EmpNameChange(event) {
    //     this.EmpName = event.target.value;
    // }
    // EmpIdChange(event) {
    //     this.EmpId = event.target.value;
    // }
    // EmpMailChange(event) {
    //     this.EmpMail = event.target.value;
    // }
    // EmpPSChange(event) {
    //     this.EmpPS = event.target.value;
    // }
    // EmpSSChange(event) {
    //     this.EmpSS = event.target.value;
    // }
    // EmpExpChange(event) {
    //     this.EmpExp = event.target.value;
    // }
    // EmpCommChange(event) {
    //     this.EmpComm = event.target.value;
    // }

    CertNameChange(event) {
        this.CertName = event.target.value;
    }
    CertIdChange(event) {
        this.CertId = event.target.value;
    }
    CertCostChange(event) {
        this.CertCost = event.target.value;
    }
    CertCommChange(event) {
        this.CertComm = event.target.value;
    }

    VouIdChange(event) {
        this.VouId = event.target.value;
    }
    VouCostChange(event) {
        this.VouCost = event.target.value;
    }
    VouValidChange(event) {
        this.VouValid = event.target.value;
        this.openlookup = true;
    }

    VouCommChange(event) {
        this.VouComm = event.target.value;
    }

    handleAutoSelect(event) {
        var nav = event.detail;

        this.VouCert = nav.selectedRecordName;
        this.CertRecordId = nav.selectedRecordId;
        // alert(this.VouCert);
        //alert(this.CertRecordId);
    }

    // empform() {
    //     // alert('Button Working');
    //     this.empflag = true;
    // }

    certform() {
        // alert('Cert Button Working');
        this.certflag = true;
    }

    vouform() {
        //alert('Vou Button Working');
        //alert(this.selectedRecordId);
        //console.log('Voucher popup');
        this.vouflag = true;
        //this.openlookup;
        //String st= selectedRecord.Id
    }


    // addemp() {
    //     // alert(this.EmpName+' '+this.EmpId+' '+this.EmpMail);
    //     addemployee({ EmpName: this.EmpName, EmpId: this.EmpId, EmpMail: this.EmpMail, EmpPS: this.EmpPS, EmpSS: this.EmpSS, EmpExp: this.EmpExp, EmpComm: this.EmpComm }).then(result => { if (result == 'Employee Created Successfully') { alert(result); } else alert(result); });
    //     this.empflag = false;
    //     //location.reload();
    //     // alert('Employee Added Successfully');
    // }

    addcert() {
        //alert(this.CertName+' '+this.CertId+' '+this.CertCost);
        addcertification({ CertName: this.CertName, CertId: this.CertId, CertCost: this.CertCost, CertComm: this.CertComm }).then(result => { if (result == 'Certification Created Successfully') { alert(result);refreshApex(this.valueOfViewCertifications); } else alert(result); });
        this.certflag = false;
        this.CertName = '';
        this.CertId = '';
        this.CertCost = '';
        this.CertComm = '';

        //location.reload();
        // alert('Certification Added Successfully');
    }

    addvou() {
        //alert(this.VouId+' '+this.VouCost+' '+this.VouCert);
        addvoucher({ VouId: this.VouId, VouCost: this.VouCost, VouValid: this.VouValid, VouCert: this.CertRecordId, VouComm: this.VouComm }).then(result => { if (result == 'Voucher Added Successfully') { alert(result);refreshApex(this.valueOfViewVouchers); } else alert(result); });

        this.vouflag = false;
        this.VouId = '';
        this.VouCost = '';
        this.VouValid = '';
        this.VouComm = '';
        // this.openlookup=false;
        // location.reload();
        //alert('Voucher Added Successfully');
    }

    closepopup() {
        this.empflag = false;

        this.certflag = false;
        this.CertName = '';
        this.CertId = '';
        this.CertCost = '';
        this.CertComm = '';

        this.vouflag = false;
        this.VouId = '';
        this.VouCost = '';
        this.VouValid = '';
        this.VouComm = '';

        this.viewvouflag=false;
        this.viewempflag=false;
        this.viewcertflag=false;
        // this.reqflag=false;
        //this.openlookup=false;
    }

}
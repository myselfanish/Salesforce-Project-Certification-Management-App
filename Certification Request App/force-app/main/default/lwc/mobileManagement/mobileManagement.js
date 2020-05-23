import { LightningElement,track,wire } from 'lwc';
import getmobiles from '@salesforce/apex/MobileManagement.getAllMobiles';
import addmobile from '@salesforce/apex/MobileManagement.addNewMobile';
import { refreshApex } from '@salesforce/apex';
export default class MobileManagement extends LightningElement {

@track Mobiles;
MobilesList;
MobName='';
MobId='';
MobBrand='';
MobPrice='';
MobRecordId;
@wire (getmobiles)
    getApexData(value){
        this.MobilesList = value;
        const { error, data } = value;
        if(data){
            console.log(data);
            this.Mobiles=data;
        }
        if(error){
            console.log('Error has occured');
        }
    }


    MobNameChange(event) {
        this.MobName = event.target.value;
    }
    MobIdChange(event) {
        this.MobId = event.target.value;
    }
    MobBrandChange(event) {
        this.MobBrand = event.target.value;
    }
    MobPriceChange(event) {
        this.MobPrice = event.target.value;
    }

    addnewmobile() {
        
        if(this.MobName != '' && this.MobId !='' && this.MobBrand !='' && this.MobPrice !='')
        {
        alert(this.MobName+' '+this.MobId+' '+this.MobBrand+' '+this.MobPrice);
        addmobile({ MobName: this.MobName, MobId: this.MobId, MobBrand: this.MobBrand, MobPrice: this.MobPrice }).then(result => { if (result == 'Mobile Added Successfully') { alert(result);refreshApex(this.MobilesList);this.MobName='';this.MobId='';this.MobBrand='';this.MobPrice=''; } else alert(result); });
        }
        else{
            alert('Enter all Fields');
        }
    
    }












}
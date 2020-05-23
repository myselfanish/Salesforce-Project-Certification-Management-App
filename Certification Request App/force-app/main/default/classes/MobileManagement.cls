public with sharing class MobileManagement {
    public MobileManagement() {}

    @AuraEnabled(cacheable=true)
    public static List<Mobile__c> getAllMobiles(){
        List<Mobile__c> mobiles = [SELECT Mobile_Id__c,Price__c,Brand__c,Name,Id FROM Mobile__c] ;
        return mobiles;
    }

    @AuraEnabled
    public static String addNewMobile(String MobName,String MobId,String MobBrand, Decimal MobPrice){
        Mobile__c newmob = new Mobile__c(Name=MobName, Mobile_Id__c=MobId, Brand__c=MobBrand,Price__c=MobPrice);
        
        try {insert newmob; }
        catch(Exception e){
             return e.getMessage();
        } 
        return 'Mobile Added Successfully';
        
    }
















}

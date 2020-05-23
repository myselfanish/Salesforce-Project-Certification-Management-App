public with sharing class CertificationRequests {
    public CertificationRequests() {}
    //Code for getting all the request records sorted by employee name
    @AuraEnabled(cacheable=true)
    public static List<Certification_Request__c> getAllRequests(){
        List<Certification_Request__c> reqs = [SELECT Employee__c,Certification__c,Status__c,Voucher__c,Due_Date__c,Comments__c,Name,Id FROM Certification_Request__c] ;
        return reqs;
    }
//=============================================================================================
    @AuraEnabled(cacheable=true)
    public static List<Test_Object__c> getAllRecords(){
        List<Test_Object__c> rec = [SELECT Name,Test_Field_Id__c,Test_Field_Notes__c,Id FROM Test_Object__c] ;
        return rec;
    }

//========================================================================================================
    @AuraEnabled(cacheable=true)
    public static List<Employee__c> getAllEmployees(){
        List<Employee__c> emps = [SELECT Name,Employee_ID__c,Email_for_Notifications__c,Primary_Skill__c,Secondary_Skill__c,Experience__c,Comments__c,Id FROM Employee__c] ;
        return emps;
    }

    @AuraEnabled(cacheable=true)
    public static List<Certification__c> getAllCertifications(){
        List<Certification__c> certs = [SELECT Name,Certification_ID__c,Certification_Cost__c,Id FROM Certification__c];
        return certs;
    }

    @AuraEnabled(cacheable=true)
    public static List<Voucher__c> getAllVouchers(){
        List<Voucher__c> vous = [SELECT Name,Certification__c,Active__c,Validity__c,Voucher_Cost__c,Comments__c,Id FROM Voucher__c WHERE Active__c=true];
        return vous;
    }
    //Code for getting request records where status is assigned
    @AuraEnabled(cacheable=true)
    public static List<Certification_Request__c> getDraftRequests(){
        List<Certification_Request__c> reqs = [SELECT Employee__c,Certification__c,Status__c,Voucher__c,Due_Date__c,Comments__c,Name,Id FROM Certification_Request__c WHERE Status__c='Draft' ORDER BY Name DESC NULLS FIRST] ;
        return reqs;
    }
    
    
    
    @AuraEnabled(cacheable=true)
    public static List<Certification_Request__c> getAssignedRequests(){
        List<Certification_Request__c> reqs = [SELECT Employee__c,Certification__c,Status__c,Voucher__c,Due_Date__c,Comments__c,Name,Id FROM Certification_Request__c WHERE Status__c='Assigned' ORDER BY Name DESC NULLS FIRST] ;
        return reqs;
    }
    @AuraEnabled(cacheable=true)
    public static List<Certification_Request__c> getApprovedRequests(){
        List<Certification_Request__c> reqs = [SELECT Employee__c,Certification__c,Status__c,Voucher__c,Due_Date__c,Comments__c,Name,Id FROM Certification_Request__c WHERE Status__c='Approved' ORDER BY Name DESC NULLS FIRST] ;
        return reqs;
    }
    @AuraEnabled(cacheable=true)
    public static List<Certification_Request__c> getSubmittedRequests(){
        List<Certification_Request__c> reqs = [SELECT Employee__c,Certification__c,Status__c,Voucher__c,Due_Date__c,Comments__c,Name,Id FROM Certification_Request__c WHERE Status__c='Submitted' ORDER BY Name DESC NULLS FIRST] ;
        return reqs;
    }
    @AuraEnabled(cacheable=true)
    public static List<Certification_Request__c> getRejectedRequests(){
        List<Certification_Request__c> reqs = [SELECT Employee__c,Certification__c,Status__c,Voucher__c,Due_Date__c,Comments__c,Name,Id FROM Certification_Request__c WHERE Status__c='Rejected' ORDER BY Name DESC NULLS FIRST] ;
        return reqs;
    }
    @AuraEnabled(cacheable=true)
    public static List<Certification_Request__c> getResultRequests(){
        List<Certification_Request__c> reqs = [SELECT Employee__c,Certification__c,Status__c,Voucher__c,Due_Date__c,Comments__c,Name,Id FROM Certification_Request__c WHERE Status__c='Passed' AND Status__c='Failed' ORDER BY Name DESC NULLS FIRST] ;
        return reqs;
    }
    @AuraEnabled(cacheable=true)
    public static List<Certification_Request__c> getPassedRequests(){
        List<Certification_Request__c> reqs = [SELECT Employee__c,Certification__c,Status__c,Voucher__c,Due_Date__c,Comments__c,Name,Id FROM Certification_Request__c WHERE Status__c='Passed' ORDER BY Name DESC NULLS FIRST] ;
        return reqs;
    }
    @AuraEnabled(cacheable=true)
    public static List<Certification_Request__c> getFailedRequests(){
        List<Certification_Request__c> reqs = [SELECT Employee__c,Certification__c,Status__c,Voucher__c,Due_Date__c,Comments__c,Name,Id FROM Certification_Request__c WHERE Status__c='Failed' ORDER BY Name DESC NULLS FIRST] ;
        return reqs;
    }
    //code for adding new employee record
    @AuraEnabled
    public static String addNewEmp(String EmpName,Decimal EmpId,String EmpMail,String EmpPS,String EmpSS,Decimal EmpExp,String EmpComm){
        Employee__c newemp = new Employee__c(Name=EmpName, Employee_ID__c=EmpId, Email_for_Notifications__c=EmpMail, Primary_Skill__c=EmpPS, Secondary_Skill__c=EmpSS, Experience__c=EmpExp, Comments__c=EmpComm);
        
        try {insert newemp; }
        catch(Exception e){
             return e.getMessage();
        } 
        return 'Employee Created Successfully';
        
    }
//==============================================================================================================
    @AuraEnabled
    public static String addNewRec(String ObjName,Decimal FieldId,String FieldNotes){
        Test_Object__c newrec = new Test_Object__c(Name=ObjName, Test_Field_Id__c=FieldId, Test_Field_Notes__c=FieldNotes);
        
        try {insert newrec; }
        catch(Exception e){
             return e.getMessage();
        } 
        return 'Record Created Successfully';
        
    }
//=========================================================================================================







    //code for adding new certification record
    @AuraEnabled
    public static String addNewCert(String CertName, Decimal CertId, Decimal CertCost, String CertComm){
        Certification__c newcert = new Certification__c(Name=CertName, Certification_ID__c=CertId, Certification_Cost__c=CertCost, Certification_Comments__c=CertComm);
       
          
        try {insert newcert; }
        catch(Exception e){
             return e.getMessage();
        } 
        return 'Certification Created Successfully';       
    }
    //code for adding new voucher record
    @AuraEnabled
    public static String addNewVou(String VouId, Decimal VouCost, Date VouValid,String VouCert, String VouComm){
        Voucher__c newvou = new Voucher__c(Name=VouId, Voucher_Cost__c=VouCost, Validity__c=VouValid, Certification__c=VouCert, Comments__c=VouComm);
       try {insert newvou; }
       catch(Exception e){
            return e.getMessage();
       } 
       return 'Voucher Added Successfully';    
    }


    //code for adding new Request record
    @AuraEnabled
    public static String addNewReq(String ReqEmp, String ReqCert, Date ReqDueDate, String ReqComm){
        Certification_Request__c newreq = new Certification_Request__c(Employee__c=ReqEmp, Certification__c=ReqCert, Due_Date__c=ReqDueDate, Comments__c=ReqComm);
        try {insert newreq; }
        catch(Exception e){
            //throw e;
            return e.getMessage();
       } 
       return 'Request Added Successfully';      
    }



    //code for submitting request for approval
    @AuraEnabled
    public static String updateRequest(String ReqRecordId,String status){
        Certification_Request__c updreq = new Certification_Request__c(Id=ReqRecordId,Status__c=status);
        try {update updreq; }
        catch(Exception e){
            //throw e;
            return e.getMessage();
       } 
       return 'Request Updated Successfully';     
    }

//============================================================================================================
@AuraEnabled
    public static String updateRecord(String ObjRecordId,String ObjName,Decimal FieldId,String FieldNotes){
        Test_Object__c updrec = new Test_Object__c(Id=ObjRecordId,Name=ObjName,Test_Field_Id__c=FieldId,Test_Field_Notes__c=FieldNotes);
        try {update updrec; }
        catch(Exception e){
            //throw e;
            return e.getMessage();
       } 
       return 'Record Updated Successfully';     
    }
//===========================================================================================================

}

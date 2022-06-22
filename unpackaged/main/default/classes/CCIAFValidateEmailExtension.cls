public class CCIAFValidateEmailExtension 
{
    public CCIAFValidateEmailExtension(CCIAFTemplateController stc)
    {
    }
    
	public void validate()
    {
        Id usr = ApexPages.currentPage().getParameters().get('id');

        User u = [SELECT Id, Email_Validated__c FROM User WHERE Id = :usr];
        u.Email_Validated__c = true;
        update u;
    }
}
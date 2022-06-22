public class CCIAFRegisterController 
{
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Email { get; set; }
    public string Password { get; set; }
    public string ConfirmPassword { get; set; }
    public string OrgType { get; set; }
    public string OrgName { get; set; }
    public string JobTitle { get; set; }
    
    public void validateNotEmpty(string val, string err)
    {
        if (val == null || string.isBlank(val))
        {
            ApexPages.addMessage(new ApexPages.Message(ApexPages.Severity.ERROR, err));
        }
    }
    
    public PageReference register()
    {
        if ([SELECT Id FROM User WHERE Email = :Email AND Profile.Name = 'CCIAF User'].size() != 0)
        {
            ApexPages.addMessage(new ApexPages.Message(ApexPages.Severity.ERROR, 'A user with this email address already exists.'));
            return null;
        }
        
        validateNotEmpty(FirstName, 'You must enter a first name.');
        validateNotEmpty(LastName, 'You must enter a last name.');
        validateNotEmpty(Password, 'You must enter a password.');
        validateNotEmpty(ConfirmPassword, 'You must confirm your password.');
        validateNotEmpty(Email, 'You must enter an email address.');
        validateNotEmpty(OrgType, 'You must select an organisation type.');
        validateNotEmpty(OrgName, 'You must enter an organisation name.');
        validateNotEmpty(JobTitle, 'You must enter a job title.');
        
        if (ApexPages.hasMessages())
            return null;
        
        
        if (Password != ConfirmPassword)
        {
            ApexPages.addMessage(new ApexPages.Message(ApexPages.Severity.ERROR, 'Your password doesn\'t match.'));
            return null;
        }
        
        User usr = new User();
        usr.Email = Email;
        usr.Username = Email + '.cciaf';
        usr.FirstName = FirstName;
        usr.LastName = LastName;
        usr.Title = JobTitle;
        usr.LocaleSidKey = 'en_US';
        usr.EmailEncodingKey = 'UTF-8';
        usr.LanguageLocaleKey = 'en_US';
        usr.TimeZoneSidKey = 'Europe/London';
        usr.CommunityNickname = usr.FirstName.left(4) + usr.LastName.left(4) + Integer.valueof((Math.random() * 100));
        usr.Alias = usr.FirstName.left(1) + usr.LastName.left(4);
        usr.Approved__c = false;
        
        Account acc;
        List<Account> accs = [SELECT Id FROM Account WHERE Name = :OrgName LIMIT 1];
        if (accs.size() == 1)
        {
            acc = accs[0];
        }
        else
        {
            acc = new Account();
            acc.Name = OrgName;
            insert acc;
        }
        
        Id userId;
        try 
        {
            system.debug(usr);
            userId = Site.createExternalUser(usr, acc.Id, Password, false);
        }
        catch(Site.ExternalUserCreateException ex) 
        {
            ApexPages.addMessage(new ApexPages.Message(ApexPages.Severity.ERROR, ex.getMessage()));
            return null;
        }
        
        
        Support_Request__c cs = new Support_Request__c();
        cs.RecordTypeId = [SELECT Id FROM RecordType WHERE SObjectType = 'Support_Request__c' AND DeveloperName = 'New_User_Request' LIMIT 1].Id;
        cs.First_Name__c = FirstName;
        cs.Last_Name__c = LastName;
        cs.Email__c = Email;
        cs.Organisation_Name__c = OrgName;
        cs.Organisation_Type__c = OrgType;
        cs.Job_Title__c = JobTitle;
        cs.User__c = userId;
        insert cs;
        
        ApexPages.addMessage(new ApexPages.Message(ApexPages.Severity.ERROR, 'User and case created.'));
        return null;
    }
    
}
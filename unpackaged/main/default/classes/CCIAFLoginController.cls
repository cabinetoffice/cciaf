global without sharing class CCIAFLoginController 
{
    global String username {get; set;}
    global String password {get; set;}
    
    global PageReference redirect()
    {
        // If they are already logged in/have a session, pass them through
        if (UserInfo.getUserType() != 'Guest')
        {
        	String startUrl = System.currentPageReference().getParameters().get('startURL');
            if (startUrl != null)
            {
                return new PageReference(startUrl);
            }
            else
            {
            	return Page.CCIAFHome;
            }
        }
        return null;
    }
    
    
    public void validateNotEmpty(string val, string err)
    {
        if (val == null || string.isBlank(val))
        {
            ApexPages.addMessage(new ApexPages.Message(ApexPages.Severity.ERROR, err));
        }
    }
    
    global PageReference login() {
        String startUrl = System.currentPageReference().getParameters().get('startURL');

        if (startUrl == null || string.isBlank(startUrl))
        {
            startUrl = Page.CCIAFHome.getUrl();
        }
        
        validateNotEmpty(username, 'You must enter a username.');
        validateNotEmpty(password, 'You must enter a password.');
        
        if (ApexPages.hasMessages())
        {
            return null;
    	}
        
        Set<Id> profileIds = new Set<Id>();
        for (NetworkMemberGroup nmg : [SELECT ParentId FROM NetworkMemberGroup where NetworkId = :Network.getNetworkId()])
        {
            profileIds.add(nmg.ParentId);
        }
          
        List<User> usrs = [SELECT Id, Username, Approved__c, Email_validated__c FROM User WHERE (Email = :username OR Username = :username) AND ProfileId IN :profileIds AND UserType <> 'Standard' AND IsActive = true LIMIT 1];
        
        if (usrs.size() > 0)
        {
            User u = usrs[0];
            if (u.Approved__c && u.Email_validated__c)
            {
                return Site.login(usrs[0].Username, password, startUrl);
            }
            else
            {
                ApexPages.addMessage(new ApexPages.Message(ApexPages.Severity.ERROR, 'Your user has not been approved yet or you have not validated your email address.'));
                return null;
            }
        }
        else
        {
            ApexPages.addMessage(new ApexPages.Message(ApexPages.Severity.ERROR, 'There is no user associated with that email address.'));
            return null;
        }
    }
    
   	global CCIAFLoginController () {}
}
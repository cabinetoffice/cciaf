/**
 * An apex page controller that exposes the site forgot password functionality
 */
public with sharing class CCIAFForgotPasswordController
{
    public String username {get; set;}   
    
    public CCIAFForgotPasswordController() {}
	
  	public PageReference forgotPassword() 
    {
        Set<Id> profileIds = new Set<Id>();
        for (NetworkMemberGroup nmg : [SELECT ParentId FROM NetworkMemberGroup where NetworkId = :Network.getNetworkId()])
        {
            profileIds.add(nmg.ParentId);
        }
        
        List<User> usrs = [SELECT Id, Username, Approved__c, Email_validated__c FROM User WHERE (Email = :username OR Username = :username) AND ProfileId IN :profileIds AND UserType <> 'Standard' AND IsActive = true LIMIT 1];
        
        if (usrs.size() > 0)
        {
            User u = usrs[0];
            Site.forgotPassword(u.Username);
        }
        
        PageReference pr = Page.CCIAFForgotPasswordConfirm;
  		pr.setRedirect(true);
  		
        return pr;
  	}
}
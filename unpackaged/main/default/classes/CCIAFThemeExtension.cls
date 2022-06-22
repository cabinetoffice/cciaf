public class CCIAFThemeExtension 
{
    CCIAF controller;
    
    public CCIAF.Theme Theme { get; set; }
	public CCIAFThemeExtension(CCIAF ctl)
    {
        controller = ctl;
        Theme = ctl.Service.Themes.get(ApexPages.currentPage().getParameters().get('theme'));
    }
}
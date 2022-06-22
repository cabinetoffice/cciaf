public class CCIAFSectionExtension 
{
    CCIAF controller;
    
    public CCIAF.Section Section { get; set; }
	public CCIAFSectionExtension(CCIAF ctl)
    {
        controller = ctl;
        Section = ctl.Service.Sections.get(ApexPages.currentPage().getParameters().get('section'));
    }
}
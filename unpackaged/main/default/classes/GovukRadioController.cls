public class GovukRadioController 
{
    public string SObjectName { get; set; }
    public string SObjectField { get; set; }
    public string Values { get; set; }
    public string DefaultValue { get; set; }
        
    public GovukRadioController()
    {
    }
    
    public List<Item> getItems()
    {
        List<Item> out = new List<Item>();
		if (SObjectName != null)
        {
            for (Schema.PicklistEntry ple : Schema.getGlobalDescribe().get(SObjectName).getDescribe().fields.getMap().get(SObjectField).getDescribe().getPicklistValues())
            {
                if (!ple.isActive())
                    continue;
                
                Item i = new Item();
                i.Label = ple.getLabel();
                i.Value = ple.getValue();
                i.IsDefault = ple.isDefaultValue();
                out.add(i);
            }
        }
        else
        {
            system.debug(Values);
            for (string str : Values.split('\\|'))
            {
                Item i = new Item();
                i.Label = str;
                i.Value = str;
                i.IsDefault = str == DefaultValue;
                out.add(i);
            }
        }
        return out;
    }
    
    public class Item
    {
        public string Label { get; set; }
        public string Value { get; set; }
        public boolean IsDefault { get; set; }
    }
}
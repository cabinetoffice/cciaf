public class CCIAF 
{
    public User ExtendedUser { get; set; }
    public Service Service { get; set; }
    
    public Assessment__c Assessment { get; set; }
    public Assessment__c getAssessment(Id assessmentId)
    {
        List<Assessment__c> r = [SELECT Id, Name, Stage__c, Internal_Reference__c FROM Assessment__c WHERE Id = :assessmentId];
        
        if (r.size() > 0)
            return r[0];
        
        return null;
    }
    
	public CCIAF()
    {
        ExtendedUser = [SELECT Id, AccountId, Account.Current_Assessment__c FROM User WHERE Id = :UserInfo.getUserId()];
        
        Service__mdt svc = [SELECT Id, Label, DeveloperName FROM Service__mdt WHERE DeveloperName = 'CCIAF'];
        Service = new Service();
        Service.Definition = svc;
        Service.OrderedThemes = new List<Theme>();
        Service.Themes = new Map<string, Theme>();
        Service.Sections = new Map<string, Section>();
        Service.Questions = new Map<string, Question>();
        
        Set<Id> sections = new Set<Id>();
        integer numThemes = 1;
        for (Theme__mdt t : [SELECT Id, DeveloperName, Label, Display_Text__c, Display_Order__c, (SELECT Id, DeveloperName, Label, Display_Text__c, Display_Order__c FROM Sections__r ORDER BY Display_Order__c ASC) FROM Theme__mdt WHERE Service__c = :Service.Definition.Id ORDER BY Display_Order__c ASC])
        {
            Theme theme = new Theme();
            theme.Service = Service;
            theme.Definition = t;
            theme.OrderedSections = new List<Section>();
            theme.Sections = new Map<string, Section>();
            theme.Questions = new Map<string, Question>();
            theme.Index = numThemes;
            numThemes = numThemes + 1;
            
            integer numSections = 1;
            for (Section__mdt s : t.Sections__r)
            {
                Section section = new Section();
                section.Definition = s;
                section.Questions = new Map<string, Question>();
                section.OrderedQuestions = new List<Question>();
                section.Index = numSections;
                numSections = numSections + 1;
                
                sections.add(s.Id);
                theme.OrderedSections.add(section);
                theme.Sections.put(s.DeveloperName, section);
                Service.Sections.put(s.DeveloperName, section);
            }

            system.debug(theme);
            Service.OrderedThemes.add(theme);            
            Service.Themes.put(t.DeveloperName, theme);
        }
        
        for (Question__mdt q : [SELECT Id, Section__r.DeveloperName, Section__r.Theme__r.DeveloperName, DeveloperName, Label, Question__c, Help_text__c, Custom_page__c, Display_Order__c, (SELECT Id, DeveloperName, Answer_Text__c, Score__c, Rating__c FROM Answers__r ORDER BY Display_Order__c ASC) FROM Question__mdt WHERE Section__c IN :sections ORDER BY Display_Order__c ASC])
        {
            Question qst = new Question();
            qst.Definition = q;
            qst.Answers = new Map<string, Answer__mdt>();
            for (Answer__mdt a : q.Answers__r)
            {
                qst.Answers.put(a.Answer_Text__c, a);
            }
            
            Theme t = Service.Themes.get(q.Section__r.Theme__r.DeveloperName);
            Section sec = t.Sections.get(q.Section__r.DeveloperName);
            sec.Theme = t;
            sec.OrderedQuestions.add(qst);
            sec.Questions.put(q.DeveloperName, qst);
            t.Questions.put(q.DeveloperName, qst);
            Service.Questions.put(q.DeveloperName, qst);
            qst.Index = t.Questions.size();
            
            qst.Section = sec;
        }
    }
    
    public Assessment__c createAssessment()
    {
        Assessment__c assessment = new Assessment__c();
        assessment.Account__c = ExtendedUser.AccountId;
        assessment.Metadata_Definition__c = Service.Definition.DeveloperName;
        insert assessment;
        
        List<Assessment_Theme__c> themes = new List<Assessment_Theme__c>();
        for (Theme t : Service.OrderedThemes)
        {
            Assessment_Theme__c theme = new Assessment_Theme__c();
            theme.Assessment__c = assessment.Id;
            theme.Metadata_Definition__c = t.Definition.DeveloperName;
            theme.Label__c = t.Definition.Display_Text__c;
            theme.Display_Order__c = t.Definition.Display_Order__c;
            t.Record = theme;
            themes.add(theme);
        }
        insert themes;
        
        List<Assessment_Section__c> sections = new List<Assessment_Section__c>();
        for (Theme t : Service.OrderedThemes)
        {
            for (Section s : t.OrderedSections)
            {
                Assessment_Section__c sec = new Assessment_Section__c();
                sec.Theme__c = t.Record.Id;
                sec.Label__c = s.Definition.Display_Text__c;
                sec.Metadata_Definition__c = s.Definition.DeveloperName;
                s.Record = sec;
                sections.add(sec);
            }
        }
        insert sections;
        
        return assessment;
    }
    
    public void init()
    {        
        // Try get an assessment by ID.
        PageReference pg = ApexPages.CurrentPage();
        if (pg != null)
        {
            Map<string, string> params = ApexPages.currentPage().getParameters();
            Id id = params.get('id');
            if (id == null)
            {
                Assessment = getAssessment(id);
            }
        }
        
        // If there wasn't an ID, try get the most recent assessment
        if (Assessment == null)
        {
            Assessment = getAssessment(ExtendedUser.Account.Current_Assessment__c);
        }
        
        // Otherwise create a new assessment.
        if (Assessment == null)
        {
            Assessment = createAssessment();
            
            Account a = new Account();
            a.Id = ExtendedUser.AccountId;
            a.Current_Assessment__c = Assessment.Id;
            update a;
        }
        
        for (Assessment_Theme__c t : [SELECT Id, Metadata_Definition__c FROM Assessment_Theme__c WHERE Assessment__c = :Assessment.Id])
        {
            Theme r = Service.Themes.get(t.Metadata_Definition__c);
            if (r != null)
            {
                r.Record = t;
            }
        }
        
        for (Assessment_Section__c s : [SELECT Id, Metadata_Definition__c FROM Assessment_Section__c WHERE Theme__r.Assessment__c = :Assessment.Id])
        {
            Section r = Service.Sections.get(s.Metadata_Definition__c);
            if (r != null)
            {
                r.Record = s;
            }
        }
        
        for (Assessment_Answer__c a : [SELECT Id, Metadata_Definition__c, Answer__c, Score__c, Rating__c FROM Assessment_Answer__c WHERE Assessment_Section__r.Theme__r.Assessment__c = :Assessment.Id])
        {
            Question r = Service.Questions.get(a.Metadata_Definition__c);
            if (r != null)
            {
                r.Record = a;
                r.Answer = a.Answer__c;
            }
            else
            {
                Assessment_Answer__c a2 = new Assessment_Answer__c();
                a2.Assessment__c = Assessment.Id;
                a2.Metadata_Definition__c = r.Definition.DeveloperName;
            }
        }
    }
    
    public PageReference reload()
    {
        PageReference pg = new PageReference(ApexPages.currentPage().getUrl());
        pg.setRedirect(true);
        pg.getParameters().putAll(ApexPages.CurrentPage().getParameters());
        return pg;
    }
    
    public PageReference saveCCIAF()
    {
        List<Assessment_Answer__c> answers = new List<Assessment_Answer__c>();
        for (Question a : Service.Questions.values())
        {
            if (a.Answer != null && !string.isBlank(a.Answer) && a.Record == null)
            {
                a.Record = new Assessment_Answer__c();
                a.Record.Answer__c = a.Answer;
                a.Record.Metadata_Definition__c = a.Definition.DeveloperName;
                a.Record.Assessment_Section__c = a.Section.Record.Id;
                a.Record.Assessment__c = Assessment.Id;
                a.Record.Question__c = a.Definition.Question__c;
                
                Answer__mdt def = a.getAnswerDef();
                if (def != null)
                {
                    a.Record.Score__c = def.Score__c;
                    a.Record.Rating__c = def.Rating__c;
                }
                answers.add(a.Record);
            }
            else if (a.Record != null)
            {
                a.Record.Answer__c = a.Answer;
                a.Record.Question__c = a.Definition.Question__c;
                
                Answer__mdt def = a.getAnswerDef();
                if (def != null)
                {
                    a.Record.Score__c = def.Score__c;
                	a.Record.Rating__c = def.Rating__c;
                }
                answers.add(a.Record);
            }
        }
        upsert answers;
        
        return reload();
    }
    
    public List<Stage> getStages()
    {
        List<Stage> out = new List<Stage>();
        boolean complete = true;
        List<Schema.PicklistEntry> ples = Schema.Assessment__c.fields.Stage__c.getDescribe().getPicklistValues();
        for (Schema.PicklistEntry ple : ples)
        {
            Stage s = new Stage();
            s.Label = ple.getLabel();
            s.IsCurrent = Assessment.Stage__c == ple.getValue();
                        
            if (s.IsCurrent)
                complete = false;
            
            s.IsComplete = complete;
            
            out.add(s);
        }
        return out;
    }
    
    public class Stage
    {
        public string Label { get; set; }
        public boolean IsComplete { get; set; }
        public boolean IsCurrent { get; set; }
    }
    
    public class Service
    {
        public Service__mdt Definition { get; set; }
        
        public List<Theme> OrderedThemes { get; set; }
        public Map<string, Theme> Themes { get; set; }
        public Map<string, Section> Sections { get; set; }
        public Map<string, Question> Questions { get; set; }
    }
    
    public class Theme
    {
        public integer Index { get; set; }
        public Service Service { get; set; }
        public Theme__mdt Definition { get; set; }
        public Assessment_Theme__c Record { get; set; }
        
        public List<Section> OrderedSections { get; set; }
        public Map<string, Section> Sections { get; set; }
        public Map<string, Question> Questions { get; set; }
                
        public integer getNumQuestions()
        {
            return Questions.values().size();
        }
        
        public integer getNumQuestionsComplete()
        {
            integer out = 0;
            for (Question q : Questions.values())
            {
                if (q.Record != null)
                {
                    out = out + 1;
                }
            }
            return out;
        }
        
        public string getLabel()
        {
            if (Record != null)
            {
                
            }
            return Definition.Display_Text__c;
        }
    }
    
    public class Section
    {
        public integer Index { get; set; }
        public Theme Theme { get; set; }
        public Section__mdt Definition { get; set; }
        public Assessment_Section__c Record { get; set; }
        
        public List<Question> OrderedQuestions { get; set; }
        public Map<string, Question> Questions { get; set; }
        
        
        public string getLabel()
        {
            if (Record != null)
            {
                
            }
            return Definition.Label;
        }
        
        public integer getNumQuestions()
        {
            return Questions.values().size();
        }
        
        public integer getNumQuestionsComplete()
        {
            integer out = 0;
            for (Question q : Questions.values())
            {
                if (q.Record != null)
                {
                    out = out + 1;
                }
            }
            return out;
        }
    }
    
    public class Question
    {
        public integer Index { get; set; }
        public Section Section { get; set; }
        public Question__mdt Definition { get; set; }
        public Assessment_Answer__c Record { get; set; }
        
        public string Answer { get; set; }
        public Map<string, Answer__mdt> Answers { get; set; }
        
       	public List<Answer__mdt> getAllAnswers()
        {
            return Answers.values();
        }
        
        public string getLabel()
        {
            if (Record != null)
            {
                
            }
            return Definition.Question__c;
        }
        
        public Answer__mdt getAnswerDef()
        {
            Answer__mdt a = Answers.get(Answer);
            if (a == null)
                return null;
            
            return a;
        }
        
        public List<SelectOption> getOptions()
        {
            List<SelectOption> opts = new List<SelectOption>();
            opts.add(new SelectOption('Fully meeting', 'Please select'));
            
            List<Answer__mdt> answers = getAllAnswers();            
            if (answers.size() == 0)
            {
                for (Answer__mdt a : answers)
                {
                    SelectOption opt = new SelectOption(a.Id, a.Answer_Text__c);
                    opts.add(opt);
                }
            }
            else
            {
                opts.add(new SelectOption('Fully meeting', 'Fully meeting'));
                opts.add(new SelectOption('Partially meeting', 'Partially meeting'));
                opts.add(new SelectOption('Not or seldom meeting', 'Not or seldom meeting'));
            }
            return opts;
        }
    }
}
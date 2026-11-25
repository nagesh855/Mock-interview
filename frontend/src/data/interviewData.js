export const LANGUAGES = [
  {
    id: 'en',
    code: 'en-US',
    name: 'English',
    nativeName: 'English',
    flag: '🌐',
    description: 'Standard interview preparation with formal vocabulary and national exam standards.'
  },
  {
    id: 'te',
    code: 'te-IN',
    name: 'Telugu',
    nativeName: 'తెలుగు',
    flag: '🇮🇳',
    description: 'మాట్లాడే భాషలో సహజంగా ఇంటర్వ్యూ ప్రాక్టీస్ చేయండి. APPSC, SI, కానిస్టేబుల్ అభ్యర్థులకు ప్రత్యేక శిక్షణ.'
  },
  {
    id: 'hi',
    code: 'hi-IN',
    name: 'Hindi',
    nativeName: 'हिन्दी',
    flag: '🇮🇳',
    description: 'अपनी पसंदीदा भाषा में आत्मविश्वास के साथ यूपीएससी, एसएससी और रेलवे साक्षात्कार का अभ्यास करें।'
  }
];

export const CATEGORIES_DATA = {
  en: [
    {
      id: 'upsc',
      name: 'UPSC',
      fullName: 'Union Public Service Commission',
      icon: '🏛️',
      description: 'Civil Services Personality Test preparation focusing on DAF, current affairs, ethics, and administrative decision-making.',
      badge: 'Civil Services',
      sampleTopics: ['Detailed Application Form (DAF)', 'National & Global Affairs', 'Administrative Ethics', 'Public Policy', 'Situational Dilemmas']
    },
    {
      id: 'appsc',
      name: 'APPSC',
      fullName: 'Andhra Pradesh Public Service Commission',
      icon: '🏢',
      description: 'Group-I & Group-II interview readiness covering state governance, Andhra Pradesh geography, bifurcation issues, and welfare schemes.',
      badge: 'State Services',
      sampleTopics: ['AP State Policies & Welfare', 'Socio-Economic Survey', 'Local Governance', 'Bifurcation Act', 'District Administration']
    },
    {
      id: 'rrb',
      name: 'RRB',
      fullName: 'Railway Recruitment Board',
      icon: '🚆',
      description: 'Interviews for NTPC, Junior Engineer (JE), Assistant Loco Pilot (ALP), and supervisory railway operations.',
      badge: 'Railways',
      sampleTopics: ['Railway Safety Protocols', 'Technical Aptitude', 'Workplace Crisis Handling', 'Passenger Amenities', 'Signaling & Operations']
    },
    {
      id: 'ssc-cgl',
      name: 'SSC CGL',
      fullName: 'Staff Selection Commission - Combined Graduate Level',
      icon: '📋',
      description: 'Verification and personality rounds for Assistant Audit Officer, Inspector of Central Excise, CBI, and Enforcement Officer.',
      badge: 'Central Services',
      sampleTopics: ['Taxation & Auditing Fundamentals', 'Economic Policy & GST', 'General Intelligence', 'Departmental Hierarchies', 'Integrity Scenarios']
    },
    {
      id: 'banking',
      name: 'Banking',
      fullName: 'IBPS PO / SBI PO / Clerk / RBI Grade B',
      icon: '🏦',
      description: 'Specialized banking interview practice covering monetary policy, financial inclusion, digital banking, and customer service.',
      badge: 'Finance & Banking',
      sampleTopics: ['RBI Monetary Policy & Repo Rates', 'NPA & Loan Recovery', 'Digital Banking & UPI', 'KYC & AML Norms', 'Customer Conflict Resolution']
    },
    {
      id: 'si',
      name: 'SI',
      fullName: 'Sub Inspector of Police',
      icon: '👮',
      description: 'Law enforcement interview rounds for State Police and CAPF Sub-Inspectors testing legal awareness, physical firmness, and crime investigation.',
      badge: 'Police Services',
      sampleTopics: ['IPC / CrPC & New Criminal Laws', 'Law & Order Maintenance', 'Cybercrime Awareness', 'Community Policing', 'High-Stress Situational Handling']
    },
    {
      id: 'constable',
      name: 'Constable',
      fullName: 'Police Constable Recruitment',
      icon: '🛡️',
      description: 'Entry-level police recruitment viva and document verification testing local knowledge, duty dedication, and basic legal familiarity.',
      badge: 'Uniformed Services',
      sampleTopics: ['Role of Police in Society', 'Local Geography & Culture', 'First Responder Protocol', 'Discipline & Teamwork', 'Public Assistance']
    },
    {
      id: 'other-exams',
      name: 'Other Competitive Exams',
      fullName: 'Defense (CDS/AFCAT), State PSCs & Recruitment Boards',
      icon: '🎖️',
      description: 'Comprehensive preparation for state recruitments, defence SSB personal interviews, forest services, and public sector undertakings.',
      badge: 'Defense & Allied',
      sampleTopics: ['General Awareness & Motivation', 'Officer Like Qualities (OLQ)', 'Leadership & Team Building', 'State Specific General Knowledge', 'Service Orientation']
    }
  ],
  te: [
    {
      id: 'upsc',
      name: 'UPSC',
      fullName: 'యూనియన్ పబ్లిక్ సర్వీస్ కమిషన్',
      icon: '🏛️',
      description: 'సివిల్ సర్వీసెస్ పర్సనాలిటీ టెస్ట్ కోసం DAF, వర్తమాన వ్యవహారాలు, పరిపాలనా నైతికత మరియు నిర్ణయాలు తీసుకునే సామర్థ్యంపై ప్రత్యేక శిక్షణ.',
      badge: 'సివిల్ సర్వీసెస్',
      sampleTopics: ['DAF విశ్లేషణ', 'జాతీయ & అంతర్జాతీయ అంశాలు', 'పరిపాలనా నైతికత', 'ప్రజా విధానం', 'సమస్యాత్మక సందర్భాలు']
    },
    {
      id: 'appsc',
      name: 'APPSC',
      fullName: 'ఆంధ్రప్రదేశ్ పబ్లిక్ సర్వీస్ కమిషన్',
      icon: '🏢',
      description: 'గ్రూప్-1 & గ్రూప్-2 ఇంటర్వ్యూల కోసం రాష్ట్ర పరిపాలన, ఆంధ్రప్రదేశ్ భౌగోళిక అంశాలు, విభజన సమస్యలు మరియు సంక్షేమ పథకాలపై సమగ్ర అవగాహన.',
      badge: 'రాష్ట్ర సర్వీసులు',
      sampleTopics: ['AP ప్రభుత్వ విధానాలు & సంక్షేమం', 'సామాజిక-ఆర్థిక సర్వే', 'స్థానిక పాలన', 'రాష్ట్ర విభజన చట్టం', 'జిల్లా పరిపాలన']
    },
    {
      id: 'rrb',
      name: 'RRB',
      fullName: 'రైల్వే రిక్రూట్‌మెంట్ బోర్డ్',
      icon: '🚆',
      description: 'NTPC, జూనియర్ ఇంజనీర్ (JE), అసిస్టెంట్ లోకో పైలట్ (ALP) మరియు రైల్వే నిర్వహణ పోస్టుల ఇంటర్వ్యూల సాధన.',
      badge: 'రైల్వే రిక్రూట్‌మెంట్',
      sampleTopics: ['రైల్వే భద్రతా నియమాలు', 'సాంకేతిక నైపుణ్యాలు', 'సంక్షోభ నిర్వహణ', 'ప్రయాణీకుల సౌకర్యాలు', 'సిగ్నలింగ్ & ఆపరేషన్స్']
    },
    {
      id: 'ssc-cgl',
      name: 'SSC CGL',
      fullName: 'స్టాఫ్ సెలక్షన్ కమిషన్ - కంబైన్డ్ గ్రాడ్యుయేట్ లెవల్',
      icon: '📋',
      description: 'అసిస్టెంట్ ఆడిట్ ఆఫీసర్, సెంట్రల్ ఎక్సైజ్ ఇన్‌స్పెక్టర్, CBI మరియు ఎన్‌ఫోర్స్‌మెంట్ ఆఫీసర్ పోస్టుల పర్సనాలిటీ రౌండ్స్ శిక్షణ.',
      badge: 'కేంద్ర సర్వీసులు',
      sampleTopics: ['పన్నుల & ఆడిటింగ్ విధానాలు', 'ఆర్థిక వ్యవస్థ & GST', 'జనరల్ ఇంటెలిజెన్స్', 'విభాగాల నిర్మాణం', 'నిజాయితీ & సమగ్రత']
    },
    {
      id: 'banking',
      name: 'బ్యాంకింగ్',
      fullName: 'IBPS PO / SBI PO / క్లర్క్ / RBI గ్రేడ్ B',
      icon: '🏦',
      description: 'ద్రవ్య విధానం, ఆర్థిక చేరిక, డిజిటల్ బ్యాంకింగ్ మరియు కస్టమర్ సేవలపై దృష్టి సారించే ప్రత్యేక బ్యాంకింగ్ ఇంటర్వ్యూ సాధన.',
      badge: 'ఫైనాన్స్ & బ్యాంకింగ్',
      sampleTopics: ['RBI మానిటరీ పాలసీ & రెపో రేట్లు', 'NPA & రుణాల రికవరీ', 'డిజిటల్ బ్యాంకింగ్ & UPI', 'KYC & AML నిబంధనలు', 'కస్టమర్ సమస్యల పరిష్కారం']
    },
    {
      id: 'si',
      name: 'SI (సబ్ ఇన్‌స్పెక్టర్)',
      fullName: 'పోలీస్ సబ్ ఇన్‌స్పెక్టర్',
      icon: '👮',
      description: 'చట్టపరమైన అవగాహన, శారీరక దృఢత్వం మరియు నేర పరిశోధనలపై రాష్ట్ర పోలీస్ & CAPF SI ఇంటర్వ్యూల తయారీ.',
      badge: 'పోలీస్ సర్వీసులు',
      sampleTopics: ['నూతన క్రిమినల్ చట్టాలు', 'శాంతిభద్రతల పరిరక్షణ', 'సైబర్ క్రైమ్ నివారణ', 'కమ్యూనిటీ పోలీసింగ్', 'ఉద్రిక్త పరిస్థితుల నియంత్రణ']
    },
    {
      id: 'constable',
      name: 'కానిస్టేబుల్',
      fullName: 'పోలీస్ కానిస్టేబుల్ రిక్రూట్‌మెంట్',
      icon: '🛡️',
      description: 'పోలీస్ కానిస్టేబుల్ వైవా మరియు ధృవీకరణ రౌండ్స్ కోసం స్థానిక సమాచారం, విధి నిర్వహణ మరియు ప్రాథమిక చట్టాలపై సాధన.',
      badge: 'యూనిఫాం సర్వీసులు',
      sampleTopics: ['సమాజంలో పోలీస్ పాత్ర', 'స్థానిక సంస్కృతి & భౌగోళికం', 'ఫస్ట్ రెస్పాండర్ బాధ్యతలు', 'క్రమశిక్షణ & జట్టుకృషి', 'ప్రజా సహాయం']
    },
    {
      id: 'other-exams',
      name: 'ఇతర పోటీ పరీక్షలు',
      fullName: 'డిఫెన్స్ (CDS/AFCAT), స్టేట్ PSCs & ఇతర రిక్రూట్‌మెంట్లు',
      icon: '🎖️',
      description: 'రక్షణ దళాల SSB పర్సనల్ ఇంటర్వ్యూలు, అటవీ శాఖ మరియు ఇతర రాష్ట్ర బోర్డుల రిక్రూట్‌మెంట్లకు సమగ్ర శిక్షణ.',
      badge: 'డిఫెన్స్ & ఇతర పరీక్షలు',
      sampleTopics: ['జనరల్ అవేర్‌నెస్ & ప్రేరణ', 'ఆఫీసర్ లైక్ క్వాలిటీస్ (OLQ)', 'నాయకత్వ లక్షణాలు', 'రాష్ట్ర స్థాయి జనరల్ నాలెడ్జ్', 'సేవా దృక్పథం']
    }
  ],
  hi: [
    {
      id: 'upsc',
      name: 'UPSC',
      fullName: 'संघ लोक सेवा आयोग',
      icon: '🏛️',
      description: 'सिविल सेवा व्यक्तित्व परीक्षण (DAF, समसामयिक मुद्दे, प्रशासनिक नैतिकता और निर्णय क्षमता) के लिए विशेष तैयारी।',
      badge: 'सिविल सर्विसेज',
      sampleTopics: ['DAF विश्लेषण', 'राष्ट्रीय और अंतर्राष्ट्रीय मुद्दे', 'प्रशासनिक नैतिकता', 'सार्वजनिक नीति', 'स्थिति-आधारित निर्णय']
    },
    {
      id: 'appsc',
      name: 'APPSC',
      fullName: 'आंध्र प्रदेश लोक सेवा आयोग',
      icon: '🏢',
      description: 'ग्रुप-1 और ग्रुप-2 साक्षात्कारों के लिए राज्य प्रशासन, आंध्र प्रदेश भूगोल, विभाजन मुद्दे और कल्याणकारी योजनाओं की संपूर्ण तैयारी।',
      badge: 'राज्य सेवाएं',
      sampleTopics: ['AP राज्य नीतियां एवं कल्याण', 'सामाजिक-आर्थिक सर्वेक्षण', 'स्थानीय शासन', 'राज्य पुनर्गठन अधिनियम', 'जिला प्रशासन']
    },
    {
      id: 'rrb',
      name: 'RRB',
      fullName: 'रेलवे भर्ती बोर्ड',
      icon: '🚆',
      description: 'NTPC, जूनियर इंजीनियर (JE), सहायक लोको पायलट (ALP) और पर्यवेक्षी रेलवे पदों के साक्षात्कारों का अभ्यास।',
      badge: 'रेलवे भर्ती',
      sampleTopics: ['रेलवे सुरक्षा नियम', 'तकनीकी योग्यता', 'कार्यस्थल संकट प्रबंधन', 'यात्री सुविधाएं', 'सिग्नलिंग एवं संचालन']
    },
    {
      id: 'ssc-cgl',
      name: 'SSC CGL',
      fullName: 'कर्मचारी चयन आयोग - संयुक्त स्नातक स्तर',
      icon: '📋',
      description: 'सहायक लेखापरीक्षा अधिकारी, केंद्रीय उत्पाद शुल्क निरीक्षक, सीबीआई और प्रवर्तन अधिकारी के व्यक्तित्व परीक्षण की तैयारी।',
      badge: 'केंद्रीय सेवाएं',
      sampleTopics: ['कराधान एवं लेखापरीक्षा', 'आर्थिक नीतियां एवं GST', 'सामान्य बुद्धिमत्ता', 'विभागीय पदानुक्रम', 'सत्यनिष्ठा एवं ईमानदारी']
    },
    {
      id: 'banking',
      name: 'बैंकिंग',
      fullName: 'IBPS PO / SBI PO / क्लर्क / RBI ग्रेड B',
      icon: '🏦',
      description: 'मौद्रिक नीति, वित्तीय समावेशन, डिजिटल बैंकिंग और ग्राहक सेवा पर केंद्रित विशेष बैंकिंग साक्षात्कार अभ्यास।',
      badge: 'वित्त एवं बैंकिंग',
      sampleTopics: ['RBI मौद्रिक नीति एवं रेपो दरें', 'NPA एवं ऋण वसूली', 'डिजिटल बैंकिंग एवं UPI', 'KYC एवं AML नियम', 'ग्राहक समस्या निवारण']
    },
    {
      id: 'si',
      name: 'SI (सब इंस्पेक्टर)',
      fullName: 'पुलिस उपनिरीक्षक भर्ती',
      icon: '👮',
      description: 'कानूनी जागरूकता, शारीरिक दृढ़ता और अपराध जांच पर केंद्रित राज्य पुलिस एवं CAPF सब इंस्पेक्टर साक्षात्कार अभ्यास।',
      badge: 'पुलिस सेवाएं',
      sampleTopics: ['नवीन आपराधिक कानून', 'कानून-व्यवस्था का रखरखाव', 'साइबर अपराध निवारण', 'सामुदायिक पुलिसिंग', 'तनावपूर्ण परिस्थितियों का नियंत्रण']
    },
    {
      id: 'constable',
      name: 'कांस्टेबल',
      fullName: 'पुलिस कांस्टेबल भर्ती',
      icon: '🛡️',
      description: 'पुलिस कांस्टेबल वाइवा एवं दस्तावेज सत्यापन के लिए स्थानीय ज्ञान, कर्तव्य निष्ठा और बुनियादी कानूनी समझ की तैयारी।',
      badge: 'वर्दीधारी सेवाएं',
      sampleTopics: ['समाज में पुलिस की भूमिका', 'स्थानीय भूगोल एवं संस्कृति', 'प्रथम प्रतिक्रिया प्रोटोकॉल', 'अनुशासन एवं टीमवर्क', 'नागरिक सहायता']
    },
    {
      id: 'other-exams',
      name: 'अन्य प्रतियोगी परीक्षाएं',
      fullName: 'रक्षा सेवाएं (CDS/AFCAT), राज्य PSCs एवं अन्य बोर्ड',
      icon: '🎖️',
      description: 'रक्षा बलों के SSB व्यक्तिगत साक्षात्कारों, वन सेवाओं और अन्य राज्य भर्ती बोर्डों के लिए व्यापक तैयारी।',
      badge: 'रक्षा एवं संबद्ध सेवाएं',
      sampleTopics: ['सामान्य जागरूकता एवं प्रेरणा', 'अधिकारी तुल्य गुण (OLQ)', 'नेतृत्व एवं टीम निर्माण', 'राज्य विशिष्ट सामान्य ज्ञान', 'सेवा दृष्टिकोण']
    }
  ]
};

export const DIFFICULTIES_DATA = {
  en: [
    {
      id: 'easy',
      level: 'Easy',
      label: 'Foundational / Direct',
      color: '#10b981',
      description: 'Direct factual questions, personal background, academic trajectory, and fundamental concepts without aggressive cross-examination.'
    },
    {
      id: 'medium',
      level: 'Medium',
      label: 'Standard Interview',
      color: '#3b82f6',
      description: 'Scenario-based analytical questions, current socio-economic issues, departmental dilemmas, and moderate cross-questioning.'
    },
    {
      id: 'hard',
      level: 'Hard',
      label: 'Stress & Board Panel',
      color: '#f43f5e',
      description: 'Intense cross-examination, rapid counter-arguments, ethical crisis scenarios, and high-pressure personality evaluation.'
    }
  ],
  te: [
    {
      id: 'easy',
      level: 'సులువు (Easy)',
      label: 'ప్రాథమిక / ప్రత్యక్ష ప్రశ్నలు',
      color: '#10b981',
      description: 'నేరుగా అడిగే వాస్తవాలు, వ్యక్తిగత నేపథ్యం, చదువు మరియు ప్రాథమిక అంశాలు. ఎటువంటి కఠినమైన ప్రశ్నలు లేకుండా ప్రారంభ స్థాయి సాధన.'
    },
    {
      id: 'medium',
      level: 'మధ్యస్థం (Medium)',
      label: 'ప్రామాణిక ఇంటర్వ్యూ స్థాయి',
      color: '#3b82f6',
      description: 'సమస్యాత్మక విశ్లేషణాత్మక ప్రశ్నలు, ప్రస్తుత సామాజిక-ఆర్థిక అంశాలు, శాఖాపరమైన సవాళ్లు మరియు మధ్యస్థ స్థాయి కౌంటర్ ప్రశ్నలు.'
    },
    {
      id: 'hard',
      level: 'కఠినం (Hard)',
      label: 'బోర్డ్ ప్యానెల్ & ఒత్తిడి స్థాయి',
      color: '#f43f5e',
      description: 'తీవ్రమైన క్రాస్-ఎగ్జామినేషన్, వేగవంతమైన కౌంటర్ వాదనలు, నైతిక సంక్షోభ పరిస్థితులు మరియు అధిక ఒత్తిడిలో వ్యక్తిత్వ పరీక్ష.'
    }
  ],
  hi: [
    {
      id: 'easy',
      level: 'सरल (Easy)',
      label: 'बुनियादी / प्रत्यक्ष प्रश्न',
      color: '#10b981',
      description: 'सीधे तथ्यात्मक प्रश्न, व्यक्तिगत पृष्ठभूमि, शैक्षणिक इतिहास और बुनियादी अवधारणाएं बिना किसी आक्रामक प्रति-प्रश्न के।'
    },
    {
      id: 'medium',
      level: 'मध्यम (Medium)',
      label: 'मानक साक्षात्कार स्तर',
      color: '#3b82f6',
      description: 'परिस्थिति-आधारित विश्लेषणात्मक प्रश्न, वर्तमान सामाजिक-आर्थिक मुद्दे, विभागीय चुनौतियां और संतुलित प्रति-प्रश्न।'
    },
    {
      id: 'hard',
      level: 'कठिन (Hard)',
      label: 'बोर्ड पैनल एवं तनाव स्तर',
      color: '#f43f5e',
      description: 'गहन जिरह, तीव्र जवाबी तर्क, नैतिक संकट परिदृश्य और उच्च-दबाव व्यक्तित्व परीक्षण।'
    }
  ]
};

export const DURATIONS_DATA = {
  en: [
    { id: '15', label: '15 Mins', desc: 'Rapid warm-up round' },
    { id: '30', label: '30 Mins', desc: 'Standard board session' },
    { id: '45', label: '45 Mins', desc: 'Comprehensive panel' },
    { id: '60', label: '60 Mins', desc: 'Full length simulation' }
  ],
  te: [
    { id: '15', label: '15 నిమిషాలు', desc: 'త్వరిత వార్మప్ రౌండ్' },
    { id: '30', label: '30 నిమిషాలు', desc: 'ప్రామాణిక బోర్డ్ సెషన్' },
    { id: '45', label: '45 నిమిషాలు', desc: 'సమగ్ర ప్యానెల్ సెషన్' },
    { id: '60', label: '60 నిమిషాలు', desc: 'పూర్తి స్థాయి సిమ్యులేషన్' }
  ],
  hi: [
    { id: '15', label: '15 मिनट', desc: 'त्वरित वार्म-अप सत्र' },
    { id: '30', label: '30 मिनट', desc: 'मानक बोर्ड सत्र' },
    { id: '45', label: '45 मिनट', desc: 'विस्तृत पैनल सत्र' },
    { id: '60', label: '60 मिनट', desc: 'पूर्ण-लंबाई सिमुलेशन' }
  ]
};

export const QUESTION_COUNTS_DATA = {
  en: [
    { id: '5', label: '5 Questions', desc: 'Quick check' },
    { id: '10', label: '10 Questions', desc: 'Balanced set' },
    { id: '15', label: '15 Questions', desc: 'Thorough coverage' },
    { id: '20', label: '20 Questions', desc: 'Deep dive round' }
  ],
  te: [
    { id: '5', label: '5 ప్రశ్నలు', desc: 'త్వరిత తనిఖీ' },
    { id: '10', label: '10 ప్రశ్నలు', desc: 'సమతుల్య ప్రశ్నల సమితి' },
    { id: '15', label: '15 ప్రశ్నలు', desc: 'విస్తృత కవరేజ్' },
    { id: '20', label: '20 ప్రశ్నలు', desc: 'లోతైన విశ్లేషణ రౌండ్' }
  ],
  hi: [
    { id: '5', label: '5 प्रश्न', desc: 'त्वरित समीक्षा' },
    { id: '10', label: '10 प्रश्न', desc: 'संतुलित प्रश्न सेट' },
    { id: '15', label: '15 प्रश्न', desc: 'विस्तृत कवरेज' },
    { id: '20', label: '20 प्रश्न', desc: 'गहन विश्लेषण दौर' }
  ]
};

export const PLATFORM_FEATURES_DATA = {
  en: [
    {
      id: 'offline',
      icon: '📶',
      title: 'Practice Without Internet',
      badge: 'Offline-First Ready',
      description: 'Designed for future offline integration using local client models. Practice interview questions even in low-bandwidth or remote areas without network disruption.',
      isDemo: true
    },
    {
      id: 'questions',
      icon: '📚',
      title: 'Interview Question Practice',
      badge: 'Curated Question Banks',
      description: 'Extensive question banks curated for UPSC, APPSC, RRB, SSC CGL, Banking, SI, and Constable boards covering current affairs and DAF.',
      isDemo: false
    },
    {
      id: 'evaluation',
      icon: '🎯',
      title: 'Answer Evaluation',
      badge: 'UI Demonstration Only',
      description: 'Preview of upcoming evaluation rubrics: assess content depth, argument clarity, speech fluency, and keyword adherence against exam board benchmarks.',
      isDemo: true
    },
    {
      id: 'tracking',
      icon: '📈',
      title: 'Performance Tracking',
      badge: 'Analytics Dashboard',
      description: 'Track your preparation trajectory over time: score improvements, speaking pace, answer structure consistency, and domain mastery.',
      isDemo: false
    },
    {
      id: 'feedback',
      icon: '💡',
      title: 'Feedback and Improvement',
      badge: 'Actionable Insights',
      description: 'Get immediate pointers on body language tone, filler word counts, factual precision, and structure using standard interview guidelines.',
      isDemo: false
    },
    {
      id: 'multilingual',
      icon: '🗣️',
      title: 'Multiple Language Support',
      badge: 'Trilingual (TE / EN / HI)',
      description: 'Prepare comfortably in Telugu, English, or Hindi. Overcome language hesitation to articulate complex ideas with regional fluency.',
      isDemo: false
    }
  ],
  te: [
    {
      id: 'offline',
      icon: '📶',
      title: 'ఇంటర్నెట్ లేకుండా ప్రాక్టీస్ చేయండి',
      badge: 'ఆఫ్‌లైన్-ఫస్ట్ సదుపాయం',
      description: 'స్థానిక క్లయింట్ నమూనాలను ఉపయోగించి భవిష్యత్ ఆఫ్‌లైన్ ఏకీకరణ కోసం రూపొందించబడింది. ఇంటర్నెట్ లేని సమయంలో కూడా నిరంతరాయంగా ప్రాక్టీస్ చేయవచ్చు.',
      isDemo: true
    },
    {
      id: 'questions',
      icon: '📚',
      title: 'ఇంటర్వ్యూ ప్రశ్నల సాధన',
      badge: 'ప్రత్యేక ప్రశ్నల బ్యాంక్',
      description: 'UPSC, APPSC, RRB, SSC CGL, బ్యాంకింగ్, SI మరియు కానిస్టేబుల్ బోర్డుల కోసం వర్తమాన వ్యవహారాలు మరియు DAF ఆధారంగా రూపొందించిన ప్రశ్నలు.',
      isDemo: false
    },
    {
      id: 'evaluation',
      icon: '🎯',
      title: 'సమాధానాల మూల్యాంకనం',
      badge: 'UI ప్రదర్శన మాత్రమే',
      description: 'రాబోయే మూల్యాంకన విధానం: విషయ లోతు, విశ్లేషణ స్పష్టత, ధారాళత మరియు ముఖ్యమైన అంశాల వాడకాన్ని పరీక్షించే విధానం.',
      isDemo: true
    },
    {
      id: 'tracking',
      icon: '📈',
      title: 'పనితీరు ట్రాకింగ్',
      badge: 'విశ్లేషణ డాష్‌బోర్డ్',
      description: 'మీ పురోగతిని ట్రాక్ చేయండి: స్కోరు మెరుగుదల, మాట్లాడే వేగం, సమాధానాల నిర్మాణం మరియు సబ్జెక్ట్ పట్టును పర్యవేక్షించండి.',
      isDemo: false
    },
    {
      id: 'feedback',
      icon: '💡',
      title: 'ఫీడ్‌బ్యాక్ & మెరుగుదల',
      badge: 'ఆచరణాత్మక సూచనలు',
      description: 'సమాధానం చెప్పే విధానం, అనవసర పదాల నియంత్రణ, వాస్తవాల ఖచ్చితత్వం మరియు ఆకట్టుకునే ప్రసంగ శైలిపై తక్షణ సూచనలు.',
      isDemo: false
    },
    {
      id: 'multilingual',
      icon: '🗣️',
      title: 'బహుళ భాషల మద్దతు',
      badge: 'తెలుగు / ఇంగ్లీష్ / హిందీ',
      description: 'తెలుగు, ఇంగ్లీష్ లేదా హిందీలో నిస్సంకోచంగా సాధన చేయండి. భాషా బెరుకును అధిగమించి పరిపాలనా ఆలోచనలను సహజంగా వ్యక్తీకరించండి.',
      isDemo: false
    }
  ],
  hi: [
    {
      id: 'offline',
      icon: '📶',
      title: 'बिना इंटरनेट के अभ्यास करें',
      badge: 'ऑफ़लाइन-प्रथम तैयार',
      description: 'स्थानीय मॉडल का उपयोग करके भविष्य के ऑफ़लाइन एकीकरण के लिए डिज़ाइन किया गया। कम कनेक्टिविटी वाले क्षेत्रों में भी निर्बाध अभ्यास करें।',
      isDemo: true
    },
    {
      id: 'questions',
      icon: '📚',
      title: 'साक्षात्कार प्रश्न अभ्यास',
      badge: 'चयनित प्रश्न बैंक',
      description: 'UPSC, APPSC, RRB, SSC CGL, बैंकिंग, SI और कांस्टेबल बोर्डों के लिए समसामयिकी और DAF आधारित विस्तृत प्रश्न बैंक।',
      isDemo: false
    },
    {
      id: 'evaluation',
      icon: '🎯',
      title: 'उत्तर मूल्यांकन',
      badge: 'केवल UI प्रदर्शन',
      description: 'आगामी मूल्यांकन पद्धति: सामग्री की गहराई, तार्किक स्पष्टता, बोलने का प्रवाह और कीवर्ड सटीकता का आकलन।',
      isDemo: true
    },
    {
      id: 'tracking',
      icon: '📈',
      title: 'प्रदर्शन ट्रैकिंग',
      badge: 'विश्लेषण डैशबोर्ड',
      description: 'समय के साथ अपनी तैयारी की प्रगति को ट्रैक करें: स्कोर सुधार, बोलने की गति, उत्तर संरचना और विषय पर पकड़।',
      isDemo: false
    },
    {
      id: 'feedback',
      icon: '💡',
      title: 'प्रतिक्रिया एवं सुधार',
      badge: 'व्यावहारिक सुझाव',
      description: 'शारीरिक हाव-भाव, अनावश्यक शब्दों पर नियंत्रण, तथ्यात्मक सटीकता और संरचित उत्तर प्रस्तुति पर त्वरित मार्गदर्शन।',
      isDemo: false
    },
    {
      id: 'multilingual',
      icon: '🗣️',
      title: 'बहुभाषी समर्थन',
      badge: 'तेलुगु / अंग्रेजी / हिंदी',
      description: 'तेलुगु, अंग्रेजी या हिंदी में आत्मविश्वास से अभ्यास करें। भाषा की झिझक मिटाकर जटिल विचारों को सहजता से व्यक्त करें।',
      isDemo: false
    }
  ]
};

export const HOW_IT_WORKS_DATA = {
  en: [
    {
      step: '01',
      title: 'Select Your Interview Category',
      desc: 'Choose your targeted competitive exam (UPSC, APPSC, RRB, SSC CGL, Banking, SI, Constable) along with difficulty level, language, and session duration.',
      icon: '🎯'
    },
    {
      step: '02',
      title: 'Attend Your Mock Interview',
      desc: 'Face realistic board-style prompt scenarios with timed pauses, clear audio prompts, and structured question-by-question progression.',
      icon: '🎙️'
    },
    {
      step: '03',
      title: 'Review Your Performance',
      desc: 'Examine detailed answer score breakdowns, identified improvement areas, and model answers to continuously refine your preparation.',
      icon: '📊'
    }
  ],
  te: [
    {
      step: '01',
      title: 'మీ ఇంటర్వ్యూ కేటగిరీని ఎంచుకోండి',
      desc: 'మీ లక్ష్య పోటీ పరీక్ష (UPSC, APPSC, RRB, SSC CGL, బ్యాంకింగ్, SI, కానిస్టేబుల్) తో పాటు క్లిష్టత స్థాయి, భాష మరియు సెషన్ సమయాన్ని ఎంచుకోండి.',
      icon: '🎯'
    },
    {
      step: '02',
      title: 'మీ మాక్ ఇంటర్వ్యూలో పాల్గొనండి',
      desc: 'నిర్దిష్ట సమయ పరిమితులు, స్పష్టమైన ఆడియో ప్రాంప్ట్‌లు మరియు దశలవారీ ప్రశ్నలతో వాస్తవిక బోర్డ్ తరహా ఇంటర్వ్యూను అనుభవించండి.',
      icon: '🎙️'
    },
    {
      step: '03',
      title: 'మీ పనితీరును సమీక్షించండి',
      desc: 'వివరమైన స్కోరు విశ్లేషణ, మెరుగుపరుచుకోవలసిన అంశాలు మరియు ఆదర్శప్రాయమైన సమాధానాలను పరిశీలించి నిరంతరం మెరుగుపడండి.',
      icon: '📊'
    }
  ],
  hi: [
    {
      step: '01',
      title: 'अपनी साक्षात्कार श्रेणी चुनें',
      desc: 'अपनी लक्षित प्रतियोगी परीक्षा (UPSC, APPSC, RRB, SSC CGL, बैंकिंग, SI, कांस्टेबल) के साथ कठिनाई स्तर, भाषा और अवधि चुनें।',
      icon: '🎯'
    },
    {
      step: '02',
      title: 'अपने मॉक इंटरव्यू में भाग लें',
      desc: 'समयबद्ध ठहराव, स्पष्ट ऑडियो प्रॉम्प्ट और चरणबद्ध प्रश्नों के साथ यथार्थवादी बोर्ड-स्तरीय साक्षात्कार का अनुभव करें।',
      icon: '🎙️'
    },
    {
      step: '03',
      title: 'अपने प्रदर्शन की समीक्षा करें',
      desc: 'अपनी तैयारी को निरंतर निखारने के लिए विस्तृत स्कोर विश्लेषण, सुधार के क्षेत्रों और आदर्श उत्तरों की समीक्षा करें।',
      icon: '📊'
    }
  ]
};

export const FAQS_DATA = {
  en: [
    {
      q: 'How does the offline-first practice feature work?',
      a: 'The platform is architected for offline-first readiness. While full client-side offline AI speech evaluation is scheduled for future release, the application allows offline caching of question sets, interview configurations, and practice sessions so you can rehearse without requiring continuous high-speed internet.'
    },
    {
      q: 'Is real AI evaluation currently active?',
      a: 'No. As clearly labeled on the platform, current answer evaluation cards are UI demonstrations showcasing the planned scoring rubric. Real-time AI evaluation and speech analysis will be connected when the backend inference engine is deployed.'
    },
    {
      q: 'Which competitive exams are covered?',
      a: 'We cover major national and state competitive exams including UPSC Civil Services, APPSC (Group 1 & 2), Railway Recruitment Board (RRB), SSC CGL, Banking (IBPS/SBI), Sub Inspector (SI), Police Constable, and other allied state exams.'
    },
    {
      q: 'Can I practice in Telugu or Hindi?',
      a: 'Yes! You can toggle between Telugu (తెలుగు), English, and Hindi. This is particularly beneficial for candidates appearing for regional state boards like APPSC, State Police SI/Constable, and bilingual central interviews.'
    },
    {
      q: 'How do the difficulty levels (Easy, Medium, Hard) differ?',
      a: 'Easy focuses on foundational knowledge, biodata/DAF questions, and standard situational ethics. Medium introduces policy analysis and current events. Hard simulates high-pressure interview boards with counter-questions and rapid scrutiny.'
    },
    {
      q: 'How do I test the Online / Offline status indicator?',
      a: 'You can test the real-time indicator directly in your browser: open Developer Tools (F12) -> Network tab -> change "No Throttling" to "Offline". The indicator in the navbar and hero section will immediately switch to Offline with a toast alert.'
    }
  ],
  te: [
    {
      q: 'ఆఫ్‌లైన్-ఫస్ట్ ప్రాక్టీస్ ఫీచర్ ఎలా పనిచేస్తుంది?',
      a: 'ఈ వేదిక ఆఫ్‌లైన్-ఫస్ట్ కార్యాచరణ కోసం సిద్ధం చేయబడింది. పూర్తి స్థాయి ఆఫ్‌లైన్ వాయిస్ AI మూల్యాంకనం భవిష్యత్ వెర్షన్‌లో రానున్నప్పటికీ, ప్రస్తుత అప్లికేషన్ ప్రశ్నల సమితిని మరియు కాన్ఫిగరేషన్‌లను స్థానికంగా కాష్ చేస్తుంది, దీనివల్ల నిరంతర హై-స్పీడ్ ఇంటర్నెట్ అవసరం లేకుండానే మీరు సాధన చేయవచ్చు.'
    },
    {
      q: 'ప్రస్తుతం నిజమైన AI మూల్యాంకనం సక్రియంగా ఉందా?',
      a: 'లేదు. ప్లాట్‌ఫారమ్‌లో స్పష్టంగా తెలిపినట్లుగా, ప్రస్తుత సమాధానాల మూల్యాంకన కార్డ్ కేవలం ప్రణాళికాబద్ధమైన స్కోరింగ్ విధానాన్ని వివరించే UI నమూనా మాత్రమే. బ్యాకెండ్ ఇంజిన్ అందుబాటులోకి వచ్చినప్పుడు రియల్ టైమ్ AI విశ్లేషణ ప్రారంభమవుతుంది.'
    },
    {
      q: 'ఇందులో ఏయే పోటీ పరీక్షలు ఉన్నాయి?',
      a: 'UPSC సివిల్ సర్వీసెస్, APPSC (గ్రూప్ 1 & 2), రైల్వే రిక్రూట్‌మెంట్ బోర్డ్ (RRB), SSC CGL, బ్యాంకింగ్ (IBPS/SBI), సబ్ ఇన్‌స్పెక్టర్ (SI), కానిస్టేబుల్ మరియు ఇతర రాష్ట్ర నియామక పరీక్షలు ఇందులో ఉన్నాయి.'
    },
    {
      q: 'నేను తెలుగు లేదా హిందీలో ఇంటర్వ్యూ సాధన చేయవచ్చా?',
      a: 'తప్పకుండా! మీరు తెలుగు, ఇంగ్లీష్ మరియు హిందీల మధ్య ఎప్పుడైనా మారవచ్చు. APPSC, పోలీస్ SI/కానిస్టేబుల్ వంటి ప్రాంతీయ మరియు ద్విభాషా ఇంటర్వ్యూలకు సిద్ధమయ్యే అభ్యర్థులకు ఇది ఎంతో మేలు చేస్తుంది.'
    },
    {
      q: 'క్లిష్టత స్థాయిలు (సులువు, మధ్యస్థం, కఠినం) ఎలా విభజించబడ్డాయి?',
      a: 'సులువు (Easy) స్థాయి ప్రాథమిక అంశాలు మరియు వ్యక్తిగత వివరాలపై దృష్టి పెడుతుంది. మధ్యస్థం (Medium) సామాజిక-ఆర్థిక సమస్యలు మరియు విశ్లేషణను పరీక్షిస్తుంది. కఠినం (Hard) స్థాయి తీవ్రమైన క్రాస్ ప్రశ్నలతో నిజమైన బోర్డ్ ఒత్తిడిని సృష్టిస్తుంది.'
    },
    {
      q: 'ఆన్‌లైన్ / ఆఫ్‌లైన్ స్టేటస్ ఇండికేటర్‌ను ఎలా పరీక్షించాలి?',
      a: 'మీ బ్రౌజర్‌లో డెవలపర్ టూల్స్ (F12) తెరిచి -> Network ట్యాబ్‌లో -> "No Throttling" ను "Offline" గా మార్చండి. నావ్‌బార్ మరియు హీరో విభాగంలోని సూచిక తక్షణమే రెడ్ ఆఫ్‌లైన్ మోడ్‌లోకి మారి టోస్ట్ అలర్ట్ ఇస్తుంది.'
    }
  ],
  hi: [
    {
      q: 'ऑफ़लाइन-प्रथम अभ्यास सुविधा कैसे काम करती है?',
      a: 'यह प्लेटफॉर्म ऑफ़लाइन-प्रथम वास्तुकला पर आधारित है। पूर्ण ऑन-डिवाइस AI मूल्यांकन आगामी संस्करण में उपलब्ध होगा, लेकिन वर्तमान में प्रश्न सेट और कॉन्फ़िगरेशन स्थानीय रूप से संग्रहीत होते हैं ताकि आप बिना निरंतर इंटरनेट के भी अभ्यास कर सकें।'
    },
    {
      q: 'क्या वास्तविक AI मूल्यांकन वर्तमान में सक्रिय है?',
      a: 'नहीं। जैसा कि प्लेटफॉर्म पर स्पष्ट रूप से उल्लिखित है, वर्तमान उत्तर मूल्यांकन कार्ड केवल आगामी स्कोरिंग पद्धति का UI प्रदर्शन है। बैकएंड इंजन सक्रिय होने पर वास्तविक समय AI विश्लेषण उपलब्ध होगा।'
    },
    {
      q: 'इसमें कौन-कौन सी प्रतियोगी परीक्षाएं शामिल हैं?',
      a: 'इसमें UPSC सिविल सेवा, APPSC (ग्रुप 1 और 2), रेलवे भर्ती बोर्ड (RRB), SSC CGL, बैंकिंग (IBPS/SBI), सब इंस्पेक्टर (SI), पुलिस कांस्टेबल और अन्य संबद्ध परीक्षाएं शामिल हैं।'
    },
    {
      q: 'क्या मैं तेलुगु या हिंदी में अभ्यास कर सकता हूँ?',
      a: 'हाँ! आप आसानी से तेलुगु, अंग्रेजी और हिंदी के बीच चयन कर सकते हैं। यह राज्य स्तरीय बोर्डों और द्विभाषी केंद्रीय साक्षात्कारों की तैयारी के लिए अत्यंत लाभकारी है।'
    },
    {
      q: 'कठिनाई स्तर (सरल, मध्यम, कठिन) कैसे भिन्न हैं?',
      a: 'सरल बुनियादी ज्ञान और व्यक्तिगत पृष्ठभूमि पर केंद्रित है। मध्यम में नीतिगत विश्लेषण और समसामयिक मुद्दे शामिल हैं। कठिन स्तर में बोर्ड पैनल की कड़ी जिरह और दबाव का यथार्थवादी अनुभव होता है।'
    },
    {
      q: 'ऑनलाइन / ऑफ़लाइन स्थिति सूचक का परीक्षण कैसे करें?',
      a: 'अपने ब्राउज़र में डेवलपर टूल्स (F12) खोलें -> Network टैब में -> "No Throttling" को "Offline" में बदलें। नेवबार और हीरो सेक्शन में इंडिकेटर तुरंत ऑफ़लाइन मोड में बदल जाएगा।'
    }
  ]
};

export const CONTACT_INFO = {
  email: 'support@mockinterview.ai',
  phone: '+91 800 123 4567',
  address: 'EdTech Innovation Hub, Hyderabad / Visakhapatnam, India',
  hours: 'Monday – Saturday: 9:00 AM – 7:00 PM IST'
};

// Localized helper getters
export const getCategories = (lang = 'en') => CATEGORIES_DATA[lang] || CATEGORIES_DATA.en;
export const getDifficulties = (lang = 'en') => DIFFICULTIES_DATA[lang] || DIFFICULTIES_DATA.en;
export const getDurations = (lang = 'en') => DURATIONS_DATA[lang] || DURATIONS_DATA.en;
export const getQuestionCounts = (lang = 'en') => QUESTION_COUNTS_DATA[lang] || QUESTION_COUNTS_DATA.en;
export const getFeatures = (lang = 'en') => PLATFORM_FEATURES_DATA[lang] || PLATFORM_FEATURES_DATA.en;
export const getHowItWorks = (lang = 'en') => HOW_IT_WORKS_DATA[lang] || HOW_IT_WORKS_DATA.en;
export const getFaqs = (lang = 'en') => FAQS_DATA[lang] || FAQS_DATA.en;

// Default English fallback constants for backward compatibility
export const CATEGORIES = CATEGORIES_DATA.en;
export const DIFFICULTIES = DIFFICULTIES_DATA.en;
export const DURATIONS = DURATIONS_DATA.en;
export const QUESTION_COUNTS = QUESTION_COUNTS_DATA.en;
export const PLATFORM_FEATURES = PLATFORM_FEATURES_DATA.en;
export const HOW_IT_WORKS_STEPS = HOW_IT_WORKS_DATA.en;
export const FAQS = FAQS_DATA.en;

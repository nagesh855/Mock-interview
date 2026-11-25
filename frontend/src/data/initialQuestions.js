/**
 * Initial Starter Offline Question Dataset for AI Mock Interview Practice
 * Covers 8 competitive exam categories:
 * upsc, appsc, rrb, ssc-cgl, banking, si, constable, other-exams
 * Across difficulties (easy, medium, hard) and languages (en, te, hi).
 *
 * Each record adheres to the IndexedDB schema:
 * - id: unique string
 * - category: exam category id
 * - difficulty: easy | medium | hard
 * - language: en | te | hi
 * - question: the prompt / question text
 * - explanation: background context / model answer points
 * - createdAt: ISO timestamp
 * - updatedAt: ISO timestamp
 */

export const INITIAL_QUESTIONS = [
  // ========================== UPSC (Civil Services) ==========================
  {
    id: 'q-upsc-en-01',
    category: 'upsc',
    difficulty: 'easy',
    language: 'en',
    question: 'Introduce yourself and highlight the personal values that motivated you to choose the Indian Administrative Service.',
    explanation: 'Focus on honesty, resilience, public service dedication, and specific experiences from your graduation and upbringing without boasting.',
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-01-01T00:00:00.000Z'
  },
  {
    id: 'q-upsc-en-02',
    category: 'upsc',
    difficulty: 'medium',
    language: 'en',
    question: 'How would you balance environmental conservation with industrial development in an ecologically sensitive district as a District Collector?',
    explanation: 'Demonstrate sustainable development principles, stakeholder consultations, compliance with EIA norms, and promoting green technology.',
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-01-01T00:00:00.000Z'
  },
  {
    id: 'q-upsc-en-03',
    category: 'upsc',
    difficulty: 'hard',
    language: 'en',
    question: 'A communal clash breaks out during a public religious procession while you are on site as the Sub-Divisional Magistrate. Outline your immediate 30-minute response protocol.',
    explanation: 'Priority is physical safety, section 144 imposition, securing the perimeter, engaging peace committee leaders, curbing social media rumors, and deploying riot control without excessive force.',
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-01-01T00:00:00.000Z'
  },
  {
    id: 'q-upsc-en-04',
    category: 'upsc',
    difficulty: 'medium',
    language: 'en',
    question: 'With increasing digitization of welfare services, how would you address digital exclusion among elderly and tribal citizens in remote districts?',
    explanation: 'Discuss assisted digital delivery, offline delivery mechanisms through village-level workers, biometric exception handling, and mobile service camps.',
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-01-01T00:00:00.000Z'
  },
  {
    id: 'q-upsc-en-05',
    category: 'upsc',
    difficulty: 'easy',
    language: 'en',
    question: 'What do you consider the most significant constitutional principle guiding civil servants in India, and how will it inform your daily decisions?',
    explanation: 'Emphasize equality before law (Article 14), secularism, empathy for marginalized sections, and adherence to constitutional morality over personal bias.',
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-01-01T00:00:00.000Z'
  },
  {
    id: 'q-upsc-te-01',
    category: 'upsc',
    difficulty: 'easy',
    language: 'te',
    question: 'మీ గురించి సంక్షిప్తంగా వివరించి, సివిల్ సర్వీసెస్ వైపు మిమ్మల్ని నడిపించిన ప్రేరణ ఏమిటో తెలపండి.',
    explanation: 'మీ విద్యా నేపథ్యం, ప్రజాసేవపై ఉన్న నిజాయితీ గల దృక్పథం మరియు సమాజం పట్ల మీకున్న బాధ్యతను స్పష్టంగా తెలియజేయండి.',
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-01-01T00:00:00.000Z'
  },
  {
    id: 'q-upsc-te-02',
    category: 'upsc',
    difficulty: 'medium',
    language: 'te',
    question: 'జిల్లా కలెక్టర్‌గా సున్నితమైన పర్యావరణ ప్రాంతంలో పారిశ్రామికాభివృద్ధికి మరియు పర్యావరణ పరిరక్షణకు సమతుల్యతను ఎలా సాధిస్తారు?',
    explanation: 'సుస్థిర అభివృద్ధి సూత్రాలు, నిబంధనల అమలు, ప్రజల అభిప్రాయాల సేకరణ మరియు ప్రత్యామ్నాయ హరిత సాంకేతికతలపై దృష్టి పెట్టండి.',
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-01-01T00:00:00.000Z'
  },
  {
    id: 'q-upsc-te-03',
    category: 'upsc',
    difficulty: 'hard',
    language: 'te',
    question: 'మీరు సబ్ డివిజనల్ మేజిస్ట్రేట్ (SDM)గా ఉన్నప్పుడు ఆకస్మిక మత ఘర్షణలు చెలరేగితే, మొదటి అరగంటలో మీరు చేపట్టే అత్యవసర చర్యలు ఏమిటి?',
    explanation: 'శాంతిభద్రతల పరిరక్షణ, సెక్షన్ 144 అమలు, స్థానిక పెద్దలతో సంప్రదింపులు, పుకార్ల నివారణ మరియు పోలీసు బలగాల మోహరింపు.',
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-01-01T00:00:00.000Z'
  },
  {
    id: 'q-upsc-hi-01',
    category: 'upsc',
    difficulty: 'easy',
    language: 'hi',
    question: 'अपना संक्षिप्त परिचय दें और बताएं कि आपको भारतीय प्रशासनिक सेवा चुनने के लिए किस बात ने प्रेरित किया?',
    explanation: 'अपनी शैक्षणिक पृष्ठभूमि, सार्वजनिक सेवा के प्रति समर्पण और समाज में सकारात्मक परिवर्तन लाने के अपने दृष्टिकोण को स्पष्ट करें।',
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-01-01T00:00:00.000Z'
  },
  {
    id: 'q-upsc-hi-02',
    category: 'upsc',
    difficulty: 'medium',
    language: 'hi',
    question: 'एक जिलाधिकारी के रूप में आप पर्यावरण संरक्षण और औद्योगिक विकास के बीच संतुलन कैसे स्थापित करेंगे?',
    explanation: 'सतत विकास के सिद्धांतों, हितधारकों के साथ संवाद, पर्यावरणीय नियमों के अनुपालन और हरित प्रौद्योगिकी को बढ़ावा देने पर ध्यान दें।',
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-01-01T00:00:00.000Z'
  },
  {
    id: 'q-upsc-hi-03',
    category: 'upsc',
    difficulty: 'hard',
    language: 'hi',
    question: 'यदि आपके उप-मंडल में अचानक सांप्रदायिक तनाव उत्पन्न हो जाए, तो एक उप-विभागीय मजिस्ट्रेट (SDM) के रूप में आपकी पहले 30 मिनट की कार्ययोजना क्या होगी?',
    explanation: 'शांति व्यवस्था की बहाली, धारा 144 लागू करना, शांति समिति से संवाद, सोशल मीडिया पर अफवाहों का नियंत्रण और त्वरित सुरक्षा तैनाती।',
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-01-01T00:00:00.000Z'
  },

  // ========================== APPSC (State Services) ==========================
  {
    id: 'q-appsc-en-01',
    category: 'appsc',
    difficulty: 'easy',
    language: 'en',
    question: 'What are the major economic opportunities and challenges faced by Andhra Pradesh following the State Reorganisation Act?',
    explanation: 'Cover port-led connectivity, capital city development, financial deficits, agricultural base, and industrial corridor growth.',
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-01-01T00:00:00.000Z'
  },
  {
    id: 'q-appsc-en-02',
    category: 'appsc',
    difficulty: 'medium',
    language: 'en',
    question: 'As a Revenue Divisional Officer (RDO), how would you optimize the delivery of state direct benefit transfer (DBT) welfare schemes while eliminating ghost beneficiaries?',
    explanation: 'Highlight Aadhaar biometric verification, Grama/Ward Sachivalayam grievance redressal, social audits, and field inspections.',
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-01-01T00:00:00.000Z'
  },
  {
    id: 'q-appsc-te-01',
    category: 'appsc',
    difficulty: 'easy',
    language: 'te',
    question: 'రాష్ట్ర విభజన అనంతరం ఆంధ్రప్రదేశ్ ఆర్థిక పునర్నిర్మాణంలో ఎదుర్కొంటున్న ప్రధాన సవాళ్లు మరియు అవకాశాలు ఏమిటి?',
    explanation: 'తీరప్రాంత ఓడరేవులు, వ్యవసాయ ఆధారిత పరిశ్రమలు, రెవెన్యూ లోటు మరియు మౌలిక వసతుల కల్పనపై విశ్లేషించండి.',
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-01-01T00:00:00.000Z'
  },
  {
    id: 'q-appsc-te-02',
    category: 'appsc',
    difficulty: 'medium',
    language: 'te',
    question: 'రెవెన్యూ డివిజనల్ ఆఫీసర్ (RDO)గా గ్రామ సచివాలయాల ద్వారా సంక్షేమ పథకాలు అర్హులైన ప్రతి ఒక్కరికీ అందేలా మీరు తీసుకునే చర్యలు ఏమిటి?',
    explanation: 'సామాజిక తనిఖీలు (Social Audits), బయోమెట్రిక్ ధృవీకరణ, పారదర్శక ఫిర్యాదుల పరిష్కార వ్యవస్థల అమలు గురించి వివరించండి.',
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-01-01T00:00:00.000Z'
  },
  {
    id: 'q-appsc-hi-01',
    category: 'appsc',
    difficulty: 'medium',
    language: 'hi',
    question: 'आंध्र प्रदेश राज्य पुनर्गठन के बाद राज्य के विकास के प्रमुख स्तंभ और चुनौतियां क्या हैं?',
    explanation: 'तटीय अर्थव्यवस्था, कृषि क्षेत्र, अवसंरचना विकास और राजकोषीय प्रबंधन पर प्रकाश डालें।',
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-01-01T00:00:00.000Z'
  },

  // ========================== RRB (Railways) ==========================
  {
    id: 'q-rrb-en-01',
    category: 'rrb',
    difficulty: 'easy',
    language: 'en',
    question: 'Why do you want to join Indian Railways, and how does the role of Station Master directly impact passenger safety?',
    explanation: 'Emphasize punctuality, track clearance protocols, interlock signaling compliance, and situational awareness under stress.',
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-01-01T00:00:00.000Z'
  },
  {
    id: 'q-rrb-en-02',
    category: 'rrb',
    difficulty: 'medium',
    language: 'en',
    question: 'Explain how the Kavach Automatic Train Protection (ATP) system prevents head-on and rear collisions in high-density corridors.',
    explanation: 'Explain RFID track sensors, ultra-high frequency radio communication, cab signaling, and automatic emergency braking upon signal overshoot.',
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-01-01T00:00:00.000Z'
  },
  {
    id: 'q-rrb-te-01',
    category: 'rrb',
    difficulty: 'easy',
    language: 'te',
    question: 'రైల్వే స్టేషన్ మాస్టర్ విధి నిర్వహణలో ప్రయాణికుల భద్రత మరియు రైళ్ల సకాల రాకపోకలకు సంబంధించి మీ బాధ్యతలేమిటి?',
    explanation: 'సిగ్నలింగ్ వ్యవస్థల పర్యవేక్షణ, ఎమర్జెన్సీ బ్రేకింగ్ ప్రోటోకాల్స్ మరియు ఒత్తిడిలో సరైన నిర్ణయాలు తీసుకోవడం గురించి వివరించండి.',
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-01-01T00:00:00.000Z'
  },
  {
    id: 'q-rrb-hi-01',
    category: 'rrb',
    difficulty: 'medium',
    language: 'hi',
    question: 'कवच (Kavach) सुरक्षा प्रणाली भारतीय रेल में दुर्घटनाओं को रोकने में किस प्रकार सहायक है?',
    explanation: 'रेडियो फ्रीक्वेंसी, लोको पायलट को सिग्नल ओवरशूट से बचाना, स्वचालित ब्रेकिंग और रियल-टाइम मॉनिटरिंग का उल्लेख करें।',
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-01-01T00:00:00.000Z'
  },

  // ========================== SSC CGL (Staff Selection Commission) ==========================
  {
    id: 'q-ssc-en-01',
    category: 'ssc-cgl',
    difficulty: 'easy',
    language: 'en',
    question: 'What is the role of an Assistant Audit Officer (AAO) under the Comptroller and Auditor General (CAG) of India?',
    explanation: 'Discuss constitutional mandate under Articles 148-151, financial audits, compliance audits, performance audits, and safeguarding public exchequer.',
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-01-01T00:00:00.000Z'
  },
  {
    id: 'q-ssc-en-02',
    category: 'ssc-cgl',
    difficulty: 'medium',
    language: 'en',
    question: 'How does GST e-invoicing and data analytics help central tax inspectors uncover circular trading and fake input tax credit (ITC) rackets?',
    explanation: 'Discuss invoice reference numbers (IRN), GSTN portal cross-validation, e-way bill reconciliation, and tracing bogus entity shell networks.',
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-01-01T00:00:00.000Z'
  },
  {
    id: 'q-ssc-te-01',
    category: 'ssc-cgl',
    difficulty: 'medium',
    language: 'te',
    question: 'జీఎస్టీ (GST) వ్యవస్థలో నకిలీ ఇన్వాయిస్‌లు మరియు తప్పుడు ఇన్పుట్ టాక్స్ క్రెడిట్ (ITC) అవకతవకలను గుర్తించడంలో సెంట్రల్ ఎక్సైజ్ ఇన్‌స్పెక్టర్ పాత్ర ఏమిటి?',
    explanation: 'డేటా అనలిటిక్స్, ఇ-వే బిల్లుల సరిపోలిక, బ్యాంక్ లావాదేవీల తనిఖీ మరియు పన్ను ఎగవేతల నిరోధక చట్టాల అమలును వివరించండి.',
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-01-01T00:00:00.000Z'
  },
  {
    id: 'q-ssc-hi-01',
    category: 'ssc-cgl',
    difficulty: 'easy',
    language: 'hi',
    question: 'कैग (CAG) के अधीन सहायक लेखा परीक्षा अधिकारी (AAO) की मुख्य जिम्मेदारियां क्या हैं?',
    explanation: 'सरकारी व्यय की लेखा परीक्षा, पारदर्शिता सुनिश्चित करना और वित्तीय अनुशासन बनाए रखने की संवैधानिक भूमिका पर प्रकाश डालें।',
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-01-01T00:00:00.000Z'
  },

  // ========================== BANKING (IBPS / SBI / RBI) ==========================
  {
    id: 'q-bank-en-01',
    category: 'banking',
    difficulty: 'easy',
    language: 'en',
    question: 'What is the difference between Repo Rate and Reverse Repo Rate, and how does the RBI use them to tame inflation?',
    explanation: 'Define repo as lending rate to commercial banks against government securities, reverse repo as borrowing rate, and mechanism of tightening money supply.',
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-01-01T00:00:00.000Z'
  },
  {
    id: 'q-bank-en-02',
    category: 'banking',
    difficulty: 'medium',
    language: 'en',
    question: 'A rural customer visits your bank branch claiming they lost their life savings due to an unauthorized UPI cyber fraud. How will you handle this situation?',
    explanation: 'Emphasize empathy, immediate account freezing, flagging transaction on cybercrime portal 1930, logging dispute under RBI limited customer liability circular, and educating on safety.',
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-01-01T00:00:00.000Z'
  },
  {
    id: 'q-bank-te-01',
    category: 'banking',
    difficulty: 'medium',
    language: 'te',
    question: 'గ్రామీణ ప్రాంతాల్లో డిజిటల్ బ్యాంకింగ్, యూపీఐ (UPI) విస్తరణలో ఎదురవుతున్న సైబర్ భద్రతా సవాళ్లను బ్యాంక్ అధికారిగా మీరు ఎలా ఎదుర్కొంటారు?',
    explanation: 'ఖాతాదారుల్లో సైబర్ అవగాహన కల్పించడం, ఓటీపీ షేరింగ్ ప్రమాదాలను వివరించడం మరియు తక్షణ పరిష్కార చర్యలను ప్రారంభించడం.',
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-01-01T00:00:00.000Z'
  },
  {
    id: 'q-bank-hi-01',
    category: 'banking',
    difficulty: 'easy',
    language: 'hi',
    question: 'एनपीए (NPA) क्या है और बैंक गैर-निष्पादित परिसंपत्तियों की वसूली के लिए कौन से कदम उठाते हैं?',
    explanation: '90 दिनों के डिफ़ॉल्ट नियम, सरफेसी (SARFAESI) कानून, ऋण पुनर्गठन और दिवाला एवं शोधन अक्षमता संहिता (IBC) की चर्चा करें।',
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-01-01T00:00:00.000Z'
  },

  // ========================== SI (Sub Inspector) ==========================
  {
    id: 'q-si-en-01',
    category: 'si',
    difficulty: 'easy',
    language: 'en',
    question: 'What qualities make an effective Police Sub-Inspector, and how will you maintain public trust in law enforcement?',
    explanation: 'Focus on integrity, emotional stability, active listening, impartial enforcement, zero tolerance for corruption, and community policing.',
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-01-01T00:00:00.000Z'
  },
  {
    id: 'q-si-en-02',
    category: 'si',
    difficulty: 'hard',
    language: 'en',
    question: 'You receive intelligence that an aggressive mob has gathered outside the police station demanding custody of an accused. What is your action plan?',
    explanation: 'Secure station armory and lockups, communicate calmly through public address system, form barricade lines, summon reinforcements, invoke CrPC dispersal protocols, and avoid unprovoked firing.',
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-01-01T00:00:00.000Z'
  },
  {
    id: 'q-si-te-01',
    category: 'si',
    difficulty: 'hard',
    language: 'te',
    question: 'పోలీస్ స్టేషన్ ఎదుట ఒక నిందితుడిని తమకు అప్పగించాలని డిమాండ్ చేస్తూ ఉద్రిక్త జనసమూహం చేరినప్పుడు సబ్ ఇన్‌స్పెక్టర్‌గా మీరు పరిస్థితిని ఎలా అదుపు చేస్తారు?',
    explanation: 'శాంతిభద్రతల పరిరక్షణ, చట్టబద్ధమైన చర్యలు, లాఠీఛార్జ్ నివారణ, ఉన్నతాధికారుల సమాచారం మరియు నిందితుడి భద్రతకు ప్రాధాన్యత ఇవ్వడం.',
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-01-01T00:00:00.000Z'
  },
  {
    id: 'q-si-hi-01',
    category: 'si',
    difficulty: 'medium',
    language: 'hi',
    question: 'थाना स्तर पर आम जनता और पुलिस के बीच विश्वास बढ़ाने के लिए आप कम्युनिटी पुलिसिंग का उपयोग कैसे करेंगे?',
    explanation: 'नागरिकों से नियमित संवाद, महिला सुरक्षा हेल्पडेस्क, पारदर्शी सुनवाई और अपराध रोकथाम में जनता की भागीदारी सुनिश्चित करना।',
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-01-01T00:00:00.000Z'
  },

  // ========================== CONSTABLE ==========================
  {
    id: 'q-const-en-01',
    category: 'constable',
    difficulty: 'easy',
    language: 'en',
    question: 'What is the role of a police constable as the first responder at an accident scene on a highway?',
    explanation: 'Assess casualties, call emergency medical services (108), secure the spot to prevent secondary pileups, administer basic first aid, and log vehicle registration details.',
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-01-01T00:00:00.000Z'
  },
  {
    id: 'q-const-te-01',
    category: 'constable',
    difficulty: 'easy',
    language: 'te',
    question: 'రద్దీగా ఉండే ప్రాంతాల్లో రాత్రి వేళల్లో గస్తీ (నైట్ పెట్రోలింగ్) నిర్వహించేటప్పుడు కానిస్టేబుల్ పాటించాల్సిన ముఖ్యమైన జాగ్రత్తలు ఏమిటి?',
    explanation: 'అనుమానాస్పద కదలికలను గమనించడం, కంట్రోల్ రూమ్‌తో నిరంతర సంప్రదింపులు, ప్రజల భద్రతను నిర్ధారించడం మరియు క్రమశిక్షణ పాటించడం.',
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-01-01T00:00:00.000Z'
  },
  {
    id: 'q-const-hi-01',
    category: 'constable',
    difficulty: 'easy',
    language: 'hi',
    question: 'एक पुलिस कांस्टेबल के रूप में जनता के साथ बातचीत करते समय अनुशासन और विनम्रता का क्या महत्व है?',
    explanation: 'पुलिस की साख बढ़ाना, नागरिकों को भयमुक्त वातावरण देना और कानून का सम्मानपूर्वक पालन कराना।',
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-01-01T00:00:00.000Z'
  },

  // ========================== OTHER EXAMS (Defense SSB / Forest / PSUs) ==========================
  {
    id: 'q-other-en-01',
    category: 'other-exams',
    difficulty: 'medium',
    language: 'en',
    question: 'How do you demonstrate Officer Like Qualities (OLQ) such as initiative, cooperation, and effective intelligence under high pressure?',
    explanation: 'Share real examples of handling college or sports leadership challenges, supporting teammates under adversity, and remaining calm under critical decisions.',
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-01-01T00:00:00.000Z'
  },
  {
    id: 'q-other-te-01',
    category: 'other-exams',
    difficulty: 'medium',
    language: 'te',
    question: 'రక్షణ రంగం (డిఫెన్స్) లేదా పబ్లిక్ సెక్టార్ సంస్థల ఇంటర్వ్యూలలో నాయకత్వ లక్షణాలు (Leadership Qualities) మరియు టీమ్‌వర్క్ ప్రాముఖ్యత ఏమిటి?',
    explanation: 'విపత్కర పరిస్థితుల్లో సంయమనం, సహచరులను ప్రోత్సహించడం మరియు దేశసేవ పట్ల నిబద్ధతను తెలియజేయడం.',
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-01-01T00:00:00.000Z'
  },
  {
    id: 'q-other-hi-01',
    category: 'other-exams',
    difficulty: 'medium',
    language: 'hi',
    question: 'एसएसबी (SSB) साक्षात्कार में ऑफिसर लाइक क्वालिटीज (OLQ) प्रदर्शित करने के लिए आपका दृष्टिकोण क्या होगा?',
    explanation: 'नेतृत्व क्षमता, टीम वर्क, त्वरित निर्णय लेने का साहस और नैतिक सत्यनिष्ठा का उदाहरणों सहित वर्णन।',
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-01-01T00:00:00.000Z'
  }
];

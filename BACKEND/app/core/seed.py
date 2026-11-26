"""Database seed script populating initial exam categories, questions, FAQs, and accounts."""
from sqlalchemy.orm import Session
from app.core.database import SessionLocal, engine, Base
from app.core.security import get_password_hash
from app.models.user import User, UserProgress
from app.models.category import Category
from app.models.question import Question
from app.models.content import FAQ, Testimonial

SEED_CATEGORIES = [
    {
        "name": "UPSC Civil Services",
        "slug": "upsc",
        "icon": "🏛️",
        "description": "IAS, IPS, IFS personality test and situational mock interviews.",
        "questions": [
            {
                "level": "easy",
                "text": "Why do you want to join the Civil Services when high-paying private sector jobs are available?",
                "expected_points": "public service motivation, grassroots policy execution, diverse responsibilities, integrity",
                "sample_answer": "Civil services offer an unmatched platform to influence policy execution at grassroots level and improve citizen welfare directly.",
                "order_num": 1
            },
            {
                "level": "medium",
                "text": "How will you balance the pressure from political leaders with administrative duty as a District Magistrate?",
                "expected_points": "rule of law, constructive communication, transparency, constitutional principles, documentation",
                "sample_answer": "I will operate strictly within constitutional rules and service regulations while maintaining respectful and transparent communication with elected representatives.",
                "order_num": 2
            },
            {
                "level": "hard",
                "text": "During a communal riot, you receive an unverified report of local police taking sides. What immediate and medium-term steps would you take?",
                "expected_points": "deplying rapid action force, unbiased video recording, establishing peace committees, departmental inquiry, protecting vulnerable communities",
                "sample_answer": "My immediate priority would be physical containment and deployment of independent forces, followed by transparent departmental inquiry and curfew enforcement.",
                "order_num": 3
            }
        ]
    },
    {
        "name": "APPSC Group 1 & 2",
        "slug": "appsc",
        "icon": "🌾",
        "description": "Andhra Pradesh state administration and developmental scheme interviews.",
        "questions": [
            {
                "level": "easy",
                "text": "What do you consider the biggest strength and the biggest challenge of Andhra Pradesh today?",
                "expected_points": "long coastline, agricultural base, ports, industrial infrastructure, fiscal deficit, bifurcated challenges",
                "sample_answer": "AP has a strategic coastal corridor and rich agricultural belt, but requires rapid manufacturing investments and sustainable fiscal management.",
                "order_num": 1
            },
            {
                "level": "medium",
                "text": "How can technology improve agricultural supply chains for rayalaseema and coastal farmers?",
                "expected_points": "e-nam, cold storage logistics, drip irrigation sensors, direct market linkages, fpo support",
                "sample_answer": "By integrating digital crop monitoring, Farmer Producer Organizations, and real-time market price dissemination through mobile platforms.",
                "order_num": 2
            },
            {
                "level": "hard",
                "text": "If a government welfare transfer scheme encounters 15% biometric failure in remote tribal agency areas, how will you resolve it?",
                "expected_points": "iris scanner alternative, offline verification, village volunteer verification, nodal officer oversight, grievance redressal",
                "sample_answer": "Implement offline OTP or village volunteer attested physical verification so genuine beneficiaries are never deprived of essential entitlements.",
                "order_num": 3
            }
        ]
    },
    {
        "name": "RBI Grade B",
        "slug": "rbi",
        "icon": "🏦",
        "description": "Reserve Bank of India monetary policy and banking system interviews.",
        "questions": [
            {
                "level": "easy",
                "text": "Explain the role of the Monetary Policy Committee (MPC) in controlling inflation.",
                "expected_points": "repo rate, cpi inflation target, 4 percent +/- 2 percent band, liquidity adjustment",
                "sample_answer": "The MPC sets the benchmark repo rate to keep retail inflation within the statutory target of 4 percent with a 2 percent tolerance band.",
                "order_num": 1
            },
            {
                "level": "medium",
                "text": "What are the trade-offs between financial inclusion (like Jan Dhan) and cyber fraud prevention?",
                "expected_points": "digital literacy, 2fa authentication, financial fraud redressal, frictionless payments vs security",
                "sample_answer": "Expanding banking access must be paired with continuous vernacular cyber awareness campaigns and biometric risk shields.",
                "order_num": 2
            },
            {
                "level": "hard",
                "text": "How should the central bank respond to liquidity crunches in Non-Banking Financial Companies (NBFCs)?",
                "expected_points": "targeted long term repo operations, asset quality reviews, systemic risk containment, lender of last resort",
                "sample_answer": "Deploy targeted liquidity windows while enforcing stringent capital adequacy and asset quality audits to avoid moral hazard.",
                "order_num": 3
            }
        ]
    },
    {
        "name": "SSB (Services Selection Board)",
        "slug": "ssb",
        "icon": "🎖️",
        "description": "Army, Navy, Air Force officer personality and OLQ (Officer Like Qualities) evaluation.",
        "questions": [
            {
                "level": "easy",
                "text": "Describe a situation where you had to work with team members who had conflicting views.",
                "expected_points": "listening, objective goal setting, empathy, consensus building, leadership",
                "sample_answer": "I listened to each member's perspective, highlighted common mission objectives, and delegated roles based on individual strengths.",
                "order_num": 1
            },
            {
                "level": "medium",
                "text": "If your team is stranded in a high-altitude storm with limited supplies and injured personnel, what is your plan?",
                "expected_points": "first aid prioritization, shelter creation, ration rationing, satellite communication, morale maintenance",
                "sample_answer": "Prioritize immediate first-aid, secure natural snow shelter, establish communication protocol, and keep team spirit high.",
                "order_num": 2
            },
            {
                "level": "hard",
                "text": "What would you do if you realized a senior officer's tactical order directly jeopardized innocent civilian lives unnecessarily?",
                "expected_points": "rules of engagement, professional courage, respectful feedback, ethical hierarchy, mission integrity",
                "sample_answer": "I would immediately present the factual risk to the officer respectfully under rules of engagement to preserve innocent lives while safeguarding the mission.",
                "order_num": 3
            }
        ]
    },
    {
        "name": "SSC CGL",
        "slug": "ssc-cgl",
        "icon": "📊",
        "description": "Central government inspection, audit, tax, and customs roles.",
        "questions": [
            {
                "level": "easy",
                "text": "Why did you choose the Inspector of Central Excise/GST post as your preference?",
                "expected_points": "revenue contribution, law enforcement, anti-evasion, public revenue generation",
                "sample_answer": "It provides an active role in national revenue collection, anti-tax evasion enforcement, and trade facilitation.",
                "order_num": 1
            },
            {
                "level": "medium",
                "text": "How can data analytics assist in detecting fake GST input tax credit invoices?",
                "expected_points": "e-way bill tracking, anomaly detection, network analysis, supplier-buyer matching",
                "sample_answer": "By cross-matching e-way bill movements with physical goods transport and flagging circular invoicing networks using AI clustering.",
                "order_num": 2
            },
            {
                "level": "hard",
                "text": "A trader offers a bribe to clear seized contraband goods and threatens political repercussion if refused. How do you respond?",
                "expected_points": "refusal of bribe, seizing evidence, filing formal fir, informing vigilance, unyielding adherence to duty",
                "sample_answer": "Strictly refuse, document the bribery attempt with video evidence, file an official seizure report, and alert senior vigilance authorities immediately.",
                "order_num": 3
            }
        ]
    },
    {
        "name": "SI (Sub-Inspector of Police)",
        "slug": "si",
        "icon": "👮",
        "description": "Police station management, crime investigation, law and order interviews.",
        "questions": [
            {
                "level": "easy",
                "text": "What is the primary responsibility of a Sub-Inspector when an FIR is reported?",
                "expected_points": "prompt registration, crime scene preservation, unbiased investigation, victim counseling",
                "sample_answer": "Immediately register the FIR according to legal mandates, ensure victim safety, and secure the crime scene for forensic inspection.",
                "order_num": 1
            },
            {
                "level": "medium",
                "text": "How do you handle a protest turning violent outside a government building?",
                "expected_points": "containment, warning through loudspeakers, water cannon/tear gas graded response, video recording",
                "sample_answer": "Issue clear formal dispersal warnings, execute a graded non-lethal dispersal, protect public property, and detain key agitators safely.",
                "order_num": 2
            },
            {
                "level": "hard",
                "text": "A high-profile case has severe public media pressure to arrest someone before forensic evidence is ready. What do you do?",
                "expected_points": "evidence-based policing, media briefings without violating due process, forensic acceleration, preventing wrongful arrest",
                "sample_answer": "Maintain strict adherence to evidence-based criminal procedure, conduct responsible press briefings, and ensure no innocent citizen is wrongfully framed.",
                "order_num": 3
            }
        ]
    },
    {
        "name": "Police Constable",
        "slug": "constable",
        "icon": "🛡️",
        "description": "Ground-level vigilance, beat patrol, citizen assistance interviews.",
        "questions": [
            {
                "level": "easy",
                "text": "Why do you want to join the Police department as a Constable?",
                "expected_points": "discipline, service to community, law enforcement, physical fitness, pride in uniform",
                "sample_answer": "To protect citizen safety, maintain daily community peace, and serve society with pride and physical discipline.",
                "order_num": 1
            },
            {
                "level": "medium",
                "text": "During night beat patrol, you find an unattended open shop with broken lock. What are your immediate actions?",
                "expected_points": "alert control room, do not disturb evidence, contact shopkeeper, keep guard until team arrives",
                "sample_answer": "Immediately notify the station control room, safeguard the perimeter from loiterers, and contact the registered shop owner.",
                "order_num": 2
            },
            {
                "level": "hard",
                "text": "A lost child is crying in a crowded fair and cannot speak the local language. How do you help?",
                "expected_points": "comforting the child, food and water, public address system announcement, miking in multiple languages, child protection helpline",
                "sample_answer": "First comfort the child with water, alert the fair helpdesk to make multi-language public announcements, and guard the child safely.",
                "order_num": 3
            }
        ]
    },
    {
        "name": "DSC (Teacher Recruitment)",
        "slug": "dsc",
        "icon": "📚",
        "description": "Pedagogy, classroom management, child psychology, government school interviews.",
        "questions": [
            {
                "level": "easy",
                "text": "How will you handle a student who is consistently absent or uninterested in classroom activities?",
                "expected_points": "parent-teacher meeting, understanding home environment, engaging teaching aids, empathy, peer learning",
                "sample_answer": "I will gently talk to the student to identify underlying learning barriers or family difficulties, and make lessons more interactive.",
                "order_num": 1
            },
            {
                "level": "medium",
                "text": "How do you implement NEP 2020 experiential learning in a rural government school with limited resources?",
                "expected_points": "local nature study, clay modeling, storytelling, community resources, joyful learning, fln",
                "sample_answer": "Use low-cost and no-cost local materials, village field observations, and mother-tongue storytelling to spark curiosity.",
                "order_num": 2
            },
            {
                "level": "hard",
                "text": "A parent complains aggressively in front of students accusing you of discrimination in marks. How do you handle the situation?",
                "expected_points": "calm composure, moving discussion to private staff room, transparent evaluation criteria, showing answer sheets, respectful resolution",
                "sample_answer": "Remain completely composed, respectfully invite the parent to the principal's room, and transparently review the rubric and evaluation together.",
                "order_num": 3
            }
        ]
    }
]

SEED_FAQS = [
    {
        "question": "Can I practice mock interviews without internet connection?",
        "answer": "Yes! The application is designed offline-first. All questions, AI evaluation, and local storage work without an active internet connection.",
        "category": "Offline Features",
        "order_num": 1
    },
    {
        "question": "How does the AI scoring system calculate my score?",
        "answer": "Scoring is 100% deterministic and explainable: 60% is based on Content Relevance (key concepts covered) and 40% is based on Delivery (speaking pace between 110-150 WPM, fluency, and deduction for filler words like 'um', 'uh', 'you know').",
        "category": "Scoring",
        "order_num": 2
    },
    {
        "question": "How do I unlock Medium and Hard interview levels?",
        "answer": "You start at Easy level. Scoring 60% or higher on an interview automatically unlocks the next level (Medium, then Hard) and earns you an official certificate.",
        "category": "Game Levels",
        "order_num": 3
    },
    {
        "question": "How does peer-to-peer video mock interview work?",
        "answer": "You and a friend connect on the same local Wi-Fi or hotspot. Video and audio stream directly peer-to-peer using WebRTC without sending video data to external servers.",
        "category": "Video Calls",
        "order_num": 4
    }
]

SEED_TESTIMONIALS = [
    {
        "user_name": "K. Srinivas Rao",
        "exam_cleared": "APPSC Group 1 Selected",
        "content": "Practicing with the offline AI bot helped me eliminate filler words and speak with great confidence during the real state commission interview!",
        "rating": 5,
        "is_approved": True
    },
    {
        "user_name": "P. Divya",
        "exam_cleared": "UPSC CSE Interview Candidate",
        "content": "The deterministic scoring gave me exact feedback on missed points and pacing. The game-style Easy to Hard progression was motivating.",
        "rating": 5,
        "is_approved": True
    }
]

def seed_database(db: Session = None):
    """Seed initial data into the database."""
    own_session = False
    if db is None:
        db = SessionLocal()
        own_session = True

    try:
        # 1. Ensure tables exist
        Base.metadata.create_all(bind=engine)

        # 2. Seed Admin and Student Accounts
        admin = db.query(User).filter(User.email == "admin@mockinterview.local").first()
        if not admin:
            admin = User(
                email="admin@mockinterview.local",
                hashed_password=get_password_hash("AdminSecret123!"),
                full_name="System Administrator",
                phone="9876543210",
                role="admin"
            )
            db.add(admin)

        student = db.query(User).filter(User.email == "student@mockinterview.local").first()
        if not student:
            student = User(
                email="student@mockinterview.local",
                hashed_password=get_password_hash("StudentPass123!"),
                full_name="Praveen Kumar",
                phone="9876543211",
                role="student",
                xp=150,
                streak=3
            )
            db.add(student)
        db.commit()

        # 3. Seed Exam Categories & Questions
        for cat_data in SEED_CATEGORIES:
            cat = db.query(Category).filter(Category.slug == cat_data["slug"]).first()
            if not cat:
                cat = Category(
                    name=cat_data["name"],
                    slug=cat_data["slug"],
                    icon=cat_data["icon"],
                    description=cat_data["description"]
                )
                db.add(cat)
                db.commit()
                db.refresh(cat)

            # Seed questions for this category
            for q_data in cat_data["questions"]:
                existing_q = db.query(Question).filter(
                    Question.category_id == cat.id,
                    Question.level == q_data["level"],
                    Question.text == q_data["text"]
                ).first()
                if not existing_q:
                    q = Question(
                        category_id=cat.id,
                        level=q_data["level"],
                        text=q_data["text"],
                        expected_points=q_data["expected_points"],
                        sample_answer=q_data["sample_answer"],
                        order_num=q_data["order_num"]
                    )
                    db.add(q)

            # Initialize user progress for student
            if student:
                existing_progress = db.query(UserProgress).filter(
                    UserProgress.user_id == student.id,
                    UserProgress.category_id == cat.id
                ).first()
                if not existing_progress:
                    db.add(UserProgress(
                        user_id=student.id,
                        category_id=cat.id,
                        current_level="easy",
                        unlocked_medium=False,
                        unlocked_hard=False,
                        highest_score=0.0
                    ))

        # 4. Seed FAQs
        for f_data in SEED_FAQS:
            existing_f = db.query(FAQ).filter(FAQ.question == f_data["question"]).first()
            if not existing_f:
                db.add(FAQ(**f_data))

        # 5. Seed Testimonials
        for t_data in SEED_TESTIMONIALS:
            existing_t = db.query(Testimonial).filter(Testimonial.user_name == t_data["user_name"]).first()
            if not existing_t:
                db.add(Testimonial(**t_data))

        db.commit()
        print(" Successfully seeded database with competitive exams, questions, FAQs, and users!")
    finally:
        if own_session:
            db.close()

if __name__ == "__main__":
    seed_database()

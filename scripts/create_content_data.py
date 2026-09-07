import os
import json

base_dir = "data/content"
os.makedirs(f"{base_dir}/institutions", exist_ok=True)

# 1. home.json
home_data = {
    "slug": "home",
    "metaTitle": "Santosh Group of Institutions | Est. 1977 | Bangarpet & Bangalore",
    "metaDescription": "Discover 34+ years of academic excellence from Pre-Primary to Graduation across 11 institutions in Bangarpet and Bangalore.",
    "hero": {
        "eyebrow": "WELCOME TO SANTOSH GROUP OF INSTITUTIONS",
        "tagline": "Let's Imagine A New World",
        "leadText": "Rooted in foundational values since 1977, guiding learners from pre-primary exploration to graduation excellence with an enduring balance of urban-rural perspective.",
        "primaryCta": {
            "text": "Explore Our Institutions",
            "url": "/institutions"
        },
        "secondaryCta": {
            "text": "Admissions & Procedure",
            "url": "/admissions"
        }
    },
    "stats": [
        {"value": "34+", "label": "Years of Academic Heritage"},
        {"value": "11", "label": "Schools & Colleges"},
        {"value": "1977", "label": "Year Established"},
        {"value": "100%", "label": "Dedicated Mentorship"}
    ],
    "aboutCallout": {
        "eyebrow": "ABOUT SGI",
        "title": "Unleash students possibilities with us",
        "description": "Unleashing every student's potential by offering a stimulating and supportive environment is what we offer. Our innovative education encourages students to explore, question, and achieve big in a changing global landscape.",
        "learnMoreUrl": "/about"
    },
    "programsPreview": {
        "eyebrow": "PROGRAMS",
        "title": "Explore Our Academic Pathways",
        "items": [
            {
                "id": "bbm",
                "name": "Bachelor of Business Management (BBM)",
                "level": "Undergraduate",
                "desc": "Affiliated to Bangalore University. Specializations in Marketing, HRM, and Finance with entrepreneurship incubation.",
                "url": "/institutions/santosh-degree-college"
            },
            {
                "id": "bca",
                "name": "Bachelor of Computer Applications (BCA)",
                "level": "Undergraduate",
                "desc": "Cutting-edge software development, systems analysis, and hands-on computer lab training for IT careers.",
                "url": "/institutions/santosh-degree-college"
            },
            {
                "id": "bcom",
                "name": "Bachelor of Commerce (B.Com)",
                "level": "Undergraduate",
                "desc": "Rigorous accounting, financial analysis, corporate taxation, and information systems management.",
                "url": "/institutions/santosh-degree-college"
            },
            {
                "id": "ba",
                "name": "Bachelor of Arts (BA)",
                "level": "Undergraduate",
                "desc": "Comprehensive grounding in History, Economics, Political Science, and Sociology.",
                "url": "/institutions/santosh-degree-college"
            },
            {
                "id": "ded",
                "name": "Diploma in Education (D.Ed)",
                "level": "Teacher Training",
                "desc": "2-year professional training recognized by NCTE & Govt of Karnataka with 18 district distinctions.",
                "url": "/institutions/santosh-ded-college"
            },
            {
                "id": "puc",
                "name": "Pre-University (PUC Science, Commerce & Arts)",
                "level": "Pre-University",
                "desc": "Fathima PU College offering PCMB, PCMC, PCME, HECA, EABC, and HEPS with 90%+ pass rates.",
                "url": "/institutions/fathima-pu-college"
            }
        ]
    },
    "floatingTooltip": {
        "title": "18 Distinctions in D.Ed",
        "subtitle": "Kolar District Topper & Consistent University Ranks"
    },
    "whySgi": {
        "eyebrow": "WHY SANTOSH GROUP",
        "title": "A Foundation Built for Life",
        "features": [
            {
                "title": "Academic Excellence",
                "description": "Uncompromising standards from pre-primary fundamentals through university degrees, delivering consistent district distinctions."
            },
            {
                "title": "Experienced Faculty",
                "description": "Eminent, qualified subject specialists who act as mentors and facilitators, fostering critical inquiry and personalized attention."
            },
            {
                "title": "Supportive Community",
                "description": "Balanced urban-rural atmosphere with spacious playgrounds, active NSS camps, separate hostels, and dedicated bus fleets."
            }
        ]
    },
    "highlights": [
        {
            "title": "18 Distinctions Secured in D.Ed",
            "date": "Annual Milestone",
            "location": "Kolar District Topper",
            "desc": "Our D.Ed students secured 18 distinctions with the highest marks in the district, demonstrating peerless pedagogical training.",
            "url": "/institutions/santosh-ded-college",
            "image": "/images/ded-teachers.jpg"
        },
        {
            "title": "Visit of Honorable Education Minister",
            "date": "State Recognition",
            "location": "Bangarpet Main Campus",
            "desc": "The Education Minister and Block Educational Officer visited SGI to inspect infrastructure and commend rural academic leadership.",
            "url": "/gallery",
            "image": "/images/visit-education-minister.jpg"
        },
        {
            "title": "Taluk & District Level Sports Championships",
            "date": "Athletics Win",
            "location": "Inter-Collegiate Meets",
            "desc": "SGI student teams clinched consecutive podium finishes in volleyball, track-and-field, and annual NSS community events.",
            "url": "/student-life",
            "image": "/images/sports-volleyball.jpg"
        }
    ]
}

# 2. about.json
about_data = {
    "slug": "about",
    "metaTitle": "About Us | Santosh Group of Institutions",
    "metaDescription": "Learn about the vision, leadership, and 34+ year heritage of Santosh Group of Institutions founded by Dr. Al Haji Abdul Sattar.",
    "intro": {
        "eyebrow": "OUR STORY & HERITAGE",
        "title": "34 Years of Empowering Generations from Pre-Primary to Graduation",
        "paragraph1": "Santosh Group of Institutions was founded by Dr. Al Haji Abdul Sattar, who believes education to be the supreme key to development and human progress. It is the key to changing lives and opening world perspectives in a modern millennium characterized by rapid technological advancement and evolving value systems.",
        "paragraph2": "Santosh institutions reflect both the changing needs of the 21st century and the unchanging core values of Indian society. With 11 campuses spread strategically between Bangarpet and Bangalore, we offer an indispensable balance between urban opportunity and rural groundedness.",
        "quote": "If your actions inspire others to dream more, learn more, do more and become more, you are a leader."
    },
    "visionAim": {
        "vision": "We believe in the importance of early experiences in shaping the personality of a child. In the field of education we wish to set trends that will lay the foundation towards building future leaders, thinkers, scientists, and good human beings.",
        "aim": "The college aims to build complex learning skills in the student and make him responsible for his learning. Building social sensitivity and moral development is our core area of focus."
    },
    "kalamBlock": {
        "quote": "The educationalist should build the capacities of the spirit of inquiry, creativity, entrepreneurial and moral leadership among students and become their role model.",
        "author": "Dr. A.P.J. Abdul Kalam",
        "designation": "Former President of India",
        "image": "/images/dr-kalam.jpg"
    },
    "chairmanMessage": {
        "name": "Dr. Al Haji Abdul Sattar, M.A.",
        "role": "Chairman, Santosh Group of Institutions",
        "image": "/images/chairman-abdul-sattar.jpg",
        "text": [
            "Welcome to the Santosh Group of Institutions, a place where leaders and potential leaders come to learn and to reflect — a true center of excellence in education. On behalf of the SGI team, I look forward to welcoming you into our academic family.",
            "The uncompromising maintenance of high academic standards, an emphasis on innovative and critical thinking, and identification of the 'whole person' as the target for human and cultural development are those factors which truly distinguish Indian education. Curricula must be career-driven and skill-based, contributing directly to the accomplishment of a dignified individual.",
            "Our institutions span a broad range of disciplines from Pre-Primary School to Graduation across Arts, Commerce, Science, Business Management, and Teacher Education. We believe in shaping students to keep pace with rapid change while remaining responsible, values-driven citizens."
        ]
    },
    "secretaryMessage": {
        "name": "A. Adil Pasha, B.Sc., B.E.",
        "role": "Secretary, Santosh Group of Institutions",
        "image": "/images/secretary-adil-pasha.jpg",
        "text": [
            "The going is good. But the good should transform to better and best. The best has to go beyond the best. The individual has the capacity to change, and to change completely through the right kind of education.",
            "Among personal skills, we stress character formation, self-esteem, and spiritual development. In interpersonal skills: teamwork, empathy, and commitment to society. The backbone of personal growth is our value system: Faith in God, Moral Uprightness, Love of Fellow Being, Social Responsibility, and Pursuit of Excellence.",
            "Where there is life, there is hope; where there are dreams, they become goals that winners dwell upon until achievement becomes automatic. Come, let us change and achieve the goal together."
        ]
    },
    "qualityFaculty": {
        "eyebrow": "OUR EDUCATORS",
        "title": "Faculty of High Academic Professionalism",
        "description": "Members of our faculty are highly educated and maintain their edge through continuous classroom innovation, seminar presentations, and subject mastery. With small class sizes, our faculty foster close mentorship and lively interactive discussion.",
        "quote": "SGI has a high level of academic professionalism.",
        "meetingImage": "/images/faculty-meeting.jpg",
        "groupImage": "/images/faculty-group.jpg"
    },
    "spiritOfCollege": {
        "title": "Spirit of the College",
        "prayer": "Oh, God my father, do love me till the end; Permit me to love and obey my Parents and Teachers; Help me always choose and do the right; In our work and in our play, God is with us everyday; Therefore we will never fear; In pain and trouble, hear my plea; O Lord teach me to be good every day."
    }
}

# 3. academics.json
academics_data = {
    "slug": "academics",
    "metaTitle": "Academic Programs | Santosh Group of Institutions",
    "metaDescription": "Explore Degree programs (BBM, BCA, BCom, BA), Diploma in Education (D.Ed), Pre-University streams (Science, Commerce, Arts), and School curriculum.",
    "intro": {
        "eyebrow": "ACADEMIC EXCELLENCE",
        "title": "Comprehensive Education from Nursery to Graduation",
        "lead": "Every program at SGI combines rigorous academic syllabus with experiential learning, industrial exposure, moral grounding, and skill development."
    },
    "degrees": [
        {
            "code": "BBM",
            "name": "Bachelor of Business Management",
            "affiliation": "Bangalore University",
            "duration": "3 Years (6 Semesters)",
            "overview": "BBM trains students to acquire managerial skills per industrial requirements through lectures, case studies, role plays, seminars, industrial visits, and entrepreneurship incubation.",
            "electives": ["Human Resource Management (HRM)", "Marketing Management", "Financial Management"],
            "features": "Problem-solving, corporate presentations, managerial aptitude, synchronized business models.",
            "subjects": ["Business Economics", "Fundamentals of Accounting", "Business Statistics", "Financial Accounting", "Business Environment", "Corporate Accounting", "Services Management", "International Business", "Computer Business Applications", "Indian Constitution", "Entrepreneurial Development"],
            "url": "/institutions/santosh-degree-college"
        },
        {
            "code": "BCA",
            "name": "Bachelor of Computer Applications",
            "affiliation": "Bangalore University",
            "duration": "3 Years (6 Semesters)",
            "overview": "Prepares students for modern IT careers by bridging academic computer science with industry software engineering, multimedia, and systems administration.",
            "electives": ["Software Engineering & Web Tech", "Database Management Systems", "Computer Graphics & Networks"],
            "careers": ["System Analyst", "Programmer", "Project Manager", "Software Quality Tester", "CRM Administrator"],
            "url": "/institutions/santosh-degree-college"
        },
        {
            "code": "B.Com",
            "name": "Bachelor of Commerce",
            "affiliation": "Bangalore University",
            "duration": "3 Years (6 Semesters)",
            "overview": "Covers major areas of finance, banking, business law, statistics, stock brokerage, and corporate taxation. Arranged sequentially so concepts advance in harmony.",
            "electives": ["Accounting Group", "Information Systems & Management"],
            "subjects": ["Financial Accounting", "Business Economics", "Human Resource Management", "Business Statistics", "Corporate Accounting", "International Business Environment", "Indian Constitution", "Entrepreneurship Development", "Business Laws", "Management Accounting"],
            "url": "/institutions/santosh-degree-college"
        },
        {
            "code": "BA",
            "name": "Bachelor of Arts",
            "affiliation": "Bangalore University",
            "duration": "3 Years (6 Semesters)",
            "overview": "Provides critical perspectives in History, Political Science, Economics, and Sociology. Emphasizes theoretical depth and Indian societal context.",
            "disciplines": [
                {"subject": "History", "desc": "Critique of historical narratives and discovery of cultural knowledge formation."},
                {"subject": "Political Science", "desc": "Study of democratic institutions, statecraft, administration, and public ethics."},
                {"subject": "Economics", "desc": "Theoretical micro/macro foundation followed by Indian Economy Since Independence and Financial Economics."},
                {"subject": "Sociology", "desc": "Systematic introduction to social dynamics, sociological theory, and research methodologies in India."}
            ],
            "url": "/institutions/santosh-degree-college"
        }
    ],
    "teacherEducation": {
        "title": "Diploma in Education (D.Ed / T.C.H)",
        "duration": "2 Academic Years including 3 months Internship",
        "recognition": "Recognized by NCTE & Permitted by Govt of Karnataka",
        "email": "santoshdedcollege@gmail.com",
        "objectives": [
            "Develop competency-based skills of teaching.",
            "Produce competent teachers who can be friend, philosopher, and guide to students.",
            "Empower teacher trainees with communication skills, moral values, and classroom confidence.",
            "Shape the destiny of India within her classrooms through value-based pedagogy."
        ],
        "url": "/institutions/santosh-ded-college"
    },
    "pucStreams": {
        "title": "Pre-University Courses (Fathima PU College)",
        "duration": "2 Years",
        "board": "Recognized by Karnataka State PU Board",
        "streams": [
            {"name": "Science PCMB", "subjects": "Physics, Chemistry, Mathematics, Biology"},
            {"name": "Science PCMC", "subjects": "Physics, Chemistry, Mathematics, Computer Science"},
            {"name": "Science PCME", "subjects": "Physics, Chemistry, Mathematics, Electronics"},
            {"name": "Commerce HECA", "subjects": "History, Economics, Commerce, Accountancy"},
            {"name": "Commerce EABC", "subjects": "Economics, Accountancy, Business Studies, Commerce"},
            {"name": "Arts HEPS", "subjects": "History, Economics, Political Science, Sociology"}
        ],
        "languages": ["English", "Hindi", "Kannada", "Urdu"],
        "url": "/institutions/fathima-pu-college"
    }
}

# 4. campus-life.json
campus_data = {
    "slug": "campus-life",
    "metaTitle": "Campus & Infrastructure | Santosh Group of Institutions",
    "metaDescription": "Explore our classrooms, high-tech computer labs, library, hostel accommodations, college bus fleet, and outdoor sports grounds.",
    "intro": {
        "eyebrow": "CAMPUS & INFRASTRUCTURE",
        "title": "A Stimulating Physical Environment for Learning",
        "lead": "We believe physical ambience is crucial to successful learning. Our campuses are thoughtfully planned with natural light, modern amenities, and safe infrastructure."
    },
    "facilities": [
        {"num": "01", "title": "Broad-Based Curriculum Spaces", "desc": "Stimulating environments designed to appeal to and challenge a wide spectrum of student interests and aptitudes."},
        {"num": "02", "title": "Explorative Teaching Labs", "desc": "Facilitating learning through hands-on observation, inquiry, and scientific experimentation rather than rote memory."},
        {"num": "03", "title": "Academic & Social Platforms", "desc": "Spacious platforms designed to promote academic collaboration, seminar presentations, and community development."},
        {"num": "04", "title": "Stimulating Physical Ambience", "desc": "Serene green surroundings that ensure learning is pleasant, motivating, and free from urban distraction."},
        {"num": "05", "title": "Airy & Naturally Lit Classrooms", "desc": "Large, colorful, student-friendly lecture halls with generous cross-ventilation and natural illumination."},
        {"num": "06", "title": "Ergonomic Furniture", "desc": "Comfortable chairs and modular tables suitable for both focused individual study and active group collaboration."},
        {"num": "07", "title": "Interactive Activity Rooms", "desc": "Dedicated activity halls where younger learners have fun while absorbing core concepts indirectly through educational kits."},
        {"num": "08", "title": "Modern Multimedia Computer Labs", "desc": "Equipped with high-speed internet, modern computers, overhead projectors, multimedia CDs, DVDs, and specialized software."},
        {"num": "09", "title": "Well-Stocked Library", "desc": "Extensive catalog of fiction, non-fiction, academic references, journals, and periodicals catering to every age group."},
        {"num": "10", "title": "Separate Boys & Girls Hostels", "desc": "Safe residential accommodations with 24-hour water supply, hot water facilities, uninterrupted power, and strict supervision."},
        {"num": "11", "title": "Dedicated College Bus Fleet", "desc": "Well-maintained fleet of institution buses ferry students safely between surrounding towns, villages, and campus daily."},
        {"num": "12", "title": "Expansive Sports Grounds", "desc": "Large outdoor playing areas with volleyball, cricket, badminton, and age-appropriate playground equipment."},
        {"num": "13", "title": "Spacious College Auditorium", "desc": "Acoustically designed hall for institutional meetings, guest lectures, annual days, and cultural celebrations."},
        {"num": "14", "title": "Landscaped Gardens", "desc": "Lush campus greenery and floral gardens creating an uplifting, calm backdrop for study and reflection."}
    ],
    "gallery": [
        {"image": "/images/campus-building-fathima.jpg", "caption": "Fathima PU College & Degree Campus Building"},
        {"image": "/images/classroom-students.jpg", "caption": "Spacious, well-lit classrooms with uniform discipline"},
        {"image": "/images/library-students.jpg", "caption": "Well-stocked library supporting research & reading"},
        {"image": "/images/bca-computer-lab.jpg", "caption": "Computer laboratory with multimedia systems"},
        {"image": "/images/college-bus.jpg", "caption": "Dedicated fleet of institution buses for daily transport"},
        {"image": "/images/auditorium-event.jpg", "caption": "Spacious auditorium for campus gatherings and awards"}
    ]
}

# 5. student-life.json
student_life_data = {
    "slug": "student-life",
    "metaTitle": "Student Life & Regulations | Santosh Group of Institutions",
    "metaDescription": "Discover NSS community camps, sports, career guidance, counseling cells, and campus rules & regulations at SGI.",
    "intro": {
        "eyebrow": "VIBRANT CAMPUS CULTURE",
        "title": "Character, Community & Holistic Growth",
        "lead": "Education at Santosh goes beyond the classroom into community service, sports leadership, career readiness, and disciplined self-governance."
    },
    "nss": {
        "title": "National Service Scheme (NSS)",
        "overview": "The NSS programme is a government-sponsored initiative conducted across SGI colleges to involve students directly in nation-building activities. Under the guidance of our institutional coordinator, students utilize their time and talents to serve weaker sections of society, participating in inter-collegiate and inter-university camps.",
        "campTitle": "5-Day Rural Service Camp at T. Gollahalli",
        "campDesc": "Students and faculty organized intensive village literacy drives, health hygiene campaigns, environmental cleanliness initiatives, and cultural exchanges.",
        "image": "/images/nss-camp-banner.jpg",
        "sportsImage": "/images/sports-volleyball.jpg"
    },
    "careerAndCounselling": {
        "placement": {
            "title": "Career Guidance & Placement Cell",
            "desc": "Carried out by a dedicated committee of faculty coordinators and student representatives. Our objective is to bring about academic excellence through meaningful industry interaction, streamline student aspirations, and liaise with corporate recruiters for campus placement."
        },
        "counselling": {
            "title": "Student Counselling Cell",
            "desc": "Staffed by qualified student counselors to help learners improve personalities, adjust to new psychological and academic environments, and build resilience to cope with academic stress during critical exam periods."
        }
    },
    "rules": [
        {
            "category": "Attendance & Punctuality",
            "items": [
                "Students must be punctual at all times. Late comers are liable to disciplinary action.",
                "A minimum of 75% attendance is compulsory. Students falling below this threshold will not be permitted to appear for final board/university examinations.",
                "Leave notes signed by parents/guardians must be submitted whenever a student fails to attend classes.",
                "A student absent for 3 consecutive days or more without prior written permission must meet the Principal accompanied by parents in person."
            ]
        },
        {
            "category": "Campus Conduct & Mobile Policy",
            "items": [
                "Students are strictly prohibited from using mobile phones inside the college campus.",
                "Irregular attendance, neglect of assignments, or disobedience to lecturers constitutes sufficient grounds for suspension or dismissal.",
                "Any damage caused to institutional property will be charged individually to the responsible party.",
                "Any form of canvassing for seats or examination favors will disqualify the candidate immediately."
            ]
        },
        {
            "category": "Uniform & Identity Cards",
            "items": [
                "College uniform is compulsory for all students and will be issued by the institution upon payment of the prescribed fee.",
                "Official Identity Cards are issued to every candidate and must be worn visibly at all times while on campus and on institution buses."
            ]
        },
        {
            "category": "Examinations & Academic Records",
            "items": [
                "Monthly tests are conducted regularly to monitor progress. Attendance for monthly tests is strictly mandatory.",
                "Parents are advised to meet faculty in-charges monthly without fail to review academic records.",
                "Lesson plan books, practical record books, and observational training records are supplied directly by the institute."
            ]
        }
    ]
}

# 6. admissions.json
admissions_data = {
    "slug": "admissions",
    "metaTitle": "Admissions & Procedure | Santosh Group of Institutions",
    "metaDescription": "Admission criteria, step-by-step procedures, documents checklist, and academic examination schedules for SGI schools and colleges.",
    "intro": {
        "eyebrow": "JOIN OUR COMMUNITY",
        "title": "Admissions for Academic Year 2026-27",
        "lead": "Join an institution with over three decades of educational excellence. Follow the step-by-step procedure below to secure your seat."
    },
    "eligibility": [
        {
            "institution": "Pre-Primary, Primary & High Schools",
            "criteria": "Open to all eligible students as per state age norms. Transfer certificate and previous academic records required for Grade 1 and above."
        },
        {
            "institution": "Fathima PU College (Science, Commerce, Arts)",
            "criteria": "Candidates who have passed SSLC / ICSE / CBSE or equivalent 10th standard examinations. Out-of-state candidates require a migration certificate."
        },
        {
            "institution": "Santosh Degree College (BBM, BCA, B.Com, BA)",
            "criteria": "Successful completion of 2-year Pre-University Course of Karnataka State or any equivalent 10+2 examination recognized by Bangalore University."
        },
        {
            "institution": "Santosh D.Ed (T.C.H) College",
            "criteria": "Pass in 10+2 / PUC with minimum 50% aggregate marks (45% for SC/ST and Category-1 candidates)."
        }
    ],
    "steps": [
        {"step": "01", "title": "Obtain Application", "desc": "Collect the official application form from the college admissions office or submit an online inquiry."},
        {"step": "02", "title": "Submit Form & Documents", "desc": "Submit the completed application form along with attested copies of marks cards and certificates."},
        {"step": "03", "title": "Selection Announcement", "desc": "Merit list of selected candidates is announced on the campus notice board and via direct communication."},
        {"step": "04", "title": "Principal Interview & Verification", "desc": "Selected candidates meet the Principal along with parents/guardians with all original certificates for final enrollment."}
    ],
    "documents": [
        "Original & Attested Copies of SSLC / 10th Standard Marks Card",
        "Original & Attested Copies of PUC / 12th Standard Marks Card (for Degree & D.Ed)",
        "Original Transfer Certificate (TC) issued by the institution last attended",
        "Original Migration Certificate (for candidates originating outside Karnataka State)",
        "Conduct / Character Certificate from the head of the previous institution",
        "Four recent stamp-sized photographs",
        "Caste and Income Certificate (if claiming quota concessions)"
    ],
    "examSchedule": [
        {"name": "I Quarterly Examination", "dates": "September, 1st week", "duration": "90 Minutes", "maxMarks": "50"},
        {"name": "Mid-Term Examination", "dates": "December, 1st week", "duration": "3 Hours", "maxMarks": "100"},
        {"name": "II Quarterly (for I PUC)", "dates": "February, 1st week", "duration": "90 Minutes", "maxMarks": "50"},
        {"name": "Preparatory Examination (II PUC / Degree)", "dates": "February, 2nd & 3rd week", "duration": "3 Hours", "maxMarks": "100"},
        {"name": "Annual Examination (Board / University)", "dates": "Feb last week / March", "duration": "3 Hours", "maxMarks": "100"}
    ]
}

# 7. gallery.json
gallery_data = {
    "slug": "gallery",
    "metaTitle": "Campus Gallery | Santosh Group of Institutions",
    "metaDescription": "Archival and contemporary photo gallery featuring dignitary visits, campus events, academic sessions, and student life.",
    "categories": ["All", "Dignitaries", "Campus", "Academics", "Sports & NSS"],
    "photos": [
        {"title": "Visit of Honorable Education Minister", "category": "Dignitaries", "image": "/images/visit-education-minister.jpg", "caption": "Honorable Education Minister felicitation at Santosh campus."},
        {"title": "Block Educational Officer & DIET Principal Visit", "category": "Dignitaries", "image": "/images/visit-district-institute.jpg", "caption": "District academic dignitaries reviewing institutional performance."},
        {"title": "Dr. A.P.J. Abdul Kalam Tribute", "category": "Campus", "image": "/images/dr-kalam.jpg", "caption": "Guiding inspiration for student inquiry and leadership."},
        {"title": "Fathima PU College Main Campus", "category": "Campus", "image": "/images/campus-building-fathima.jpg", "caption": "Front facade of Fathima PU & Degree College in Bangarpet."},
        {"title": "Santosh D.Ed College Building", "category": "Campus", "image": "/images/campus-building-ded.jpg", "caption": "Teacher education block with spacious seminar halls."},
        {"title": "Interactive Lecture Session", "category": "Academics", "image": "/images/classroom-students.jpg", "caption": "Students in formal uniform engaged in classroom discussions."},
        {"title": "BCA Computer Laboratory", "category": "Academics", "image": "/images/bca-computer-lab.jpg", "caption": "Students programming in modern multimedia computer labs."},
        {"title": "Reference Library & Study Hall", "category": "Academics", "image": "/images/library-students.jpg", "caption": "Extensive collection of reference books and journals."},
        {"title": "D.Ed Teacher Trainee Cohort", "category": "Academics", "image": "/images/ded-teachers.jpg", "caption": "Trainees preparing teaching-learning materials."},
        {"title": "NSS Rural Camp at T. Gollahalli", "category": "Sports & NSS", "image": "/images/nss-camp-banner.jpg", "caption": "Five-day intensive community service camp."},
        {"title": "Inter-Collegiate Volleyball Tournament", "category": "Sports & NSS", "image": "/images/sports-volleyball.jpg", "caption": "Outdoor games and athletics on the central campus grounds."},
        {"title": "Institution Bus Fleet", "category": "Campus", "image": "/images/college-bus.jpg", "caption": "Safe transportation network spanning Bangarpet and Kolar taluks."}
    ]
}

# 8. contact.json
contact_data = {
    "slug": "contact",
    "metaTitle": "Contact Us | Santosh Group of Institutions",
    "metaDescription": "Get in touch with Santosh Group of Institutions. Campus address, phone numbers, email, and campus directory.",
    "headOffice": {
        "name": "Santosh Group of Institutions (Central Office)",
        "address": "No. 1169, Kolar Road (Near Canara Bank), Bangarpet – 563 114, Kolar District, Karnataka",
        "phones": ["09448106902", "09886152151"],
        "email": "santoshgroupofinstitutions@gmail.com",
        "dedEmail": "santoshdedcollege@gmail.com",
        "hours": "Monday – Saturday: 9:00 AM – 5:00 PM (Closed on Sundays)"
    },
    "institutionsList": [
        {"name": "Santosh Nursery School", "location": "Bangarpet", "level": "Pre-Primary", "phone": "09448106902"},
        {"name": "Santosh Primary School", "location": "Bangarpet", "level": "Primary", "phone": "09448106902"},
        {"name": "Santosh Higher Primary School", "location": "Bangarpet", "level": "Middle School", "phone": "09448106902"},
        {"name": "Santosh High School", "location": "Bangarpet", "level": "Secondary", "phone": "09448106902"},
        {"name": "Fathima PU College", "location": "Bangarpet", "level": "Pre-University (Arts, Commerce, Science)", "phone": "09448106902"},
        {"name": "Santosh Degree College", "location": "Bangarpet", "level": "Graduation (BBM, BCA, B.Com, BA)", "phone": "09448106902"},
        {"name": "Santosh D.Ed (T.C.H) College", "location": "Bangarpet", "level": "Teacher Training Diploma", "phone": "09886152151"},
        {"name": "Santosh Nursery School", "location": "Bangalore", "level": "Pre-Primary", "phone": "09886152151"},
        {"name": "Santosh Primary School", "location": "Bangalore", "level": "Primary", "phone": "09886152151"},
        {"name": "Santosh Higher Primary School", "location": "Bangalore", "level": "Middle School", "phone": "09886152151"},
        {"name": "Santosh High School", "location": "Bangalore", "level": "Secondary", "phone": "09886152151"}
    ]
}

# Save main pages
for page in [home_data, about_data, academics_data, campus_data, student_life_data, admissions_data, gallery_data, contact_data]:
    path = f"{base_dir}/{page['slug']}.json"
    with open(path, "w") as f:
        json.dump(page, f, indent=2)
    print(f"Wrote {path}")

# Now write the 11 individual institutions files
institutions = [
    # Bangarpet Schools
    {
        "slug": "santosh-nursery-school-bangarpet",
        "name": "Santosh Nursery School",
        "location": "Bangarpet",
        "campus": "Kolar Road Campus, Bangarpet",
        "level": "Pre-Primary Education",
        "template": "school",
        "tagline": "Nurturing Curiosity and Early Emotional Growth",
        "description": "Santosh Nursery School provides a secure, caring, and stimulating environment where toddlers take their first joyful steps into formal learning. We emphasize play-based discovery, sensory exploration, and language foundations.",
        "highlights": ["Safe and joyful play rooms", "Foundational phonics and numeracy kits", "Attentive and motherly care staff", "Individualized developmental focus"],
        "phone": "09448106902",
        "email": "santoshgroupofinstitutions@gmail.com",
        "image": "/images/students-group-uniform.jpg"
    },
    {
        "slug": "santosh-primary-school-bangarpet",
        "name": "Santosh Primary School",
        "location": "Bangarpet",
        "campus": "Kolar Road Campus, Bangarpet",
        "level": "Primary Education (Grades 1–4)",
        "template": "school",
        "tagline": "Building Strong Fundamentals in Literacy and Numeracy",
        "description": "Our primary school instills confidence and active learning habits. Students develop communicative fluency in English, regional languages, mathematics, environmental science, and creative arts.",
        "highlights": ["Child-centric activity based learning", "Spacious and ventilated classrooms", "Moral science and value education", "Regular field trips and outdoor recreation"],
        "phone": "09448106902",
        "email": "santoshgroupofinstitutions@gmail.com",
        "image": "/images/classroom-students.jpg"
    },
    {
        "slug": "santosh-higher-primary-school-bangarpet",
        "name": "Santosh Higher Primary School",
        "location": "Bangarpet",
        "campus": "Kolar Road Campus, Bangarpet",
        "level": "Middle School (Grades 5–7)",
        "template": "school",
        "tagline": "Encouraging Analytical Inquiry and Collaborative Skills",
        "description": "The higher primary years bridge foundational learning with deeper conceptual thinking. Students participate in science exhibitions, literary activities, mathematics competitions, and physical sports.",
        "highlights": ["Well-equipped science and math learning aids", "Computer literacy from early grades", "Dedicated library reading hours", "Sports and physical education"],
        "phone": "09448106902",
        "email": "santoshgroupofinstitutions@gmail.com",
        "image": "/images/library-students.jpg"
    },
    {
        "slug": "santosh-high-school-bangarpet",
        "name": "Santosh High School",
        "location": "Bangarpet",
        "campus": "Kolar Road Campus, Bangarpet",
        "level": "Secondary Education (Grades 8–10)",
        "template": "school",
        "tagline": "Excellence in SSLC Board Preparation and Character Formation",
        "description": "Santosh High School has an enviable track record of high passing percentages and district distinctions in the Karnataka SSLC Board examinations. We emphasize disciplined study regimens, remedial support, and all-round personality development.",
        "highlights": ["Experienced subject-specialist teachers", "Intensive board examination preparatory tests", "Career counselling and aptitude orientation", "Participation in taluk-level athletics and debates"],
        "phone": "09448106902",
        "email": "santoshgroupofinstitutions@gmail.com",
        "image": "/images/faculty-group.jpg"
    },
    # Bangalore Schools
    {
        "slug": "santosh-nursery-school-bangalore",
        "name": "Santosh Nursery School",
        "location": "Bangalore",
        "campus": "Bangalore Campus",
        "level": "Pre-Primary Education",
        "template": "school",
        "tagline": "Early Childhood Discovery in the Garden City",
        "description": "Serving the urban community in Bangalore, our nursery school offers progressive early childhood education with a loving touch, preparing young minds for lifelong learning.",
        "highlights": ["Child-safe infrastructure", "Interactive Montessori & play methods", "Parent-teacher progress collaboration", "Nutritious snack and care environment"],
        "phone": "09886152151",
        "email": "santoshgroupofinstitutions@gmail.com",
        "image": "/images/students-group-uniform.jpg"
    },
    {
        "slug": "santosh-primary-school-bangalore",
        "name": "Santosh Primary School",
        "location": "Bangalore",
        "campus": "Bangalore Campus",
        "level": "Primary Education (Grades 1–4)",
        "template": "school",
        "tagline": "Holistic Learning and Creative Expression",
        "description": "Balancing academic rigor with artistic and athletic development, Santosh Primary Bangalore helps children build resilient learning foundations in an encouraging atmosphere.",
        "highlights": ["Experienced urban teaching faculty", "Multi-lingual proficiency focus", "Classroom smart learning aids", "Arts, crafts, and physical training"],
        "phone": "09886152151",
        "email": "santoshgroupofinstitutions@gmail.com",
        "image": "/images/classroom-students.jpg"
    },
    {
        "slug": "santosh-higher-primary-school-bangalore",
        "name": "Santosh Higher Primary School",
        "location": "Bangalore",
        "campus": "Bangalore Campus",
        "level": "Middle School (Grades 5–7)",
        "template": "school",
        "tagline": "Empowering Independent Thinkers and Inquiring Minds",
        "description": "Preparing students for modern challenges through structured scientific projects, digital literacy, and active debate clubs, grounded in enduring moral values.",
        "highlights": ["Computer science and digital skills", "Science club and project competitions", "Comprehensive library resources", "Sports coaching and leadership"],
        "phone": "09886152151",
        "email": "santoshgroupofinstitutions@gmail.com",
        "image": "/images/library-students.jpg"
    },
    {
        "slug": "santosh-high-school-bangalore",
        "name": "Santosh High School",
        "location": "Bangalore",
        "campus": "Bangalore Campus",
        "level": "Secondary Education (Grades 8–10)",
        "template": "school",
        "tagline": "Academic Distinction and Future-Ready Leadership",
        "description": "Our Bangalore High School pairs competitive academic coaching for state board examinations with career guidance, mentorship, and civic awareness.",
        "highlights": ["Distinguished faculty track record", "Systematic test series and feedback cycles", "High pass rates in state examinations", "Science and technology exhibitions"],
        "phone": "09886152151",
        "email": "santoshgroupofinstitutions@gmail.com",
        "image": "/images/faculty-group.jpg"
    },
    # Template B Colleges
    {
        "slug": "fathima-pu-college",
        "name": "Fathima PU College",
        "location": "Bangarpet",
        "campus": "Kolar Road Campus, Bangarpet",
        "level": "Pre-University (Science, Commerce & Arts)",
        "template": "college",
        "board": "Recognized by Karnataka State PU Board (Co-educational)",
        "tagline": "Over a Decade of Top Quality Teaching with 90%+ Pass Rate",
        "description": "Recognized by Karnataka State PU Board, Fathima PU College conducts 2-year Pre-University courses for boys and girls across Science, Commerce, and Arts streams. We place deep emphasis on interactive learning that leads to comprehensive understanding, not rote memorization.",
        "keyFacts": [
            "Over a decade of proven excellence in pre-university teaching",
            "All lecturers are dedicated subject specialists with university pedigrees",
            "Consistent pass rate exceeding 90% in state board examinations",
            "State-of-the-art computer labs, libraries, and science laboratories",
            "Comprehensive career guidance and competitive exam orientation",
            "Competitive and recreational sports grounds"
        ],
        "pledge": {
            "weWill": [
                "Support you with a personal tutor and regular guidance",
                "Give you realistic feedback on your academic progress",
                "Provide additional individual support as and where necessary",
                "Widen your experience through seminars, field visits, and NSS",
                "Develop your personal interests and athletic talents"
            ],
            "inReturnYouWill": [
                "Work hard and maintain academic sincerity",
                "Attend classes regularly and punctually (75% minimum)",
                "Study effectively and complete all assignment records",
                "Make continuous, demonstrable academic progress"
            ]
        },
        "streams": [
            {"stream": "Science PCMB", "subjects": "Physics, Chemistry, Mathematics, Biology"},
            {"stream": "Science PCMC", "subjects": "Physics, Chemistry, Mathematics, Computer Science"},
            {"stream": "Science PCME", "subjects": "Physics, Chemistry, Mathematics, Electronics"},
            {"stream": "Commerce HECA", "subjects": "History, Economics, Commerce, Accountancy"},
            {"stream": "Commerce EABC", "subjects": "Economics, Accountancy, Business Studies, Commerce"},
            {"stream": "Arts HEPS", "subjects": "History, Economics, Political Science, Sociology"}
        ],
        "languages": ["English", "Hindi", "Kannada", "Urdu"],
        "phone": "09448106902",
        "email": "santoshgroupofinstitutions@gmail.com",
        "image": "/images/campus-building-fathima.jpg"
    },
    {
        "slug": "santosh-degree-college",
        "name": "Santosh Degree College",
        "location": "Bangarpet",
        "campus": "Kolar Road Campus, Bangarpet",
        "level": "Undergraduate University Degrees",
        "template": "college",
        "board": "Affiliated to Bangalore University",
        "tagline": "Equipping Graduates to Meet Global Challenges Through Experiential Learning",
        "description": "Santosh Degree College offers 3-year undergraduate degrees affiliated to Bangalore University. Our curriculum supplements lectures with case studies, workshops, industry presentations, computer simulation, and field visits.",
        "programs": [
            {
                "degree": "BBM (Bachelor of Business Management)",
                "overview": "Designed to train students in essential managerial skills. Emphasizes out-of-the-box thinking, strategizing, and entrepreneurial initiative.",
                "electives": ["Marketing Management", "Human Resource Management (HRM)", "Financial Management"],
                "curriculum": ["Business Economics", "Fundamentals of Accounting", "Business Statistics", "Financial Accounting", "Business Environment", "Corporate Accounting", "Services Management", "International Business", "Computer Business Applications", "Indian Constitution", "Entrepreneurial Development"]
            },
            {
                "degree": "BCA (Bachelor of Computer Applications)",
                "overview": "Bridges academic computer science with practical IT industry needs. Intensive laboratory sessions in programming, database architecture, and network administration.",
                "prospects": ["System Analyst", "Programmer / Developer", "Project Manager", "CRM Administrator", "Software Quality Analyst"]
            },
            {
                "degree": "B.Com (Bachelor of Commerce)",
                "overview": "Comprehensive preparation for banking, company secretaryship, stock brokerages, auditing, and corporate financial management.",
                "electives": ["Accounting Group", "Information Systems & Management"],
                "curriculum": ["Financial Accounting", "Business Economics", "HRM", "Business Statistics", "Corporate Accounting", "International Business Environment", "Business Laws", "Management Accounting"]
            },
            {
                "degree": "BA (Bachelor of Arts)",
                "overview": "In-depth undergraduate grounding in the humanities, building critical understanding of social structures, economic systems, and democratic governance.",
                "subjects": ["History (Modernist critique & knowledge creation)", "Political Science (Statecraft & administration)", "Economics (Micro/Macro & Indian Economy)", "Sociology (Theoretical & empirical sociology of India)"]
            }
        ],
        "eligibility": "Students who have completed 2-year Pre-University Course of Karnataka State or equivalent.",
        "duration": "3 Academic Years (6 Semesters)",
        "phone": "09448106902",
        "email": "santoshgroupofinstitutions@gmail.com",
        "image": "/images/bbm-students.jpg"
    },
    {
        "slug": "santosh-ded-college",
        "name": "Santosh D.Ed (T.C.H) College",
        "location": "Bangarpet",
        "campus": "Kolar Road Campus, Bangarpet",
        "level": "Diploma in Education (Teacher Training)",
        "template": "college",
        "board": "Recognized by NCTE & Permitted by Govt of Karnataka",
        "tagline": "18 Distinctions & Kolar District Toppers — Shaping the Future of India",
        "description": "Santosh D.Ed College trains future teachers who will shape the destiny of India in their classrooms. With 18 distinctions secured in a single batch, our college is a recognized leader in elementary teacher training.",
        "objectives": [
            "Develop competency-based skills of modern teaching.",
            "Produce competent teachers who can be friend, philosopher, and guide to students.",
            "Develop the total personality of the teacher to inspire future generations.",
            "Empower teacher trainees with communication skills and classroom confidence.",
            "Sharpen creative thinking abilities and practice value-based education."
        ],
        "structure": {
            "year1": [
                "Education I: Conceptual Basis of Education",
                "Education II: Psychology of the Learner",
                "Education III: Principles of Curriculum Transaction",
                "Education IV: Language Pedagogy (Kannada, English, Urdu, Tamil, Hindi, Marathi, Telugu)",
                "Education V: Physical Education",
                "Education VI: Work Education"
            ],
            "year2": [
                "Professional Subject 1: Modern Trends in Education",
                "Professional Subject 2: Management and Organisation",
                "Professional Subject 3: Work Education",
                "Professional Subject 4: Physical and Health Education",
                "Specialisation Group A: Social Science and Mathematics",
                "Specialisation Group B: Science and English",
                "Additional Practical: Crafts, Arts, Music, Drawing, and Computer Education"
            ]
        },
        "eligibility": "Pass in 10+2 / PUC with 50% Marks (45% for SC/ST and Handicapped candidates).",
        "duration": "2 Academic Years including 3 months full-time school Internship.",
        "phone": "09886152151",
        "email": "santoshdedcollege@gmail.com",
        "image": "/images/ded-teachers.jpg"
    }
]

for inst in institutions:
    path = f"{base_dir}/institutions/{inst['slug']}.json"
    with open(path, "w") as f:
        json.dump(inst, f, indent=2)
    print(f"Wrote {path}")

print("All 19 JSON content files created successfully!")

import os
import json

base_dir = "data/content/institutions"

institutions_data = {
    "santosh-nursery-school-bangarpet": {
        "slug": "santosh-nursery-school-bangarpet",
        "name": "Santosh Nursery School",
        "location": "Bangarpet",
        "campus": "Kolar Road, Bangarpet",
        "level": "Pre-Primary Education",
        "template": "school",
        "tagline": "Nurturing early curiosity and emotional confidence",
        "description": "Santosh Nursery School offers toddlers a gentle, joyful introduction to formal learning. Rooted in Dr. Abdul Sattar's belief that early experiences shape lifetime personality, our early childhood educators focus on language acquisition, motor skill coordination, and social empathy in a secure environment.",
        "features": [
            {
                "title": "Sensory & Activity-Based Exploration",
                "detail": "Children learn through structured play using educational kits, building blocks, and tactile materials that develop fine motor skills and spatial reasoning naturally."
            },
            {
                "title": "Foundational Literacy & Phonics",
                "detail": "Early speech clarity, rhyming, storytelling, and phonics introduce English and regional vocabulary without pressure or rote memorization."
            },
            {
                "title": "Attentive Maternal Care",
                "detail": "Small class sizes allow our dedicated care staff to attend closely to each child's emotional comfort, hygiene, and daily social habits."
            },
            {
                "title": "Parent Communication & Trust",
                "detail": "Regular monthly parent interactions keep families actively aligned with their child's behavioral growth and developmental milestones."
            }
        ],
        "phone": "09448106902",
        "email": "santoshgroupofinstitutions@gmail.com",
        "image": "/images/students-walking.jpg"
    },
    "santosh-primary-school-bangarpet": {
        "slug": "santosh-primary-school-bangarpet",
        "name": "Santosh Primary School",
        "location": "Bangarpet",
        "campus": "Kolar Road, Bangarpet",
        "level": "Primary Education (Grades 1–4)",
        "template": "school",
        "tagline": "Building strong conceptual foundations in literacy and numeracy",
        "description": "At the primary level, learning transitions from play to structured intellectual inquiry. Students build communicative fluency in English and Kannada, master mathematical foundations, and study environmental sciences through direct observation.",
        "features": [
            {
                "title": "Inquiry-Led Classroom Learning",
                "detail": "Classrooms are airy and naturally lit, designed so teachers facilitate discussion rather than deliver monologue lectures."
            },
            {
                "title": "Concrete Mathematical Thinking",
                "detail": "Arithmetic is taught using physical aids and practical problem-solving to eliminate math anxiety before it begins."
            },
            {
                "title": "Moral Science & Character Formation",
                "detail": "Daily assemblies and value-based lessons emphasize honesty, mutual respect, discipline, and reverence for teachers and parents."
            },
            {
                "title": "Outdoor Play & Physical Coordination",
                "detail": "Dedicated playground sessions every week foster teamwork, sportsmanship, and physical health across student cohorts."
            }
        ],
        "phone": "09448106902",
        "email": "santoshgroupofinstitutions@gmail.com",
        "image": "/images/classroom-students.jpg"
    },
    "santosh-higher-primary-school-bangarpet": {
        "slug": "santosh-higher-primary-school-bangarpet",
        "name": "Santosh Higher Primary School",
        "location": "Bangarpet",
        "campus": "Kolar Road, Bangarpet",
        "level": "Middle School (Grades 5–7)",
        "template": "school",
        "tagline": "Encouraging analytical reasoning and collaborative projects",
        "description": "The middle school years bridge basic literacy with formal scientific inquiry. Students conduct introductory laboratory observations, participate in debates, explore computer applications, and discover historical narratives.",
        "features": [
            {
                "title": "Introductory Science & Computer Labs",
                "detail": "Hands-on access to our multimedia computer laboratory and science apparatus gives theoretical lessons direct physical meaning."
            },
            {
                "title": "Structured Reading in Campus Library",
                "detail": "Scheduled weekly library hours expose students to fiction, science periodicals, and historical literature to build lifelong reading habits."
            },
            {
                "title": "Co-Curricular Competitions & Arts",
                "detail": "Drawing, crafts, music, and elocution contests help young adolescents discover creative strengths beyond exams."
            },
            {
                "title": "Continuous Assessment & Mentorship",
                "detail": "Monthly academic tests identify learning gaps early, supported by focused remedial assistance from subject teachers."
            }
        ],
        "phone": "09448106902",
        "email": "santoshgroupofinstitutions@gmail.com",
        "image": "/images/library-students.jpg"
    },
    "santosh-high-school-bangarpet": {
        "slug": "santosh-high-school-bangarpet",
        "name": "Santosh High School",
        "location": "Bangarpet",
        "campus": "Kolar Road, Bangarpet",
        "level": "Secondary Education (Grades 8–10)",
        "template": "school",
        "tagline": "Excellence in SSLC Board preparation and character formation",
        "description": "Santosh High School has an established record of high pass percentages and district distinctions in the Karnataka SSLC Board examinations. We balance rigorous test preparation with sports leadership and civic awareness.",
        "features": [
            {
                "title": "Karnataka SSLC Board Mastery",
                "detail": "Experienced subject specialists guide students through the state syllabus with structured chapter revisions and preparatory test series."
            },
            {
                "title": "Discipline & High Attendance Standards",
                "detail": "A compulsory 75% attendance policy and formal uniform code instill the personal decorum needed for higher academic life."
            },
            {
                "title": "Taluk & District Athletic Representation",
                "detail": "Students compete regularly in taluk-level volleyball, athletics, and inter-school sports meets on our central grounds."
            },
            {
                "title": "Pre-University Stream Orientation",
                "detail": "Individual counseling in Grade 10 helps students and parents choose the right combination between Science, Commerce, and Arts."
            }
        ],
        "phone": "09448106902",
        "email": "santoshgroupofinstitutions@gmail.com",
        "image": "/images/faculty-group.jpg"
    },
    "santosh-nursery-school-bangalore": {
        "slug": "santosh-nursery-school-bangalore",
        "name": "Santosh Nursery School",
        "location": "Bangalore",
        "campus": "Bangalore Urban Campus",
        "level": "Pre-Primary Education",
        "template": "school",
        "tagline": "Early childhood exploration in the garden city",
        "description": "Serving urban families in Bangalore, our nursery school combines Montessori-inspired play learning with foundational language development, ensuring toddlers build social ease and curiosity in a safe environment.",
        "features": [
            {
                "title": "Child-Safe Urban Facility",
                "detail": "Thoughtfully planned indoor activity spaces equipped with sanitized educational play kits and child-safe furnishings."
            },
            {
                "title": "Bilingual Speech Development",
                "detail": "Gentle daily immersion in communicative English alongside mother-tongue reassurance to build early linguistic fluency."
            },
            {
                "title": "Expressive Arts & Movement",
                "detail": "Rhymes, action songs, finger painting, and clay modeling encourage sensory coordination and creative confidence."
            }
        ],
        "phone": "09886152151",
        "email": "santoshgroupofinstitutions@gmail.com",
        "image": "/images/student-portrait.jpg"
    },
    "santosh-primary-school-bangalore": {
        "slug": "santosh-primary-school-bangalore",
        "name": "Santosh Primary School",
        "location": "Bangalore",
        "campus": "Bangalore Urban Campus",
        "level": "Primary Education (Grades 1–4)",
        "template": "school",
        "tagline": "Holistic foundational learning and creative expression",
        "description": "Santosh Primary School Bangalore pairs academic rigor with personal attention. We focus on developing core computational skills, reading comprehension, and social harmony among young learners.",
        "features": [
            {
                "title": "Balanced Core Curriculum",
                "detail": "Equal emphasis on language fluency, mathematics, environmental studies, and computer basics from early grades."
            },
            {
                "title": "Active Classroom Participation",
                "detail": "Interactive teaching methods ensure students speak, ask questions, and engage rather than passively copying notes."
            },
            {
                "title": "Regular Teacher-Parent Alignment",
                "detail": "Monthly academic and personal reviews ensure each child receives customized encouragement at school and at home."
            }
        ],
        "phone": "09886152151",
        "email": "santoshgroupofinstitutions@gmail.com",
        "image": "/images/classroom-students.jpg"
    },
    "santosh-higher-primary-school-bangalore": {
        "slug": "santosh-higher-primary-school-bangalore",
        "name": "Santosh Higher Primary School",
        "location": "Bangalore",
        "campus": "Bangalore Urban Campus",
        "level": "Middle School (Grades 5–7)",
        "template": "school",
        "tagline": "Empowering independent thinkers and inquiring minds",
        "description": "Preparing students for contemporary challenges through practical science experiments, digital skills, and cooperative learning, grounded in enduring cultural ethics.",
        "features": [
            {
                "title": "Digital Literacy & Lab Sessions",
                "detail": "Practical computer instruction covering operating systems, basic office applications, and structured logic."
            },
            {
                "title": "Science Inquiry & Project Work",
                "detail": "Encouraging students to build models, observe natural phenomena, and present findings clearly before their peers."
            },
            {
                "title": "Sports & Team Leadership",
                "detail": "Organized team athletics, badminton, and outdoor games developing physical endurance and peer collaboration."
            }
        ],
        "phone": "09886152151",
        "email": "santoshgroupofinstitutions@gmail.com",
        "image": "/images/library-students.jpg"
    },
    "santosh-high-school-bangalore": {
        "slug": "santosh-high-school-bangalore",
        "name": "Santosh High School",
        "location": "Bangalore",
        "campus": "Bangalore Urban Campus",
        "level": "Secondary Education (Grades 8–10)",
        "template": "school",
        "tagline": "Academic distinction and future-ready secondary leadership",
        "description": "Our Bangalore High School prepares students for board examination success and higher secondary entrance. Dedicated subject teachers provide systematic test practice, personal mentorship, and career pathway advice.",
        "features": [
            {
                "title": "Systematic State Board Coaching",
                "detail": "Comprehensive coverage of Mathematics, Science, Social Science, and three languages with regular mock test series."
            },
            {
                "title": "Personalized Academic Mentorship",
                "detail": "Teachers identify specific subject difficulties early, providing targeted tutorials to strengthen concept mastery."
            },
            {
                "title": "Values & Career Preparation",
                "detail": "Guidance on competitive exam preparation, ethical civic leadership, and stream selection for Pre-University education."
            }
        ],
        "phone": "09886152151",
        "email": "santoshgroupofinstitutions@gmail.com",
        "image": "/images/faculty-group.jpg"
    }
}

for slug, data in institutions_data.items():
    path = f"{base_dir}/{slug}.json"
    if os.path.exists(path):
        with open(path, "r") as f:
            existing = json.load(f)
        existing.update(data)
        with open(path, "w") as f:
            json.dump(existing, f, indent=2)
        print(f"Updated {path}")

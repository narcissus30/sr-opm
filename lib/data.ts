import { Type } from "@google/genai";

export interface Program {
  id: string;
  name: string;
  specialization: string;
  university: string;
  logo: string;
  field: string;
  duration: string;
  weeklyTime: string;
  tuition: string;
  tuitionValue: number;
  tuitionUSD: number;
  emiStarting: string;
  roiScore: number;
  avgSalaryIncrease: string;
  country: string;
  accreditation: string;
  nextCohort: string;
  description: string;
  eligibility: string[];
  curriculum: {
    semester: {
      title: string;
      topics: string[];
    }[];
  };
  careerRoles: string[];
  popularityBadge?: string;
  highlights: string[];
  insights?: {
    bestFor: string[];
    lessIdealFor: string[];
  };
  socialLinks?: {
    youtube?: string;
    instagram?: string;
    academia?: string;
  };
  careerTransitions?: {
    before: string;
    after: string;
  }[];
  profileMatch?: {
    ageRange: string;
    workExp: string;
    commonRoles: string[];
  };
}

export interface Expert {
  id: string;
  name: string;
  experience: string;
  impact: string;
  image: string;
  specialization: string;
}

export const EXPERTS: Expert[] = [
  {
    id: "e1",
    name: "Ankit Verma",
    experience: "8 years advising online master's students",
    impact: "Helped 1,200+ professionals choose programs",
    image: "https://picsum.photos/seed/ankit_expert/100/100",
    specialization: "MBA & Business Analytics"
  },
  {
    id: "e2",
    name: "Sarah Jenkins",
    experience: "10 years in International Education",
    impact: "Guided 2,500+ students for US & UK universities",
    image: "https://picsum.photos/seed/sarah_expert/100/100",
    specialization: "Data Science & AI"
  },
  {
    id: "e3",
    name: "Dr. Rajesh Kumar",
    experience: "15 years as Academic Counselor",
    impact: "Expert in Indian UGC & NAAC accredited programs",
    image: "https://picsum.photos/seed/rajesh_expert/100/100",
    specialization: "Computer Science & Cybersecurity"
  }
];

export const PROGRAMS: Program[] = [
  {
    id: "1",
    name: "MBA",
    specialization: "Business Analytics",
    university: "Liverpool John Moores University",
    logo: "https://picsum.photos/seed/ljmu/100/100",
    field: "MBA / Business",
    duration: "18 Months",
    weeklyTime: "10-15 hours",
    tuition: "₹4.5L",
    tuitionValue: 450000,
    tuitionUSD: 5400,
    emiStarting: "₹12,500/mo",
    roiScore: 8.5,
    avgSalaryIncrease: "45%",
    country: "UK",
    accreditation: "AACSB, AMBA, UGC Recognized",
    nextCohort: "1st August 2026",
    description: "A comprehensive MBA program designed for future business leaders with a focus on global strategy and innovation.",
    eligibility: [
      "Bachelor's Degree from a recognized university with at least 50% aggregate marks",
      "Minimum 2 years of professional work experience in a relevant field",
      "Proficiency in English (IELTS 6.5 or equivalent, or proof of English-medium education)",
      "Statement of Purpose and two professional references"
    ],
    highlights: ["Global Alumni Status", "WES Recognized", "1-on-1 Mentorship", "Industry Projects"],
    curriculum: {
      semester: [
        { 
          title: "Semester 1", 
          topics: [
            "Fundamentals of Computer", 
            "Fundamental of Mathematics",
            "Discrete Mathematics and Graph Theory",
            "Python Programming",
            "Relational Database Management System",
            "Data Visualization",
            "Relational Database Management - Lab"
          ] 
        },
        { 
          title: "Semester 2", 
          topics: [
            "Computer Networks & Protocols", 
            "Object Oriented Programming using JAVA",
            "Operating System",
            "Data Structure and Algorithms",
            "Computer Architecture",
            "Object Oriented Programming using JAVA - Lab"
          ] 
        },
        { 
          title: "Semester 3: Analytics & Strategy", 
          topics: [
            "Cloud Computing", 
            "Machine Learning Algorithms",
            "Deep Learning Frameworks",
            "Business Intelligence & Reporting",
            "Predictive Analytics",
            "Strategic Management",
            "Capstone Project - I"
          ] 
        },
        { 
          title: "Semester 4: Capstone & Ethics", 
          topics: [
            "Industry Sponsored Project", 
            "Professional Ethics",
            "Research Methodology",
            "Leadership & Change Management",
            "Global Business Environment",
            "Final Dissertation & Viva"
          ] 
        }
      ]
    },
    careerRoles: ["Business Analyst", "Data Strategy Manager", "Operations Manager", "Marketing Analytics Lead", "Management Consultant"],
    popularityBadge: "Top choice for career switch",
    insights: {
      bestFor: ["Mid-career professionals", "Analytics roles", "Strategic planning"],
      lessIdealFor: ["Fresh graduates", "Deep technical research", "Finance-only careers"]
    },
    socialLinks: {
      youtube: "https://youtube.com/watch?v=example1",
      instagram: "https://instagram.com/ljmu",
      academia: "https://academia.edu/ljmu"
    },
    careerTransitions: [
      { before: "Marketing Executive", after: "Business Analyst" },
      { before: "Operations Coordinator", after: "Supply Chain Manager" }
    ],
    profileMatch: {
      ageRange: "26-34",
      workExp: "3-7 yrs",
      commonRoles: ["Marketing Specialist", "Operations Lead", "Consultant"]
    }
  },
  {
    id: "2",
    name: "M.Sc.",
    specialization: "Data Science & AI",
    university: "IU International University",
    logo: "https://picsum.photos/seed/iu/100/100",
    field: "Data Science / AI",
    duration: "12 Months",
    weeklyTime: "15+ hours",
    tuition: "₹3.2L",
    tuitionValue: 320000,
    tuitionUSD: 3800,
    emiStarting: "₹8,000/mo",
    roiScore: 9.2,
    avgSalaryIncrease: "60%",
    country: "Germany",
    accreditation: "FIBAA, EQAR",
    nextCohort: "1st September 2026",
    description: "Master the tools of tomorrow with deep dives into Machine Learning, Big Data, and Neural Networks.",
    eligibility: [
      "Undergraduate degree in STEM (Science, Technology, Engineering, Mathematics) or related field",
      "Basic programming knowledge in Python or R",
      "Minimum GPA of 3.0 on a 4.0 scale (or equivalent)",
      "Proof of English proficiency (B2 level or higher)"
    ],
    highlights: ["German Degree", "AI Specialization", "Flexible Exam Schedule", "Career Coaching"],
    curriculum: {
      semester: [
        { 
          title: "Semester 1", 
          topics: ["Advanced Statistics", "Programming with Python", "Data Science Ethics", "Data Wrangling", "Exploratory Data Analysis", "Mathematical Foundations for AI"] 
        },
        { 
          title: "Semester 2", 
          topics: ["Machine Learning", "Deep Learning", "Big Data Technologies", "Natural Language Processing", "Computer Vision", "Master Thesis & Project"] 
        }
      ]
    },
    careerRoles: ["Data Scientist", "Machine Learning Engineer", "AI Researcher", "Data Architect", "Business Intelligence Developer"],
    popularityBadge: "Popular with Software Engineers",
    insights: {
      bestFor: ["Software Engineers", "Technical career switchers", "AI enthusiasts"],
      lessIdealFor: ["Non-technical backgrounds", "Management-only roles", "Soft-skills focus"]
    },
    socialLinks: {
      youtube: "https://youtube.com/watch?v=example2",
      instagram: "https://instagram.com/iu.university"
    },
    careerTransitions: [
      { before: "Software Engineer", after: "Data Scientist" },
      { before: "QA Engineer", after: "ML Engineer" },
      { before: "Data Analyst", after: "AI Researcher" }
    ],
    profileMatch: {
      ageRange: "24-32",
      workExp: "2-6 yrs",
      commonRoles: ["Software Developer", "Data Analyst", "Systems Engineer"]
    }
  },
  {
    id: "3",
    name: "MCA",
    specialization: "AI and Machine Learning",
    university: "Manipal University Jaipur",
    logo: "https://picsum.photos/seed/muj/100/100",
    field: "Computer Science",
    duration: "24 Months",
    weeklyTime: "10-15 hours",
    tuition: "₹1.5L",
    tuitionValue: 150000,
    tuitionUSD: 1800,
    emiStarting: "₹6,250/mo",
    roiScore: 8.8,
    avgSalaryIncrease: "50%",
    country: "India",
    accreditation: "NAAC A+, UGC",
    nextCohort: "1st July 2026",
    description: "Gain expertise in AI and ML with a curriculum designed by industry experts and academic veterans.",
    eligibility: [
      "Bachelor's degree in any stream with Mathematics at 10+2 or Graduation level",
      "Minimum 50% aggregate marks in graduation",
      "Basic understanding of computer systems and logic",
      "Entrance interview may be required for non-CS backgrounds"
    ],
    highlights: ["UGC Entitled", "Placement Support", "Free Access to Coursera", "Alumni Status"],
    curriculum: {
      semester: [
        { 
          title: "Semester 1", 
          topics: [
            "Fundamentals of Computer", 
            "Fundamental of Mathematics",
            "Discrete Mathematics and Graph Theory",
            "Python Programming",
            "Programming & Problem-Solving using C",
            "Relational Database Management System",
            "Data Visualization",
            "Relational Database Management - Lab",
            "Programming & Problem-Solving using C - Lab",
            "Python Programming - Lab"
          ] 
        },
        { 
          title: "Semester 2: Core Subjects", 
          topics: [
            "Computer Networks & Protocols", 
            "Object Oriented Programming using JAVA",
            "Operating System",
            "Data Structure and Algorithms",
            "Computer Architecture",
            "Object Oriented Programming using JAVA - Lab",
            "Data Structure and Algorithms - Lab",
            "Fundamentals of Artificial Intelligence"
          ] 
        },
        { 
          title: "Semester 3: Specializations", 
          topics: [
            "Cloud Computing", 
            "Machine Learning Algorithms",
            "Deep Learning Frameworks",
            "Cybersecurity Fundamentals",
            "Advanced Database Systems - Lab"
          ] 
        },
        { 
          title: "Semester 4: Capstone", 
          topics: [
            "Industry Sponsored Project", 
            "Professional Ethics",
            "Research Methodology",
            "Technical Report Writing",
            "Final Project Defense"
          ] 
        }
      ]
    },
    careerRoles: ["Software Developer", "Full Stack Engineer", "ML Developer", "System Analyst", "Database Administrator"],
    popularityBadge: "UGC Entitled Degree",
    insights: {
      bestFor: ["Indian professionals", "Affordable degree seekers", "Career starters"],
      lessIdealFor: ["International job seekers", "Executive roles", "Research-heavy focus"]
    },
    careerTransitions: [
      { before: "Junior Developer", after: "Full Stack Engineer" },
      { before: "Technical Support", after: "Software Developer" }
    ],
    profileMatch: {
      ageRange: "21-28",
      workExp: "0-4 yrs",
      commonRoles: ["Junior Dev", "Student", "Tech Support"]
    }
  },
  {
    id: "4",
    name: "M.Sc.",
    specialization: "Cybersecurity",
    university: "University of Arizona",
    logo: "https://picsum.photos/seed/arizona/100/100",
    field: "Cybersecurity",
    duration: "24 Months",
    weeklyTime: "15+ hours",
    tuition: "₹12L",
    tuitionValue: 1200000,
    tuitionUSD: 14500,
    emiStarting: "₹35,000/mo",
    roiScore: 8.9,
    avgSalaryIncrease: "55%",
    country: "USA",
    accreditation: "HLC, NSA Center of Excellence",
    nextCohort: "1st August 2026",
    description: "Protect global infrastructures with advanced training in network security, digital forensics, and risk management.",
    eligibility: [
      "Bachelor's degree in IT, Computer Science, or related field",
      "Understanding of networking and security fundamentals",
      "Minimum 3.0 GPA or equivalent",
      "Professional certifications like CompTIA Security+ are a plus"
    ],
    highlights: ["US Top 10 Program", "Cyber Range Access", "Professional Certifications", "Global Network"],
    curriculum: {
      semester: [
        { 
          title: "Semester 1", 
          topics: ["Network Security", "Cryptography", "Information Assurance", "Operating System Security", "Security Scripting", "Cyber Threat Intelligence"] 
        },
        { 
          title: "Semester 2", 
          topics: ["Digital Forensics", "Cyber Law", "Ethical Hacking", "Incident Response", "Penetration Testing", "Malware Analysis"] 
        },
        { 
          title: "Semester 3", 
          topics: ["Security Architecture", "Risk Assessment", "Cloud Security", "IoT Security", "Compliance and Auditing", "Security Leadership"] 
        },
        { 
          title: "Semester 4", 
          topics: ["Advanced Forensics", "Blockchain Security", "AI in Cybersecurity", "Strategic Defense", "Capstone Project", "Final Thesis"] 
        }
      ]
    },
    careerRoles: ["Cybersecurity Analyst", "Information Security Manager", "Ethical Hacker", "Security Architect", "Digital Forensics Expert"],
    insights: {
      bestFor: ["IT security professionals", "US career aspirants", "Forensics enthusiasts"],
      lessIdealFor: ["General management", "Frontend developers", "Low-budget seekers"]
    },
    profileMatch: {
      ageRange: "25-35",
      workExp: "3-8 yrs",
      commonRoles: ["Network Admin", "System Analyst", "IT Officer"]
    }
  },
  {
    id: "5",
    name: "Master of Finance",
    specialization: "Investment Banking",
    university: "Amity University Online",
    logo: "https://picsum.photos/seed/amity/100/100",
    field: "Finance / Accounting",
    duration: "24 Months",
    weeklyTime: "5-10 hours",
    tuition: "₹1.8L",
    tuitionValue: 180000,
    tuitionUSD: 2200,
    emiStarting: "₹7,500/mo",
    roiScore: 7.5,
    avgSalaryIncrease: "25%",
    country: "India",
    accreditation: "UGC, WASC, DEB",
    nextCohort: "1st June 2026",
    description: "Affordable and flexible finance degree for professionals in accounting and corporate finance.",
    eligibility: [
      "Bachelor's degree in Commerce, Economics, or related field",
      "Basic proficiency in Mathematics and Statistics",
      "Minimum 45% aggregate marks in graduation",
      "Working professionals preferred"
    ],
    highlights: ["UGC Recognized", "Flexible Exams", "Placement Assistance", "Industry Mentorship"],
    curriculum: {
      semester: [
        { 
          title: "Semester 1", 
          topics: ["Financial Management", "Managerial Economics", "Accounting for Managers", "Business Law", "Quantitative Techniques", "Corporate Communication"] 
        },
        { 
          title: "Semester 2", 
          topics: ["Investment Analysis", "Portfolio Management", "Financial Modeling", "Banking Operations", "Taxation Laws", "Financial Reporting"] 
        },
        { 
          title: "Semester 3", 
          topics: ["Derivatives", "International Finance", "Corporate Restructuring", "Risk Management", "Wealth Management", "Financial Markets"] 
        },
        { 
          title: "Semester 4", 
          topics: ["Mergers & Acquisitions", "Venture Capital", "Fintech Innovations", "Strategic Finance", "Ethics in Finance", "Research Project"] 
        }
      ]
    },
    careerRoles: ["Investment Banker", "Financial Analyst", "Portfolio Manager", "Risk Manager", "Corporate Finance Lead"],
    insights: {
      bestFor: ["Accounting professionals", "Banking aspirants", "Corporate finance roles"],
      lessIdealFor: ["Quantitative trading", "Fintech engineering", "International finance hubs"]
    },
    careerTransitions: [
      { before: "Accountant", after: "Financial Analyst" },
      { before: "Bank Clerk", after: "Investment Banker" }
    ],
    profileMatch: {
      ageRange: "23-30",
      workExp: "1-5 yrs",
      commonRoles: ["Accountant", "Banker", "Finance Exec"]
    }
  },
  {
    id: "6",
    name: "M.Sc.",
    specialization: "Healthcare Management",
    university: "Swiss School of Business and Management",
    logo: "https://picsum.photos/seed/ssbm/100/100",
    field: "Healthcare",
    duration: "12 Months",
    weeklyTime: "10-12 hours",
    tuition: "₹3.5L",
    tuitionValue: 350000,
    tuitionUSD: 4200,
    emiStarting: "₹9,500/mo",
    roiScore: 8.2,
    avgSalaryIncrease: "35%",
    country: "Switzerland",
    accreditation: "ACBSP, EduQua",
    nextCohort: "1st October 2026",
    description: "Prepare for leadership roles in the global healthcare industry with a focus on quality, safety, and efficiency.",
    eligibility: [
      "Bachelor's degree in Healthcare, Life Sciences, or Business",
      "Minimum 1 year of experience in healthcare sector",
      "English proficiency (TOEFL/IELTS or equivalent)",
      "Motivation letter and CV"
    ],
    highlights: ["Swiss Quality Education", "Global Networking", "Industry-led Faculty", "Flexible Learning"],
    curriculum: {
      semester: [
        { 
          title: "Semester 1", 
          topics: ["Healthcare Systems", "Health Economics", "Quality Management", "Healthcare Marketing", "Strategic Leadership", "Medical Law & Ethics"] 
        },
        { 
          title: "Semester 2", 
          topics: ["Health Informatics", "Patient Safety", "Financial Management in Health", "Epidemiology", "Human Resources in Health", "Final Research Project"] 
        }
      ]
    },
    careerRoles: ["Hospital Administrator", "Health Policy Analyst", "Pharmaceutical Manager", "Clinical Director", "Health Consultant"],
    insights: {
      bestFor: ["Doctors transitioning to admin", "Healthcare professionals", "Public health experts"],
      lessIdealFor: ["Pure clinical research", "Non-healthcare business", "Tech-only roles"]
    },
    profileMatch: {
      ageRange: "28-40",
      workExp: "4-10 yrs",
      commonRoles: ["Doctor", "Nurse", "Health Admin"]
    }
  },
  {
    id: "7",
    name: "Master's",
    specialization: "Digital Marketing & E-commerce",
    university: "EDHEC Business School",
    logo: "https://picsum.photos/seed/edhec/100/100",
    field: "Marketing",
    duration: "18 Months",
    weeklyTime: "12-15 hours",
    tuition: "₹8.5L",
    tuitionValue: 850000,
    tuitionUSD: 10200,
    emiStarting: "₹22,000/mo",
    roiScore: 8.7,
    avgSalaryIncrease: "50%",
    country: "France",
    accreditation: "EQUIS, AACSB, AMBA",
    nextCohort: "1st September 2026",
    description: "A high-impact program designed to master the digital landscape, from social media strategy to advanced e-commerce analytics.",
    eligibility: [
      "Bachelor's degree in any discipline",
      "Strong interest in digital trends and technology",
      "GMAT/GRE score (optional but recommended)",
      "English proficiency (C1 level)"
    ],
    highlights: ["Triple Crown Accredited", "Silicon Valley Study Trip", "Google/Meta Certifications", "Career Center Access"],
    curriculum: {
      semester: [
        { 
          title: "Semester 1", 
          topics: ["Digital Strategy", "Consumer Behavior", "Content Marketing", "SEO & SEM", "Social Media Analytics", "Brand Management"] 
        },
        { 
          title: "Semester 2", 
          topics: ["E-commerce Platforms", "Mobile Marketing", "Data-Driven Marketing", "UX/UI Design Basics", "CRM & Automation", "Marketing Law"] 
        },
        { 
          title: "Semester 3", 
          topics: ["Omnichannel Strategy", "Growth Hacking", "Influencer Marketing", "Digital Innovation", "Ethics in Data", "Master Thesis"] 
        }
      ]
    },
    careerRoles: ["Digital Marketing Director", "E-commerce Manager", "Growth Lead", "Social Media Strategist", "SEO Specialist"],
    insights: {
      bestFor: ["Marketing professionals", "Entrepreneurs", "Creative leads"],
      lessIdealFor: ["Data scientists", "Backend engineers", "Traditional finance"]
    },
    careerTransitions: [
      { before: "Sales Executive", after: "Growth Lead" },
      { before: "Content Writer", after: "Digital Marketing Manager" }
    ],
    profileMatch: {
      ageRange: "24-32",
      workExp: "2-6 yrs",
      commonRoles: ["Marketing Assistant", "Sales Rep", "Content Lead"]
    }
  },
  {
    id: "8",
    name: "M.Sc.",
    specialization: "Supply Chain & Logistics",
    university: "Michigan State University",
    logo: "https://picsum.photos/seed/msu/100/100",
    field: "Supply Chain",
    duration: "24 Months",
    weeklyTime: "15+ hours",
    tuition: "₹15L",
    tuitionValue: 1500000,
    tuitionUSD: 18000,
    emiStarting: "₹42,000/mo",
    roiScore: 9.0,
    avgSalaryIncrease: "65%",
    country: "USA",
    accreditation: "AACSB, Ranked #1 in US for SCM",
    nextCohort: "1st January 2027",
    description: "Join the world's leading supply chain program and learn to manage complex global networks using data and technology.",
    eligibility: [
      "Bachelor's degree with strong quantitative background",
      "Minimum 3 years of professional experience in supply chain/logistics",
      "TOEFL/IELTS for international students",
      "Letters of recommendation and interview"
    ],
    highlights: ["#1 Ranked Program", "Global Supply Chain Lab", "Executive Mentorship", "Vast Alumni Network"],
    curriculum: {
      semester: [
        { 
          title: "Semester 1", 
          topics: ["Supply Chain Strategy", "Logistics Management", "Procurement & Sourcing", "Operations Analysis", "Probability & Statistics", "Supply Chain Finance"] 
        },
        { 
          title: "Semester 2", 
          topics: ["Inventory Management", "Transportation Systems", "Supply Chain Modeling", "Global Sourcing", "Sustainability in SCM", "Warehouse Operations"] 
        },
        { 
          title: "Semester 3", 
          topics: ["Supply Chain Analytics", "Risk Management", "Lean Six Sigma", "Digital Supply Chain", "Negotiation Skills", "Project Management"] 
        },
        { 
          title: "Semester 4", 
          topics: ["Strategic Sourcing", "SCM Technology", "Integrated Planning", "Leadership in SCM", "Industry Capstone", "Final Thesis"] 
        }
      ]
    },
    careerRoles: ["Supply Chain Director", "Logistics Manager", "Procurement Head", "Operations Analyst", "Sourcing Manager"],
    insights: {
      bestFor: ["Logistics professionals", "Operations leads", "Manufacturing managers"],
      lessIdealFor: ["Pure marketing", "Software development", "Creative arts"]
    },
    profileMatch: {
      ageRange: "27-38",
      workExp: "5-12 yrs",
      commonRoles: ["Logistics Coordinator", "Operations Manager", "Sourcing Lead"]
    }
  },
  {
    id: "9",
    name: "Master's",
    specialization: "Product Management",
    university: "Duke University",
    logo: "https://picsum.photos/seed/duke/100/100",
    field: "Product Management",
    duration: "12 Months",
    weeklyTime: "12-15 hours",
    tuition: "₹11L",
    tuitionValue: 1100000,
    tuitionUSD: 13200,
    emiStarting: "₹32,000/mo",
    roiScore: 9.4,
    avgSalaryIncrease: "75%",
    country: "USA",
    accreditation: "SACSCOC, AACSB",
    nextCohort: "1st August 2026",
    description: "Bridge the gap between business, technology, and design to build products that users love and businesses need.",
    eligibility: [
      "Bachelor's degree in Engineering, Design, or Business",
      "Minimum 2 years of experience in tech or related field",
      "Strong analytical and communication skills",
      "Portfolio or case study submission"
    ],
    highlights: ["Ivy League Quality", "Product Design Lab", "Tech Industry Mentors", "Global Career Support"],
    curriculum: {
      semester: [
        { 
          title: "Semester 1", 
          topics: [
            "Fundamentals of Computer", 
            "Fundamental of Mathematics",
            "Discrete Mathematics and Graph Theory",
            "Python Programming",
            "Relational Database Management System",
            "Data Visualization",
            "Relational Database Management - Lab"
          ] 
        },
        { 
          title: "Semester 2", 
          topics: [
            "Computer Networks & Protocols", 
            "Object Oriented Programming using JAVA",
            "Operating System",
            "Data Structure and Algorithms",
            "Computer Architecture",
            "Object Oriented Programming using JAVA - Lab"
          ] 
        },
        { 
          title: "Semester 3", 
          topics: [
            "Cloud Computing", 
            "Machine Learning Algorithms",
            "Deep Learning Frameworks"
          ] 
        },
        { 
          title: "Semester 4", 
          topics: [
            "Industry Sponsored Project", 
            "Professional Ethics",
            "Research Methodology"
          ] 
        }
      ]
    },
    careerRoles: ["Product Manager", "Technical PM", "Product Owner", "Product Strategist", "Head of Product"],
    insights: {
      bestFor: ["Engineers moving to business", "Designers", "Business analysts"],
      lessIdealFor: ["Deep backend engineering", "Academic research", "Traditional manufacturing"]
    },
    careerTransitions: [
      { before: "Software Engineer", after: "Product Manager" },
      { before: "Business Analyst", after: "Product Manager" }
    ],
    profileMatch: {
      ageRange: "25-33",
      workExp: "3-8 yrs",
      commonRoles: ["Software Engineer", "Business Analyst", "Project Manager"]
    }
  },
  {
    id: "10",
    name: "M.A.",
    specialization: "Counseling Psychology",
    university: "IGNOU / TISS Partnered",
    logo: "https://picsum.photos/seed/tiss/100/100",
    field: "Psychology",
    duration: "24 Months",
    weeklyTime: "8-10 hours",
    tuition: "₹0.8L",
    tuitionValue: 80000,
    tuitionUSD: 950,
    emiStarting: "₹3,500/mo",
    roiScore: 7.2,
    avgSalaryIncrease: "20%",
    country: "India",
    accreditation: "UGC, NAAC A++",
    nextCohort: "1st July 2026",
    description: "A deeply impactful program for those looking to build a career in mental health and counseling.",
    eligibility: [
      "Bachelor's degree in any stream (Psychology preferred)",
      "Empathy and strong interpersonal skills",
      "Willingness to undergo supervised internship",
      "Basic understanding of human behavior"
    ],
    highlights: ["Affordable Education", "Clinical Exposure", "Expert Faculty", "UGC Recognized"],
    curriculum: {
      semester: [
        { 
          title: "Semester 1", 
          topics: ["Cognitive Psychology", "Developmental Psychology", "Social Psychology", "Research Methods", "Statistics in Psychology", "History of Psychology"] 
        },
        { 
          title: "Semester 2", 
          topics: ["Psychopathology", "Personality Theories", "Counseling Skills", "Psychological Testing", "Biopsychology", "Ethics in Counseling"] 
        },
        { 
          title: "Semester 3", 
          topics: ["Clinical Counseling", "Family Therapy", "Child Psychology", "Group Therapy", "Organizational Psychology", "Internship - I"] 
        },
        { 
          title: "Semester 4", 
          topics: ["Health Psychology", "Positive Psychology", "Crisis Intervention", "Rehabilitation", "Internship - II", "Final Dissertation"] 
        }
      ]
    },
    careerRoles: ["Counseling Psychologist", "School Counselor", "HR Specialist", "Mental Health Advocate", "Rehabilitation Consultant"],
    insights: {
      bestFor: ["Mental health aspirants", "HR professionals", "Social workers"],
      lessIdealFor: ["Clinical psychiatry", "Neuroscience research", "Corporate finance"]
    },
    profileMatch: {
      ageRange: "22-35",
      workExp: "0-10 yrs",
      commonRoles: ["Teacher", "HR Assistant", "Social Worker"]
    }
  }
];

export const TESTIMONIALS = [
  {
    name: "Rahul Sharma",
    role: "Software Engineer",
    company: "TCS",
    text: "The AI advisor helped me find a program that fit my 15-hour weekly limit perfectly. Now I'm transitioning to Data Science!",
    image: "https://picsum.photos/seed/rahul/100/100"
  },
  {
    name: "Priya Iyer",
    role: "Product Manager",
    company: "Zomato",
    text: "I wanted a global MBA without leaving my job. SR-OPM matched me with LJMU, and the ROI has been incredible.",
    image: "https://picsum.photos/seed/priya/100/100"
  },
  {
    name: "Ankit Verma",
    role: "Consultant",
    company: "Deloitte",
    text: "The comparison tool is a lifesaver. Being able to see tuition vs ROI side-by-side made my decision so much easier.",
    image: "https://picsum.photos/seed/ankit/100/100"
  }
];

export const FAQS = [
  {
    question: "Are online master's degrees recognized by employers?",
    answer: "Yes, most modern employers value online degrees from accredited universities, especially for working professionals who demonstrate time management skills."
  },
  {
    question: "Can I get a loan for an online master's?",
    answer: "Absolutely. We partner with over 20 lenders who provide specialized financing for online education."
  },
  {
    question: "How does the AI recommendation work?",
    answer: "Our algorithm weights your field of interest, budget, experience, and time availability to find programs with the highest 'Fit Score' for you."
  }
];

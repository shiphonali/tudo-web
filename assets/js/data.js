/* ============================================================
   TUDO — demo data + i18n (module)
   All profiles are FICTIONAL. Statistics are DEMO figures.
   ============================================================ */

/* Portrait images use Unsplash source (photorealistic, adult).
   Swapped for Supabase Storage URLs in production. */
const IMG = (id, w = 800) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=70`;

const HERO_SLIDES = [
  {
    img: 'assets/images/hero/slide1.jpg',
    eyebrow: 'Bangladeshi Hearts. Real Connections.',
    title: ['Find Someone Who', 'Feels Like <em>Home</em>.'],
    sub: 'Meet genuine Bangladeshi singles looking for meaningful relationships — verified, private, and built on trust.',
    ctas: [{ label: 'Start Your Story', href: 'register.html', kind: 'primary' }, { label: 'Explore TUDO', href: '#how', kind: 'ghost' }],
  },
  {
    img: 'assets/images/hero/slide2.jpg',
    eyebrow: 'From Dhaka to London',
    title: ['Bangladeshi Hearts.', 'Worldwide <em>Connections</em>.'],
    sub: 'From Dhaka to London, Sylhet to Toronto — meaningful connections have no borders.',
    ctas: [{ label: 'Find Your Match', href: 'discover.html', kind: 'primary' }, { label: 'Our Community', href: '#community', kind: 'ghost' }],
  },
  {
    img: 'assets/images/hero/slide3.jpg',
    eyebrow: 'Verified. Private. Smarter.',
    title: ['Real People. Real Chemistry.', 'Real <em>Possibilities</em>.'],
    sub: 'Verified profiles, private conversations and smarter compatibility — the way modern connection should feel.',
    ctas: [{ label: 'Join TUDO Free', href: 'register.html', kind: 'gold' }, { label: 'How It Works', href: '#how', kind: 'ghost' }],
  },
  {
    img: 'assets/images/hero/slide4.jpg',
    eyebrow: 'Every story starts with hello',
    title: ['Your Love Story', 'Starts <em>Here</em>.'],
    sub: 'Thoughtful matches, real conversations and a community that feels like home — begin yours today.',
    ctas: [{ label: 'Create Free Profile', href: 'register.html', kind: 'primary' }, { label: 'Success Stories', href: 'success-stories.html', kind: 'ghost' }],
  },
];

const ROTATOR_WORDS = ['Love', 'Friendship', 'Connection', 'Your Person', 'Trust'];

/* ---- Pricing currencies (monthly). Free is always 0. ---- */
const CURRENCY_ORDER = ['BDT', 'USD', 'GBP', 'EUR'];
const CURRENCIES = {
  BDT: { code: 'BDT', symbol: '৳', flag: '🇧🇩', who: 'Bangladesh',    premium: 990,  elite: 2490, decimals: 0 },
  USD: { code: 'USD', symbol: '$', flag: '🇺🇸', who: 'USA',           premium: 8.99, elite: 22.99, decimals: 2 },
  GBP: { code: 'GBP', symbol: '£', flag: '🇬🇧', who: 'UK',            premium: 6.99, elite: 17.99, decimals: 2 },
  EUR: { code: 'EUR', symbol: '€', flag: '🇪🇺', who: 'Europe',        premium: 7.99, elite: 20.99, decimals: 2 },
};

/* ---- Fictional demo profiles ---- */
const PROFILES = [
  { id: 'p29', name: 'Afsana', age: 27, verified: 3, city: 'Dhaka', country: 'Bangladesh', origin: 'Dhaka', job: 'Content Strategist', edu: 'Graduate', goal: 'Serious Relationship', match: 91, online: true, active: 'now', langs: ['বাংলা','English'], interests: ['Coffee','Writing','Photography','Travel','Films'], img: 'assets/images/women/afsana.jpg', bio: 'Happiest with a latte and a good conversation. I write for brands and daydream about slow travel.' },
  { id: 'p30', name: 'Nusrat', age: 26, verified: 2, city: 'Sylhet', country: 'Bangladesh', origin: 'Sylhet', job: 'College Lecturer', edu: 'Postgraduate', goal: 'Marriage', match: 90, online: true, active: 'now', langs: ['বাংলা','English','Sylheti'], interests: ['Nature','Poetry','Gardening','Music','Travel'], img: 'assets/images/women/nusrat.jpg', bio: 'A flower behind my ear and a book in my bag. I love the Sylhet tea hills and gentle, honest people.' },
  { id: 'p69', name: 'Arif', age: 26, verified: 3, city: 'Dhaka', country: 'Bangladesh', origin: 'Dhaka', job: 'Software Engineer', edu: 'Graduate', goal: 'Serious Relationship', match: 90, online: true, active: 'now', langs: ['বাংলা','English'], interests: ['Coding','Football','Music','Travel','Coffee'], img: 'assets/images/men/arif.jpg', bio: 'Engineer by day, footballer by weekend. Easygoing, loyal, and looking for a genuine connection.' },
  { id: 'p31', name: 'Samira', age: 28, verified: 3, city: 'Dhaka', country: 'Bangladesh', origin: 'Dhaka', job: 'University Lecturer', edu: 'Postgraduate', goal: 'Marriage', match: 92, online: false, active: '1h ago', langs: ['বাংলা','English'], interests: ['Books','Teaching','Volunteering','Travel','Faith'], img: 'assets/images/women/samira.jpg', bio: 'Faith, family and lifelong learning matter most to me. Looking for a kind, grounded partner to grow with.' },
  { id: 'p32', name: 'Tania', age: 25, verified: 2, city: 'Chattogram', country: 'Bangladesh', origin: 'Chattogram', job: 'Fashion Designer', edu: 'Undergraduate', goal: 'Open to Exploring', match: 87, online: true, active: 'now', langs: ['বাংলা','English','Chittagonian'], interests: ['Fashion','Art','Music','Food','Travel'], img: 'assets/images/women/tania.jpg', bio: 'I design what I love to wear — colour, craft and a little sparkle. Say hi if you appreciate the details.' },
  { id: 'p70', name: 'Sakib', age: 27, verified: 3, city: 'Dhaka', country: 'Bangladesh', origin: 'Rajshahi', job: 'Data Scientist', edu: 'Postgraduate', goal: 'Serious Relationship', match: 89, online: false, active: '2h ago', langs: ['বাংলা','English'], interests: ['Data','Books','Coffee','Chess','Films'], img: 'assets/images/men/sakib.jpg', bio: 'I find patterns for a living and calm in a good book. Looking for someone curious and kind.' },
  { id: 'p33', name: 'Jarin', age: 24, verified: 2, city: 'Dhaka', country: 'Bangladesh', origin: 'Rajshahi', job: 'UX Researcher', edu: 'Undergraduate', goal: 'Dating', match: 85, online: true, active: 'now', langs: ['বাংলা','English'], interests: ['Technology','Books','Coffee','Design','Gaming'], img: 'assets/images/women/jarin.jpg', bio: 'Curious by nature, coffee-powered by choice. I love good ideas, cosy cafés and thoughtful people.' },
  { id: 'p34', name: 'Maliha', age: 27, verified: 3, city: 'Dhaka', country: 'Bangladesh', origin: 'Khulna', job: 'Doctor', edu: 'Doctorate', goal: 'Marriage', match: 93, online: false, active: '2h ago', langs: ['বাংলা','English'], interests: ['Medicine','Music','Cooking','Travel','Family'], img: 'assets/images/women/maliha.jpg', bio: 'A doctor with a soft spot for old songs and homemade food. Family-oriented and ready for something real.' },
  { id: 'p71', name: 'Tamim', age: 25, verified: 2, city: 'Chattogram', country: 'Bangladesh', origin: 'Chattogram', job: 'Photographer', edu: 'Undergraduate', goal: 'Open to Exploring', match: 86, online: true, active: 'now', langs: ['বাংলা','English','Chittagonian'], interests: ['Photography','Travel','Music','Art','Food'], img: 'assets/images/men/tamim.jpg', bio: 'Always behind a lens, chasing light and good stories. Say hi if you love spontaneous adventures.' },
  { id: 'p35', name: 'Ruba', age: 26, verified: 2, city: 'Dhaka', country: 'Bangladesh', origin: 'Dhaka', job: 'Architect', edu: 'Graduate', goal: 'Serious Relationship', match: 89, online: true, active: 'now', langs: ['বাংলা','English'], interests: ['Architecture','Design','Coffee','Books','Photography'], img: 'assets/images/women/ruba.jpg', bio: 'I design calm spaces and love quiet café afternoons. Looking for warmth, wit and a shared sense of home.' },
  { id: 'p36', name: 'Farzana', age: 29, verified: 3, city: 'New York', country: 'United States', origin: 'Dhaka', job: 'Financial Analyst', edu: 'Graduate', goal: 'Marriage', match: 88, online: false, active: '5h ago', langs: ['বাংলা','English'], interests: ['Travel','Photography','Music','Food','Fitness'], img: 'assets/images/women/farzana.jpg', bio: 'Dhaka heart, New York pace. I love riverside walks, city skylines and someone to share the view with.' },
  { id: 'p72', name: 'Nafi', age: 24, verified: 2, city: 'Dhaka', country: 'Bangladesh', origin: 'Dhaka', job: 'Business Student', edu: 'Undergraduate', goal: 'Dating', match: 84, online: true, active: 'now', langs: ['বাংলা','English'], interests: ['Business','Cricket','Travel','Gaming','Food'], img: 'assets/images/men/nafi.jpg', bio: 'Ambitious student with big plans and an easy laugh. Here to meet someone lovely and see what clicks.' },
  { id: 'p37', name: 'Sadia', age: 28, verified: 3, city: 'London', country: 'United Kingdom', origin: 'Sylhet', job: 'Pharmacist', edu: 'Graduate', goal: 'Serious Relationship', match: 90, online: true, active: 'now', langs: ['বাংলা','English','Sylheti'], interests: ['Health','Baking','Travel','Films','Coffee'], img: 'assets/images/women/sadia.jpg', bio: 'Sunny outlook, sweet tooth. I love café brunches, weekend baking and genuine, easy company.' },
  { id: 'p38', name: 'Humaira', age: 25, verified: 2, city: 'Sylhet', country: 'Bangladesh', origin: 'Sylhet', job: 'Primary Teacher', edu: 'Graduate', goal: 'Marriage', match: 86, online: false, active: '1h ago', langs: ['বাংলা','English','Sylheti'], interests: ['Teaching','Gardening','Poetry','Art','Nature'], img: 'assets/images/women/humaira.jpg', bio: 'A teacher who finds joy in small things — flowers, poems and kind hearts. Hoping to find my person.' },
  { id: 'p73', name: 'Rayan', age: 26, verified: 3, city: 'Sylhet', country: 'Bangladesh', origin: 'Sylhet', job: 'Architect', edu: 'Graduate', goal: 'Serious Relationship', match: 88, online: false, active: '3h ago', langs: ['বাংলা','English','Sylheti'], interests: ['Architecture','Design','Nature','Travel','Coffee'], img: 'assets/images/men/rayan.jpg', bio: 'I design buildings and love the Sylhet hills. Looking for a warm, thoughtful partner to build a life with.' },
  { id: 'p39', name: 'Debolina', age: 24, verified: 2, city: 'Dhaka', country: 'Bangladesh', origin: 'Dhaka', job: 'Literature Student', edu: 'Undergraduate', goal: 'Open to Exploring', match: 88, online: true, active: 'now', langs: ['বাংলা','English'], interests: ['Books','Poetry','Coffee','Travel','Music'], img: 'assets/images/women/debolina.jpg', bio: 'Final-year lit student who lives in libraries and campus gardens. Looking for someone thoughtful and warm.' },
  { id: 'p40', name: 'Nandini', age: 25, verified: 3, city: 'Dhaka', country: 'Bangladesh', origin: 'Rajshahi', job: 'Research Assistant', edu: 'Postgraduate', goal: 'Serious Relationship', match: 90, online: true, active: 'now', langs: ['বাংলা','English'], interests: ['Research','Books','Coffee','Technology','Films'], img: 'assets/images/women/nandini.jpg', bio: 'Curious, bookish and quietly ambitious. My happy place is a quiet library and a strong cup of coffee.' },
  { id: 'p74', name: 'Fahim', age: 25, verified: 2, city: 'Sylhet', country: 'Bangladesh', origin: 'Sylhet', job: 'Lecturer', edu: 'Postgraduate', goal: 'Marriage', match: 85, online: true, active: 'now', langs: ['বাংলা','English','Sylheti'], interests: ['Teaching','Books','Football','Nature','Tea'], img: 'assets/images/men/fahim.jpg', bio: 'A lecturer who loves quiet mornings and good conversation. Simple life, sincere heart.' },
  { id: 'p41', name: 'Puja', age: 26, verified: 2, city: 'Sylhet', country: 'Bangladesh', origin: 'Sylhet', job: 'Classical Dancer', edu: 'Graduate', goal: 'Serious Relationship', match: 87, online: false, active: '2h ago', langs: ['বাংলা','English'], interests: ['Dance','Art','Nature','Music','Travel'], img: 'assets/images/women/puja.jpg', bio: 'I dance, I dream, I collect flowers for my hair. Looking for someone who loves art and long walks.' },
  { id: 'p42', name: 'Trisha', age: 27, verified: 3, city: 'Chattogram', country: 'Bangladesh', origin: 'Chattogram', job: 'Copywriter', edu: 'Graduate', goal: 'Dating', match: 86, online: true, active: 'now', langs: ['বাংলা','English','Chittagonian'], interests: ['Writing','Coffee','Films','Travel','Books'], img: 'assets/images/women/trisha.jpg', bio: 'I write for a living and overthink for fun. Café dates, good playlists and honest conversation, please.' },
  { id: 'p75', name: 'Nayeem', age: 29, verified: 3, city: 'Dhaka', country: 'Bangladesh', origin: 'Dhaka', job: 'Investment Banker', edu: 'Postgraduate', goal: 'Marriage', match: 89, online: false, active: '1h ago', langs: ['বাংলা','English'], interests: ['Finance','Fitness','Travel','Reading','Food'], img: 'assets/images/men/nayeem.jpg', bio: 'Driven at work, warm at home. Family-oriented and ready to build something meaningful with the right person.' },
  { id: 'p43', name: 'Mitali', age: 25, verified: 2, city: 'Dhaka', country: 'Bangladesh', origin: 'Khulna', job: 'Economics Student', edu: 'Undergraduate', goal: 'Open to Exploring', match: 85, online: true, active: 'now', langs: ['বাংলা','English'], interests: ['Books','Business','Travel','Music','Food'], img: 'assets/images/women/mitali.jpg', bio: 'Ambitious econ student with a soft romantic side. I love campus mornings and a good cup of cha.' },
  { id: 'p44', name: 'Ananya', age: 26, verified: 3, city: 'Dhaka', country: 'Bangladesh', origin: 'Dhaka', job: 'Architecture Student', edu: 'Undergraduate', goal: 'Serious Relationship', match: 89, online: false, active: '3h ago', langs: ['বাংলা','English'], interests: ['Architecture','Art','Photography','Travel','Coffee'], img: 'assets/images/women/ananya.jpg', bio: 'I sketch buildings and daydream about cities. Looking for a kind, curious partner to explore them with.' },
  { id: 'p76', name: 'Tasin', age: 24, verified: 2, city: 'Dhaka', country: 'Bangladesh', origin: 'Dhaka', job: 'Engineering Student', edu: 'Undergraduate', goal: 'Open to Exploring', match: 83, online: true, active: 'now', langs: ['বাংলা','English'], interests: ['Technology','Gaming','Music','Coffee','Books'], img: 'assets/images/men/tasin.jpg', bio: 'Curious, a little nerdy, and always learning. Looking for good conversation and genuine people.' },
  { id: 'p45', name: 'Ishita', age: 28, verified: 3, city: 'Toronto', country: 'Canada', origin: 'Dhaka', job: 'Photographer', edu: 'Graduate', goal: 'Serious Relationship', match: 91, online: true, active: 'now', langs: ['বাংলা','English'], interests: ['Photography','Travel','Nature','Coffee','Films'], img: 'assets/images/women/ishita.jpg', bio: 'I chase golden hour by the water and collect little moments. Hoping to find someone to share the frame.' },
  { id: 'p46', name: 'Riya', age: 25, verified: 2, city: 'Dhaka', country: 'Bangladesh', origin: 'Barishal', job: 'Graphic Designer', edu: 'Graduate', goal: 'Dating', match: 84, online: true, active: 'now', langs: ['বাংলা','English'], interests: ['Design','Coffee','Art','Music','Food'], img: 'assets/images/women/riya.jpg', bio: 'Designer, café regular, and a sucker for good lighting. Say hi if you love long chats over coffee.' },
  { id: 'p77', name: 'Omar', age: 28, verified: 3, city: 'London', country: 'United Kingdom', origin: 'Sylhet', job: 'Product Manager', edu: 'Graduate', goal: 'Serious Relationship', match: 91, online: true, active: 'now', langs: ['বাংলা','English','Sylheti'], interests: ['Startups','Coffee','Travel','Films','Fitness'], img: 'assets/images/men/omar.jpg', bio: 'Building products, collecting stories. London life, Sylhet roots. Looking for warmth, wit and honesty.' },
  { id: 'p47', name: 'Sreya', age: 24, verified: 2, city: 'Sylhet', country: 'Bangladesh', origin: 'Sylhet', job: 'Student', edu: 'Undergraduate', goal: 'Open to Exploring', match: 86, online: false, active: '4h ago', langs: ['বাংলা','English','Sylheti'], interests: ['Music','Nature','Books','Travel','Art'], img: 'assets/images/women/sreya.jpg', bio: 'A daisy behind my ear and music in my ears. Cheerful, easygoing, and up for new adventures.' },
  { id: 'p48', name: 'Oindrila', age: 27, verified: 3, city: 'Dhaka', country: 'Bangladesh', origin: 'Dhaka', job: 'Lecturer', edu: 'Postgraduate', goal: 'Marriage', match: 90, online: true, active: 'now', langs: ['বাংলা','English'], interests: ['Teaching','Books','Travel','Poetry','Music'], img: 'assets/images/women/oindrila.jpg', bio: 'A lecturer who believes in gentle ambition and lifelong learning. Looking for a sincere, grounded partner.' },
  { id: 'p78', name: 'Adnan', age: 26, verified: 2, city: 'Birmingham', country: 'United Kingdom', origin: 'Sylhet', job: 'Accountant', edu: 'Graduate', goal: 'Dating', match: 84, online: false, active: '5h ago', langs: ['বাংলা','English','Sylheti'], interests: ['Numbers','Football','Travel','Food','Gaming'], img: 'assets/images/men/adnan.jpg', bio: 'Good with numbers, better with people. Up for long drives, good food and longer talks.' },
  { id: 'p49', name: 'Tasnim', age: 27, verified: 3, city: 'Dhaka', country: 'Bangladesh', origin: 'Dhaka', job: 'Marketing Executive', edu: 'Graduate', goal: 'Serious Relationship', match: 89, online: true, active: 'now', langs: ['বাংলা','English'], interests: ['Travel','Coffee','Fashion','Films','Music'], img: 'assets/images/women/tasnim.jpg', bio: 'City girl with a soft heart. I love golden-hour walks, good coffee and easy, honest conversation.' },
  { id: 'p50', name: 'Rimjhim', age: 25, verified: 2, city: 'Sylhet', country: 'Bangladesh', origin: 'Sylhet', job: 'Content Creator', edu: 'Undergraduate', goal: 'Open to Exploring', match: 85, online: true, active: 'now', langs: ['বাংলা','English','Sylheti'], interests: ['Music','Photography','Travel','Art','Food'], img: 'assets/images/women/rimjhim.jpg', bio: 'Always chasing pretty light and new playlists. Cheerful, curious, and up for spontaneous plans.' },
  { id: 'p79', name: 'Rafi', age: 27, verified: 3, city: 'Dhaka', country: 'Bangladesh', origin: 'Chattogram', job: 'Software Engineer', edu: 'Graduate', goal: 'Serious Relationship', match: 88, online: true, active: 'now', langs: ['বাংলা','English'], interests: ['Coding','Music','Coffee','Travel','Films'], img: 'assets/images/men/rafi.jpg', bio: 'Engineer who codes clean and cooks messy. Value honesty, humour and a good weekend plan.' },
  { id: 'p51', name: 'Orpita', age: 28, verified: 3, city: 'Chattogram', country: 'Bangladesh', origin: 'Chattogram', job: 'Interior Designer', edu: 'Graduate', goal: 'Marriage', match: 88, online: false, active: '2h ago', langs: ['বাংলা','English','Chittagonian'], interests: ['Design','Art','Coffee','Travel','Books'], img: 'assets/images/women/orpita.jpg', bio: 'I make spaces feel like home. Looking for someone warm, dependable and a little adventurous.' },
  { id: 'p52', name: 'Jannat', age: 24, verified: 2, city: 'Dhaka', country: 'Bangladesh', origin: 'Barishal', job: 'Nursing Student', edu: 'Undergraduate', goal: 'Serious Relationship', match: 86, online: true, active: 'now', langs: ['বাংলা','English'], interests: ['Care','Books','Music','Cooking','Nature'], img: 'assets/images/women/jannat.jpg', bio: 'Caring is my nature and my calling. I value kindness, faith and family above everything.' },
  { id: 'p80', name: 'Mahin', age: 25, verified: 2, city: 'Dhaka', country: 'Bangladesh', origin: 'Khulna', job: 'Grad Student', edu: 'Postgraduate', goal: 'Dating', match: 85, online: true, active: 'now', langs: ['বাংলা','English'], interests: ['Research','Books','Coffee','Technology','Music'], img: 'assets/images/men/mahin.jpg', bio: 'Bookish, curious and coffee-powered. Looking for someone thoughtful to share ideas and quiet moments.' },
  { id: 'p53', name: 'Meherin', age: 29, verified: 3, city: 'London', country: 'United Kingdom', origin: 'Sylhet', job: 'Solicitor', edu: 'Postgraduate', goal: 'Marriage', match: 91, online: true, active: 'now', langs: ['বাংলা','English','Sylheti'], interests: ['Law','Travel','Books','Coffee','Fitness'], img: 'assets/images/women/meherin.jpg', bio: 'Sharp at work, soft off the clock. Hoping to meet someone genuine to build a calm, happy home with.' },
  { id: 'p54', name: 'Snigdha', age: 26, verified: 2, city: 'Dhaka', country: 'Bangladesh', origin: 'Rajshahi', job: 'Graphic Designer', edu: 'Graduate', goal: 'Dating', match: 84, online: true, active: 'now', langs: ['বাংলা','English'], interests: ['Design','Art','Music','Films','Coffee'], img: 'assets/images/women/snigdha.jpg', bio: 'Designer, dreamer, café regular. Let\'s trade playlists and see where a good conversation goes.' },
  { id: 'p81', name: 'Tahmid', age: 24, verified: 2, city: 'Chattogram', country: 'Bangladesh', origin: 'Chattogram', job: 'Business Student', edu: 'Undergraduate', goal: 'Open to Exploring', match: 83, online: false, active: '4h ago', langs: ['বাংলা','English','Chittagonian'], interests: ['Business','Café Hopping','Travel','Music','Food'], img: 'assets/images/men/tahmid.jpg', bio: 'Café regular with big dreams. Easygoing and honest — let\'s trade playlists and good conversation.' },
  { id: 'p55', name: 'Proma', age: 27, verified: 3, city: 'Toronto', country: 'Canada', origin: 'Dhaka', job: 'Data Analyst', edu: 'Postgraduate', goal: 'Serious Relationship', match: 90, online: false, active: '5h ago', langs: ['বাংলা','English'], interests: ['Data','Travel','Hiking','Coffee','Books'], img: 'assets/images/women/proma.jpg', bio: 'I find patterns for a living and calm on weekend trails. Looking for depth, warmth and good humour.' },
  { id: 'p56', name: 'Tisha', age: 23, verified: 2, city: 'Dhaka', country: 'Bangladesh', origin: 'Dhaka', job: 'University Student', edu: 'Undergraduate', goal: 'Open to Exploring', match: 83, online: true, active: 'now', langs: ['বাংলা','English'], interests: ['Music','Dance','Food','Travel','Films'], img: 'assets/images/women/tisha.jpg', bio: 'Full of energy and always laughing. Studying hard, dreaming big, and open to meeting someone lovely.' },
  { id: 'p82', name: 'Ibrahim', age: 28, verified: 3, city: 'Dubai', country: 'UAE', origin: 'Dhaka', job: 'Civil Engineer', edu: 'Postgraduate', goal: 'Marriage', match: 87, online: true, active: 'now', langs: ['বাংলা','English','Arabic'], interests: ['Architecture','Fitness','Travel','Food','Cricket'], img: 'assets/images/men/ibrahim.jpg', bio: 'Building skylines in the Gulf, dreaming of a home full of warmth. Family and loyalty come first.' },
  { id: 'p57', name: 'Lamisa', age: 28, verified: 3, city: 'Birmingham', country: 'United Kingdom', origin: 'Chattogram', job: 'Pharmacist', edu: 'Graduate', goal: 'Marriage', match: 89, online: false, active: '1h ago', langs: ['বাংলা','English'], interests: ['Health','Baking','Travel','Books','Gardening'], img: 'assets/images/women/lamisa.jpg', bio: 'Careful with prescriptions, generous with chai. Family-oriented and ready for something meaningful.' },
  { id: 'p58', name: 'Raisa', age: 25, verified: 2, city: 'Dhaka', country: 'Bangladesh', origin: 'Khulna', job: 'Architect', edu: 'Graduate', goal: 'Serious Relationship', match: 87, online: true, active: 'now', langs: ['বাংলা','English'], interests: ['Architecture','Design','Photography','Coffee','Travel'], img: 'assets/images/women/raisa.jpg', bio: 'I sketch buildings and chase good light. Looking for a curious, kind partner to explore the city with.' },
  { id: 'p83', name: 'Zayan', age: 29, verified: 3, city: 'Sydney', country: 'Australia', origin: 'Dhaka', job: 'Entrepreneur', edu: 'Graduate', goal: 'Serious Relationship', match: 89, online: false, active: '6h ago', langs: ['বাংলা','English'], interests: ['Business','Surfing','Coffee','Travel','Reading'], img: 'assets/images/men/zayan.jpg', bio: 'Founder, beach-lover, big planner. Calm and ambitious, looking for a genuine partner to grow with.' },
  { id: 'p59', name: 'Borsha', age: 26, verified: 2, city: 'Sylhet', country: 'Bangladesh', origin: 'Sylhet', job: 'Schoolteacher', edu: 'Graduate', goal: 'Marriage', match: 85, online: false, active: '3h ago', langs: ['বাংলা','English','Sylheti'], interests: ['Teaching','Nature','Poetry','Music','Art'], img: 'assets/images/women/borsha.jpg', bio: 'A teacher who loves rainy days and small joys. Gentle, sincere, and hoping to find the same.' },
  { id: 'p60', name: 'Shreyoshi', age: 27, verified: 3, city: 'New York', country: 'United States', origin: 'Dhaka', job: 'UX Designer', edu: 'Postgraduate', goal: 'Serious Relationship', match: 90, online: true, active: 'now', langs: ['বাংলা','English'], interests: ['Design','Travel','Coffee','Films','Art'], img: 'assets/images/women/shreyoshi.jpg', bio: 'Dhaka roots, NYC pace. I design for people and hope to find mine — thoughtful, warm and a little witty.' },
  { id: 'p84', name: 'Shafin', age: 25, verified: 2, city: 'Dhaka', country: 'Bangladesh', origin: 'Barishal', job: 'Videographer', edu: 'Undergraduate', goal: 'Dating', match: 84, online: true, active: 'now', langs: ['বাংলা','English'], interests: ['Film','Photography','Travel','Music','Art'], img: 'assets/images/men/shafin.jpg', bio: 'I tell stories through a lens. Creative, easygoing, and always up for a new adventure.' },
  { id: 'p61', name: 'Nabanita', age: 29, verified: 3, city: 'Dhaka', country: 'Bangladesh', origin: 'Dhaka', job: 'Doctor', edu: 'Doctorate', goal: 'Marriage', match: 92, online: false, active: '2h ago', langs: ['বাংলা','English'], interests: ['Medicine','Music','Cooking','Travel','Family'], img: 'assets/images/women/nabanita.jpg', bio: 'A doctor with a fondness for old songs and slow Sundays. Family means everything to me.' },
  { id: 'p62', name: 'Antara', age: 24, verified: 2, city: 'Dhaka', country: 'Bangladesh', origin: 'Rajshahi', job: 'Journalism Student', edu: 'Undergraduate', goal: 'Open to Exploring', match: 84, online: true, active: 'now', langs: ['বাংলা','English'], interests: ['Writing','Books','Coffee','Films','Travel'], img: 'assets/images/women/antara.jpg', bio: 'I chase stories and strong coffee. Looking for someone thoughtful to share long talks with.' },
  { id: 'p85', name: 'Hasan', age: 30, verified: 3, city: 'New York', country: 'United States', origin: 'Dhaka', job: 'Financial Analyst', edu: 'Graduate', goal: 'Marriage', match: 88, online: false, active: '3h ago', langs: ['বাংলা','English'], interests: ['Finance','Travel','Fitness','Reading','Food'], img: 'assets/images/men/hasan.jpg', bio: 'NYC pace, Dhaka heart. Looking for depth, warmth and someone to share the city and quiet evenings with.' },
  { id: 'p63', name: 'Ridi', age: 25, verified: 3, city: 'Manchester', country: 'United Kingdom', origin: 'Sylhet', job: 'Dentist', edu: 'Postgraduate', goal: 'Marriage', match: 88, online: true, active: 'now', langs: ['বাংলা','English','Sylheti'], interests: ['Health','Travel','Baking','Music','Fitness'], img: 'assets/images/women/ridi.jpg', bio: 'Warm smile, steady heart. I love weekend getaways and a home full of laughter and good food.' },
  { id: 'p64', name: 'Mahira', age: 26, verified: 2, city: 'Chattogram', country: 'Bangladesh', origin: 'Chattogram', job: 'Fashion Designer', edu: 'Graduate', goal: 'Dating', match: 86, online: true, active: 'now', langs: ['বাংলা','English','Chittagonian'], interests: ['Fashion','Art','Travel','Food','Music'], img: 'assets/images/women/mahira.jpg', bio: 'I design what I love to wear and live for colour. Say hi if you appreciate style and spontaneity.' },
  { id: 'p86', name: 'Mubin', age: 24, verified: 2, city: 'Dhaka', country: 'Bangladesh', origin: 'Dhaka', job: 'University Student', edu: 'Undergraduate', goal: 'Open to Exploring', match: 82, online: true, active: 'now', langs: ['বাংলা','English'], interests: ['Music','Gaming','Cricket','Travel','Food'], img: 'assets/images/men/mubin.jpg', bio: 'Laid-back, friendly and always up for a laugh. Here to meet good people and see where it goes.' },
  { id: 'p65', name: 'Zarin', age: 28, verified: 3, city: 'Sydney', country: 'Australia', origin: 'Dhaka', job: 'Software Engineer', edu: 'Graduate', goal: 'Serious Relationship', match: 89, online: false, active: '6h ago', langs: ['বাংলা','English'], interests: ['Technology','Coffee','Reading','Travel','Surfing'], img: 'assets/images/women/zarin_a.jpg', bio: 'Engineer by day, beach walker by weekend. Calm, curious and looking for a genuine connection.' },
  { id: 'p66', name: 'Bristy', age: 24, verified: 2, city: 'Dhaka', country: 'Bangladesh', origin: 'Barishal', job: 'Student', edu: 'Undergraduate', goal: 'Open to Exploring', match: 83, online: true, active: 'now', langs: ['বাংলা','English'], interests: ['Music','Nature','Books','Travel','Art'], img: 'assets/images/women/bristy.jpg', bio: 'Easygoing, cheerful and a bit of a daydreamer. Here to meet kind people and see what clicks.' },
  { id: 'p87', name: 'Saad', age: 25, verified: 2, city: 'Dhaka', country: 'Bangladesh', origin: 'Dhaka', job: 'Engineering Student', edu: 'Undergraduate', goal: 'Dating', match: 84, online: false, active: '1h ago', langs: ['বাংলা','English'], interests: ['Technology','Football','Books','Travel','Coffee'], img: 'assets/images/men/saad.jpg', bio: 'Studying hard, dreaming big. Sincere and easygoing, looking for a genuine, kind connection.' },
  { id: 'p67', name: 'Oishee', age: 27, verified: 3, city: 'Dubai', country: 'UAE', origin: 'Chattogram', job: 'Marketing Manager', edu: 'Graduate', goal: 'Marriage', match: 88, online: false, active: '3h ago', langs: ['বাংলা','English','Arabic'], interests: ['Marketing','Travel','Fitness','Food','Fashion'], img: 'assets/images/women/oishee.jpg', bio: 'Building brands in the Gulf, dreaming of a home full of warmth. Loyalty and family come first.' },
  { id: 'p68', name: 'Tuli', age: 25, verified: 2, city: 'Dhaka', country: 'Bangladesh', origin: 'Dhaka', job: 'Home Chef', edu: 'College', goal: 'Marriage', match: 85, online: true, active: 'now', langs: ['বাংলা','English'], interests: ['Cooking','Family','Music','Gardening','Travel'], img: 'assets/images/women/tuli.jpg', bio: 'Happiest in the kitchen with music on. I believe love and good food go hand in hand.' },
  { id: 'p88', name: 'Rezwan', age: 27, verified: 3, city: 'Manchester', country: 'United Kingdom', origin: 'Sylhet', job: 'UX Designer', edu: 'Graduate', goal: 'Serious Relationship', match: 88, online: true, active: 'now', langs: ['বাংলা','English','Sylheti'], interests: ['Design','Coffee','Travel','Films','Music'], img: 'assets/images/men/rezwan.jpg', bio: 'I design for people and hope to find mine — thoughtful, warm and a little witty. Manchester based.' },
];

const PROMPTS = [
  'My perfect Friday evening is…',
  'Three things I cannot live without…',
  'The quickest way to make me smile is…',
  'A place in Bangladesh I always love visiting…',
  'My favourite Bengali food is…',
  'The quality I value most in a relationship is…',
  'Something I am currently learning…',
];

const COMMUNITY = [
  { c: 'Bangladesh', n: '48,200+', img: 'assets/images/women/afsana.jpg' },
  { c: 'United Kingdom', n: '21,600+', img: 'assets/images/men/omar.jpg' },
  { c: 'United States', n: '14,300+', img: 'assets/images/women/farzana.jpg' },
  { c: 'Canada', n: '9,100+', img: 'assets/images/women/ishita.jpg' },
  { c: 'Australia', n: '6,400+', img: 'assets/images/men/zayan.jpg' },
  { c: 'UAE', n: '7,800+', img: 'assets/images/men/ibrahim.jpg' },
];

const STORIES = [
  { names: 'Ishita & Zayan', loc: 'Toronto ↔ Sydney', img: 'assets/images/women/ishita.jpg', text: '“We matched over a shared love of golden-hour photography. Now we plan our trips around the light.”', milestone: 'Together, 1 year' },
  { names: 'Ananya & Rafi', loc: 'Dhaka ↔ Birmingham', img: 'assets/images/women/ananya.jpg', text: '“He noticed my building sketches in my bio. Two years later, we\'re designing a life together.”', milestone: 'Engaged, 2025' },
  { names: 'Maliha & Tanvir', loc: 'Dhaka', img: 'assets/images/women/maliha.jpg', text: '“A conversation about old songs turned into a lifetime playlist. TUDO brought us home.”', milestone: 'Married, 2025' },
  { names: 'Meherin & Rafi', loc: 'London ↔ Birmingham', img: 'assets/images/women/meherin.jpg', text: '“Two busy careers, one shared value system. We just clicked — and never stopped talking.”', milestone: 'Engaged, 2025' },
  { names: 'Proma & Zayan', loc: 'Toronto ↔ Sydney', img: 'assets/images/women/proma.jpg', text: '“Opposite time zones, same wavelength. Weekend calls became a life plan.”', milestone: 'Together, 1 year' },
];

const STATS = [
  { label: 'Verified Members', value: 96400, suffix: '+' },
  { label: 'Successful Matches', value: 38200, suffix: '+' },
  { label: 'Countries Connected', value: 42, suffix: '' },
  { label: 'Conversations Started', value: 1200000, suffix: '+', short: true },
];

/* Conversations for messages demo */
const CONVERSATIONS = [
  { id: 'c1', pid: 'p29', last: 'That rooftop café sounds perfect ☕', time: '2m', unread: 2, online: true, match: 92,
    thread: [
      { from: 'them', text: 'Hi! I saw we both love Old Dhaka photography 📷', time: '10:02' },
      { from: 'me', text: 'We do! Your feed is stunning. Favourite spot?', time: '10:05' },
      { from: 'them', text: 'Ahsan Manzil at golden hour, always. You?', time: '10:06' },
      { from: 'me', text: 'Star Mosque — the tilework is unreal.', time: '10:09' },
      { from: 'them', text: 'That rooftop café sounds perfect ☕', time: '10:11' },
    ] },
  { id: 'c2', pid: 'p37', last: 'Haha okay you pick the restaurant then 😄', time: '1h', unread: 0, online: true, match: 91,
    thread: [
      { from: 'me', text: 'You had me at homemade chai 🫖', time: '09:20' },
      { from: 'them', text: 'It\'s a whole ritual, I take it seriously', time: '09:24' },
      { from: 'them', text: 'Haha okay you pick the restaurant then 😄', time: '09:31' },
    ] },
  { id: 'c3', pid: 'p45', last: 'Museum this weekend? 🖼️', time: '3h', unread: 1, online: false, match: 93,
    thread: [
      { from: 'them', text: 'Your travel stories are incredible', time: 'Yesterday' },
      { from: 'me', text: 'Thank you! Toronto has great museums right?', time: 'Yesterday' },
      { from: 'them', text: 'Museum this weekend? 🖼️', time: '3h' },
    ] },
  { id: 'c4', pid: 'p31', last: 'Tea over coffee, we agree on the essentials 😌', time: '1d', unread: 0, online: false, match: 90,
    thread: [
      { from: 'me', text: 'Long conversations and slow mornings — sold.', time: 'Mon' },
      { from: 'them', text: 'Tea over coffee, we agree on the essentials 😌', time: 'Mon' },
    ] },
];

const NOTIFICATIONS = [
  { type: 'match', icon: 'heart', title: 'New Match with Nadia', body: 'You and Nadia liked each other.', time: '2m', unread: true },
  { type: 'like', icon: 'spark', title: 'Farah sent you a Spark', body: 'Someone special is interested.', time: '22m', unread: true },
  { type: 'message', icon: 'chat', title: 'New message from Lamia', body: 'Museum this weekend? 🖼️', time: '3h', unread: true },
  { type: 'view', icon: 'eye', title: 'Your profile was viewed', body: '6 people viewed your profile today.', time: '5h', unread: false },
  { type: 'verify', icon: 'shield', title: 'Verification complete', body: 'Your photo verification was approved.', time: '1d', unread: false },
  { type: 'security', icon: 'lock', title: 'New login detected', body: 'A new sign-in from London, UK.', time: '2d', unread: false },
];

/* Lightweight i18n dictionary (EN / BN) */
const I18N = {
  en: {
    'nav.discover': 'Discover', 'nav.matches': 'Matches', 'nav.stories': 'Success Stories',
    'nav.safety': 'Safety', 'nav.premium': 'Premium', 'nav.about': 'About',
    'nav.login': 'Log In', 'nav.join': 'Join TUDO',
    'hero.rotate': 'Find %s with TUDO.',
    'qs.iam': 'I am', 'qs.looking': 'Looking for', 'qs.agefrom': 'Age from', 'qs.ageto': 'Age to',
    'qs.location': 'Current location', 'qs.goal': 'Relationship goal', 'qs.find': 'Find Matches',
    'cta.title': 'Your Next Chapter Could Start Here.',
    'cta.sub': 'Join a growing community of Bangladeshi singles looking for genuine connections.',
    'cta.create': 'Create Free Profile', 'cta.explore': 'Explore TUDO',
    'foot.tag': 'Bangladeshi Hearts. Real Connections.',
  },
  bn: {
    'nav.discover': 'আবিষ্কার', 'nav.matches': 'ম্যাচ', 'nav.stories': 'সাফল্যের গল্প',
    'nav.safety': 'নিরাপত্তা', 'nav.premium': 'প্রিমিয়াম', 'nav.about': 'সম্পর্কে',
    'nav.login': 'লগ ইন', 'nav.join': 'যোগ দিন',
    'hero.rotate': 'TUDO-তে খুঁজে নিন %s।',
    'qs.iam': 'আমি', 'qs.looking': 'খুঁজছি', 'qs.agefrom': 'বয়স থেকে', 'qs.ageto': 'বয়স পর্যন্ত',
    'qs.location': 'বর্তমান অবস্থান', 'qs.goal': 'সম্পর্কের লক্ষ্য', 'qs.find': 'ম্যাচ খুঁজুন',
    'cta.title': 'আপনার নতুন অধ্যায় এখান থেকেই শুরু হতে পারে।',
    'cta.sub': 'সত্যিকারের সংযোগ খুঁজছেন এমন বাংলাদেশি সিঙ্গেলদের ক্রমবর্ধমান কমিউনিটিতে যোগ দিন।',
    'cta.create': 'ফ্রি প্রোফাইল তৈরি করুন', 'cta.explore': 'TUDO ঘুরে দেখুন',
    'foot.tag': 'বাংলাদেশি হৃদয়। সত্যিকারের সংযোগ।',
  },
};

const GOALS = ['Serious Relationship', 'Marriage', 'Dating', 'Friendship', 'Open to Exploring'];
const COUNTRIES = ['Bangladesh', 'United Kingdom', 'United States', 'Canada', 'Australia', 'UAE', 'Europe', 'Other'];
const INTERESTS = ['Travel','Food','Cooking','Books','Films','Music','Sports','Business','Technology','Photography','Art','Fitness','Gaming','Nature','Volunteering'];

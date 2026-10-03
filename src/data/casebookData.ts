import { GuesstimateItem, CaseItem, ConceptItem, QuizQuestion, BehaviouralQuestion } from '../types';
import { ADDITIONAL_GUESSTIMATES } from './extraGuesstimates';
import { COMPREHENSIVE_FMS_CASES } from './casesFullBank';

export const BENCHMARK_CHEATSHEET = [
  { label: 'India Population', value: '1.40 Billion (140 Crore)' },
  { label: 'India Urban / Rural Split', value: '35% Urban (~490M) : 65% Rural (~910M)' },
  { label: 'Average Household Size', value: 'India ~4.5 members | Metro ~3.8 members' },
  { label: 'Total Indian Households', value: '~300 Million (Urban: ~110M, Rural: ~190M)' },
  { label: 'India Age Distribution', value: '0-14 yrs: 25% | 15-24 yrs: 18% | 25-59 yrs: 48% | 60+ yrs: 9%' },
  { label: 'India Gender Split', value: '52% Male : 48% Female' },
  { label: 'Socio-Economic Classification (SEC)', value: 'Affluent (Top 5%), Upper-Middle (15%), Middle (30%), Lower-Middle (30%), Low-Income/BPL (20%)' },
  { label: 'Delhi NCR Population', value: '3.2 Crore (~32 Million) | ~7.5 Million Households' },
  { label: 'Delhi Metro Daily Ridership', value: '~6.0 - 6.5 Million passenger journeys/day' },
  { label: 'Mumbai Population', value: '~2.1 Crore (~21 Million)' },
  { label: 'India Internet Users', value: '~850 Million active internet users' },
  { label: 'Smartphone Penetration', value: '~650 Million active smartphone users' },
  { label: 'India Two-Wheelers Registered', value: '~220 Million vehicles' },
  { label: 'India Four-Wheelers (Cars)', value: '~40 Million private cars (~30 cars per 1000 people)' },
  { label: 'Delhi Registered Four-Wheelers', value: '~3.5 Million private passenger cars' },
  { label: 'India Commercial Vehicles (Trucks/Buses)', value: '~12-14 Million' },
  { label: 'Delhi Indira Gandhi Airport (IGI)', value: '~70 Million passengers/yr | ~1,200 flights/day' },
  { label: 'Total Retail Outlets (Kiranas)', value: '~12-13 Million FMCG outlets across India' },
  { label: 'Fuel Petrol Stations in India', value: '~85,000 to 90,000 operational pumps' },
];

export const GUESSTIMATE_BANK: GuesstimateItem[] = [
  {
    id: 'g-toothbrushes',
    title: 'Toothbrushes Sold Annually in India',
    category: 'Consumer Goods',
    difficulty: 'Beginner',
    question: 'Estimate the annual number of toothbrushes sold in India.',
    objective: 'Calculate the total unit sales of manual toothbrushes in India in a calendar year.',
    suggestedApproach: 'Demand-side',
    benchmarkNumbers: [
      { label: 'Population', value: '1.4B' },
      { label: 'Urban / Rural', value: '35% Urban / 65% Rural' },
      { label: 'Penetration', value: 'Urban ~90%, Rural ~60% (neem datun/alternatives)' },
      { label: 'Replacement Cycle', value: 'Urban: 3-4 months (~3.5/yr); Rural: 6 months (~2/yr)' }
    ],
    referenceSolution: {
      steps: [
        'Segment India into Urban (490M) and Rural (910M).',
        'Estimate toothbrush usage penetration: Urban 90% (440M users); Rural 60% (545M users) totaling ~985M users.',
        'Apply replacement frequency: Urban users buy ~3.5 toothbrushes/yr (440M * 3.5 = 1.54B); Rural users buy ~2 toothbrushes/yr (545M * 2 = 1.09B).',
        'Add institutional sales (hotels, hospitals, travel kits): ~5% additional (~130M).',
        'Total annual volume: ~2.75 to 2.8 Billion toothbrushes.'
      ],
      finalNumber: '~2.75 Billion toothbrushes per year',
      keyAssumptions: ['Rural penetration limited by traditional datun sticks', 'Urban users replace every 3-4 months', 'Average life per toothbrush'],
      sanityCheckMethod: 'Compare against FMCG dental care market value (Colgate/Oral-B ~₹4,000 Cr at avg price ₹20-25 gives ~1.8-2B branded + 0.8B unbranded).',
      casebookReference: 'FMS Casebook 2025-26, Part C — Practice Guesstimate 30'
    },
    interviewerTips: [
      'Watch if candidate distinguishes urban vs rural replacement frequency.',
      'Check if they consider neem/datun non-users in rural areas.',
      'Ensure they state the replacement period explicitly rather than picking an arbitrary multiplier.'
    ]
  },
  {
    id: 'g-umbrellas',
    title: 'Number of Umbrellas Sold Annually in India',
    category: 'Consumer Goods',
    difficulty: 'Intermediate',
    question: 'Estimate the number of umbrellas sold annually in India.',
    objective: 'Determine yearly umbrella retail sales volume across monsoon and sun-protection usage.',
    suggestedApproach: 'Demand-side',
    benchmarkNumbers: [
      { label: 'Total Households', value: '300 Million' },
      { label: 'High Monsoon Regions', value: '~40% of population (Coastal, Western Ghats, Northeast)' },
      { label: 'Average Lifespan of Umbrella', value: '2 to 3 years' }
    ],
    referenceSolution: {
      steps: [
        'Approach via household demand + individual outdoor working population.',
        'Segment by geography: High rain regions (40% of 300M HH = 120M HH) hold avg 2 umbrellas = 240M stock. Low/Moderate rain (60% = 180M HH) hold avg 1 umbrella = 180M stock. Total stock = ~420M.',
        'Replacement rate: Average umbrella lasts 3 years -> 420M / 3 = ~140M replacements/year.',
        'Loss / breakage during extreme monsoons: +10% (~14M).',
        'Corporate / commercial / street vendor sun-shades: +15M.',
        'Total annual sales: ~170 Million umbrellas.'
      ],
      finalNumber: '~160M - 180M umbrellas/year',
      keyAssumptions: ['Stock per household varies by rainfall zone', 'Average lifespan 3 years', 'High seasonal monsoon concentration'],
      sanityCheckMethod: '170M umbrellas for 1.4B people implies ~1 umbrella bought per person every 8 years, or 1 every 1.8 households each year, which aligns with monsoon purchase cycles.',
      casebookReference: 'FMS Casebook 2025-26, Part C — Practice Guesstimate 2'
    },
    interviewerTips: [
      'Nudge candidate to think about geography and rainfall variation in India.',
      'Probe on whether they consider umbrella lifespan (it is an episodic durable good, not consumable).'
    ]
  },
  {
    id: 'g-delhi-toll',
    title: 'Gurgaon-Delhi Expressway Toll Collection',
    category: 'Transport & Infrastructure',
    difficulty: 'Intermediate',
    question: 'Estimate the daily toll collection at the Delhi-Gurgaon border toll plaza (Kherki Daula / Sirhaul).',
    suggestedApproach: 'Supply-side',
    benchmarkNumbers: [
      { label: 'Lanes', value: '32 total lanes (16 in each direction)' },
      { label: 'FASTag Transaction Time', value: '6-8 seconds per vehicle during flow' },
      { label: 'Peak vs Non-Peak Hours', value: 'Peak: 4h morning + 4h evening (8h total); Off-peak: 16h' },
      { label: 'Toll Tariff', value: 'Cars ~₹80, Commercial LCV ~₹120, Heavy Trucks/Buses ~₹230' }
    ],
    referenceSolution: {
      steps: [
        'Use capacity / bottleneck approach (number of lanes * vehicles per lane per hour).',
        'Plaza has 32 operational lanes (16 each direction).',
        'Peak hours (8 hrs): throughput ~450 vehicles/lane/hr * 32 lanes = 14,400 vph * 8 hrs = 115,200 vehicles.',
        'Non-peak daytime (10 hrs): throughput ~200 vehicles/lane/hr * 32 lanes = 6,400 vph * 10 hrs = 64,000 vehicles.',
        'Night hours (6 hrs, mostly freight): ~150 vehicles/lane/hr * 32 = 4,800 vph * 6 hrs = 28,800 vehicles.',
        'Total daily vehicles: ~208,000 vehicles.',
        'Weighted average toll: 75% Cars (@₹80 = ₹60), 10% LCVs (@₹120 = ₹12), 15% Trucks/Buses (@₹230 = ₹34.5) -> Avg toll ~₹106.',
        'Daily collection: 208,000 * ₹106 = ~₹2.2 Crore (~₹22 Million/day).'
      ],
      finalNumber: '~₹2.0 - ₹2.3 Crore per day',
      keyAssumptions: ['Lane count', 'FASTag processing speed', 'Vehicle category mix'],
      sanityCheckMethod: 'NHAI published daily figures for Kherki Daula hover between ₹1.8 Cr to ₹2.4 Cr depending on seasonal freight.',
      casebookReference: 'FMS Casebook 2025-26, Part C — Practice Guesstimate 3'
    },
    interviewerTips: [
      'Ensure the candidate does not use a demand-side Delhi population method—a toll plaza is a classic capacity/flow problem!',
      'Check vehicle classification (cars vs commercial freight).'
    ]
  },
  {
    id: 'g-petrol-pumps',
    title: 'Number of Petrol Pumps in India',
    category: 'Transport & Infrastructure',
    difficulty: 'Advanced',
    question: 'Estimate the total number of operational petrol pumps (fuel retail outlets) in India.',
    suggestedApproach: 'Supply-side',
    benchmarkNumbers: [
      { label: 'Highway Length', value: 'National + State Highways ~200,000 km' },
      { label: 'Fuel Consumed', value: 'Daily fuel consumption or vehicles served per pump per day' },
      { label: 'Average Pump Capacity', value: 'Urban: 1,500-2,000 vehicles/day; Highway: 600-800 vehicles/day' }
    ],
    referenceSolution: {
      steps: [
        'Approach via total vehicle fleet and refueling frequency.',
        'Vehicle fleet: ~220M Two-Wheelers (refuel 1x/week = 31M refuels/day), ~40M Cars (refuel 1x/10 days = 4M refuels/day), ~12M CVs/Buses/Trucks (refuel every 2 days = 6M refuels/day).',
        'Total daily refueling visits: ~41 Million vehicle visits/day.',
        'Average petrol pump capacity: 4-6 dispensing nozzles, operating 16-24 hours. Serves ~500-600 vehicles/day on average across rural, highway, and dense urban outlets.',
        'Total pumps = 41,000,000 / 500 = ~82,000 pumps.'
      ],
      finalNumber: '~80,000 to 90,000 petrol pumps',
      keyAssumptions: ['Refueling frequency by vehicle type', 'Average daily throughput per pump across India'],
      sanityCheckMethod: 'Ministry of Petroleum & Natural Gas data shows ~88,000 fuel retail outlets (IOCL ~36k, BPCL ~21k, HPCL ~21k, Private ~10k). Candidate is within 5%!',
      casebookReference: 'FMS Casebook 2025-26, Part C — Practice Guesstimate 8'
    },
    interviewerTips: [
      'If the candidate tries calculating by geographic area or highway distance alone, nudge them: what about urban density and village outlets?',
      'Validate their two-wheeler vs car refueling frequency assumptions.'
    ]
  },
  {
    id: 'g-pizza-delhi',
    title: 'Cheese Burst Pizzas Sold Daily in Delhi',
    category: 'Urban & Retail',
    difficulty: 'Intermediate',
    question: 'Estimate the number of cheese burst pizzas sold in Delhi every day.',
    objective: 'Determine daily retail orders of cheese burst crust pizzas from quick-service chains (Domino\'s, Pizza Hut) and independent pizzerias.',
    suggestedApproach: 'Supply-side',
    benchmarkNumbers: [
      { label: 'Dominant Brand Outlets', value: 'Domino\'s has ~350-400 outlets in Delhi NCR; Pizza Hut ~120' },
      { label: 'Orders per Outlet', value: '150-250 pizzas/day per outlet' },
      { label: 'Cheese Burst Share', value: '~20-25% of orders opt for cheese burst crust upgrade' }
    ],
    referenceSolution: {
      steps: [
        'Total pizza outlets in Delhi NCR that serve cheese burst: Major QSRs (Domino\'s ~360, Pizza Hut ~120, Mojo/others ~100) = ~580 outlets.',
        'Average total pizzas sold per outlet per day: Weekday ~160, Weekend ~260 -> Weighted avg ~190 pizzas/day.',
        'Total pizzas sold in Delhi/day: 580 * 190 = ~110,000 pizzas.',
        'Proportion opting for cheese burst upgrade: ~20% of customers pay the ₹75-100 premium.',
        'Daily cheese burst pizzas: 110,000 * 0.20 = ~22,000 pizzas per day.'
      ],
      finalNumber: '~20,000 - 25,000 cheese burst pizzas per day',
      keyAssumptions: ['Outlet count in Delhi NCR', 'Weekday vs weekend volume variance', 'Cheese burst upgrade penetration rate'],
      sanityCheckMethod: 'Domino\'s reports ~150-200 orders/day/store. With 350 stores and ~20% cheese burst, that alone accounts for ~14,000, confirming the ~22k total estimate.',
      casebookReference: 'FMS Casebook 2025-26, Part C — Practice Guesstimate 7'
    },
    interviewerTips: [
      'Watch whether candidate remembers the distinction between weekday and weekend sales.',
      'Check if they realize cheese burst is a specific crust variant with an extra price tag, not all pizzas.'
    ]
  },
  {
    id: 'g-swiggy-drivers',
    title: 'Active Swiggy Delivery Partners in Bengaluru',
    category: 'Media & Tech',
    difficulty: 'Intermediate',
    question: 'Estimate the number of active Swiggy food delivery partners on the road in Bengaluru at any given time during peak dinner hours.',
    suggestedApproach: 'Supply-side',
    benchmarkNumbers: [
      { label: 'Bengaluru Population', value: '~13 Million' },
      { label: 'Peak Dinner Hour', value: '8:00 PM - 10:00 PM (2-hour window)' },
      { label: 'Food Delivery Orders', value: '~150,000 - 200,000 orders in peak dinner window' },
      { label: 'Orders per Rider per Hour', value: '1.2 - 1.5 orders completed per hour' }
    ],
    referenceSolution: {
      steps: [
        'Estimate peak dinner window (8 PM - 10 PM) order volume: Bengaluru has ~3.5M households. ~10% urban affluent/working households order food in peak window = 350,000 orders across Swiggy and Zomato.',
        'Swiggy market share ~45% = ~160,000 orders over 2 hours = 80,000 orders/hour.',
        'Average rider cycle: 10 mins to restaurant + 10 mins wait/pack + 15 mins transit + 5 mins drop-off = 40 minutes per order (~1.5 orders/hr per rider).',
        'Riders needed concurrently: 80,000 orders / 1.5 = ~53,000 active riders during dinner peak.'
      ],
      finalNumber: '~50,000 - 55,000 active delivery partners',
      keyAssumptions: ['Peak 2-hour order concentration', 'Rider turnaround time (pickup to drop)', 'Swiggy vs Zomato duopoly share'],
      sanityCheckMethod: 'Swiggy has ~350,000 total pan-India delivery partners; Bengaluru is their headquarters and largest market alongside NCR, so ~50k peak fleet is completely sound.',
      casebookReference: 'FMS Casebook 2025-26, Part C — Practice Guesstimate 28'
    },
    interviewerTips: [
      'Check if the candidate accounts for peak hour concentration vs average day distribution.',
      'Probe on the rider delivery cycle time (travel, wait at restaurant, delivery).'
    ]
  },
  {
    id: 'g-delhi-metro',
    title: 'Delhi Metro Daily Commuters & Ticket Revenue',
    category: 'Transport & Infrastructure',
    difficulty: 'Intermediate',
    question: 'Estimate the daily ridership and ticketing revenue of Delhi Metro (DMRC).',
    suggestedApproach: 'Hybrid',
    benchmarkNumbers: [
      { label: 'Operational Lines', value: '10-12 lines, ~390 km network, ~285 stations' },
      { label: 'Train Capacity', value: '6 or 8 coach trains, ~2,000 passenger crush capacity' },
      { label: 'Average Fare', value: '₹30 - ₹35 per passenger journey' }
    ],
    referenceSolution: {
      steps: [
        'Calculate from train capacity and frequency: ~330 operational trains running 6 AM to 11 PM (17 hours).',
        'Peak hours (6 hrs: 8-11 AM, 5-8 PM): Headway 3 mins on key lines. Total trips per day ~3,000+ train trips.',
        'Average occupancy: Peak ~1,800 passengers/train; Off-peak ~800 passengers/train. Weighted average ~1,200 passengers per trip.',
        'Total daily passenger journeys = ~3,000 trips * 1,200 (net of turnover) = ~6.2 Million passenger boardings.',
        'Revenue: 75% Smart card users (avg fare ₹32 with 10% discount), 25% Token/QR users (avg fare ₹35). Weighted fare ~₹33.',
        'Daily ticket collection = 6.2M * ₹33 = ~₹20.5 Crore/day (~₹205 Million/day).'
      ],
      finalNumber: '~6.0 - 6.5M daily passengers | ~₹20 Crore daily revenue',
      keyAssumptions: ['Turnover per train trip (people boarding and deboarding along the line)', 'Peak vs off-peak passenger volume', 'Average fare tier'],
      sanityCheckMethod: 'DMRC audited reports state ~6.2M passenger journeys daily and ~₹7,000 Cr annual revenue, translating to ~₹19-21 Cr daily ticketing revenue.',
      casebookReference: 'FMS Casebook 2025-26, Part C — Practice Guesstimate 29'
    },
    interviewerTips: [
      'Ask the candidate how they handle station turnover (people don\'t all travel end-to-end!).',
      'Test their understanding of the fare grid.'
    ]
  },
  {
    id: 'g-ev-two-wheelers',
    title: 'EV Two-Wheeler Market Size in India',
    category: 'Consumer Goods',
    difficulty: 'Intermediate',
    question: 'Estimate the annual sales volume (in units) of Electric Two-Wheelers (e2W) in India.',
    suggestedApproach: 'Top-down',
    benchmarkNumbers: [
      { label: 'Total 2W Sales', value: '~18-20 Million two-wheelers sold annually in India' },
      { label: 'EV Penetration Rate', value: 'Currently ~5% to 6% of new 2W registrations' },
      { label: 'Key Segment', value: 'Electric scooters (~85% of EV 2W market), electric motorcycles (~15%)' }
    ],
    referenceSolution: {
      steps: [
        'Total 2-Wheeler annual sales in India = ~18.5 Million units.',
        'EV 2W penetration drivers: Urban vs Rural adoption, FAME subsidy impact, TCO (Total Cost of Ownership) parity for daily commuters (30+ km/day), delivery fleet electrification.',
        'Penetration across regions: Tier-1 & Tier-2 cities (scooter heavy, ~40% of 2W market) has ~10% EV penetration = ~740,000 units.',
        'Tier-3 & Rural (motorcycle heavy, range anxiety, charging constraints, ~60% of market) has ~2% EV penetration = ~220,000 units.',
        'Commercial delivery fleet demand (Zomato, Swiggy, Amazon EV mandates): ~100,000 commercial e-scooters.',
        'Total annual EV 2W sales = 740k + 220k + 100k = ~1.06 Million units.'
      ],
      finalNumber: '~1.0 - 1.1 Million EV two-wheelers / year',
      keyAssumptions: ['Total 2W annual market size ~18.5M', 'Overall EV penetration ~5.5-6%', 'Commercial fleet adoption'],
      sanityCheckMethod: 'Vahan registration portal recorded ~950,000 - 1,000,000 e2W registrations in recent fiscal year (Ola, TVS, Ather, Bajaj), confirming ~1.05M total sales.',
      casebookReference: 'FMS Casebook 2025-26, Part C — Practice Guesstimate 14'
    },
    interviewerTips: [
      'Check if candidate separates scooters from motorcycles (e-scooters dominate EV 2W currently).',
      'Probe on the role of commercial delivery fleets.'
    ]
  },
  {
    id: 'g-amazon-orders',
    title: 'Daily Amazon Delivery Orders in India',
    category: 'Media & Tech',
    difficulty: 'Advanced',
    question: 'Estimate the average number of delivery parcels Amazon ships per day in India (non-sale season).',
    suggestedApproach: 'Demand-side',
    benchmarkNumbers: [
      { label: 'Active Online Shoppers', value: '~180-200 Million people in India' },
      { label: 'E-commerce Duopoly', value: 'Flipkart & Amazon control ~70-75% combined market share (~35% each)' },
      { label: 'Order Frequency', value: 'High frequency (Prime ~2-3 orders/month), Casual (~0.5 orders/month)' }
    ],
    referenceSolution: {
      steps: [
        'Active online transacting shoppers in India: ~190 Million.',
        'Segment shoppers by platform usage: Amazon users ~110 Million (some overlap with Flipkart/Meesho).',
        'Break into tiers: Tier A (Prime subscribers ~25M): order 2.5 times/month = 62.5M orders/month. Tier B (Regular shoppers ~40M): order 1 time/month = 40M orders/month. Tier C (Occasional shoppers ~45M): order once every 3 months (~0.33/mo) = 15M orders/month.',
        'Total monthly Amazon orders: 62.5M + 40M + 15M = ~117.5 Million orders/month.',
        'Daily average orders = 117.5M / 30 days = ~3.9 Million orders per day.'
      ],
      finalNumber: '~3.5 - 4.0 Million packages delivered daily',
      keyAssumptions: ['Active transactor base size', 'Prime vs regular shopper purchasing frequency', 'Excludes festive spikes (Great Indian Festival)'],
      sanityCheckMethod: 'Logistics industry data shows total Indian e-commerce shipments ~8-9M parcels/day. Amazon holding ~40-42% share equals ~3.6-3.8M parcels/day.',
      casebookReference: 'FMS Casebook 2025-26, Part C — Practice Guesstimate 16'
    },
    interviewerTips: [
      'Prompt candidate to differentiate between registered accounts vs active monthly transacting buyers.',
      'Check if they clarify normal run-rate vs Diwali Great Indian Festival surge.'
    ]
  },
  {
    id: 'g-schools-delhi',
    title: 'Number of Secondary Schools in Delhi',
    category: 'Urban & Retail',
    difficulty: 'Intermediate',
    question: 'Estimate the number of secondary and senior secondary schools in Delhi.',
    suggestedApproach: 'Demand-side',
    benchmarkNumbers: [
      { label: 'Delhi Population', value: '3.2 Crore (32 Million)' },
      { label: 'School-going Age Group (5-17 yrs)', value: '~22% of population (~7 Million children)' },
      { label: 'Secondary / Sr Secondary Cohort (11-17 yrs)', value: '~3.5 Million students' },
      { label: 'Average School Size', value: 'Government: ~1,200 students | Private: ~1,500-2,000 students' }
    ],
    referenceSolution: {
      steps: [
        'Delhi population: 32 Million. School-age children (Classes 6-12, age 11-17): ~11% = 3.5 Million children.',
        'Enrollment rate: Delhi has high school enrollment ~85% = ~3.0 Million attending students.',
        'Split by management type: Government (Kendriya Vidyalaya, Sarvodaya, Delhi Govt) ~50% = 1.5M students. Private recognized schools ~50% = 1.5M students.',
        'Average student strength per school in Classes 6-12: ~600-800 students per school.',
        'Total secondary/sr secondary schools = 3,000,000 / 700 = ~4,200 to 4,500 schools.'
      ],
      finalNumber: '~4,000 - 4,500 schools',
      keyAssumptions: ['School-age demographic share', 'Enrollment percentage', 'Average school capacity'],
      sanityCheckMethod: 'Delhi Directorate of Education records ~1,250 Delhi Govt schools + ~2,400 private recognized schools + ~400 MCD/Aided/KVs = ~4,050 total secondary institutions.',
      casebookReference: 'FMS Casebook 2025-26, Part C — Practice Guesstimate 11'
    },
    interviewerTips: [
      'Nudge candidate to specify age brackets for secondary schooling (Classes 6-12 or 9-12).',
      'Check if they account for school size differences across government and private institutions.'
    ]
  },
  {
    id: 'g-toi-ad-rev',
    title: 'Annual Print Ad Revenue for Times of India',
    category: 'Media & Tech',
    difficulty: 'Advanced',
    question: 'Estimate the annual print advertising revenue of The Times of India (TOI) newspaper across India.',
    suggestedApproach: 'Supply-side',
    benchmarkNumbers: [
      { label: 'Circulation', value: '~2.8 - 3.0 Million copies daily across 30+ editions' },
      { label: 'Average Pages per Issue', value: '24-28 broadsheet pages + supplementary pullouts' },
      { label: 'Ad Space Proportion', value: '~40% to 50% of print area dedicated to advertisements' }
    ],
    referenceSolution: {
      steps: [
        'Calculate from ad space inventory per daily edition across major centers (Delhi, Mumbai, Bengaluru, etc.).',
        'Average weekday paper has 24 broadsheet pages. Ad space = 45% = ~11 full-page equivalent ads per day.',
        'Classify ad pricing: Page 1 / Jacket ad: ₹40-50 Lakhs. Page 3 / Solus ad: ₹20 Lakhs. Regular inner pages: ₹5-10 Lakhs. Classifieds / Small ads: ₹10 Lakhs.',
        'Average daily ad revenue for flagship national edition + metro regional variations = ~₹8 - ₹10 Crore per day.',
        'Weekend editions (Saturday & Sunday Times with luxury and property supplements) command 30% higher rates = ~₹12 Crore/day.',
        'Annual revenue: (260 weekdays * ₹9 Cr = ₹2,340 Cr) + (105 weekend days * ₹12 Cr = ₹1,260 Cr) = ~₹3,600 Crore/year.'
      ],
      finalNumber: '~₹3,400 - ₹3,800 Crore annually',
      keyAssumptions: ['Average pages per issue', 'Ad space load ratio', 'Pricing variance between premium cover pages vs inside folios'],
      sanityCheckMethod: 'BCCLs published financial filings report print advertisement revenues of ~₹3,500 - ₹4,000 Cr, confirming the supply-side page-yield calculation.',
      casebookReference: 'FMS Casebook 2025-26, Part C — Practice Guesstimate 4'
    },
    interviewerTips: [
      'Ensure the candidate does not confuse print circulation revenue (selling copies at ₹4-5) with advertising revenue.',
      'Check whether they understand jacket/front-page ad pricing premiums.'
    ]
  },
  {
    id: 'g-commercial-truck-tires',
    title: 'Commercial Truck Tires Replaced Annually',
    category: 'Transport & Infrastructure',
    difficulty: 'Intermediate',
    question: 'Estimate the annual replacement demand for Medium and Heavy Commercial Vehicle (M&HCV) tires in India.',
    suggestedApproach: 'Demand-side',
    benchmarkNumbers: [
      { label: 'Registered Heavy Trucks in India', value: '~4.5 Million active M&HCVs' },
      { label: 'Average Tires per Truck', value: '6-wheeler (6 tires), 10-wheeler (10 tires), 12/14/16-wheelers (avg ~8.5 tires/truck)' },
      { label: 'Tire Lifespan / Running', value: '~60,000 - 80,000 km (or 1.5 - 2 years before retreading/replacement)' }
    ],
    referenceSolution: {
      steps: [
        'Fleet size: 4.5 Million active heavy commercial trucks.',
        'Average tires mounted per truck: 8 tires (weighted mix of 6-wheelers, 10-wheelers, multi-axle).',
        'Total tire population on the road = 4.5M * 8 = 36 Million mounted tires.',
        'Replacement frequency: Heavy long-haul trucks run 70,000 km/yr; tire life ~70,000 km -> replaced every 12-14 months (~0.85 replacement cycle/yr).',
        'Annual replacement tire demand = 36 Million * 0.85 = ~30.6 Million replacement tires.',
        'Add spares & OEM new truck factory fitment (~250,000 new trucks * 8 = 2.0M tires).',
        'Total replacement market demand: ~30 Million tires/year.'
      ],
      finalNumber: '~28 - 32 Million commercial tires/year',
      keyAssumptions: ['Average wheel count across fleet', 'Annual mileage of freight vehicles', 'Replacement cycle vs retreading'],
      sanityCheckMethod: 'ATMA (Automotive Tyre Manufacturers\' Association) data shows truck and bus radial/bias replacement sales of ~31 Million tires annually (MRF, Apollo, JK Tyre).',
      casebookReference: 'FMS Casebook 2025-26, Part C — Practice Guesstimate 33'
    },
    interviewerTips: [
      'Check if the candidate accounts for commercial trucks having 6, 10, or 14+ wheels instead of 4!',
      'Probe on annual kilometers driven compared to a personal passenger car.'
    ]
  }
];

export const CASE_BANK: CaseItem[] = [
  {
    id: 'case-apex-fmcg-profitability',
    title: 'Declining Operating Profitability at Apex Foods',
    type: 'Profitability',
    industry: 'FMCG',
    difficulty: 'Intermediate',
    prompt: 'Our client, Apex Foods, is a leading packaged food & beverage manufacturer in India. Over the last 2 years, their operating profit margin has shrunk from 18% to 11%, even though overall revenue has grown by 6%. The CEO has hired us to diagnose the root cause and recommend an actionable turnaround plan.',
    clientContext: 'Apex produces biscuits, savory snacks, and ready-to-drink juices. They distribute through 800,000 traditional kirana stores and modern retail chains across West and North India.',
    initialClarifications: 'Competitors have seen only a mild margin dip (from 17% to 16%). The problem is predominantly internal to Apex Foods. Market share remains flat at ~22%.',
    hiddenDataPoints: [
      {
        category: 'Revenue Breakdown',
        questionTrigger: ['revenue', 'volume', 'price', 'product mix', 'sales by category'],
        disclosure: 'Overall revenue is up 6%, but product mix has shifted dramatically: High-margin premium biscuits (gross margin 42%) sales dropped 14%, while low-margin entry-level snacks (gross margin 18%) grew 28% due to aggressive trade discounting.'
      },
      {
        category: 'Cost - Raw Materials & Packaging',
        questionTrigger: ['raw material', 'cogs', 'input costs', 'packaging', 'palm oil', 'wheat'],
        disclosure: 'Key raw material costs (palm oil, flour, sugar) rose by 12% industry-wide. Competitors passed on price increases via shrinkflation (reducing grammage from 100g to 90g while keeping ₹10 price point). Apex kept grammage unchanged to chase volume, absorbing the entire commodity surge.'
      },
      {
        category: 'Supply Chain & Distribution',
        questionTrigger: ['freight', 'distribution', 'logistics', 'warehousing', 'trade margins'],
        disclosure: 'Freight and warehousing costs increased from 7% of sales to 10.5% of sales. Apex expanded into East India with 2 new regional hubs operating at only 35% capacity utilization, resulting in high fixed logistics overhead.'
      },
      {
        category: 'Sales & Marketing Expense',
        questionTrigger: ['marketing', 'advertising', 'trade schemes', 'discounts', 'promotions'],
        disclosure: 'Trade promotion spend (dealer margins and cash discounts to distributors) jumped from 5% to 9% of gross revenue to push the low-margin snack brand into competitive rural markets.'
      },
      {
        category: 'Competitor Actions',
        questionTrigger: ['competitor', 'industry trends', 'pricing comparison'],
        disclosure: 'Leading rival Britannia/Parle executed a 10% grammage reduction on flagship SKUs and focused trade spend on high-margin cookies rather than budget wafers.'
      }
    ],
    referenceFramework: [
      'Profit = Revenue - Total Costs',
      'Revenue = Price * Volume (Decomposed by Product Category: Premium Biscuits vs Mass Snacks)',
      'Costs = COGS (Raw materials, packaging, yield) + Supply Chain (Freight, warehousing) + SG&A (Trade promotions, overheads)'
    ],
    rootCause: 'Double-squeeze: (1) Unfavorable product mix shift to low-margin snacks accelerated by expensive trade discounts, and (2) Failure to execute grammage reduction (shrinkflation) on commodity-sensitive SKUs unlike rivals, compounded by unoptimized underutilized eastern logistics hubs.',
    recommendedActions: [
      'Implement tactical pack-size redesign (shrinkflation 8-10%) on mass snacks to protect gross margins without changing consumer price points.',
      'Rationalize trade promotion discounts: tie dealer rebates directly to high-margin premium biscuit sales rather than budget snacks.',
      'Consolidate underutilized East India warehouses: shift to 3PL (third-party logistics) model to convert fixed warehouse expenses into variable per-case costs.',
      'Relaunch premium biscuit marketing campaigns with focused modern trade promotions.'
    ],
    risksAndNextSteps: [
      'Risk of customer backlash if shrinkflation is abrupt; mitigate via packaging refresh highlighting recipe improvements.',
      'Distributor pushback on lower trade margins; provide volume-based milestone tiers.'
    ],
    casebookReference: 'FMS Casebook 2025-26, Part D — Profitability Case 1 (FMCG)'
  },
  {
    id: 'case-ev-market-entry',
    title: 'Market Entry Strategy for Global EV Two-Wheeler in India',
    type: 'Market Entry',
    industry: 'Automotive & EV',
    difficulty: 'Intermediate',
    prompt: 'VoltMotors, a prominent European electric scooter manufacturer known for sleek premium design and smart connected dashboards, is evaluating whether and how to enter the Indian two-wheeler market. The board has asked us to assess market attractiveness, identify the optimal entry mode, and develop a 3-year Go-to-Market strategy.',
    clientContext: 'VoltMotors currently manufactures and sells ~120,000 premium e-scooters in Germany, France, and Spain with an average retail price of €3,200 (~₹2.8 Lakh). They have advanced proprietary battery management systems (BMS) and smart software.',
    initialClarifications: 'Target horizon is 3 years. The client is seeking profitable scale (targeting at least 5% market share of Indian EV 2Ws by Year 3). They have €50M capital allocated for this entry.',
    hiddenDataPoints: [
      {
        category: 'Market Size & Growth',
        questionTrigger: ['market size', 'growth rate', 'tam', 'volume', 'projections'],
        disclosure: 'Indian 2W market is ~18M units annually. EV share is ~5% (~900k units) and projected to reach 20% (~4M units) in 5 years. However, 80% of current EV sales fall in the ₹1.0L - ₹1.4L price bracket (Ather 450, TVS iQube, Ola S1). The super-premium segment (>₹2.0L) represents less than 4% of volume.'
      },
      {
        category: 'Customer Preferences & Requirements',
        questionTrigger: ['customer', 'preferences', 'willingness to pay', 'use case', 'charging'],
        disclosure: 'Indian buyers prioritize: (1) Range (minimum 100 km real-world), (2) Durability under rough road and high heat/monsoon conditions, (3) Removable battery or easy home charging (since 70% park in apartments/outdoors without private plugs), and (4) Resale value & service network.'
      },
      {
        category: 'Regulatory & Import Duties',
        questionTrigger: ['regulation', 'import duty', 'cbu', 'ckd', 'fame', 'subsidies', 'pli'],
        disclosure: 'CBU (Completely Built Up) imported units attract 100% customs tariff, pushing VoltMotors retail price to ₹5.5L+ (unviable). Local CKD assembly or domestic manufacturing is mandatory to qualify for lower 5% GST and potential state EV incentives.'
      },
      {
        category: 'Competitive Landscape',
        questionTrigger: ['competitor', 'ola', 'ather', 'tvs', 'bajaj', 'market share'],
        disclosure: 'Market is intensely competitive: Ola and TVS hold ~50% combined share with massive dealer footprints (1,000+ touchpoints). Ather holds the premium tech segment. Pure imported brands like Gogoro have struggled without domestic localization.'
      },
      {
        category: 'Partnership & Supply Chain Options',
        questionTrigger: ['partner', 'joint venture', 'local manufacturing', 'battery sourcing'],
        disclosure: 'A prominent Indian automotive Tier-1 supplier (with existing chassis welding and assembly plants in Pune) is interested in a 50:50 Joint Venture to localize VoltMotors platform and source cells domestically.'
      }
    ],
    referenceFramework: [
      'Market Attractiveness (Market size, growth, customer segment, profitability)',
      'Financial & Operational Feasibility (Cost to serve, pricing viability, localization)',
      'Entry Mode Evaluation (Organic greenfield vs Acquisition vs Joint Venture / Contract Mfg)',
      'Go-to-Market Strategy (Target segment, product adaptation, distribution channels, charging ecosystem)'
    ],
    rootCause: 'Direct CBU export of European €3,200 model is economically dead in India due to 100% tariffs and price sensitivity. Success requires localized re-engineering for Indian thermal conditions, removable battery packs, and a Joint Venture entry mode.',
    recommendedActions: [
      'Enter via a 50:50 Joint Venture with an established Indian Tier-1 automotive manufacturer to bypass the 100% CBU duty and utilize existing assembly capacity.',
      'Re-engineer a localized "Volt India" variant priced at ₹1.45L - ₹1.65L (premium commuter) retaining core connected software while using locally sourced prismatic LFP cells and ruggedized suspension.',
      'Target top 8 metros first (Bengaluru, Pune, Delhi NCR, Hyderabad, Chennai) where apartment infrastructure and tech-affinity are highest.',
      'Launch company-owned experience studios paired with authorized service franchises and bundled smart home portable chargers.'
    ],
    risksAndNextSteps: [
      'Thermal runaway risks under 45°C Indian summers (must rigorously test BMS under local conditions).',
      'JV partner alignment on brand control and IP protection.'
    ],
    casebookReference: 'FMS Casebook 2025-26, Part D — Market Entry Case 4 (Automotive / EV)'
  },
  {
    id: 'case-saas-churn-growth',
    title: 'Growth Acceleration & Churn Reduction at CloudSphere',
    type: 'Growth Strategy',
    industry: 'Technology & SaaS',
    difficulty: 'Advanced',
    prompt: 'CloudSphere is a B2B SaaS company offering AI-powered customer support ticketing and workflow automation to mid-market enterprises. Over the past 12 months, ARR (Annual Recurring Revenue) growth has slowed from 65% YoY to 18%, and net revenue retention (NRR) has slipped from 115% to 88%. The Founders want us to diagnose why customers are leaving and design a scalable growth strategy.',
    clientContext: 'CloudSphere has 650 active customers with an average contract value (ACV) of $45,000/year. Their software integrates with CRM systems like Salesforce and Zendesk.',
    initialClarifications: 'Gross new logo additions remain healthy (up 22%), but churn and customer contraction have wiped out new ARR gains. Sales cycle is approximately 3 to 4 months.',
    hiddenDataPoints: [
      {
        category: 'Churn Cohort Analysis',
        questionTrigger: ['cohort', 'churn breakdown', 'which customers', 'segmentation', 'acv'],
        disclosure: 'Segmenting by customer tier reveals: Enterprise accounts ($80k+ ACV) churn at only 5% with 125% NRR. Small mid-market accounts ($20k-$35k ACV) are churning at 34% annually! 70% of those churns occur within months 4 through 8 post-onboarding.'
      },
      {
        category: 'Product Usage & Telemetry',
        questionTrigger: ['usage', 'adoption', 'features', 'telemetry', 'engagement', 'nps'],
        disclosure: 'Telemetry shows customers who actively configure at least 3 custom automated workflows log in daily and have a 95% retention rate. However, 62% of mid-market customers never complete setup of their second workflow due to complex technical API documentation and lack of dedicated onboarding specialists.'
      },
      {
        category: 'Pricing & Packaging Structure',
        questionTrigger: ['pricing', 'seats', 'usage based', 'tier', 'contract terms'],
        disclosure: 'CloudSphere charges per-seat licensing with a mandatory 1-year upfront commitment. When economic headwinds hit, mid-market customers downsizing support staff could not downscale seats and cancelled entire renewals.'
      },
      {
        category: 'Customer Success & Support',
        questionTrigger: ['customer success', 'csm', 'support', 'onboarding team'],
        disclosure: 'CSM ratio is 1 Customer Success Manager per 85 accounts for mid-market (industry best practice is 1:25). The CSMs are reactive ticket resolvers rather than proactive adoption coaches.'
      }
    ],
    referenceFramework: [
      'Growth = New Customer Acquisition + Expansion ARR (Upsell/Cross-sell) - Churned ARR',
      'Churn Decomposition: Why (Product/Onboarding/Pricing) * Who (Customer Segment) * When (Lifecycle Timing)',
      'Remediation: Product-Led Onboarding + Customer Success Re-architecting + Packaging Revamp'
    ],
    rootCause: 'Premature customer drop-off during the critical 90-day onboarding window due to excessive configuration complexity and overloaded CSMs, combined with rigid per-seat licensing that triggered mid-market contract cancellations during client layoffs.',
    recommendedActions: [
      'Introduce guided "Time-to-Value" automated onboarding templates and pre-built CRM recipe integrations to get users to 3 active workflows within 14 days.',
      'Restructure pricing to a hybrid model: Lower base platform seat fee + consumption-based pricing per automated ticket resolved, allowing clients to flex volume without full cancellation.',
      'Reorganize Customer Success: Reallocate CSMs into high-touch onboarding specialists for days 1-60, driving proactive milestone check-ins.',
      'Focus sales team on the resilient Upper Mid-Market and Enterprise segment ($50k+ ACV) where product-market fit and NRR are already 125%.'
    ],
    risksAndNextSteps: [
      'Short-term margin compression while staffing dedicated onboarding engineers.',
      'Billing migration friction for existing customers transitioning to hybrid consumption pricing.'
    ],
    casebookReference: 'FMS Casebook 2025-26, Part D — Growth Strategy Case 7 (B2B SaaS)'
  },
  {
    id: 'case-pricing-oncology',
    title: 'Pricing Strategy for Novel Oncology Therapeutic Drug',
    type: 'Pricing',
    industry: 'Pharmaceuticals',
    difficulty: 'Advanced',
    prompt: 'BioVance, a global biopharmaceutical company, has received FDA and EMA fast-track approval for "OncoCure", a breakthrough targeted therapy for metastatic colorectal cancer. Phase-3 clinical trials demonstrate a 40% increase in median progression-free survival (from 9 months to 15.5 months) with 30% fewer adverse side effects than the current standard of care. The Chief Commercial Officer needs a launch pricing recommendation for the US and European markets.',
    clientContext: 'R&D investment over 8 years totaled $1.2 Billion. The drug is administered via an intravenous bi-weekly infusion over an average 6-month treatment course. Patent protection extends for 11 years.',
    initialClarifications: 'Current standard-of-care regimen (FOLFOX + Bevacizumab) costs ~$12,000 per month (~$72,000 for a 6-month cycle). The drug has received orphan drug designation in a sub-population of 45,000 eligible annual patients in the US and 55,000 in the EU.',
    hiddenDataPoints: [
      {
        category: 'Cost-Based Baseline',
        questionTrigger: ['cogs', 'cost to produce', 'manufacturing cost', 'r&d amortization'],
        disclosure: 'Active pharmaceutical ingredient (API) and sterile fill-finish manufacturing cost is only $650 per monthly dose ($3,900 per 6-month course). Cost-plus pricing is entirely irrelevant for innovative oncology therapeutics; pricing must be value-based.'
      },
      {
        category: 'Value-Based Economic Quantification',
        questionTrigger: ['health economics', 'qaly', 'value of life', 'hospitalization savings', 'efficacy'],
        disclosure: 'Health economic studies show OncoCure provides 0.54 Quality-Adjusted Life Years (QALY) gained. Furthermore, lower toxicity reduces emergency hospital admissions for neutropenia and sepsis by 2.4 days on average, saving insurers $18,500 in inpatient costs per patient.'
      },
      {
        category: 'Payer & Reimbursement Landscape',
        questionTrigger: ['insurance', 'payers', 'medicare', 'reimbursement', 'pbm', 'nice', 'germany'],
        disclosure: 'In the US, private payers and Medicare Part B accept pricing up to $150,000/QALY ($81,000 value surplus). However, in Europe (NICE in UK, G-BA in Germany), strict health technology assessment thresholds reject treatments exceeding €45,000/QALY unless risk-sharing outcomes agreements are signed.'
      },
      {
        category: 'Competitor Pipeline',
        questionTrigger: ['competitor pipeline', 'patent', 'next generation', 'biosimilars'],
        disclosure: 'A rival drug from Roche is in Phase-2 trials, expected to reach the market in 3 to 4 years. OncoCure will have a 3-year monopoly window in this molecular indication.'
      }
    ],
    referenceFramework: [
      '3 Core Pricing Approaches: Cost-based (Floor) vs Competitor-based (Benchmark) vs Value-based (Ceiling)',
      'Value Surplus = Economic Value to Customer (EVC) = Reference Price + Positive Differentiation Value - Negative Differentiation Value',
      'Payer Willingness to Pay & Regional Tiering (US private/Medicare vs European Single-Payer Health Authorities)'
    ],
    rootCause: 'Value-based pricing unlocks enormous enterprise value because OncoCure delivers both prolonged life (+6.5 months survival) and direct hospital cost avoidance ($18.5k savings). Pricing must capture a fair share of this economic surplus while complying with regional reimbursement ceilings.',
    recommendedActions: [
      'US Market: Price at $18,500/month ($111,000 for full 6-month course). This represents a 54% premium over standard of care ($72k), justified by $18.5k inpatient hospital savings and 0.54 QALY gain ($81k economic value), leaving $27k net surplus for the healthcare system.',
      'European Market: Adopt a tiered single-payer launch price of €12,500/month (~€75,000 per course) paired with Value-Based Outcome Risk Sharing (rebate granted if patient disease progresses within first 3 months).',
      'Establish comprehensive patient co-pay assistance and manufacturer assistance programs to ensure zero out-of-pocket abandonment for insured individuals.',
      'Secure prime placement on NCCN (National Comprehensive Cancer Network) Category 1 Preferred Treatment guidelines.'
    ],
    risksAndNextSteps: [
      'Public backlash over oncology drug pricing if co-pay programs are poorly communicated.',
      'Payer pushback demanding step-therapy through cheaper generic FOLFOX first.'
    ],
    casebookReference: 'FMS Casebook 2025-26, Part D — Pricing Framework Case 2 (Pharma)'
  },
  ...COMPREHENSIVE_FMS_CASES
];

export const CONCEPTS_LIBRARY: ConceptItem[] = [
  {
    id: 'c-3cs',
    title: 'The 3Cs Framework',
    category: 'Frameworks',
    definition: 'A fundamental strategic framework developed by Kenichi Ohmae that analyzes business strategy through three critical stakeholders: Company, Customers, and Competitors.',
    keyPoints: [
      'Company: Core competencies, brand equity, cost structure, financial strength, operational capacity.',
      'Customers: Market segmentation, purchasing drivers, unmet needs, price sensitivity, customer lifetime value.',
      'Competitors: Market share, competitive moats, pricing strategies, product differentiation, barriers to entry.'
    ],
    whenToUse: 'Initial case scoping, qualitative business assessment, and evaluating overall strategic market position before deep-diving into numbers.',
    example: 'Evaluating why an artisanal coffee chain is losing customers: Analyze Company (rising coffee bean costs), Customers (preference shifting toward quick cold brews), and Competitors (aggressive expansion of affordable drive-thru brands).',
    commonMistakes: [
      'Treating the 3Cs as a rigid checklist rather than exploring the dynamic interaction between them.',
      'Neglecting the regulatory or channel partners (often extended to 4Cs or 5Cs by adding Collaborators/Climate).'
    ],
    casebookReference: 'FMS Casebook 2025-26, Part B — Core Frameworks, Page 12'
  },
  {
    id: 'c-porter-5',
    title: "Porter's Five Forces",
    category: 'Frameworks',
    definition: 'A structural tool created by Michael Porter to determine industry attractiveness, long-term profitability, and competitive intensity.',
    keyPoints: [
      '1. Threat of New Entrants (capital requirements, economies of scale, brand loyalty, regulatory barriers).',
      '2. Bargaining Power of Buyers (switching costs, buyer concentration, backward integration threat).',
      '3. Bargaining Power of Suppliers (supplier concentration, uniqueness of input, forward integration threat).',
      '4. Threat of Substitutes (price-performance trade-off of alternative technologies or habits).',
      '5. Rivalry Among Existing Competitors (industry growth rate, exit barriers, fixed cost burden, product parity).'
    ],
    whenToUse: 'Market entry cases, M&A due diligence, and assessing whether an industry inherently produces high or low ROIC.',
    example: 'Commercial Aviation exhibits notoriously low profitability: High supplier power (Boeing/Airbus, jet fuel cartels, airport slots), high buyer power with zero switching costs, intense rivalry and high exit barriers.',
    commonMistakes: [
      'Confusing a company\'s internal operational issues with industry-level structural attractiveness.',
      'Assuming high growth equals high profitability (rivalry can erode all gains).'
    ],
    casebookReference: 'FMS Casebook 2025-26, Part B — Industry Analysis, Page 16'
  },
  {
    id: 'c-mece',
    title: 'MECE Principle (Mutually Exclusive, Collectively Exhaustive)',
    category: 'Consulting Basics',
    definition: 'A systematic structuring standard pioneered by McKinsey where any problem breakdown must partition all components without overlap (Mutually Exclusive) and without missing any factor (Collectively Exhaustive).',
    keyPoints: [
      'Mutually Exclusive: No duplication or double-counting between categories.',
      'Collectively Exhaustive: The categories together cover 100% of the universe.',
      'Standard MECE splits: Internal vs External, Supply vs Demand, Fixed vs Variable, Revenue vs Cost, Short-term vs Long-term.'
    ],
    whenToUse: 'Every single guesstimate and case issue tree from the very first minute of structuring.',
    example: 'Segmenting India\'s population: Age (0-14, 15-24, 25-59, 60+) is MECE. Segmenting into "Students, Working Professionals, and Women" is NOT MECE because they overlap.',
    commonMistakes: [
      'Creating overlapping buckets that confuse calculations.',
      'Missing a major dimension (e.g. estimating retail sales but forgetting corporate B2B sales).'
    ],
    casebookReference: 'FMS Casebook 2025-26, Part C — Basics of Case Solving, Page 38'
  },
  {
    id: 'c-profitability-tree',
    title: 'Profitability Deconstruction Tree',
    category: 'Frameworks',
    definition: 'The cornerstone consulting issue tree breaking Operating Profit into Revenue minus Costs, followed by mathematical disaggregation into unit volume, pricing, and cost line items.',
    keyPoints: [
      'Profit = Total Revenue - Total Costs.',
      'Total Revenue = Price * Volume (segmented by Product Line, Geography, or Customer Tier).',
      'Total Costs = Fixed Costs (Rent, SG&A, Depreciation, R&D) + Variable Costs (COGS, direct labor, packaging, freight, commissions).',
      'Volume drivers = Market Size * Market Share.',
      'Cost per unit = Raw material index + conversion efficiency + scrap rate + logistics rate.'
    ],
    whenToUse: 'Any business experiencing margin compression, profit loss, or seeking operational restructuring.',
    example: 'Diagnosing hotel chain profit decline: Segment Revenue into Room RevPAR (Occupancy Rate * Average Daily Rate) + Food & Beverage + Banqueting/Events. Segment Costs into Staffing, Energy/Utilities, Housekeeping consumables, and Franchise/OTA commissions.',
    commonMistakes: [
      'Jumping into cost-cutting recommendations before diagnosing whether the problem stems from price realization or unit volume.',
      'Treating fixed costs as variable or ignoring step-fixed capacity jumps.'
    ],
    casebookReference: 'FMS Casebook 2025-26, Part D — Profitability Framework, Page 48'
  },
  {
    id: 'c-pricing-approaches',
    title: 'The 3 Pillars of Pricing',
    category: 'Business Concepts',
    definition: 'A comprehensive methodology for establishing product pricing through Cost-based (Floor), Competitor-based (Benchmark), and Value-based (Ceiling) perspectives.',
    keyPoints: [
      '1. Cost-Plus (Floor): Calculates unit COGS + allocated overheads + minimum hurdle return. Sets the absolute floor below which the business bleeds cash.',
      '2. Competitor / Market-Benchmark: Benchmarks against close substitutes, adjusting for feature differentials and brand equity premium/discount.',
      '3. Value-Based (Ceiling): Quantifies the Economic Value to Customer (EVC) = Savings generated or extra revenue earned by the buyer using this solution over the next best alternative.'
    ],
    whenToUse: 'New product launches, patent commercialization, software packaging, and bidding situations.',
    example: 'A B2B automated inspection camera costs $500 to build (Cost floor). Manual inspectors cost $60,000/yr with a 2% defect scrap loss costing $40,000 (Value created = $100k/yr). Pricing at $35,000 captures massive margin while delivering $65k net ROI to the buyer.',
    commonMistakes: [
      'Using cost-plus pricing for breakthrough high-margin innovations with high R&D.',
      'Failing to consider customer willingness-to-pay and switching friction.'
    ],
    casebookReference: 'FMS Casebook 2025-26, Part D — Pricing Strategy, Page 62'
  },
  {
    id: 'c-roic-tree',
    title: 'Return on Invested Capital (ROIC) Tree',
    category: 'Finance & Accounting',
    definition: 'The premier corporate finance tree decomposing ROIC into NOPAT Margin (operating profitability) multiplied by Invested Capital Turnover (capital efficiency).',
    keyPoints: [
      'ROIC = NOPAT / Invested Capital = (NOPAT / Revenue) * (Revenue / Invested Capital).',
      'Operating Margin Drivers: Gross margin, operating leverage, SG&A discipline, tax efficiency.',
      'Capital Turnover Drivers: Working Capital management (Days Sales Outstanding, Days Inventory, Days Payable Outstanding) + Fixed Asset Turnover (Capex utilization).'
    ],
    whenToUse: 'Private equity due diligence, shareholder value creation, and long-term corporate turnaround mandates.',
    example: 'Retailers like Costco win not on high gross margins (only 11-13%), but on explosive inventory turnover (turning stock 12x per year on negative working capital), yielding massive ROIC.',
    commonMistakes: [
      'Focusing solely on P&L margins while ignoring capital tied up in slow-moving inventory or uncollected receivables.',
      'Confusing ROE (which is leveraged by debt) with true operational ROIC.'
    ],
    casebookReference: 'FMS Casebook 2025-26, Part B — Corporate Finance & Valuation, Page 28'
  }
];

export const QUIZ_BANK: QuizQuestion[] = [
  {
    id: 'q-1',
    category: 'Frameworks',
    type: 'scenario',
    question: 'A consumer packaged goods company is launching an organic kombucha beverage in Tier-1 Indian cities where modern trade shelf space is already dominated by global soda brands and distribution is the single biggest bottleneck. Which dimension of the 4Ps should you investigate FIRST, and why?',
    options: [
      'Price: Underprice existing colas to drive immediate consumer trial.',
      'Promotion: Run massive celebrity-led influencer campaigns on Instagram.',
      'Place (Distribution): Secure cold-chain logistics and negotiated slotting allowances in premium supermarkets and quick commerce dark stores.',
      'Product: Add synthetic preservatives to lengthen shelf-life to 18 months.'
    ],
    correctAnswer: 2,
    explanation: 'When distribution is the stated primary bottleneck, Place takes precedence. Perishable beverages require continuous cold-chain management and slotting arrangements in gourmet groceries (Nature\'s Basket, Foodhall) and Q-commerce (Blinkit/Zepto). Without guaranteed shelf and cold storage presence, promotional spend is completely wasted.',
    casebookReference: 'FMS Casebook 2025-26, Part B — 4Ps Marketing Framework',
    interviewTip: 'Always link your framework priority directly to the client\'s critical operational constraint rather than going in rote "P-P-P-P" alphabetical order.'
  },
  {
    id: 'q-2',
    category: 'Guesstimate Concepts',
    type: 'mcq',
    question: 'When asked to estimate the daily revenue of a bustling Starbucks store located inside a high-traffic metro transit airport terminal, which starting approach is generally most structured and defensible?',
    options: [
      'Top-down from India\'s national GDP and coffee consumption per capita.',
      'Supply-side / Capacity bottleneck based on operational espresso machines, cashier checkout transaction times, and opening hours.',
      'Demand-side assuming every citizen of the city drinks 1 airport coffee per month.',
      'Competitor benchmarking by copying Cafe Coffee Day\'s highway outlet revenue.'
    ],
    correctAnswer: 1,
    explanation: 'Retail outlets with fixed physical footprints and continuous queues during peak flight banks are capacity-constrained systems. A supply-side approach (Cashier service speed, e.g. 90 seconds/order * number of POS counters * operating hours adjusted for peak flight departing waves) gives the most rigorous operational ceiling.',
    casebookReference: 'FMS Casebook 2025-26, Part C — Guesstimate Methodologies',
    interviewTip: 'Identify whether the problem is demand-constrained or capacity-constrained in your first 30 seconds.'
  },
  {
    id: 'q-3',
    category: 'Finance & Accounting',
    type: 'mcq',
    question: 'A client company reports an impressive 25% YoY increase in EBITDA, but its cash balance dropped by 40% and it is now facing an overdraft crisis. What is the most likely root cause in working capital management?',
    options: [
      'Depreciation on old plant machinery increased.',
      'Days Sales Outstanding (DSO) lengthened significantly due to uncollected receivables, paired with excess cash tied up in unsold finished inventory.',
      'The client paid out too many stock options to executives.',
      'Corporate tax rates were lowered by the finance ministry.'
    ],
    correctAnswer: 1,
    explanation: 'EBITDA measures accounting operating profit on an accrual basis, ignoring when cash is actually received. If a firm sells aggressively on 120-day credit terms (high DSO) and manufactures excess buffer stock (high Days Inventory Outstanding), its working capital explodes, devouring operational cash flow despite positive paper EBITDA.',
    casebookReference: 'FMS Casebook 2025-26, Part B — Financial Statement Analysis',
    interviewTip: 'Never treat Profit as Cash. In consulting cases, always scrutinize the Working Capital cycle (DSO + DIO - DPO).'
  },
  {
    id: 'q-4',
    category: 'Case Concepts',
    type: 'scenario',
    question: 'During a profitability case, you discover that the client\'s revenue has grown by 15% but profits fell by 20%. Which mathematical inquiry should you immediately initiate to isolate the revenue contribution?',
    options: [
      'Ask for the CEO\'s personal bonus structure.',
      'Deconstruct Revenue into Price per unit versus Unit Volume across individual product segments to check for adverse mix shift.',
      'Assume all competitors are cutting prices and conclude the industry is dying.',
      'Immediately suggest firing 10% of factory workers.'
    ],
    correctAnswer: 1,
    explanation: 'When revenue rises but margins collapse, the most classic culprit is Product Mix Shift (selling higher volumes of low-margin or discounted items while high-margin cash-cows decline) or severe unrecovered unit cost inflation. Isolating Volume vs Price per segment uncovers the exact driver.',
    casebookReference: 'FMS Casebook 2025-26, Part D — Profitability Tree',
    interviewTip: 'Before jumping to conclusions, always isolate whether the issue is Price-driven, Volume-driven, Mix-driven, or Cost-driven.'
  },
  {
    id: 'q-5',
    category: 'Economics',
    type: 'true_false',
    question: 'True or False: If a luxury handbag brand faces price-inelastic demand (|PED| < 1), raising prices by 10% will increase the brand\'s total dollar revenue.',
    options: [
      'True',
      'False'
    ],
    correctAnswer: 0,
    explanation: 'True. By definition of price inelasticity (|PED| < 1), the percentage drop in quantity demanded will be strictly smaller than the percentage increase in price. Therefore, Total Revenue (Price * Quantity) will rise.',
    casebookReference: 'FMS Casebook 2025-26, Part B — Microeconomics & Elasticity',
    interviewTip: 'Mentioning price elasticity and volume sensitivity demonstrates grounded business intuition in pricing cases.'
  },
  {
    id: 'q-6',
    category: 'Fundamentals',
    type: 'mcq',
    question: 'What does "seeking buy-in" mean in a consulting interview, and why is it critical?',
    options: [
      'Asking the interviewer to pay for your travel expenses.',
      'Explaining your planned structure briefly and checking if the interviewer agrees with the direction before diving into deep calculations.',
      'Never asking any questions and pretending you already know all the data.',
      'Agreeing with everything the interviewer says even if the math is wrong.'
    ],
    correctAnswer: 1,
    explanation: 'Seeking buy-in ("Here is how I plan to break down this problem across three pillars: X, Y, and Z. Does this sound like a reasonable starting point?") ensures alignment, avoids wasting 10 minutes down an irrelevant rabbit hole, and mirrors how real consulting engagements collaborate with client leadership.',
    casebookReference: 'FMS Casebook 2025-26, Part C — Interviewer Engagement & Soft Skills',
    interviewTip: 'Consulting partners look for coachable, collaborative candidates who partner with them during the case rather than solo monologue solvers.'
  }
];

export const BEHAVIOURAL_BANK: BehaviouralQuestion[] = [
  {
    id: 'b-walk-me-cv',
    question: 'Walk me through your resume / Tell me about yourself.',
    category: 'Personal',
    whatInterviewerLooksFor: [
      'Clear, chronological narrative connecting past choices to consulting.',
      'Highlighting marquee spikes (top 1% academic rank, fast-track promotions, leadership positions).',
      'Conciseness: crisp 90 to 120 seconds delivery without reciting line-by-line CV bullets.',
      'Clear motivation: why consulting and why now.'
    ],
    goodStructure: 'Past (Foundation/Undergrad/Early technical or analytical rigor) -> Catalyst (Projects that sparked strategic problem-solving drive) -> Recent (MBA / Leadership impact & cross-functional wins) -> Future (Why consulting is the logical, high-energy next step).',
    trapsToAvoid: [
      'Reciting dates and titles mechanically.',
      'Rambling past 2.5 minutes.',
      'Sounding unfocused or unsure about consulting interest.'
    ],
    sampleProbingQuestions: [
      'What was the single most difficult decision you had to make in your last role?',
      'Why did you choose your undergrad college, and what would you do differently if given a chance?'
    ]
  },
  {
    id: 'b-why-consulting',
    question: 'Why do you want to pursue management consulting?',
    category: 'Fit for Consulting',
    whatInterviewerLooksFor: [
      'Specific, authentic reasons beyond generic buzzwords ("steep learning curve", "variety of projects").',
      'Demonstrated understanding of what a day-in-the-life of a consultant actually entails (structured client interviews, hypothesis testing, synthesis under ambiguity).',
      'Evidence that past experiences align with analytical rigor and stakeholder influence.'
    ],
    goodStructure: '3 Concrete Pillars: (1) Breadth of high-stakes strategic exposure across industries, (2) Apprenticeship culture and high-caliber peer problem-solving, (3) Measurable tangible impact working directly with C-suite decision-makers.',
    trapsToAvoid: [
      'Saying "I want to travel" or "I get bored easily doing one job".',
      'Giving cookie-cutter textbook answers without personal anecdotes.'
    ],
    sampleProbingQuestions: [
      'Consulting involves grueling 65-70 hour weeks and difficult client pushback. Tell me about a time you handled sustained pressure and delivered.',
      'Which practice or industry sector at our firm excites you most, and what current trend are you tracking there?'
    ]
  },
  {
    id: 'b-leadership-conflict',
    question: 'Tell me about a time you faced intense conflict within a team and how you resolved it.',
    category: 'Leadership & Teamwork',
    whatInterviewerLooksFor: [
      'High emotional intelligence (EQ) and active listening.',
      'Focusing on objective data and shared mission rather than personal egos.',
      'Clear personal agency: what specific action did YOU take to bridge the impasse?',
      'Long-term outcome: was team morale and relationship preserved post-conflict?'
    ],
    goodStructure: 'STAR: Situation (Context & high stakes) -> Task (The diverging viewpoints creating deadlock) -> Action (How you brought objective fact base, created a safe space, or developed a hybrid compromise) -> Result (Quantifiable outcome & personal learning).',
    trapsToAvoid: [
      'Blaming teammates or portraying yourself as a flawless hero dealing with incompetent colleagues.',
      'Picking a trivial dispute with no real stakes.'
    ],
    sampleProbingQuestions: [
      'If the other person were sitting here, how would they describe your behavior during that discussion?',
      'What would you do differently in retrospect?'
    ]
  },
  {
    id: 'b-failure-adversity',
    question: 'Describe a significant professional failure or mistake you made. What did you learn?',
    category: 'Adversity & Failure',
    whatInterviewerLooksFor: [
      'Genuine vulnerability and accountability (avoiding fake "humble-brags" like "I worked too hard").',
      'Root-cause reflection: why did the mistake occur (flawed assumption, lack of communication)?',
      'Concrete corrective systemic behavior implemented afterward.'
    ],
    goodStructure: 'The Incident (Honest summary of the project shortfall) -> The Immediate Recovery (How you mitigated damage and took ownership with leadership) -> The Systematic Introspection (What blindspot was revealed) -> The Permanent Fix (A specific process or mindset change applied to future projects with successful proof).',
    trapsToAvoid: [
      'Blaming external factors or bad luck.',
      'Picking a catastrophic ethical violation or conversely a trivial non-failure.',
      'Failing to show meaningful evolution.'
    ],
    sampleProbingQuestions: [
      'How did that experience change how you manage risk today?',
      'Who held you accountable, and how did you communicate the failure to key stakeholders?'
    ]
  }
];

export const RAPID_FIRE_QUESTIONS = [
  { q: 'What does MECE stand for and why is it fundamental?', timeLimitSec: 20 },
  { q: 'In one sentence, what is the difference between Revenue Growth and ROIC?', timeLimitSec: 25 },
  { q: 'When would you use a Value-Based pricing approach over Cost-Plus?', timeLimitSec: 25 },
  { q: 'What are the two major components of a Return on Invested Capital (ROIC) tree?', timeLimitSec: 25 },
  { q: 'If client profit dropped 15% while revenue rose 10%, what is the first hypothesis to check?', timeLimitSec: 25 },
  { q: 'What is the estimated population and number of households in India?', timeLimitSec: 20 },
  { q: 'What is the difference between Top-Down and Bottom-Up guesstimates?', timeLimitSec: 25 },
  { q: 'How does high supplier bargaining power depress an industry\'s profitability according to Porter?', timeLimitSec: 25 },
  { q: 'Give an example of a Step-Fixed Cost in manufacturing.', timeLimitSec: 20 },
  { q: 'Why do consulting interviewers ask you to "seek buy-in" before calculating?', timeLimitSec: 25 }
];

export const ALL_GUESSTIMATES: GuesstimateItem[] = [
  ...GUESSTIMATE_BANK,
  ...ADDITIONAL_GUESSTIMATES
];

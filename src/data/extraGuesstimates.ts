import { GuesstimateItem } from '../types';

export const ADDITIONAL_GUESSTIMATES: GuesstimateItem[] = [
  {
    id: 'g-electricity',
    title: 'Daily Electricity Consumption in India',
    category: 'Consumer Goods',
    difficulty: 'Advanced',
    question: 'Estimate the total daily electricity consumption (in Kilowatt-hours or Terawatt-hours) in India.',
    objective: 'Estimate daily power consumed across industrial, commercial, and residential sectors.',
    suggestedApproach: 'Hybrid',
    benchmarkNumbers: [
      { label: 'Installed Capacity', value: '~430-450 Gigawatts (GW)' },
      { label: 'Plant Load Factor (PLF)', value: '~55-60%' },
      { label: 'Household Power Use', value: '~3-5 units (kWh) per day for average electrified household' }
    ],
    referenceSolution: {
      steps: [
        'Method 1 (Supply-side): Average generation ~180-200 GW continuous peak. In 24 hours: 190 GW * 24h = ~4,500 GWh (4.5 Billion kWh) per day.',
        'Method 2 (Demand-side): Residential (300M households * 4 kWh/day = 1.2B kWh = 25%), Industrial & Manufacturing (45% = 2.1B kWh), Commercial offices & retail (15% = 0.7B kWh), Agricultural irrigation pumps (15% = 0.7B kWh).',
        'Total daily consumption = ~4.7 Billion kWh (4.7 TWh / day).'
      ],
      finalNumber: '~4.5 - 5.0 Billion kWh (TWh) per day',
      keyAssumptions: ['Sectoral split (Industrial 45%, Domestic 25%, Agriculture 15%, Commercial 15%)', 'Daily load factor'],
      sanityCheckMethod: 'National Power Grid records peak daily demand of ~240 GW and total annual generation of ~1,600 Billion units (kWh), giving ~4.4-4.8B kWh/day.',
      casebookReference: 'FMS Casebook 2025-26, Part C — Practice Guesstimate 1'
    },
    interviewerTips: ['See if candidate separates residential from industrial/commercial power, as residential is only ~25% of grid demand!']
  },
  {
    id: 'g-smart-watches',
    title: 'Smart Watches Market in India',
    category: 'Media & Tech',
    difficulty: 'Intermediate',
    question: 'Estimate the annual unit sales of smart watches (wearables) in India.',
    objective: 'Determine yearly unit sales across budget wearables (Noise, Fire-Boltt, boAt) and premium (Apple, Samsung).',
    suggestedApproach: 'Top-down',
    benchmarkNumbers: [
      { label: 'Smartphone Users', value: '~650 Million' },
      { label: 'Youth & Tech Adopters', value: '18-40 years age bracket ~350 Million' },
      { label: 'Annual Replacement / New Adoption', value: '~10-12% annual buyer penetration' }
    ],
    referenceSolution: {
      steps: [
        'Segment India\'s 650M smartphone users by ability to purchase smart watch (ASP ₹1,500 to ₹35,000).',
        'Target addressable cohort: Urban + Tech-inclined youth/professionals = ~180 Million.',
        'Penetration of smartwatch ownership: ~20% of cohort = ~36 Million current device owners.',
        'Annual purchases (New first-time adopters + replacements every 2 years): ~18M replacements + ~14M first-time buyers = ~32 Million units sold annually.'
      ],
      finalNumber: '~30 - 35 Million units per year',
      keyAssumptions: ['Smartphone baseline', 'Fast adoption driven by sub-₹2,000 budget models (Noise/boAt)', '2-year replacement cycle'],
      sanityCheckMethod: 'IDC wearable tracker reports India smartwatch shipments at ~35-38 Million units, ranking India as the largest smartwatch market by volume globally.',
      casebookReference: 'FMS Casebook 2025-26, Part C — Practice Guesstimate 5'
    },
    interviewerTips: ['Probe on price points: budget Indian brands drive 80%+ of volume vs Apple Watch.']
  },
  {
    id: 'g-smokers',
    title: 'Number of Cigarette Smokers in India',
    category: 'Consumer Goods',
    difficulty: 'Intermediate',
    question: 'Estimate the total number of regular cigarette smokers in India.',
    objective: 'Estimate individual adult population regularly purchasing manufactured cigarettes (excluding pure bidi smokers).',
    suggestedApproach: 'Demand-side',
    benchmarkNumbers: [
      { label: 'Adult Population (18+ yrs)', value: '~950 Million' },
      { label: 'Gender Split', value: '52% Male (~494M) : 48% Female (~456M)' },
      { label: 'Tobacco vs Cigarette Use', value: 'High tobacco chewing/bidi use in rural; manufactured cigarettes concentrated in urban/semi-urban males' }
    ],
    referenceSolution: {
      steps: [
        'Adult population: 950 Million. Male: ~490M, Female: ~460M.',
        'Overall tobacco prevalence: ~28% (GATS survey), but majority use smokeless tobacco (gutkha, khaini) or bidis.',
        'Manufactured cigarette smokers by demographic: Urban males (170M) have ~22% smoking cigarette rate = 37.4M. Rural males (320M) have ~8% cigarette rate (prefer bidis) = 25.6M. Adult females (460M) have ~2% cigarette rate = ~9.2M.',
        'Total regular cigarette smokers = 37.4M + 25.6M + 9.2M = ~72 Million individuals.'
      ],
      finalNumber: '~70 - 75 Million regular cigarette smokers',
      keyAssumptions: ['Gender and urban/rural cultural usage variation', 'Distinction between manufactured cigarettes vs bidis/smokeless tobacco'],
      sanityCheckMethod: 'ITC sells ~85-90 Billion cigarette sticks annually. At average 3.5 sticks/smoker/day (~1,270 sticks/yr), this implies ~70 Million smokers, verifying the estimate.',
      casebookReference: 'FMS Casebook 2025-26, Part C — Practice Guesstimate 6'
    },
    interviewerTips: ['Ensure candidate does not assume 50% of the entire population smokes, or overlook bidis in rural India.']
  },
  {
    id: 'g-tt-balls-delhi',
    title: 'Table Tennis Balls Sold Annually in Delhi',
    category: 'Urban & Retail',
    difficulty: 'Intermediate',
    question: 'Estimate the annual number of Table Tennis (TT) balls sold in Delhi NCR.',
    objective: 'Calculate consumer, school, club, and tournament demand for TT ping-pong balls.',
    suggestedApproach: 'Demand-side',
    benchmarkNumbers: [
      { label: 'Delhi NCR Population', value: '32 Million' },
      { label: 'TT Tables Installed', value: 'In schools, sports complexes, universities, residential clubhouses, IT offices' },
      { label: 'Ball Breakage Rate', value: 'TT balls crack/dent easily (avg 1 ball per 10-15 playing hours)' }
    ],
    referenceSolution: {
      steps: [
        'Approach via active playing venues: Schools & Colleges (4,000 schools * 1.5 tables = 6,000 tables), Sports Academies & Clubs (500 clubs * 4 tables = 2,000 tables), Residential Clubhouses & IT Corporate offices (2,500 venues * 1 table = 2,500 tables). Total active TT tables: ~10,500.',
        'Table usage hours: Average 2 hours/day for school/corporate; 6 hours/day for academies. Weighted average ~3.5 hours/day.',
        'Total table playing hours/yr = 10,500 tables * 3.5h/day * 300 days = ~11 Million table-hours.',
        'Ball consumption rate: 1 ball lasts ~12 playing hours -> 11M / 12 = ~915,000 balls broken during play.',
        'Add casual household kits & recreational backyard play: +250,000 balls.',
        'Total annual sales = ~1.15 to 1.25 Million TT balls.'
      ],
      finalNumber: '~1.1 - 1.3 Million TT balls per year',
      keyAssumptions: ['Number of active tables across schools/academies/societies', 'Breakage/loss rate per playing hour'],
      sanityCheckMethod: 'Sporting goods retailer inventory checks indicate Delhi NCR sports distributor volume of ~100,000 packs of 12 balls = 1.2M balls/year.',
      casebookReference: 'FMS Casebook 2025-26, Part C — Practice Guesstimate 9'
    },
    interviewerTips: ['Challenge candidate: Can you estimate this by number of tables or by individual players? Which has less variance?']
  },
  {
    id: 'g-white-shirts-delhi',
    title: 'White Formal Shirts Sold Annually in Delhi',
    category: 'Urban & Retail',
    difficulty: 'Intermediate',
    question: 'Estimate the annual number of men\'s white formal shirts sold in Delhi.',
    objective: 'Estimate annual purchases of white formal shirts across office professionals, hospitality workers, and students.',
    suggestedApproach: 'Demand-side',
    benchmarkNumbers: [
      { label: 'Delhi Male Population', value: '~17 Million' },
      { label: 'Working Age Men (20-60 yrs)', value: '~9.5 Million' },
      { label: 'Formal Dress Code Share', value: 'Corporate, Banking, Legal, Hospitality, Govt ~35%' }
    ],
    referenceSolution: {
      steps: [
        'Delhi working age males (20-60): ~9.5 Million.',
        'Occupational split requiring formal wear: White-collar corporate, finance, law, IT, civil service (~30% = 2.85M); Service/hospitality (waiters, hotel staff, drivers, security ~15% = 1.42M). Total formal-wearing cohort: ~4.27M men.',
        'White shirt wardrobe share: White shirts make up ~25% of formal shirts owned (staple color).',
        'Annual replacement: White shirts yellow/stain faster than dark colors; replaced every 1 to 1.5 years (~1.5 white shirts purchased per year per formal worker).',
        'Annual sales from working cohort: 4.27M * 1.5 = ~6.4 Million shirts.',
        'Add school boys uniform white shirts (Class 6-12: ~1.2M boys * 2 shirts/yr = 2.4M).',
        'Total white formal shirts sold = 6.4M + 2.4M = ~8.8 Million shirts/year.'
      ],
      finalNumber: '~8.5 - 9.0 Million shirts annually',
      keyAssumptions: ['Formal workforce size in Delhi NCR', 'White color proportion in wardrobe', 'Higher replacement rate due to collar staining'],
      sanityCheckMethod: 'Delhi garment retail turnover for formal apparel confirms ~8-10M white shirts across branded (Arrow, Louis Philippe, Peter England) and unbranded/tailored segments.',
      casebookReference: 'FMS Casebook 2025-26, Part C — Practice Guesstimate 10'
    },
    interviewerTips: ['Check if candidate remembers school uniform white shirts alongside corporate men\'s wear.']
  },
  {
    id: 'g-departing-flights-igi',
    title: 'Daily Departing Flights from IGI Delhi Airport',
    category: 'Transport & Infrastructure',
    difficulty: 'Intermediate',
    question: 'Estimate the number of commercial flights departing daily from Indira Gandhi International Airport (IGI) Delhi.',
    objective: 'Calculate total scheduled domestic and international passenger and cargo departures per 24 hours.',
    suggestedApproach: 'Supply-side',
    benchmarkNumbers: [
      { label: 'Operational Runways', value: '4 active runways (28/10, 29L/11R, 29R/11L, 27/09)' },
      { label: 'Runway Air Traffic Control (ATC) Capacity', value: 'Peak runway movements ~30-35 movements/hr per active runway pair' },
      { label: 'Terminals', value: 'T1 (low-cost domestic), T2 (domestic), T3 (international + full-service domestic)' }
    ],
    referenceSolution: {
      steps: [
        'Approach via Runway throughput / ATC slots across 24 hours.',
        'IGI has 4 runways, but due to airspace separation and intersecting operations, effectively 3 runways operate concurrently at peak.',
        'Each runway handles ~25-30 total aircraft movements (take-offs + landings) per hour during active hours (6 AM to midnight, 18 hrs).',
        'Hourly movements: 3 runways * 28 movements/hr = ~84 movements/hour (42 departures + 42 arrivals/hr).',
        'Daytime departures (18 hrs * 42 departures/hr) = 756 departures.',
        'Night operations (Midnight to 6 AM, 6 hrs, international bank & freighters): ~25 departures/hr * 6 = 150 departures.',
        'Total daily commercial departures = 756 + 150 = ~906 flights (plus ~50 cargo/non-scheduled) = ~600-650 total scheduled passenger departures (with equivalent arrivals = ~1,200 total movements).'
      ],
      finalNumber: '~600 - 650 departing flights per day (~1,200 total air traffic movements)',
      keyAssumptions: ['Runway separation and ATC throughput', 'Peak vs night bank scheduling', 'Departures equal approximately 50% of total movements'],
      sanityCheckMethod: 'Delhi International Airport Ltd (DIAL) statistics report ~1,300 to 1,400 daily flight movements (~650 departures). Spot on!',
      casebookReference: 'FMS Casebook 2025-26, Part C — Practice Guesstimate 12'
    },
    interviewerTips: ['Make sure candidate doesn\'t double count: Movements = Departures + Arrivals!']
  },
  {
    id: 'g-tractors-india',
    title: 'Number of Agricultural Tractors in India',
    category: 'Agriculture & Rural',
    difficulty: 'Intermediate',
    question: 'Estimate the total population of operational agricultural tractors in India.',
    objective: 'Estimate active in-service tractor fleet across Indian farming households.',
    suggestedApproach: 'Demand-side',
    benchmarkNumbers: [
      { label: 'Total Agricultural Land', value: '~140-150 Million hectares of net cultivated land' },
      { label: 'Operational Landholdings', value: '~146 Million farming households' },
      { label: 'Landholding Distribution', value: 'Marginal/Small (<2 ha): 86%; Medium/Large (>2 ha): 14% (~20M farms)' }
    ],
    referenceSolution: {
      steps: [
        'Method via Mechanized Farm Area & Ownership: India has 140M cultivated hectares.',
        'Small/Marginal farmers (<2 ha, 86%) cannot afford private tractor purchase (cost ₹6-10 Lakh); they rent via custom hiring centers or neighbor contracts.',
        'Medium and Large farmers (>2 ha = ~20 Million households): ~35-40% own a personal tractor = ~7.5 Million tractors.',
        'Commercial rental contractors & cooperative hiring centers: +1.5 Million tractors.',
        'Commercial non-agri use (construction brick transport, rural sand haulage): +1.0 Million tractors.',
        'Total operational tractor population: ~9.5 to 10.0 Million tractors.'
      ],
      finalNumber: '~9.0 - 10.0 Million operational tractors',
      keyAssumptions: ['Farm size distribution where only >2 hectare land justifies tractor ownership', 'Custom hiring rental model prevalence'],
      sanityCheckMethod: 'India sells ~800,000 to 900,000 new tractors annually (Mahindra, Sonalika, Escorts). With an average working life of 10-12 years, 900k * 11 yrs = ~9.9 Million operational units!',
      casebookReference: 'FMS Casebook 2025-26, Part C — Practice Guesstimate 13'
    },
    interviewerTips: ['Probe on rental custom hiring—marginal farmers rent tractor hours rather than owning one.']
  },
  {
    id: 'g-wine-consumption',
    title: 'Annual Wine Consumption in India',
    category: 'Consumer Goods',
    difficulty: 'Intermediate',
    question: 'Estimate the annual volume of wine consumed in India (in liters).',
    objective: 'Estimate total consumption of domestic (Sula, Fratelli) and imported wines in India.',
    suggestedApproach: 'Demand-side',
    benchmarkNumbers: [
      { label: 'Adult Alcohol Consumers', value: '~160-180 Million adults in India' },
      { label: 'Spirits vs Beer vs Wine', value: 'Spirits (Whisky/Rum) ~70%, Beer ~28%, Wine ~1-2% of alcohol volume' },
      { label: 'Urban Affluent Focus', value: 'Wine is predominantly consumed by SEC A / Upper Middle class in top 15 cities' }
    ],
    referenceSolution: {
      steps: [
        'Target addressable drinking population: SEC A/B urban adults with disposable income = ~35 Million.',
        'Wine drinking prevalence in this cohort: ~20% drink wine at least occasionally = ~7 Million wine consumers.',
        'Frequency & Volume per drinker: Regular wine drinkers (top 15% = 1.05M) drink 2 bottles/month = 24 bottles/yr (18L/yr). Occasional/Social drinkers (85% = 5.95M) drink 3 bottles/year (2.25L/yr).',
        'Total consumer volume: (1.05M * 18L = 18.9M L) + (5.95M * 2.25L = 13.4M L) = ~32.3 Million liters.',
        'Hospitality / Tourism / Banquet consumption (Hotels, luxury restaurants, weddings): +6 Million liters.',
        'Total annual consumption = ~38 Million liters.'
      ],
      finalNumber: '~35 - 40 Million liters (approx. 4.5 - 5.0 Million 9-liter cases)',
      keyAssumptions: ['High geographic concentration in Maharashtra, Delhi, Karnataka, Goa', 'Wine represents <2% of total alcoholic beverages in India'],
      sanityCheckMethod: 'Sula Vineyards holds ~55% domestic share and sells ~1.0-1.2M cases (~10M liters), indicating an overall market of ~35-40M liters.',
      casebookReference: 'FMS Casebook 2025-26, Part C — Practice Guesstimate 19'
    },
    interviewerTips: ['Watch out for candidate confusing wine with hard liquor—wine is niche and urban in India.']
  },
  {
    id: 'g-bisleri-bottles',
    title: 'Packaged Bisleri Water Bottles Sold Daily',
    category: 'Consumer Goods',
    difficulty: 'Intermediate',
    question: 'Estimate the number of 1-Liter packaged drinking water bottles sold by Bisleri daily across India.',
    objective: 'Calculate daily unit sales of Bisleri\'s flagship 1L PET bottle.',
    suggestedApproach: 'Hybrid',
    benchmarkNumbers: [
      { label: 'Bisleri Market Share', value: '~60% of branded packaged water market' },
      { label: 'Major Consumption Occasions', value: 'Transit (trains, buses, flights, highways), Dining, Events, Daily outdoor errands' },
      { label: 'Kirana & Retail Reach', value: 'Distributed across ~500,000+ retail points' }
    ],
    referenceSolution: {
      steps: [
        'Approach via retail channel distribution: Bisleri is stocked in ~500,000 retail touchpoints (railway stalls, bus stops, dhabas, kiranas, pan shops, restaurants).',
        'Average daily sales per outlet: High-traffic transit stalls/dhabas (10% = 50,000 outlets) sell ~50 bottles/day = 2.5M bottles. Medium kiranas/restaurants (30% = 150,000) sell ~15 bottles/day = 2.25M bottles. Low pan shops/neighborhood stores (60% = 300,000) sell ~5 bottles/day = 1.5M bottles.',
        'Total daily 1L bottles sold via retail = 2.5M + 2.25M + 1.5M = ~6.25 Million bottles per day.',
        'Add bulk institutional direct sales (airlines, corporate events, rail catering): +1.0 Million bottles.',
        'Total daily 1L bottles = ~7.0 to 7.5 Million bottles/day.'
      ],
      finalNumber: '~7.0 - 7.5 Million 1-Liter bottles per day',
      keyAssumptions: ['Retail store network density', 'Turnover rate by outlet category', 'Seasonal summer peak vs winter trough average'],
      sanityCheckMethod: '7.25M bottles/day * 365 days = ~2.6 Billion bottles/yr. At wholesale realization of ~₹10/bottle, this represents ~₹2,600 Cr revenue, matching Bisleri\'s reported annual turnover.',
      casebookReference: 'FMS Casebook 2025-26, Part C — Practice Guesstimate 20'
    },
    interviewerTips: ['Probe candidate on seasonality (summer vs winter sales differ by 40%).']
  },
  {
    id: 'g-bcom-admissions',
    title: 'B.Com Admissions per Year in Delhi University',
    category: 'Urban & Retail',
    difficulty: 'Beginner',
    question: 'Estimate the total number of students admitted into B.Com (Prog) and B.Com (Hons) programs in Delhi University (DU) each academic year.',
    objective: 'Determine yearly undergraduate intake for commerce programs across all DU constituent colleges.',
    suggestedApproach: 'Supply-side',
    benchmarkNumbers: [
      { label: 'Total DU Colleges', value: '~70-75 constituent colleges' },
      { label: 'Colleges Offering Commerce', value: '~55 colleges offer B.Com or B.Com (Hons)' },
      { label: 'Average Batch Size per College', value: '2 to 4 sections of 50-70 students per course' }
    ],
    referenceSolution: {
      steps: [
        'Delhi University has ~70 undergraduate colleges; ~55 colleges offer commerce degrees.',
        'Segment colleges by size: Premier top-tier commerce hubs (SRCC, Hansraj, Hindu, Ramjas, Kirori Mal, KMC, Venkateswara, Lady Shri Ram ~10 colleges) have large intake: ~400-600 B.Com students each = ~5,000 seats.',
        'Medium-sized North & South Campus colleges (~25 colleges): ~200-250 seats each = ~5,500 seats.',
        'Off-campus and evening colleges (~20 colleges): ~120-150 seats each = ~2,700 seats.',
        'Total seats = 5,000 + 5,500 + 2,700 = ~13,200 seats.',
        'Supernumerary quotas (EWS, Sports, ECA, PwD, CW, Foreign students ~10% addition): +1,300.',
        'Total yearly admitted commerce students = ~14,500 students.'
      ],
      finalNumber: '~14,000 - 15,000 B.Com students per year',
      keyAssumptions: ['Number of commerce-offering colleges', 'Differentiating B.Com (Hons) and B.Com (Prog) intake', 'College tier capacities'],
      sanityCheckMethod: 'DU CSAS admission bulletin shows total commerce sanction intake of ~14,700 seats across all colleges.',
      casebookReference: 'FMS Casebook 2025-26, Part C — Practice Guesstimate 22'
    },
    interviewerTips: ['Ensure candidate doesn\'t assume all 70 colleges have identical capacity to SRCC!']
  },
  {
    id: 'g-dream11-revenue',
    title: 'Dream11 Fantasy Sports Revenue during IPL',
    category: 'Media & Tech',
    difficulty: 'Advanced',
    question: 'Estimate the total gross gaming revenue generated by Dream11 during the two months of the Indian Premier League (IPL) cricket season.',
    suggestedApproach: 'Demand-side',
    benchmarkNumbers: [
      { label: 'IPL Duration & Matches', value: '~74 matches over 60 days (approx 1 match/weekday, 2 matches/weekend day)' },
      { label: 'Active Fantasy Users during IPL', value: '~40-50 Million registered users actively joining contests' },
      { label: 'Dream11 Platform Commission (Take Rate)', value: '~15% platform cut (rake) of total prize pool entry fees' }
    ],
    referenceSolution: {
      steps: [
        'Matches: 74 total matches.',
        'Active paid players per match: Big marquee matches (CSK, MI, RCB, Playoffs ~30 matches) attract ~12M paid participants. Regular league matches (44 matches) attract ~6M paid participants.',
        'Average entry fee spent per user per match: Mix of casual ₹49 mega contest entries and power gamers joining multiple private leagues: Weighted avg spend = ~₹90 per active player per match.',
        'Gross Entry Collections (Gross Gaming Value): Marquee matches (30 * 12M * ₹90 = ₹3,240 Cr) + Regular matches (44 * 6M * ₹90 = ₹2,376 Cr) = ~₹5,616 Crore total entry pool.',
        'Dream11 Take Rate (rake/commission) = ~15%.',
        'Net Revenue for Dream11 during IPL = ₹5,616 Cr * 15% = ~₹842 Crore.'
      ],
      finalNumber: '~₹800 - ₹900 Crore revenue during IPL',
      keyAssumptions: ['Match count and weekday vs blockbuster weekend traffic', 'Average player contest entry spend', '15% platform take-rate from prize pool'],
      sanityCheckMethod: 'Dream11 reports annual net revenue of ~₹3,500 - ₹4,000 Cr, with ~55-60% of annual gaming activity compressed into the 2-month IPL window, confirming ~₹800-900 Cr IPL revenue.',
      casebookReference: 'FMS Casebook 2025-26, Part C — Practice Guesstimate 24'
    },
    interviewerTips: ['Clarify whether candidate is calculating total entry pool (Gross Gaming Value) vs Dream11\'s actual net revenue (the 15% rake).']
  },
  {
    id: 'g-goa-hotel-rooms',
    title: 'Peak Season Hotel Rooms Booked in Goa',
    category: 'Urban & Retail',
    difficulty: 'Intermediate',
    question: 'Estimate the number of occupied hotel and resort rooms in Goa on New Year\'s Eve (December 31st).',
    suggestedApproach: 'Supply-side',
    benchmarkNumbers: [
      { label: 'Goa Coastline & Tourist Zones', value: 'North Goa (Calangute, Baga, Candolim, Anjuna) and South Goa (luxury resorts, Colva, Palolem)' },
      { label: 'Total Registered Properties', value: '~3,500 to 4,000 registered hotels, guest houses, and homestays' },
      { label: 'Occupancy on New Year\'s Eve', value: 'Effectively near 95-98% peak occupancy' }
    ],
    referenceSolution: {
      steps: [
        'Total hotel accommodation inventory in Goa: 5-Star luxury beachfront resorts (~40 resorts * 180 rooms = 7,200 rooms). 3 & 4-Star boutique & business hotels (~450 hotels * 40 rooms = 18,000 rooms). Budget hotels, lodges, and guest houses (~2,500 properties * 15 rooms = 37,500 rooms). Homestays, Airbnb villas, hostels (~1,000 properties * 5 rooms = 5,000 rooms). Total room stock: ~67,700 rooms.',
        'Occupancy rate on December 31st: Goa is completely sold out (~96% occupancy).',
        'Occupied rooms = 67,700 * 0.96 = ~65,000 occupied rooms.'
      ],
      finalNumber: '~62,000 - 68,000 occupied rooms',
      keyAssumptions: ['Classification of accommodation by stars/size', 'Peak New Year occupancy (~95%+)', 'Goa Department of Tourism registered inventory'],
      sanityCheckMethod: 'With ~65,000 rooms averaging 2.3 tourists per room, that represents ~150,000 tourists staying in hotels simultaneously, perfectly aligning with Goa airport and railway inbound passenger influx during Christmas-New Year week.',
      casebookReference: 'FMS Casebook 2025-26, Part C — Practice Guesstimate 37'
    },
    interviewerTips: ['Ask how candidate handles informal homestays and Airbnbs vs traditional hotels.']
  },
  {
    id: 'g-led-bulbs',
    title: 'Residential LED Bulbs Sold Annually in India',
    category: 'Consumer Goods',
    difficulty: 'Intermediate',
    question: 'Estimate the annual number of residential LED bulbs sold in India.',
    objective: 'Determine yearly domestic consumer purchase of 9W-12W replacement LED bulbs.',
    suggestedApproach: 'Demand-side',
    benchmarkNumbers: [
      { label: 'Total Households', value: '300 Million' },
      { label: 'Electrification Rate', value: '~97-98%' },
      { label: 'Average Light Points per Home', value: 'Urban: 8-12 points; Rural: 4-6 points' },
      { label: 'Average LED Lifespan', value: '~3 to 4 years (~15,000-20,000 burning hours)' }
    ],
    referenceSolution: {
      steps: [
        'Households: Urban 105M (avg 10 bulb sockets = 1.05B installed bulbs); Rural 195M (avg 5 bulb sockets = 975M installed bulbs). Total installed residential bulb socket universe = ~2.02 Billion bulbs.',
        'LED penetration of sockets: Driven by government UJALA scheme, ~85% of sockets now hold LEDs = ~1.72 Billion active LED bulbs in homes.',
        'Replacement frequency: Average household LED runs ~5 hours/day (~1,800 hrs/yr). With a 15,000-hour rated life (derated for Indian voltage fluctuations to ~8,000-10,000 hrs), a bulb lasts ~4.5 years (~22% replaced annually).',
        'Annual replacement sales = 1.72B * 0.22 = ~378 Million bulbs.',
        'Add new home construction / renovations: +40 Million bulbs.',
        'Total annual residential LED sales = ~420 Million units.'
      ],
      finalNumber: '~400 - 450 Million LED bulbs annually',
      keyAssumptions: ['Installed socket base per household', 'Impact of voltage surges on actual vs rated lifespan', 'UJALA scheme adoption'],
      sanityCheckMethod: 'ELCOMA (Electric Lamp and Component Manufacturers\' Association) reports total Indian LED bulb production at ~600M units, of which ~400-450M are domestic residential and rest commercial/institutional.',
      casebookReference: 'FMS Casebook 2025-26, Part C — Practice Guesstimate 39'
    },
    interviewerTips: ['Check whether candidate considers voltage fluctuation reducing theoretical LED life from 15 years down to 4 years.']
  }
];

import { CaseItem } from '../types';

export const COMPREHENSIVE_FMS_CASES: CaseItem[] = [
  {
    id: 'case-apple-orchard',
    title: 'Apple Orchard Farmer Profit Decline',
    type: 'Profitability',
    industry: 'FMCG',
    difficulty: 'Beginner',
    prompt: 'Your client is a farmer who owns an apple orchard in Northern India. He has seen a reduction in profit in the past year. Find the reasons and recommend solutions.',
    clientContext: 'The farmer owns 30 acres of land dedicated strictly to apple production in Northern India. All farmers in the region have been impacted.',
    initialClarifications: 'There are no new government regulations. Prices have been fairly constant for the past 3-4 years. Costs have not changed significantly; the issue is on the revenue/demand side.',
    hiddenDataPoints: [
      {
        category: 'Supply Chain & Value Chain',
        questionTrigger: ['supply chain', 'value chain', 'distributor', 'wholesaler', 'retailer', 'who sells'],
        disclosure: 'There are no wholesalers; the farmer sells via 2 regional distributors who sell directly to retailers.'
      },
      {
        category: 'Product Uses & Customer Segments',
        questionTrigger: ['usage', 'uses', 'juice', 'processing', 'beverage', 'segments', 'products'],
        disclosure: 'Apples are sold into two buckets: Direct consumption (Modern Trade, Hotels, Export, Gifting) and Processing Industry (Candies, Jams, Sweets, and Beverages).'
      },
      {
        category: 'Demand & Retailer Response',
        questionTrigger: ['demand', 'retailer', 'response', 'complaint', 'why falling'],
        disclosure: 'Retailers report a major drop in orders from the processing sector. Specifically, the apple-based beverage industry has collapsed because of false rumors of alcohol content in the drinks, causing consumers to shun apple beverages.'
      },
      {
        category: 'Supply vs Demand Equilibrium',
        questionTrigger: ['supply', 'equilibrium', 'production quantity', 'harvest'],
        disclosure: 'Orchard apple production and harvest supply remained identical to previous years, but beverage processors stopped buying.'
      }
    ],
    referenceFramework: [
      'Profits = Revenues - Costs',
      'Revenues = Price/unit (constant) * Volume (declining)',
      'Volume = Demand side issue -> Accessibility & Retailer demand',
      'Retailer Segments: Direct Industry (Fresh/Gifting) vs Processing Industry (Beverages/Jams)',
      'Root Cause: False rumors of alcohol in apple beverages destroying processing demand'
    ],
    rootCause: 'Demand shock in the processing sector: false rumors alleging trace alcohol in packaged apple beverages caused consumers to boycott apple drinks, leading processors to halt apple procurement.',
    recommendedActions: [
      'Short-term: Pivot distribution towards fresh exports and modern trade gifting channels.',
      'Cold Storage: Store unsold apples in controlled-atmosphere cold storage facilities to preserve stock for the next harvest season.',
      'Industry Action: Coordinate with grower cooperatives to sponsor independent laboratory testing and public media PR disproving alcohol rumors.'
    ],
    risksAndNextSteps: [
      'Cold storage capacity and electricity costs eating into margins.',
      'Export quality grading compliance.'
    ],
    casebookReference: 'FMS Casebook 2025-26, Part I — Practice Case 1 (Bain & Co.), Page 146-147'
  },
  {
    id: 'case-retail-chain-24seven',
    title: 'Retail Store Chain Expansion Profitability Drop',
    type: 'Profitability',
    industry: 'Retail & E-comm',
    difficulty: 'Beginner',
    prompt: 'A chain of retail stores in Delhi NCR recently increased its number of stores from 30 to 35. However, despite the store count expansion, overall profitability has dropped. Diagnose the cause and recommend solutions.',
    clientContext: 'The client operates 24/7 convenience retail stores (similar to 24Seven) across Delhi, selling packaged foods, groceries, and personal care items to 20-30 year old customers.',
    initialClarifications: 'Both old and new stores offer identical products. The problem affects all stores across the chain, not just the 5 new stores. There have been no regulatory changes.',
    hiddenDataPoints: [
      {
        category: 'Revenue vs Cost Split',
        questionTrigger: ['revenue', 'cost', 'where to look', 'split'],
        disclosure: 'Total revenue has stagnated and revenue per store has dropped. Costs per store have remained normal; the issue is on the revenue generation side.'
      },
      {
        category: 'Customer Ticket Size vs Footfall',
        questionTrigger: ['ticket size', 'basket size', 'average spend', 'footfall', 'number of customers'],
        disclosure: 'Average ticket size has remained completely unchanged. However, the number of customers per store has declined.'
      },
      {
        category: 'Timing of Sales & Cannibalization',
        questionTrigger: ['timing', 'hours', 'when do they buy', 'cannibalization', 'sales pattern', 'night'],
        disclosure: 'Crucial insight: 80% of total sales take place between 6:00 PM and 2:00 AM for emergency snacks and midnight cravings. Total chain footfall remained flat, meaning opening 5 new nearby stores merely split the existing night customers across 35 stores instead of 30!'
      },
      {
        category: 'Daytime Utilization',
        questionTrigger: ['daytime', 'morning', 'afternoon', 'day store', 'why low daytime'],
        disclosure: 'During daytime (6 AM to 6 PM), stores operate with near-zero footfall because consumers perceive the chain as a midnight snack destination rather than a daily kirana or grocery store.'
      }
    ],
    referenceFramework: [
      'Total Profit = (# of Stores * Revenue/Store) - (# of Stores * Cost/Store)',
      'Revenue/Store = Avg Ticket Size (constant) * # Customers/Store (declining)',
      'Customer Footfall Analysis: Total Chain Customers (flat) / # of Stores (increased) = Cannibalization',
      'Temporal Analysis: 80% sales concentrated between 6 PM - 2 AM; daytime capacity idle'
    ],
    rootCause: 'Intra-chain cannibalization combined with idle daytime capacity: Opening 5 new stores in overlapping catchments fractured a fixed midnight customer base (6 PM - 2 AM) while failing to generate daytime retail footfall.',
    recommendedActions: [
      'Daytime Repositioning: Run targeted daytime promotional campaigns positioning stores as quick fresh grocery and office lunch/stationery stops.',
      'Increase Average Ticket Size: Introduce high-margin grab-and-go fresh foods and ready-to-eat bakery counters.',
      'Delivery Catchment: Launch hyperlocal home delivery via Zepto/Swiggy Minis or proprietary app for orders exceeding ₹500 within a 2 km radius.'
    ],
    risksAndNextSteps: [
      'Brand perception friction when shifting from midnight impulse destination to day grocery.',
      'Perishable fresh food spoilage if daytime turnover is slow.'
    ],
    casebookReference: 'FMS Casebook 2025-26, Part I — Practice Case 2 (Bain & Co.), Page 148-150'
  },
  {
    id: 'case-ecommerce-ui-drop',
    title: 'E-Commerce Fashion App Conversion Drop',
    type: 'Profitability',
    industry: 'Retail & E-comm',
    difficulty: 'Beginner',
    prompt: 'Your client is a new e-commerce fashion player in India who launched operations expecting strong rapid growth, but is only achieving 50-60% of their target metrics. Analyze the root cause and provide recommendations.',
    clientContext: 'Client focuses primarily on fashion (70% of GMV) with remaining 30% in household and electronics. Operates via an Android/iOS mobile application in a market where 3 top players command 80% share.',
    initialClarifications: 'The issue is not industry-wide; competitors are growing normally. The shortfall is uniform across all product categories (fashion, household, electronics). Pricing and catalog assortment are competitive.',
    hiddenDataPoints: [
      {
        category: 'Customer App Funnel Stage',
        questionTrigger: ['funnel', 'drop-off', 'where are they leaving', 'customer journey', 'browse', 'checkout'],
        disclosure: 'Customers download the app and sign up successfully. They browse products, but drop-offs spike massively during product browsing before adding items to cart.'
      },
      {
        category: 'UI & App Behavior',
        questionTrigger: ['ui', 'app', 'bug', 'browsing experience', 'product page', 'scroll'],
        disclosure: 'Critical UX defect: When a user scrolls down a category listing (e.g. 50 items down) and clicks a product to view details, pressing the "Back" button reloads the entire catalog and jumps the user back to the very top of the page! This causes extreme user fatigue and catalog abandonment.'
      },
      {
        category: 'Pricing and Catalogue Benchmarks',
        questionTrigger: ['price', 'pricing', 'discount', 'catalogue', 'brands'],
        disclosure: 'Discounts and catalog depth match Myntra and Ajio; pricing is not the reason for the drop-off.'
      }
    ],
    referenceFramework: [
      'Top-line Revenue = Traffic * Conversion Rate * Average Order Value',
      'Conversion Rate = Funnel Analysis (Install -> Browse -> Product View -> Add to Cart -> Checkout)',
      'Drop-off Isolation: Pre-browsing (good) vs Browsing UI (severe friction) vs Checkout (normal)',
      'Root Cause: Catalog scroll position memory bug in mobile app view hierarchy'
    ],
    rootCause: 'App navigation state defect: Returning from a product detail view resets the category listing scroll position back to Item #1, frustrating shoppers and terminating browsing sessions before cart additions.',
    recommendedActions: [
      'Immediate Sprint Fix: Implement scroll state preservation (infinite scroll DOM caching) so the user returns to their exact viewed position.',
      'Product Analytics: Embed session-replay tracking (FullStory/Mixpanel) to flag UI rage-clicks and drop-off barriers.',
      'Re-engagement Campaign: Offer push-notification discount vouchers (e.g., "We fixed your shopping experience — ₹200 off") to re-activate dropped users.'
    ],
    risksAndNextSteps: [
      'App store update adoption lag; must force-push patch or use code-push hotfix.',
      'Rebuilding trust among churned early adopters.'
    ],
    casebookReference: 'FMS Casebook 2025-26, Part I — Practice Case 3 (BCG), Page 150-152'
  },
  {
    id: 'case-biscuit-packaging-microns',
    title: 'Biscuit Manufacturer Margin Squeeze',
    type: 'Profitability',
    industry: 'FMCG',
    difficulty: 'Beginner',
    prompt: 'Your client is a national biscuit manufacturer in India (similar to Britannia/Parle). Over the last 6 months, their operating profit margin dropped from 25% to 18% pan-India. Diagnose the reason and recommend solutions.',
    clientContext: 'Client manufactures multiple varieties of sweet and glucose biscuits distributed via warehouses to distributors, kiranas, and supermarkets pan-India.',
    initialClarifications: 'The decline is specific to our client. Profit has dropped across all product lines. Revenue, volume, and prices have remained steady; the issue is entirely on the cost side.',
    hiddenDataPoints: [
      {
        category: 'Value Chain Cost Breakdown',
        questionTrigger: ['cost', 'value chain', 'manufacturing', 'raw material', 'distribution', 'procurement'],
        disclosure: 'Raw materials (flour, sugar) and distribution costs are unchanged. The cost increase is located strictly within the packaging line of the manufacturing process.'
      },
      {
        category: 'Packaging Cost Component',
        questionTrigger: ['packaging', 'wrapper', 'materials', 'plastic', 'micron', 'regulations'],
        disclosure: 'New environmental plastic waste management regulations mandated replacing 100-micron plastic packaging with 250-micron packaging. The unit cost of the 250-micron material is substantially higher, and the client also had to write off large obsolete inventories of 100-micron foil.'
      },
      {
        category: 'Competitor Response to Regulation',
        questionTrigger: ['competitor', 'how competitors handled', 'other biscuit companies'],
        disclosure: 'Competitors renegotiated long-term bulk contracts with film suppliers and passed on costs through minor grammage reduction (shrinkflation), which our client neglected to do.'
      }
    ],
    referenceFramework: [
      'Profits = Revenue (constant) - Costs (increased)',
      'Cost Value Chain: Raw Materials -> Manufacturing -> Packaging -> Logistics -> Sales',
      'Manufacturing Breakdown: Fixed Costs vs Variable Costs (Packaging per unit increased)',
      'External Regulatory Driver: 100-micron plastic ban enforced -> 250-micron requirement'
    ],
    rootCause: 'Unabsorbed packaging cost inflation caused by mandatory migration from 100-micron to 250-micron packaging films, aggravated by write-offs of obsolete inventory and failure to optimize contract rates.',
    recommendedActions: [
      'Short-term: Consolidate film procurement with primary extrusion suppliers to negotiate volume rebates and lock in 12-month fixed pricing.',
      'Packaging Redesign: Optimize package surface geometry and seal margins to use 12% less surface area per biscuit packet without reducing content.',
      'Sustainability Marketing: Position the thicker, recyclable 250-micron packaging as an eco-conscious premium improvement to justify a modest price realization.'
    ],
    risksAndNextSteps: [
      'Supplier concentration risk during plastic resin volatility.',
      'Shelf-life seal integrity testing.'
    ],
    casebookReference: 'FMS Casebook 2025-26, Part I — Practice Case 5 (McKinsey & Co.), Page 154-156'
  },
  {
    id: 'case-automobile-bs-vi',
    title: 'Automobile Company Passenger Car Sales Slump',
    type: 'Growth Strategy',
    industry: 'Automotive & EV',
    difficulty: 'Beginner',
    prompt: 'Our client is a domestic passenger car manufacturer in India experiencing declining sales volume over the last 3 months. Figure out the problem and suggest ways to increase sales in the next 3 months.',
    clientContext: 'Client manufactures a single popular model of passenger car and operates across the full automotive value chain from manufacturing to dealerships and service centers across India.',
    initialClarifications: 'Prices have remained constant; the issue is purely quantity sold. Production capacity and dealership supply are intact; the issue is customer pull/demand.',
    hiddenDataPoints: [
      {
        category: 'Customer Pull & Feasibility',
        questionTrigger: ['customer pull', 'demand', 'why not buying', 'delay', 'wait', 'regulation'],
        disclosure: 'Customers still like the car and visit showrooms, but they are deliberately postponing purchases because the Government announced that Bharat Stage VI (BS-VI) emission regulations will take effect in a few months.'
      },
      {
        category: 'Consumer Expectation of Discounts',
        questionTrigger: ['discount', 'bs-vi', 'bs-4', 'expectation', 'inventory dump'],
        disclosure: 'Consumers remember that during the previous BS-III to BS-IV transition, automakers offered massive fire-sale discounts right before the deadline. Buyers are waiting on the sidelines expecting our client to slash prices on BS-IV inventory.'
      },
      {
        category: 'Export and Overseas Feasibility',
        questionTrigger: ['export', 'international', 'abroad', 'overseas'],
        disclosure: 'Our single passenger car model meets technical safety and emission norms in neighboring South Asian and African markets where BS-VI is not required.'
      }
    ],
    referenceFramework: [
      'Sales Volume = Customer Pull (Visibility, Likability, Affordability, Feasibility/Regulations)',
      'Regulatory Transition: BS-IV to BS-VI deadline creating artificial demand deferral',
      'Short-term 3-month action plan: Mitigate domestic holding inventory and capture alternate demand'
    ],
    rootCause: 'Regulatory transition freeze: Consumer purchases stalled because buyers are anticipating eleventh-hour distress discounts on BS-IV cars ahead of the government BS-VI enforcement deadline.',
    recommendedActions: [
      'Immediate Export Offloading: Redirect surplus BS-IV production to export markets (Nepal, Bangladesh, Africa) where BS-VI compliance is not required.',
      'Pre-Emptive Exchange & Buyback Guarantees: Offer a "Buy Now, Guaranteed Upgrade" scheme giving buyers credit toward future BS-VI models to clear current stock.',
      'Accelerated Factory Re-Tooling: Expedite assembly line conversion to roll out BS-VI compliant engines ahead of the regulatory cutoff.'
    ],
    risksAndNextSteps: [
      'Shipping and freight logistics lead times for export offloading.',
      'Margin erosion if dealers panic and offer unsanctioned cash cuts.'
    ],
    casebookReference: 'FMS Casebook 2025-26, Part I — Practice Case 6 (Bain & Co.), Page 156-158'
  },
  {
    id: 'case-qsr-hyperlocal-wages',
    title: 'Quick Service Pizza Restaurant Manpower Cost Spike',
    type: 'Operations / Turnaround',
    industry: 'Retail & E-comm',
    difficulty: 'Beginner',
    prompt: 'Your client is a national quick-service pizza restaurant chain experiencing severe manpower operating cost inflation over the last 2-3 years, especially in Tier-1 cities. Find reasons and give recommendations.',
    clientContext: 'The chain operates dine-in, drive-thru, and proprietary home delivery across Metro and Tier-1 cities with a 30% market share. Competitors face identical pressure.',
    initialClarifications: 'There have been no changes in government statutory labor laws. In-store staff (chefs, servers, managers) costs are stable. The surge is strictly concentrated in delivery manpower wages.',
    hiddenDataPoints: [
      {
        category: 'Delivery Pay Structure Change',
        questionTrigger: ['pay structure', 'wages', 'salary', 'delivery boys', 'fixed vs variable'],
        disclosure: 'To prevent massive delivery rider attrition, the client had to shift rider compensation from a pure fixed wage of ₹10,000/month to a fixed + variable structure (₹50/hour base + ₹5 per delivery completed), increasing average monthly rider payouts to ₹13,200 (+32% jump).'
      },
      {
        category: 'Food Aggregator Competition (Swiggy / Zomato)',
        questionTrigger: ['swiggy', 'zomato', 'aggregators', 'why leaving', 'hyperlocal'],
        disclosure: 'The aggressive growth of hyperlocal food aggregators (Swiggy and Zomato) created an intense bidding war for two-wheeler delivery riders, poaching our client\'s dedicated fleet unless matching higher flexible earnings.'
      },
      {
        category: 'Delivery Fee Realization',
        questionTrigger: ['delivery fee', 'charge for delivery', 'customer pricing'],
        disclosure: 'Currently, the client offers 100% free delivery on all orders, absorbing all rider wage increases internally.'
      }
    ],
    referenceFramework: [
      'Store Manpower Cost = In-store staff (Chefs, Cashiers) + Delivery Personnel',
      'Delivery Wage Model = (# Working Days * Hours * Hourly Rate) + (# Deliveries * Variable Pay per Drop)',
      'External Labor Market Dynamics: Food delivery aggregator boom creating driver shortage',
      'Remediation: Fleet outsourcing vs Hybrid fleet vs Delivery fee monetization'
    ],
    rootCause: 'Delivery wage inflation driven by food delivery aggregators (Swiggy/Zomato) luring riders with higher payouts, forcing the client to adopt a ₹13,200 fixed+variable model while maintaining free delivery for customers.',
    recommendedActions: [
      'Hybrid Fleet Model: Outsource non-peak and overflow delivery demand to 3PL logistics platforms (Shadowfax/Dunzo/Zomato logistics) while maintaining a lean core proprietary fleet for peak hours.',
      'Delivery Fee Monetization: Introduce a nominal ₹20-30 delivery fee on orders below a minimum threshold (₹350) to offset rider variable pay.',
      'Retention Incentives: Institute milestone-based quarterly retention bonuses rather than increasing daily per-drop payouts.'
    ],
    risksAndNextSteps: [
      'Customer friction if delivery charges are instituted abruptly.',
      'SLA delivery time control when using third-party aggregator fleets.'
    ],
    casebookReference: 'FMS Casebook 2025-26, Part I — Practice Case 10 (Kearney), Page 164-166'
  },
  {
    id: 'case-pg-garbage-dump',
    title: 'PG Rental Accommodation Occupancy Plunge',
    type: 'Profitability',
    industry: 'Retail & E-comm',
    difficulty: 'Beginner',
    prompt: 'Your client owns a chain of Paying Guest (PG) rental accommodations in Delhi. One specific building has experienced a 25% drop in profitability over the last 4 months. Find the reason and recommend solutions.',
    clientContext: 'The client owns 10+ student PG properties in Delhi. Tenants are college students staying for 1-2 year tenures. The property is competitively priced with quality amenities.',
    initialClarifications: 'All other 9 properties are running at full occupancy. Only this single building is experiencing empty rooms. Prices, room furnishings, food, and WiFi quality have not changed. Competitor PGs in the city are fine.',
    hiddenDataPoints: [
      {
        category: 'External Environment & Surroundings',
        questionTrigger: ['external', 'outside', 'neighborhood', 'surroundings', 'construction', 'smell', 'noise'],
        disclosure: 'Six months ago, the municipal authority opened a large open garbage collection dump (dhalao) approximately 100 meters down the street from this specific building.'
      },
      {
        category: 'Student Feedback & Living Experience',
        questionTrigger: ['smell', 'odor', 'student feedback', 'why leaving', 'complaint'],
        disclosure: 'Tenants complained of foul odors entering through windows and balconies, along with swarms of flies and stray dogs barking around the garbage dump at night.'
      },
      {
        category: 'Tenant Turnover Cycle',
        questionTrigger: ['tenants', 'students', 'vacate', 'short term vs long term'],
        disclosure: 'Long-term students refused lease renewals upon semester completion; prospective student parents visiting during admission season immediately turned away upon noticing the dump.'
      }
    ],
    referenceFramework: [
      'Profit = (# of Rooms * Occupancy Rate * Rent) - Fixed & Variable Operating Costs',
      'Occupancy Decline: Internal (Room, food, amenities - unchanged) vs External Environment',
      '5 Senses Framework: Sight, Sound, Smell (Foul odor & visual nuisance from municipal garbage dump)',
      'Countermeasures: Physical mitigation + Customer target diversification + Civic lobbying'
    ],
    rootCause: 'Environmental sensory degradation: A new municipal garbage dump 100m away created foul odors and pest infestations, deterring prospective students and driving current tenants away upon lease expiry.',
    recommendedActions: [
      'Immediate Indoor Sealing: Retrofit high-grade double-glazed airtight window seals, install commercial HEPA air purifiers, and use automated herbal odor neutralizers.',
      'Tenant Segment Diversification: Target short-stay guests (exam takers, hospital attendants, transient interns) via Airbnb/Oyo who prioritize low rates over long-term residential environment.',
      'Civic & Legal Lobbying: Partner with neighboring residential associations and local councilors to compel the municipality to enclose the open dump and establish daily mechanized waste clearance.'
    ],
    risksAndNextSteps: [
      'Capex costs for air purifiers and window retrofits.',
      'Timeline uncertainty in dealing with municipal corporation officials.'
    ],
    casebookReference: 'FMS Casebook 2025-26, Part I — Practice Case 13 (FMS Casebook), Page 170-172'
  },
  {
    id: 'case-power-plant-fifo-lifo',
    title: 'Coal Power Plant Profitability & Fuel Wastage',
    type: 'Profitability',
    industry: 'Healthcare', // categorized under industrial
    difficulty: 'Intermediate',
    prompt: 'Your client is a coal gasification electricity power plant in Pune. Over the last 3 months, they have seen a profit dip despite generating and selling identical electricity volume under a fixed government contract. Find the reason and recommend solutions.',
    clientContext: 'The plant operates under a long-term fixed power purchase agreement with the state distribution company. Revenue is constant. Competition is irrelevant (monopoly utility).',
    initialClarifications: 'Electricity tariff and megawatt-hours generated are unchanged. The cost increase is strictly located in raw material: the plant has been purchasing extra coal to generate the same megawatt-hours.',
    hiddenDataPoints: [
      {
        category: 'Coal Storage & Logistics Method',
        questionTrigger: ['storage', 'warehouse', 'how coal is stored', 'lifo', 'fifo', 'inventory'],
        disclosure: 'Three months ago, warehouse plant management changed the coal retrieval method from LIFO (Last-In, First-Out) to FIFO (First-In, First-Out) to ensure older coal did not sit in the yard indefinitely.'
      },
      {
        category: 'Coal Gasification Technical Process',
        questionTrigger: ['gasification', 'crushing', 'powder', 'size', 'lumps', 'broken coal'],
        disclosure: 'Crucial technical constraint: Unlike thermal power plants that burn pulverized coal dust, this gasification turbine strictly requires intact, large lump coal. In the storage yard, heavy coal is stacked high. Forcing FIFO required workers to dig down to the bottom of the stacks, where the massive weight of the pile had crushed the bottom coal into fine powder/ash.'
      },
      {
        category: 'Coal Wastage Magnitude',
        questionTrigger: ['wastage', 'how much coal lost', 'discarded'],
        disclosure: 'The crushed fine coal cannot be fed into the gasifier and is screened out as unusable waste, forcing the plant to buy 20% more raw coal to get enough intact lumps.'
      }
    ],
    referenceFramework: [
      'Profit = Fixed Contract Revenue - Operating Costs (Raw Material Coal Spiked)',
      'Coal Value Chain: Procurement -> Inbound Logistics -> Storage -> Gasification Turbine',
      'Inventory Operational Process: LIFO -> FIFO transition consequence',
      'Technical Failure: Heavy stack pressure crushing bottom coal into fine particulate unusable by gasifier'
    ],
    rootCause: 'Operational process mismatch: Switching yard inventory retrieval from LIFO to FIFO forced excavation of bottom coal layers that had been crushed into fine powder by stack weight, rendering it unusable for the gasifier and causing 20% fuel waste.',
    recommendedActions: [
      'Revert / Redesign Storage Architecture: Transition to segmented horizontal bunker bays or concrete storage silos with lower pile heights to eliminate crushing pressure under FIFO.',
      'By-Product Monetization: Package and sell the screened pulverized coal fines to nearby conventional thermal power plants or cement kilns that actually require crushed coal.',
      'Just-In-Time Coal Delivery: Synchronize coal rake arrivals with burn schedules to reduce on-site pile residence time.'
    ],
    risksAndNextSteps: [
      'Capital cost of constructing partitioned low-height storage bays.',
      'Commercial contracting terms with cement kiln buyers.'
    ],
    casebookReference: 'FMS Casebook 2025-26, Part I — Practice Case 19 (BCG), Page 182-185'
  }
];

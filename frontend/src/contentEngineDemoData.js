export const runNodes = [
  { id: 'intake', type: 'INPUT', title: 'Founder intake interview', detail: 'North Loam Coffee Co.', ms: 66 },
  { id: 'identity', type: 'LLM', title: 'Brand identity', detail: 'Mission, positioning, audience', ms: 1884 },
  { id: 'research', type: 'SEARCH', title: 'Competitor research', detail: '9 grounded results', ms: 4834 },
  { id: 'tone', type: 'LLM', title: 'Tone & voice guide', detail: 'Tenant-specific guardrails', ms: 2138 },
  { id: 'memory', type: 'RAG', title: 'Brand memory', detail: 'Chunk, embed, retrieve', ms: 611 },
  { id: 'calendar', type: 'LLM', title: 'Content calendar', detail: 'Four-week channel plan', ms: 1192 },
  { id: 'blog', type: 'LLM', title: 'Blog + tone eval', detail: 'Long-form anchor piece', ms: 1540 },
  { id: 'social', type: 'LLM', title: 'LinkedIn + carousel', detail: 'Five posts, eight slides', ms: 1677 },
  { id: 'newsletter', type: 'LLM', title: 'Newsletter', detail: 'Founder-led email', ms: 933 },
  { id: 'publish', type: 'SYNC', title: 'Publish to Notion', detail: 'Nine reviewable pages', ms: 816 },
  { id: 'notify', type: 'WEBHOOK', title: 'Notify in Slack', detail: 'Direct review links', ms: 248 },
  { id: 'review', type: 'HUMAN', title: 'Approval gate', detail: 'Interrupt, revise, resume', ms: 0 },
];

export const demoDeliverables = [
  { at: 1, code: 'BI', title: 'Brand Identity', meta: 'mission · positioning · audience', excerpt: 'North Loam exists to prove that coffee quality starts underground. The brand publishes exactly what it pays per farm and per pound instead of asking customers to trust an adjective.' },
  { at: 3, code: 'TV', title: 'Brand Tone & Voice Guide', meta: 'precision without pretension', excerpt: 'Write like a soil scientist explaining something she genuinely knows well to a smart friend. Be precise, never stiff, and put numbers next to sourcing claims.' },
  { at: 3, code: 'DNA', title: 'Brand DNA', meta: 'values · archetype · visual direction', excerpt: 'A working scientist’s authority, radical transparency, soil-first sourcing, and long-term farm partnerships expressed through field-note warmth rather than startup polish.' },
  { at: 2, code: 'CA', title: 'Competitor Analysis', meta: '9 search results · 4 competitors', excerpt: 'The open position is high specificity with an intentionally field-notebook voice: ongoing, itemized, per-farm transparency rather than an annual aggregate claim.' },
  { at: 5, code: 'CAL', title: '4-Week Content Calendar', meta: '10 scheduled pieces', excerpt: 'Monthly theme: “The Ledger, Out Loud.” One source idea becomes a blog, LinkedIn series, carousel, newsletter, farm spotlight, and wholesale proof.' },
  { at: 6, code: 'BP', title: 'Blog Post', meta: 'long-form anchor', excerpt: 'In March, we paid the Bekele family 61% above Fair Trade minimum. Last September, another partner farm received 34% above minimum. We publish both because that is the point.' },
  { at: 7, code: 'LI', title: 'LinkedIn Post Set', meta: '5 channel-ready posts', excerpt: 'Founder story, sourcing data, a contrarian point of view, a wholesale pitch, and customer proof, each grounded in the same approved brand memory.' },
  { at: 7, code: 'CAR', title: 'Instagram Carousel', meta: '8 slides · copy + images', excerpt: '“6 things nobody tells you about direct-trade coffee.” Each slide includes final copy and a brand-aware editorial image prompt.' },
  { at: 7, code: 'IMG', title: 'Editorial Image Set', meta: '12 generated images', excerpt: 'Warm natural light, terracotta, moss, kraft paper, real farms and hands. The image brief is retrieved from the client’s own visual direction.' },
  { at: 8, code: 'NL', title: 'Newsletter', meta: 'founder-led email', excerpt: 'A transparent note about this season’s 34% figure, why the less flattering number still gets published, and what the long-term farm commitment means.' },
  { at: 9, code: 'NTN', title: 'Notion Review Pages', meta: '9 pages synced', excerpt: 'Every republishable piece lands in Notion with its own status and review surface. A reviewer can approve, decline, or request a targeted change.' },
  { at: 10, code: 'SLK', title: 'Slack Review Notice', meta: 'review links delivered', excerpt: 'The reviewer receives one message with direct links. A revised piece is re-synced and the channel is notified again before the second review round.' },
  { at: 11, code: 'OPS', title: 'Run Trace & Cost Tracking', meta: 'captured trace · cost methodology', excerpt: 'Per-node duration, attempts, provider metadata, token and image cost, checkpoint state, and failure details stay attached to the run.' },
];

export const intakeHighlights = [
  ['Company', 'North Loam Coffee Co.'],
  ['Founder', 'Maren Okafor, soil scientist'],
  ['Goal', 'Grow wholesale through traceable sourcing'],
  ['Voice', 'Precise, warm, never coffee-snobbish'],
  ['Rule', 'No “ethical” claim without a number'],
];

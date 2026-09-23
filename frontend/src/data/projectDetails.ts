/**
 * Case-study page content per project. Every fact comes from Ahmad's live
 * portfolio (ahmad-al-smadi-portfolio.vercel.app, read Sep 2026) or his
 * project validation notes. No invented metrics. Copy stays terse: the
 * visuals carry the page; the full write-up sits behind a toggle.
 */
export type ProjectDetail = {
  /** longer one-liner under the title */
  lede: string;
  stats: [string, string][];
  steps: [string, string][];
  highlights?: [string, string][];
  stack: string[];
  links: { label: string; href: string }[];
  /** real hosted video, when one exists */
  video?: { src: string; poster?: string };
  /** a short silent looping screen recording, shown at the top of the page (even above an embed) */
  preview?: { src: string; poster?: string };
  /** real result image from the project, shown in the hero slot */
  image?: { src: string; alt: string };
  /** a full interactive demo ported from the old portfolio, shown in place of the hero */
  embed?: "tactical-lab" | "content-engine";
  writeup?: { problem: string; approach: string; limits: string };
  /** "What to inspect" bullets and the verification note, verbatim from the old portfolio */
  evidence?: string[];
  sourceNote?: string;
};

const GH = "https://github.com/ahmadsmadi44";

export const PROJECT_DETAILS: Record<string, ProjectDetail> = {
  "content-engine": {
    lede: "From client onboarding to approved delivery: a 48-node LangGraph service with tenant-scoped memory, targeted revisions, and recovery built in.",
    stats: [["48", "LangGraph nodes"], ["13", "deliverables per run"], ["109", "tests passing"]],
    steps: [
      ["Intake", "Founder interview"],
      ["Memory", "Brand docs → pgvector"],
      ["Create", "Blog, posts, carousel, newsletter"],
      ["Review", "Notion + Slack approval"],
      ["Revise", "Re-runs only that piece"],
    ],
    highlights: [
      ["Retrieval before generation", "Each client's brand memory is scoped and retrieved per tenant."],
      ["Real pause, targeted revision", "\"Changes requested\" re-runs one node, re-syncs Notion, re-pings Slack."],
      ["Tone check, 94/100", "A second model scores each piece against the client's voice guide."],
    ],
    embed: "content-engine",
    evidence: [
      "Client-scoped brand retrieval with Supabase and pgvector — inspect the retrieved passages in the walkthrough.",
      "A full changes-requested → revision → re-review cycle, walked end-to-end and captured from an actual run.",
      "Checkpointing, retries, idempotent webhooks, failed-run recording, and cost tracking, each cited to its own test.",
    ],
    sourceNote: "Architecture and test results checked against the local source, its README, and its own test suite.",
    stack: ["Python", "LangGraph", "Supabase / pgvector", "FastAPI", "LangSmith"],
    links: [{ label: "View source", href: `${GH}/content-engine` }],
    writeup: {
      problem:
        "A useful content operation has to preserve each client’s context, coordinate many dependent tasks, let a reviewer change one piece without restarting a run, and recover safely when an external service fails.",
      approach:
        "I moved a custom DAG executor to LangGraph, preserving an offline demo path against fixture data. Brand documents are chunked, embedded, and retrieved per tenant. Human review uses a real checkpointed interrupt/resume — a \"changes requested\" decision routes back into just that content node with the reviewer’s words folded into its prompt, re-publishes to Notion, and re-notifies Slack before pausing for a second look. Generated pieces are scored by an LLM-as-judge tone check, every node execution can trace to LangSmith, and a cost tracker meters real per-call spend against published Anthropic/Gemini pricing. 109 unit and integration tests currently pass.",
      limits:
        "Feedback changes what the system retrieves and includes in its prompts; it does not fine-tune the language model. The demo’s mock text provider replies with the same fixture regardless of prompt, so the revision walkthrough shows the real mechanism without genuinely different text; live mode calls the real API and produces a genuine revision.",
    },
  },

  "pitch-vision": {
    lede: "Football footage becomes tracked movement, player analytics, and a tactical view of shape, pressure, space, and phase of play.",
    stats: [["5.5 min", "of Liverpool v Real Madrid analysed"], ["22", "players tracked"], ["27", "tactical moments detected"]],
    steps: [],
    embed: "tactical-lab",
    stack: ["Python", "YOLO11", "ByteTrack", "OpenCV", "SciPy", "React", "Node.js"],
    links: [{ label: "View source", href: `${GH}/pitch-vision-football-analytics` }],
    writeup: {
      problem: "A moving broadcast camera makes identity tracking and physical measurement two different problems. Missed detections, kit colors, calibration, and short track lifespans all affect the analytics downstream.",
      approach: "I fine-tuned separate models for broadcast and overhead views, fused the useful detections, used ByteTrack for short-term continuity, and registered a moving tactical camera to a 105 × 68 m pitch. Calibrated positions feed heatmaps, an explainable activity rating, formation graphs, phase labels, block estimates, pressure checks, passing-lane geometry, and a Node and React explorer.",
      limits: "This is a five-minute visible-sample assessment, not a full-match grade. Same-team player names are formation-seeded and remain provisional until jersey-number anchors are reviewed. Possession, block labels, pressure, and coaching suggestions are transparent heuristics, and missing observations stay visible in the interface.",
    },
    evidence: [
      "Explore a real five-minute Liverpool versus Real Madrid sample with lineup-seeded identities, heatmaps, and measured rating inputs.",
      "Scrub the synchronized match replay with team shape, space ownership, and passing-lane overlays.",
      "Review detected pressure and lateral movement moments with the measurement behind each suggestion.",
    ],
    sourceNote: "The base tracking pattern builds on a football-analysis tutorial. The measurement filtering, analytics, top-view tactical pipeline, validation, and full-stack platform are the project’s additions. AWS deployment is prepared and remains unverified.",
  },

  "outbound-engine": {
    lede: "A working n8n system that sources leads, enriches contact and LinkedIn data, drafts personalized outreach with AI, and syncs every record to HubSpot.",
    stats: [["8", "pipeline stages"], ["1–10", "lead-fit score"], ["1:57", "full walkthrough"]],
    steps: [
      ["Source", "Apify lead scrape"],
      ["Enrich", "LinkedIn activity"],
      ["Merge", "One lead profile"],
      ["Score", "Fit 1–10 + draft"],
      ["Sync", "HubSpot"],
      ["Queue", "Gmail draft"],
    ],
    stack: ["n8n", "Apify", "HubSpot", "OpenAI", "Gmail"],
    links: [],
    video: { src: "/assets/automation/n8n-workflow-walkthrough.mp4", poster: "/assets/automation/outbound-engine-poster.jpg" },
  },

  "coordinate-classifier": {
    lede: "A reproducible comparison of five classification approaches, from linear baselines to a stacked ensemble.",
    stats: [["0.9961", "weighted F1"], ["5", "approaches compared"], ["70 / 30", "stratified split"]],
    steps: [
      ["Split", "Stratified 70/30"],
      ["Train", "LogReg, SVC, RF, DT"],
      ["Tune", "5-fold CV search"],
      ["Stack", "RF + SVC → LogReg"],
      ["Save", "joblib"],
    ],
    image: { src: "/assets/project-covers/coordinate-model-evidence.jpg", alt: "Model comparison and evaluation results from the coordinate classification project" },
    evidence: ["0.9961 weighted F1 in the repository’s evaluation results.", "A stratified 70/30 train/test split.", "Random forest, decision tree, and the stacked model tied in the recorded results."],
    sourceNote: "Metric, evaluation procedure, plots, and saved-model workflow verified against the implementation and recorded results.",
    stack: ["Python", "scikit-learn"],
    links: [{ label: "View source", href: `${GH}/AER850_Project_1` }],
    writeup: {
      problem:
        "Given three coordinate features, predict a discrete process step. The useful question is which model performs well under a consistent evaluation procedure, and whether extra complexity earns its place.",
      approach:
        "I compared logistic regression, SVC, random forest, and decision tree models, with stratified five-fold cross-validation for hyperparameter search. A random-forest and SVC stack uses logistic regression as its final estimator. Random forest, decision tree, and the stack tied in the recorded results.",
      limits:
        "These results describe this dataset and split. The final model choice also used the test-set comparison, so a new untouched holdout would be needed for an unbiased estimate.",
    },
  },

  "visual-inspection": {
    lede: "An image-classification pipeline for cracks, missing screw heads, and paint degradation on aircraft surfaces.",
    stats: [["3", "defect classes"], ["2", "CNN configurations compared"]],
    steps: [
      ["Augment", "Image augmentation"],
      ["Train", "Two CNN configs"],
      ["Regularize", "Dropout + L2"],
      ["Optimize", "Adam + LR on plateau"],
      ["Inspect", "Held-out predictions"],
    ],
    image: { src: "/assets/project-covers/surface-inspection-evidence.jpg", alt: "Held-out aircraft surface images with predicted defect classes" },
    evidence: ["Three defect categories: cracks, missing screw heads, and paint degradation.", "Two architecture configurations compared through training and validation curves.", "Held-out images used to inspect confidence and the failure mode between narrow cracks and broader paint damage."],
    sourceNote: "Implementation, model comparison, training curves, and held-out predictions checked against the recorded project evidence.",
    stack: ["Python", "TensorFlow", "Keras"],
    links: [{ label: "View source", href: `${GH}/AER850_Project_2` }],
    writeup: {
      problem:
        "Visual inspection depends on subtle local features. A useful model needs to learn those signals while generalizing beyond the exact images it sees during training.",
      approach:
        "I compared two CNN configurations using image augmentation, dropout, L2 regularization, Adam, and ReduceLROnPlateau. Training and validation histories showed where the deeper configuration improved feature learning and where small, overlapping texture cues still caused confusion.",
      limits: "This is a defect-classification prototype. It is not an aircraft maintenance certification tool or a substitute for an inspection decision.",
    },
  },

  "component-detection": {
    lede: "Finding and classifying components across different circuit-board layouts, including boards outside the training set.",
    stats: [["13", "component classes"], ["3", "unseen boards tested"]],
    steps: [
      ["Preprocess", "Thresholding + edges"],
      ["Mask", "Contour filtering"],
      ["Detect", "YOLO11"],
      ["Classify", "13 classes"],
      ["Validate", "Uno, Mega, Pi"],
    ],
    image: { src: "/assets/project-covers/pcb-detection-evidence.jpg", alt: "YOLO11 component detections on an unseen circuit board" },
    evidence: ["Thirteen component classes covering ICs, connectors, passive parts, and board features.", "OpenCV thresholding, edge extraction, contour filtering, and image masking before detection.", "Generalization checks on Arduino Uno, Arduino Mega 2560, and Raspberry Pi layouts outside the training set."],
    sourceNote: "Preprocessing, model scope, class count, and unseen-board detections checked against the implementation and recorded results.",
    stack: ["Python", "YOLO11", "OpenCV"],
    links: [{ label: "View source", href: `${GH}/AER850_Project_3` }],
    writeup: {
      problem: "Different circuit boards change the arrangement, scale, and appearance of components. Detection has to be checked on layouts beyond the training examples.",
      approach:
        "I combined OpenCV thresholding, edge extraction, contour filtering, and masking with an Ultralytics YOLO11 workflow for 13 component classes, then checked it on Arduino Uno, Arduino Mega 2560, and Raspberry Pi boards.",
      limits: "A handful of unseen boards is a qualitative generalization check, not a broad production benchmark.",
    },
  },
};

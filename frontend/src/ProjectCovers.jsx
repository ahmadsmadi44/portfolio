import { useEffect, useMemo, useState } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight, Play, Workflow } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PitchLines, useData, useVideoAvailable } from './PitchPrimitives';

const matchUrl = '/pitch-vision/tactics/liverpool-madrid-five';

function DetectionPreview() {
  return <div className="cover-detection">
    <img src="/assets/pitch-detection-preview.jpg" alt="High-confidence YOLO detections on the Liverpool and Real Madrid sample" />
    <div className="cover-readout"><span className="live-dot"/> 21 HIGH-CONFIDENCE TRACKS <strong>YOLO · REAL INFERENCE</strong></div>
  </div>;
}

function HeatmapPreview({ data }) {
  const player = data?.ratings?.['RMA-14'];
  const points = data?.heatmaps?.['RMA-14'] || [];
  const sampled = useMemo(() => points.filter((_, index) => index % Math.max(1, Math.floor(points.length / 62)) === 0).slice(0, 62), [points]);
  return <div className="cover-performance">
    <div className="performance-copy">
      <span className="cover-kicker">PLAYER PERFORMANCE</span>
      <div className="cover-player">
        <img src="/assets/players/RMA-14.jpg" alt="Casemiro" />
        <div><strong>{player?.name || 'Casemiro'}</strong><small>Defensive midfield · 5 min sample</small></div>
        <b>{player?.rating?.toFixed(1) || '8.1'}</b>
      </div>
      <div className="cover-stat-row"><span>Distance measured</span><strong>{player ? `${Math.round(player.distanceM)} m` : '582 m'}</strong></div>
      <div className="cover-stat-row"><span>Pressure events</span><strong>{player?.pressures ?? 8}</strong></div>
      <div className="cover-stat-row"><span>Visible sample</span><strong>{player ? `${Math.round(player.visibleRatio * 100)}%` : '83%'}</strong></div>
    </div>
    <div className="cover-heatmap" aria-label="Casemiro movement heatmap preview">
      <svg viewBox="0 0 105 68" role="img">
        <defs><radialGradient id="coverHeat"><stop offset="0" stopColor="#f4c66a" stopOpacity=".8"/><stop offset=".45" stopColor="#9bcf83" stopOpacity=".55"/><stop offset="1" stopColor="#9bcf83" stopOpacity="0"/></radialGradient></defs>
        <rect width="105" height="68" rx="2" fill="#edf1e8"/>
        <g color="#bac7b7"><PitchLines/></g>
        {sampled.map(([x,y], index) => <circle key={index} cx={x} cy={y} r="5.8" fill="url(#coverHeat)"/>) }
      </svg>
      <span>MOVEMENT DENSITY · REAL EXPORTED COORDINATES</span>
    </div>
  </div>;
}

function TacticsPreview({ data, active }) {
  const frames = data?.frames || [];
  const indexes = useMemo(() => {
    if (!frames.length) return [];
    const windowSize = Math.ceil(frames.length / 6);
    return Array.from({length:6},(_,windowIndex) => {
      const start=windowIndex*windowSize;
      const end=Math.min(frames.length,start+windowSize);
      let best=start;
      for(let index=start+1;index<end;index+=1){
        if((frames[index]?.players?.length||0)>(frames[best]?.players?.length||0))best=index;
      }
      return best;
    });
  }, [frames]);
  const [step, setStep] = useState(0);
  useEffect(() => {
    if (!active || indexes.length < 2 || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const timer = window.setInterval(() => setStep(value => (value + 1) % indexes.length), 720);
    return () => window.clearInterval(timer);
  }, [active, indexes.length]);
  const frame = frames[indexes[step]] || frames[0];
  const players = frame?.players || [];
  const visible = new Set(players.map(player => player.id));
  const edges = (frame?.edges || []).filter(([a,b]) => visible.has(a) && visible.has(b)).slice(0, 36);
  const byId = Object.fromEntries(players.map(player => [player.id, player]));
  return <div className="cover-tactics">
    <div className="tactics-toolbar"><span><i/> LIVE SHAPE MODEL</span><strong>{frame ? `${Math.floor(frame.time / 60)}:${String(Math.floor(frame.time % 60)).padStart(2,'0')}` : '0:00'}</strong></div>
    <svg viewBox="0 0 105 68" role="img" aria-label="Animated tactical formation preview">
      <rect width="105" height="68" rx="2" fill="#176e50"/>
      <g color="#d4ead9" opacity=".68"><PitchLines/></g>
      <g className="cover-edges">{edges.map(([a,b], index) => <line key={`${a}-${b}-${index}`} x1={byId[a].x} y1={byId[a].y} x2={byId[b].x} y2={byId[b].y} stroke={byId[a].team === 1 ? '#ef8172' : '#a8c6ff'} strokeWidth=".28" opacity=".55"/>)}</g>
      {players.map(player => <g key={player.id} className="cover-tactical-player" style={{transform:`translate(${player.x}px, ${player.y}px)`}}><circle r="1.7" fill={player.team === 1 ? '#e76554' : '#d7e2f4'} stroke="#fff" strokeWidth=".42"/><text y=".55" textAnchor="middle">{player.number}</text></g>)}
      {frame?.ball && <circle cx={frame.ball.x} cy={frame.ball.y} r="1" fill="#f9d555" stroke="#fff" strokeWidth=".3"/>}
    </svg>
    <div className="tactics-readout"><div><small>PHASE</small><strong>{frame?.phases?.['1'] || 'building possession'}</strong></div><div><small>DEFENSIVE BLOCK</small><strong>{frame?.shapes?.['2']?.block || 'mid block'}</strong></div><div><small>VISIBLE PLAYERS</small><strong>{players.length} / 22</strong></div></div>
  </div>;
}

export function PitchStoryCarousel() {
  const [slide, setSlide] = useState(0);
  const { data } = useData('/tactics/liverpool-madrid-five.json');
  const slides = [
    { label: '01 · Detect', title: 'From footage to tracks', node: <DetectionPreview/> },
    { label: '02 · Measure', title: 'Every player, inspectable', node: <HeatmapPreview data={data}/> },
    { label: '03 · Understand', title: 'Shape becomes tactical evidence', node: <TacticsPreview data={data} active={slide === 2}/> },
  ];
  const move = direction => setSlide(value => (value + direction + slides.length) % slides.length);
  return <div className="pitch-carousel" aria-roledescription="carousel" aria-label="Football Match Analytics previews">
    <div className="carousel-stage">{slides.map((item,index) => <div key={item.label} className="carousel-slide" aria-hidden={slide !== index} data-active={slide === index}>{item.node}</div>)}</div>
    <div className="carousel-controls">
      <div><button type="button" onClick={() => move(-1)} aria-label="Previous preview"><ChevronLeft size={17}/></button><button type="button" onClick={() => move(1)} aria-label="Next preview"><ChevronRight size={17}/></button></div>
      <span><small>{slides[slide].label}</small>{slides[slide].title}</span>
      <div className="carousel-dots" aria-label="Choose preview">{slides.map((item,index) => <button key={item.label} type="button" aria-label={`Show ${item.title}`} aria-current={slide === index ? 'true' : undefined} onClick={() => setSlide(index)}/>)}</div>
      <Link to={matchUrl} aria-label="Open Football Match Analytics"><ArrowRight size={17}/></Link>
    </div>
  </div>;
}

function AutomationFlowGraphic() {
  return <div className="automation-flow" aria-hidden="true">
    <div className="automation-topline"><span><i/> WALKTHROUGH READY</span><span>N8N · END TO END</span></div>
    <div className="automation-nodes">
      <div><small>01</small><Workflow size={19}/><strong>Trigger</strong><span>Event or schedule</span></div><b>→</b>
      <div><small>02</small><span className="node-glyph">API</span><strong>Enrich</strong><span>Research + data</span></div><b>→</b>
      <div><small>03</small><span className="node-glyph">AI</span><strong>Decide</strong><span>Model + rules</span></div><b>→</b>
      <div><small>04</small><span className="node-glyph">✓</span><strong>Review</strong><span>Human approval</span></div>
    </div>
    <div className="automation-play"><span><Play size={14} fill="currentColor"/></span><div><strong>Video walkthrough slot</strong><small>Drop in the recording when it is ready</small></div></div>
  </div>;
}

export function AutomationShowcase() {
  const videoSrc = '/assets/automation/n8n-workflow-walkthrough.mp4';
  const available = useVideoAvailable(videoSrc);
  return <section className="automation-showcase" aria-labelledby="automation-heading">
    <div className="automation-visual">{available ? <video controls preload="metadata" playsInline aria-label="n8n automation workflow walkthrough"><source src={videoSrc} type="video/mp4"/></video> : <AutomationFlowGraphic/>}</div>
    <div className="automation-copy"><span className="eyebrow">AUTOMATION IN PRACTICE</span><h3 id="automation-heading">A workflow you can watch run.</h3><p>This reserved case study will follow one n8n automation from trigger to delivery, including the APIs, AI decisions, human checks, data handoff, and the operational result.</p><div className="tags"><span>n8n</span><span>API orchestration</span><span>AI agents</span><span>Human review</span></div><div className="automation-status"><span className="live-dot"/> {available ? 'Walkthrough available' : 'Walkthrough recording coming next'}</div></div>
  </section>;
}

export function ProjectCover({ id }) {
  if (id === 'coordinate-classifier') return <div className="ml-cover spatial-cover" role="img" aria-label="Conceptual spatial classification illustration, with the model's 0.9961 weighted F1 result">
    <svg viewBox="0 0 600 340" aria-hidden="true"><defs><pattern id="spatialGrid" width="30" height="30" patternUnits="userSpaceOnUse"><path d="M 30 0 L 0 0 0 30" fill="none" stroke="#d7dece" strokeWidth="1"/></pattern></defs><rect width="600" height="340" fill="#e9eee2"/><rect x="245" width="355" height="340" fill="url(#spatialGrid)"/><path d="M300 285 L470 195 L570 240 M470 195 L470 45" fill="none" stroke="#87967b" strokeWidth="2"/>{Array.from({length:30},(_,i) => {const group=Math.floor(i/10),n=i%10;return <circle key={i} cx={330+group*82+(n%3)*14} cy={225-group*65-Math.floor(n/3)*16+(n%2)*6} r="5" fill={['#56774f','#af895f','#819dac'][group]}/>})}<text x="565" y="263" fill="#637557" fontSize="15">x</text><text x="474" y="36" fill="#637557" fontSize="15">z</text><text x="282" y="303" fill="#637557" fontSize="15">y</text></svg>
    <div className="spatial-cover-copy"><span>FROM POSITION<br/>TO PREDICTION</span><strong>0.9961</strong><small>weighted F1</small></div>
  </div>;
  const covers = {
    'coordinate-classifier': { image: '/assets/project-covers/coordinate-model-evidence.jpg', alt: 'Spatial coordinate plot and confusion matrix from the trained classifiers', metric: '0.9961 weighted F1', label: 'MODEL COMPARISON · STRATIFIED 5-FOLD CV' },
    'visual-inspection': { image: '/assets/project-covers/surface-inspection-evidence.jpg', alt: 'CNN training curve and a real aircraft surface defect sample', metric: '3 defect classes', label: 'CNN TRAINING · VISUAL GENERALIZATION' },
    'component-detection': { image: '/assets/project-covers/pcb-detection-evidence.jpg', alt: 'YOLO component detections on an unseen Arduino Mega board', metric: '13 component classes', label: 'YOLO11 · UNSEEN BOARD VALIDATION' },
  };
  const cover = covers[id] || covers['component-detection'];
  return <div className={`ml-cover evidence-cover ${id}`}><img src={cover.image} alt={cover.alt}/><div><span>{cover.label}</span><strong>{cover.metric}</strong></div></div>;
}

export function ContentEngineCover() {
  return <div className="ce-editorial-cover" aria-label="Content Engine: from one interview to a complete North Loam content package">
    <img className="ce-cover-background" src="/assets/content-engine/editorial-02-roastery-interior.png" alt="North Loam demo roastery"/>
    <div className="ce-cover-caption"><span>THE CONTENT ENGINE</span><strong>One interview.<br/>An entire content studio.</strong></div>
    <div className="ce-cover-stack" aria-hidden="true"><div className="ce-cover-document"><small>NORTH LOAM</small><strong>The story<br/>behind the cup.</strong><i/><i/><i/><span>Brand strategy</span></div><div className="ce-cover-photo"><img src="/assets/content-engine/carousel-01.png" alt=""/><span>How we source.</span><small>01 / 08 · INSTAGRAM</small></div></div>
    <div className="ce-cover-bottom">STRATEGY · SOCIAL · EDITORIAL <span>13 deliverables</span></div>
  </div>;
}

export function ContentEngineFlow() {
  const stages = [
    ['01','Intake','Interview + Drive'],['02','Remember','Tenant-scoped RAG'],['03','Orchestrate','48-node LangGraph'],
    ['04','Review','Interrupt + resume'],['05','Improve','Feedback retrieval'],['06','Operate','API, evals, tracing'],
  ];
  return <section className="engine-story" aria-labelledby="engine-story-heading"><span className="eyebrow">THE AUTOMATION, END TO END</span><h2 id="engine-story-heading">One service from client context to approved delivery.</h2><p>Each layer answers a production question: whose context is this, what should the agent remember, where can a person intervene, and what happens when a run fails?</p><div className="engine-stages">{stages.map(([number,title,detail],index)=><div key={number}><small>{number}</small><strong>{title}</strong><span>{detail}</span>{index < stages.length-1 && <i>→</i>}</div>)}</div><div className="engine-signal"><span>Agent orchestration</span><span>RAG architecture</span><span>API integration</span><span>Human-in-the-loop</span><span>Reliability</span><span>Evaluation</span></div></section>;
}

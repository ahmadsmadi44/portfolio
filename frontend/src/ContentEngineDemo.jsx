import { useEffect, useMemo, useState } from 'react';
import { Instagram, Linkedin, Slack, FileText, Images, Mail, CalendarDays, Palette, Fingerprint, ChartNoAxesCombined, Activity, Check, ChevronDown, Database, MessageSquare, Pause, Play, RefreshCw, Search, ShieldCheck, Workflow } from 'lucide-react';
import ContentEngineArtifactViewer from './ContentEngineArtifactViewer';
import { demoDeliverables, intakeHighlights, runNodes } from './contentEngineDemoData';
import { reliabilityFacts, retrievalExample, revisionCycle } from './contentEngineEvidence';

const groups=[{id:'brand',title:'Brand & strategy',codes:['BI','TV','DNA','CA','CAL']},{id:'content',title:'Content studio',codes:['BP','LI','CAR','IMG','NL']},{id:'delivery',title:'Review & delivery',codes:['NTN','SLK','OPS']}];
const outputIcons={BI:Palette,TV:MessageSquare,DNA:Fingerprint,CA:ChartNoAxesCombined,CAL:CalendarDays,BP:FileText,LI:Linkedin,CAR:Instagram,IMG:Images,NL:Mail,SLK:Slack,OPS:Activity};
const iconFor = type => ({ INPUT: MessageSquare, SEARCH: Search, RAG: Database, HUMAN: Pause, SYNC: Check, WEBHOOK: RefreshCw }[type] || Workflow);

export default function ContentEngineDemo() {
  const [step, setStep] = useState(-1);
  const [running, setRunning] = useState(false);
  const [category,setCategory]=useState('content');
  const [selected, setSelected] = useState(null);
  useEffect(() => {
    if (!running) return;
    if (step >= runNodes.length - 1) { setRunning(false); return; }
    const timer = setTimeout(() => setStep(value => value + 1), step < 0 ? 240 : 520);
    return () => clearTimeout(timer);
  }, [running, step]);
  const visible = useMemo(() => demoDeliverables.filter(item => item.at <= step), [step]);
  const finished = step >= runNodes.length - 1;
  const start = () => { setStep(-1); setSelected(null); setRunning(true); };

  return <section className="ce-run" aria-labelledby="ce-run-heading">
    <div className="ce-run-intro"><div><span className="eyebrow">INTERACTIVE SAMPLE RUN</span><h2 id="ce-run-heading">One interview enters. A complete content operation runs.</h2></div><p>Replay the recorded North Loam demo to see the intake become tenant memory, strategy, channel content, review pages, and an auditable delivery trail.</p></div>
    <div className="ce-console">
      <div className="ce-windowbar"><span>North Loam / A sample client journey</span><span>Interactive demo</span></div>
      <div className="ce-intake-panel">
        <div><span className="ce-kicker">FOUNDER INTAKE / STRUCTURED DISCOVERY</span><h3>North Loam Coffee Co.</h3><p>“I’d rather this be a little less polished and a little more true. If it could have been written by any coffee brand, it isn’t doing its job.”</p></div>
        <dl>{intakeHighlights.map(([key,value]) => <div key={key}><dt>{key}</dt><dd>{value}</dd></div>)}</dl>
      </div>
      <div className="ce-console-actions"><button type="button" onClick={start} disabled={running}>{running ? <><Pause size={14}/> Run in progress</> : <><Play size={14} fill="currentColor"/> {finished ? 'Replay sample run' : 'Run the sample'}</>}</button><span>{finished ? 'Run complete · checkpoint saved' : running ? `${Math.max(step + 1, 0)} of ${runNodes.length} stages resolved` : 'Deterministic offline demo · no API keys required'}</span></div>
      <div className="ce-journey" aria-label="Workflow progress">
        {[['Discover','Interview, research & brand memory',0,4],['Create','Calendar, posts & visual storytelling',5,8],['Deliver','Notion, Slack & human review',9,11]].map(([title,detail,first,last],i)=><div key={title} data-state={step>last || finished?'done':step>=first?'active':'waiting'}><span>{step>last || finished?<Check size={18}/>:String(i+1).padStart(2,'0')}</span><div><strong>{title}</strong><small>{detail}</small></div></div>)}
      </div>
      <div className="ce-run-status" role="status"><i data-running={running}/>{finished ? 'Approved · 13 deliverables recorded' : step >= 0 ? `Running: ${runNodes[Math.min(step, runNodes.length - 1)].title}` : 'Ready: founder interview loaded'}</div>
      <div className="ce-deliverable-studio">
        <div className="ce-studio-heading"><div><span className="eyebrow">THE OUTPUT</span><h3>Your content, ready to explore.</h3></div><span>{visible.length} / {demoDeliverables.length} ready</span></div>
        <div className="ce-category-tabs" aria-label="Deliverable categories">{groups.map(group=><button key={group.id} aria-pressed={category===group.id} onClick={()=>setCategory(group.id)}>{group.title}<span>{demoDeliverables.filter(item=>group.codes.includes(item.code)&&item.at<=step).length}/{group.codes.length}</span></button>)}</div>
        <div className="ce-output-list ce-output-cards">{demoDeliverables.filter(item=>groups.find(group=>group.id===category).codes.includes(item.code)).map(item=>{const ready=item.at<=step,Icon=outputIcons[item.code];return <button key={item.code} disabled={!ready} data-ready={ready} aria-haspopup="dialog" onClick={()=>setSelected(item)}><span className={`ce-platform-icon platform-${item.code}`}>{Icon?<Icon size={23}/>:<b className="notion-mark">N</b>}</span><div><strong>{item.title}</strong><small>{item.meta}</small><small className="artifact-open-label">{ready?'Open deliverable →':'Available as the demo runs'}</small></div></button>})}</div>
      </div>
      <details className="ce-workflow-details"><summary>Under the hood <span>12 stages · 48 nodes</span><ChevronDown size={18}/></summary><div className="ce-node-grid">{runNodes.map((node,index)=>{const Icon=iconFor(node.type);return <div className="ce-run-node" data-state={finished||index<step?'done':index===step?'active':'waiting'} key={node.id}><span className="ce-node-type">{String(index+1).padStart(2,'0')} / {node.type}</span><Icon size={18}/><div><strong>{node.title}</strong><small>{node.detail}</small></div></div>})}</div></details>
    </div>
      <div className="ce-section-heading"><span className="eyebrow">BEHIND THE WORKFLOW</span><h2>Context. Judgment. A human in control.</h2><p>The parts that turn content generation into a dependable client service.</p></div>
      <div className="ce-system-grid">
        <article><span className="ce-kicker">TENANT-SCOPED BRAND MEMORY</span><h3><Database size={17}/> Retrieval before generation</h3><p>For <code>{retrievalExample.feeds}</code>, the graph embeds “{retrievalExample.query}” and retrieves only North Loam context.</p>{retrievalExample.matches.map(match => <blockquote key={match.source}><span>{match.source} · similarity {match.score.toFixed(2)}</span>{match.content}</blockquote>)}</article>
        <article><span className="ce-kicker">REAL PAUSE, TARGETED REVISION</span><h3><MessageSquare size={17}/> Human in the loop</h3><blockquote className="review-quote">“{revisionCycle.feedback}”</blockquote><div className="ce-review-path">{revisionCycle.steps.slice(0,5).map((item,index) => <span key={item}>{index > 0 && <i>→</i>}{item.replace('Round 1 — ','')}</span>)}</div><p>Feedback routes into the Blog Post node, re-syncs that page, and returns to review without restarting the other content branches.</p></article>
        <article><span className="ce-kicker">AUTOMATED QUALITY SIGNAL</span><h3><ShieldCheck size={17}/> Tone compliance</h3><div className="ce-score"><strong>94<small>/100</small></strong><span><i/></span></div><p>A second model scores each republishable piece against the client’s own voice guide. It informs the reviewer and never silently blocks delivery.</p></article>
      </div>
      <div className="ce-reliability"><div><span className="eyebrow">RELIABILITY & OPERATIONS</span><h2>Built for the next run, too.</h2><p>Recovery, visibility, and clear boundaries are part of the implementation.</p></div><div className="ce-reliability-items">{reliabilityFacts.map(f => <details key={f.title}><summary>{f.title}<ChevronDown size={18}/></summary><p>{f.body}</p><small>Verified by {f.verifiedBy}</small></details>)}</div></div>
    {selected && <ContentEngineArtifactViewer key={selected.code} item={selected} onClose={() => setSelected(null)}/>}
  </section>;
}

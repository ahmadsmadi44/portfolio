import TacticalLab from './TacticalLab';
import { useEffect } from 'react';
import { Link, Navigate, Route, Routes, useLocation, useParams } from 'react-router-dom';
import { ArrowUpRight, ArrowLeft, ArrowRight, Check, Database, GitBranch, Layers, MessageSquare, Workflow } from 'lucide-react';
import { projects } from './projects';
import { useVideoAvailable } from './PitchPrimitives';
import { retrievalExample, revisionCycle, reliabilityFacts } from './contentEngineEvidence';
import { AutomationShowcase, ContentEngineFlow, PitchStoryCarousel, ProjectCover } from './ProjectCovers';

const github = 'https://github.com/ahmadsmadi-oss';

function ScrollReset() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) requestAnimationFrame(() => document.getElementById(hash.slice(1))?.scrollIntoView());
    else window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}

function Header() {
  return <header className="site-header wrap">
    <Link className="identity" to="/" aria-label="Ahmad Al-Smadi home"><span className="monogram">a.</span><span>Ahmad Al-Smadi</span></Link>
    <nav aria-label="Main navigation"><Link to="/#work">Work</Link><Link to="/#about">About</Link><a href={github} target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={14}/></a></nav>
  </header>;
}

export function EngineDiagram({ large = false }) {
  return <div className={`engine-diagram ${large ? 'large' : ''}`} aria-label="Architecture illustration: brand memory feeds generation, human review sends feedback for revision">
    <div className="diagram-caption"><span className="live-dot"/> BRAND-AWARE WORKFLOW <span>INTAKE → APPROVAL</span></div>
    <div className="memory-node"><Database size={18}/><div>Brand memory<small>Context, tone, past feedback</small></div><span className="node-chip">RAG</span></div>
    <div className="connector vertical"/>
    <div className="diagram-middle"><div className="diagram-node"><GitBranch size={18}/><span>Generate</span><small>LangGraph</small></div><ArrowRight size={18}/><div className="diagram-node review"><MessageSquare size={18}/><span>Human review</span><small>Pause & resume</small></div></div>
    <div className="feedback-line"><span>↳</span> Retrieve feedback. Revise the right piece. <span>↵</span></div>
    <div className="diagram-footer"><Check size={13}/> Client-scoped context <span>Architecture illustration</span></div>
  </div>;
}

function ContentEngineEvidence() {
  return <section className="ce-evidence" aria-label="Real captured evidence from a demo run">
    <div className="section-heading"><div><span className="eyebrow">EVIDENCE, NOT A MOCKUP</span><h2>What the agent actually did on one run.</h2></div><span className="muted">Every quote and number below is captured output from a real invocation of the graph, not written for this page.</span></div>
    <div className="ce-evidence-grid">
      <article className="ce-card">
        <h3>Retrieval, scoped to one tenant</h3>
        <p>Before writing the {retrievalExample.feeds.replace('_', ' ')}, the graph embeds a query and pulls the top matches out of tenant <code>{retrievalExample.tenant}</code>'s own vector store — never another client's.</p>
        <p className="ce-query">“{retrievalExample.query}”</p>
        {retrievalExample.matches.map((m, i) => <div className="ce-match" key={i}><div className="ce-match-head"><span>{m.source}</span><span>similarity {m.score.toFixed(2)}</span></div><p>{m.content}</p></div>)}
      </article>
      <article className="ce-card">
        <h3>A review cycle that actually closes</h3>
        <p className="ce-query">“{revisionCycle.feedback}”</p>
        <p className="muted" style={{ fontSize: '.78rem', margin: '-4px 0 14px' }}>reviewer feedback on {revisionCycle.targetTitle}, round 1</p>
        <ol className="ce-steps">{revisionCycle.steps.map((s, i) => <li key={i}>{s}</li>)}</ol>
        {revisionCycle.mockTextIdentical && <p className="ce-caveat">Honest caveat: the demo's mock text provider replies with the same fixture regardless of prompt content, so the re-generated text here is unchanged from the original — the pause / feedback / re-publish / re-notify / re-review mechanics above are exactly what live mode does too; live mode calls the real Anthropic API with this feedback in the prompt and would return genuinely revised text.</p>}
      </article>
      <article className="ce-card">
        <h3>Reliability &amp; operations</h3>
        <p>What makes this a service instead of a script.</p>
        <ul className="ce-facts">{reliabilityFacts.map((f, i) => <li key={i}><strong>{f.title}.</strong> {f.body}</li>)}</ul>
      </article>
    </div>
    <p className="source-note">Verified by {[...new Set([revisionCycle.verifiedBy, ...reliabilityFacts.map(f => f.verifiedBy)])].join(', ')} — the currently-passing test suite this claims are checked against, not a description written from memory.</p>
  </section>;
}

function PitchPreview() {
  const videoSrc = '/tactics/liverpool-madrid-five/video.mp4';
  const available = useVideoAvailable(videoSrc);
  return <div className="pitch-preview">
    {available
      ? <video muted playsInline loop preload="metadata" poster="/assets/pitch-preview.jpg" aria-label="Liverpool versus Real Madrid tactical camera clip" onMouseEnter={e => {if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) e.currentTarget.play().catch(() => {});}} onMouseLeave={e => e.currentTarget.pause()}><source src={videoSrc} type="video/mp4"/></video>
      : <img src="/assets/pitch-preview.jpg" alt="Liverpool versus Real Madrid tactical camera still" style={{width:'100%',height:'100%',objectFit:'cover'}}/>}
    <div className="preview-caption"><span className="live-dot"/> {available ? 'REAL FOOTAGE, MEASURED MOVEMENT' : 'MEASURED MOVEMENT · FOOTAGE NOT PUBLISHED'} <span>05:30</span></div>
  </div>;
}

function Portfolio() {
  return <>
    <main>
      <section className="hero wrap">
        <div className="eyebrow"><span className="live-dot"/> AI AUTOMATION & APPLIED MACHINE LEARNING</div>
        <h1>AI systems.<br/><span>Built for real work.</span></h1>
        <div className="hero-bottom"><p>I’m Ahmad. I turn complex workflows into useful AI systems, combining hands-on automation with an engineering approach to how things work.</p><Link to="/#work" className="text-link">Explore the work <ArrowRight size={18}/></Link></div>
        <div className="hero-foot"><span>DISCOVERY → SYSTEM DESIGN → DELIVERY</span><span>Based in Canada · Open to AI automation & solutions roles</span></div>
      </section>
      <section id="work" className="work-section wrap">
        <div className="section-heading"><div><span className="eyebrow">SELECTED WORK</span><h2>Ideas, made operational.</h2></div><span className="muted">Agent systems, computer vision,<br/>automation, and applied ML.</span></div>
        <div className="featured-grid">{projects.slice(0,2).map(p => <article className="featured" key={p.id}>
          {p.id === 'pitch-vision'
            ? <PitchStoryCarousel/>
            : <Link to={`/projects/${p.id}`} className="project-visual" aria-label={`Explore ${p.title}`}><EngineDiagram/><span className="open-circle"><ArrowUpRight size={20}/></span></Link>}
          <div className="project-meta"><span>{p.number} / {p.kind}</span><span>{p.status}</span></div><h3><Link to={p.id === 'pitch-vision' ? '/pitch-vision/tactics/liverpool-madrid-five' : `/projects/${p.id}`}>{p.title}</Link></h3><p>{p.summary}</p><div className="tags">{p.stack.map(s => <span key={s}>{s}</span>)}</div>
        </article>)}</div>
        <AutomationShowcase/>
        <div className="small-projects">{projects.slice(2).map(p => <Link to={`/projects/${p.id}`} className="small-project" key={p.id}>
          <ProjectCover id={p.id}/>
          <span className="project-meta">{p.number} / {p.kind}</span><h3>{p.title}<ArrowUpRight size={19}/></h3><p>{p.summary}</p>
        </Link>)}</div>
      </section>
      <section id="about" className="about-section wrap"><div><span className="eyebrow">THE PERSON BEHIND THE WORK</span><h2>Engineering instincts.<br/>A builder’s approach.</h2></div><div className="about-copy"><p>I’m an aerospace engineering graduate who builds AI workflows and software. Through Lumora AI, my automation consultancy, I work from the business problem outward: map the process, find the useful intervention, build it, and make it understandable to the people using it.</p><p>At Celestica, I worked across engineering and project management, including Power BI reporting for executive stakeholders. That experience shapes how I approach AI: clear requirements, visible progress, and systems people can operate.</p><div className="experience-row"><span>Founder, Lumora AI</span><span>AI automation consulting</span></div><div className="experience-row"><span>Celestica</span><span>May 2024 – September 2025</span></div><div className="experience-row"><span>B.Eng, Aerospace Engineering</span><span>Toronto Metropolitan University</span></div></div></section>
      <section className="capabilities wrap"><span className="eyebrow">HOW I CONTRIBUTE</span><div><article><Workflow size={23}/><h3>Workflow to working system</h3><p>Discovery, process mapping, n8n automation, API integration, and practical handoff.</p></article><article><GitBranch size={23}/><h3>Agents with useful boundaries</h3><p>Retrieval, stateful orchestration, human review, and recovery when a step fails.</p></article><article><Layers size={23}/><h3>Models you can inspect</h3><p>Computer vision, classical ML, evaluation, and interfaces that make the output understandable.</p></article></div></section>
    </main>
    <footer className="site-footer wrap"><div><span className="eyebrow">LET’S BUILD SOMETHING USEFUL</span><h2>Have a problem in mind?</h2><a className="text-link" href={github} target="_blank" rel="noreferrer">Find me on GitHub <ArrowUpRight size={17}/></a></div><div className="footer-bottom"><span>Ahmad Al-Smadi</span><span>AI automation · Applied ML · Systems thinking</span></div></footer>
  </>;
}

function CaseStudy() {
  const { id } = useParams();
  const p = projects.find(p => p.id === id);
  useEffect(() => { document.title = p ? `${p.title} | Ahmad Al-Smadi` : 'Project not found'; }, [p]);
  if (!p) return <NotFound/>;
  if (p.id === 'pitch-vision') return <Navigate to="/pitch-vision/tactics/liverpool-madrid-five" replace/>;
  return <main className="case-study wrap"><Link to="/#work" className="back-link"><ArrowLeft size={16}/> Selected work</Link><div className="eyebrow">{p.kind} / {p.status}</div><h1>{p.title}</h1><p className="case-lead">{p.lead}</p><div className="tags">{p.stack.map(s => <span key={s}>{s}</span>)}</div>
    {p.id === 'content-engine' && <><EngineDiagram large/><ContentEngineFlow/></>}
    {p.id === 'pitch-vision' && <div className="case-demo"><PitchPreview/><Link to="/pitch-vision/tactics/liverpool-madrid-five" className="button">Explore the match demo <ArrowRight size={17}/></Link></div>}
    <div className="case-columns"><aside><span className="eyebrow">THE BUILD</span><p>{p.kind}</p>{p.repo && <a className="text-link" href={p.repo} target="_blank" rel="noreferrer">View source <ArrowUpRight size={15}/></a>}</aside><div><section><h2>The problem</h2><p>{p.challenge}</p></section><section><h2>How I approached it</h2><p>{p.approach}</p></section><section><h2>What to inspect</h2><ul className="evidence-list">{p.evidence.map(e => <li key={e}><Check size={17}/>{e}</li>)}</ul></section><section><h2>The tradeoffs</h2><p>{p.tradeoff}</p></section><p className="source-note">{p.sourceNote}</p></div></div>
    {p.id === 'content-engine' && <ContentEngineEvidence/>}
    <Link to="/#work" className="text-link"><ArrowLeft size={16}/> Back to all work</Link>
  </main>;
}

function NotFound() { return <main className="wrap empty-state"><h1>That page isn’t here.</h1><Link to="/" className="button">Return to the portfolio</Link></main>; }

export default function App() { return <><ScrollReset/><a className="skip-link" href="#main-content">Skip to content</a><Header/><div id="main-content"><Routes><Route path="/" element={<Portfolio/>}/><Route path="/projects/:id" element={<CaseStudy/>}/><Route path="/pitch-vision" element={<Navigate to="/pitch-vision/tactics/liverpool-madrid-five" replace/>}/><Route path="/pitch-vision/tactics/:id" element={<TacticalLab/>}/><Route path="/pitch-vision/:id" element={<Navigate to="/pitch-vision/tactics/liverpool-madrid-five" replace/>}/><Route path="*" element={<NotFound/>}/></Routes></div></>; }

import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Download, X } from 'lucide-react';
import artifacts from './contentEngineArtifacts.json';
import './ContentEngineArtifacts.css';

// Render trusted local Markdown as React text, never as executable HTML.
function inline(text) {
  return text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g).map((part,i) => part.startsWith('**') ? <strong key={i}>{part.slice(2,-2)}</strong> : part.startsWith('`') ? <code key={i}>{part.slice(1,-1)}</code> : part.replace(/^\*|\*$/g,''));
}
export function ArtifactDocument({ text }) {
  const lines=text.split('\n'); const result=[];
  for(let i=0;i<lines.length;i++) {
    const line=lines[i].trim(); if(!line || /^---+$/.test(line)) continue;
    if(line.startsWith('|')) {
      const rows=[]; while(i<lines.length && lines[i].trim().startsWith('|')) {const row=lines[i].trim();if(!/^\|[\s:|-]+\|$/.test(row))rows.push(row.split('|').slice(1,-1).map(v=>v.trim()));i++;}i--;
      result.push(<div className="artifact-table" tabIndex={0} role="region" aria-label="Scrollable document table" key={i}><table><thead><tr>{rows[0]?.map((v,j)=><th key={j}>{inline(v)}</th>)}</tr></thead><tbody>{rows.slice(1).map((r,j)=><tr key={j}>{r.map((v,k)=><td key={k}>{inline(v)}</td>)}</tr>)}</tbody></table></div>);continue;
    }
    if(/^#{1,4} /.test(line)){const level=Math.min(4,line.match(/^#+/)[0].length+1),Tag=`h${level}`;result.push(<Tag key={i}>{inline(line.replace(/^#+ /,''))}</Tag>);continue;}
    if(/^[-*] /.test(line)){const items=[];while(i<lines.length && /^[-*] /.test(lines[i].trim()))items.push(lines[i++].trim().slice(2));i--;result.push(<ul key={i}>{items.map((v,j)=><li key={j}>{inline(v)}</li>)}</ul>);continue;}
    result.push(line.startsWith('> ') ? <blockquote key={i}>{inline(line.slice(2))}</blockquote> : <p key={i}>{inline(line)}</p>);
  }
  return <div className="artifact-document">{result}</div>;
}

export default function ContentEngineArtifactViewer({ item, onClose }) {
  const carouselTrack=useRef(null);
  const dialog=useRef(null); const [index,setIndex]=useState(0); const [reviewDoc,setReviewDoc]=useState('BI');
  const code=item.code;
  const collection=code==='CAR'?artifacts.carousel:code==='IMG'?artifacts.editorial:code==='LI'?artifacts.posts:null;
  const goTo=(next,instant=false)=>{if(code==='CAR'){const el=carouselTrack.current;el?.scrollTo({left:Math.max(0,Math.min(collection.length-1,next))*el.clientWidth,behavior:instant||window.matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});}else setIndex((next+collection.length)%collection.length);};
  const move=(direction,instant=false)=>goTo(index+direction,instant);
  useEffect(()=>{const el=dialog.current;const previous=document.activeElement;const overflow=document.body.style.overflow;document.body.style.overflow='hidden';el.showModal();return()=>{el.close();document.body.style.overflow=overflow;previous?.focus();};},[]);
  const documentCodes=['BI','TV','DNA','CA','CAL','BP','LI','CAR','NL'];
  return <dialog ref={dialog} className="artifact-dialog" aria-labelledby="artifact-title" onCancel={onClose} onClick={e=>{if(e.target===e.currentTarget)onClose();}} onKeyDown={e=>{if(collection && !['INPUT','TEXTAREA'].includes(e.target.tagName)){if(e.key==='ArrowRight'){e.preventDefault();move(1,true);}if(e.key==='ArrowLeft'){e.preventDefault();move(-1,true);}}}}>
    <header className="artifact-header"><div><span className="eyebrow">NORTH LOAM / DEMO DELIVERABLE</span><h2 id="artifact-title">{item.title}</h2></div><button type="button" onClick={onClose} aria-label="Close deliverable"><X size={22}/></button></header>
    <div className="artifact-body">
      {collection && <nav className="artifact-navigation" aria-label="Browse deliverable"><button disabled={code==='CAR' && index===0} onClick={()=>move(-1)} aria-label="Previous item"><ChevronLeft size={20}/></button><span aria-live="polite">{code==='LI'?'Post':code==='CAR'?'Slide':'Image'} {index+1} / {collection.length}</span><button disabled={code==='CAR' && index===collection.length-1} onClick={()=>move(1)} aria-label="Next item"><ChevronRight size={20}/></button></nav>}
      {code==='CAR' && <><div ref={carouselTrack} className="artifact-swipe-track" onScroll={e=>setIndex(Math.round(e.currentTarget.scrollLeft/e.currentTarget.clientWidth))} aria-label="Instagram slides, swipe horizontally">{collection.map((slide,i)=><div className="artifact-swipe-slide" key={slide.src} aria-label={`Slide ${i+1}`}><div className="artifact-carousel"><img src={slide.src} alt={slide.alt} draggable="false"/><div className="artifact-slide-copy"><span>north loam coffee co.</span><h3>{slide.copy}</h3><small>{String(i+1).padStart(2,'0')} / 08</small></div></div></div>)}</div><div className="artifact-slide-dots" aria-label="Choose a slide">{collection.map((slide,i)=><button key={slide.src} onClick={()=>goTo(i)} aria-label={`Go to slide ${i+1}`} aria-current={i===index?'true':undefined}/>)}</div><p className="artifact-note">Swipe through the story, or use the arrows to browse.</p></>}
      {code==='LI' && <article className="artifact-social"><div className="artifact-social-author"><img src={artifacts.editorial[0].src} alt="Generated portrait of the fictional demo founder"/><div><strong>Maren Okafor</strong><span>Founder, North Loam Coffee Co. · Demo post</span></div></div><span className="artifact-post-label">{collection[index].title}</span><ArtifactDocument text={collection[index].body}/><img className="artifact-post-image" src={collection[index].image.src} alt={collection[index].image.alt}/><p className="artifact-note">Supplied post copy with a matching editorial image. Preview only.</p></article>}
      {code==='IMG' && <><figure className="artifact-gallery"><img src={collection[index].src} alt={collection[index].alt}/><figcaption>{collection[index].alt}</figcaption></figure><div className="artifact-thumbnails">{collection.map((image,i)=><button key={image.src} onClick={()=>setIndex(i)} aria-label={`View ${image.alt}`} aria-current={i===index?'true':undefined}><img src={image.src} alt="" loading="lazy"/></button>)}</div></>}
      {artifacts.documents[code] && !collection && <>{code==='BP' && <img className="artifact-document-hero" src={artifacts.editorial[11].src} alt={artifacts.editorial[11].alt}/>} {code==='NL' && <div className="artifact-email-header"><span>From: Maren at North Loam</span><strong>From the Roastery, Issue 1</strong><span>To: North Loam subscribers · Email preview</span></div>}<ArtifactDocument text={artifacts.documents[code]}/></>}
      {code==='NTN' && <><p className="artifact-note">Notion review preview. The captured demo created nine page records without publishing to a live workspace.</p><div className="artifact-review-tabs">{artifacts.notion.map((page,i)=><button key={page.id} onClick={()=>setReviewDoc(documentCodes[i])} aria-pressed={reviewDoc===documentCodes[i]}>{page.title}</button>)}</div><ArtifactDocument text={artifacts.documents[reviewDoc]}/></>}
      {code==='SLK' && <><p className="artifact-note">Reconstructed review-notice preview for the sample workflow. No Slack message is sent from this site.</p><article className="artifact-message"><span className="eyebrow">CONTENT ENGINE · REVIEW QUEUE</span><h3>North Loam is ready for review.</h3><p>Your content package is prepared. Open a piece below to review its copy.</p><div className="artifact-review-tabs">{documentCodes.map((c,i)=><button key={c} onClick={()=>setReviewDoc(c)} aria-pressed={reviewDoc===c}>{artifacts.notion[i]?.title || c}</button>)}</div><p>Request changes on a single piece to route feedback back into that content branch.</p></article><ArtifactDocument text={artifacts.documents[reviewDoc]}/></>}
      {code==='OPS' && <><div className="artifact-run-summary"><div><span>Captured run</span><strong>{artifacts.trace.run_id}</strong></div><div><span>Recorded nodes</span><strong>{artifacts.trace.nodes.length}</strong></div><div><span>Provider mode</span><strong>Offline demo</strong></div></div><p className="artifact-note">Actual captured trace from the earlier 24-node demo; the current service has 48 nodes. This capture has no token-cost report, so no live spending is claimed.</p><div className="artifact-table" tabIndex={0} role="region" aria-label="Scrollable run trace"><table><thead><tr><th>Node</th><th>Status</th><th>Duration</th><th>Attempt</th></tr></thead><tbody>{artifacts.trace.nodes.map(node=><tr key={node.node_id}><td>{node.node_id}</td><td>{node.status}</td><td>{node.duration_ms} ms</td><td>{node.attempt}</td></tr>)}</tbody></table></div></>}
    </div>
    <footer className="artifact-footer"><span>Fictional demo brand · supplied sample content</span>{collection && <a href={(code==='LI'?collection[index].image:collection[index]).src} download><Download size={16}/> Save image</a>}<button onClick={onClose}>Done</button></footer>
  </dialog>;
}

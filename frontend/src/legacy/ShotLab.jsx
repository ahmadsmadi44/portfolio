import {useMemo,useState} from 'react';
import {Info} from 'lucide-react';
import {PitchLines} from './PitchPrimitives';
import {shotDisplayPosition} from './shotCoordinates';
import sample from './shotSample.json';
import './shotlab.css';

const colors={France:'#edd484',Croatia:'#ffffff'};
const fmt=value=>value.toFixed(2);
const percent=value=>`${(value*100).toFixed(1)}%`;
const total=shots=>shots.reduce((sum,shot)=>sum+shot.xg,0);

export const Flag=({team})=><span className="sl-flag" role="img" aria-label={`${team} flag`}>{team==='France'
  ?<svg viewBox="0 0 30 20" aria-hidden="true"><rect width="10" height="20" fill="#0055a4"/><rect x="10" width="10" height="20" fill="#fff"/><rect x="20" width="10" height="20" fill="#ef4135"/></svg>
  :<svg viewBox="0 0 30 20" aria-hidden="true"><rect width="30" height="6.67" fill="#ff0000"/><rect y="6.67" width="30" height="6.66" fill="#fff"/><rect y="13.33" width="30" height="6.67" fill="#171796"/><g transform="translate(11.5 5.5)"><rect width="7" height="8.5" rx=".6" fill="#fff" stroke="#171796" strokeWidth=".4"/>{[0,1,2,3,4].map(r=>[0,1,2,3,4].map(c=>(r+c)%2===0&&<rect key={`${r}${c}`} x={.7+c*1.12} y={.9+r*1.12} width="1.12" height="1.12" fill="#ff0000"/>))}</g></svg>}</span>;

function ShotMap({shots,selectedId,onSelect}){
  return <div className="tactical-field sl-field">
    <svg viewBox="-3 -3 111 74" role="group" aria-label={`Full-pitch shot map with ${shots.length} selectable shots, France toward the right goal and Croatia toward the left goal`}>
      <rect width="105" height="68" fill="#126849"/>
      <g color="#ffffff35"><PitchLines/></g>
      {shots.map(shot=>{
        const {x,y}=shotDisplayPosition(shot);
        const selected=selectedId===shot.id;
        const radius=Math.max(1.2,Math.min(2.6,1.1+shot.xg*2.25));
        return <g key={shot.id} className="sl-shot" role="button" tabIndex="0" aria-pressed={selected} aria-label={`${shot.player}, ${shot.team}, minute ${shot.minute}, ${percent(shot.xg)} xG${shot.goal?', goal':''}`} onClick={()=>onSelect(shot.id)} onKeyDown={event=>{if(event.key==='Enter'||event.key===' '){event.preventDefault();onSelect(shot.id)}}}>
          <circle cx={x} cy={y} r={radius+1.5} fill="transparent"/>
          {selected&&<><circle className="sl-halo" cx={x} cy={y} r={radius+2.1}/><circle className="sl-ring" cx={x} cy={y} r={radius+.9}/></>}
          <circle cx={x} cy={y} r={radius} fill={colors[shot.team]} fillOpacity={shot.goal?1:.74} stroke={shot.goal?'#06241a':'#0b3a2a'} strokeWidth={shot.goal?.32:.22}/>
          {shot.goal&&<circle cx={x} cy={y} r=".45" fill="#06241a"/>}
        </g>;
      })}
    </svg>
    <div className="field-caption"><span><i className="sl-dot" style={{background:colors.France}}/>France attacks →</span><span><i className="sl-dot" style={{background:colors.Croatia}}/>← Croatia attacks</span></div>
  </div>;
}

export default function ShotLab(){
  const [team,setTeam]=useState('all');
  const [player,setPlayer]=useState('all');
  const [selectedId,setSelectedId]=useState(null);
  const players=useMemo(()=>[...new Set(sample.shots.filter(s=>team==='all'||s.team===team).map(s=>s.player))].sort(),[team]);
  const shots=sample.shots.filter(s=>(team==='all'||s.team===team)&&(player==='all'||s.player===player));
  const selected=shots.find(s=>s.id===selectedId)||shots[0];
  const france=sample.shots.filter(s=>s.team==='France');
  const croatia=sample.shots.filter(s=>s.team==='Croatia');
  const playerRows=[...new Set(shots.map(s=>s.player))].map(name=>({name,shots:shots.filter(s=>s.player===name)})).sort((a,b)=>total(b.shots)-total(a.shots));
  const chooseTeam=value=>{setTeam(value);setPlayer('all');setSelectedId(null)};

  return <div className="sl-root">
    <header className="lab-heading sl-heading">
      <div><span className="eyebrow">FOOTBALL / EXPECTED GOALS</span><h2 className="sl-title">Every shot,<br/><em>priced in goals.</em></h2></div>
      <p>A shot-level xG model scores the 2018 World Cup final. France and Croatia are held out of its training data.</p>
    </header>

    <section className="sl-fixture" aria-label="France versus Croatia, final score four to two">
      <div><Flag team="France"/><strong>France</strong><small>{france.length} shots</small></div>
      <span className="sl-score">4 : 2<small>FINAL SCORE</small></span>
      <div><Flag team="Croatia"/><strong>Croatia</strong><small>{croatia.length} shots</small></div>
    </section>

    <div className="sl-context"><Info size={16}/><span>This match is separate from the Liverpool and Real Madrid clip. That clip has no confirmed shots or xG.</span></div>

    <section className="lab-quality" aria-label="Expected goals summary"><div><small>France xG</small><strong>{fmt(total(france))}</strong></div><div><small>Croatia xG</small><strong>{fmt(total(croatia))}</strong></div><div><small>Shots mapped</small><strong>{sample.shots.length}</strong></div><div><small>Held-out Brier score</small><strong>{sample.model.heldOutBrier.toFixed(3)}</strong></div></section>

    <div className="lab-layout">
      <section className="lab-board-card">
        <div className="lab-toolbar">
          <div className="team-switch" aria-label="Filter shots by team">{[['all','All shots'],['France','France'],['Croatia','Croatia']].map(([value,label])=><button key={value} aria-pressed={team===value} onClick={()=>chooseTeam(value)}>{value!=='all'&&<i style={{background:colors[value],boxShadow:'inset 0 0 0 1px #0003'}}/>}{label}</button>)}</div>
          <label className="sl-player-filter">Player<select aria-label="Filter shots by player" value={player} onChange={e=>{setPlayer(e.target.value);setSelectedId(null)}}><option value="all">All players</option>{players.map(name=><option key={name} value={name}>{name}</option>)}</select></label>
        </div>
        <ShotMap shots={shots} selectedId={selected?.id} onSelect={setSelectedId}/>
        <p className="sl-note">Bubble size shows xG. A centre mark is a goal. Croatia's coordinates are rotated 180° to show the opposite goal, so this compares shots and is not a single moment. {shots.length} shots shown.</p>
      </section>
      <aside className="tactical-insights">
        <section className="phase-card">
          <span className="eyebrow">SELECTED SHOT</span>
          {selected?<><h2>{selected.player}</h2>
            <div className="shape-metrics"><div><small>Team</small><strong>{selected.team}</strong></div><div><small>xG</small><strong>{percent(selected.xg)}</strong></div><div><small>Minute</small><strong>{selected.minute}′{String(selected.second).padStart(2,'0')}</strong></div><div><small>Outcome</small><strong>{selected.goal?'Goal':selected.outcome}</strong></div></div>
            <p className="sl-data-note">{selected.bodyPart} / {selected.shotType}. xG is the chance of scoring from this shot, not a player rating.</p></>
            :<p className="sl-data-note">No shots match these filters.</p>}
        </section>
        <section className="event-list sl-players"><div className="panel-heading"><h2>Players in view</h2><span>{playerRows.length}</span></div>
          <div className="sl-player-list">{playerRows.map(row=><button key={row.name} onClick={()=>{setPlayer(row.name);setSelectedId(row.shots[0].id)}}><span>{row.shots.length} {row.shots.length===1?'shot':'shots'}</span><div><strong>{row.name}</strong><small>{fmt(total(row.shots))} xG</small></div></button>)}</div>
        </section>
      </aside>
    </div>

    <details className="methodology"><summary>Model, source and interpretation</summary>
      <p>Trained on {sample.model.trainingShots.toLocaleString()} shots from {sample.model.trainingMatches} other 2018 World Cup matches, with France v Croatia held out. The model uses distance, angle, body part, free-kick and penalty flags. It does not use defender or goalkeeper positions, so it is a baseline and not a provider's xG. Goals recorded as shot events differ from the final score because own goals are not shots.</p>
      <p>Shot events come from <a href={sample.eventUrl} target="_blank" rel="noreferrer">StatsBomb Open Data</a>. <img className="sl-sb" src="/assets/statsbomb-logo.png" alt="StatsBomb"/></p>
    </details>
  </div>;
}

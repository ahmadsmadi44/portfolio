import {useState} from 'react';
import TacticalLab from './TacticalLab';
import ShotLab from './ShotLab';

const tabs=[
  {id:'tactics',label:'Tactical analysis',match:'Liverpool v Real Madrid'},
  {id:'shots',label:'Shot Lab',match:'France v Croatia'},
];

export default function FootballTabs({matchId,initialTab='tactics'}){
  const [tab,setTab]=useState(initialTab);
  return <div className="fb-root">
    <div className="fb-tabs"><div role="tablist" aria-label="Football match analyses">
      {tabs.map(t=><button key={t.id} role="tab" id={`fb-tab-${t.id}`} aria-selected={tab===t.id} aria-controls={`fb-panel-${t.id}`} onClick={()=>setTab(t.id)}>{t.label}<small>{t.match}</small></button>)}
    </div></div>
    <div role="tabpanel" id={`fb-panel-${tab}`} aria-labelledby={`fb-tab-${tab}`}>
      {tab==='tactics'?<TacticalLab embeddedId={matchId}/>:<ShotLab/>}
    </div>
  </div>;
}

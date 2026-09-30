const data={
  cerebras:{
    num:'01',title:'Cerebras',tags:'PRODUCT / BRAND / SYSTEMS',dek:"Developer platform and brand for the world’s fastest AI chips.",hero:'assets/cerebras-hero.jpg',
    sections:[
      {label:'01 / CONTEXT',title:'A complex machine, made legible.',body:'Cerebras needed a product experience that could make specialized AI infrastructure feel direct and usable. The work connected product architecture, interface language, brand expression, and a reusable design system.',images:['assets/cerebras-brand.jpg']},
      {label:'02 / PRODUCT',title:'From infrastructure to interface.',body:'The developer console organizes models, API access, usage, service tiers, projects, organizations, and operational controls into one coherent workspace.',images:['assets/cerebras-usage.jpg']},
      {label:'03 / SYSTEM',title:'One visual language across layers.',body:'The system carries the same logic from hardware imagery and launch storytelling into dense product surfaces, allowing technical complexity to stay visible without becoming visual noise.',images:['assets/cerebras-hardware.jpg','assets/cerebras-world.jpg']}
    ]
  },
  lumiflow:{
    num:'02',title:'Lumiflow',tags:'PRODUCT / RESEARCH',dek:'Clinical intelligence designed around evidence, review, and decision making.',accent:'accent-lumi',
    sections:[
      {label:'01 / PROBLEM',title:'Make the evidence inspectable.',body:'Lumiflow turns clinical review into a workspace where teams can trace findings, compare signals, and understand why a recommendation exists.'},
      {label:'02 / WORKFLOW',title:'From transcript to structured signal.',body:'The interface separates source evidence, evaluation criteria, and output so reviewers can move quickly without losing provenance or context.'},
      {label:'03 / SYSTEM',title:'Designed for repeated judgment.',body:'Reusable patterns support provider specific rubrics, completeness checks, adherence review, and downstream operational decisions.'}
    ]
  },
  tachyus:{
    num:'03',title:'Tachyus',tags:'PRODUCT / SYSTEMS',dek:'Decision software for energy operators working with physical systems.',accent:'accent-tach',
    sections:[
      {label:'01 / CONTEXT',title:'Turn subsurface complexity into decisions.',body:'Tachyus brought modeling, operational data, and scenario planning into one product used by technical teams making high consequence field decisions.'},
      {label:'02 / PRODUCT',title:'Models become navigable.',body:'The interface focuses attention on assumptions, comparisons, and changes over time rather than exposing every underlying parameter at once.'},
      {label:'03 / SYSTEM',title:'A visual system built for dense technical work.',body:'Charts, maps, tables, controls, and scenario states share a compact hierarchy designed to support expert workflows without losing orientation.'}
    ]
  }
};
const dlg=document.querySelector('#caseStudy');
const content=document.querySelector('#caseContent');
const closeBtn=document.querySelector('.close');
function render(id){
  const p=data[id]; if(!p)return;
  const hero=p.hero?`<img class="case-image" src="${p.hero}" alt="${p.title} case study collage">`:`<div class="case-image placeholder ${p.accent||''}"></div>`;
  content.innerHTML=`<article class="case"><div class="case-nav"><strong>JJ</strong><span class="index">${p.num} / 03</span></div><section class="case-hero"><div class="case-title"><div class="num">${p.num}</div><h2 id="caseTitle">${p.title}</h2><div class="case-tags">${p.tags}</div><p>${p.dek}</p></div>${hero}</section>${p.sections.map((s,i)=>`<section class="case-section"><div class="section-label">${s.label}</div><div><h3>${s.title}</h3><p>${s.body}</p>${s.images?`<div class="case-gallery">${s.images.map((im,j)=>`<img class="${s.images.length===1?'wide':''}" src="${im}" alt="${p.title} project detail ${i+1}.${j+1}">`).join('')}</div>`:`<div class="placeholder ${p.accent||''}" aria-hidden="true"></div>`}</div></section>`).join('')}</article>`;
  if(!dlg.open)dlg.showModal();
  dlg.scrollTop=0; history.replaceState(null,'',`#case/${id}`);
}
function closeCase(){if(dlg.open)dlg.close();history.replaceState(null,'',location.pathname+location.search+'#work')}
document.querySelectorAll('.project-link').forEach(el=>el.addEventListener('click',()=>render(el.dataset.project)));
closeBtn.addEventListener('click',closeCase);
dlg.addEventListener('cancel',e=>{e.preventDefault();closeCase()});
dlg.addEventListener('click',e=>{if(e.target===dlg)closeCase()});
function route(){const m=location.hash.match(/^#case\/(.+)$/);if(m&&data[m[1]])render(m[1]);}
window.addEventListener('hashchange',route);route();

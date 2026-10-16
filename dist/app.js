const landing=document.querySelector('#landing');
const collection=document.querySelector('#collection');
const world=document.querySelector('#world');
const menu=document.querySelector('#menu');
const menuToggle=document.querySelector('.menu-toggle');
const dialog=document.querySelector('#lightbox');
let lastObject;
// Stable per-object variation: independent axes prevent a repeated diagonal seesaw.
function variation(index, salt){const n=Math.sin((index+1)*127.1+salt*311.7)*43758.5453;return n-Math.floor(n);}
window.collectionItems.forEach((item,i)=>{
 const button=document.createElement('button');button.className='object';button.dataset.id=item.id;button.setAttribute('aria-label','查看'+item.alt);
 const vars={
  x:`${item.x/12.8}%`,y:`${item.y/12.8}vw`,w:`${item.w/12.8}%`,z:item.z,
  mx:`${item.m[0]}%`,my:`${item.m[1]/3.9}vw`,mw:`${item.m[2]}%`,
  dx:`${(12+variation(i,1)*10).toFixed(2)}px`,dy:`${(15+variation(i,2)*11).toFixed(2)}px`,
  angle:`${(1.25+variation(i,3)*1.35).toFixed(2)}deg`,
  'x-time':`${(17+variation(i,4)*12).toFixed(3)}s`,
  'y-time':`${(19+variation(i,5)*14).toFixed(3)}s`,
  'r-time':`${(23+variation(i,6)*18).toFixed(3)}s`,
  'x-delay':`${(-variation(i,7)*43).toFixed(3)}s`,
  'y-delay':`${(-variation(i,8)*47).toFixed(3)}s`,
  'r-delay':`${(-variation(i,9)*53).toFixed(3)}s`,
  'x-direction':i%2?'reverse':'normal','y-direction':i%3?'normal':'reverse',
  depth:(i%4+1)*.25
 };
 Object.entries(vars).forEach(([k,v])=>button.style.setProperty('--'+k,v));
 const driftY=document.createElement('span');driftY.className='drift-y';
 const turn=document.createElement('span');turn.className='object-turn';
 const parallax=document.createElement('span');parallax.className='parallax';
 const img=new Image();img.src=item.src;img.alt=item.alt;img.draggable=false;img.decoding='async';if(i>9)img.loading='lazy';parallax.append(img);turn.append(parallax);driftY.append(turn);button.append(driftY);world.append(button);
 button.addEventListener('click',()=>{lastObject=button;const enlarged=dialog.querySelector('img');enlarged.src=img.src;enlarged.alt=img.alt;dialog.showModal();});
});
function closeMenu(){menu.hidden=true;menuToggle.setAttribute('aria-expanded','false');menuToggle.setAttribute('aria-label','打开菜单');}
function route(){const inside=location.hash==='#collection';landing.hidden=inside;collection.hidden=!inside;closeMenu();window.scrollTo(0,0);}
window.addEventListener('hashchange',route);route();
menuToggle.addEventListener('click',()=>{const open=menu.hidden;menu.hidden=!open;menuToggle.setAttribute('aria-expanded',String(open));menuToggle.setAttribute('aria-label',open?'关闭菜单':'打开菜单');});
menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
document.querySelector('#motion-toggle').addEventListener('click',e=>{const paused=document.body.classList.toggle('paused');e.currentTarget.setAttribute('aria-pressed',String(paused));e.currentTarget.setAttribute('aria-label',paused?'继续漂浮动画':'暂停漂浮动画');});
dialog.querySelector('.close').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close();});
dialog.addEventListener('close',()=>lastObject?.focus({preventScroll:true}));
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu();});
document.addEventListener('click',e=>{if(!e.target.closest('.site-header'))closeMenu();});
if(matchMedia('(pointer:fine)').matches&&!matchMedia('(prefers-reduced-motion:reduce)').matches){
 document.addEventListener('pointermove',e=>{if(document.body.classList.contains('paused'))return;world.style.setProperty('--px',`${(e.clientX/innerWidth-.5)*12}px`);world.style.setProperty('--py',`${(e.clientY/innerHeight-.5)*12}px`);},{passive:true});
}

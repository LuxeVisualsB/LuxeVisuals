(()=>{const L=[['index.html','Home'],['how-it-works.html','How it works'],['contact.html','Contact']],
cur=location.pathname.split('/').pop()||'index.html',$=s=>document.querySelector(s);
$('#hd').innerHTML=`<div class="w"><a class="logo" href="index.html">LuxeVisuals</a><nav>${L.map(([h,t])=>`<a href="${h}"${h==cur?' class="on"':''}>${t}</a>`).join('')}<a class="btn" href="contact.html">Get started</a></nav></div>`;
$('#ft').innerHTML=`<div class="w"><span>© ${new Date().getFullYear()} LuxeVisuals. South Africa.</span><a href="terms.html">Terms of Service</a></div>`;
const ld=$('#ld'),t0=performance.now(),hide=()=>setTimeout(()=>ld.classList.add('off'),Math.max(0,450-(performance.now()-t0)));
document.readyState=='complete'?hide():addEventListener('load',hide);
addEventListener('pageshow',e=>e.persisted&&ld.classList.add('off'));
document.addEventListener('click',e=>{const a=e.target.closest('a[href]');if(!a||a.target||e.metaKey||e.ctrlKey)return;const u=new URL(a.href);
if(u.origin!=location.origin||u.pathname==location.pathname)return;e.preventDefault();ld.classList.remove('off');setTimeout(()=>location.href=a.href,380)});
const io=new IntersectionObserver(es=>es.forEach(x=>x.isIntersecting&&(x.target.classList.add('in'),io.unobserve(x.target))),{threshold:.12});
document.querySelectorAll('.rv').forEach(el=>io.observe(el))})();

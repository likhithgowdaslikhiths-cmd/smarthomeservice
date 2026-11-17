
const PHONE = '+918660519706';
const WA = 'https://wa.me/918660519706?text=';
const enc = s => encodeURIComponent(s);
function openContact(message='Hi, I need an appliance repair in Mysore. My area is ____.') {
  const modal=document.getElementById('contactModal');
  if(modal){modal.classList.add('show');modal.setAttribute('aria-hidden','false');document.body.style.overflow='hidden';modal.querySelector('.modal-close')?.focus();}
  const wa=document.getElementById('modalWhatsApp');
  if(wa) wa.href=WA+enc(message);
}
function closeContact(){const m=document.getElementById('contactModal');if(m){m.classList.remove('show');m.setAttribute('aria-hidden','true');document.body.style.overflow='';}}
function initializePage() {
 const toggle=document.querySelector('.menu-toggle'), mobile=document.querySelector('.mobile-menu');
 if(toggle&&mobile) toggle.addEventListener('click',()=>{mobile.classList.toggle('open');toggle.setAttribute('aria-expanded',mobile.classList.contains('open'));});
 document.querySelectorAll('[data-contact]').forEach(el=>el.addEventListener('click',e=>{e.preventDefault();openContact(el.dataset.message||'Hi, I need an appliance repair in Mysore. My area is ____.');}));
 document.querySelectorAll('.modal-close,.modal-backdrop').forEach(el=>el.addEventListener('click',e=>{if(e.target===el)closeContact();}));
 document.addEventListener('keydown',e=>{if(e.key==='Escape')closeContact();});
 openContact();
}

if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',initializePage,{once:true});
else initializePage();


(function(){
  document.querySelectorAll('[data-accordion] .acc-item').forEach((item,idx)=>{
    if(idx===0) item.classList.add('active');
    const btn=item.querySelector('.acc-btn');
    btn?.addEventListener('click',()=>item.classList.toggle('active'));
  });

  document.querySelectorAll('.step').forEach((s,idx)=>{
    if(idx===0) s.classList.add('active');
    s.addEventListener('click',()=>{
      s.parentElement.querySelectorAll('.step').forEach(x=>x.classList.remove('active'));
      s.classList.add('active');
    });
  });

  document.querySelectorAll('[data-tabs]').forEach((wrap)=>{
    const buttons=wrap.querySelectorAll('.tab-btn');
    const panels=wrap.querySelectorAll('.tab-panel');
    const activate=(key)=>{
      buttons.forEach(b=>b.classList.toggle('active',b.dataset.tab===key));
      panels.forEach(p=>p.classList.toggle('active',p.dataset.panel===key));
    };
    buttons.forEach(b=>b.addEventListener('click',()=>activate(b.dataset.tab)));
    if(buttons[0]) activate(buttons[0].dataset.tab);
  });

  document.querySelectorAll('[data-carousel]').forEach((car)=>{
    const cards=[...car.querySelectorAll('.testi')];
    if(cards.length<2) return;
    const dots=car.querySelector('.carousel-dots');
    if(!dots) return;
    let per=window.innerWidth<780?1:3;
    let page=0;
    const total=Math.ceil(cards.length/per);
    const render=()=>{
      per=window.innerWidth<780?1:3;
      const totalNow=Math.ceil(cards.length/per);
      if(page>=totalNow) page=0;
      cards.forEach((c,i)=>{
        const p=Math.floor(i/per);
        c.style.display = p===page?'block':'none';
      });
      dots.querySelectorAll('button').forEach((d,i)=>d.classList.toggle('active',i===page));
    };
    dots.innerHTML='';
    for(let i=0;i<total;i++){
      const b=document.createElement('button');
      b.addEventListener('click',()=>{page=i;render();});
      dots.appendChild(b);
    }
    window.addEventListener('resize',render);
    render();
  });
})();

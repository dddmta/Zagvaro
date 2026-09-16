const products=[
{id:1,name:'Coffee Shop Social Pack',cat:'Ресторан',price:29900,desc:'Cafe болон coffee shop-д зориулсан social media post/story pack.',tone:'green'},
{id:2,name:'Salon Starter Pack',cat:'Beauty & Salon',price:39900,desc:'Beauty salon-ийн promo, price list, story template-үүд.',tone:'rose'},
{id:3,name:'Property Listing Kit',cat:'Үл хөдлөх',price:34900,desc:'Үл хөдлөхийн зар, carousel, story-д зориулсан багц.',tone:'blue'},
{id:4,name:'Online Shop Content Kit',cat:'Online Shop',price:49900,desc:'Бүтээгдэхүүний пост, sale banner, story template-үүд.',tone:'gold'},
{id:5,name:'Restaurant Menu Mini Pack',cat:'Ресторан',price:19900,desc:'Menu болон promotion-д зориулсан бэлэн загварууд.',tone:'orange'},
{id:6,name:'Freelancer Portfolio Kit',cat:'Freelancer',price:24900,desc:'Freelancer-ийн portfolio болон social media starter kit.',tone:'violet'}
];
let cart=JSON.parse(localStorage.getItem('tm_cart')||'[]'),active='Бүгд';
const grid=document.querySelector('#productsGrid'),filters=document.querySelector('#filters');
filters.innerHTML=['Бүгд',...new Set(products.map(x=>x.cat))].map(x=>`<button class="chip ${x==='Бүгд'?'active':''}" onclick="filterCat('${x}')">${x}</button>`).join('');
document.querySelector('#search').addEventListener('input',render);
function filterCat(c){active=c;document.querySelectorAll('.chip').forEach(x=>x.classList.toggle('active',x.textContent===c));render()}
function preview(x){return `<div class="preview ${x.tone}"><div class="previewTop"><span class="previewTag">${x.cat}</span><span class="previewMark">TM/01</span></div><div class="previewTitle">${x.name.replace(' Pack','').replace(' Kit','')}</div></div>`}
function render(){const q=document.querySelector('#search').value.toLowerCase();let list=products.filter(x=>(active==='Бүгд'||x.cat===active)&&`${x.name} ${x.cat} ${x.desc}`.toLowerCase().includes(q));const sort=document.querySelector('#sort')?.value||'featured';if(sort==='low')list.sort((a,b)=>a.price-b.price);if(sort==='high')list.sort((a,b)=>b.price-a.price);grid.innerHTML=list.length?list.map(x=>`<article class="card">${preview(x)}<div class="cardBody"><small>${x.cat.toUpperCase()}</small><h3>${x.name}</h3><p>${x.desc}</p><div class="cardFoot"><b class="price">${x.price.toLocaleString()}₮</b><div><button class="detailsBtn" onclick="openProduct(${x.id})">Дэлгэрэнгүй</button><button class="btn small" onclick="add(${x.id})">Сагсанд</button></div></div></div></article>`).join(''):`<div class="formCard" style="grid-column:1/-1;text-align:center"><b>Илэрц олдсонгүй.</b><p class="muted">Өөр түлхүүр үг эсвэл category сонгоод үзээрэй.</p></div>`}
function add(id){const p=products.find(x=>x.id===id);cart.push(p);save();toast('Сагсанд нэмэгдлээ ✓')}
function save(){localStorage.setItem('tm_cart',JSON.stringify(cart));document.querySelector('#cartCount').textContent=cart.length}
document.querySelector('#cartBtn').onclick=()=>{renderCart();document.querySelector('#cartModal').classList.remove('hidden')}
function renderCart(){document.querySelector('#cartItems').innerHTML=cart.length?cart.map((x,i)=>`<div class="row"><span>${x.name}</span><span>${x.price.toLocaleString()}₮ <button class="remove" onclick="removeItem(${i})">×</button></span></div>`).join(''):'<p class="muted">Сагс хоосон байна.</p>';document.querySelector('#cartTotal').textContent=cart.reduce((a,x)=>a+x.price,0).toLocaleString()+'₮'}
function removeItem(i){cart.splice(i,1);save();renderCart()}
function closeCart(){document.querySelector('#cartModal').classList.add('hidden')}
function openProduct(id){const x=products.find(p=>p.id===id);document.querySelector('#productDetail').innerHTML=`<div class="detailPreview"><span class="previewTag">${x.cat}</span><strong>${x.name}</strong><span>Template.mn • Digital product</span></div><div class="detailGrid"><div><span class="eyebrow">PRODUCT</span><h2 style="margin:7px 0">${x.name}</h2><p>${x.desc}</p><p class="muted tiny">✓ Instant digital product flow<br>✓ QPay / MonPay-ready checkout<br>✓ Production file delivery will be connected later</p></div><div><b class="price">${x.price.toLocaleString()}₮</b><button class="btn full" onclick="add(${x.id});closeProduct()">Сагсанд нэмэх</button></div></div>`;document.querySelector('#productModal').classList.remove('hidden')}
function closeProduct(){document.querySelector('#productModal').classList.add('hidden')}
function checkout(){if(!cart.length)return toast('Сагс хоосон байна.');location.href='checkout.html'}
function toast(msg){const t=document.querySelector('#toast');t.textContent=msg;t.classList.add('show');clearTimeout(window._toast);window._toast=setTimeout(()=>t.classList.remove('show'),1800)}
render();save();

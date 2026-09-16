const products=[
{id:1,name:'Coffee Shop Social Pack',cat:'Ресторан',price:29900,desc:'Cafe болон coffee shop-д зориулсан social media post/story pack.'},
{id:2,name:'Salon Starter Pack',cat:'Beauty & Salon',price:39900,desc:'Beauty salon-ийн promo, price list, story template-үүд.'},
{id:3,name:'Property Listing Kit',cat:'Үл хөдлөх',price:34900,desc:'Үл хөдлөхийн зар, carousel, story-д зориулсан багц.'},
{id:4,name:'Online Shop Content Kit',cat:'Online Shop',price:49900,desc:'Бүтээгдэхүүний пост, sale banner, story template-үүд.'},
{id:5,name:'Restaurant Menu Mini Pack',cat:'Ресторан',price:19900,desc:'Menu болон promotion-д зориулсан бэлэн загварууд.'},
{id:6,name:'Freelancer Portfolio Kit',cat:'Freelancer',price:24900,desc:'Freelancer-ийн portfolio болон social media starter kit.'}
];
let cart=JSON.parse(localStorage.getItem('tm_cart')||'[]'), active='Бүгд';
const grid=document.querySelector('#productsGrid'), filters=document.querySelector('#filters');
filters.innerHTML=['Бүгд',...new Set(products.map(x=>x.cat))].map(x=>`<button class="chip ${x==='Бүгд'?'active':''}" onclick="filterCat('${x}')">${x}</button>`).join('');
document.querySelector('#search').addEventListener('input',render);
function filterCat(c){active=c;document.querySelectorAll('.chip').forEach(x=>x.classList.toggle('active',x.textContent===c));render()}
function render(){const q=document.querySelector('#search').value.toLowerCase();grid.innerHTML=products.filter(x=>(active==='Бүгд'||x.cat===active)&&x.name.toLowerCase().includes(q)).map(x=>`<article class="card"><div class="preview">${x.cat}</div><div class="cardBody"><small>${x.cat}</small><h3>${x.name}</h3><p>${x.desc}</p><div class="cardFoot"><b>${x.price.toLocaleString()}₮</b><button class="btn small" onclick="add(${x.id})">Сагсанд</button></div></div></article>`).join('')}
function add(id){const p=products.find(x=>x.id===id);cart.push(p);save();alert('Сагсанд нэмэгдлээ.')}
function save(){localStorage.setItem('tm_cart',JSON.stringify(cart));document.querySelector('#cartCount').textContent=cart.length}
document.querySelector('#cartBtn').onclick=()=>{renderCart();document.querySelector('#cartModal').classList.remove('hidden')}
function renderCart(){document.querySelector('#cartItems').innerHTML=cart.length?cart.map((x,i)=>`<div class="row"><span>${x.name}</span><span>${x.price.toLocaleString()}₮ <button class="remove" onclick="removeItem(${i})">×</button></span></div>`).join(''):'<p class="muted">Сагс хоосон.</p>';document.querySelector('#cartTotal').textContent=cart.reduce((a,x)=>a+x.price,0).toLocaleString()+'₮'}
function removeItem(i){cart.splice(i,1);save();renderCart()}
function closeCart(){document.querySelector('#cartModal').classList.add('hidden')}
function closeProduct(){document.querySelector('#productModal').classList.add('hidden')}
function checkout(){if(!cart.length)return alert('Сагс хоосон байна.');location.href='checkout.html'}
render();save();
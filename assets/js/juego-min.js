const miModulo=(()=>{"use strict";let e=[];const t=["C","D","H","S"],a=["A","J","Q","K"];let r=[];const n=document.querySelector("#btnPedir"),o=document.querySelector("#btnDetener"),l=(document.querySelector("#btnNuevo"),document.querySelectorAll(".divCartas")),s=document.querySelectorAll("small"),d=()=>{e=[];for(let a=2;a<=10;a++)for(let r of t)e.push(a+r);for(let r of t)for(let t of a)e.push(t+r);return _.shuffle(e)},c=()=>{if(0===e.length)throw"No hay más cartas en la Baraja";return e.pop()},i=(e,t)=>(r[t]=r[t]+(e=>{const t=e.substring(0,e.length-1);return isNaN(t)?"A"===t?11:10:1*t})(e),s[t].innerText=r[t],r[t]),u=(e,t)=>{const a=document.createElement("img");a.src=`assets/cartas/${e}.png`,a.classList.add("carta"),l[t].append(a)},m=e=>{let t=0;do{const e=c();t=i(e,r.length-1),u(e,r.length-1)}while(t<e&&e<=21);(()=>{const[e,t]=r;setTimeout(()=>{t===e?alert("Nadie Gana"):e>21?alert("Computadora gana"):t>21?alert("Jugador gana"):alert("Computadora Gana")},100)})()};return n.addEventListener("click",()=>{const e=c(),t=i(e,0);u(e,0),t>21?(console.warn("Has perdido"),n.disabled=!0,o.disabled=!0,m(t)):21===t&&(console.warn("21! Genial!"),n.disabled=!0,o.disabled=!0,m(t))}),o.addEventListener("click",()=>{n.disabled=!0,o.disabled=!0,m(r[0])}),{nuevoJuego:(t=2)=>{e=d(),r=[];for(let e=0;e<t;e++)r.push(0);s.forEach(e=>e.innerText=0),l.forEach(e=>e.innerText=""),n.disabled=!1,o.disabled=!1}}})();
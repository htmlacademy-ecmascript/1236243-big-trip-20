(()=>{var t={484:function(t){t.exports=function(){"use strict";var t=6e4,e=36e5,i="millisecond",n="second",s="minute",r="hour",o="day",a="week",l="month",c="quarter",d="year",u="date",h="Invalid Date",f=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,p=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,m={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),ordinal:function(t){var e=["th","st","nd","rd"],i=t%100;return"["+t+(e[(i-20)%10]||e[i]||e[0])+"]"}},v=function(t,e,i){var n=String(t);return!n||n.length>=e?t:""+Array(e+1-n.length).join(i)+t},_={s:v,z:function(t){var e=-t.utcOffset(),i=Math.abs(e),n=Math.floor(i/60),s=i%60;return(e<=0?"+":"-")+v(n,2,"0")+":"+v(s,2,"0")},m:function t(e,i){if(e.date()<i.date())return-t(i,e);var n=12*(i.year()-e.year())+(i.month()-e.month()),s=e.clone().add(n,l),r=i-s<0,o=e.clone().add(n+(r?-1:1),l);return+(-(n+(i-s)/(r?s-o:o-s))||0)},a:function(t){return t<0?Math.ceil(t)||0:Math.floor(t)},p:function(t){return{M:l,y:d,w:a,d:o,D:u,h:r,m:s,s:n,ms:i,Q:c}[t]||String(t||"").toLowerCase().replace(/s$/,"")},u:function(t){return void 0===t}},$="en",y={};y[$]=m;var g=function(t){return t instanceof w},b=function t(e,i,n){var s;if(!e)return $;if("string"==typeof e){var r=e.toLowerCase();y[r]&&(s=r),i&&(y[r]=i,s=r);var o=e.split("-");if(!s&&o.length>1)return t(o[0])}else{var a=e.name;y[a]=e,s=a}return!n&&s&&($=s),s||!n&&$},M=function(t,e){if(g(t))return t.clone();var i="object"==typeof e?e:{};return i.date=t,i.args=arguments,new w(i)},D=_;D.l=b,D.i=g,D.w=function(t,e){return M(t,{locale:e.$L,utc:e.$u,x:e.$x,$offset:e.$offset})};var w=function(){function m(t){this.$L=b(t.locale,null,!0),this.parse(t)}var v=m.prototype;return v.parse=function(t){this.$d=function(t){var e=t.date,i=t.utc;if(null===e)return new Date(NaN);if(D.u(e))return new Date;if(e instanceof Date)return new Date(e);if("string"==typeof e&&!/Z$/i.test(e)){var n=e.match(f);if(n){var s=n[2]-1||0,r=(n[7]||"0").substring(0,3);return i?new Date(Date.UTC(n[1],s,n[3]||1,n[4]||0,n[5]||0,n[6]||0,r)):new Date(n[1],s,n[3]||1,n[4]||0,n[5]||0,n[6]||0,r)}}return new Date(e)}(t),this.$x=t.x||{},this.init()},v.init=function(){var t=this.$d;this.$y=t.getFullYear(),this.$M=t.getMonth(),this.$D=t.getDate(),this.$W=t.getDay(),this.$H=t.getHours(),this.$m=t.getMinutes(),this.$s=t.getSeconds(),this.$ms=t.getMilliseconds()},v.$utils=function(){return D},v.isValid=function(){return!(this.$d.toString()===h)},v.isSame=function(t,e){var i=M(t);return this.startOf(e)<=i&&i<=this.endOf(e)},v.isAfter=function(t,e){return M(t)<this.startOf(e)},v.isBefore=function(t,e){return this.endOf(e)<M(t)},v.$g=function(t,e,i){return D.u(t)?this[e]:this.set(i,t)},v.unix=function(){return Math.floor(this.valueOf()/1e3)},v.valueOf=function(){return this.$d.getTime()},v.startOf=function(t,e){var i=this,c=!!D.u(e)||e,h=D.p(t),f=function(t,e){var n=D.w(i.$u?Date.UTC(i.$y,e,t):new Date(i.$y,e,t),i);return c?n:n.endOf(o)},p=function(t,e){return D.w(i.toDate()[t].apply(i.toDate("s"),(c?[0,0,0,0]:[23,59,59,999]).slice(e)),i)},m=this.$W,v=this.$M,_=this.$D,$="set"+(this.$u?"UTC":"");switch(h){case d:return c?f(1,0):f(31,11);case l:return c?f(1,v):f(0,v+1);case a:var y=this.$locale().weekStart||0,g=(m<y?m+7:m)-y;return f(c?_-g:_+(6-g),v);case o:case u:return p($+"Hours",0);case r:return p($+"Minutes",1);case s:return p($+"Seconds",2);case n:return p($+"Milliseconds",3);default:return this.clone()}},v.endOf=function(t){return this.startOf(t,!1)},v.$set=function(t,e){var a,c=D.p(t),h="set"+(this.$u?"UTC":""),f=(a={},a[o]=h+"Date",a[u]=h+"Date",a[l]=h+"Month",a[d]=h+"FullYear",a[r]=h+"Hours",a[s]=h+"Minutes",a[n]=h+"Seconds",a[i]=h+"Milliseconds",a)[c],p=c===o?this.$D+(e-this.$W):e;if(c===l||c===d){var m=this.clone().set(u,1);m.$d[f](p),m.init(),this.$d=m.set(u,Math.min(this.$D,m.daysInMonth())).$d}else f&&this.$d[f](p);return this.init(),this},v.set=function(t,e){return this.clone().$set(t,e)},v.get=function(t){return this[D.p(t)]()},v.add=function(i,c){var u,h=this;i=Number(i);var f=D.p(c),p=function(t){var e=M(h);return D.w(e.date(e.date()+Math.round(t*i)),h)};if(f===l)return this.set(l,this.$M+i);if(f===d)return this.set(d,this.$y+i);if(f===o)return p(1);if(f===a)return p(7);var m=(u={},u[s]=t,u[r]=e,u[n]=1e3,u)[f]||1,v=this.$d.getTime()+i*m;return D.w(v,this)},v.subtract=function(t,e){return this.add(-1*t,e)},v.format=function(t){var e=this,i=this.$locale();if(!this.isValid())return i.invalidDate||h;var n=t||"YYYY-MM-DDTHH:mm:ssZ",s=D.z(this),r=this.$H,o=this.$m,a=this.$M,l=i.weekdays,c=i.months,d=function(t,i,s,r){return t&&(t[i]||t(e,n))||s[i].slice(0,r)},u=function(t){return D.s(r%12||12,t,"0")},f=i.meridiem||function(t,e,i){var n=t<12?"AM":"PM";return i?n.toLowerCase():n},m={YY:String(this.$y).slice(-2),YYYY:this.$y,M:a+1,MM:D.s(a+1,2,"0"),MMM:d(i.monthsShort,a,c,3),MMMM:d(c,a),D:this.$D,DD:D.s(this.$D,2,"0"),d:String(this.$W),dd:d(i.weekdaysMin,this.$W,l,2),ddd:d(i.weekdaysShort,this.$W,l,3),dddd:l[this.$W],H:String(r),HH:D.s(r,2,"0"),h:u(1),hh:u(2),a:f(r,o,!0),A:f(r,o,!1),m:String(o),mm:D.s(o,2,"0"),s:String(this.$s),ss:D.s(this.$s,2,"0"),SSS:D.s(this.$ms,3,"0"),Z:s};return n.replace(p,(function(t,e){return e||m[t]||s.replace(":","")}))},v.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},v.diff=function(i,u,h){var f,p=D.p(u),m=M(i),v=(m.utcOffset()-this.utcOffset())*t,_=this-m,$=D.m(this,m);return $=(f={},f[d]=$/12,f[l]=$,f[c]=$/3,f[a]=(_-v)/6048e5,f[o]=(_-v)/864e5,f[r]=_/e,f[s]=_/t,f[n]=_/1e3,f)[p]||_,h?$:D.a($)},v.daysInMonth=function(){return this.endOf(l).$D},v.$locale=function(){return y[this.$L]},v.locale=function(t,e){if(!t)return this.$L;var i=this.clone(),n=b(t,e,!0);return n&&(i.$L=n),i},v.clone=function(){return D.w(this.$d,this)},v.toDate=function(){return new Date(this.valueOf())},v.toJSON=function(){return this.isValid()?this.toISOString():null},v.toISOString=function(){return this.$d.toISOString()},v.toString=function(){return this.$d.toUTCString()},m}(),C=w.prototype;return M.prototype=C,[["$ms",i],["$s",n],["$m",s],["$H",r],["$W",o],["$M",l],["$y",d],["$D",u]].forEach((function(t){C[t[1]]=function(e){return this.$g(e,t[0],t[1])}})),M.extend=function(t,e){return t.$i||(t(e,w,M),t.$i=!0),M},M.locale=b,M.isDayjs=g,M.unix=function(t){return M(1e3*t)},M.en=y[$],M.Ls=y,M.p={},M}()},646:function(t){t.exports=function(){"use strict";var t,e,i=1e3,n=6e4,s=36e5,r=864e5,o=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,a=31536e6,l=2592e6,c=/^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/,d={years:a,months:l,days:r,hours:s,minutes:n,seconds:i,milliseconds:1,weeks:6048e5},u=function(t){return t instanceof $},h=function(t,e,i){return new $(t,i,e.$l)},f=function(t){return e.p(t)+"s"},p=function(t){return t<0},m=function(t){return p(t)?Math.ceil(t):Math.floor(t)},v=function(t){return Math.abs(t)},_=function(t,e){return t?p(t)?{negative:!0,format:""+v(t)+e}:{negative:!1,format:""+t+e}:{negative:!1,format:""}},$=function(){function p(t,e,i){var n=this;if(this.$d={},this.$l=i,void 0===t&&(this.$ms=0,this.parseFromMilliseconds()),e)return h(t*d[f(e)],this);if("number"==typeof t)return this.$ms=t,this.parseFromMilliseconds(),this;if("object"==typeof t)return Object.keys(t).forEach((function(e){n.$d[f(e)]=t[e]})),this.calMilliseconds(),this;if("string"==typeof t){var s=t.match(c);if(s){var r=s.slice(2).map((function(t){return null!=t?Number(t):0}));return this.$d.years=r[0],this.$d.months=r[1],this.$d.weeks=r[2],this.$d.days=r[3],this.$d.hours=r[4],this.$d.minutes=r[5],this.$d.seconds=r[6],this.calMilliseconds(),this}}return this}var v=p.prototype;return v.calMilliseconds=function(){var t=this;this.$ms=Object.keys(this.$d).reduce((function(e,i){return e+(t.$d[i]||0)*d[i]}),0)},v.parseFromMilliseconds=function(){var t=this.$ms;this.$d.years=m(t/a),t%=a,this.$d.months=m(t/l),t%=l,this.$d.days=m(t/r),t%=r,this.$d.hours=m(t/s),t%=s,this.$d.minutes=m(t/n),t%=n,this.$d.seconds=m(t/i),t%=i,this.$d.milliseconds=t},v.toISOString=function(){var t=_(this.$d.years,"Y"),e=_(this.$d.months,"M"),i=+this.$d.days||0;this.$d.weeks&&(i+=7*this.$d.weeks);var n=_(i,"D"),s=_(this.$d.hours,"H"),r=_(this.$d.minutes,"M"),o=this.$d.seconds||0;this.$d.milliseconds&&(o+=this.$d.milliseconds/1e3);var a=_(o,"S"),l=t.negative||e.negative||n.negative||s.negative||r.negative||a.negative,c=s.format||r.format||a.format?"T":"",d=(l?"-":"")+"P"+t.format+e.format+n.format+c+s.format+r.format+a.format;return"P"===d||"-P"===d?"P0D":d},v.toJSON=function(){return this.toISOString()},v.format=function(t){var i=t||"YYYY-MM-DDTHH:mm:ss",n={Y:this.$d.years,YY:e.s(this.$d.years,2,"0"),YYYY:e.s(this.$d.years,4,"0"),M:this.$d.months,MM:e.s(this.$d.months,2,"0"),D:this.$d.days,DD:e.s(this.$d.days,2,"0"),H:this.$d.hours,HH:e.s(this.$d.hours,2,"0"),m:this.$d.minutes,mm:e.s(this.$d.minutes,2,"0"),s:this.$d.seconds,ss:e.s(this.$d.seconds,2,"0"),SSS:e.s(this.$d.milliseconds,3,"0")};return i.replace(o,(function(t,e){return e||String(n[t])}))},v.as=function(t){return this.$ms/d[f(t)]},v.get=function(t){var e=this.$ms,i=f(t);return"milliseconds"===i?e%=1e3:e="weeks"===i?m(e/d[i]):this.$d[i],0===e?0:e},v.add=function(t,e,i){var n;return n=e?t*d[f(e)]:u(t)?t.$ms:h(t,this).$ms,h(this.$ms+n*(i?-1:1),this)},v.subtract=function(t,e){return this.add(t,e,!0)},v.locale=function(t){var e=this.clone();return e.$l=t,e},v.clone=function(){return h(this.$ms,this)},v.humanize=function(e){return t().add(this.$ms,"ms").locale(this.$l).fromNow(!e)},v.milliseconds=function(){return this.get("milliseconds")},v.asMilliseconds=function(){return this.as("milliseconds")},v.seconds=function(){return this.get("seconds")},v.asSeconds=function(){return this.as("seconds")},v.minutes=function(){return this.get("minutes")},v.asMinutes=function(){return this.as("minutes")},v.hours=function(){return this.get("hours")},v.asHours=function(){return this.as("hours")},v.days=function(){return this.get("days")},v.asDays=function(){return this.as("days")},v.weeks=function(){return this.get("weeks")},v.asWeeks=function(){return this.as("weeks")},v.months=function(){return this.get("months")},v.asMonths=function(){return this.as("months")},v.years=function(){return this.get("years")},v.asYears=function(){return this.as("years")},p}();return function(i,n,s){t=s,e=s().$utils(),s.duration=function(t,e){var i=s.locale();return h(t,{$l:i},e)},s.isDuration=u;var r=n.prototype.add,o=n.prototype.subtract;n.prototype.add=function(t,e){return u(t)&&(t=t.asMilliseconds()),r.bind(this)(t,e)},n.prototype.subtract=function(t,e){return u(t)&&(t=t.asMilliseconds()),o.bind(this)(t,e)}}}()}},e={};function i(n){var s=e[n];if(void 0!==s)return s.exports;var r=e[n]={exports:{}};return t[n].call(r.exports,r,r.exports,i),r.exports}i.n=t=>{var e=t&&t.__esModule?()=>t.default:()=>t;return i.d(e,{a:e}),e},i.d=(t,e)=>{for(var n in e)i.o(e,n)&&!i.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:e[n]})},i.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),(()=>{"use strict";const t={BEFOREBEGIN:"beforebegin",AFTERBEGIN:"afterbegin",BEFOREEND:"beforeend",AFTEREND:"afterend"};function e(t){const e=document.createElement("div");return e.innerHTML=t,e.firstElementChild}function n(e,i){let n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:t.BEFOREEND;i.insertAdjacentElement(n,e.getElement())}class s{getTemplate(){return'<ul class="trip-events__list"></ul>'}getElement(){return this.element||(this.element=e(this.getTemplate())),this.element}removeElement(){this.element=null}}class r{getTemplate(){return'<form class="trip-events__trip-sort  trip-sort" action="#" method="get">\n    <div class="trip-sort__item  trip-sort__item--day">\n      <input id="sort-day" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-day">\n      <label class="trip-sort__btn" for="sort-day">Day</label>\n    </div>\n\n    <div class="trip-sort__item  trip-sort__item--event">\n      <input id="sort-event" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-event" disabled>\n      <label class="trip-sort__btn" for="sort-event">Event</label>\n    </div>\n\n    <div class="trip-sort__item  trip-sort__item--time">\n      <input id="sort-time" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-time">\n      <label class="trip-sort__btn" for="sort-time">Time</label>\n    </div>\n\n    <div class="trip-sort__item  trip-sort__item--price">\n      <input id="sort-price" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-price" checked>\n      <label class="trip-sort__btn" for="sort-price">Price</label>\n    </div>\n\n    <div class="trip-sort__item  trip-sort__item--offer">\n      <input id="sort-offer" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-offer" disabled>\n      <label class="trip-sort__btn" for="sort-offer">Offers</label>\n    </div>\n  </form>'}getElement(){return this.element||(this.element=e(this.getTemplate())),this.element}removeElement(){this.element=null}}var o=i(484),a=i.n(o),l=i(646),c=i.n(l);a().extend(c());const d=(t,e)=>{const i=Math.ceil(Math.min(t,e)),n=Math.floor(Math.max(t,e)),s=Math.random()*(n-i+1)+i;return Math.floor(s)};function u(t,e){return t?a()(t).format(e):""}const h=(t,e)=>e.find((e=>t===e.id));class f{constructor(t){let{trip:e,offers:i,destination:n}=t;this.trip=e,this.offer=i,this.destination=n}getTemplate(){return function(t,e,i){const{basePrice:n,type:s,offers:r,destination:o,isFavorite:l,dateFrom:c,dateTo:d}=t,f=u(c,"H:m"),p=u(d,"H:m");return`<li class="trip-events__item">\n    <div class="event">\n      <time class="event__date" datetime="2019-03-18">MAR 18</time>\n      <div class="event__type">\n        <img class="event__type-icon" width="42" height="42" src="img/icons/${s}.png" alt="Event type icon">\n      </div>\n      <h3 class="event__title">${s} ${h(o,i).name}</h3>\n      <div class="event__schedule">\n        <p class="event__time">\n          <time class="event__start-time" datetime="${c}">${f}</time>\n          &mdash;\n          <time class="event__end-time" datetime="${d}">${p}</time>\n        </p>\n        <p class="event__duration">${((t,e)=>{const i=a()(t),n=a()(e),s=a().duration(n.diff(i)),{days:r,hours:o,minutes:l}=s.$d;switch(!0){case r>0:return s.format("D[D] H[H] m[M]");case o>0:return s.format("H[H] m[M]");case l<60:return s.format("m[M]")}})(c,d)}</p>\n      </div>\n      <p class="event__price">\n        &euro;&nbsp;<span class="event__price-value">${n}</span>\n      </p>\n      <h4 class="visually-hidden">Offers:</h4>\n      <ul class="event__selected-offers">\n        ${((t,e,i)=>{const n=t.find((t=>t.type===i)).offers,s=n.filter((t=>e.includes(t.id))),r=[];for(let t=0;t<s.length;t++)r.push(`<li class="event__offer">\n        <span class="event__offer-title">${n[t].title}</span>\n        &plus;&euro;&nbsp;\n        <span class="event__offer-price">${n[t].price}</span>\n      </li>`);return r.join("")})(e,r,s)}\n      </ul>\n      <button class="event__favorite-btn event__favorite-btn${(t=>!0===t?"--active":"")(l)}" type="button">\n        <span class="visually-hidden">Add to favorite</span>\n        <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">\n          <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>\n        </svg>\n      </button>\n      <button class="event__rollup-btn" type="button">\n        <span class="visually-hidden">Open event</span>\n      </button>\n    </div>\n  </li>`}(this.trip,this.offer,this.destination)}getElement(){return this.element||(this.element=e(this.getTemplate())),this.element}removeElement(){this.element=null}}class p{constructor(t){let{trip:e,offers:i,destination:n}=t;this.trip=e,this.offer=i,this.destination=n}getTemplate(){return function(t,e,i){const{type:n,offers:s,destination:r,dateFrom:o,dateTo:a}=t,l="DD/MM/YY HH:MM",c=u(o,l),d=u(a,l);return`<li class="trip-events__item">\n    <form class="event event--edit" action="#" method="post">\n      <header class="event__header">\n        <div class="event__type-wrapper">\n          <label class="event__type  event__type-btn" for="event-type-toggle-1">\n            <span class="visually-hidden">Choose event type</span>\n            <img class="event__type-icon" width="17" height="17" src="img/icons/${n}.png" alt="Event type icon">\n          </label>\n          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">\n\n          <div class="event__type-list">\n            <fieldset class="event__type-group">\n              <legend class="visually-hidden">Event type</legend>\n                ${((t,e)=>t.map((t=>`<div class="event__type-${t.type}">\n    <input id="event-type-${t.type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${t.type}" ${t.type===e?"checked":""}>\n    <label class="event__type-label  event__type-label--${t.type}" for="event-type-${t.type}-1">${t.type}</label>\n    </div>`)).join(""))(e,n)}\n            </fieldset>\n          </div>\n        </div>\n\n        <div class="event__field-group  event__field-group--destination">\n          <label class="event__label  event__type-output" for="event-destination-1">\n            ${n}\n          </label>\n          <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${h(r,i).name}" list="destination-list-1">\n          <datalist id="destination-list-1">\n            ${(t=>t.map((t=>`<option value='${t.name}'></option>`)))(i)}\n          </datalist>\n        </div>\n\n        <div class="event__field-group  event__field-group--time">\n          <label class="visually-hidden" for="event-start-time-1">From</label>\n          <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${c}">\n          &mdash;\n          <label class="visually-hidden" for="event-end-time-1">To</label>\n          <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${d}">\n        </div>\n\n        <div class="event__field-group  event__field-group--price">\n          <label class="event__label" for="event-price-1">\n            <span class="visually-hidden">Price</span>\n            &euro;\n          </label>\n          <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="">\n        </div>\n\n        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>\n        <button class="event__reset-btn" type="reset">Cancel</button>\n      </header>\n      <section class="event__details">\n        <section class="event__section  event__section--offers">\n          <h3 class="event__section-title  event__section-title--offers">Offers</h3>\n\n          <div class="event__available-offers">\n            ${((t,e,i)=>{const n=t.find((t=>t.type===i)).offers,s=[];for(let t=0;t<n.length;t++){const i=e.includes(n[t].id)?"checked":"";s.push(`<div class="event__offer-selector">\n        <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-1" type="checkbox" name="${n[t].id}" ${i}> \n        <label class="event__offer-label" for="${n[t].id}">\n          <span class="event__offer-title">${n[t].title}</span>\n          &plus;&euro;&nbsp;\n          <span class="event__offer-price">${n[t].price}</span>\n        </label>\n      </div>`)}return s.join("")})(e,s,n)}\n          </div>\n        </section>\n\n        <section class="event__section  event__section--destination">\n          <h3 class="event__section-title  event__section-title--destination">Destination</h3>\n          <p class="event__destination-description">${h(r,i).description}</p>\n\n          <div class="event__photos-container">\n            <div class="event__photos-tape">\n              ${((t,e)=>h(t,e).pictures.map((t=>`<img class="event__photo" src='${t.src}' alt='${t.description}'></img>`)))(r,i)}\n            </div>\n          </div>\n        </section>\n      </section>\n    </form>\n  </li>`}(this.trip,this.offer,this.destination)}getElement(){return this.element||(this.element=e(this.getTemplate())),this.element}removeElement(){this.element=null}}const m=[{id:1,description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",name:"London",pictures:[{src:`https://loremflickr.com/248/152?random=${Math.random()}`,description:"London is a capital of GB"},{src:`https://loremflickr.com/248/152?random=${Math.random()}`,description:"London is a capital of GB"},{src:`https://loremflickr.com/248/152?random=${Math.random()}`,description:"London is a capital of GB"},{src:`https://loremflickr.com/248/152?random=${Math.random()}`,description:"London is a capital of GB"}]},{id:2,description:"Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",name:"Berlin",pictures:[{src:`https://loremflickr.com/248/152?random=${Math.random()}`,description:"Berlin is beautiful city"},{src:`https://loremflickr.com/248/152?random=${Math.random()}`,description:"London is a capital of GB"},{src:`https://loremflickr.com/248/152?random=${Math.random()}`,description:"London is a capital of GB"}]},{id:3,description:"Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",name:"Amsterdam",pictures:[{src:`https://loremflickr.com/248/152?random=${Math.random()}`,description:"There are many bridges in Amsterdam"},{src:`https://loremflickr.com/248/152?random=${Math.random()}`,description:"London is a capital of GB"},{src:`https://loremflickr.com/248/152?random=${Math.random()}`,description:"London is a capital of GB"},{src:`https://loremflickr.com/248/152?random=${Math.random()}`,description:"London is a capital of GB"}]}],v=[{type:"taxi",offers:[{id:0,title:"Choose the radio",price:d(10,15)},{id:1,title:"Choose Comfort",price:d(50,80)},{id:2,title:"Choose Business",price:d(100,150)}]},{type:"bus",offers:[{id:0,title:"Choose a seat",price:d(10,30)},{id:1,title:"Choose Comfort",price:d(30,50)}]},{type:"train",offers:[{id:0,title:"Choose a seat",price:d(20,40)},{id:1,title:"Choose breakfast",price:d(50,70)},{id:2,title:"Choose Comfort",price:d(80,100)}]},{type:"ship",offers:[{id:0,title:"Choose a seat",price:d(40,60)},{id:1,title:"Choose breakfast",price:d(70,100)},{id:2,title:"Choose dinner",price:d(100,150)},{id:3,title:"Choose Comfort",price:d(120,180)}]},{type:"drive",offers:[{id:0,title:"Choose the radio",price:d(100,150)},{id:1,title:"Choose Comfort",price:d(100,150)},{id:2,title:"Choose Business",price:d(100,150)}]},{type:"flight",offers:[{id:0,title:"Choose a seat",price:d(40,60)},{id:1,title:"Glass of whiskey",price:d(70,90)},{id:2,title:"Choose Business",price:d(100,150)}]},{type:"check-in",offers:[{id:0,title:"Choose an air conditioner",price:d(30,50)},{id:1,title:"Glass of whiskey",price:d(70,90)},{id:2,title:"Choose Comfort",price:d(100,150)}]},{type:"sightseeing",offers:[{id:0,title:"Choose a gid",price:d(50,80)},{id:1,title:"Glass of bourbon",price:d(70,90)},{id:2,title:"Choose the bus",price:d(30,50)}]},{type:"restaurant",offers:[{id:0,title:"Choose a bottle of wine",price:d(90,200)},{id:1,title:"Choose breakfast",price:d(30,50)},{id:2,title:"Choose dinner",price:d(100,150)},{id:3,title:"Choose music",price:d(60,80)},{id:4,title:"chef's dish",price:d(150,250)}]}],_=[{id:1,basePrice:d(400,800),dateFrom:"2022-07-10T19:55:56.845Z",dateTo:"2022-07-11T23:22:13.375Z",destination:1,isFavorite:!1,type:"check-in",offers:[1,2]},{id:2,basePrice:d(400,800),dateFrom:"2022-10-10T18:55:56.845Z",dateTo:"2022-10-11T19:22:13.375Z",destination:2,isFavorite:!0,type:"drive",offers:[1,2]},{id:3,basePrice:d(400,800),dateFrom:"2023-05-01T17:55:56.845Z",dateTo:"2023-06-24T15:22:13.375Z",destination:3,isFavorite:!1,type:"restaurant",offers:[1,2]},{id:4,basePrice:d(400,800),dateFrom:"2023-07-10T20:55:56.845Z",dateTo:"2023-07-11T09:22:13.375Z",destination:3,isFavorite:!0,type:"bus",offers:[0,1]}],$=()=>{return(t=_)[d(0,t.length-1)];var t},y=document.querySelector(".trip-main"),g=y.querySelector(".trip-controls__filters"),b=document.querySelector(".trip-events"),M=new class{points=Array.from({length:3},$);offersAll=v;descriptionsCity=m;getPoints(){return this.points}getDescription(){return this.descriptionsCity}getOffers(){return this.offersAll}},D=new class{tripListComponent=new s;constructor(t){let{tripContainer:e,pointsModel:i}=t;this.tripContainer=e,this.pointsModel=i}init(){this.boardTrip=[...this.pointsModel.getPoints()],this.destination=[...this.pointsModel.getDescription()],this.offers=[...this.pointsModel.getOffers()],n(new r,this.tripContainer),n(this.tripListComponent,this.tripContainer),n(new p({trip:this.boardTrip[0],offers:this.offers,destination:this.destination}),this.tripListComponent.getElement());for(let t=0;t<this.boardTrip.length;t++)n(new f({trip:this.boardTrip[t],offers:this.offers,destination:this.destination}),this.tripListComponent.getElement())}}({tripContainer:b,pointsModel:M});n(new class{getTemplate(){return'<section class="trip-main__trip-info  trip-info">\n    <div class="trip-info__main">\n      <h1 class="trip-info__title">Amsterdam &mdash; Chamonix &mdash; Geneva</h1>\n\n      <p class="trip-info__dates">Mar 18&nbsp;&mdash;&nbsp;20</p>\n    </div>\n\n    <p class="trip-info__cost">\n      Total: &euro;&nbsp;<span class="trip-info__cost-value">1230</span>\n    </p>\n  </section>'}getElement(){return this.element||(this.element=e(this.getTemplate())),this.element}removeElement(){this.element=null}},y,t.AFTERBEGIN),n(new class{getTemplate(){return'<form class="trip-filters" action="#" method="get">\n    <div class="trip-filters__filter">\n      <input id="filter-everything" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="everything">\n      <label class="trip-filters__filter-label" for="filter-everything">Everything</label>\n    </div>\n\n    <div class="trip-filters__filter">\n      <input id="filter-future" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="future">\n      <label class="trip-filters__filter-label" for="filter-future">Future</label>\n    </div>\n\n    <div class="trip-filters__filter">\n      <input id="filter-present" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="present">\n      <label class="trip-filters__filter-label" for="filter-present">Present</label>\n    </div>\n\n    <div class="trip-filters__filter">\n      <input id="filter-past" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="past" checked>\n      <label class="trip-filters__filter-label" for="filter-past">Past</label>\n    </div>\n\n    <button class="visually-hidden" type="submit">Accept filter</button>\n  </form>'}getElement(){return this.element||(this.element=e(this.getTemplate())),this.element}removeElement(){this.element=null}},g),D.init()})()})();
//# sourceMappingURL=bundle.529e8af69e6b17487efd.js.map
import{i as L,c as A}from"./index-464058ad.js";/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */class R{constructor(){this.gestureId=0,this.requestedStart=new Map,this.disabledGestures=new Map,this.disabledScroll=new Set}createGesture(t){var r;return new W(this,this.newID(),t.name,(r=t.priority)!==null&&r!==void 0?r:0,!!t.disableScroll)}createBlocker(t={}){return new B(this,this.newID(),t.disable,!!t.disableScroll)}start(t,r,n){return this.canStart(t)?(this.requestedStart.set(r,n),!0):(this.requestedStart.delete(r),!1)}capture(t,r,n){if(!this.start(t,r,n))return!1;const a=this.requestedStart;let i=-1e4;if(a.forEach(c=>{i=Math.max(i,c)}),i===n){this.capturedId=r,a.clear();const c=new CustomEvent("ionGestureCaptured",{detail:{gestureName:t}});return document.dispatchEvent(c),!0}return a.delete(r),!1}release(t){this.requestedStart.delete(t),this.capturedId===t&&(this.capturedId=void 0)}disableGesture(t,r){let n=this.disabledGestures.get(t);n===void 0&&(n=new Set,this.disabledGestures.set(t,n)),n.add(r)}enableGesture(t,r){const n=this.disabledGestures.get(t);n!==void 0&&n.delete(r)}disableScroll(t){this.disabledScroll.add(t),this.disabledScroll.size===1&&document.body.classList.add(I)}enableScroll(t){this.disabledScroll.delete(t),this.disabledScroll.size===0&&document.body.classList.remove(I)}canStart(t){return!(this.capturedId!==void 0||this.isDisabled(t))}isCaptured(){return this.capturedId!==void 0}isScrollDisabled(){return this.disabledScroll.size>0}isDisabled(t){const r=this.disabledGestures.get(t);return!!(r&&r.size>0)}newID(){return this.gestureId++,this.gestureId}}class W{constructor(t,r,n,a,i){this.id=r,this.name=n,this.disableScroll=i,this.priority=a*1e6+r,this.ctrl=t}canStart(){return this.ctrl?this.ctrl.canStart(this.name):!1}start(){return this.ctrl?this.ctrl.start(this.name,this.id,this.priority):!1}capture(){if(!this.ctrl)return!1;const t=this.ctrl.capture(this.name,this.id,this.priority);return t&&this.disableScroll&&this.ctrl.disableScroll(this.id),t}release(){this.ctrl&&(this.ctrl.release(this.id),this.disableScroll&&this.ctrl.enableScroll(this.id))}destroy(){this.release(),this.ctrl=void 0}}class B{constructor(t,r,n,a){this.id=r,this.disable=n,this.disableScroll=a,this.ctrl=t}block(){if(this.ctrl){if(this.disable)for(const t of this.disable)this.ctrl.disableGesture(t,this.id);this.disableScroll&&this.ctrl.disableScroll(this.id)}}unblock(){if(this.ctrl){if(this.disable)for(const t of this.disable)this.ctrl.enableGesture(t,this.id);this.disableScroll&&this.ctrl.enableScroll(this.id)}}destroy(){this.unblock(),this.ctrl=void 0}}const I="backdrop-no-scroll",V=new R;/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */const g=(e,t,r,n)=>{const a=F(e)?{capture:!!n.capture,passive:!!n.passive}:!!n.capture;let i,c;return e.__zone_symbol__addEventListener?(i="__zone_symbol__addEventListener",c="__zone_symbol__removeEventListener"):(i="addEventListener",c="removeEventListener"),e[i](t,r,a),()=>{e[c](t,r,a)}},F=e=>{if(w===void 0)try{const t=Object.defineProperty({},"passive",{get:()=>{w=!0}});e.addEventListener("optsTest",()=>{},t)}catch{w=!1}return!!w};let w;const j=2e3,H=(e,t,r,n,a)=>{let i,c,b,u,d,l,S,y=0;const o=h=>{y=Date.now()+j,t(h)&&(!c&&r&&(c=g(e,"touchmove",r,a)),b||(b=g(h.target,"touchend",s,a)),u||(u=g(h.target,"touchcancel",s,a)))},p=h=>{y>Date.now()||t(h)&&(!l&&r&&(l=g(O(e),"mousemove",r,a)),S||(S=g(O(e),"mouseup",v,a)))},s=h=>{m(),n&&n(h)},v=h=>{E(),n&&n(h)},m=()=>{c&&c(),b&&b(),u&&u(),c=b=u=void 0},E=()=>{l&&l(),S&&S(),l=S=void 0},X=()=>{m(),E()},T=(h=!0)=>{h?(i||(i=g(e,"touchstart",o,a)),d||(d=g(e,"mousedown",p,a))):(i&&i(),d&&d(),i=d=void 0,X())};return{enable:T,stop:X,destroy:()=>{T(!1),n=r=t=void 0}}},O=e=>e instanceof Document?e:e.ownerDocument,K=(e,t,r)=>{const n=r*(Math.PI/180),a=e==="x",i=Math.cos(n),c=t*t;let b=0,u=0,d=!1,l=0;return{start(S,y){b=S,u=y,l=0,d=!0},detect(S,y){if(!d)return!1;const o=S-b,p=y-u,s=o*o+p*p;if(s<c)return!1;const v=Math.sqrt(s),m=(a?o:p)/v;return m>i?l=1:m<-i?l=-1:l=0,d=!1,!0},isGesture(){return l!==0},getDirection(){return l}}},N=e=>{let t=!1,r=!1,n=!0,a=!1;const i=Object.assign({disableScroll:!1,direction:"x",gesturePriority:0,passive:!0,maxAngle:40,threshold:10},e),c=i.canStart,b=i.onWillStart,u=i.onStart,d=i.onEnd,l=i.notCaptured,S=i.onMove,y=i.threshold,o=i.passive,p=i.blurOnStart,s={type:"pan",startX:0,startY:0,startTime:0,currentX:0,currentY:0,velocityX:0,velocityY:0,deltaX:0,deltaY:0,currentTime:0,event:void 0,data:void 0},v=K(i.direction,i.threshold,i.maxAngle),m=V.createGesture({name:e.gestureName,priority:e.gesturePriority,disableScroll:e.disableScroll}),E=f=>{const M=z(f);return r||!n||(x(f,s),s.startX=s.currentX,s.startY=s.currentY,s.startTime=s.currentTime=M,s.velocityX=s.velocityY=s.deltaX=s.deltaY=0,s.event=f,c&&c(s)===!1)||(m.release(),!m.start())?!1:(r=!0,y===0?Y():(v.start(s.startX,s.startY),!0))},X=f=>{if(t){!a&&n&&(a=!0,C(s,f),requestAnimationFrame(T));return}C(s,f),v.detect(s.currentX,s.currentY)&&(!v.isGesture()||!Y())&&q()},T=()=>{t&&(a=!1,S&&S(s))},Y=()=>m.capture()?(t=!0,n=!1,s.startX=s.currentX,s.startY=s.currentY,s.startTime=s.currentTime,b?b(s).then(D):D(),!0):!1,h=()=>{if(typeof document<"u"){const f=document.activeElement;f!=null&&f.blur&&f.blur()}},D=()=>{p&&h(),u&&u(s),n=!0},G=()=>{t=!1,r=!1,a=!1,n=!0,m.release()},P=f=>{const M=t,k=n;if(G(),!!k){if(C(s,f),M){d&&d(s);return}l&&l(s)}},_=H(i.el,E,X,P,{capture:!1,passive:o}),q=()=>{G(),_.stop(),l&&l(s)};return{enable(f=!0){f||(t&&P(void 0),G()),_.enable(f)},destroy(){m.destroy(),_.destroy()}}},C=(e,t)=>{if(!t)return;const r=e.currentX,n=e.currentY,a=e.currentTime;x(t,e);const i=e.currentX,c=e.currentY,u=(e.currentTime=z(t))-a;if(u>0&&u<100){const d=(i-r)/u,l=(c-n)/u;e.velocityX=d*.7+e.velocityX*.3,e.velocityY=l*.7+e.velocityY*.3}e.deltaX=i-e.startX,e.deltaY=c-e.startY,e.event=t},x=(e,t)=>{let r=0,n=0;if(e){const a=e.changedTouches;if(a&&a.length>0){const i=a[0];r=i.clientX,n=i.clientY}else e.pageX!==void 0&&(r=e.pageX,n=e.pageY)}t.currentX=r,t.currentY=n},z=e=>e.timeStamp||Date.now();/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */const U=(e,t,r,n,a)=>{const i=e.ownerDocument.defaultView;let c=L(e);const b=o=>{const{startX:s}=o;return c?s>=i.innerWidth-50:s<=50},u=o=>c?-o.deltaX:o.deltaX,d=o=>c?-o.velocityX:o.velocityX;return N({el:e,gestureName:"goback-swipe",gesturePriority:40,threshold:10,canStart:o=>(c=L(e),b(o)&&t()),onStart:r,onMove:o=>{const s=u(o)/i.innerWidth;n(s)},onEnd:o=>{const p=u(o),s=i.innerWidth,v=p/s,m=d(o),E=s/2,X=m>=0&&(m>.2||p>E),Y=(X?1-v:v)*s;let h=0;if(Y>5){const D=Y/Math.abs(m);h=Math.min(D,540)}a(X,v<=0?.01:A(0,v,.9999),h)}})};export{U as createSwipeBackGesture};

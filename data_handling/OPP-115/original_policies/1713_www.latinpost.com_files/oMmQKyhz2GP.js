/*!CK:3807465981!*//*1436278937,*/

if (self.CavalryLogger) { CavalryLogger.start_js(["V9qHU"]); }

__d("JSLogger",[],function(a,b,c,d,e,f){b.__markCompiled&&b.__markCompiled();var g={MAX_HISTORY:500,counts:{},categories:{},seq:0,pageId:(Math.random()*2147483648|0).toString(36),forwarding:false};function h(m){if(m=='/'||m.indexOf('/',1)<0)return false;var n=/^\/(v\d+\.\d\d?|head)\//.test(m);if(n)return (/^\/(dialog|plugins)\//).test(m.substring(m.indexOf('/',1)));return (/^\/(dialog|plugins)\//).test(m);}function i(m){if(m instanceof Error&&a.ErrorUtils)m=a.ErrorUtils.normalizeError(m);try{return JSON.stringify(m);}catch(n){return '{}';}}function j(m,event,n){if(!g.counts[m])g.counts[m]={};if(!g.counts[m][event])g.counts[m][event]=0;n=n==null?1:Number(n);g.counts[m][event]+=isFinite(n)?n:0;}g.logAction=function(event,m,n){if(this.type=='bump'){j(this.cat,event,m);}else if(this.type=='rate'){(m&&j(this.cat,event+'_n',n));j(this.cat,event+'_d',n);}else{var o={cat:this.cat,type:this.type,event:event,data:m!=null?i(m):null,date:Date.now(),seq:g.seq++};g.head=g.head?(g.head.next=o):(g.tail=o);while(g.head.seq-g.tail.seq>g.MAX_HISTORY)g.tail=g.tail.next;return o;}};function k(m){if(!g.categories[m]){g.categories[m]={};var n=function(o){var p={cat:m,type:o};g.categories[m][o]=function(){g.forwarding=false;var q=null;if(document.domain!='facebook.com')return;q=g.logAction;if(h(location.pathname)){g.forwarding=false;}else try{q=a.top.require('JSLogger')._.logAction;g.forwarding=q!==g.logAction;}catch(r){}(q&&q.apply(p,arguments));};};n('debug');n('log');n('warn');n('error');n('bump');n('rate');}return g.categories[m];}function l(m,n){var o=[];for(var p=n||g.tail;p;p=p.next)if(!m||m(p)){var q={type:p.type,cat:p.cat,date:p.date,event:p.event,seq:p.seq};if(p.data)q.data=JSON.parse(p.data);o.push(q);}return o;}e.exports={_:g,DUMP_EVENT:'jslogger/dump',create:k,getEntries:l};},null);
__d("VideosRenderingInstrumentation",["DataStore"],function(a,b,c,d,e,f,g){b.__markCompiled&&b.__markCompiled();var h={storeRenderTime:function(i){var j=Date.now();g.set(i,'videos_rendering_instrumentation',j);return j;},retrieveRenderTime:function(i){var j=g.get(i,'videos_rendering_instrumentation',NaN);if(Number.isNaN(j))j=h.storeRenderTime(i);return j;}};e.exports=h;},null);
__d("DisplayTimeEmbeddedVideoPlayButton",["CSS","DataStore","Event","cx"],function(a,b,c,d,e,f,g,h,i,j){b.__markCompiled&&b.__markCompiled();var k={},l={register:function(m){var n=m.id;k[n]=i.listen(m,'click',function(){g.removeClass(m,"_5dz0");g.addClass(m,"_5dz2");h.set(m,'clicked',true);});},unregister:function(m){if(k.hasOwnProperty(m))k[m].remove();}};e.exports=l;},null);
__d("XVideoLiveViewCountController",["XController"],function(a,b,c,d,e,f){b.__markCompiled&&b.__markCompiled();e.exports=b("XController").create("\/video\/liveviewcount\/",{video_id:{type:"String",required:true}});},null);
(function(){var f,h=this;function m(a){a=a.split(".");for(var b=h,c;c=a.shift();)if(null!=b[c])b=b[c];else return null;return b}
function n(a){var b=typeof a;if("object"==b)if(a){if(a instanceof Array)return"array";if(a instanceof Object)return b;var c=Object.prototype.toString.call(a);if("[object Window]"==c)return"object";if("[object Array]"==c||"number"==typeof a.length&&"undefined"!=typeof a.splice&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("splice"))return"array";if("[object Function]"==c||"undefined"!=typeof a.call&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("call"))return"function"}else return"null";
else if("function"==b&&"undefined"==typeof a.call)return"object";return b}function p(a){var b=n(a);return"array"==b||"object"==b&&"number"==typeof a.length}function q(a){return"string"==typeof a}function aa(a){var b=typeof a;return"object"==b&&null!=a||"function"==b}var r="closure_uid_"+(1E9*Math.random()>>>0),ba=0;function ca(a,b,c){return a.call.apply(a.bind,arguments)}
function da(a,b,c){if(!a)throw Error();if(2<arguments.length){var d=Array.prototype.slice.call(arguments,2);return function(){var c=Array.prototype.slice.call(arguments);Array.prototype.unshift.apply(c,d);return a.apply(b,c)}}return function(){return a.apply(b,arguments)}}function t(a,b,c){t=Function.prototype.bind&&-1!=Function.prototype.bind.toString().indexOf("native code")?ca:da;return t.apply(null,arguments)}
function u(a,b){var c=a.split("."),d=h;c[0]in d||!d.execScript||d.execScript("var "+c[0]);for(var e;c.length&&(e=c.shift());)c.length||void 0===b?d[e]?d=d[e]:d=d[e]={}:d[e]=b}function v(a,b){function c(){}c.prototype=b.prototype;a.L=b.prototype;a.prototype=new c;a.base=function(a,c,g){for(var k=Array(arguments.length-2),l=2;l<arguments.length;l++)k[l-2]=arguments[l];return b.prototype[c].apply(a,k)}}
Function.prototype.bind=Function.prototype.bind||function(a,b){if(1<arguments.length){var c=Array.prototype.slice.call(arguments,1);c.unshift(this,a);return t.apply(null,c)}return t(this,a)};var ea=String.prototype.trim?function(a){return a.trim()}:function(a){return a.replace(/^[\s\xa0]+|[\s\xa0]+$/g,"")};function w(a,b){return a<b?-1:a>b?1:0};var x=Array.prototype,fa=x.indexOf?function(a,b,c){return x.indexOf.call(a,b,c)}:function(a,b,c){c=null==c?0:0>c?Math.max(0,a.length+c):c;if(q(a))return q(b)&&1==b.length?a.indexOf(b,c):-1;for(;c<a.length;c++)if(c in a&&a[c]===b)return c;return-1},y=x.forEach?function(a,b,c){x.forEach.call(a,b,c)}:function(a,b,c){for(var d=a.length,e=q(a)?a.split(""):a,g=0;g<d;g++)g in e&&b.call(c,e[g],g,a)};
function ga(a,b){var c;a:{c=a.length;for(var d=q(a)?a.split(""):a,e=0;e<c;e++)if(e in d&&b.call(void 0,d[e],e,a)){c=e;break a}c=-1}return 0>c?null:q(a)?a.charAt(c):a[c]}function ha(a){return x.concat.apply(x,arguments)}function z(a){var b=a.length;if(0<b){for(var c=Array(b),d=0;d<b;d++)c[d]=a[d];return c}return[]};function ia(a){var b=A,c;for(c in b)if(a.call(void 0,b[c],c,b))return c}function ka(a){var b=arguments.length;if(1==b&&"array"==n(arguments[0]))return ka.apply(null,arguments[0]);for(var c={},d=0;d<b;d++)c[arguments[d]]=!0;return c};ka("area base br col command embed hr img input keygen link meta param source track wbr".split(" "));var B;a:{var la=h.navigator;if(la){var ma=la.userAgent;if(ma){B=ma;break a}}B=""};var na=-1!=B.indexOf("Opera")||-1!=B.indexOf("OPR"),C=-1!=B.indexOf("Trident")||-1!=B.indexOf("MSIE"),oa=-1!=B.indexOf("Edge"),D=-1!=B.indexOf("Gecko")&&!(-1!=B.toLowerCase().indexOf("webkit")&&-1==B.indexOf("Edge"))&&!(-1!=B.indexOf("Trident")||-1!=B.indexOf("MSIE"))&&-1==B.indexOf("Edge"),pa=-1!=B.toLowerCase().indexOf("webkit")&&-1==B.indexOf("Edge");
function qa(){var a=B;if(D)return/rv\:([^\);]+)(\)|;)/.exec(a);if(oa)return/Edge\/([\d\.]+)/.exec(a);if(C)return/\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(a);if(pa)return/WebKit\/(\S+)/.exec(a)}function ra(){var a=h.document;return a?a.documentMode:void 0}var sa=function(){if(na&&h.opera){var a=h.opera.version;return"function"==n(a)?a():a}var a="",b=qa();b&&(a=b?b[1]:"");return C&&(b=ra(),b>parseFloat(a))?String(b):a}(),ta={};
function ua(a){if(!ta[a]){for(var b=0,c=ea(String(sa)).split("."),d=ea(String(a)).split("."),e=Math.max(c.length,d.length),g=0;0==b&&g<e;g++){var k=c[g]||"",l=d[g]||"",ab=RegExp("(\\d*)(\\D*)","g"),bb=RegExp("(\\d*)(\\D*)","g");do{var J=ab.exec(k)||["","",""],K=bb.exec(l)||["","",""];if(0==J[0].length&&0==K[0].length)break;b=w(0==J[1].length?0:parseInt(J[1],10),0==K[1].length?0:parseInt(K[1],10))||w(0==J[2].length,0==K[2].length)||w(J[2],K[2])}while(0==b)}ta[a]=0<=b}}
var va=h.document,wa=va&&C?ra()||("CSS1Compat"==va.compatMode?parseInt(sa,10):5):void 0;var E;if(!(E=!D&&!C)){var F;if(F=C)F=9<=wa;E=F}E||D&&ua("1.9.1");C&&ua("9");function xa(a){var b,c,d,e;b=document;if(b.querySelectorAll&&b.querySelector&&a)return b.querySelectorAll(""+(a?"."+a:""));if(a&&b.getElementsByClassName){var g=b.getElementsByClassName(a);return g}g=b.getElementsByTagName("*");if(a){e={};for(c=d=0;b=g[c];c++){var k=b.className,l;if(l="function"==typeof k.split)l=0<=fa(k.split(/\s+/),a);l&&(e[d++]=b)}e.length=d;return e}return g}function ya(a,b){for(var c=0;a;){if(b(a))return a;a=a.parentNode;c++}return null};function za(a){a=String(a);if(/^\s*$/.test(a)?0:/^[\],:{}\s\u2028\u2029]*$/.test(a.replace(/\\["\\\/bfnrtu]/g,"@").replace(/"[^"\\\n\r\u2028\u2029\x00-\x08\x0a-\x1f]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:[\s\u2028\u2029]*\[)+/g,"")))try{return eval("("+a+")")}catch(b){}throw Error("Invalid JSON string: "+a);}function Aa(){}
function G(a,b,c){if(null==b)c.push("null");else{if("object"==typeof b){if("array"==n(b)){var d=b;b=d.length;c.push("[");for(var e="",g=0;g<b;g++)c.push(e),G(a,d[g],c),e=",";c.push("]");return}if(b instanceof String||b instanceof Number||b instanceof Boolean)b=b.valueOf();else{c.push("{");e="";for(d in b)Object.prototype.hasOwnProperty.call(b,d)&&(g=b[d],"function"!=typeof g&&(c.push(e),Ba(d,c),c.push(":"),G(a,g,c),e=","));c.push("}");return}}switch(typeof b){case "string":Ba(b,c);break;case "number":c.push(isFinite(b)&&
!isNaN(b)?b:"null");break;case "boolean":c.push(b);break;case "function":break;default:throw Error("Unknown type: "+typeof b);}}}var Ca={'"':'\\"',"\\":"\\\\","/":"\\/","\b":"\\b","\f":"\\f","\n":"\\n","\r":"\\r","\t":"\\t","\x0B":"\\u000b"},Da=/\uffff/.test("\uffff")?/[\\\"\x00-\x1f\x7f-\uffff]/g:/[\\\"\x00-\x1f\x7f-\xff]/g;function Ba(a,b){b.push('"',a.replace(Da,function(a){var b=Ca[a];b||(b="\\u"+(a.charCodeAt(0)|65536).toString(16).substr(1),Ca[a]=b);return b}),'"')};function H(){this.j=this.j;this.l=this.l}H.prototype.j=!1;H.prototype.isDisposed=function(){return this.j};H.prototype.dispose=function(){this.j||(this.j=!0,this.I())};H.prototype.I=function(){if(this.l)for(;this.l.length;)this.l.shift()()};function I(){H.call(this);this.C=1;this.m=[];this.v=0;this.f=[];this.h={}}v(I,H);f=I.prototype;f.subscribe=function(a,b,c){var d=this.h[a];d||(d=this.h[a]=[]);var e=this.C;this.f[e]=a;this.f[e+1]=b;this.f[e+2]=c;this.C=e+3;d.push(e);return e};function Ea(a,b,c){var d=L;if(a=d.h[a]){var e=d.f;(a=ga(a,function(a){return e[a+1]==b&&e[a+2]==c}))&&d.M(a)}}
f.M=function(a){if(0!=this.v)return this.m.push(a),!1;var b=this.f[a];if(b){var c=this.h[b];if(c){var d=fa(c,a);0<=d&&x.splice.call(c,d,1)}delete this.f[a];delete this.f[a+1];delete this.f[a+2]}return!!b};f.P=function(a,b){var c=this.h[a];if(c){this.v++;for(var d=Array(arguments.length-1),e=1,g=arguments.length;e<g;e++)d[e-1]=arguments[e];e=0;for(g=c.length;e<g;e++){var k=c[e];this.f[k+1].apply(this.f[k+2],d)}this.v--;if(0<this.m.length&&0==this.v)for(;c=this.m.pop();)this.M(c);return 0!=e}return!1};
f.clear=function(a){if(a){var b=this.h[a];b&&(y(b,this.M,this),delete this.h[a])}else this.f.length=0,this.h={}};f.I=function(){I.L.I.call(this);this.clear();this.m.length=0};var Fa=/^(?:([^:/?#.]+):)?(?:\/\/(?:([^/?#]*)@)?([^/#?]*?)(?::([0-9]+))?(?=[/#?]|$))?([^?#]+)?(?:\?([^#]*))?(?:#(.*))?$/;function Ga(a){if(Ha){Ha=!1;var b=h.location;if(b){var c=b.href;if(c&&(c=(c=Ga(c)[3]||null)?decodeURI(c):c)&&c!=b.hostname)throw Ha=!0,Error();}}return a.match(Fa)}var Ha=pa;function Ia(a,b,c){if("array"==n(b))for(var d=0;d<b.length;d++)Ia(a,String(b[d]),c);else null!=b&&c.push("&",a,""===b?"":"=",encodeURIComponent(String(b)))}var Ja=/#|$/;var Ka=m("yt.dom.getNextId_");if(!Ka){Ka=function(){return++La};u("yt.dom.getNextId_",Ka);var La=0};var M=window.yt&&window.yt.config_||window.ytcfg&&window.ytcfg.data_||{};u("yt.config_",M);u("yt.tokens_",window.yt&&window.yt.tokens_||{});u("yt.msgs_",window.yt&&window.yt.msgs_||{});function Ma(a){var b=arguments;if(1<b.length){var c=b[0];M[c]=b[1]}else for(c in b=b[0],b)M[c]=b[c]}function Na(a){"function"==n(a)&&(a=Oa(a));return window.setInterval(a,250)}function Oa(a){return a&&window.yterr?function(){try{return a.apply(this,arguments)}catch(b){throw Pa(b),b;}}:a}
function Pa(a,b){var c=m("yt.www.errors.log");c?c(a,b):(c=("ERRORS"in M?M.ERRORS:void 0)||[],c.push([a,b]),Ma("ERRORS",c))};function Qa(a){if(a=a||window.event){this.event=a;for(var b in a)b in Ra||(this[b]=a[b]);(b=a.target||a.srcElement)&&3==b.nodeType&&(b=b.parentNode);this.target=b;if(b=a.relatedTarget)try{b=b.nodeName?b:null}catch(c){b=null}else"mouseover"==this.type?b=a.fromElement:"mouseout"==this.type&&(b=a.toElement);this.relatedTarget=b;this.clientX=void 0!=a.clientX?a.clientX:a.pageX;this.clientY=void 0!=a.clientY?a.clientY:a.pageY;this.keyCode=a.keyCode?a.keyCode:a.which;this.charCode=a.charCode||("keypress"==
this.type?this.keyCode:0);this.altKey=a.altKey;this.ctrlKey=a.ctrlKey;this.shiftKey=a.shiftKey;"MozMousePixelScroll"==this.type?(this.wheelDeltaX=a.axis==a.HORIZONTAL_AXIS?a.detail:0,this.wheelDeltaY=a.axis==a.HORIZONTAL_AXIS?0:a.detail):window.opera?(this.wheelDeltaX=0,this.wheelDeltaY=a.detail):0==a.wheelDelta%120?"WebkitTransform"in document.documentElement.style?window.chrome&&0==navigator.platform.indexOf("Mac")?(this.wheelDeltaX=a.wheelDeltaX/-30,this.wheelDeltaY=a.wheelDeltaY/-30):(this.wheelDeltaX=
a.wheelDeltaX/-1.2,this.wheelDeltaY=a.wheelDeltaY/-1.2):(this.wheelDeltaX=0,this.wheelDeltaY=a.wheelDelta/-1.6):(this.wheelDeltaX=a.wheelDeltaX/-3,this.wheelDeltaY=a.wheelDeltaY/-3)}}f=Qa.prototype;f.type="";f.target=null;f.relatedTarget=null;f.currentTarget=null;f.data=null;f.keyCode=0;f.charCode=0;f.altKey=!1;f.ctrlKey=!1;f.shiftKey=!1;f.clientX=0;f.clientY=0;f.wheelDeltaX=0;f.wheelDeltaY=0;
var Ra={stopImmediatePropagation:1,stopPropagation:1,preventMouseEvent:1,preventManipulation:1,preventDefault:1,layerX:1,layerY:1,scale:1,rotation:1};var A=m("yt.events.listeners_")||{};u("yt.events.listeners_",A);var Sa=m("yt.events.counter_")||{count:0};u("yt.events.counter_",Sa);function Ta(a,b,c){return ia(function(d){return d[0]==a&&d[1]==b&&d[2]==c&&0==d[4]})}
function Ua(a,b,c){if(a&&(a.addEventListener||a.attachEvent)){var d=Ta(a,b,c);if(!d){var d=++Sa.count+"",e=!("mouseenter"!=b&&"mouseleave"!=b||!a.addEventListener||"onmouseenter"in document),g;g=e?function(d){d=new Qa(d);if(!ya(d.relatedTarget,function(b){return b==a}))return d.currentTarget=a,d.type=b,c.call(a,d)}:function(b){b=new Qa(b);b.currentTarget=a;return c.call(a,b)};g=Oa(g);A[d]=[a,b,c,g,!1];a.addEventListener?"mouseenter"==b&&e?a.addEventListener("mouseover",g,!1):"mouseleave"==b&&e?a.addEventListener("mouseout",
g,!1):"mousewheel"==b&&"MozBoxSizing"in document.documentElement.style?a.addEventListener("MozMousePixelScroll",g,!1):a.addEventListener(b,g,!1):a.attachEvent("on"+b,g)}}}function Va(a){a&&("string"==typeof a&&(a=[a]),y(a,function(a){if(a in A){var c=A[a],d=c[0],e=c[1],g=c[3],c=c[4];d.removeEventListener?d.removeEventListener(e,g,c):d.detachEvent&&d.detachEvent("on"+e,g);delete A[a]}}))};function Wa(a){var b=[],c;for(c in a)Ia(c,a[c],b);b[0]="";return b.join("")};var Xa={};function Ya(a){return Xa[a]||(Xa[a]=String(a).replace(/\-([a-z])/g,function(a,c){return c.toUpperCase()}))};var N={},Za=[],L=new I,$a={};function cb(){y(Za,function(a){a()})}function db(a){var b=z(document.getElementsByTagName("yt:"+a));a="yt-"+a;var c=document;a=c.querySelectorAll&&c.querySelector?c.querySelectorAll("."+a):xa(a);a=z(a);return ha(b,a)}function O(a,b){return"yt:"==a.tagName.toLowerCase().substr(0,3)?a.getAttribute(b):a?a.dataset?a.dataset[Ya(b)]:a.getAttribute("data-"+b):null}function eb(a,b){L.P.apply(L,arguments)};function P(a,b,c){this.h=b;this.m=this.f=null;this.v=this[r]||(this[r]=++ba);this.j=0;this.J=!1;this.G=[];this.l=null;this.C=c;this.N={};b=document;if(a=q(a)?b.getElementById(a):a)if("iframe"!=a.tagName.toLowerCase()&&(b=fb(this,a),this.m=a,(c=a.parentNode)&&c.replaceChild(b,a),a=b),this.f=a,this.f.id||(b=a=this.f,b=b[r]||(b[r]=++ba),a.id="widget"+b),N[this.f.id]=this,window.postMessage){this.l=new I;gb(this);a=Q(this.h,"events");for(var d in a)a.hasOwnProperty(d)&&this.addEventListener(d,a[d]);for(var e in $a)ib(this,
e)}}f=P.prototype;f.Z=function(a,b){this.f.width=a;this.f.height=b;return this};f.Y=function(){return this.f};f.R=function(a){this.A(a.event,a)};f.addEventListener=function(a,b){var c=b;"string"==typeof b&&(c=function(){window[b].apply(window,arguments)});this.l.subscribe(a,c);jb(this,a);return this};function ib(a,b){var c=b.split(".");if(2==c.length){var d=c[1];a.C==c[0]&&jb(a,d)}}
f.X=function(){this.f.id&&(N[this.f.id]=null);var a=this.l;a&&"function"==typeof a.dispose&&a.dispose();if(this.m){var a=this.f,b=a.parentNode;b&&b.replaceChild(this.m,a)}else(a=this.f)&&a.parentNode&&a.parentNode.removeChild(a);R&&(R[this.v]=null);this.h=null;var a=this.f,c;for(c in A)A[c][0]==a&&Va(c);this.m=this.f=null};f.F=function(){return{}};function S(a,b,c){c=c||[];c=Array.prototype.slice.call(c);b={event:"command",func:b,args:c};a.J?a.K(b):a.G.push(b)}
f.A=function(a,b){if(!this.l.isDisposed()){var c={target:this,data:b};this.l.P(a,c);eb(this.C+"."+a,c)}};
function fb(a,b){for(var c=document.createElement("iframe"),d=b.attributes,e=0,g=d.length;e<g;e++){var k=d[e].value;null!=k&&""!=k&&"null"!=k&&c.setAttribute(d[e].name,k)}c.setAttribute("frameBorder",0);c.setAttribute("allowfullscreen",1);c.setAttribute("title","YouTube "+Q(a.h,"title"));(d=Q(a.h,"width"))&&c.setAttribute("width",d);(d=Q(a.h,"height"))&&c.setAttribute("height",d);var l=a.F();l.enablejsapi=window.postMessage?1:0;window.location.host&&(l.origin=window.location.protocol+"//"+window.location.host);
window.location.href&&y(["debugjs","debugcss"],function(a){var b;b=window.location.href;var c=b.search(Ja),d;b:{d=0;for(var e=a.length;0<=(d=b.indexOf(a,d))&&d<c;){var g=b.charCodeAt(d-1);if(38==g||63==g)if(g=b.charCodeAt(d+e),!g||61==g||38==g||35==g)break b;d+=e+1}d=-1}if(0>d)b=null;else{e=b.indexOf("&",d);if(0>e||e>c)e=c;d+=a.length+1;b=decodeURIComponent(b.substr(d,e-d).replace(/\+/g," "))}null===b||(l[a]=b)});c.src=Q(a.h,"host")+a.H()+"?"+Wa(l);return c}
f.O=function(){this.f&&this.f.contentWindow?this.K({event:"listening"}):window.clearInterval(this.j)};function gb(a){kb(a.h,a,a.v);a.j=Na(t(a.O,a));Ua(a.f,"load",t(function(){window.clearInterval(this.j);this.j=Na(t(this.O,this))},a))}function jb(a,b){a.N[b]||(a.N[b]=!0,S(a,"addEventListener",[b]))}
f.K=function(a){a.id=this.v;var b=[];G(new Aa,a,b);a=b.join("");var b=this.h,c,d=Ga(this.f.src);c=d[1];var e=d[2],g=d[3],d=d[4],k="";c&&(k+=c+":");g&&(k+="//",e&&(k+=e+"@"),k+=g,d&&(k+=":"+d));c=k;b=0==c.indexOf("https:")?[c]:b.f?[c.replace("http:","https:")]:b.j?[c]:[c,c.replace("http:","https:")];for(c=0;c<b.length;c++)try{this.f.contentWindow.postMessage(a,b[c])}catch(l){if(l.name&&"SyntaxError"==l.name)Pa(l,"WARNING");else throw l;}};var T="StopIteration"in h?h.StopIteration:{message:"StopIteration",stack:""};function U(){}U.prototype.next=function(){throw T;};U.prototype.D=function(){return this};function lb(a){if(a instanceof U)return a;if("function"==typeof a.D)return a.D(!1);if(p(a)){var b=0,c=new U;c.next=function(){for(;;){if(b>=a.length)throw T;if(b in a)return a[b++];b++}};return c}throw Error("Not implemented");}
function nb(a,b){if(p(a))try{y(a,b,void 0)}catch(c){if(c!==T)throw c;}else{a=lb(a);try{for(;;)b.call(void 0,a.next(),void 0,a)}catch(d){if(d!==T)throw d;}}}function ob(a){if(p(a))return z(a);a=lb(a);var b=[];nb(a,function(a){b.push(a)});return b};function pb(){};function qb(){}v(qb,pb);qb.prototype.clear=function(){var a=ob(this.D(!0)),b=this;y(a,function(a){b.remove(a)})};function V(a){this.f=a}v(V,qb);f=V.prototype;f.isAvailable=function(){if(!this.f)return!1;try{return this.f.setItem("__sak","1"),this.f.removeItem("__sak"),!0}catch(a){return!1}};f.remove=function(a){this.f.removeItem(a)};f.D=function(a){var b=0,c=this.f,d=new U;d.next=function(){if(b>=c.length)throw T;var d;d=c.key(b++);if(a)return d;d=c.getItem(d);if(!q(d))throw"Storage mechanism: Invalid value was encountered";return d};return d};f.clear=function(){this.f.clear()};f.key=function(a){return this.f.key(a)};function rb(){var a=null;try{a=window.localStorage||null}catch(b){}this.f=a}v(rb,V);function sb(){var a=null;try{a=window.sessionStorage||null}catch(b){}this.f=a}v(sb,V);(new rb).isAvailable();(new sb).isAvailable();function tb(a){return(0==a.search("cue")||0==a.search("load"))&&"loadModule"!=a}function ub(a){return 0==a.search("get")||0==a.search("is")};var vb="corp.google.com googleplex.com youtube.com youtube-nocookie.com youtubeeducation.com borg.google.com prod.google.com sandbox.google.com books.googleusercontent.com docs.google.com drive.google.com mail.google.com photos.google.com plus.google.com lh2.google.com picasaweb.google.com play.google.com googlevideo.com talkgadget.google.com survey.g.doubleclick.net youtube.googleapis.com vevo.com".split(" "),wb="";function W(a){this.h=a||{};this.defaults={};this.defaults.host="http://www.youtube.com";this.defaults.title="";this.j=this.f=!1;a=document.getElementById("www-widgetapi-script");if(this.f=!!("https:"==document.location.protocol||a&&0==a.src.indexOf("https:"))){a=[this.h,window.YTConfig||{},this.defaults];for(var b=0;b<a.length;b++)a[b].host&&(a[b].host=a[b].host.replace("http://","https://"))}}var R=null;
function Q(a,b){for(var c=[a.h,window.YTConfig||{},a.defaults],d=0;d<c.length;d++){var e=c[d][b];if(void 0!=e)return e}return null}function kb(a,b,c){R||(R={},Ua(window,"message",t(a.l,a)));R[c]=b}
W.prototype.l=function(a){var b;(b=a.origin==Q(this,"host"))||((b=a.origin)&&b==wb?b=!0:(new RegExp("^(https?:)?//([a-z0-9-]{1,63}\\.)*("+vb.join("|").replace(/\./g,".")+")(:[0-9]+)?([/?#]|$)","i")).test(b)?(wb=b,b=!0):b=!1);if(b){var c;try{c=za(a.data)}catch(d){return}this.j=!0;this.f||0!=a.origin.indexOf("https:")||(this.f=!0);if(a=R[c.id])a.J=!0,a.J&&(y(a.G,a.K,a),a.G.length=0),a.R(c)}};function xb(a){W.call(this,a);this.defaults.title="video player";this.defaults.videoId="";this.defaults.width=640;this.defaults.height=360}v(xb,W);function X(a,b){var c=new xb(b);P.call(this,a,c,"player");this.B={};this.o={}}v(X,P);function yb(a){if("iframe"!=a.tagName.toLowerCase()){var b=O(a,"videoid");if(b){var c=O(a,"width"),d=O(a,"height");new X(a,{videoId:b,width:c,height:d})}}}f=X.prototype;f.H=function(){return"/embed/"+Q(this.h,"videoId")};f.F=function(){var a;if(Q(this.h,"playerVars")){a=Q(this.h,"playerVars");var b={},c;for(c in a)b[c]=a[c];a=b}else a={};return a};
f.R=function(a){var b=a.event;a=a.info;switch(b){case "apiInfoDelivery":if(aa(a))for(var c in a)this.o[c]=a[c];break;case "infoDelivery":zb(this,a);break;case "initialDelivery":window.clearInterval(this.j);this.B={};this.o={};Ab(this,a.apiInterface);zb(this,a);break;default:this.A(b,a)}};function zb(a,b){if(aa(b))for(var c in b)a.B[c]=b[c]}
function Ab(a,b){y(b,function(a){this[a]||(tb(a)?this[a]=function(){this.B={};this.o={};S(this,a,arguments);return this}:ub(a)?this[a]=function(){var b=0;0==a.search("get")?b=3:0==a.search("is")&&(b=2);return this.B[a.charAt(b).toLowerCase()+a.substr(b+1)]}:this[a]=function(){S(this,a,arguments);return this})},a)}f.ba=function(){var a=this.f.cloneNode(!1),b=this.B.videoData,c=Q(this.h,"host");a.src=b&&b.video_id?c+"/embed/"+b.video_id:a.src;b=document.createElement("div");b.appendChild(a);return b.innerHTML};
f.aa=function(a){return this.o.namespaces?a?this.o[a].options||[]:this.o.namespaces||[]:[]};f.$=function(a,b){if(this.o.namespaces&&a&&b)return this.o[a][b]};function Bb(a){W.call(this,a);this.defaults.title="Thumbnail";this.defaults.videoId="";this.defaults.width=120;this.defaults.height=68}v(Bb,W);function Y(a,b){var c=new Bb(b);P.call(this,a,c,"thumbnail")}v(Y,P);function Cb(a){if("iframe"!=a.tagName.toLowerCase()){var b=O(a,"videoid");if(b){b={videoId:b,events:{}};b.width=O(a,"width");b.height=O(a,"height");b.thumbWidth=O(a,"thumb-width");b.thumbHeight=O(a,"thumb-height");b.thumbAlign=O(a,"thumb-align");var c=O(a,"onclick");c&&(b.events.onClick=c);new Y(a,b)}}}Y.prototype.H=function(){return"/embed/"+Q(this.h,"videoId")};
Y.prototype.F=function(){return{player:0,thumb_width:Q(this.h,"thumbWidth"),thumb_height:Q(this.h,"thumbHeight"),thumb_align:Q(this.h,"thumbAlign")}};Y.prototype.A=function(a,b){Y.L.A.call(this,a,b?b.info:void 0)};function Db(a){W.call(this,a);this.defaults.host="https://www.youtube.com";this.defaults.title="upload widget";this.defaults.width=640;this.defaults.height=.67*Q(this,"width")}v(Db,W);function Z(a,b){var c=new Db(b);P.call(this,a,c,"upload")}v(Z,P);f=Z.prototype;f.H=function(){return"/upload_embed"};f.F=function(){var a={},b=Q(this.h,"webcamOnly");null!=b&&(a.webcam_only=b);return a};f.A=function(a,b){Z.L.A.call(this,a,b);"onApiReady"==a&&S(this,"hostWindowReady")};
f.S=function(a){S(this,"setVideoDescription",arguments)};f.U=function(a){S(this,"setVideoKeywords",arguments)};f.V=function(a){S(this,"setVideoPrivacy",arguments)};f.T=function(a){S(this,"setVideoDraftPrivacy",arguments)};f.W=function(a){S(this,"setVideoTitle",arguments)};u("YT.PlayerState.UNSTARTED",-1);u("YT.PlayerState.ENDED",0);u("YT.PlayerState.PLAYING",1);u("YT.PlayerState.PAUSED",2);u("YT.PlayerState.BUFFERING",3);u("YT.PlayerState.CUED",5);u("YT.UploadWidgetEvent.API_READY","onApiReady");u("YT.UploadWidgetEvent.UPLOAD_SUCCESS","onUploadSuccess");u("YT.UploadWidgetEvent.PROCESSING_COMPLETE","onProcessingComplete");u("YT.UploadWidgetEvent.STATE_CHANGE","onStateChange");u("YT.UploadWidgetState.IDLE",0);u("YT.UploadWidgetState.PENDING",1);
u("YT.UploadWidgetState.ERROR",2);u("YT.UploadWidgetState.PLAYBACK",3);u("YT.UploadWidgetState.RECORDING",4);u("YT.UploadWidgetState.STOPPED",5);u("YT.get",function(a){return N[a]});u("YT.scan",cb);u("YT.subscribe",function(a,b,c){L.subscribe(a,b,c);$a[a]=!0;for(var d in N)ib(N[d],a)});u("YT.unsubscribe",function(a,b,c){Ea(a,b,c)});u("YT.Player",X);u("YT.Thumbnail",Y);u("YT.UploadWidget",Z);P.prototype.destroy=P.prototype.X;P.prototype.setSize=P.prototype.Z;P.prototype.getIframe=P.prototype.Y;
P.prototype.addEventListener=P.prototype.addEventListener;X.prototype.getVideoEmbedCode=X.prototype.ba;X.prototype.getOptions=X.prototype.aa;X.prototype.getOption=X.prototype.$;Z.prototype.setVideoDescription=Z.prototype.S;Z.prototype.setVideoKeywords=Z.prototype.U;Z.prototype.setVideoPrivacy=Z.prototype.V;Z.prototype.setVideoTitle=Z.prototype.W;Z.prototype.setVideoDraftPrivacy=Z.prototype.T;Za.push(function(){var a=db("player");y(a,yb)});Za.push(function(){var a=db("thumbnail");y(a,Cb)});
"undefined"!=typeof YTConfig&&YTConfig.parsetags&&"onload"!=YTConfig.parsetags||cb();var Eb=m("onYTReady");Eb&&Eb();var Fb=m("onYouTubeIframeAPIReady");Fb&&Fb();var Gb=m("onYouTubePlayerAPIReady");Gb&&Gb();})();

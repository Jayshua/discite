/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var verseInput = __webpack_require__(1);
	var request    = __webpack_require__(2);

	var referenceInput = document.querySelector("#referenceInput"); // The input used to get the verse reference
	var submitButton   = document.querySelector("#submitButton");   // The button used to load the verse


	/***************************************************/
	/* Fetches a verse and put it into the verse input */
	/***************************************************/
	var fetchVerse = function() {
	   request.get("/api", {reference: referenceInput.value}).then(function(response) {
	      var verse = response.reduce(function(verseText, verse) {
	         return verseText += " " + verse.text;
	      }, "");

	      verseInput.set(verse);
	   });
	};


	referenceInput.addEventListener("keydown", function(event) {
	   if (event.keyCode === 13)
	      referenceInput.blur();
	});

	referenceInput.addEventListener("blur", fetchVerse);

	referenceInput.focus();

/***/ },
/* 1 */
/***/ function(module, exports) {

	var verseInput     = document.querySelector("#verseInput");
	var verseOverlay   = document.querySelector("#verseOverlay");
	var wrapper        = document.querySelector("#wrapper");
	var mistakeCounter = document.querySelector("#mistakeCounter");
	var showOverlay    = document.querySelector("#showOverlay");


	var countdown = (function() {
	   var count = 0;

	   setInterval(function() {
	      count += 200;

	      if (count > 1500 || showOverlay.checked === true) {
	         verseOverlay.classList.add("visible");
	      } else {
	         verseOverlay.classList.remove("visible");
	      }
	   }, 200);

	   return {
	      reset: function() {
	         count = 0;
	      }
	   }
	}());

	var mistakes = (function() {
	   var mistakeCount = 0;

	   var render = function() {
	      mistakeCounter.innerText = mistakeCount;
	   };

	   return {
	      increment: () => {mistakeCount += 1; render()},
	      reset:     () => {mistakeCount  = 0; render()},
	      get:       () => mistakeCount
	   }
	}());


	var last = false;
	verseInput.addEventListener("keypress", function(evt) {
	   var keyPressed = String.fromCharCode(evt.keyCode);
	   if (evt.keyCode === 13) keyPressed = "\n";

	   evt.preventDefault();
	   evt.stopPropagation();

	   if (verseOverlay.innerText.indexOf((verseInput.value + keyPressed)) === 0) {
	      verseInput.value += keyPressed;
	      last = false;
	   } else {
	      if (!last) {
	         mistakes.increment();
	         last = true;
	      }
	   }

	   if (mistakes.get() > 1) {
	      // verseInput.value = "";
	      // mistakes.reset();
	      // let backCount = 0;

	      // let step = function() {
	      //    backCount += 1;

	      //    if (backCount < 10)
	      //       setTimeout(step, 20);

	      //    verseInput.value = verseInput.value.slice(0, -1);
	      // }

	      // step();
	   }

	   if (verseInput.value == verseOverlay.innerText && verseOverlay.innerText !== "") {
	      wrapper.classList.add("success");
	      verseInput.value = "";
	      mistakes.reset();
	      setTimeout(function() {
	         wrapper.classList.remove("success");
	         countdown.reset();
	      }, 5);
	   }

	   countdown.reset();
	});

	var calculatePosition = function() {
	   verseInput.style.height = verseOverlay.getBoundingClientRect().height + "px";
	   verseOverlay.style.left = verseInput.getBoundingClientRect().left     + "px";
	   verseOverlay.style.top  = verseInput.getBoundingClientRect().top      + "px";
	};

	var set = function(value) {
	   verseInput.value = "";
	   verseOverlay.innerText = value;

	   calculatePosition();
	   calculatePosition();

	   mistakes.reset();
	   
	   verseInput.focus();
	};


	module.exports = {
	   set: set
	};


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	!function(e,t){ true?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports["xrl.js"]=t():e["xrl.js"]=t()}(this,function(){return function(e){function t(e){var t=document.getElementsByTagName("head")[0],n=document.createElement("script");n.type="text/javascript",n.charset="utf-8",n.src=p.p+""+e+"."+m+".hot-update.js",t.appendChild(n)}function n(e){if("undefined"==typeof XMLHttpRequest)return e(new Error("No browser support"));try{var t=new XMLHttpRequest,n=p.p+""+m+".hot-update.json";t.open("GET",n,!0),t.timeout=1e4,t.send(null)}catch(r){return e(r)}t.onreadystatechange=function(){if(4===t.readyState)if(0===t.status)e(new Error("Manifest request to "+n+" timed out."));else if(404===t.status)e();else if(200!==t.status&&304!==t.status)e(new Error("Manifest request to "+n+" failed."));else{try{var r=JSON.parse(t.responseText)}catch(o){return void e(o)}e(null,r)}}}function r(e){var t=H[e];if(!t)return p;var n=function(n){return t.hot.active?H[n]?(H[n].parents.indexOf(e)<0&&H[n].parents.push(e),t.children.indexOf(n)<0&&t.children.push(n)):w=[e]:(console.warn("[HMR] unexpected require("+n+") from disposed module "+e),w=[]),p(n)};for(var r in p)Object.prototype.hasOwnProperty.call(p,r)&&(n[r]=p[r]);return n.e=function(e,t){"ready"===x&&a("prepare"),b++,p.e(e,function(){function r(){b--,"prepare"===x&&(g[e]||u(e),0===b&&0===_&&d())}try{t.call(null,n)}finally{r()}})},n}function o(e){var t={_acceptedDependencies:{},_declinedDependencies:{},_selfAccepted:!1,_selfDeclined:!1,_disposeHandlers:[],active:!0,accept:function(e,n){if("undefined"==typeof e)t._selfAccepted=!0;else if("function"==typeof e)t._selfAccepted=e;else if("object"==typeof e)for(var r=0;r<e.length;r++)t._acceptedDependencies[e[r]]=n;else t._acceptedDependencies[e]=n},decline:function(e){if("undefined"==typeof e)t._selfDeclined=!0;else if("number"==typeof e)t._declinedDependencies[e]=!0;else for(var n=0;n<e.length;n++)t._declinedDependencies[e[n]]=!0},dispose:function(e){t._disposeHandlers.push(e)},addDisposeHandler:function(e){t._disposeHandlers.push(e)},removeDisposeHandler:function(e){var n=t._disposeHandlers.indexOf(e);n>=0&&t._disposeHandlers.splice(n,1)},check:s,apply:f,status:function(e){return e?void T.push(e):x},addStatusHandler:function(e){T.push(e)},removeStatusHandler:function(e){var t=T.indexOf(e);t>=0&&T.splice(t,1)},data:E[e]};return t}function a(e){x=e;for(var t=0;t<T.length;t++)T[t].call(null,e)}function i(e){var t=+e+""===e;return t?+e:e}function s(e,t){if("idle"!==x)throw new Error("check() is only allowed in idle status");"function"==typeof e?(O=!1,t=e):(O=e,t=t||function(e){if(e)throw e}),a("check"),n(function(e,n){if(e)return t(e);if(!n)return a("idle"),void t(null,null);j={},A={},g={};for(var r=0;r<n.c.length;r++)A[n.c[r]]=!0;y=n.h,a("prepare"),h=t,v={};var o=0;u(o),"prepare"===x&&0===b&&0===_&&d()})}function c(e,t){if(A[e]&&j[e]){j[e]=!1;for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(v[n]=t[n]);0===--_&&0===b&&d()}}function u(e){A[e]?(j[e]=!0,_++,t(e)):g[e]=!0}function d(){a("ready");var e=h;if(h=null,e)if(O)f(O,e);else{var t=[];for(var n in v)Object.prototype.hasOwnProperty.call(v,n)&&t.push(i(n));e(null,t)}}function f(t,n){function r(e){for(var t=[e],n={},r=t.slice();r.length>0;){var a=r.pop(),e=H[a];if(e&&!e.hot._selfAccepted){if(e.hot._selfDeclined)return new Error("Aborted because of self decline: "+a);if(0===a)return;for(var i=0;i<e.parents.length;i++){var s=e.parents[i],c=H[s];if(c.hot._declinedDependencies[a])return new Error("Aborted because of declined dependency: "+a+" in "+s);t.indexOf(s)>=0||(c.hot._acceptedDependencies[a]?(n[s]||(n[s]=[]),o(n[s],[a])):(delete n[s],t.push(s),r.push(s)))}}}return[t,n]}function o(e,t){for(var n=0;n<t.length;n++){var r=t[n];e.indexOf(r)<0&&e.push(r)}}if("ready"!==x)throw new Error("apply() is only allowed in ready status");"function"==typeof t?(n=t,t={}):t&&"object"==typeof t?n=n||function(e){if(e)throw e}:(t={},n=n||function(e){if(e)throw e});var s={},c=[],u={};for(var d in v)if(Object.prototype.hasOwnProperty.call(v,d)){var f=i(d),l=r(f);if(!l){if(t.ignoreUnaccepted)continue;return a("abort"),n(new Error("Aborted because "+f+" is not accepted"))}if(l instanceof Error)return a("abort"),n(l);u[f]=v[f],o(c,l[0]);for(var f in l[1])Object.prototype.hasOwnProperty.call(l[1],f)&&(s[f]||(s[f]=[]),o(s[f],l[1][f]))}for(var h=[],O=0;O<c.length;O++){var f=c[O];H[f]&&H[f].hot._selfAccepted&&h.push({module:f,errorHandler:H[f].hot._selfAccepted})}a("dispose");for(var T=c.slice();T.length>0;){var f=T.pop(),_=H[f];if(_){for(var b={},g=_.hot._disposeHandlers,j=0;j<g.length;j++){var A=g[j];A(b)}E[f]=b,_.hot.active=!1,delete H[f];for(var j=0;j<_.children.length;j++){var P=H[_.children[j]];if(P){var R=P.parents.indexOf(f);R>=0&&P.parents.splice(R,1)}}}}for(var f in s)if(Object.prototype.hasOwnProperty.call(s,f))for(var _=H[f],D=s[f],j=0;j<D.length;j++){var S=D[j],R=_.children.indexOf(S);R>=0&&_.children.splice(R,1)}a("apply"),m=y;for(var f in u)Object.prototype.hasOwnProperty.call(u,f)&&(e[f]=u[f]);var L=null;for(var f in s)if(Object.prototype.hasOwnProperty.call(s,f)){for(var _=H[f],D=s[f],U=[],O=0;O<D.length;O++){var S=D[O],A=_.hot._acceptedDependencies[S];U.indexOf(A)>=0||U.push(A)}for(var O=0;O<U.length;O++){var A=U[O];try{A(s)}catch(C){L||(L=C)}}}for(var O=0;O<h.length;O++){var M=h[O],f=M.module;w=[f];try{p(f)}catch(C){if("function"==typeof M.errorHandler)try{M.errorHandler(C)}catch(C){L||(L=C)}else L||(L=C)}}return L?(a("fail"),n(L)):(a("idle"),void n(null,c))}function p(t){if(H[t])return H[t].exports;var n=H[t]={exports:{},id:t,loaded:!1,hot:o(t),parents:w,children:[]};return e[t].call(n.exports,n,n.exports,r(t)),n.loaded=!0,n.exports}var l=this.webpackHotUpdatexrl_js;this.webpackHotUpdatexrl_js=function(e,t){c(e,t),l&&l(e,t)};var h,v,y,O=!0,m="5cf8f21792e4ed1c74d8",E={},w=[],T=[],x="idle",_=0,b=0,g={},j={},A={},H={};return p.m=e,p.c=H,p.p="/",p.h=function(){return m},r(0)(0)}([/*!****************!*\
	  !*** multi xr ***!
	  \****************/
	function(e,t,n){e.exports=n(/*! ./src/xr.js */1)},/*!*******************!*\
	  !*** ./src/xr.js ***!
	  \*******************/
	function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}function o(e){return{status:e.status,response:e.response,xhr:e}}function a(e){for(var t=arguments.length,n=Array(t>1?t-1:0),r=1;t>r;r++)n[r-1]=arguments[r];for(var o in n)if({}.hasOwnProperty.call(n,o)){var a=n[o];if("object"==typeof a)for(var i in a)({}).hasOwnProperty.call(a,i)&&(e[i]=a[i])}return e}function i(e){h=a({},h,e)}function s(e,t){return(e&&e.promise?e.promise:h.promise||l.promise)(t)}function c(e){return s(e,function(t,n){var r=a({},l,h,e),i=r.xmlHttpRequest();i.open(r.method,r.params?r.url.split("?")[0]+"?"+d["default"](r.params):r.url,!0),i.addEventListener(p.LOAD,function(){if(i.status>=200&&i.status<300){var e=null;i.responseText&&(e=r.raw===!0?i.responseText:r.load(i.responseText)),t(e)}else n(o(i))}),i.addEventListener(p.ABORT,function(){return n(o(i))}),i.addEventListener(p.ERROR,function(){return n(o(i))}),i.addEventListener(p.TIMEOUT,function(){return n(o(i))});for(var s in r.headers)({}).hasOwnProperty.call(r.headers,s)&&i.setRequestHeader(s,r.headers[s]);for(var s in r.events)({}).hasOwnProperty.call(r.events,s)&&i.addEventListener(s,r.events[s].bind(null,i),!1);var c="object"!=typeof r.data||r.raw?r.data:r.dump(r.data);void 0!==c?i.send(c):i.send()})}t.__esModule=!0;var u=n(/*! querystring/encode */2),d=r(u),f={GET:"GET",POST:"POST",PUT:"PUT",DELETE:"DELETE",PATCH:"PATCH",OPTIONS:"OPTIONS"},p={READY_STATE_CHANGE:"readystatechange",LOAD_START:"loadstart",PROGRESS:"progress",ABORT:"abort",ERROR:"error",LOAD:"load",TIMEOUT:"timeout",LOAD_END:"loadend"},l={method:f.GET,data:void 0,headers:{Accept:"application/json","Content-Type":"application/json"},dump:JSON.stringify,load:JSON.parse,xmlHttpRequest:function(){return new XMLHttpRequest},promise:function(e){return new Promise(e)}},h={};c.assign=a,c.encode=d["default"],c.configure=i,c.Methods=f,c.Events=p,c.defaults=l,c.get=function(e,t,n){return c(a({url:e,method:f.GET,params:t},n))},c.put=function(e,t,n){return c(a({url:e,method:f.PUT,data:t},n))},c.post=function(e,t,n){return c(a({url:e,method:f.POST,data:t},n))},c.patch=function(e,t,n){return c(a({url:e,method:f.PATCH,data:t},n))},c.del=function(e,t){return c(a({url:e,method:f.DELETE},t))},c.options=function(e,t){return c(a({url:e,method:f.OPTIONS},t))},t["default"]=c,e.exports=t["default"]},/*!*********************************!*\
	  !*** ./~/querystring/encode.js ***!
	  \*********************************/
	function(e,t){"use strict";var n=function(e){switch(typeof e){case"string":return e;case"boolean":return e?"true":"false";case"number":return isFinite(e)?e:"";default:return""}};e.exports=function(e,t,r,o){return t=t||"&",r=r||"=",null===e&&(e=void 0),"object"==typeof e?Object.keys(e).map(function(o){var a=encodeURIComponent(n(o))+r;return Array.isArray(e[o])?e[o].map(function(e){return a+encodeURIComponent(n(e))}).join(t):a+encodeURIComponent(n(e[o]))}).join(t):o?encodeURIComponent(n(o))+r+encodeURIComponent(n(e)):""}}])});

/***/ }
/******/ ]);
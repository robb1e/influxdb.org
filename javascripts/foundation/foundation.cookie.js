/*!
 * jQuery Cookie Plugin v1.3
 * https://github.com/carhartl/jquery-cookie
 *
 * Copyright 2011, Klaus Hartl
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.opensource.org/licenses/GPL-2.0
 *
 * Modified to work with Zepto.js by ZURB
 */
!function(t,e,n){function i(t){return t}function s(t){return decodeURIComponent(t.replace(r," "))}var r=/\+/g,o=t.cookie=function(r,a,c){if(a!==n){if(c=t.extend({},o.defaults,c),null===a&&(c.expires=-1),"number"==typeof c.expires){var l=c.expires,u=c.expires=new Date;u.setDate(u.getDate()+l)}return a=o.json?JSON.stringify(a):String(a),e.cookie=[encodeURIComponent(r),"=",o.raw?a:encodeURIComponent(a),c.expires?"; expires="+c.expires.toUTCString():"",c.path?"; path="+c.path:"",c.domain?"; domain="+c.domain:"",c.secure?"; secure":""].join("")}for(var d=o.raw?i:s,f=e.cookie.split("; "),h=0,p=f.length;p>h;h++){var g=f[h].split("=");if(d(g.shift())===r){var m=d(g.join("="));return o.json?JSON.parse(m):m}}return null};o.defaults={},t.removeCookie=function(e,n){return null!==t.cookie(e)?(t.cookie(e,null,n),!0):!1}}(Foundation.zj,document);
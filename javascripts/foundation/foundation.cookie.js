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
!function(t,e,n){function i(t){return t}function r(t){return decodeURIComponent(t.replace(o," "))}var o=/\+/g,s=t.cookie=function(o,a,c){if(a!==n){if(c=t.extend({},s.defaults,c),null===a&&(c.expires=-1),"number"==typeof c.expires){var u=c.expires,l=c.expires=new Date;l.setDate(l.getDate()+u)}return a=s.json?JSON.stringify(a):String(a),e.cookie=[encodeURIComponent(o),"=",s.raw?a:encodeURIComponent(a),c.expires?"; expires="+c.expires.toUTCString():"",c.path?"; path="+c.path:"",c.domain?"; domain="+c.domain:"",c.secure?"; secure":""].join("")}for(var f=s.raw?i:r,d=e.cookie.split("; "),h=0,p=d.length;p>h;h++){var m=d[h].split("=");if(f(m.shift())===o){var g=f(m.join("="));return s.json?JSON.parse(g):g}}return null};s.defaults={},t.removeCookie=function(e,n){return null!==t.cookie(e)?(t.cookie(e,null,n),!0):!1}}(Foundation.zj,document);
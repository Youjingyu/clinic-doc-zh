(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{191:function(t,e,a){"use strict";a.r(e);var s=a(0),n=Object(s.a)({},function(){this.$createElement;this._self._c;return this._m(0)},[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"content"},[a("h1",{attrs:{id:"缓存结果"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#缓存结果","aria-hidden":"true"}},[t._v("#")]),t._v(" 缓存结果")]),t._v(" "),a("p",[t._v("一种方法是使用缓存。我们的结果很少改变，因此在 LRU 缓存中缓存查询结果是减少数据库查询总时间的好方法。")]),t._v(" "),a("blockquote",[a("p",[t._v("A way to do that would be to add caching. Our result seldomly changes so caching it in an LRU cache would be a great way to reduce the amount of database queries done in total.")])]),t._v(" "),a("p",[t._v("在 "),a("code",[t._v("4-server-with-caching.js")]),t._v(" 实现了这个优化。我们运行它：")]),t._v(" "),a("blockquote",[a("p",[t._v("This is implemented in 4-server-with-caching.js. Let's run it:")])]),t._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[t._v("clinic bubbleprof --on-port "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'autocannon -c 5 -a 500 localhost:"),a("span",{pre:!0,attrs:{class:"token variable"}},[t._v("$PORT")]),t._v("'")]),t._v(" -- node 4-server-with-caching.js\n")])])]),a("p",[a("img",{attrs:{src:"https://clinicjs.org/static/3569454ee519f02bbe0cdfc78fd29e67/71c55/09-A.png",alt:""}})]),t._v(" "),a("p",[t._v("mongodb 泡沫缩小了 7 倍。与第一个例子相比，大约是 20 倍。此外，从时间轴中的黄线可以看到，在初始查询响应到达后，mongodb 操作已被缓存操作替换。现在我们的 mongodb 泡泡很小 - 到目前为止，大部分时间都用于提供 http 请求。")]),t._v(" "),a("blockquote",[a("p",[t._v("Our mongodb bubbles have shrunk 7x. And about 20x in comparison with the first example. Also, following the yellow line in the timeline tells us that mongodb activity has been replaced by caching activity after initial query response arrived. Now our mongodb bubbles are tiny - and by far the most time is spent just serving http requests.")])]),t._v(" "),a("p",[t._v("希望这片文档有助于你更好地了解 Bubbleprof 工具以及如何使用它来找到你的瓶颈。")]),t._v(" "),a("blockquote",[a("p",[t._v("Hope this helps you understand the Bubbleprof tool better and how to use it to find your bottlenecks.")])])])}],!1,null,null,null);e.default=n.exports}}]);
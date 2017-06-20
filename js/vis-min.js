"use strict";function t(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function e(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}function a(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var i=function t(e,a,i){null===e&&(e=Function.prototype);var s=Object.getOwnPropertyDescriptor(e,a);if(void 0===s){var n=Object.getPrototypeOf(e);return null===n?void 0:t(n,a,i)}if("value"in s)return s.value;var r=s.get;if(void 0!==r)return r.call(i)},s=function(){function t(t,e){for(var a=0;a<e.length;a++){var i=e[a];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,a,i){return a&&t(e.prototype,a),i&&t(e,i),e}}();String.prototype.replaceAll=function(t,e){return this.replace(new RegExp(t,"g"),e)};var n=function(){function t(e){a(this,t);var i=this;this.loading=[],this.data={},this.idx,this.compiled={},this.authors={},this.author_names={},this.places={};var s=["author_ids","intersections","itineraries","places","continents"],n=d3.queue();s.forEach(function(t){var e="data/three_"+t+".json";n.defer(d3.json,e)}),n.await(function(t){if(t)throw t;for(var a=1;a<arguments.length;a++){var n=a-1;i.data[s[n]]=arguments[a]}var r=e.call(r)})}return s(t,[{key:"buildAuthors",value:function t(){var e=this;d3.keys(e.data.author_ids).forEach(function(t){e.authors[e.data.author_ids[t]]=t,e.author_names[t]=e.data.author_ids[t]})}},{key:"buildPlaces",value:function t(){var e=this;d3.keys(e.data.places).forEach(function(t){var a=t.split(",");a[0]=a[0].trim().split(" ").join("_"),a[1]=a[1].trim().split(" ").join("_"),a=a.join("_").toLowerCase().replaceAll("-","_"),e.places[a]=e.data.places[t],e.places[a].PlaceName=t})}},{key:"indexData",value:function t(){var e=this;this.buildAuthors(),this.buildPlaces();var a=0;for(var i in this.data.itineraries)this.data.itineraries[i].forEach(function(t){var i=e.places[t.PlaceID.replaceAll("-","_")],s="";void 0!==i&&(s=i.PlaceName),e.compiled[a]={ID:a,Author:e.authors[t.AuthorID],AuthorID:t.AuthorID,Place:s,StartCitation:t.StartCitation,StartDate:t.StartDate,EndCitation:t.EndCitation,EndDate:t.EndDate,Notes:t.Notes,FullEntry:t},a++});this.idx=lunr(function(){var t=this;this.ref("ID"),this.field("Author"),this.field("Place"),this.field("StartCitation"),this.field("EndCitation"),this.field("Notes");for(var a in e.compiled)t.add(e.compiled[a])})}},{key:"Search",value:function t(e){return this.idx.search(e)}},{key:"DisplaySearchResults",value:function t(e){var a=this.Search(e);if(0==a.length)return"<p>No search results found.</p>";for(var i=[],s=0;s<a.length;s++){var n=this.compiled[a[s].ref],r=[];""!=n.StartDate&&r.push(n.StartDate),""!=n.EndDate&&r.push(n.EndDate),i.push("<div class='search-result'><div class='term'>"+n.Author+"</div><div class='subhead'>"+n.Place+" ("+r.join(" – ")+")</div>"+(""!=n.Notes?"<div class='description'>"+n.Notes+"</div>":"")+"</div>")}return i.join("\n")}},{key:"getData",value:function t(){return this.data}}]),t}(),r=function(){function t(){a(this,t);var e=this;this.data={},this.mode=0,this.places={},this.authors={},this.author_names={},this.continents={},this.classkey="visualization",this.initialized=!1,this.width=0,this.height=0,this.ttime=45}return s(t,[{key:"init",value:function t(){var e=this;this.data=f.getData(),this.focus(),this.process_data(),this.setup(),this.generate(),this.intialized=!0}},{key:"focus",value:function t(){this.width=window.innerWidth,this.height=window.innerHeight}},{key:"process_data",value:function t(){var e=this;e.continents=e.data.continents,f.buildPlaces(),e.places=f.places,d3.keys(e.data.author_ids).forEach(function(t){e.authors[e.data.author_ids[t]]=t,e.author_names[t]=e.data.author_ids[t]}),e.itineraries={},d3.keys(e.authors).forEach(function(t){e.itineraries[t]||(e.itineraries[t]=[])}),d3.keys(e.data.itineraries).forEach(function(t){e.data.itineraries[t].forEach(function(t){t.PlaceID=t.PlaceID.replaceAll("-","_"),e.itineraries[t.AuthorID].push(t)})}),e.intersections={},d3.keys(this.data.intersections).forEach(function(t){e.intersections[t]={},d3.keys(e.data.intersections[t]).forEach(function(a){e.intersections[t][a.replaceAll("-","_")]=e.data.intersections[t][a]})})}},{key:"setup",value:function t(){var e=this}},{key:"generate",value:function t(){this.tear_down()}},{key:"tear_down",value:function t(){}}]),t}(),o=function(n){function r(){a(this,r);var e=t(this,(r.__proto__||Object.getPrototypeOf(r)).call(this));return e.range=[new Date(1890,0,1),new Date(2010,0,1)],e.date_start=e.range[0],e.date_end=e.range[1],e}return e(r,n),s(r,[{key:"init",value:function t(){i(r.prototype.__proto__||Object.getPrototypeOf(r.prototype),"init",this).call(this)}},{key:"setup",value:function t(){i(r.prototype.__proto__||Object.getPrototypeOf(r.prototype),"setup",this).call(this)}},{key:"process_data",value:function t(){i(r.prototype.__proto__||Object.getPrototypeOf(r.prototype),"process_data",this).call(this)}},{key:"generate",value:function t(){i(r.prototype.__proto__||Object.getPrototypeOf(r.prototype),"generate",this).call(this)}},{key:"tear_down",value:function t(){i(r.prototype.__proto__||Object.getPrototypeOf(r.prototype),"tear_down",this).call(this)}}]),r}(r),l=function(n){function r(){a(this,r);var e=t(this,(r.__proto__||Object.getPrototypeOf(r)).call(this));return e.intersections={},e.trajectories={},e.mode=2,e.classkey="trajectories",e.active_authors_t=[],e}return e(r,n),s(r,[{key:"init",value:function t(){i(r.prototype.__proto__||Object.getPrototypeOf(r.prototype),"init",this).call(this)}},{key:"setup",value:function t(){i(r.prototype.__proto__||Object.getPrototypeOf(r.prototype),"setup",this).call(this);var e=this;this.trajectories.map=d3.select(ui.dom.trajectories.map.view).append("svg").attr("width","100%"),d3.select(ui.dom.trajectories.authors.list).html(ui.generateAuthorList(this))}},{key:"process_data",value:function t(){i(r.prototype.__proto__||Object.getPrototypeOf(r.prototype),"process_data",this).call(this),this.trajectories={}}},{key:"generate",value:function t(){function e(t){var e=d3.time.scale().domain(f.domain()).range([0,u.height]).nice(d3.time.month);return e.invert(u.height-e(t))}function a(){D={},w={},b={},x={};var t=d3.entries(u.intersections).filter(function(t){var e=new Date(t.key);return e>=u.date_start&&e<=u.date_end});t.forEach(function(t){d3.keys(t.value).length>0&&d3.keys(t.value).forEach(function(e){var a=0;t.value[e].forEach(function(t){u.active_authors_t.indexOf(t.AuthorID)>-1&&a++}),0!=a&&(D[e]||(D[e]={},D[e].figures={}),t.value[e].forEach(function(a){(!D[e].figures[a.AuthorID]||D[e].figures[a.AuthorID]>a.Likelihood)&&u.active_authors_t.indexOf(a.AuthorID)>-1&&(D[e].figures[a.AuthorID]=a.Likelihood,D[e].info=t.value[e])}))})}),d3.keys(D).forEach(function(t){D[t].lists={};for(var e=1;e<=Object.keys(u.authors).length;e++){var a="_0"+e.toString();D[t].lists[a]=d3.values(D[t].figures).filter(function(t){return t===e})}}),t.forEach(function(t){d3.keys(t.value).forEach(function(e){w[e]||(w[e]=[]),t.value[e].forEach(function(t){0===w[e].filter(function(e){return e.AuthorID===t.AuthorID&&e.EndDate===t.EndDate}).length&&w[e].push(t)})})}),t.forEach(function(t){d3.keys(t.value).forEach(function(e){t.value[e].forEach(function(t){b[t.AuthorID]||(b[t.AuthorID]=[]),0===b[t.AuthorID].filter(function(e){return e.PlaceID===t.PlaceID&&e.EndDate===t.EndDate}).length&&b[t.AuthorID].push(t)})})});for(var e in b)-1==u.active_authors_t.indexOf(e)&&delete b[e];d3.keys(b).forEach(function(t){d3.keys(b[t]).forEach(function(e){b[t][e].PlaceID=b[t][e].PlaceID.replaceAll("-","_")})});for(var a=0,i=0;i<d3.keys(b).length;i++)for(var s=0;s<b[d3.keys(b)[i]].length-1;s++)b[d3.keys(b)[i]][s].PlaceID_End=b[d3.keys(b)[i]][s+1].PlaceID,b[d3.keys(b)[i]][s].Likelihood_End=b[d3.keys(b)[i]][s+1].Likelihood,b[d3.keys(b)[i]][s].tier=a,a=s%2*10;d3.keys(D).forEach(function(t){x[t]||(x[t]=[])}),d3.values(b).forEach(function(t){t.forEach(function(t){x[t.PlaceID]||(x[t.PlaceID]=[]),x[t.PlaceID_End]||(x[t.PlaceID_End]=[]),x[t.PlaceID].push(t),t.PlaceID_End&&x[t.PlaceID_End].push(t)})})}function s(){I=u[u.classkey].map.selectAll("g.lines_target").data([u]),I.enter().append("g").classed("lines_target",!0),I.exit().remove(),L=I.selectAll("g.lines_g").data(d3.entries(b)),L.enter().append("g").classed("lines_g",!0),L.attr("class",function(t){return"lines_g id_"+d3.keys(u.authors).indexOf(t.key)}),L.exit().remove(),C=L.selectAll("path.line").data(function(t){return t.value.filter(function(t){return t.PlaceID_End})}),C.enter().append("path").classed("line",!0),C.attr("d",function(t){var e={},a={},i=t.PlaceID||t.PlaceID_End,s=t.PlaceID_End||t.PlaceID;e=m([u.places[i].Long,u.places[i].Lat]),a=m([u.places[s].Long,u.places[s].Lat]);var n=a[0]-e[0],r=a[1]-e[1],o=Math.sqrt((n+t.tier)*(n+t.tier)+(r+t.tier)*(r+t.tier));return"M"+e[0]+","+e[1]+"A"+o+","+o+" 0 0,1 "+a[0]+","+a[1]}),C.exit().remove()}function n(){var t=d3.scale.linear().domain([0,10]).range([0,36]);A=u[u.classkey].map.selectAll("g.points_target").data([u]),A.enter().append("g").classed("points_target",!0),A.exit().remove(),E=u[u.classkey].map.selectAll("g.points_g").data(d3.entries(D)),E.enter().append("g").classed("points_g",!0),E.attr("transform",function(t){var e=m([u.places[t.key].Long,u.places[t.key].Lat]);return"translate("+e[0]+","+e[1]+")"}).append("text").attr("class","tip").text(function(t){var e=[];e.push(u.places[t.key].PlaceName);for(var a=0;a<t.value.info.length;a++){var i=[];i.push(u.authors[t.value.info[a].AuthorID]),""!=t.value.info[a].StartDate&&i.push(" \nFrom: "+t.value.info[a].StartDate.toString()),""!=t.value.info[a].StartCitation&&i.push(" ("+t.value.info[a].StartCitation.toString()+")"),""!=t.value.info[a].EndDate&&i.push("\nUntil: "+t.value.info[a].EndDate),""!=t.value.info[a].EndDate&&i.push(" ("+t.value.info[a].StartCitation.toString()+")"),e.push(i.join(""))}return e.join("<br />")}),E.on("mousemove",function(t){d3.select(this).transition().duration(u.ttime).attr("transform",function(t){var e=m([u.places[t.key].Long,u.places[t.key].Lat]);return"translate("+e[0]+","+e[1]+")scale(1.5)"})}).on("mouseout",function(t){d3.select(this).transition().duration(u.ttime/2).attr("transform",function(t){var e=m([u.places[t.key].Long,u.places[t.key].Lat]);return"translate("+e[0]+","+e[1]+")scale(1)"})}).on("click",function(t){d3.event.stopPropagation(),d(),t.key!==h.key&&(h=t,d3.select(this).classed("focus_point",!0));var e=d3.select(this),a=d3.select(this).select("text").text(),i=this.getBoundingClientRect(),s=i.top+window.pageYOffset+20,n=i.left+window.pageXOffset+20;d3.select(".tooltip").remove(),d3.select(ui.dom.trajectories.elem).append("div").attr("class","tooltip").style({top:s+"px",left:n+"px",bottom:"auto",right:"auto"}).html(a).on("click",function(){d3.select(this).style({"animation-direction":"reverse","animaiton-play-state":"running","animation-fill-mode":"backwards"}).transition().delay(800).remove()}),o()}),E.exit().remove(),O=E.selectAll("circle.point_back").data(function(t){return[t.value.lists._01]}),O.enter().append("circle").classed("point_back",!0),O.attr("cx",0).attr("cy",0).attr("r",function(e){return t(1)}),O.exit().remove(),S=E.selectAll("circle.point_01").data(function(t){return[t.value.lists._01]}),S.enter().append("circle").classed("point_01",!0),S.classed("point",!0).attr("cx",0).attr("cy",0).attr("r",function(e){return t(1)}),S.exit().remove(),j=E.selectAll("circle.point_02").data(function(t){return[t.value.lists._02]}),j.enter().append("circle").classed("point_02",!0),j.classed("point",!0).attr("cx",0).attr("cy",0).attr("r",function(e){return t(1)}),j.exit().remove(),P=E.selectAll("circle.point_03").data(function(t){return[t.value.lists._03]}),P.enter().append("circle").classed("point_03",!0),P.classed("point",!0).attr("cx",0).attr("cy",0).attr("r",function(e){var a=e.length;return t(a)}),P.exit().remove()}function o(){var t=d3.scale.linear().domain([0,3]).range([.5,1]);if(h){d3.select(ui.dom.intersections.results.title).html(u.places[h.key].PlaceName);var e=w[h.key]||[],a=d3.select(ui.dom.intersections.results.view),i,s;i=a.selectAll(".item").data(e),i.enter().append("div").classed("item",!0),i.attr("class",function(t){return"item id_"+d3.keys(u.authors).indexOf(t.AuthorID)}).style("opacity",function(e){return t(e.Likelihood)}).html(function(t){return u.authors[t.AuthorID]}),i.exit().remove(),s=i.selectAll("div.item_date").data(function(t){return[t]}),s.enter().append("div").classed("item_date",!0),s.html(function(t){var e;return e=t.StartDate&&t.EndDate?t.StartDate+"&nbsp;&ndash;&nbsp;"+t.EndDate:t.StartDate?t.StartDate+"&nbsp;&ndash;":t.EndDate?"&nbsp;&ndash;"+t.EndDate:""}),s.exit().remove()}else d3.select("#sidebar_title").html(""),d3.select("#sidebar_items").html("")}function l(){var t=d3.time.format("%b %Y");d3.select(ui.dom[u.classkey].datestart).html(t(u.date_start)),d3.select(ui.dom[u.classkey].dateend).html(t(u.date_end))}function c(){a(),s(),n(),o()}function d(){h=!1,d3.selectAll(".focus_point").classed("focus_point",!1)}i(r.prototype.__proto__||Object.getPrototypeOf(r.prototype),"generate",this).call(this);var u=this,h=!1;this[this.classkey].map.attr("height",this.height),this[this.classkey].map.on("click",function(){d3.event.stopPropagation(),d(),o()}),d3.select(ui.dom[this.classkey].authors.list).selectAll(".author").each(function(){d3.select(this).on("click",function(){var t=d3.select(this);if(t.classed("selected")){t.classed("selected",!1);var e=u.active_authors_t.indexOf(t.attr("data-key"));e>-1&&u.active_authors_t.splice(e,1)}else t.classed("selected",!0),u.active_authors_t.push(t.attr("data-key"));c()})});var p=ui.dom[this.classkey].dateslider.offsetWidth,f=d3.time.scale().domain(this.range),v=d3.svg.axis().orient("right").ticks(10).tickSize(p-2).tickPadding(12),_=d3.slider().scale(f).axis(v).value([e(this.range[1]),e(this.range[0])]).orientation("vertical").margin(0).animate(!1).on("slide",function(t,a){var i=a[1]instanceof Date?a[1]:new Date(a[1]),s=a[0]instanceof Date?a[0]:new Date(a[0]);u.date_start=e(i),u.date_end=e(s),l(),c()}).on("slideend",function(t,e){c()}),y=d3.select(ui.dom[this.classkey].dateslider).call(_);d3.select(ui.dom[this.classkey].dateslider).selectAll("text").attr("transform","translate(-"+p+",20)"),l();var m=d3.geo.mercator().scale(160).translate([.5*ui.dom[this.classkey].map.view.offsetWidth,.5*ui.dom[this.classkey].map.view.offsetHeight]),g=d3.geo.path().projection(m),k=topojson.feature(u.continents,u.continents.objects.continents),D,w,b,x,A,E,O,P,j,S,I,L,C,N;N=u[this.classkey].map.selectAll("path.map").data([k]),N.enter().append("path").classed("map",!0),N.attr("d",g),N.exit().remove(),a(),s(),n(),o()}},{key:"tear_down",value:function t(){i(r.prototype.__proto__||Object.getPrototypeOf(r.prototype),"tear_down",this).call(this);var e=1===this.mode?2:1;d3.select(ui.dom[this.classkey].dateslider).selectAll("*").remove(),d3.selectAll(".sidebar_tab.selected").classed("selected",!1),d3.select(".sidebar_tab#sidebar_01").classed("selected",!0),d3.selectAll("._0"+e).style("display","none"),d3.selectAll("._0"+this.mode).style("display","block"),this.date_start=this.range[0],this.date_end=this.range[1]}}]),r}(o),c=function(n){function r(){a(this,r);var e=t(this,(r.__proto__||Object.getPrototypeOf(r)).call(this));return e.mode=1,e.classkey="intersections",e.intersections={},e.trajectories={},e}return e(r,n),s(r,[{key:"init",value:function t(){i(r.prototype.__proto__||Object.getPrototypeOf(r.prototype),"init",this).call(this)}},{key:"setup",value:function t(){i(r.prototype.__proto__||Object.getPrototypeOf(r.prototype),"setup",this).call(this);var e=this;this[this.classkey].map=d3.select(ui.dom[this.classkey].map.view).append("svg").attr("width","100%"),this.svg=d3.select("#container").append("svg").attr("width",this.width)}},{key:"process_data",value:function t(){i(r.prototype.__proto__||Object.getPrototypeOf(r.prototype),"process_data",this).call(this),this.trajectories={}}},{key:"generate",value:function t(){function e(t){var e=d3.time.scale().domain(p.domain()).range([0,d.height]).nice(d3.time.month);return e.invert(d.height-e(t))}function a(){k={},D={};var t=d3.entries(d.intersections).filter(function(t){var e=new Date(t.key);return e>=d.date_start&&e<=d.date_end});t.forEach(function(t){d3.keys(t.value).length>0&&d3.keys(t.value).forEach(function(e){k[e]||(k[e]={},k[e].figures={}),t.value[e].forEach(function(t){(!k[e].figures[t.AuthorID]||k[e].figures[t.AuthorID]>t.Likelihood)&&(k[e].figures[t.AuthorID]=t.Likelihood)})})}),d3.keys(k).forEach(function(t){k[t].lists={};for(var e=1;e<=Object.keys(d.authors).length;e++){var a="_0"+e.toString();k[t].lists[a]=d3.values(k[t].figures).filter(function(t){return t===e})}}),t.forEach(function(t){d3.keys(t.value).forEach(function(e){D[e]||(D[e]=[]),t.value[e].forEach(function(t){0===D[e].filter(function(e){return e.AuthorID===t.AuthorID&&e.EndDate===t.EndDate}).length&&D[e].push(t)})})});var e=[];for(var a in k)Object.keys(k[a].figures).length<2&&(e.push(a),delete k[a]);for(var i in D)e.indexOf(i)>-1&&delete D[i]}function s(){var t=d3.scale.linear().domain([0,10]).range([0,36]);w=d.intersections.map.selectAll("g.points_target").data([d]),w.enter().append("g").classed("points_target",!0),w.exit().remove(),b=d.intersections.map.selectAll("g.points_g").data(d3.entries(k)),b.enter().append("g").classed("points_g",!0),b.attr("transform",function(t){var e=y([d.places[t.key].Long,d.places[t.key].Lat]);return"translate("+e[0]+","+e[1]+")"}).append("title").text(function(t){return d.places[t.key].PlaceName}),b.on("click",function(t){d3.event.stopPropagation();var e=d3.select(this),a=1.5;b.forEach(function(t){d3.select(this).classed("selected",!1).transition().duration(d.ttime).attr("transform",function(t){var e=y([d.places[t.key].Long,d.places[t.key].Lat]);return"translate("+e[0]+","+e[1]+")scale(1)"})}),e.classed("selected",!0).transition().duration(d.ttime).attr("transform",function(t){var e=y([d.places[t.key].Long,d.places[t.key].Lat]);return"translate("+e[0]+","+e[1]+")scale(1.5)"}),c(),t.key!==u.key&&(u=t,d3.select(this).classed("focus_point",!0)),n()}),b.exit().remove(),x=b.selectAll("circle.point_back").data(function(t){return[t.value.lists._01]}),x.enter().append("circle").classed("point_back",!0),x.attr("cx",0).attr("cy",0).attr("r",function(e){var a=e.length+this.parentNode.__data__.value.lists._02.length+this.parentNode.__data__.value.lists._03.length;return t(a)}),x.exit().remove(),O=b.selectAll("circle.point_01").data(function(t){return[t.value.lists._01]}),O.enter().append("circle").classed("point_01",!0),O.classed("point",!0).attr("cx",0).attr("cy",0).attr("r",function(e){var a=e.length+this.parentNode.__data__.value.lists._02.length+this.parentNode.__data__.value.lists._03.length;return t(a)}),O.exit().remove(),E=b.selectAll("circle.point_02").data(function(t){return[t.value.lists._02]}),E.enter().append("circle").classed("point_02",!0),E.classed("point",!0).attr("cx",0).attr("cy",0).attr("r",function(e){var a=e.length+this.parentNode.__data__.value.lists._03.length;return t(a)}),E.exit().remove(),A=b.selectAll("circle.point_03").data(function(t){return[t.value.lists._03]}),A.enter().append("circle").classed("point_03",!0),A.classed("point",!0).attr("cx",0).attr("cy",0).attr("r",function(e){var a=e.length;return t(a)}),A.exit().remove()}function n(){var t=d3.scale.linear().domain([0,3]).range([.5,1]);if(u){d3.select(ui.dom[d.classkey].results.title).html(d.places[u.key].PlaceName);var e=D[u.key]||[],a=d3.select(ui.dom[d.classkey].results.view),i,s;i=a.selectAll(".item").data(e),i.enter().append("div").classed("item",!0),i.attr("class",function(t){return"item id_"+d3.keys(d.authors).indexOf(t.AuthorID)}).style("opacity",function(e){return t(e.Likelihood)}).html(function(t){return d.authors[t.AuthorID]}),i.exit().remove(),s=i.selectAll("div.item_date").data(function(t){return[t]}),s.enter().append("div").classed("item_date",!0),s.html(function(t){var e;return e=t.StartDate&&t.EndDate?t.StartDate+"&nbsp;&ndash;&nbsp;"+t.EndDate:t.StartDate?t.StartDate+"&nbsp;&ndash;":t.EndDate?"&nbsp;&ndash;"+t.EndDate:""}),s.exit().remove()}else d3.select("#sidebar_title").html(""),d3.select("#sidebar_items").html("")}function o(){var t=d3.time.format("%b %Y");d3.select(ui.dom[d.classkey].datestart).html(t(d.date_start)),d3.select(ui.dom[d.classkey].dateend).html(t(d.date_end))}function l(){a(),s(),n()}function c(){u=!1,d3.selectAll(".focus_point").classed("focus_point",!1)}i(r.prototype.__proto__||Object.getPrototypeOf(r.prototype),"generate",this).call(this);var d=this,u=!1;this[this.classkey].map.attr("height",this.height),this[this.classkey].map.on("click",function(){d3.event.stopPropagation(),c(),n()});var h=ui.dom[this.classkey].dateslider.offsetWidth,p=d3.time.scale().domain(this.range),f=d3.svg.axis().orient("right").ticks(10).tickSize(h-2).tickPadding(12),v=d3.slider().scale(p).axis(f).value([e(this.range[1]),e(this.range[0])]).orientation("vertical").margin(0).animate(!1).on("slide",function(t,a){var i=a[1]instanceof Date?a[1]:new Date(a[1]),s=a[0]instanceof Date?a[0]:new Date(a[0]);d.date_start=e(i),d.date_end=e(s),o(),l()}).on("slideend",function(t,e){l()}),_=d3.select(ui.dom[this.classkey].dateslider).call(v);d3.select(ui.dom[this.classkey].dateslider).selectAll("text").attr("transform","translate(-"+h+",20)").text(function(t){return d3.select(this).text()+"s"}),o();var y=d3.geo.mercator().scale(160).translate([.5*ui.dom[this.classkey].map.view.offsetWidth,.5*ui.dom[this.classkey].map.view.offsetHeight]),m=d3.geo.path().projection(y),g=topojson.feature(d.continents,d.continents.objects.continents),k,D,w,b,x,A,E,O,P;P=d[d.classkey].map.selectAll("path.map").data([g]),P.enter().append("path").classed("map",!0),P.attr("d",m),P.exit().remove(),a(),s(),n()}},{key:"tear_down",value:function t(){i(r.prototype.__proto__||Object.getPrototypeOf(r.prototype),"tear_down",this).call(this);var e=1===this.mode?2:1;this.intersections.map.selectAll("*").remove(),d3.select(ui.dom[this.classkey].dateslider).selectAll("*").remove(),d3.selectAll(".sidebar_tab.selected").classed("selected",!1),d3.select(".sidebar_tab#sidebar_01").classed("selected",!0),d3.selectAll("._0"+e).style("display","none"),d3.selectAll("._0"+this.mode).style("display","block"),this.date_start=this.range[0],this.date_end=this.range[1]}}]),r}(o),d=function(n){function r(){a(this,r);var e=t(this,(r.__proto__||Object.getPrototypeOf(r)).call(this));return e.classkey="itineraries",e.selectedauthors=[null,null],e.routes=[],e.visHeight=4*e.height,e.selectionsw=d3.select(ui.dom.itineraries.authors.selections).node().getBoundingClientRect().width,e}return e(r,n),s(r,[{key:"init",value:function t(){i(r.prototype.__proto__||Object.getPrototypeOf(r.prototype),"init",this).call(this)}},{key:"setup",value:function t(){var e=this;d3.select(ui.dom[this.classkey].authors.list).html(ui.generateAuthorList(this)),d3.select(ui.dom[this.classkey].authors.list).selectAll(".author").each(function(){d3.select(this).on("click",function(){var t=d3.select(this),a=t.attr("data-key"),i=d3.select(ui.dom[e.classkey].authors.list).selectAll("a.selected")[0].length==e.selectedauthors.length;t.classed("selected")?(t.classed("selected",!1),e.selectedauthors[e.selectedauthors.indexOf(a)]=null):i||(t.classed("selected",!0),e.selectedauthors[e.selectedauthors.indexOf(null)]=a),e.generate()})})}},{key:"generate",value:function t(){i(r.prototype.__proto__||Object.getPrototypeOf(r.prototype),"generate",this).call(this);var e=this;if(this.tear_down(),0!=d3.select(ui.dom[e.classkey].authors.list).selectAll("a.selected")[0].length){for(var a=[],s=0;s<this.selectedauthors.length;s++){var n=s,o=this.selectedauthors[s],l=ui.dom[this.classkey].selections[s].header,c=ui.dom[this.classkey].selections[s].view;null!=o?(d3.select(l).html(this.authors[o]),this.routes[s]=this.itineraries[o],a=a.concat(this.itineraries[o]),d3.select(ui.dom[this.classkey].selections[s].view).append("svg")):(d3.select(l).html("Select an author"),this.routes[s]=null)}var d=[],u=[];d3.keys(e.itineraries).forEach(function(t){d.push(d3.min(e.itineraries[t],function(t){return new Date(t.StartDate)})),u.push(d3.max(e.itineraries[t],function(t){return new Date(t.EndDate)}))});var h=d3.min(d),p=d3.max(u);this.visHeight;var f=this.visHeight+16+d3.select(ui.dom[this.classkey].authors.header).node().getBoundingClientRect().height+d3.select(ui.dom[this.classkey].selections[0].header).node().getBoundingClientRect().height;d3.select(ui.dom[this.classkey].elem).style("height",f+"px"),d3.select(ui.dom[this.classkey].authors.list).style("height",f+"px");for(var v=d3.time.scale().domain([h,p]).range([0,this.visHeight]),_=d3.time.scale().domain([h,p]).range([0,this.visHeight]),y=d3.svg.axis().scale(_).orient("left").tickSize(.95*this.selectionsw,0).tickPadding(-25).tickFormat(d3.time.format("%Y")),m=0;m<this.selectedauthors.length;m++)this.generate_route(m,v,y)}}},{key:"generate_route",value:function t(e,a,i){var s=this,n=this.selectedauthors[e],r=this.routes[e],o=ui.dom[this.classkey].selections[e].view;if(null!=r){var l=d3.select(o).select("svg");l.attr("height",this.visHeight),d3.select(o).style("height",this.visHeight);var c=.95*this.selectionsw*.8-10;0==e&&l.append("g").attr("id","itinerary-axis").call(i).call(function(t){t.style("transform","translateX("+c+"px)"),t.selectAll("text").attr("y",15)});var d=l.selectAll("g.route_g").data([n]);d.enter().append("g").classed("route_g",!0),d.attr("class","route_g author_"+e).attr("transform",function(t,e){var a=0,i=0;return"translate(0,0)"}),d.exit().remove();var u=4,h=d.selectAll("circle.route_stops").data(r);h.enter().append("circle").classed("route_stops",!0),h.attr("cx",30).attr("cy",function(t,e){return a(t.StartDate?new Date(t.StartDate):new Date(t.EndDate))}).attr("r",4).append("text").attr("class","tip").text(function(t){var e=[];if(void 0!==s.places[t.PlaceID]){e.push(s.places[t.PlaceID].PlaceName);var a=[];return""!=t.StartDate&&a.push(" \nFrom: "+t.StartDate.toString()),""!=t.StartCitation&&a.push(" ("+t.StartCitation.toString()+")"),""!=t.EndDate&&a.push("\nUntil: "+t.EndDate),""!=t.EndDate&&a.push(" ("+t.StartCitation.toString()+")"),e.push(a.join("")),e.join("<br />")}}),h.on("click",function(){var t=d3.select(this),e=d3.select(this).select("text").text(),a=this.getBoundingClientRect(),i=a.top+window.pageYOffset-10,s=a.left+window.pageXOffset+50;d3.select(".tooltip").remove(),d3.select(ui.dom.itineraries.elem).append("div").attr("class","tooltip").style({top:i+"px",left:s+"px",bottom:"auto",right:"auto"}).html(e).on("click",function(){d3.select(this).style({"animation-direction":"reverse","animaiton-play-state":"running","animation-fill-mode":"backwards"}).transition().delay(800).remove()})}),h.exit().remove()}}},{key:"route_change",value:function t(e){var a=d3.select("#"+e+"_select").property("value"),i=this.author_names[a],s;s="left"==e?this.left_svg:this.right_svg;var n=this,r=30*this.height;s.attr("height",r);var o=[],l=[];d3.keys(n.itineraries).forEach(function(t){o.push(d3.min(n.itineraries[t],function(t){return new Date(t.StartDate)})),l.push(d3.max(n.itineraries[t],function(t){return new Date(t.EndDate)}))});var c=d3.min(o),d=d3.max(l),u=d3.time.scale().domain([c,d]).range([0,r-150-60]),h=s.selectAll("g.route_g").data(i);h.enter().append("g").classed("route_g",!0),h.attr("class","route_g author_"+e).attr("transform",function(t,e){var a=75;return"translate("+e*(n.width/2)+",75)"}),h.exit().remove();var p=h.selectAll("line.route_line_background").data(n.itineraries[i]);p.enter().append("line").classed("route_line_background",!0),p.attr("x1",n.width/4).attr("y1",function(t,e){return u(u.domain()[0])}).attr("x2",n.width/4).attr("y2",function(t,e){return u(u.domain()[1])}),p.exit().remove();var f=h.selectAll("text.route_label").data(i);f.enter().append("text").classed("route_label",!0),f.attr("x",n.width/4).attr("y",-30).text(a),f.exit().remove();var v=h.selectAll("line.route_line").data(n.itineraries[i]);v.enter().append("line").classed("route_line",!0),v.attr("class","route_line author_"+e).attr("x1",n.width/4).attr("y1",function(t,e){return u(t.StartDate?new Date(t.StartDate):new Date(t.EndDate))}).attr("x2",n.width/4).attr("y2",function(t,e){return u(t.EndDate?new Date(t.EndDate):new Date(t.StartDate))}),v.exit().remove();var _=h.selectAll("line.route_points").data(n.itineraries[i]);_.enter().append("line").classed("route_points",!0),_.attr("x1",n.width/4-15).attr("y1",function(t,e){return u(t.StartDate?new Date(t.StartDate):new Date(t.EndDate))}).attr("x2",n.width/4+45).attr("y2",function(t,e){return u(t.StartDate?new Date(t.StartDate):new Date(t.EndDate))}),_.exit().remove();var y=3,m=h.selectAll("circle.route_stops").data(n.itineraries[i]);m.enter().append("circle").classed("route_stops",!0),m.attr("cx",n.width/4+45).attr("cy",function(t,e){return u(t.StartDate?new Date(t.StartDate):new Date(t.EndDate))}).attr("r",3),m.exit().remove();var g=h.selectAll("text.route_point_labels").data(n.itineraries[i]);g.enter().append("text").classed("route_point_labels",!0),g.attr("x",n.width/4+60).attr("y",function(t,e){return u(t.StartDate?new Date(t.StartDate):new Date(t.EndDate))+4}).text(function(t){var e=t.StartDate||"Unknown",a=t.EndDate||"Unknown";return n.places[t.PlaceID].PlaceName+" ("+e+" to "+a+")"}),g.exit().remove()}},{key:"generate_routes",value:function t(){var e=6*this.height;this.svg.attr("height",e)}},{key:"tear_down",value:function t(){i(r.prototype.__proto__||Object.getPrototypeOf(r.prototype),"tear_down",this).call(this);for(var e=0;e<this.selectedauthors.length;e++)d3.select(ui.dom[this.classkey].selections[e].view).selectAll("*").remove()}}]),r}(r),u=new Object,h=new Object,p=new Object;d3.select("body").style("opacity",.3);var f=new n(function(){d3.selectAll(ui.dom.tabs).each(function(){d3.select(this).on("click",function(){switch(d3.select(".tooltip").remove(),d3.select(this).attr("data-mode")){case"1":u.hasOwnProperty("initialized")?u.focus():(u=new c,u.init());break;case"2":h.hasOwnProperty("initialized")?h.focus():(h=new l,h.init());break;case"3":p.hasOwnProperty("initialized")?p.focus():(p=new d,p.init());break;case"4":f.indexData(),d3.select(ui.dom.searchfield).on("input",function(){this.value.length>2&&d3.select(ui.dom.searchresults).html(f.DisplaySearchResults(this.value))});break}})}),d3.select("body").transition(200).style("opacity",1)});d3.selection.prototype.first=function(){return d3.select(this[0][0])},d3.selection.prototype.last=function(){var t=this.size()-1;return d3.select(this[0][t])};
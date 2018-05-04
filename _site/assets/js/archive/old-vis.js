var init=function(){return{loading:[],width:window.innerWidth,height:window.innerHeight,init:!0,data:{},date:{start:new Date,end:new Date},focus:{place:""},navigation:null,navActive:!1,projection:null,path:null,intersections:{},intersections_journeys:{},trajectories:[],visible_authors:[],dt_from:"1913-06-25",dt_to:"2016-11-24",dt_cur_from:null,dt_cur_to:null,sidebar_mode:"trajectories",loadingManager:function(e,t){var n=vis;n.loading=n.loading.filter(function(t){return t!==e}),0===n.loading.length&&t()},getData:function(e){var t=vis,n=["continents","intersections","trajectories","places","authors"],a=e;n.forEach(function(e){t.loading.push(e)}),n.forEach(function(e){var n="data/"+e+".json";d3.json(n,function(n,r){n||(t.data[e]=r,t.loadingManager(e,a))})})},generateDateSlider:function(){var e=vis,t=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sept","Oct","Nov","Dec"];$(".slider-time").html("Jun. 1913"),$(".slider-time2").html("Nov. 2016");var n=Date.parse(e.dt_from)/1e3,a=Date.parse(e.dt_to)/1e3;function r(e){var n=e.getFullYear();return t[e.getMonth()]+". "+n}$("#slider-range").slider({range:!0,min:n,max:a,step:10,values:[n,a],slide:function(t,n){e.dt_cur_from=new Date(1e3*n.values[0]),$(".slider-time").html(r(e.dt_cur_from)),e.dt_cur_to=new Date(1e3*n.values[1]),$(".slider-time2").html(r(e.dt_cur_to)),e.update()}})},generate:function(){var e=vis;e.svg=d3.select("#container").append("svg").attr("width",e.width).attr("height",e.height).on("click",function(){e.focus.place=null,e.update(),d3.selectAll(".selected").classed("selected",!1)}),e.focus.place&&null!==e.focus.place||(e.focus.place="Paris_France"),e.projection=d3.geo.mercator().scale(220).translate([.36*e.width,.6*e.height]),e.path=d3.geo.path().projection(e.projection);var t,n=topojson.feature(e.data.continents,e.data.continents.objects.continents);(t=e.svg.selectAll("path.map").data([n])).enter().append("path").classed("map",!0),t.attr("d",e.path),t.exit().remove(),e.generate_lines(),e.generate_points(e.generate_legend),e.updateSidebar()},update:function(){var e=vis;e.filterData(),e.generate_lines(),e.generate_points(),e.updateSidebar()},generate_lines:function(){var e,t,n=vis;(e=n.svg.selectAll("g.trajectoriesG").data([n.trajectories])).enter().append("g").classed("trajectoriesG",!0),e.exit().remove(),(t=e.selectAll("path.trajectory").data(function(e){return e})).enter().append("path").classed("trajectory",!0),t.attr("class",function(e){var t=e.ArCiCo.replace(/ /g,""),a=e.DptCiCo.replace(/ /g,"");return selected=e.ArCiCo===n.focus.place||e.DptCiCo===n.focus.place?"selected":"","trajectory "+t+" "+a+" "+e.AuthorID+" "+selected}).attr("d",function(e){var t={},a={};t.raw=n.projection([n.data.places[e.ArCiCo][1],n.data.places[e.ArCiCo][0]]),t.x=t.raw[0],t.y=t.raw[1],a.raw=n.projection([n.data.places[e.DptCiCo][1],n.data.places[e.DptCiCo][0]]),a.x=a.raw[0],a.y=a.raw[1];var r=a.x-t.x,i=a.y-t.y,s=Math.sqrt((r+e.tier)*(r+e.tier)+(i+e.tier)*(i+e.tier));return"M"+t.x+","+t.y+"A"+s+","+s+" 0 0,1 "+a.x+","+a.y}),t.exit().remove();var a=window.chrome,r=window.navigator,i=r.vendor,s=r.userAgent.indexOf("OPR")>-1,c=r.userAgent.indexOf("Edge")>-1;r.userAgent.match("CriOS");null!==a&&void 0!==a&&"Google Inc."===i&&0==s&&0==c&&n.svg.on("mousemove",function(e){var a=d3.mouse(this),r=null,i=!1;t.classed("hov",function(e){var t=!1;return function(e,t){for(var n,a,r,i,s=e.getTotalLength(),c=8,o=1/0,l=0;l<=s;l+=c)(i=_(r=e.getPointAtLength(l)))<o&&(n=r,a=l,o=i);for(c/=2;c>.5;){var u,d,p,f,v,h;(p=a-c)>=0&&(v=_(u=e.getPointAtLength(p)))<o?(n=u,a=p,o=v):(f=a+c)<=s&&(h=_(d=e.getPointAtLength(f)))<o?(n=d,a=f,o=h):c/=2}return(n=[n.x,n.y]).distance=Math.sqrt(o),n;function _(e){var n=e.x-t[0],a=e.y-t[1];return n*n+a*a}}(d3.select(this).node(),a).distance<2&&(t=!i,r=e,i=!0,n.tt&&(n.tt.attr("transform",function(){var e=a[0],t=a[1];return"translate("+(e+=0)+","+(t+=-10)+")"}),n.tt_content.text(e.Name+": "+e.DptCiCo.split("_").join(", ")+" → "+e.ArCiCo.split("_").join(", ")))),t}),n.tt&&n.tt.attr("class",function(e){return(i?"visible":"")+" tt "+(r?r.AuthorID:"")}),d3.event.stopPropagation()})},generate_points:function(e){var t,n,a,r,i,s=vis,c=d3.scale.linear().domain([0,10]).range([.5,15]),o=[];d3.keys(s.intersections).forEach(function(e){var t={};t.placeName=e;var n=s.projection([s.data.places[t.placeName][1],s.data.places[t.placeName][0]]);t.posX=n[0],t.posY=n[1],t.specY=s.intersections[e].filter(function(e){return"Y"===e.specificity}).length,t.specM=s.intersections[e].filter(function(e){return"M"===e.specificity}).length,t.specD=s.intersections[e].filter(function(e){return"D"===e.specificity}).length,o.push(t)}),(t=s.svg.selectAll("g.pointG").data(o)).enter().append("g").classed("pointG",!0),t.attr("class",function(e){return"pointG "+e.placeName.replace(/ /g,"")+" "+(e.placeName===s.focus.place?"selected":"")}),t.on("mouseover",function(e){var t=e.placeName.replace(/ /g,"");d3.selectAll(".hov").classed("hov",!1),d3.selectAll("."+t).classed("hov",!0),d3.event.stopPropagation()}).on("mouseout",function(e){d3.selectAll(".hov").classed("hov",!1)}).on("click",function(e){s.focus.place=e.placeName,d3.selectAll(".selected").classed("selected",!1),d3.selectAll("."+s.focus.place).classed("selected",!0),s.updateSidebar(),d3.event.stopPropagation()}),t.exit().remove(),(r=t.selectAll("circle.points_YearSpec").data(function(e){return[e]})).enter().append("circle").classed("points_YearSpec",!0),r.classed("marker",!0).attr("cx",function(e,t){return e.posX}).attr("cy",function(e){return e.posY}).attr("r",function(e){return c(e.specD+e.specM+e.specY)}),r.exit().remove(),(i=t.selectAll("circle.points_MonthSpec").data(function(e){return[e]})).enter().append("circle").classed("points_MonthSpec",!0),i.classed("marker",!0).attr("cx",function(e,t){return e.posX}).attr("cy",function(e){return e.posY}).attr("r",function(e){return c(e.specD+e.specM)}),i.exit().remove(),(n=t.selectAll("circle.pointBack").data(function(e){return[e]})).enter().append("circle").classed("pointBack",!0),n.classed("marker",!0).attr("cx",function(e){return e.posX}).attr("cy",function(e){return e.posY}).attr("r",function(e){return c(e.specD)}),n.exit().remove(),(a=t.selectAll("circle.point").data(function(e){return[e]})).enter().append("circle").classed("point",!0),a.classed("marker",!0).attr("cx",function(e){return e.posX}).attr("cy",function(e){return e.posY}).attr("r",function(e){return c(e.specD)}),a.exit().remove(),s.tt=s.svg.selectAll("g.tt").data([s]),s.tt.enter().append("g").classed("tt",!0),s.tt.classed("visible",!1),s.tt.exit().remove(),s.tt_content=s.tt.selectAll("text.tt_content").data(function(e){return[e]}),s.tt_content.enter().append("text").classed("tt_content",!0),s.tt_content.text(""),s.tt_content.exit().remove(),e&&e(c)},generate_legend:function(e){var t,n,a,r=vis,i=e,s=["Specificity — Day","Specificity — Month","Specificity — Year","1 intersection","3 intersections","6 intersections"];(t=d3.select("#nav_legend svg").selectAll("circle.marker").data(s)).enter().append("circle").classed("marker",!0),t.attr("class",function(e,t){return"marker "+(1===t?"points_MonthSpec":2===t?"points_YearSpec":"")}).attr("cx",function(e,t){return t<3?150:15}).attr("cy",function(e,t){return t%3*15+15}).attr("r",function(e,t){return t<3?i(2):+e.split(" ")[0]}),t.exit().remove(),(n=d3.select("#nav_legend svg").selectAll("text.legendLabel").data(d3.merge([s,["Journey trajectory"]]))).enter().append("text").classed("legendLabel",!0),n.attr("x",function(e,t){return t<6?t<3?165:27:165}).attr("y",function(e,t){return t<6?t%3*15+18:63}).text(function(e){return e}),n.exit().remove(),(a=d3.select("#nav_legend svg").selectAll("path.legendTrajectory").data([r])).enter().append("path").classed("legendTrajectory",!0),a.attr("d",function(e){var t={},n={};t.x=100,t.y=60,n.x=150,n.y=60;var a=n.x-t.x,r=n.y-t.y,i=Math.sqrt((a+20)*(a+20)+(r+20)*(r+20));return"M"+t.x+","+t.y+"A"+i+","+i+" 0 0,1 "+n.x+","+n.y}),a.exit().remove()},updateSidebar:function(){var e,t,n,a,r,i=vis,s=i.focus.place?i.focus.place.split("_")[0]:"",c=i.focus.place?i.focus.place.split("_")[1]:"",o=i.focus.place?s+", "+c:"(All locations)";function l(){var s=[];i.focus.place&&i.intersections_journeys[i.focus.place]?s=i.intersections_journeys[i.focus.place]:null===i.focus.place&&d3.keys(i.intersections_journeys).forEach(function(e){i.intersections_journeys[e].forEach(function(e){s.indexOf(e)<0&&s.push(e)})}),(t=e.selectAll("div.auth_div").data(s)).enter().append("div").classed("auth_div",!0),t.exit().remove(),(r=t.selectAll("input.auth_input").data(function(e){return[e]})).enter().append("input").classed("auth_input",!0),r.style("display","none"),r.exit().remove(),(n=t.selectAll("span.auth_name").data(function(e){return[e]})).enter().append("span").classed("auth_name",!0),n.attr("class",function(e){return"auth_name "+e.AuthorID}).style("width","100%").style("padding-top","0").text(function(e){var t="";return i.data.authors[e.AuthorID]&&(t=i.data.authors[e.AuthorID].name),t}),n.exit().remove(),(a=t.selectAll("span.auth_desc").data(function(e){return[e]})).enter().append("span").classed("auth_desc",!0),a.html(function(e){var t=e.date,n="",a="",r=e.DptCiCo.split("_").join(", "),s=e.ArCiCo.split("_").join(", ");if("D"===e.specificity)t=e.date;else if("M"===e.specificity){t=[(c=e.date.split("-"))[0],c[1]].join("-")}else if("Y"===e.specificity){var c;t=(c=e.date.split("-"))[0]}return e.ArCiCo===i.focus.place||null===i.focus.place?(n="<span>"+r+"</span>",a="<span class='focus'>"+s+"</span>"):e.DptCiCo!==i.focus.place&&null!==i.focus.place||(n="<span class='focus'>"+r+"</span>",a="<span>"+s+"</span>"),"<div class='sidebar_date'>"+t+"</div><div class='journey'>"+n+"<span>&nbsp;&rarr;&nbsp;</span>"+a+"</div>"}),a.exit().remove()}function u(){var s=d3.entries(i.data.authors);(t=e.selectAll("div.auth_div").data(s)).enter().append("div").classed("auth_div",!0),t.exit().remove(),(r=t.selectAll("input.auth_input").data(function(e){return[e]})).enter().append("input").classed("auth_input",!0),r.attr("type","checkbox").property("checked",function(e){return i.visible_authors.indexOf(e.key)>-1}).style("display","block"),r.on("click",function(e){this.checked?i.visible_authors.push(e.key):i.visible_authors=i.visible_authors.filter(function(t){return t!==e.key}),i.update(),d3.event.stopPropagation()}),r.exit().remove(),(n=t.selectAll("span.auth_name").data(function(e){return[e]})).enter().append("span").classed("auth_name",!0),n.attr("class",function(e){return"auth_name "+e.key}).style("width","auto").style("padding-top","3px").text(function(e){var t="";return i.data.authors[e.key]&&(t=i.data.authors[e.key].name),t}),n.exit().remove(),a=t.selectAll("span.auth_desc").remove()}d3.select("#nav_place span").text(o),e=d3.select("#nav_auth").style("height",function(){return i.height-.03*i.width-375+"px"}).style("opacity",1),legend=d3.select("#nav_legend").style("opacity",1),d3.selectAll("#nav_tabcontrol .btn").classed("selected_tab",function(){return this.id===i.sidebar_mode}).on("click",function(){d3.selectAll("#nav_tabcontrol .btn.selected_tab").classed("selected_tab",!1),d3.select(this).classed("selected_tab",!0),i.sidebar_mode=this.id,"trajectories"===i.sidebar_mode?l():u()}),"trajectories"===i.sidebar_mode?l():u()},filterData:function(){var e=vis;e.trajectories=[],e.intersections={},e.intersections_journeys={},e.date.start=new Date(e.dt_cur_from||e.dt_from),e.date.end=new Date(e.dt_cur_to||e.dt_to);var t=e.date.start.getTime(),n=e.date.end.getTime();e.init&&(e.init=!1,d3.keys(e.data.authors).forEach(function(t){e.visible_authors.push(t)})),d3.keys(e.data.intersections).forEach(function(a,r){var i=new Date(a).getTime();i>=t&&i<=n&&d3.keys(e.data.intersections[a]).forEach(function(t,n){e.intersections[t]||(e.intersections[t]=[]),e.data.intersections[a][t].forEach(function(n,a){var r,i,s,c={Y:0,M:1,D:2};r=e.visible_authors.indexOf(n.AuthorID)>-1,i=(s=e.intersections[t].filter(function(e){return e.AuthorID===n.AuthorID}))&&s.length>0,r&&!i?e.intersections[t].push(n):r&&c[s[0].specificity]>c[n.specificity]&&(s[0].specificity=n.specificity)})})}),placePairs=[],d3.keys(e.data.trajectories).forEach(function(a,r){var i=new Date(a).getTime();i>t&&i<n&&(e.data.trajectories[a].forEach(function(t,n){if(e.visible_authors.indexOf(t.AuthorID)>-1){var a=0,r=[t.ArCiCo,t.DptCiCo].join("_");a=placePairs.indexOf(r)<0?0:placePairs.filter(function(e){return e===r})[0].length+1,placePairs.push(r),t.tier=a,e.trajectories.push(t)}}),e.data.trajectories[a].forEach(function(t,n){if(e.visible_authors.indexOf(t.AuthorID)>-1){var r=t;r.date=a,e.intersections_journeys[t.ArCiCo]||(e.intersections_journeys[t.ArCiCo]=[]),e.intersections_journeys[t.DptCiCo]||(e.intersections_journeys[t.DptCiCo]=[]),e.intersections_journeys[t.ArCiCo].push(r),e.intersections_journeys[t.DptCiCo].push(r)}}))})},processData:function(){var e=vis;e.filterData(),e.generate()}}},vis=init();vis.generateDateSlider(),vis.getData(vis.processData);
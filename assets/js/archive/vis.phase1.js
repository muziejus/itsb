class CreateMap{constructor(){this.data={},this.itineraries={},this.trajectories={},this.intersections={},this.places={},this.authors={},this.author_names={},this.continents={},this.active_authors_t=[],this.width=window.innerWidth,this.height=window.innerHeight,this.loading=[],this.range=[new Date(1890,1,1),new Date(2010,1,1)],this.date_start=this.range[0],this.date_end=this.range[1],d3.select(".panel").each(function(){d3.select(this).classed("selected")&&(self.mode=d3.select(this).attr("data-mode"))}),this.ttime=45}loading_manager(t){this.loading=this.loading.filter(function(e){return e!==t}),0===this.loading.length&&(this.process_data(),this.setup(),this.generate())}get_data(){var t=this,e=["author_ids","intersections","itineraries","places","continents"];e.forEach(function(e){t.loading.push(e)}),e.forEach(function(e){var a="data/three_"+e+".json";d3.json(a,function(a,n){a||(t.data[e]=n,t.loading_manager(e))})})}process_data(){var t=this;t.continents=t.data.continents,d3.keys(t.data.places).forEach(function(e){var a=e.split(",");a[0]=a[0].trim().split(" ").join("-"),a[1]=a[1].trim().split(" ").join("-"),a=a.join("_").toLowerCase(),t.places[a]=t.data.places[e],t.places[a].PlaceName=e}),d3.keys(t.data.author_ids).forEach(function(e){t.authors[t.data.author_ids[e]]=e,t.author_names[e]=t.data.author_ids[e]}),t.intersections=t.data.intersections,t.trajectories={},t.itineraries={},d3.keys(t.authors).forEach(function(e){t.itineraries[e]||(t.itineraries[e]=[])}),d3.keys(t.data.itineraries).forEach(function(e){t.data.itineraries[e].forEach(function(e){t.itineraries[e.AuthorID].push(e)})})}setup(){var t=this;d3.selectAll(ui.dom.tabs).each(function(){d3.select(this).on("click",function(){t.switch_mode(d3.select(this).attr("data-mode"))})}),this.intersections.map=d3.select(ui.dom.intersections.map.view).append("svg").attr("width","100%"),this.trajectories.map=d3.select(ui.dom.trajectories.map.view).append("svg").attr("width","100%"),d3.select(ui.dom.trajectories.authors.list).html(ui.generateAuthorList(this)),this.svg=d3.select("#container").append("svg").attr("width",this.width),d3.select("#left_itinerary").append("select").attr("id","left_select").on("change",function(){t.route_change("left")}).selectAll("option").data(d3.keys(t.author_names)).enter().append("option").text(function(t){return t}),d3.select("#right_itinerary").append("select").attr("id","right_select").on("change",function(){t.route_change("right")}).selectAll("option").data(d3.keys(t.author_names)).enter().append("option").text(function(t){return t}),this.left_svg=d3.select("#left_itinerary").append("svg").attr("id","left_route"),this.right_svg=d3.select("#right_itinerary").append("svg").attr("id","right_route"),t.route_change("left"),t.route_change("right")}generate(){switch(this.tear_down(),this.mode){case 1:default:this.generate_int_map();break;case 2:this.generate_traj_map();break;case 3:this.generate_routes()}}generate_int_map(){var t=this,e=!1;this.intersections.map.attr("height",this.height),this.intersections.map.on("click",function(){d3.event.stopPropagation(),E(),y()});var a=ui.dom.intersections.dateslider.offsetWidth,n=d3.time.scale().domain(this.range),i=d3.svg.axis().orient("right").ticks(10).tickSize(a-2).tickPadding(12),r=d3.slider().scale(n).axis(i).value([s(this.range[1]),s(this.range[0])]).orientation("vertical").margin(0).animate(!1).on("slide",function(e,a){var n=a[1]instanceof Date?a[1]:new Date(a[1]),i=a[0]instanceof Date?a[0]:new Date(a[0]);t.date_start=s(n),t.date_end=s(i),x(),A()}).on("slideend",function(t,e){A()});function s(e){var a=d3.time.scale().domain(n.domain()).range([0,t.height]).nice(d3.time.month);return a.invert(t.height-a(e))}d3.select(ui.dom.intersections.dateslider).call(r);d3.select(ui.dom.intersections.dateslider).selectAll("text").attr("transform","translate(-"+a+",20)").text(function(t){return d3.select(this).text()+"s"}),x();var o,c,l,d,u,h,p,f,_,m=d3.geo.mercator().scale(180).translate([.5*ui.dom.intersections.map.view.offsetWidth,.5*ui.dom.intersections.map.view.offsetHeight]),v=d3.geo.path().projection(m),g=topojson.feature(t.continents,t.continents.objects.continents);function D(){o={},c={};var e=d3.entries(t.intersections).filter(function(e){var a=new Date(e.key);return a>=t.date_start&&a<=t.date_end});e.forEach(function(t){d3.keys(t.value).length>0&&d3.keys(t.value).forEach(function(e){o[e]||(o[e]={},o[e].figures={}),t.value[e].forEach(function(t){(!o[e].figures[t.AuthorID]||o[e].figures[t.AuthorID]>t.Likelihood)&&(o[e].figures[t.AuthorID]=t.Likelihood)})})}),d3.keys(o).forEach(function(e){o[e].lists={};for(var a=1;a<=Object.keys(t.authors).length;a++){var n="_0"+a.toString();o[e].lists[n]=d3.values(o[e].figures).filter(function(t){return t===a})}}),e.forEach(function(t){d3.keys(t.value).forEach(function(e){c[e]||(c[e]=[]),t.value[e].forEach(function(t){0===c[e].filter(function(e){return e.AuthorID===t.AuthorID&&e.EndDate===t.EndDate}).length&&c[e].push(t)})})})}function k(){var a=d3.scale.linear().domain([0,10]).range([0,36]);(l=t.intersections.map.selectAll("g.points_target").data([t])).enter().append("g").classed("points_target",!0),l.exit().remove(),(d=t.intersections.map.selectAll("g.points_g").data(d3.entries(o))).enter().append("g").classed("points_g",!0),d.attr("transform",function(e){var a=m([t.places[e.key].Long,t.places[e.key].Lat]);return"translate("+a[0]+","+a[1]+")"}).append("title").text(function(e){return t.places[e.key].PlaceName}),d.on("mousemove",function(e){d3.select(this).transition().duration(t.ttime).attr("transform",function(e){var a=m([t.places[e.key].Long,t.places[e.key].Lat]);return"translate("+a[0]+","+a[1]+")scale(1.5)"})}).on("mouseout",function(e){d3.select(this).transition().duration(t.ttime/2).attr("transform",function(e){var a=m([t.places[e.key].Long,t.places[e.key].Lat]);return"translate("+a[0]+","+a[1]+")scale(1)"})}).on("click",function(t){d3.event.stopPropagation(),E(),t.key!==e.key&&(e=t,d3.select(this).classed("focus_point",!0)),y()}),d.exit().remove(),(u=d.selectAll("circle.point_back").data(function(t){return[t.value.lists._01]})).enter().append("circle").classed("point_back",!0),u.attr("cx",0).attr("cy",0).attr("r",function(t){var e=t.length+this.parentNode.__data__.value.lists._02.length+this.parentNode.__data__.value.lists._03.length;return a(e)}),u.exit().remove(),(f=d.selectAll("circle.point_01").data(function(t){return[t.value.lists._01]})).enter().append("circle").classed("point_01",!0),f.classed("point",!0).attr("cx",0).attr("cy",0).attr("r",function(t){var e=t.length+this.parentNode.__data__.value.lists._02.length+this.parentNode.__data__.value.lists._03.length;return a(e)}),f.exit().remove(),(p=d.selectAll("circle.point_02").data(function(t){return[t.value.lists._02]})).enter().append("circle").classed("point_02",!0),p.classed("point",!0).attr("cx",0).attr("cy",0).attr("r",function(t){var e=t.length+this.parentNode.__data__.value.lists._03.length;return a(e)}),p.exit().remove(),(h=d.selectAll("circle.point_03").data(function(t){return[t.value.lists._03]})).enter().append("circle").classed("point_03",!0),h.classed("point",!0).attr("cx",0).attr("cy",0).attr("r",function(t){var e=t.length;return a(e)}),h.exit().remove()}function y(){var a=d3.scale.linear().domain([0,3]).range([.5,1]);if(e){d3.select(ui.dom.intersections.results.title).html(t.places[e.key].PlaceName);var n,i,r=c[e.key]||[];(n=d3.select(ui.dom.intersections.results.view).selectAll(".item").data(r)).enter().append("div").classed("item",!0),n.attr("class",function(e){return"item id_"+d3.keys(t.authors).indexOf(e.AuthorID)}).style("opacity",function(t){return a(t.Likelihood)}).html(function(e){return t.authors[e.AuthorID]}),n.exit().remove(),(i=n.selectAll("div.item_date").data(function(t){return[t]})).enter().append("div").classed("item_date",!0),i.html(function(t){return t.StartDate&&t.EndDate?t.StartDate+"&nbsp;&ndash;&nbsp;"+t.EndDate:t.StartDate?t.StartDate+"&nbsp;&ndash;":t.EndDate?"&nbsp;&ndash;"+t.EndDate:""}),i.exit().remove()}else d3.select("#sidebar_title").html(""),d3.select("#sidebar_items").html("")}function x(){var e=d3.time.format("%b. %Y");d3.select("#date_start").html(e(t.date_start)),d3.select("#date_end").html(e(t.date_end))}function A(){D(),k(),y()}function E(){e=!1,d3.selectAll(".focus_point").classed("focus_point",!1)}(_=t.intersections.map.selectAll("path.map").data([g])).enter().append("path").classed("map",!0),_.attr("d",v),_.exit().remove(),D(),k(),y()}generate_traj_map(){var t=this,e=!1;this.trajectories.map.attr("height",this.height),this.trajectories.map.on("click",function(){d3.event.stopPropagation(),P(),I()}),d3.select(ui.dom.trajectories.authors.list).selectAll(".author").each(function(){d3.select(this).on("click",function(){var e=d3.select(this);if(e.classed("selected")){e.classed("selected",!1);var a=t.active_authors_t.indexOf(e.attr("data-key"));a>-1&&t.active_authors_t.splice(a,1)}else e.classed("selected",!0),t.active_authors_t.push(e.attr("data-key"));S()})});var a=ui.dom.trajectories.dateslider.offsetWidth;console.log(a);var n=d3.time.scale().domain(this.range),i=d3.svg.axis().orient("right").ticks(10).tickSize(a-2).tickPadding(12),r=d3.slider().scale(n).axis(i).value([s(this.range[1]),s(this.range[0])]).orientation("vertical").margin(0).animate(!1).on("slide",function(e,a){var n=a[1]instanceof Date?a[1]:new Date(a[1]),i=a[0]instanceof Date?a[0]:new Date(a[0]);t.date_start=s(n),t.date_end=s(i),j(),S()}).on("slideend",function(t,e){S()});function s(e){var a=d3.time.scale().domain(n.domain()).range([0,t.height]).nice(d3.time.month);return a.invert(t.height-a(e))}d3.select(ui.dom.trajectories.dateslider).call(r);d3.select(ui.dom.trajectories.dateslider).selectAll("text").attr("transform","translate(-"+a+",20)"),j();var o,c,l,d,u,h,p,f,_,m,v,g,D,k,y=d3.geo.mercator().scale(180).translate([.5*ui.dom.trajectories.map.view.offsetWidth,.5*ui.dom.trajectories.map.view.offsetHeight]),x=d3.geo.path().projection(y),A=topojson.feature(t.continents,t.continents.objects.continents);function E(){o={},c={},l={},d={};var e=d3.entries(t.intersections).filter(function(e){var a=new Date(e.key);return a>=t.date_start&&a<=t.date_end});for(var a in e.forEach(function(e){d3.keys(e.value).length>0&&d3.keys(e.value).forEach(function(a){var n=0;e.value[a].forEach(function(e){t.active_authors_t.indexOf(e.AuthorID)>-1&&n++}),0!=n&&(o[a]||(o[a]={},o[a].figures={}),e.value[a].forEach(function(n){(!o[a].figures[n.AuthorID]||o[a].figures[n.AuthorID]>n.Likelihood)&&t.active_authors_t.indexOf(n.AuthorID)>-1&&(o[a].figures[n.AuthorID]=n.Likelihood,o[a].info=e.value[a])}))})}),d3.keys(o).forEach(function(e){o[e].lists={};for(var a=1;a<=Object.keys(t.authors).length;a++){var n="_0"+a.toString();o[e].lists[n]=d3.values(o[e].figures).filter(function(t){return t===a})}}),e.forEach(function(t){d3.keys(t.value).forEach(function(e){c[e]||(c[e]=[]),t.value[e].forEach(function(t){0===c[e].filter(function(e){return e.AuthorID===t.AuthorID&&e.EndDate===t.EndDate}).length&&c[e].push(t)})})}),e.forEach(function(t){d3.keys(t.value).forEach(function(e){t.value[e].forEach(function(t){l[t.AuthorID]||(l[t.AuthorID]=[]),0===l[t.AuthorID].filter(function(e){return e.PlaceID===t.PlaceID&&e.EndDate===t.EndDate}).length&&l[t.AuthorID].push(t)})})}),l)-1==t.active_authors_t.indexOf(a)&&delete l[a];for(var n=0,i=0;i<d3.keys(l).length;i++)for(var r=0;r<l[d3.keys(l)[i]].length-1;r++)l[d3.keys(l)[i]][r].PlaceID_End=l[d3.keys(l)[i]][r+1].PlaceID,l[d3.keys(l)[i]][r].Likelihood_End=l[d3.keys(l)[i]][r+1].Likelihood,l[d3.keys(l)[i]][r].tier=n,n=r%2*10;d3.keys(o).forEach(function(t){d[t]||(d[t]=[])}),d3.values(l).forEach(function(t){t.forEach(function(t){d[t.PlaceID]||(d[t.PlaceID]=[]),d[t.PlaceID_End]||(d[t.PlaceID_End]=[]),d[t.PlaceID].push(t),t.PlaceID_End&&d[t.PlaceID_End].push(t)})})}function w(){(v=t.trajectories.map.selectAll("g.lines_target").data([t])).enter().append("g").classed("lines_target",!0),v.exit().remove(),(g=v.selectAll("g.lines_g").data(d3.entries(l))).enter().append("g").classed("lines_g",!0),g.attr("class",function(e){return"lines_g id_"+d3.keys(t.authors).indexOf(e.key)}),g.exit().remove(),(D=g.selectAll("path.line").data(function(t){return t.value.filter(function(t){return t.PlaceID_End})})).enter().append("path").classed("line",!0),D.attr("d",function(e){var a,n,i=e.PlaceID||e.PlaceID_End,r=e.PlaceID_End||e.PlaceID;a=y([t.places[i].Long,t.places[i].Lat]);var s=(n=y([t.places[r].Long,t.places[r].Lat]))[0]-a[0],o=n[1]-a[1],c=Math.sqrt((s+e.tier)*(s+e.tier)+(o+e.tier)*(o+e.tier));return"M"+a[0]+","+a[1]+"A"+c+","+c+" 0 0,1 "+n[0]+","+n[1]}),D.exit().remove()}function b(){var a=d3.scale.linear().domain([0,10]).range([0,36]);(u=t.trajectories.map.selectAll("g.points_target").data([t])).enter().append("g").classed("points_target",!0),u.exit().remove(),(h=t.trajectories.map.selectAll("g.points_g").data(d3.entries(o))).enter().append("g").classed("points_g",!0),h.attr("transform",function(e){var a=y([t.places[e.key].Long,t.places[e.key].Lat]);return"translate("+a[0]+","+a[1]+")"}).append("title").text(function(e){var a=[];a.push(t.places[e.key].PlaceName);for(var n=0;n<e.value.info.length;n++){var i=[];i.push(t.authors[e.value.info[n].AuthorID]),""!=e.value.info[n].StartDate&&i.push(" \nFrom: "+e.value.info[n].StartDate.toString()),""!=e.value.info[n].StartCitation&&i.push(" ("+e.value.info[n].StartCitation.toString()+")"),""!=e.value.info[n].EndDate&&i.push("\nUntil: "+e.value.info[n].EndDate),""!=e.value.info[n].EndDate&&i.push(" ("+e.value.info[n].StartCitation.toString()+")"),i.push("\n"),a.push(i.join(""))}return a.join("\n")}),h.on("mousemove",function(e){d3.select(this).transition().duration(t.ttime).attr("transform",function(e){var a=y([t.places[e.key].Long,t.places[e.key].Lat]);return"translate("+a[0]+","+a[1]+")scale(1.5)"})}).on("mouseout",function(e){d3.select(this).transition().duration(t.ttime/2).attr("transform",function(e){var a=y([t.places[e.key].Long,t.places[e.key].Lat]);return"translate("+a[0]+","+a[1]+")scale(1)"})}).on("click",function(t){d3.event.stopPropagation(),P(),t.key!==e.key&&(e=t,d3.select(this).classed("focus_point",!0)),I()}),h.exit().remove(),(p=h.selectAll("circle.point_back").data(function(t){return[t.value.lists._01]})).enter().append("circle").classed("point_back",!0),p.attr("cx",0).attr("cy",0).attr("r",function(t){return a(1)}),p.exit().remove(),(m=h.selectAll("circle.point_01").data(function(t){return[t.value.lists._01]})).enter().append("circle").classed("point_01",!0),m.classed("point",!0).attr("cx",0).attr("cy",0).attr("r",function(t){return a(1)}),m.exit().remove(),(_=h.selectAll("circle.point_02").data(function(t){return[t.value.lists._02]})).enter().append("circle").classed("point_02",!0),_.classed("point",!0).attr("cx",0).attr("cy",0).attr("r",function(t){return a(1)}),_.exit().remove(),(f=h.selectAll("circle.point_03").data(function(t){return[t.value.lists._03]})).enter().append("circle").classed("point_03",!0),f.classed("point",!0).attr("cx",0).attr("cy",0).attr("r",function(t){var e=t.length;return a(e)}),f.exit().remove()}function I(){var a=d3.scale.linear().domain([0,3]).range([.5,1]);if(e){d3.select(ui.dom.intersections.results.title).html(t.places[e.key].PlaceName);var n,i,r=c[e.key]||[];(n=d3.select(ui.dom.intersections.results.view).selectAll(".item").data(r)).enter().append("div").classed("item",!0),n.attr("class",function(e){return"item id_"+d3.keys(t.authors).indexOf(e.AuthorID)}).style("opacity",function(t){return a(t.Likelihood)}).html(function(e){return t.authors[e.AuthorID]}),n.exit().remove(),(i=n.selectAll("div.item_date").data(function(t){return[t]})).enter().append("div").classed("item_date",!0),i.html(function(t){return t.StartDate&&t.EndDate?t.StartDate+"&nbsp;&ndash;&nbsp;"+t.EndDate:t.StartDate?t.StartDate+"&nbsp;&ndash;":t.EndDate?"&nbsp;&ndash;"+t.EndDate:""}),i.exit().remove()}else d3.select("#sidebar_title").html(""),d3.select("#sidebar_items").html("")}function j(){var e=d3.time.format("%b. %Y");d3.select("#date_start").html(e(t.date_start)),d3.select("#date_end").html(e(t.date_end))}function S(){E(),w(),b(),I()}function P(){e=!1,d3.selectAll(".focus_point").classed("focus_point",!1)}(k=t.trajectories.map.selectAll("path.map").data([A])).enter().append("path").classed("map",!0),k.attr("d",x),k.exit().remove(),E(),w(),b(),I()}route_change(t){var e,a=d3.select("#"+t+"_select").property("value"),n=this.author_names[a];e="left"==t?this.left_svg:this.right_svg;var i=this,r=30*this.height;e.attr("height",r);var s=[],o=[];d3.keys(i.itineraries).forEach(function(t){s.push(d3.min(i.itineraries[t],function(t){return new Date(t.StartDate)})),o.push(d3.max(i.itineraries[t],function(t){return new Date(t.EndDate)}))});var c=d3.min(s),l=d3.max(o),d=d3.time.scale().domain([c,l]).range([0,r-150-60]),u=e.selectAll("g.route_g").data(n);u.enter().append("g").classed("route_g",!0),u.attr("class","route_g author_"+t).attr("transform",function(t,e){return"translate("+e*(i.width/2)+",75)"}),u.exit().remove();var h=u.selectAll("line.route_line_background").data(i.itineraries[n]);h.enter().append("line").classed("route_line_background",!0),h.attr("x1",i.width/4).attr("y1",function(t,e){return d(d.domain()[0])}).attr("x2",i.width/4).attr("y2",function(t,e){return d(d.domain()[1])}),h.exit().remove();var p=u.selectAll("text.route_label").data(n);p.enter().append("text").classed("route_label",!0),p.attr("x",i.width/4).attr("y",-30).text(a),p.exit().remove();var f=u.selectAll("line.route_line").data(i.itineraries[n]);f.enter().append("line").classed("route_line",!0),f.attr("class","route_line author_"+t).attr("x1",i.width/4).attr("y1",function(t,e){return t.StartDate?d(new Date(t.StartDate)):d(new Date(t.EndDate))}).attr("x2",i.width/4).attr("y2",function(t,e){return t.EndDate?d(new Date(t.EndDate)):d(new Date(t.StartDate))}),f.exit().remove();var _=u.selectAll("line.route_points").data(i.itineraries[n]);_.enter().append("line").classed("route_points",!0),_.attr("x1",i.width/4-15).attr("y1",function(t,e){return t.StartDate?d(new Date(t.StartDate)):d(new Date(t.EndDate))}).attr("x2",i.width/4+45).attr("y2",function(t,e){return t.StartDate?d(new Date(t.StartDate)):d(new Date(t.EndDate))}),_.exit().remove();var m=u.selectAll("circle.route_stops").data(i.itineraries[n]);m.enter().append("circle").classed("route_stops",!0),m.attr("cx",i.width/4+45).attr("cy",function(t,e){return t.StartDate?d(new Date(t.StartDate)):d(new Date(t.EndDate))}).attr("r",3),m.exit().remove();var v=u.selectAll("text.route_point_labels").data(i.itineraries[n]);v.enter().append("text").classed("route_point_labels",!0),v.attr("x",i.width/4+60).attr("y",function(t,e){return(t.StartDate?d(new Date(t.StartDate)):d(new Date(t.EndDate)))+4}).text(function(t){var e=t.StartDate||"Unknown",a=t.EndDate||"Unknown";return i.places[t.PlaceID].PlaceName+" ("+e+" to "+a+")"}),v.exit().remove()}generate_routes(){var t=6*this.height;this.svg.attr("height",t)}switch_mode(t){switch(this.mode=t,this.tear_down(),this.mode){case"1":default:this.generate_int_map();break;case"2":this.generate_traj_map();break;case"3":this.generate_routes()}}tear_down(){var t=1===this.mode?2:1;this.intersections.map.selectAll("*").remove(),d3.select(ui.dom.intersections.dateslider).selectAll("*").remove(),d3.select(ui.dom.trajectories.dateslider).selectAll("*").remove(),d3.selectAll(".sidebar_tab.selected").classed("selected",!1),d3.select(".sidebar_tab#sidebar_01").classed("selected",!0),d3.selectAll("._0"+t).style("display","none"),d3.selectAll("._0"+this.mode).style("display","block"),this.date_start=this.range[0],this.date_end=this.range[1]}}var vis=new CreateMap;vis.get_data(),d3.selection.prototype.first=function(){return d3.select(this[0][0])},d3.selection.prototype.last=function(){var t=this.size()-1;return d3.select(this[0][t])};
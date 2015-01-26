this["JST"] = this["JST"] || {};

this["JST"]["line_chart_view"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="right trendlineButton"><button id="trendlineToggle">Add Trendline</button></div>\n<div id="chart"></div>';

}
return __p
};

this["JST"]["main_view"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<section id="day_buttons">\n  <ul class="buttons">\n    <li><button id="today">Today</button></li>\n    <li><button id="three_days">3 Days</button></li>\n    <li><button id="seven_days">7 Days</button></li>\n    <li><button id="fifteen_days" class="selected">15 Days</button></li>\n  </ul>\n</section>\n\n<section id="line_chart"></section>\n\n<section id="segments" class="left"></section>\n\n<section id="pie_chart" class="right"></section>\n\n<section id="map_view" class="map_view"></section>';

}
return __p
};

this["JST"]["map_view"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<h2>Rate of activity</h2>\n<div id="map" class="map"></div>';

}
return __p
};

this["JST"]["segments"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<h2>Segments</h2>\n<section>\n  <div><button id="all_button" class="selected">All:</button> <span id="total_count">0</span></div>\n  <div><button id="male_button">Male:</button> <span id="male_count">0</span></div>\n  <div><button id="female_button">Female:</button> <span id="female_count">0</span></div>\n</section>';

}
return __p
};
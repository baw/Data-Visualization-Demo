DVD.Views.MainView = Backbone.View.extend({
    events: {
        "click #day_buttons #today": "today",
        "click #day_buttons #three_days": "threeDays",
        "click #day_buttons #seven_days": "sevenDays",
        "click #day_buttons #fifteen_days": "fifteenDays"
    },
    template: JST["main_view"],
    
    initialize: function () {
        this.fifteenDays =  this.updateForNumDays.bind(this, 14);
        this.sevenDays =  this.updateForNumDays.bind(this, 6);
        this.threeDays =  this.updateForNumDays.bind(this, 2);
        this.today =  this.updateForNumDays.bind(this, 0);
    },
    
    render: function () {
        var renderedContent = this.template();
        
        this.$el.html(renderedContent);
        
        this.renderSegements();
        this.renderLineChart();
        this.renderPieChart();
        this.renderMap();
        
        return this;
    },
    
    renderSegements: function () {
        this.segments = new DVD.Views.SegmentsView({
            collection: this.collection
        });
        
        this.$("#segments").html(this.segments.render().$el);
    },
    
    renderLineChart: function () {
        var $lineChart = this.$("#line_chart").css({
            "height": "300px",
            "width": "960px"
        });
        
        this.lineChart = new DVD.Views.LineChartView({
            collection: this.collection,
            el: $lineChart.get(0)
        });
        
        this.lineChart.render();
    },
    
    renderMap: function () {
        var $map = this.$("#map_view");
        
        this.map = new DVD.Views.MapView({
            collection: this.collection,
            el: $map.get(0)
        });
        
        this.map.render();
    },
    
    renderPieChart: function () {
        var $pieChart = this.$("#pie_chart").css({
            "height": "430px",
            "width" : "430px"
        });
        
        this.pieChart = new DVD.Views.PieChartView({
            collection: this.collection,
            el: $pieChart.get(0)
        });
        
        this.pieChart.render();
    },
    
    clearUpdates: function () {
        this.collection.clearGender();
    },
    
    updateForNumDays: function (numDays, e) {
        this.collection.withinPastDays(numDays);
        
        this.$("#day_buttons button").removeClass("selected");
        this.$(e.target).addClass("selected");
    }
});
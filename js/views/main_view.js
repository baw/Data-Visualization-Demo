DVD.Views.MainView = Backbone.View.extend({
    events: {
        "click #buttons #today": "today",
        "click #buttons #three_days": "threeDays",
        "click #buttons #seven_days": "sevenDays",
        "click #buttons #fifteen_days": "fifteenDays"
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
    
    updateForNumDays: function (numDays) {
        var data = this.collection.withinPastDays(numDays);
        
        this.segments.updateWithDifferentData(data);
        this.lineChart.updateWithDifferentData(data);
    }
});
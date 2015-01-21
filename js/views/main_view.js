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
        this.renderPieChart();
        
        return this;
    },
    
    renderSegements: function () {
        this.segments = new DVD.Views.SegmentsView({
            collection: this.collection,
            allEventCallback: this.clearUpdates.bind(this),
            femaleEventCallback: this.updateForGender.bind(this, "female"),
            maleEventCallback: this.updateForGender.bind(this, "male")
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
    
    renderPieChart: function () {
        var $pieChart = this.$("#pie_chart").css({
            "height": "300px",
            "width" : "430px"
        });
        
        this.pieChart = new DVD.Views.PieChartView({
            collection: this.collection,
            el: $pieChart.get(0)
        });
        
        this.pieChart.render();
    },
    
    clearUpdates: function () {
        this.updateCharts(this.collection);
    },
    
    updateCharts: function (data) {
        this.segments.updateWithDifferentData(data);
        this.lineChart.updateWithDifferentData(data);
        this.pieChart.updateWithDifferentData(data);
    },
    
    updateForGender: function (gender) {
        var data = this.collection.oneGender(gender);
        
        this.updateCharts(data);
    },
    
    updateForNumDays: function (numDays) {
        var data = this.collection.withinPastDays(numDays);
        
        this.updateCharts(data);
    }
});
DVD.Views.SegmentsView = Backbone.View.extend({
    template: JST["segments"],
    events: {
        "click #allButton": "allEventCallback",
        "click #maleButton": "maleEventCallback",
        "click #femaleButton": "femaleEventCallback"
    },
    
    initialize: function (options) {
        this.listenTo(this.collection, "sync", this.updateCount);
        
        this.allEventCallback = options.allEventCallback;
        this.femaleEventCallback = options.femaleEventCallback;
        this.maleEventCallback = options.maleEventCallback;
    },
    
    render: function () {
        var renderedContent = this.template();
        
        this.$el.html(renderedContent);
        
        this.updateCount();
        
        return this;
    },
    
    updateCount: function () {
        var genderCount = this.collection.genderCount();

        this.$("#totalCount").text(genderCount.female + genderCount.male || 0);
        this.$("#maleCount").text(genderCount.male || 0);
        this.$("#femaleCount").text(genderCount.female || 0);
    },
    
    updateWithDifferentData: function (data) {
        this.collection = data;
        
        this.updateCount();
    }
});
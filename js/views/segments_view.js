DVD.Views.SegmentsView = Backbone.View.extend({
    template: JST["segments"],
    events: {
        "click #all_button": "allEventCallback",
        "click #male_button": "maleEventCallback",
        "click #female_button": "femaleEventCallback"
    },
    
    initialize: function (options) {
        this.listenTo(this.collection, "sync filtered", this.updateCount);
    },
    
    allEventCallback: function () {
        this.collection.clearGender();
        
        this.clearButtonClasses();
        $("#all_button").addClass("selected");
    },
    
    clearButtonClasses: function () {
        $("#all_button, #male_button, #female_button").removeClass("selected");
    },
    
    femaleEventCallback: function () {
        this.collection.oneGender("female");
        
        this.clearButtonClasses();
        $("#female_button").addClass("selected");
    },
     
    maleEventCallback: function () {
        this.collection.oneGender("male");
        
        this.clearButtonClasses();
        $("#male_button").addClass("selected");
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
    }
});
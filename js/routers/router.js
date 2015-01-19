DVD.Routers.Router = Backbone.Router.extend({
    routes: {
        "": "mainContent"
    },
    initialize: function (options) {
        this.$rootEl = options.$rootEl;
    },
    
    mainContent: function () {
        DVD.Collections.data_points = new DVD.Collections.DataPoints();
        DVD.Collections.data_points.fetch();
        
        var mainView = new DVD.Views.MainView({
            collection: DVD.Collections.data_points
        });
        
        this._swapViews(mainView);
    },
    
    _swapViews: function (view) {
        this._currentView && this._currentView.remove();
        this._currentViews = view;
        this.$rootEl.html(view.render().$el);
    }
});
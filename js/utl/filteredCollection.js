DVD.Utl.FilteredCollection = Backbone.Collection.extend({
    initialize: function () {
        this._originalModels = this.models;
        this._filters = {};
    },
    
    addFilter: function (name, filterFunction) {
        if (typeof filterFunction !== "function") {
            throw new Error("filterFunction must be a function");
        }
        
        this._filters[name] = filterFunction;
        this.updateFilter();
    },
    
    applyFilters: function (value) {
        for (var key in this._filters) {
            if (this._filters.hasOwnProperty(key)) {
                if (!this._filters[key](value)) {
                    return false;
                }
            }
        }
        
        return true;
    },
    
    clearFilter: function () {
        this._resetModels();
        this._filters = {};
        
        this.trigger("filtered");
    },
    
    removeFilter: function (name) {
        delete this._filters[name];
        
        this.updateFilter();
    },
    
    updateFilter: function () {
        this._resetModels();
        
        var filtedResults = Backbone.Collection.prototype.filter.call(this,
                                               this.applyFilters.bind(this));
        
        this.reset(filtedResults);
        this.trigger("filtered");
    },
    
    _resetModels: function () {
        this.reset(this._originalModels);
    },
});
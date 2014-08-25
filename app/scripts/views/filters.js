'use strict';

module.exports = Filters;

function Filters() {
  var $el = this.$el = $('<div>', {id: 'filters-view'});

  this.$elContainer = $('body');
}

_.extend(Filters.prototype, {
  render: function() {
    console.log('filters render view');
  }
});
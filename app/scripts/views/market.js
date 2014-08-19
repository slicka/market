'use strict';

module.exports = Market;

function Market(model) {
  var $el = this.$el = $('<div>', {id: 'market-view'});
  
  this.$elContainer  = $('body');
  this.model = model;

  _.bindAll(this, 'remove');
  $el.on('click', '.back-button', this.remove);
}

_.extend(Market.prototype, {
  render: function() {
    var $elContainer = this.$elContainer,
        model        = this.model,
        $el          = this.$el;

    $el.append(global.app.template('market')({
      market: this.model
    }));

    $el.css({left: '100%'});
    $elContainer.append($el);

    $el.animate({left: 0}, 400);
  },

  remove: function() {
    var $el = this.$el;

    $el.animate({left:'100%'}, 300, function() {
      $el.off().remove();
    });
  }
});
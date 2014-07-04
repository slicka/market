'use strict';

module.exports = Market;

function Market(model) {
  this.$el = $("<div>", {id: "market-view"});

  this.model = model;
}
_.extend(Market.prototype, {
  render: function() {
    this.$el.append(global.app.template('market')({
      market: this.market
    }));
  },
});
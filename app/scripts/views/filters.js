'use strict';

module.exports = Filters;

function Filters() {
  var $el = this.$el = $('<div>', {id: 'filters-view'});

  this.$elContainer = $('body');

  _.bindAll(this, 'remove');
  $el.on('click', '.back-button', this.remove);

}

_.extend(Filters.prototype, {
  render: function() {
    var $elContainer = this.$elContainer,
        $el          = this.$el;

    $el.append(global.app.template('filters')());
    $el.css({top: '100%'});
    $elContainer.append($el);

    $(document).foundation();
    this.showSelectedDay();
    this.initDropdown();

    $('.range-slider').on('change', this.showSelectedDay);

    $el.animate({top: 0}, 400);
  },

  remove: function() {
    var $el = this.$el;

    $el.animate({top:'100%'}, 300, function() {
      $el.off().remove();
    });
  },

  showSelectedDay: function() {
    var dayIndex  = $('.range-slider').attr('data-slider'),
        daysArray = ['Sundays', 'Mondays', 'Tuesdays', 'Wednesdays', 'Thursdays', 'Fridays', 'Saturdays'];

    $('#daysopen').text(daysArray[dayIndex]);
  },

  initDropdown: function() {
    $('#cd-dropdown').dropdown({
      gutter : 1,
      stack : false,
      delay : 50,
      slidingIn : 1
    });
  }
});
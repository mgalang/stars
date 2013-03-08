(function(Spine, $, exports){
  var Star = Spine.Model.sub();
  Star.configure("Star", "active");
  Star.extend(Spine.Model.Local);

  var Rewards = Spine.Controller.sub({
    el: $('#rewards'),
    events: {
      'click .start': 'start',
      'click .star': 'toggle'
    },
    init: function(){
      Star.bind('refresh', this.proxy(this.render));
      Star.fetch();
    },
    render: function(){
      var items = Star.all();

      if(items.length <= 0){
        $('.start').fadeIn();
      }

      this.$('.items').html('');

      for(var i in items){
        if(items[i].active === 1){
          var tpl = {
            icon_class: "icon-star",
            btn_class: "btn-success"
          };
        } else {
          var tpl = {
            icon_class: "icon-star",
            btn_class: "btn-inverse"
          };
        }

        tpl.id = items[i].id;

        this
          .$('.items')
          .append(Mustache.render(this.template(), tpl));
      }
    },
    template: function(){
      return $('#reward-button').html();
    },
    start: function(e){
      e.preventDefault();
      Star.destroyAll()
      for(i=0;i<30;i++){
        var star = new Star({ active: 0 });
        star.save();
      }
      Star.fetch();

      $(e.target).fadeOut();
    },
    toggle: function(e){
      var _target = $(e.currentTarget);
      var record = Star.find(_target.data('id'));
      record.active = 1 - record.active;
      record.save();

      if(record.active){
        _target.removeClass('btn-inverse flip bounceIn');
        setTimeout(function(){ _target.addClass('btn-success flip'); }, 100);
      } else {
        _target.removeClass('btn-success flip bounceIn');
        setTimeout(function(){ _target.addClass('btn-inverse flip'); }, 100);
      }
    }
  });

  new Rewards();
})(Spine, Spine.$, window);

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

      if(items.length){
        $('.start').hide();
      }

      this.$('.items').html('');

      for(var i in items){
        if(items[i].active === 1){
          var _class="icon-star";
          var _btn_class="btn-primary"
        } else {
          var _class="icon-star-empty";
          var _btn_class="btn-inverse"
        }
        this.$('.items')
        .append('<a class="btn '+_btn_class+' btn-large star" data-id="'+items[i].id+'"><i class="icon-white '+_class+'"></i></a>');
      }
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
      var id = $(e.currentTarget).data('id');

      var record = Star.find(id);
      record.active = 1 - record.active;
      record.save();
      this.render();
    }
  });

  new Rewards();
})(Spine, Spine.$, window);

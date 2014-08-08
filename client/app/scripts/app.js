var App = Ember.Application.create();

var posts = [{
  id: '1',
  title: 'so gay',
  author: { name: 'me'},
  date: new Date('12-27-1999'),
  excerpt: 'I like ember',
  body: 'much more than angular'
}, {
  id: '2',
  title: 'so adsasdf',
  author: { name: 'masdfe'},
  date: new Date('12-27-2000'),
  excerpt: 'I like ember too',
  body: 'much more than angular'
}]

App.Router.map(function(){
  this.resource('about');
  this.resource('posts', function(){
    this.resource('post', {path: ':post_id'});
  })
});

App.PostsRoute = Ember.Route.extend({
  model: function(){
    return this.store.find('post');
  }
});

App.PostRoute = Ember.Route.extend({
  model: function(params){
    return this.store.find('post', params.post_id)
  }
})

App.PostController = Ember.ObjectController.extend({
  isEditing: false,

  actions: {
    edit: function() {
      this.set('isEditing', true);
    },
    doneEditing: function(){
      this.set('isEditing', false);
    }
  }
})

Ember.Handlebars.helper('format-date', function(date) {
  return moment(date).fromNow();
})

App.ApplicationAdapter = DS.RESTAdapter.extend({
  namespace: 'api/v1',
  host: 'http://localhost:3000'
})

var attr = DS.attr

App.Post = DS.Model.extend({
  title: attr(),
  body: attr(),
  created_at: attr(),
  updated_at: attr()
})

App.PostSerializer = DS.JSONSerializer.extend({
  primaryKey: 'id'
})

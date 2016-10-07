import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';

moduleForComponent('not-active', 'Integration | Component | not active', {
  integration: true
});

test('it renders a note if there is no user with permissons', function (assert) {
  let repo = Ember.Object.create({
    id: 1,
    active: false
  });

  this.set('repo', repo);
  this.render(hbs`{{not-active repo=repo}}`);

  assert.equal(this.$().find('.page-title').text().trim(), 'This is not an active repository', 'displays notice header');
  assert.equal(this.$().find('.page-notice').text().trim(), 'You don\'t have sufficient rights to enable this repo on Travis. Please contact the admin to enable it or to receive admin rights yourself.', 'displays notice');
});

test('it renders an activate button is the user has admin permissions', function (assert) {
  let repo = Ember.Object.create({
    id: 123,
    active: false
  });

  this.set('repo', repo);
  this.render(hbs`{{not-active repo=repo}}`);

  assert.equal(this.$().find('.page-title').text().trim(), 'This is not an active repository', 'displays notice header');
  assert.equal(this.$().find('.page-notice').text().trim(), 'You can activate the repository on your profile, or by clicking the button below', 'displays notice');
  assert.equal(this.$().find('button').text().trim(), 'Activate repository', 'displays an activation button');
});

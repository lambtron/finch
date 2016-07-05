
/**
 * Script.
 *
 * 1. get 20 accounts
 * 2. show relevant user info one at a time
 * 3. prompt user: no action, mute, or unfollow
 * 4. goto 1, rinse, repeat
 */

/**
 * Module dependencies.
 */

var config = require('dotenv').config();
var Twitter = require('./lib/twitter');
var User = require('./lib/db-user');
var prompt = require('co-prompt');
var _ = require('lodash');
var co = require('co');


/**
 * Do stuff.
 */

co(function *() {
  var screen_name = config.TWITTER_SCREEN_NAME;

  var me = yield User.findOne({ screen_name: screen_name });
  if (!me) {
    me = { screen_name: 'andyjiang', cursor: -1, index: 0 };
    yield User.insert(me);
  }


  var res = yield Twitter.friends(me.screen_name, me.cursor);
  var users = _.filter(res.data.users, { 'muting': false });
  var cursor = res.data.next_cursor_str;
  me.cursor = cursor;
  // save cursor to db

  var ans = 'n';
  for (var i = 0; i < users.length; i++) {
    var res_tweets = yield Twitter.tweets(users[i].id_str);
    var tweets = res_tweets.data;
    var originality = Twitter.originality(tweets);

    console.log();
    console.log(users[i].name + ' (@' + users[i].screen_name + ')');
    if (users[i].verified) console.log('verified');
    console.log('bio: ' + users[i].description);
    console.log('location: ' + users[i].location);
    console.log('following/followers: ' + users[i].friends_count + '/' + users[i].followers_count);
    console.log('original/retweets (out of 100): ' + originality);
    console.log('recent tweets:');
    for (var j = 0; j < 5; j++) {
      if (j === tweets.length) break;
      console.log();
      console.log('    ' + tweets[j].text);
      console.log('        ' + tweets[j].created_at);
      console.log();
    }

    // Get user input.
    ans = yield prompt('[n]ext/[m]ute/[u]nfollow/[q]uit: ');

    // Do the right thing.
    if (ans === 'm') {
      yield Twitter.mute(users[i].id_str);
    } else if (ans === 'u') {
      yield Twitter.unfollow(users[i].id_str);
    }

    // save micro cursor to db, which is the

    // if users < X, update cursor and get more users.
    if (ans === 'q') {
      me.index = i - 1;
      yield User.upsert(me);
      break;
    }

    if (users.length - i < 10) {
      var res_new_users = yield Twitter.friends(screen_name, me.cursor);
      var new_users = _.filter(res_new_users.data.users, { 'muting': false });
      users = users.concat(new_users);
      cursor = res_new_users.data.next_cursor_str;
      me.cursor = cursor;
    }
  }

  process.exit(0);
});



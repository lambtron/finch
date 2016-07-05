
/**
 * Module dependencies.
 */

var Twitter = require('twitter');
var config = require('dotenv').config();
var _ = require('lodash');

/**
 * Twitter credentials
 */

var twitterConfig = {
  consumer_key: config.TWITTER_CONSUMER_KEY,
  consumer_secret: config.TWITTER_CONSUMER_SECRET,
  access_token_key: config.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: config.TWITTER_ACCESS_TOKEN_SECRET
};

/**
 * Define `client`.
 */

var client = new Twitter(twitterConfig);

/**
 * Get tweets thunk.
 */

exports.tweets = function(user_id) {
  return function(fn) {
    client.get('statuses/user_timeline', { user_id: user_id, exclude_replies: true, count: 200 }, function(err, data, res) {
      if (err) fn(err, null);
      if (res.headers['x-rate-limit-remaining'] < 1) fn([{ code: 88, message: 'About to exceed rate limit' }], null);
      fn(null, { data: data, res: res });
    });
  };
};

/**
 * Unfollow someone thunk.
 */

exports.unfollow = function(user_id) {
  return function(fn) {
    client.post('friendships/destroy', { user_id: user_id }, function(err, data, res) {
      if (err) fn(err, null);
      if (res.headers['x-rate-limit-remaining'] < 1) fn([{ code: 88, message: 'About to exceed rate limit' }], null);
      fn(null, { data: data, res: res });
    });
  };
};

/**
 * Get people who i follow thunk.
 */

exports.friends = function(screen_name, cursor) {
  return function(fn) {
    client.get('friends/list', { screen_name: screen_name, cursor: cursor, count: 200, skip_status: true }, function(err, data, res) {
      if (err) fn(err, null);
      if (res.headers['x-rate-limit-remaining'] < 1) fn([{ code: 88, message: 'About to exceed rate limit' }], null);
      fn(null, { data: data, res: res });
    });
  };
};

/**
 * Mute someone.
 */

exports.mute = function(user_id) {
  return function(fn) {
    client.post('mutes/users/create', { user_id: user_id }, function(err, data, res) {
      if (err) fn(err, null);
      if (res.headers['x-rate-limit-remaining'] < 1) fn([{ code: 88, message: 'About to exceed rate limit' }], null);
      fn(null, { data: data, res: res });
    });
  };
};

/**
 * Get orig vs. RT ratio
 */

exports.originality = function(tweets) {
  var retweet_count = 0;
  for (var i = 0; i < tweets.length; i++) {
    if (tweets[i].retweeted_status) retweet_count++;
  }
  return Math.floor(100 * ((tweets.length - retweet_count) / tweets.length));
};

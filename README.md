# Finch.

> Natural selection of your Twitter newsfeed.

If you've got a Twitter bot (like [coopboost](https://github.com/lambtron/coopboost)) randomly following accounts without muting them, then chances are your newsfeed is cluttered with stuff you don't care about (don't worry—coopboost will mute accounts for you).

Finch will go through the unmuted accounts you're following, present you some basic info about that account, and allow you to mute, unfollow, or keep following.

The current iteration is super beta and is a command line script. Future iterations will have a tiny web server and a web interface. Even more future than that would be a deployed version that you can authenticate with your Twitter account.

## Setup

You will need [mongo](https://www.mongodb.com) and [node](https://nodejs.org/en/) (at least 4+).

- Clone this repo
- Create a [Twitter app here](https://apps.twitter.com)
- Add the necessary credentials to your own `./.env` file (use `./.env.example` as an example)
- Run `make build`

## Usage


Run `make run`. Here is an example of output:

```
Alec Berg (@realalecberg)
verified
bio: Writer/producer/director guy #siliconHBO #SiliconValleyHBO #seinfeld #curb #eurotrip #dictator Good John Houseman name.
location:
following/followers: 468/5258
original/retweets (out of 100): 22
recent tweets:

    RT @NellieBowles: Hi I'm in Brooklyn and to prove it yesterday I bought hot sauce made by a DJ
        Mon Jul 04 20:52:40 +0000 2016


    RT @mashable: 9 fascinating animal facts that are also 100% true https://t.co/QU27PSp2eY https://t.co/s8APgfGP2K
        Mon Jul 04 20:51:51 +0000 2016


    RT @DShaywitz: @realalecberg Idea is that the challenge of sharing data in healthcare is captured here: https://t.co/GloPdnxQZw https://t.c…
        Fri Jul 01 19:00:19 +0000 2016


    RT @tvinsider: #SiliconValley co-showrunner @realalecberg talks about last night's season finale https://t.co/I2nD2i2vLi
        Tue Jun 28 23:14:57 +0000 2016


    RT @trilbyberesford: Hey @Middleditch and @realalecberg, I wrote about the incredible female characters in @SiliconHBO: https://t.co/6G5Cdq…
        Tue Jun 28 23:12:09 +0000 2016

[n]ext/[m]ute/[u]nfollow/[q]uit: n
```

The prompt is `n` for next, `m` for mute, `u` for unfollow, or `q` for quit.

## License (MIT)

```
WWWWWW||WWWWWW
 W W W||W W W
      ||
    ( OO )__________
     /  |           \
    /o o|    MIT     \
    \___/||_||__||_|| *
         || ||  || ||
        _||_|| _||_||
       (__|__|(__|__|
```

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

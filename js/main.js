/*  Autumn Greeting Card -- js */

(function($){
	'use strict';

  // declare actors here
  var $backFallingLeaves = $('#brownLeaf, #orangeLeaf, #redLeaf'),
      $textLine1 = $('.text-line-1'),
      $textLine2 = $('.text-line-2'),
      $textGreeting = $('.text-greeting'),
      $treeLeaves = $('[id^=treeleaf]'),
      $floorLeaves = $('[id^=floorleaf]'),
      $bird = $('#Bird'),
      $birdHat = $bird.find('#BirdHat'),
      $birdEyes = $bird.find('#leftEye, #rightEye'),
      $nest = $('#NestAndLeaves'),
      $tree = $('#tree_trunk'),
      $cardContainer = $('.card.container'),
      $body = $('body')
  ;

  // clear stage 
  function clearStage() {
    var clearTl = new TimelineMax();

    clearTl
      .set($backFallingLeaves, {autoAlpha: 0})
      .set($textLine1, {autoAlpha: 0})
      .set($textLine2, {autoAlpha: 0})
      .set($textGreeting, {autoAlpha: 0})
      .set($treeLeaves, {autoAlpha: 0})
      .set($bird, {y: '+=65', autoAlpha: 0}) //position bird down so he can then pop up from the nest
      .set($nest, {autoAlpha: 0})
      .set($tree, {autoAlpha: 0})
      .set($floorLeaves, {y: '+=275', onComplete: showContainer})
    ;

    function showContainer() {
      $cardContainer.css('display', 'block');
    }

    return clearTl;
  }

  // enter floor vegetation
  function enterFloorVegetation() {
    var fleavesTl = new TimelineMax();

    fleavesTl
      .staggerTo($floorLeaves, 1, {y: 0, ease: Back.easeInOut}, 0.01) //Stagger function are for groups / arrays of objects. Last parameter is the stagger between each leaf animation
      .fromTo($tree, 1.1, {scaleY: 0.2, autoAlpha: 0, transformOrigin: 'center bottom'}, {scaleY: 1, autoAlpha: 1, transformOrigin: 'center bottom', ease: Back.easeInOut}) //transformOrigin resets origin svg transformation point. Paramters are horizontal and vertical axis by that order.
      .fromTo($tree, 0.9, {scaleX: 0.2, autoAlpha: 0, transformOrigin: 'center bottom'}, {scaleX: 1, autoAlpha: 1, transformOrigin: 'center bottom', ease: Back.easeInOut}, '-=0.9')
    ;

    return fleavesTl;
  }

  // enter tree
  function enterTreestuff() {
    var treeStruffTl = new TimelineMax();

    treeStruffTl
      .staggerFromTo($treeLeaves, 0.5, {scale: 0.2, autoAlpha: 0, transformOrigin: 'center bottom'}, {scale: 1, autoAlpha: 1, transformOrigin: 'center bottom'}, 0.02)
      .fromTo($nest, 1, {y: 0, scale: 0.2, autoAlpha: 0, transformOrigin: 'center center'}, {y: '-=15', scale: 1, autoAlpha: 1, transformOrigin: 'center center', ease: Elastic.easeOut}, '+=0.1')
      .to($nest, 0.3, {y: '+=15', ease: Bounce.easeOut}, '-=0.2') //overlap here used to give more life and a more natural look to the animation
      .add('nest-pop-in')
      .set($birdHat, {rotation: 12, x: '+=6'})
      .to($bird, 1.4, {y: '-=39', autoAlpha: 1, ease: Power4.easeInOut}, 'nest-pop-in+=0.1')
      .add('bird-peeking')
      .set($birdEyes, {autoAlpha: 0}) //Beneath the eyes there is a <rect> that represents the eyes when closed. To simulate blinking, we show and hide the <circle>'s that represent the open eyes
      .set($birdEyes, {autoAlpha: 1}, '+=0.2')
      .set($birdEyes, {autoAlpha: 0}, '+=0.3')
      .set($birdEyes, {autoAlpha: 1}, '+=0.2')
      .add('bird-blinks')
      .to($bird, 0.8, {y: '-=34', ease: Power4.easeInOut})
      .to($bird, 0.3, {y: '+=8', ease: Back.easeOut})
      .to($birdHat, 0.4, {y: '-=12'}, '-=0.6')
      .to($birdHat, 0.3, {y: 0, rotation: 0, x: 0, onComplete: startBlinking}, '-=0.2')
    ;

    function startBlinking() {
      var birdBlinkingTl = new TimelineMax({repeat: -1, repeatDelay: 5}); //repeat parameters indicates how many times animation should trigger. -1 means infinite.

      birdBlinkingTl
        .set($birdEyes, {autoAlpha: 0}) //Beneath the eyes there is a <rect> that represents the eyes when closed. To simulate blinking, we show and hide the <circle>'s that represent the open eyes
        .set($birdEyes, {autoAlpha: 1}, '+=0.2')
        .set($birdEyes, {autoAlpha: 0}, '+=1.2')
        .set($birdEyes, {autoAlpha: 1}, '+=0.2')
      ;
    }

    return treeStruffTl;
  }

  // enter the greeting text
  function enterGreeting() {
    var greetingTl = new TimelineMax();

    greetingTl
      .fromTo($textLine1, 1, {y: '-=50', autoAlpha: 0}, {y: '0', autoAlpha: 1, onComplete: startLoops})
      .fromTo($textLine2, 1, {y: '-=25', autoAlpha: 0}, {y: '0', autoAlpha: 1})
      .staggerFromTo($textGreeting, 0.5, {scale: 2, autoAlpha: 0, transformOrigin: 'center center'}, {scale: 1, autoAlpha: 1, transformOrigin: 'center center'}, 0.1)
    ;

    function startLoops() {
      // start background color loop
      var colors = ['#edcc93', '#f7e3ae', '#f3ebcc', '#edcc93'];
      var bgTl = new TimelineMax({repeat: -1, repeatDelay: 2});

      bgTl
        .to($body, 3, {backgroundColor: colors[0]})
        .to($body, 3, {backgroundColor: colors[1]}, '+=2')
        .to($body, 3, {backgroundColor: colors[2]}, '+=2')
        .to($body, 3, {backgroundColor: colors[3]}, '+=2')
      ;

      // start falling leaves loop
      TweenMax.set($backFallingLeaves, {y:-100, autoAlpha: 0.2});
      TweenMax.to('#brownLeaf', 10 + Math.random() * 10, {y: '+=1200', autoAlpha: 1, onComplete: repeatFall, onCompleteParams: ['#brownLeaf'], ease: Linear.easeNone});
      TweenMax.to('#redLeaf', 10 + Math.random() * 10, {y: '+=1200', autoAlpha: 1, onComplete: repeatFall, onCompleteParams: ['#redLeaf'], ease: Linear.easeNone});
      TweenMax.to('#orangeLeaf', 10 + Math.random() * 10, {y: '+=1200', autoAlpha: 1, onComplete: repeatFall, onCompleteParams: ['#orangeLeaf'], ease: Linear.easeNone});

      function repeatFall(leafId) {
        var range = Math.random() * 800,
            offset = 400,
            newXPosition = range - offset;

        TweenMax.set(leafId, {x: newXPosition, y: -100, autoAlpha: 0.2, rotation: Math.random() * 360});
        TweenMax.to(leafId, 10 + Math.random() * 10, {y: '+=1200', autoAlpha: 1, onComplete: repeatFall, onCompleteParams: [leafId], ease: Linear.easeNone});
      }
    }

    return greetingTl;
  }
	
	// the GO function ...to kick things all off
	function go() {
    console.log('go ...');

    var masterTl = new TimelineMax();

    masterTl
      .add(clearStage(), 'scene-clear-stage')
      .add(enterFloorVegetation(), 'scene-floor-vegetation')
      .add(enterTreestuff(), 'scene-enter-treestuff')
      .add(enterGreeting(), 'scene-greeting')
    ;
  }

  go();

})(jQuery);



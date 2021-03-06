
test(function() {
  assertAnimationStyles([
    {opacity: '0.25', left: '25px', offset: 0},
    {opacity: '0.75', left: '75px'},
  ], {
    0.5: {opacity: '0.5', left: '50px'},
  });
  assertAnimationStyles([
    {opacity: '0.25', left: '25px'},
    {opacity: '0.75', left: '75px', offset: 1},
  ], {
    0.5: {opacity: '0.5', left: '50px'},
  });
},
'element.animate() with 2 keyframes and 1 offset specified',
{
  help: 'http://dev.w3.org/fxtf/web-animations/#keyframe-animation-effects',
  assert: [
    'element.animate() should start an animation when two keyframes',
    'are provided with matching properties and one offset is specified.',
  ],
  author: 'Alan Cutter',
});

test(function() {
  assertAnimationStyles([
    {opacity: '0.25', left: '25px', offset: 0},
    {opacity: '0.75', left: '75px', offset: 1},
  ], {
    0.5: {opacity: '0.5', left: '50px'},
  });

  assert_throws('InvalidModificationError', function() {
    assertAnimationStyles([
      {opacity: '0.75', left: '75px', offset: 1},
      {opacity: '0.25', left: '25px', offset: 0},
    ], {
      0.5: {opacity: '0.5', left: '50px'},
    });
  });
},
'element.animate() with 2 keyframes and 2 offsets specified',
{
  help: 'http://dev.w3.org/fxtf/web-animations/#keyframe-animation-effects',
  assert: [
    'element.animate() should start an animation when two keyframes',
    'are provided with matching properties and both offsets specified.',
  ],
  author: 'Alan Cutter',
});

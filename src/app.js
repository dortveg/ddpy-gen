//////////////////////////////////
let timer;
let speed = 1.0;
//let difficulty = 'easy';
let duration = 30;
let count = 15;

// const tickSound = new Audio('src/sounds/count1.wav');
// const dingSound = new Audio('src/sounds/ding.wav');
// const switchSound = new Audio('src/sounds/voice/switch.wav');
let tickSound = new Audio();
tickSound.src = 'src/sounds/silence.mp3';

const ignition = {
  name: 'Ignition -> Touchdown',
  count: 20,
  bilateral: false,
  enabled: [true, 'ignition'],
  sound: 'src/sounds/voice/ignition.wav',
  image: './src/pics/ignition.jpg',
  variations: []
};
const diamondCutter = {
  name: 'Diamond Cutter',
  count: 12,
  bilateral: false,
  enabled: [true, 'diamondcutter'],
  sound: 'src/sounds/voice/diamondcutter.wav',
  image: './src/pics/diamondCutter.jpg',
  variations: []
};
const bar = {
  name: 'Bar Back -',
  count: 12,
  bilateral: false,
  enabled: [true, 'bar'],
  sound: 'src/sounds/voice/bentBar.wav',
  image: './src/pics/bar.jpg',
  variations: [
    [' Bent Leg', 'src/sounds/voice/bentBar.wav', './src/pics/bar.jpg'],
    [' Stiff Leg', 'src/sounds/voice/stiffBar.wav', './src/pics/bar.jpg']
  ]
};
const catcher = {
  name: 'Catcher -> Thunderbolt',
  count: 20,
  bilateral: false,
  enabled: [true, 'catcher'],
  sound: 'src/sounds/voice/catcher.wav',
  image: './src/pics/catcher.jpg',
  variations: []
};
const pushups = {
  name: 'Pushups -',
  count: 15,
  bilateral: false,
  enabled: [true, 'pushups'],
  sound: 'src/sounds/voice/pushups.wav',
  image: './src/pics/pushups.jpg',
  variations: [
    [' Slow Count', 'src/sounds/voice/slowPush.wav', './src/pics/pushups.jpg'],
    [' Regular', 'src/sounds/voice/pushups.wav', './src/pics/pushups.jpg']
  ]
};
const plank = {
  name: 'Plank',
  count: 12,
  bilateral: false,
  enabled: [true, 'plank'],
  sound: 'src/sounds/voice/plank.wav',
  image: './src/pics/plank.jpg',
  variations: []
};
const cobra = {
  name: 'Cobra -> Down Dog',
  count: 20,
  bilateral: false,
  enabled: [true, 'cobra'],
  sound: 'src/sounds/voice/cobra.wav',
  image: './src/pics/cobra.jpg',
  variations: []
};
const table = {
  name: 'Table -> Cat Arch/Lift',
  count: 20,
  bilateral: false,
  enabled: [true, 'table'],
  sound: 'src/sounds/voice/table.wav',
  image: './src/pics/table.jpg',
  variations: []
};
const brokenTable = {
  name: 'Broken Table -',
  count: 15,
  bilateral: true,
  enabled: [true, 'brokentable'],
  sound: 'src/sounds/voice/brokentable.wav',
  image: './src/pics/brokenTable.jpg',
  variations: [
    [' Crunches', 'src/sounds/voice/brokenCrunch.wav', './src/pics/brokenCrunches.jpg'],
    [' Hold', 'src/sounds/voice/brokentable.wav', './src/pics/brokenTable.jpg']
  ]
};
const lunge = {
  name: 'Lunge -',
  count: 15,
  bilateral: true,
  enabled: [true, 'lunge'],
  sound: 'src/sounds/voice/lunge.wav',
  image: './src/pics/lunge.jpg',
  variations: [
    [' Supported', 'src/sounds/voice/lunge.wav', './src/pics/lunge.jpg'],
    ['> Shuttle', 'src/sounds/voice/shuttle.wav', './src/pics/lunge.jpg']
  ]
};
const warrior = {
  name: 'Road Warrior',
  count: 15,
  bilateral: true,
  enabled: [true, 'warrior'],
  sound: 'src/sounds/voice/warrior.wav',
  image: './src/pics/warrior.jpg',
  variations: []
};
const dynamic = {
  name: 'Dynamic Resistance',
  count: 20,
  bilateral: false,
  enabled: [true, 'dynamic'],
  sound: 'src/sounds/voice/dynamic.wav',
  image: './src/pics/dynamic.jpg',
  variations: [
    [' Cables', 'src/sounds/voice/cables.wav', './src/pics/cables.jpg'],
    [' Curls', 'src/sounds/voice/curls.wav', './src/pics/curls.jpg'],
    [' Rows', 'src/sounds/voice/rows.wav', './src/pics/dynamic.jpg'],
    [' Slow-Count Punches', 'src/sounds/voice/punches.wav', './src/pics/punches.jpg'],
    [' Fast Punches', 'src/sounds/voice/punches.wav', './src/pics/punches.jpg']
  ]
};
const bridge = {
  name: 'Bridge/Cannon Ball',
  count: 20,
  bilateral: false,
  enabled: [true, 'bridge'],
  sound: 'src/sounds/voice/bridge.wav',
  image: './src/pics/bridge.jpg',
  variations: []
};
const abs = {
  name: 'D-Cutter Pinfall ->',
  count: 15,
  bilateral: false,
  enabled: [true, 'abs'],
  sound: 'src/sounds/voice/crunches.wav',
  image: './src/pics/abs.jpg',
  variations: [
    [' Scissor Kicks', 'src/sounds/voice/scissor.wav', './src/pics/scissor.jpg'],
    [' Bicycle', 'src/sounds/voice/bicycle.wav', './src/pics/bicycle.jpg'],
    [' Crunches', 'src/sounds/voice/crunches.wav', './src/pics/crunches.jpg']
  ]
};
const knees = {
  name: 'Knee Kicks',
  count: 15,
  bilateral: true,
  enabled: [true, 'knees'],
  sound: 'src/sounds/voice/knees.wav',
  image: './src/pics/knees.jpg',
  variations: []
};
const pinfall = {
  name: 'Pinfall',
  count: 15,
  bilateral: false,
  enabled: [true, 'pinfall'],
  sound: 'src/sounds/voice/pinfall.wav',
  image: './src/pics/pinfall.jpg',
  variations: []
};

let currentExercise = pinfall;

let dVoice = new Audio();
dVoice.autoplay = true;
dVoice.src = 'src/sounds/voice/pinfall.wav';

function getExercise() {
  let transitions;
  switch (currentExercise) {
    case ignition:
      transitions = [diamondCutter, bar, catcher, table, brokenTable, lunge, warrior, dynamic, knees];
      break;
    case diamondCutter:
      transitions = [ignition, bar, catcher, plank, table, brokenTable, lunge, warrior, dynamic, knees];
      break;
    case bar:
      transitions = [diamondCutter, catcher, pushups, plank, cobra, table, brokenTable, lunge, warrior];
      break;
    case catcher:
      transitions = [ignition, diamondCutter, bar, plank, table, brokenTable, lunge, warrior, knees];
      break;
    case pushups:
      transitions = [bar, plank, cobra, table, brokenTable, lunge, pinfall]; 
      break;
    case plank:
      transitions = [bar, pushups, cobra, table, brokenTable, lunge, pinfall]; 
      break;
    case cobra:
      transitions = [bar, pushups, plank, table, brokenTable, lunge];
      break;
    case table:
      transitions = [bar, catcher, plank, cobra, brokenTable, lunge, pinfall];
      break;
    case brokenTable:
      transitions = [bar, catcher, pushups, plank, table, lunge];
      break;
    case lunge:
      transitions = [ignition, bar, catcher, plank, table, warrior, dynamic];
      break;
    case warrior:
      transitions = [ignition, diamondCutter, catcher, bar, lunge, dynamic, knees];
      break;
    case dynamic:
      transitions = [ignition, diamondCutter, bar, catcher, table, brokenTable, warrior];
      break;
    case bridge:
      transitions = [table, abs]; 
      break;
    case abs:
      transitions = [cobra, table, bridge, pinfall];
      break;
    case knees:
      transitions = [ignition, diamondCutter, bar, catcher, table, brokenTable, dynamic, lunge];
      break;
    case pinfall:
      transitions = [cobra, table, bridge];
      break;
    default:
      console.log('ERROR');
  }
  currentExercise = transitions[Math.floor(Math.random() * transitions.length)];
}

let bilatState = false;
function tick() {
  if (count === 4) {
    tickSound.play();
    count--;
    document.querySelector('.count').innerHTML = `${count}`;
    document.querySelector('.image').classList.remove('pop');
    document.querySelector('.exercise').classList.remove('pop');
  } else if (count === 1) {
    if (bilatState === false) {
      getExercise();
      if (currentExercise.bilateral === true) {
        bilatState = true;
      }
      if (currentExercise.variations.length != 0) {
        let randomVariation = Math.floor(Math.random() * currentExercise.variations.length);
        document.querySelector('.exercise').innerHTML = currentExercise.name + currentExercise.variations[randomVariation][0];
        dVoice.src = currentExercise.variations[randomVariation][1];
        dVoice.play();
        document.querySelector('.image').src = currentExercise.variations[randomVariation][2];
      } else {
        document.querySelector('.exercise').innerHTML = currentExercise.name;
        dVoice.src = currentExercise.sound;
        dVoice.play();
        document.querySelector('.image').src = currentExercise.image;
      }
      count = Math.round(currentExercise.count * speed);
      document.querySelector('.exercise').classList.add('pop');
      document.querySelector('.image').classList.add('pop');
      document.querySelector('.count').innerHTML = count;
    } else {
      dVoice.src = 'src/sounds/voice/switch.wav';
      dVoice.play();
      bilatState = false;
      count = Math.round(currentExercise.count * speed);
      document.querySelector('.count').innerHTML = count;
    }
  } else {
    count--;
    document.querySelector('.count').innerHTML = `${count}`;
  }
}

let workoutTimer;
let sec = 0;
let min = 30;
let durationOption = 'thirty';
document.querySelector('.durations').addEventListener('click', function(event) {
  min = parseInt(document.querySelector(`#${event.target.id}`).innerHTML);
  document.querySelector(`#${durationOption}`).classList.remove('selected');
  document.querySelector(`#${event.target.id}`).classList.add('selected');
  durationOption = event.target.id;
  if (isNaN(min)) {
    document.querySelector('.timer').innerHTML = '\u221e';
  } else {
    document.querySelector('.timer').innerHTML = `${min}:00`;
  }
});

function clock() {
  if (min === 0 && sec === 0) {
    stopTimer();
    //dingSound.play();
    dVoice.src = 'src/sounds/ding.wav';
    dVoice.play();
  } else if (sec === 0) {
    sec = 59;
    min--;
  } else {
    sec--;
  }

  if (sec <= 9 && min <= 9) {
    document.querySelector('.timer').innerHTML = `0${min}:0${sec}`;
  } else if (sec >= 10 && min <= 9) {
    document.querySelector('.timer').innerHTML = `0${min}:${sec}`;
  } else if (sec <= 9 && min >= 10) {
    document.querySelector('.timer').innerHTML = `${min}:0${sec}`;
  } else {
    document.querySelector('.timer').innerHTML = `${min}:${sec}`;
  }
}

function startTimer() {
  document.querySelector('.count').innerHTML = '15';
  document.querySelector('.exercise').innerHTML = 'Pinfall';
  document.querySelector('.durations').classList.add('disabled');
  document.querySelector('.image').src = './src/pics/pinfall.jpg';
  if (durationOption != 'inf') {
    timer = setInterval(tick, 1000);
    workoutTimer = setInterval(clock, 1000);
  } else {
    timer = setInterval(tick, 1000);
  }
  tickSound.src = 'src/sounds/count1.wav';
}

let paused = false;
function pause() {
  if (paused) {
    if (durationOption != 'inf') {
      timer = setInterval(tick, 1000);
      workoutTimer = setInterval(clock, 1000);
    } else {
      timer = setInterval(tick, 1000);
    }
    paused = false;
  } else {
    clearInterval(timer);
    clearInterval(workoutTimer);
    paused = true;
  }
}

function stopTimer() {
  clearInterval(timer);
  count = 15;
  document.querySelector('.count').innerHTML = 'XX';
  document.querySelector('.exercise').innerHTML = '----';
  document.querySelector('.durations').classList.remove('disabled');
  document.querySelector('.image').src = './src/pics/diamondCutter.jpg';
  document.querySelector('.start').innerHTML = 'Start Workout';
  init = true;
  if (durationOption != 'inf') {
    clearInterval(workoutTimer);
    min = parseInt(document.querySelector(`#${durationOption}`).innerHTML);
    sec = 0;
    document.querySelector('.timer').innerHTML = `${min}:00`;
  } else {
    document.querySelector('.timer').innerHTML = '\u221e';
  }
}

let speedOption = 'reg';
document.querySelector('.speeds').addEventListener('click', function(event) {
  if (event.target.id === 'slow') {
    speed = 1.5;
  } else if (event.target.id === 'fast') {
    speed = 0.75;
  } else {
    speed = 1.0;
  }
  document.querySelector(`#${speedOption}`).classList.remove('selected');
  document.querySelector(`#${event.target.id}`).classList.add('selected');
  speedOption = event.target.id;
});

let init = true;
document.querySelector('.start').addEventListener('click', function() {
  if (init) {
    tickSound.play();
    startTimer();
    document.querySelector('.stop').disabled = false;
    document.querySelector('.stop').classList.remove('disabled');
    document.querySelector('.start').innerHTML = 'Pause Workout';
    init = false;
    dVoice.play();
  } else {
    if (!paused) {
      pause();
      document.querySelector('.start').innerHTML = 'Resume Workout';
    } else {
      pause();
      document.querySelector('.start').innerHTML = 'Pause Workout';
    }
  }
});

document.querySelector('.stop').addEventListener('click', function() {
  stopTimer();
  document.querySelector('.stop').disabled = true;
  document.querySelector('.stop').classList.add('disabled');
  document.querySelector('.start').disabled = false;
  document.querySelector('.start').classList.remove('disabled');
  if (document.querySelector('h1').classList.contains('warning')) {
    document.querySelector('h1').classList.remove('warning');
  };
});

// let difficultyOption = 'easy';
// document.querySelector('.difficulties').addEventListener('click', function(event) {
//   difficulty = parseInt(document.querySelector(`#${event.target.id}`).innerHTML);
//   document.querySelector(`#${difficultyOption}`).classList.remove('selected');
//   document.querySelector(`#${event.target.id}`).classList.add('selected');
//   difficultyOption = event.target.id;
// });

document.querySelector('#theme').addEventListener('click', function() {
  if (document.querySelector('#theme').checked) {
    document.querySelector('html').classList.add('dbg');
    document.querySelector('h2').classList.add('dfont');
    document.querySelector('.label').classList.add('dfont');
    document.querySelector('.timer').classList.add('dfont');
    document.querySelector('.start').classList.add('dbutton');
    document.querySelector('.stop').classList.add('dbutton');
    document.querySelector('.info').classList.add('dfont');
    document.querySelector('.copyright').classList.add('dfont');
  } else {
    document.querySelector('html').classList.remove('dbg');
    document.querySelector('h2').classList.remove('dfont');
    document.querySelector('.label').classList.remove('dfont');
    document.querySelector('.timer').classList.remove('dfont');
    document.querySelector('.start').classList.remove('dbutton');
    document.querySelector('.stop').classList.remove('dbutton');
    document.querySelector('.info').classList.remove('dfont');
    document.querySelector('.copyright').classList.remove('dfont');
  }
});

// let soundOption = 'soundon';
// document.querySelector('.alertS').addEventListener('click', function(event) {
//   if (event.target.id === 'soundon') {
//     sounds = true;
//   } else if (event.target.id ==='soundoff') {
//     sounds = false;
//   };
//   document.querySelector(`#${soundOption}`).classList.remove('selected');
//   document.querySelector(`#${event.target.id}`).classList.add('selected');
//   soundOption = event.target.id;
// });

const exercises = [ignition, diamondCutter, bar, catcher, pushups, plank, cobra, table, brokenTable, lunge, warrior, dynamic, bridge, abs, knees, pinfall];
for (let i = 0; i < document.querySelectorAll('.check').length; i++) {
  document.querySelectorAll('.check')[i].addEventListener("click", function(event) {
    const name = event.target.id;
    exercises.forEach(exercise => {
      if (exercise.enabled[1] === name) {
        exercise.enabled[0] = !exercise.enabled[0];
      }
    });
  });
}
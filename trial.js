var osc1 = new Tone.Oscillator();
var t = Tone.Time("4n");
var panner = new Tone.Panner().toMaster();
var osc2 = new Tone.Oscillator(400, "square").connect(panner.pan).start();

var synth = new Tone.MembraneSynth().toMaster();
synth.triggerAttackRelease("C2", "8n");

var bell = new Tone.MetalSynth({
			"harmonicity" : 44,
			"resonance" : 80,
			"modulationIndex" : 200,
			"envelope" : {
				"decay" : 1,
			},
			"volume" : -40
		}).toMaster();

var conga = new Tone.MembraneSynth({
			"volume" : -10,
			"pitchDecay" : 0.008,
			"octaves" : 8,
			"envelope" : {
				"attack" : 0.0006,
				"decay" : 1,
				"sustain" : 0
			}
		}).toMaster();

var kick = new Tone.MembraneSynth({
			"volume" : -5,
			"envelope" : {
				"sustain" : 0,
				"attack" : 0.02,
				"decay" : 0.8
			},
			"octaves" : 10
		}).toMaster();

var snare = new Tone.NoiseSynth({
			"volume" : -15,
			"envelope" : {
				"attack" : 0.001,
				"decay" : 0.2,
				"sustain" : 0
			},
			"filterEnvelope" : {
				"attack" : 0.001,
				"decay" : 0.1,
				"sustain" : 0
			}
		}).toMaster();

var piano = new Tone.PolySynth(4, Tone.Synth, {
			"volume" : -10,
			"oscillator" : {
				"partials" : [1, 2, 1],
			},
			"portamento" : 0.05
		}).toMaster()

var cChord = ["C4", "E4", "G4", "B4"];
var dChord = ["D4", "F4", "A4", "C5"];
var gChord = ["B3", "D4", "E4", "A4"];
var amChord = ["A3", "C4", "E4"];



var player1 = new Tone.Player("Bonjour.mp3").toMaster();
var player2 = new Tone.Player({"url": "Britishhello.mp3", "volume": -15}).toMaster();
var player3 = new Tone.Player("Brazilhey.mp3").toMaster();
var player4 = new Tone.Player("Germanhallo.mp3").toMaster();

function playerCallback(time){

	

	player1.start(time+6).stop(time+7).start(time+24).stop(time+26).start(time+34).stop(time+40); //THIRD
	player2.start(time + 10).stop(time+12).start(time+26).stop(time+28).start(time+34).stop(time+40); //FIFTH
	player3.start(time+16).stop(time+18).start(time+28).stop(time+30).start(time+34).stop(time+40);//SEVENTH
	player4.start(time+20).stop(time+22).start(time+30).stop(time+32).start(time+34).stop(time+40);

	player1.loop = true;
	player2.loop = true;
	player3.loop = true;
	player4.loop = true;

	var bellPart = new Tone.Sequence(function(time, freq){
			bell.frequency.setValueAtTime(freq, time, Math.random()*2 + 0.5);
			//bell.triggerAttack(time+12); //SIXTH
		}, [300, 1000, 200, 800, 200, 1000, 200, 600], "8n").start();

	var congaPart = new Tone.Sequence(function(time, pitch){
			conga.triggerAttack(pitch, time, Math.random()*2 + 0.5);
		}, ["G3", "C3", "D3", "D3","A4","E3","C4","D4"], "8n").start(time+8); //FOURTH

	var kickPart = new Tone.Loop(function(time){
			kick.triggerAttackRelease("C2", "8n", time);
		}, "2n").start(time+3); //SECOND

	var snarePart = new Tone.Loop(function(time){
			snare.triggerAttack(time);
		}, "2n").start(time); //FIRST

	var pianoPart = new Tone.Part(function(time, chord){
			piano.triggerAttackRelease(chord, "8n", time+13); //SIXTH
		}, 
		[["0:0:2", gChord], ["0:1", cChord], ["0:1:3", dChord], ["0:2:2", gChord], ["0:3", cChord], ["0:3:2", amChord],]).start("2m");
		pianoPart.loop = true;
		pianoPart.loopEnd = "2m";
		pianoPart.humanize = true;





}
	

Tone.Transport.schedule(playerCallback, 0)
//Tone.Transport.schedule(playerCallback, 1)
//Tone.Transport.schedule(playerCallback, 2)

Tone.Buffer.on('load', function(){
	var now = Tone.now()
  	Tone.Transport.start()//stop("+1.5").start("+4")
  	osc2.frequency.rampTo(1,10);
})

// var chord = new Tone.Event(function(time, chord){ 
// }, ["D4", "E4", "F4"]);
// chord.start(time+4);
// chord.loop = 8;
// chord.loopEnd = "1m";


//player.autostart = true;
//player.retrigger = true

// function playerCallback(time){
// 	player.start(time).stop(time + 0.1)
// }


// function oscCallback(time, freq){
//   osc.frequency.rampTo(freq, 0.5, time)
// 	osc.start(time).stop(time + 0.5)
// }

// var oscLoop = new Tone.Sequence(oscCallback, [[440, 880, 110], 770, [990, 440], 1111], 1).start(0)
// var playerLoop = new Tone.Sequence(playerCallback, [0, 0, 0, 0], 1).start(0.5)


// Tone.Buffer.on('load', function(){
//   Tone.Transport.start().stop("+10")
// })
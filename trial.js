//var osc = new Tone.Oscillator().toMaster()

var player = new Tone.Player("https://drive.google.com/drive/u/2/folders/0B0aYRiPpi77mX1B3cV9Od2dnRTA").toMaster();
	
	player.autostart = true;
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
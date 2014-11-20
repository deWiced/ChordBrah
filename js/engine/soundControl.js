

function addSound(assetsPath, file){
	var soundInstance;
	var src = assetsPath+ file;

	createjs.Sound.addEventListener("fileload", function(event){
		soundInstance = createjs.Sound.play(event.src, {interrupt:createjs.Sound.INTERRUPT_NONE, loop:-1, volume:1.0});
	});
	createjs.Sound.registerSound(src);
}

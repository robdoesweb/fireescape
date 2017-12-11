function windowFix() {
	var wh = window.innerHeight;
	$('html').css('height', wh);
	$('#squid').css('width', config.width);
	$('#squid').css('margin', 'auto');
	console.log('called windowfix');
}

windowFix();

$(document).resize(function(){
	windowFix();
});
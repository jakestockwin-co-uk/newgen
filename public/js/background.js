var images=['/images/bg1.JPG','/images/bg2.JPG','/images/bg3.JPG', '/images/bg4.JPG'];
var nextimage=0;
doSlideshow();

function doSlideshow(){
	if(nextimage>=images.length){nextimage=0;}
	$('#background')
		.fadeOut(500, function() {
			$('#background')
				.css('background-image', 'url("' + images[nextimage++] + '")')
				.fadeIn(1000, function () {
					setTimeout(doSlideshow, 5000);
				});
		});
}

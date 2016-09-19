var body = document.querySelector('body');
var hamburger = document.getElementById('menuToggle');
var sectionNavLinks = document.querySelectorAll('.section-nav li a');
var componentNav = document.querySelectorAll('.component-nav');

// Override default offset value for ZenScroll plugin.
zenscroll.setup(null, 100);

hamburger.addEventListener('click', function() {
	body.classList.toggle('nav-showing');
});

gumshoe.init({
  offset: 100, // Distance in pixels to offset calculations
});

function fixComponentNavigation() {
	if( componentNav.length === 0) {
		return;
	}

	var doc = document.documentElement;
	var top = (window.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0);	
	
	if (top > 50) {
		componentNav[0].classList.add('is-fixed')
	} else {
		componentNav[0].classList.remove('is-fixed')
	}
}

window.addEventListener('scroll', fixComponentNavigation);

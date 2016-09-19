var body = document.querySelector('body');
var hamburger = document.getElementById('menuToggle');
var sectionNavLinks = document.querySelectorAll('.section-nav li a');
var componentNav = document.querySelectorAll('.component-nav')[0];

// Override default offset value for ZenScroll plugin.
zenscroll.setup(null, 100);

hamburger.addEventListener('click', function() {
	body.classList.toggle('nav-showing');
});

function fixComponentNavigation() {
	var doc = document.documentElement;
	var top = (window.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0);	
	
	if (top > 50) {
		componentNav.classList.add('is-fixed')
	} else {
		componentNav.classList.remove('is-fixed')
	}
}

window.addEventListener('scroll', fixComponentNavigation);
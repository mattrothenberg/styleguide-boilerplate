var body = document.querySelector('body');
var hamburger = document.getElementById('menuToggle');
var sectionNavLinks = document.querySelectorAll('.section-nav li a');

hamburger.addEventListener('click', function() {
	body.classList.toggle('nav-showing');
});
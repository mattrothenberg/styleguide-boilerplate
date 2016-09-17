var body = document.querySelector('body');
var hamburger = document.getElementById('menuToggle');

hamburger.addEventListener('click', function() {
	body.classList.toggle('nav-showing');
})
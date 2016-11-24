$(document).ready(function() {
  current_release = "";
  $.get({
      url: 'https://api.github.com/repos/mattrothenberg/styleguide-boilerplate/releases/latest',
      success: function(data) {
         current_release = data.tag_name;
         if (current_release === "0.1") {
          $('#version-update').hide()
         }
         else {
          $('#version-update').show()
         }
      },
  });
});

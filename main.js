/*estilo video inicial del index*/
document.addEventListener("DOMContentLoaded", function() {
    var video = document.querySelector(".video");
    
    video.addEventListener("loadedmetadata", function() {
      video.currentTime = 3; 
      video.play(); 
    });
  
    video.addEventListener("ended", function() {
      video.currentTime = 3;
      video.play(); 
    });
  });
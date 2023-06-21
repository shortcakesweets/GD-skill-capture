var script = document.createElement('script');
script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.3.2/html2canvas.min.js';
document.head.appendChild(script);

html2canvas(document.querySelector("#contents > div.maincont > div:nth-child(4) > table")).then(function(canvas) {
  // Create a download link for the image
  var link = document.createElement('a');
  link.href = canvas.toDataURL('image/png');
  link.download = 'captured-image.png';

  // Trigger the download
  link.click();
});
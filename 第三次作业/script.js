//点击文字改变内容

var greetingElement = document.getElementById('greeting');

greetingElement.addEventListener('click', function() {
  greetingElement.innerHTML = 'Hello'; 
});

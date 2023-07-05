const articleDataElement = document.getElementById('article-data');

const article = JSON.parse(articleDataElement.getAttribute('data-article'));

// console.log(article.title);
// console.log(article.content);

const applaudButton = document.getElementById('applaudButton');
applaudButton.addEventListener('click', ()=>{
  fetch(`/api/articles/${article._id}/applaud`, { method: 'POST' })
    .then(response => response.json())
    .then(data => {
      const applauseCount = document.querySelector('#applauseCount');
          applauseCount.textContent = data.applauseCount;
    })
    .catch(error => console.error(error));
});
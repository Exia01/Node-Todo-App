'use strict';
document.addEventListener('DOMContentLoaded', function() {
  let errorTag = document.getElementById('errors');
  let renderTag = document.querySelector('#render');
  let submitForm = document.querySelector('#main');
  errorTag.style.display = 'none';
  errorTag.classList = 'hidden';

  //Todo INDEX
  let todo_index = (async () => {
    const response = await axios({
      url: '/api/todos',
      method: 'get'
    });
    return response;
  })();

  todo_index.then(result => {
      let todos = result.data;
      //could implement maps and document fragment
      todos.forEach(e => {
        let tempTag = createLi(e)
        renderTag.appendChild(tempTag);
      });
      addToggleListeners();
    }).catch(err => {
      console.log(err); // console.log(err.response)
      if (err.response) {
        // console.log(err.response.data);
      }
      let message = err.response.data;
      function* generate(message) {
        yield message;
      }
      for (let key of generate(message)) {
        let newTag = document.createElement("h5")
        newTag.setAttribute("class", "text-center")
        newTag.appendChild(document.createTextNode(`${
          key.error.item.message
          }`))
        errorTag.appendChild(newTag)
      }
      errorTag.style.display = 'block';
      fadeIn(errorTag);
    });

  // Todo NEW
  submitForm.addEventListener('submit', function (e) {
    errorTag.classList = "hidden"
    let submitFormData = new FormData(this);
    let obj = {};
    //creating json obj from form
    submitFormData.forEach((value, key) => {
      obj[key] = value;
    });
    let data = JSON.stringify(obj);
    e.stopPropagation();
    e.preventDefault();
    const config = {
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json'
      },
      data: {}
    };
    (async () => {
      let output = document.getElementById('errors');
      try {
        const response = await axios.post('/api/todos', data, config);
        errorTag.style.display = 'none';
        let tempTag = createLi(response.data)
        renderTag.appendChild(tempTag);
        submitForm.reset()
      } catch (err) {
        if (err.response) {
          console.log(err.response.data);
        }
        let message = err.response.data;
        function* generate(message) {
          yield message;
        }
        for (let key of generate(message)) {
          let newTag = document.createElement("h5")
          newTag.setAttribute("class", "text-center")
          newTag.appendChild(document.createTextNode(`${
            key.error.item.message
            }`))
          errorTag.appendChild(newTag)
        }
        fadeInOrOut(errorTag)
        errorTag.style.display = 'block';
      }
    })();
  });

  // // Clear errors when typing
  // submitForm.addEventListener('click', event => {
  //   setTimeout(() => {
  //     errorTag.classList = "hidden"
  //   }, 3000);
  //   // errorTag.removeChild(errorTag.getElementsByTagName('h5'));
  // });

  //Compleete item click toggle
  function addToggleListeners() {
    let lis = document.querySelectorAll('li');
    for (let tag of lis) {
      tag.addEventListener('click', function() {
        this.classList.toggle('completed');
      });
    }
  }


//Create Li Tag 
  function createLi(obj) {
    let liTag = document.createElement('li');
    let spanTag = document.createElement('span');
    let iTag = document.createElement('i');
    iTag.setAttribute('class', `fas fa-trash`);
    liTag.setAttribute('id', `${obj._id}`);
    spanTag.appendChild(iTag);
    liTag.appendChild(spanTag);
    liTag.appendChild(document.createTextNode(`${obj.item}`));
    return liTag
}
 function fadeInOrOut(el) {
   el.classList === 'hidden' ? (el.classList.toggle("visible")) : (el.classList.toggle("hidden")) ; 
  }
 function toggleError(el) {
   el.classList === 'hidden' ? (el.classList.toggle("visible")) : (el.classList.toggle("hidden")) ; 
  }
});

//How to format form obj to json
//https://stackoverflow.com/questions/41431322/how-to-convert-formdatahtml5-object-to-json

// I used this to figure out the this and e.id
/* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors/is_not_iterable
 *https://stackoverflow.com/questions/957537/how-can-i-display-a-javascript-object */

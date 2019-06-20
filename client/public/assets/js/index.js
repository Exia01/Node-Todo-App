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
      let errToRemove = document.querySelector("h5") // removes the error tag
      try {
        const response = await axios.post('/api/todos', data, config);
        errorTag.style.display = 'none';
        let tempTag = createLi(response.data)
        renderTag.appendChild(tempTag);
        errorTag.removeChild(errToRemove)
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

  
  
  //Create Li Tag 
  function createLi(obj) {
    let liTag = document.createElement('li');
    liTag.setAttribute("class", "incomplete")
    let spanTag = document.createElement('span');
    let iTag = document.createElement('i');
    iTag.addEventListener("click", removeLi)
    liTag.addEventListener("click", toggleListener)
    iTag.setAttribute('class', `fas fa-trash`);
    liTag.setAttribute('id', `${obj._id}`);
    spanTag.appendChild(iTag);
    liTag.appendChild(spanTag);
    liTag.appendChild(document.createTextNode(`${obj.item}`));
    return liTag
  }
  //Compleete item click toggle
  function toggleListener() {
    if (this.classList == "incomplete") {
      console.log("True")
    }
    console.log(this)
    this.classList === 'incomplete' ? (this.classList= "complete"): (this.classList= "incomplete") ; 
  }
  //Remove Li Tag 
  function removeLi() {
    // console.log(this.parentNode.parentNode)
  }
 function fadeInOrOut(el) {
   el.classList === 'hidden' ? (el.classList.toggle("visible")) : (el.classList.toggle("hidden")) ; 
  }

  //not implemented yet
 function toggleError(el) {
   el.classList === 'hidden' ? (el.classList.toggle("visible")) : (el.classList.toggle("hidden")) ; 
  }
});

//How to format form obj to json
//https://stackoverflow.com/questions/41431322/how-to-convert-formdatahtml5-object-to-json

// I used this to figure out the this and e.id
/* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors/is_not_iterable
 *https://stackoverflow.com/questions/957537/how-can-i-display-a-javascript-object */

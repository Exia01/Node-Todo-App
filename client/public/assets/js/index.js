'use strict';
document.addEventListener('DOMContentLoaded', function() {
  let errorTag = document.getElementById('errors');
  errorTag.style.display = 'none';

  //Todo INDEX
  let todo_index = (async () => {
    const response = await axios({
      url: '/api/todos',
      method: 'get'
    });
    return response;
  })();

  todo_index.then(result => {
    // console.log(result.data)
    let todos = result.data;
    let renderTag = document.querySelector('#render')
    todos.forEach(e => {
      let liTag = document.createElement("li")
      let spanTag = document.createElement("span")
      let iTag = document.createElement("i")
      iTag.setAttribute("class", `fas fa-trash`)
      liTag.setAttribute("id", `${e._id}`)
      spanTag.appendChild(iTag)
      liTag.appendChild(spanTag)
      liTag.appendChild(document.createTextNode( `${e.item}`))
      renderTag.appendChild(liTag)

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
          output.innerHTML=`<h5 class="text-center">${key.error.item.message}</h5`
          console.log(key)
    }
    fadeIn(errorTag)
    errorTag.style.display = 'block';
  });

  // Todo NEW
  let submitForm = document.querySelector('#main');
  let submitFormMethod = submitForm.method
  submitForm.addEventListener('submit', function (e) {
    let submitFormData = new FormData(this)
    let obj = {};
    //creating json obj from form
    submitFormData.forEach((value, key) => {obj[key] = value});
    let data = JSON.stringify(obj);
    e.stopPropagation();
    e.preventDefault();
    const config = {
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json'
      },
      data: {},
    };
    ; (async () => {
      let output = document.getElementById('errors');
      try {
        const response = await axios.post('/api/todos',data,config)
        console.log(response)
        fadeOut(errorTag)
        errorTag.style.display = 'none';
      } catch (err) {
        // console.log(err.response)
        if (err.response) {
          // console.log(err.response.data);
        }
        let message = err.response.data;
        function* generate(message) {
          yield message;
        }
        for (let key of generate(message)) {
          output.innerHTML=`<h5 class="text-center">${key.error.item.message}</h5`
          console.log(key)
        }
        errorTag.style.display = 'block';
        fadeIn(errorTag)
      }
    })()
  })




  //Fade in animation
  function fadeIn(el) {
    el.style.opacity = 0;
  
    var last = +new Date();
    var tick = function() {
      el.style.opacity = +el.style.opacity + (new Date() - last) / 1000;
      last = +new Date();
  
      if (+el.style.opacity < 1) {
        (window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 16);
      }
    };
  
    tick();
  }
  function fadeOut(el) {
    el.style.opacity = 1;
  
    var last = +new Date();
    var tick = function() {
      el.style.opacity = +el.style.opacity + (new Date() - last) / 1000;
      last = +new Date();
  
      if (+el.style.opacity > 0) {
        (window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 16);
      }
    };
  
    tick();
  }
  
})





//How to format form obj to json
//https://stackoverflow.com/questions/41431322/how-to-convert-formdatahtml5-object-to-json

// I used this to figure out the this and e.id
/* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors/is_not_iterable
 *https://stackoverflow.com/questions/957537/how-can-i-display-a-javascript-object */

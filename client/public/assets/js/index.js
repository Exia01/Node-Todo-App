'use strict';
document.addEventListener('DOMContentLoaded', function() {
  let errorTag = document.getElementById('errors');
  let renderTag = document.querySelector('#render');
  let submitForm = document.querySelector('#main');
  errorTag.style.display = 'none';

  //axios type config
  const config = {
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json'
    },
    data: {}
  };
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
      let message = err.response.data;
      function* generate(message) {
        yield message;
      }
      for (let key of generate(message)) {
        errorTag.appendChild(createErrorTag(key))
      }
      errorTag.style.display = 'block';
      fadeIn(errorTag);
    });

  // Todo NEW
  submitForm.addEventListener('submit', function (e) {
    e.stopPropagation();
    e.preventDefault();
    let submitFormData = new FormData(this);
    let obj = {};
    //creating json obj from form
    submitFormData.forEach((value, key) => {
      obj[key] = value;
    });
    let data = JSON.stringify(obj);
    (async () => {
      let errToRemove = document.querySelector("h5") // removes the error tag
      if (errToRemove) {
        errorTag.removeChild(errToRemove)
      }
      try {
        const response = await axios.post('/api/todos', data, config);
        errorTag.style.display = 'block';
        let tempTag = createLi(response.data)
        renderTag.appendChild(tempTag);
        submitForm.reset()
      } catch (err) {
        console.log(err)
        errorTag.style.display = 'block';
        if (err.response) {
          console.log(err.response.data);
        }
        let message = err.response.data;
        function* generate(message) {
          yield message;
        }
        for (let key of generate(message)) {
          let newTag = createErrorTag(key)
          errorTag.appendChild(newTag)
        }
      }
    })();
  });

  //TODO Destroy/Delete


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
    liTag.addEventListener("click", toggleListener)
    spanTag.addEventListener("click", removeLi)
    iTag.setAttribute('class', `fas fa-trash`);
    liTag.setAttribute('id', `${obj._id}`);
    spanTag.appendChild(iTag);
    liTag.appendChild(spanTag);
    liTag.appendChild(document.createTextNode(`${obj.item}`));
    return liTag
  }
  function createErrorTag(obj) {
    let newTag = document.createElement("h5")
    newTag.setAttribute("class", "text-center")
    newTag.classList.add('visible')
    newTag.appendChild(document.createTextNode(`${
      obj.error.item.message
      }`))
    return newTag
  }



/* Listeners */
  
  //Complete item click toggle
  function toggleListener() {
    this.classList == 'incomplete' ? (this.classList= "completed"): (this.classList= "incomplete") ; 
  }
  //Remove Li Tag 
  function removeLi() {
    console.log(this.parentNode.id)
     let _id = this.parentNode.id
    const deleteReq = async function() {
      let response = await axios.delete(`/api/todos/${_id}`, config)
      return response
    }
    deleteReq().then(data => {
      console.log(data)
    })
  }

  function fadeInOrOut(el) {
    if (el.classList.contains("hidden")) {
      el.classList.remove("hidden")
      el.classList.add("visible")
    } else {
      el.classList.remove("visible")
      el.classList.add("hidden")
    }
  }
});




//How to format form obj to json
//https://stackoverflow.com/questions/41431322/how-to-convert-formdatahtml5-object-to-json
// I used this to figure out the this and e.id
/* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors/is_not_iterable
 *https://stackoverflow.com/questions/957537/how-can-i-display-a-javascript-object */
//Axios delete: https://stackoverflow.com/questions/51069552/axios-delete-request-with-body-and-headers
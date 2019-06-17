/* When document ready */
$(document).ready(function() {
  $('#errors').hide();
  let todos;
  if (!todos) {
    $.ajax({
      type: 'get',
      url: '/api/todos',
      success: data => {
        todos = data;
        todos.forEach(e => {
          //short for element
          $('#render').append(
            `<li id="${e._id}"><span><i class="fas fa-trash"></i></span>
            ${e.item}
            </li>`
          );
        });
      },
      error: function(err) {
        let message = err.responseJSON;
        function* generate(message) {
          yield message;
        }
        for (let key of generate(message)) {
          $('#errors').html(`<h2>${key.error.item.message}</h2`);
          $('#errors').show();
        }
      }
    });
  }

  // /*  When clicking submit */
  $('form').on('submit', function(e) {
    e.preventDefault(e);
    /*     create a variable name item */
    let item = $("form input[type='text'");
    let todo = {
      item: item.val()
    };
    // console.log(todo)
    $.ajax({
      type: 'POST',
      url: '/api/todos',
      data: todo,
      success: function(data) {
        console.log(data);
        $('#render').append(
          `<li id="${data._id}"><span><i class="fas fa-trash"></i></span> ${
            data.item
          }</li>`
        );;
        $('form').trigger('reset');
        $('#errors').hide();
      },
      error: function(err) {
        console.log(err);
        let message = err.responseJSON;
        function* generate(message) {
          yield message;
          // console.log(message)
        }
        for (let key of generate(message)) {
          // console.log(key.error.item.message);
          $('#errors').hide().html(`<p class="text-center">${key.error.item.message}</p`).fadeIn(1000);
      
        }
      }
    });
  });

  //deletes the task
  $('#render').on('click', 'li span', function(e) {
    e.stopPropagation();
    e.preventDefault(e);
    // let _id = e.target.id;
    let _id = $(this).parent()[0].id;
    $.ajax({
      type: 'delete',
      url: `/api/todos/${_id}`,
      success: function (data) {
        console.log(data)
        console.log('Deleted');
      },
      error: function(err) {
        let message = err.responseJSON;
        function* generate(message) {
          yield message;
        }
        for (let key of generate(message)) {
          $('#errors').html(`<h2>${key.error.item.message}</h2`);
          $('#errors').show();
        }
      }
    });
    $(this)
      .parent()
      .fadeOut(500, function() {
        $(this).remove(); //different this, parent this
      });
  });
});
//complete task
$('#render').on('click', 'li', function(e) {
  //adding the listener to the ul that exists before loading
  $(this).toggleClass('completed');
});

//deletes error when typing
$("form input").keyup(function () {
  $('#errors').fadeOut(1000);remove();
});

// toggles the input
$('span .fa-pen-square').click(function() {
  $('form').fadeToggle(1000);
  $('#errors').fadeToggle(1000);

});

// I used this to figure out the this and e.id
/* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors/is_not_iterable
 *https://stackoverflow.com/questions/957537/how-can-i-display-a-javascript-object */

///https://stackoverflow.com/questions/21662836/send-form-data-using-ajax
//if wanting to make it draggable:https://codepen.io/retrofuturistic/pen/tlbHE
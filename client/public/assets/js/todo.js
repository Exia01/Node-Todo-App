/* When document ready */
$(document).ready(function() {
  // $('#errors').hide();
  // let todos;
  // if (!todos) {
  //   $.ajax({
  //     type: 'get',
  //     url: '/api/todos',
  //     success: data => {
  //       todos = data;
  //       todos.forEach(e => {
  //         //short for element
  //         $('#render').append(
  //           `<li id="${e._id}"><span>X</span> ${e.item}</li>`
  //         );
  //         /* console.log(`This is from the for loop: ${e.item}`) */
  //       });
  //     },
  //     error: function(err) {
  //       let message = err.responseJSON;
  //       function* generate(message) {
  //         yield message;
  //       }
  //       for (let key of generate(message)) {
  //         $('#errors').html(`<h2>${key.error.item.message}</h2`);
  //         $('#errors').show();
  //       }
  //     }
  //   });
  // }

  // /*  When clicking submit */
  $('form').on('submit', function(e) {
    let _id = 22;
    e.preventDefault(e);
    /*     create a variable name item */
    let item = $("form input[type='text'");

    let todo = {
      item: item.val()
    };
    // console.log(todo)
    //   /* We manipulate the data then
    //         Make ajax request to server goes to controller
    //       */
    //   $.ajax({
    //     type: 'POST',
    //     url: '/api/todos',
    //     data: todo,
    //     success: function(data) {
    //       $('#render').append(`<li id="${data._id}"> ${data.item}</li>`);
    //       $('form').trigger('reset');
    //       $('#errors').hide();
    //       /*
    //               console.log(data)
    //               console.log(JSON.stringify(data))
    //               console.log(`This is from the data: ${data}`)
    //               */
    //     },
    //     error: function(err) {
    //       let message = err.responseJSON;
    //       function* generate(message) {
    //         yield message;
    //         // console.log(message)
    //       }
    //       for (let key of generate(message)) {
    //         // console.log(key.error.item.message);
    //         $('#errors').html(`<h2>${key.error.item.message}</h2`);
    //         $('#errors').show();
    //       }
    //     }
    //   });
    console.log(todo);
    console.log(todo.item);
    $('#render').append(
      `<li class="${_id}"><span><i class="fas fa-trash"></i></span> ${
        todo.item
      }</li>`
    );
    $('form').trigger('reset');
  });

  //deletes the task
  $('#render').on('click', 'li span', function(e) {
    e.stopPropagation();
    e.preventDefault(e);
    let _id = e.target.id;
    /* I could not extract the id from "this"
        let x = $(this.length)
        let test1 = JSON.stringify(x);
        let test2 = ($(this).id())
        let test3 = $(this)
        console.log(`This is from test 1: ${test1}`)
        console.log(`This is from test 2: ${test2}`) */
    $(this)
      .parent()
      .fadeOut(500, function() {
        $(this).remove(); //different this, parent this
      });

    // $.ajax({
    //   type: 'delete',
    //   url: '/api/todos/' + _id,
    //   success: function(data) {
    //     console.log('Deleted');
    //   },
    //   error: function(err) {
    //     let message = err.responseJSON;
    //     function* generate(message) {
    //       yield message;
    //     }
    //     for (let key of generate(message)) {
    //       $('#errors').html(`<h2>${key.error.item.message}</h2`);
    //       $('#errors').show();
    //     }
    //   }
    // });
  });
});
//complete task
$('#render').on('click', 'li', function(e) {
  //adding the listener to the ul that exists before loading
  console.log($(this).css('color'));
  // $(this).css('color') === 'rgb(128, 128, 128)'
  $(this).toggleClass('completed');
});

// toggles the input

$("span .fa-pen-square").click(function () {
  $('form').fadeToggle(1000)

  })

// I used this to figure out the this and e.id
/* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors/is_not_iterable
 *https://stackoverflow.com/questions/957537/how-can-i-display-a-javascript-object */

///https://stackoverflow.com/questions/21662836/send-form-data-using-ajax

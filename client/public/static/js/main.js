/* When document ready */
$(document).ready(() => {
    $('#errors').hide()

    let todos;
    $.ajax({
        type: 'get',
        url: '/api/todos',
        success: (data) => {
            todos = data
            for (let tasks of todos) {
                /*console.log(`This is from the for loop: ${tasks.item}`)*/
                $('#render').append(`<li id="${tasks._id}"> ${tasks.item}</li>`);
            }
        },
        error: function (err) {
            let message = err.responseJSON
            function* generate(message) {
                yield message;
            } for (let key of generate(message)) {
                $('#errors').html(`<h2>${key.error.item.message}</h2`);
                $('#errors').show()
            }
        }

    })


    /*  When clicking submit */
    $('form').on('submit', (e) => {
        e.preventDefault(e)
        /*     create a variable name item */
        let item = $('form input')

        let todo = {
            item: item.val()
        };
        //console.log(todo)
        /* We manipulate the data then 
          Make ajax request to server goes to controller
        */
        $.ajax({
            type: 'POST',
            url: '/api/todos',
            data: todo,
            success: function (data) {
                $('#render').append(`<li id="${data._id}"> ${data.item}</li>`);
                $('form').trigger('reset');
                $('#errors').hide()

                /*
                console.log(data)
                console.log(JSON.stringify(data))
                console.log(`This is from the data: ${data}`)
                */

            },
            error: function (err) {
                let message = err.responseJSON
                function* generate(message) {
                    yield message;
                    //console.log(message)
                } for (let key of generate(message)) {
                    //console.log(key.error.item.message);
                    $('#errors').html(`<h2>${key.error.item.message}</h2`);
                    $('#errors').show()
                }

            }

        })

    });

    $(document).on('click', 'li', function (e) {
        e.preventDefault(e)
        //console.log(e.target.id)
        let _id = e.target.id
        /* I could not extract the id from "this"
        let x = $(this.length)
        let test1 = JSON.stringify(x);
        let test2 = ($(this).id())
        let test3 = $(this)
        console.log(`This is from test 1: ${test1}`)
        console.log(`This is from test 2: ${test2}`)*/
        $(this).remove()

        $.ajax({
            type: 'delete',
            url: '/api/todos/' + _id,
            success: function (data) {
                console.log('Deleted')
            },
            error: function (err) {
                let message = err.responseJSON
                function* generate(message) {
                    yield message;
                } for (let key of generate(message)) {
                    $('#errors').html(`<h2>${key.error.item.message}</h2`);
                    $('#errors').show()
                }
            }
        });

    });

});


// I used this to figure out the this and e.id
/*https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors/is_not_iterable
 *https://stackoverflow.com/questions/957537/how-can-i-display-a-javascript-object */
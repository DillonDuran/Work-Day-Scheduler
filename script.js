// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //

  const currentTime = dayjs().hour();

  function userStorage() {

    $('.saveBtn').on('click', function() {

      const key = $(this).parent().attr('id');

      const value = $(this).siblings('.description').val();

      localStorage.setItem(key, value);

    });
  }

  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //

  function currentColor() {
    $('.time-block').each(function() {
      const timeBlock = parseInt(this.id);

      $(this).toggleClass('past', timeBlock < currentTime);

      $(this).toggleClass('present', timeBlock === currentTime);

      $(this).toggleClass('future', timeBlock > currentTime);

    });
  }

  function changeColor() {
    $('.time-block').each(function() {
      const timeBlock = parseInt(this.id);

      if (timeBlock == currentTime) {

        $(this).removeClass('past future').addClass('present');

      } else if (timeBlock < currentTime) {

        $(this).removeClass('future present').addClass('past');
        
      } else {

        $(this).removeClass('past present').addClass('future');
      }
    });
  }

  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?

  $('.time-block').each(function() {

    const key = $(this).attr('id');

    const value = localStorage.getItem(key);

    $(this).children('.description').val(value);

  });


  //
  // TODO: Add code to display the current date in the header of the page.

  function updateDay() {

    const currentDate = dayjs().format('dddd, MMMM D, YYYY');

    const dateElement = $('#currentDay');

    dateElement.text(currentDate);

  }

  currentColor();
  userStorage();                
  changeColor();
  updateDay();
 

});

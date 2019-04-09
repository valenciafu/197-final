$(document).ready(function () {

  var data = [];
  var activeIdx = -1;

  // kick off getting the questions
  getQuestions();
  // now do it  every 2.5 seconds
  setInterval(getQuestions, 2500);

  function getQuestions() {
    $.ajax({
      url: '/api/getQuestions',
      type: 'GET',
      success: function(res) {
        data = res.questions;
        renderPreviews();
        renderActive();
      }
    })
  }

  // makes a list  of questions which all have the question text and a data-qid attribute
  // that allows you to access their _id by doing $whateverjQueryObjectYouHave.data('qid')
  function renderPreviews() {
    $('#questions').html(
        data.map((i) => '<li data-qid="' + i._id + '">' + i.author + '</li>').join('')
    )
  }

  function renderActive() {
    if (activeIdx > -1) {
      var active = data[activeIdx];
      $('#show-question').css('display', 'block');
      $('#question').text(active.questionText ? active.questionText: '');
      $('#author').text(active.author ? active.author: '');
      $('#answer-text').text(active.answer ? active.answer : '');
    } else {
      $('#show-question').css('display', 'none');
    }
  }

  $('#questions').on('click', 'li', function () {
    var _id = $(this).data('qid');
    data.forEach(function (q) {
      if (q._id === _id) {
        activeIdx = data.indexOf(q);
      } 
    })

    renderActive();
  })

  $('#show-question').on('click', '#seeStudent', function () {
    var _id = data[activeIdx]._id;
    console.log(_id);
    console.log('see student');
    $.ajax({
      url: '/api/seeStudent',
      data: { qid: data[activeIdx]._id },
      type: 'POST',
      success: function(res) {
        console.log(res);
      }
    })
  })

  $('#removeQueueItem').on('click', function () {
    console.log('trying to remove');
    var _id = data[activeIdx]._id;

    $.ajax({
      url: '/api/removeQueueItem',
      data: { qid: data[activeIdx]._id },
      type: 'POST',
      success: function(res) {
        console.log(res);
      }
    })
  })

  // when we want to make a new question, show the modal
  $('#new-question').on('click', function () {
    $('.modal').css('display', 'block');
  })


  $('#close-modal').on('click', function () {
    $('.modal').css('display', 'none');
  })


  $('#submit-question').on('click', function () {
    var qText = $('#question-text').val();

    $.ajax({
      url: '/api/addQuestion',
      data: { questionText: qText },
      type: 'POST',
      success: function(res) {
        console.log(res);
        $('.modal').css('display', 'none');
      }
    })
  })
})
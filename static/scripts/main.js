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
        currentUser = res.currentUser;
        renderPreviews();
        renderActive();
        renderQueueSize();
        refreshError();
      }
    })
  }

  // makes a list  of questions which all have the question text and a data-qid attribute
  // that allows you to access their _id by doing $whateverjQueryObjectYouHave.data('qid')

  function renderPreviews() {
    $('#questions').html(
      data.map((i) => '<li data-qid="' + i._id + '" data-seen="' + i.seen + checkOwnQ(i.author) + '">' + i.author + '</li>').join('')
    )
  }

  function checkOwnQ(author) {
    if (currentUser === author) {
      return '" data-own="true"'
    } else {
      return '" data-own="false"'
    }
    
  }

  function renderActive() {
    if (activeIdx > -1) {
      var active = data[activeIdx];
      $('#show-question').css('display', 'block');
      $('#questionText').text(active.questionText ? active.questionText: '');
      $('#author').text(active.author ? active.author: '');
    } else {
      $('#show-question').css('display', 'none');
    }
  }

  function renderQueueSize() {
    $('#queue-size').text('Queue size: ' + data.length);
  }

  function refreshError() {
    $('#error-msg').css('display', 'none');
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

  $('#seeStudent').on('click', function () {
    var _id = data[activeIdx]._id;
    $.ajax({
      url: '/api/seeStudent',
      data: { qid: data[activeIdx]._id },
      type: 'POST',
      success: function(res) {
        console.log(res);
      }
    })
  })


  $('#remove-queue-item').on('click', function () {
    $.ajax({
      url: '/api/removeQueueItem',
      data: { qid: data[activeIdx]._id, qAuthor: data[activeIdx].author },
      type: 'DELETE',
      success: function(res) {
        console.log(res);
        if (res.status === "Error") {
          $('#error-msg').css('display', 'block');
        }
      }
    })

    activeIdx = -1;
  })

  // show FAQ modal
  $('#faq-button').on('click', function () {
    $('.faqm').css('display', 'block');
  })

  // when we want to make a new question, show the modal
  $('#new-question').on('click', function () {
    $('.nqm').css('display', 'block');
  })

  // generic close modal button
  $('#close-modal').on('click', function () {
    $('.modal').css('display', 'none');
  })


  $('#submit-question').on('click', function () {
    var qText = $('#question-text').val();

    $.ajax({
      url: '/api/joinQueue',
      data: { questionText: qText },
      type: 'POST',
      success: function(res) {
        $('.modal').css('display', 'none');
      }
    })
  })
})
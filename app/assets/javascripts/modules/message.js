$(function(){
  function buildHTML(message){
    if ( message.image ) {
      let html =
      `<div class="main__message--box" data-message-id=${message.id}>
        <div class="main__message--name">
          ${message.user.name}
        </div>
        <div class="main__message--time">
          ${message.created_at}
        </div>
      </div>
      <div class="Message">
        <p class="Message__content">
          ${message.content}
        </p>
        <img class="Message__image" src="${message.image}">
      </div>`
      return html;
    } else {
      let html =
        `<div class="main__message--box" data-message-id=${message.id}>
          <div class="main__message--name">
            ${message.user_name}
          </div>
          <div class="main__message--time">
            ${message.created_at}
          </div>
        </div>
        <div class="Message">
          <p class="Message__content">
            ${message.content}
          </p>
        </div>`
      return html;
    };
  }

  $('.Form').on('submit', function(e){
    e.preventDefault();
    let formData = new FormData(this);
    let url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      let html = buildHTML(data);
      $('.main__message').animate({ scrollTop: $('.main__message')[0].scrollHeight});
      $('.main__message').append(html);
      $('form')[0].reset('message_content');
      $('input[name="commit"]').prop('disabled', false);
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
    });
  });
});
//when document is fully loaded
$(document).ready(function() {
  //start at page number 1
  page_number = 1;
  //remove link at bottom of page if Javascript is enabled
  $('.more-sprouts').remove();
  //scrolling event listener
  $(document).on('scroll', scroll_handler);
});
//keep track of page number
var page_number;
//event handler for when user scrolls
var scroll_handler = function (event) {
  var doc_height = $('body')[0].scrollHeight;
  var window_top_position = $('body')[0].scrollTop;
  var window_height = $(window).innerHeight();
  //if user scrolls to bottom of page, update page
  if (doc_height == window_top_position + window_height) {
    update_page();
  }
};
//function to update website with next page of tweets
function update_page(){
  //turn off scrolling event listener
  $(document).unbind( "scroll", scroll_handler );
  //send AJAX GET request to obtain the tweets for the next page
  page_number += 1;
  $.get("/tweets.json?page=" + page_number.toString(), function(tweets) {
    //for each tweet
    for (var i = 0; i < tweets.length; i++) {
      //construct tweet html to be appended
      var tweet = tweets[i];
      tweet_html =  "<li class='tweet'>"
      tweet_html += "<div class='body'>" + tweet["text"] + "</div>"
      tweet_html += "<div class='user'>" + tweet["username"] + "</div>"
      tweet_html += "</li>"
      //append tweet html to element with class tweet
      $(".tweets").append(tweet_html);
    }
  })
  //once AJAX request is completed, turn on scrolling event listener
    .done(function() {
      $(document).bind( "scroll", scroll_handler );
  });
};

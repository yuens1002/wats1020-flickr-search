// The following code is meant to provide example and guidance if you get stuck.
// Try not to just copy it. That won't help you learn. :)
//
// Flickr Public Feeds and $.getJSON()
//
// This example uses the $.getJSON() method. Feeds are
// useful for getting publicly available photos and related information, but
// they do not support nearly all of the features of the full API. With an API
// Key and using a more complex approach, you can write apps that allow nearly
// all of the functions Flickr offers.
//
// For the purposes of this assignment, this is a legitimate solution.
$(document).on('ready', function(){
  var searchImages = function(tags) {
    var flickrAPI = "http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";
    console.log(tags);
    $('#images').innerHTML = '<li class="search-throbber">Searching...</li>';
    $.getJSON( flickrAPI, {
      tags: tags,
      tagmode: "any",
      format: "json"
    }).done(function( data ) {
      $('#images').empty();
      $('h1.search-title').first()[0].innerHTML = "Search for: " + tags;
      $.each( data.items, function( i, item ) {
        var newListItem = $("<li>")
        var newImage = $("<img>").attr({
          'src': item.media.m,
          'alt': item.title
        }).appendTo(newListItem);
        var newButton = $("<button class='btn btn-sm btn-primary'>enlarge</button>").attr({
          'data-title': item.title,
          'data-toggle': "modal",
          'data-target': "#infoModal",
          'data-imgsrc': item.media.m,
          'type': "button"
        }).appendTo(newListItem);
        newListItem.appendTo( "#images" );
        if ( i === 15 ) {
          return false;
        }
      });
    });
  };

  $('button.search').on('click', function(event){
    event.preventDefault();
    var searchTextInput = $(event.target.parentElement).find('input[name="searchText"]')[0];
    console.log(searchTextInput);
    searchImages(searchTextInput.value);
  });

  $('#infoModal').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget); // Button that triggered the modal
    var title = button.data('title'); // Extract info from data-* attributes
    var imgSrc = button.data('imgsrc');

    // Update the modal's content. We'll use jQuery here.
    var modal = $(this);
    modal.find('.modal-title').text(title);
    var modalBody = modal.find('.modal-body');
    modalBody.empty();
    var modalImage = $("<img>").attr({
      'src': imgSrc,
      'alt': title
    }).appendTo(modalBody);
  });

});

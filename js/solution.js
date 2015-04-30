// The following code is meant to provide example and guidance if you get stuck.
// Try not to just copy it. That won't help you learn. :)


$(document).on('ready', function(){
  // Method using getJSON()
  var searchImages = function(tags) {
    var flickrAPI = "http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";
    console.log(tags);
    $('#images').innerHTML = '<span class="search-throbber">Searching...</span>';
    $.getJSON( flickrAPI, {
      tags: tags,
      tagmode: "any",
      format: "json"
    }).done(function( data ) {
      $.each( data.items, function( i, item ) {
        $( "<img>" ).attr( "src", item.media.m ).appendTo( "#images" );
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
});

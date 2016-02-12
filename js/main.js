// Asynchronous Flickr Search
//
// Flickr reveals a searchable JSON Feed you can access via jQuery's $.getJSON()
// method. Use this to allow users to search for a tag or comma-separated list
// of tags and view the images that are found.
//
// Allow users to click the images to see a larger version with more information.
$(document).on('ready', function() {
	
	/* var $grid = $('.grid').masonry({
	  itemSelector: '.grid-item',
	  percentPosition: true,
	  columnWidth: '.grid-sizer'
	});
	// layout Isotope after each image loads
	$grid.imagesLoaded().progress( function() {
	  $grid.masonry();
	}); */ 

	// processes/sends user search terms for a flickr api response 
	var searchImages = function(tags) {
			var flickrAPI = 'http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?';
			$.getJSON(flickrAPI, {
				// to test w/o user input (replace 'setattle w/ tags) //
				tags: tags,
				tagmode: 'any',
				format: 'json'
			})
			
			.done(function(data) {
				// try to just display the 1st image that it finds //
				/* $(data.items[0].('<img>').attr('src', data.items.media.m).appendTo('#images');  */
				//empties image area first
				$('#images').empty();
				$('<div class="grid-sizer col-xs-4 col-sm-3 col-md-2"></div>').appendTo('#images');
				$.each(data.items, function(i, item) {
					
					var outer = $('<div class="grid-item col-xs-4 col-sm-3 col-md-2">');
					var inner = $('<div class="grid-item-content">').appendTo(outer);
					$('<p>').addClass('text-capitalize').html(item.title).appendTo(inner);
					var image = $('<img>').attr('src', item.media.m).addClass('img-responsive');
					$('<a>').attr('href', item.link).html(image).appendTo(inner);
					$('<p>').text(item.date_taken).appendTo(inner);
					$('<p>').html(item.author).appendTo(inner);
					outer.appendTo('#images');
					if(i === 24) {
						return false;
					}
			
				});
				
				$('#images').imagesLoaded( function() {
					$('#images').masonry();
				});
			});
	};
	
	$('button.search').click(function() {
		// not sure why preventDefaualt is necessary
		event.preventDefault();
		// $("input[name=nameGoesHere]").val();
		var tags = $('input[name=searchText]').val();
		searchImages(tags);
	
	});
	
	
	/*
	
	<script>
(function() {
  var flickerAPI = "http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";
  $.getJSON( flickerAPI, {
    tags: "mount rainier",
    tagmode: "any",
    format: "json"
  })
    .done(function( data ) {
      $.each( data.items, function( i, item ) {
        $( "<img>" ).attr( "src", item.media.m ).appendTo( "#images" );
        if ( i === 3 ) {
          return false;
        }
      });
    });
})();
</script>
	
	*/
	
    // Place your code here, inside the document ready handler.

    // Create a function called `searchImages()`. This function will handle the
    // process of taking a user's search terms and sending them to Flickr for a
    // response.

    // Inside the `searchImages()` function, the following things should happen:

        // 1.   Accept a string value called `tags` as an argument. Example:
        //      `var searchPhotos = function(tags){`
        //
        // 2.   Define the location of the Flickr API like this:
        //      `var flickrAPI = "http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";`
        //
        // 3.   Construct a `$.getJSON()` call where you send a request object
        //      including the tags the user submitted, and a `done()` handler
        //      that displays and refreshes the content appropriately.
        //
        // 4.   Update the display to add the images to the list with the id
        //      `#images`.

    // Attach an event to the search button (`button.search`) to execute the
    // search when clicked.

        // When the Search button is clicked, the following should happen:
        //
        // 1.   Prevent the default event execution so the browser doesn't
        //      Example: `event.preventDefault();`
        //
        // 2.   Get the value of the 'input[name="searchText"]' and use that
        //      as the `tags` value you send to `searchImages()`.
        //
        // 3.   Execute the `searchImages()` function to fetch images for the
        //      user.

    // STRETCH GOAL: Add a "more info" popup using the technique shown on the
    // Bootstrap Modal documentation: http://getbootstrap.com/javascript/#modals-related-target



});


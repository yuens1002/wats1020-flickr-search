// Asynchronous Flickr Search
//
// Flickr reveals a searchable JSON Feed you can access via jQuery's $.getJSON()
// method. Use this to allow users to search for a tag or comma-separated list
// of tags and view the images that are found.
//
// Allow users to click the images to see a larger version with more information.
$(document).on('ready', function() {
	
	//format date to d.m.y from data.date_taken
	var formatDate = function(unformattedDate) {
		var formattedDate = new Date(unformattedDate);
		var d = formattedDate.getDate();
		var m =  formattedDate.getMonth();
		m += 1;  // JavaScript months are 0-11
		var y = formattedDate.getFullYear();
		return (m + "." + d + "." + y);
	};
	
	//slice out the extras from data.author
	var formatAuthor = function(string) {
    	var frist = string.search(/\(/);
    	var last = string.search(/\)/);
    	return string.slice(frist+1, last);
	}

	// processes/sends user search terms for a flickr api response 
	var searchImages = function(tags) {
			//appendTo text to keyword id in DOM
			
			var flickrAPI = 'http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?';
			$.getJSON(flickrAPI, {
				// to test w/o user input (replace 'setattle w/ tags) //
				tags: tags,
				tagmode: 'any',
				format: 'json'
			}).done(function(data) {
				//empties image area first
				$('#images').empty();
				$('<p class="lead">Showing Keyword Search | <strong id="keyword" class="text-capitalize"></strong>').appendTo('#images');
				$('#keyword').text(tags);
		 		// inserts this to create a newImages container each time masonry is called
				$('<div id="newImages">').appendTo('#images');
				$.each(data.items, function(i, item) {				
					var outer = $('<div class="grid-item col-xs-4 col-sm-3 col-md-2">');
					var inner = $('<div class="grid-item-content">').appendTo(outer);
					
					var image = $('<img>').attr('src', item.media.m).addClass('img-responsive');
					$('<a>').attr('href', item.link).html(image).appendTo(inner);
					$('<p class="grey small hidden-xs">').addClass('text-capitalize').html('<strong>' + item.title + '</strong>' + '<br>' + formatDate(item.date_taken) + '<br>' + formatAuthor(item.author)).appendTo(inner);
					outer.appendTo('#newImages').imagesLoaded().progress( function() {
				 		$('#newImages').masonry();
					});
					
					if(i === 17) {
						return false;
					}
					
				});

			});
	};
	
	$('button.search').click(function() {
		// not sure why preventDefaualt is necessary
		// event.preventDefault();
		// $("input[name=nameGoesHere]").val();
		var tags = $('input[name=searchText]').val();
		searchImages(tags);
	
	});
	
	//showing default search seattle when page loads
	var searchword = 'garryvelletri';
	searchImages(searchword);

});


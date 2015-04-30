# wats1020-flickr-search
An assignment to create an asynchronous search using Javascript and the Flickr API.

This assignment asks you to accept a query from the user and use that query to
search Flickr in order to show a grid of images that were returned. You are
provided with an `index.html` file that provides a minimal interface for your
work. The page also pulls in jQuery and Bootstrap for you, so those are at your
disposal.

Utilizing principles of progressive enhancement, you must activate the form so
you may capture the input from the user and send it along to Flickr by making
a call to the Flickr API. Upon successful response from the Flickr API, you will
then display a grid of the images that have been found. Using the effect or
tool of your choice, you will then provide some way for users to view larger
versions of the images.

## Basic Requirements

To successfully complete this assignment, you must fulfill the following requirements:

* Create an event handler that will accept user input through the provided form and turn that input into a request to the [Flickr API](https://www.flickr.com/services/api/).
* Display the images returned from the Flickr API as a grid on the page (or in a suitably appealing arrangement that matches your creative ambition).
* Allow users to click to view the image larger in a modal window.
* When users re-do the search, the

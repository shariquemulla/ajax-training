
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load streetview
    // var $location = $('#street').val() + ', ' + $('#city').val()
    // var src = 'https://maps.googleapis.com/maps/api/streetview?size=600x300&location='+ $location;
    // console.log(src)
    // $body.append('<img class="bgimg" src="' + src +'">');

    // YOUR CODE GOES HERE!

    var wikiTimeout = setTimeout(function(){
      $('#wikipedia-header').text('Failed to load Wikipedia resources!')
    }, 5000)

    $.ajax({
      url: 'http://en.wikipedia.org/w/api.php',
      data: { action: 'query', list: 'search', srsearch: $('#city').val(), format: 'json' },
      dataType: 'jsonp',
      success: function (response){
        var items = [];
        $.each( response.query.search, function( key, val ) {
          $wikiElem.append( "<li class='article'>" +
            "<a href='http://en.wikipedia.org/wiki/"+val.title+"'>" + val.title + "</a>"+
            "</li>" );
        });  
        clearTimeout(wikiTimeout)
      }
    });


    var nytApi = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?q='+$('#city').val()+'&api-key=XXXXXXXXXXXXXXXXXXXXXXXXXXXX'
    $.getJSON(nytApi, function(data) {
        var items = [];
        $.each( data.response.docs, function( key, val ) {
          items.push( "<li class='article'>" +
            "<a href='"+val.web_url+"'>" + val.headline.main + "</a>"+
            "<p>"+val.snippet+"</p>"+
            "</li>" );
        });
       
        $( "<ul/>", {
          "id": "nytimes-articles",
          "class": "article-list",
          html: items.join( "" )
        }).appendTo( "body" );
      }).error(function() {
        $nytHeaderElem.text("NYT Articles Not Found!")
      });
    return false;
};

$('#form-container').submit(loadData);

// loadData();

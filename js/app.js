/*
  Please add all Javascript code to this file.
*/
var mashableURL = 'https://accesscontrolalloworiginall.herokuapp.com/http://mashable.com/stories.json';
var diggURL = 'https://accesscontrolalloworiginall.herokuapp.com/http://digg.com/api/news/popular.json';
var redditURL = 'https://accesscontrolalloworiginall.herokuapp.com/https://www.reddit.com/top.json';

$(function() {
    $('li.feed-type').on('click',function(){
    //set a function to capture the feedname and input it into the li span called "source-name"
    var content = $(this).text();
    $('#source-name').html(content);
    });

    $('#search').on('click',function(){
        //when the search button is clicked, perform the ajax call to populate with data
        $.ajax({
            method:"GET",
            //HELP if test here to see if we can get the value selected from the dropdown and then switch out the URL variable
            url: mashableURL,
        }).done(function(data){
            // HELP if statement for the various functions here
            getFeedControllerMashable(data);
            //once data is collected, call the getFeedController function which will populate the data.
        })
    });

    //Mashable Template Function
    function getFeedControllerMashable(data){
        var theScriptHTML = $("#articleListTemplate")[0].innerHTML;
        var theTemplate = Handlebars.compile(theScriptHTML);
        var contextObj = theTemplate(data.new);
        $("#main").append(contextObj);
    }
    
    //Digg Template Function
    function getFeedControllerDigg(data){
        var theScriptHTML = $("#articleListTemplateDigg")[0].innerHTML;
        var theTemplate = Handlebars.compile(theScriptHTML);
        var contextObj = theTemplate(data.feed);
        $("#main").append(contextObj);
    }

    //Reddit Template Function
    function getFeedControllerReddit(data){
        var theScriptHTML = $("#articleListTemplateReddit")[0].innerHTML;
        var theTemplate = Handlebars.compile(theScriptHTML);
        var contextObj = theTemplate(data.children);
        $("#main").append(contextObj);
    }

});
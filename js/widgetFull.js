// The external widget file created by Edward Bowyer
var legitWidget = function(global) {
    
        // Need to add localLive varaible to load local stylesheet if working without data connection
        // Load Jquery if not already loaded
        if(!window.jQuery)
        {
           var script = document.createElement('script');
           script.type = "text/javascript";
           script.src = "http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js";
           document.getElementsByTagName('head')[0].appendChild(script);
        }


        var widgetExpanded = false;
        var infoPopupVisible = false;
        var isLegit;


        var configuration = {    
         CSS:{
         classes:{
         infoHolderClass: 'infoHolder',
         chevron: 'chevron fat',
         chevronRoate: 'rotate',
         infoArrow: 'arrow-downInfo',
         infoPopup : 'infoPopupContainer',
         infoPopupArrow: 'infoPopupArrow',
         arrowUp: 'arrow-up',
         arrowUpBorder: 'arrow-upBackgroundBorder',
         arrowUpBorderHolder: 'infoPopupArrowBackgroundBorder',
         upSelected: 'upVoteSelected',
         downSelected: 'downVoteSelected',
         reviewFormHolder: 'reviewFormHolder',
         rateItSpanClass: 'rateit'
         },
         ids:{
           widgetId:'legitWidget',
           upVoteId: 'upVote',
           upVoteTriangleId: 'arrow-up',
           downVoteId: 'downVote',
           downVoteTriangleId: 'arrow-down',
           politicsHolderId: 'politicalInfo',
           politicsInfoArrow: 'politicalInfoArrow',
           economicsHolderId: 'economicalInfo',
           economicsInfoArrow: 'economicsInfoArrow',
           otherHolderId: 'otherInfo',
           otherInfoArrow: 'otherInfoArrow',
           infoDivId: 'infoCircle',
            infoPopupId: 'infoPopup',
           expandWidgetId: 'expandWidget',
           additonalInfoDivid: 'additionalInfoHolder',
           chevronId: 'chevron',
           inputURLId: 'inputURL',
           submitButtonId: 'submitBtn',
           objectivetyScore:'objectivityStarScore',
            accuracyScore:'accuracyStarScore',
           enjoyabilityScore:'enjoyabilityStarScore'
        } 
        },
            timeout:2000,
            stylesheetURL: 'css/styleFull.css',
            rateItStylesheet: 'css/rateit.css',
            rateItJs: 'js/jquery.rateit.js',
            jqueryJs: 'js/jqueryMin.js'
            
        };
    
    
        //Gets the first widget, could loop through to handle multipl widgets on page 
        var container = Widget.settings[0]["container"];
    
        // Create link element and add stylesheet
        stylesheet = document.createElement("link");
        stylesheet.rel = "stylesheet";
        stylesheet.type = "text/css";
        stylesheet.href = configuration.stylesheetURL;
        stylesheet.media = "all";
        document.lastChild.firstChild.appendChild(stylesheet);
        
        // Create link element and add stylesheet
        stylesheet = document.createElement("link");
        stylesheet.rel = "stylesheet";
        stylesheet.type = "text/css";
        stylesheet.href = configuration.rateItStylesheet;
        stylesheet.media = "all";
        document.lastChild.firstChild.appendChild(stylesheet);

        
        // If loading external jquery failes
        if(!window.jQuery)
        {
            // Create script element and add jquery
            script = document.createElement("script");
            script.type = "text/javascript";
            script.src = configuration.jqueryJs;
            script.media = "all";
             document.lastChild.firstChild.appendChild(script);
        }
    
    // Create script element and add rateit Js
        script = document.createElement("script");
        script.type = "text/javascript";
        script.src = configuration.rateItJs;
        script.media = "all";
        document.lastChild.firstChild.appendChild(script);

        // Creating widget holder DIV
        var widgetDiv = createDiv(configuration.CSS.ids.widgetId);
        widgetDiv.style.display = "none";

        // Creating up vote div and css triangle
        var upVoteDiv = createDiv(configuration.CSS.ids.upVoteId,'');      
        var upVoteTriangle = createDiv(configuration.CSS.ids.upVoteTriangleId);

        //Appending the CSS traingle to the div
        upVoteDiv.appendChild(upVoteTriangle);

        // Creating down vote div and  css triangle
        var downVoteDiv = createDiv(configuration.CSS.ids.downVoteId,'');
        var downVoteTriangle = createDiv(configuration.CSS.ids.downVoteTriangleId);

        //Appending the CSS traingle to the div
        downVoteDiv.appendChild(downVoteTriangle);
        
        //Creating div to hold additional info for expanding widget
        var additionalInfoDiv = createDiv(configuration.CSS.ids.additonalInfoDivid);         
     
        //Create Review div
        var reviewDiv = createReviewElements(configuration.CSS.classes.reviewFormHolder, configuration.CSS.ids.objectivetyScore, configuration.CSS.ids.enjoyabilityScore, configuration.CSS.ids.accuracyScore, configuration.CSS.classes.rateItSpanClass , configuration.CSS.ids.submitButtonId);
        additionalInfoDiv.appendChild(reviewDiv);
     
        // Creating info holder div
        var infoDiv = createDiv(configuration.CSS.ids.infoDivId,'','<strong>i</strong>');
  
        //Appednding info div to holder div
        additionalInfoDiv.appendChild(infoDiv);
    
        // Create popup for info
        var infoHolderDiv = createPopup('info',configuration.CSS.ids.infoPopupId,
        configuration.CSS.classes.infoPopup,
        configuration.CSS.classes.infoPopupArrow,
        configuration.CSS.classes.arrowUp,
        configuration.CSS.classes.arrowUpBorderHolder,
        configuration.CSS.classes.arrowUpBorder);
        
        
        
        var expandWidgetDiv = createDiv(configuration.CSS.ids.expandWidgetId);
        var chevron = createDiv(configuration.CSS.ids.chevronId,configuration.CSS.classes.chevron);
        expandWidgetDiv.appendChild(chevron);
        
     
        // Adding to DOM
        container.appendChild(widgetDiv);

        var widget = document.getElementById(configuration.CSS.ids.widgetId);

        // Setting HTML for the widget and making it visible by setting display block
        widget.innerHTML = '<strong class="infoHolder" style="padding:5px;">Legit?</strong>';
        widget.style.display = 'inline-block'; 
        widget.appendChild(upVoteDiv);
        widget.appendChild(downVoteDiv);
//        widget.appendChild(reviewDiv);
        widget.appendChild(additionalInfoDiv);
        widget.appendChild(expandWidgetDiv);
        widget.appendChild(infoHolderDiv);
        
         //CLICK EVENT
        
        upVoteDiv.onclick = function(){
            
            var URL =  window.location.href;
                        
            $('#' + configuration.CSS.ids.additonalInfoDivid).fadeIn("slow").css("display","inline-block");
                 $('#' + configuration.CSS.ids.expandWidgetId).css("top","-2px");
                 $('#' + configuration.CSS.ids.chevronId).addClass(configuration.CSS.classes.chevronRoate);
                 widgetExpanded = true;
        
                if(downVoteDiv.className === configuration.CSS.classes.downSelected)
                {
                    downVoteDiv.className = '';
                    upVoteDiv.className = configuration.CSS.classes.upSelected;
                }
                else
                {
                   upVoteDiv.className = configuration.CSS.classes.upSelected; 
                }
                  
            isLegit = true;
        };
        
        // Setting down vote selection by adding class an setting isLegit value
        downVoteDiv.onclick = function(){
            
            var URL =  window.location.href;
                        
                 $('#' + configuration.CSS.ids.additonalInfoDivid).fadeIn("slow").css("display","inline-block");
                 $('#' + configuration.CSS.ids.expandWidgetId).css("top","-2px");
                 $('#' + configuration.CSS.ids.chevronId).addClass(configuration.CSS.classes.chevronRoate);
                 widgetExpanded = true;
 
                if(upVoteDiv.className === configuration.CSS.classes.upSelected)
                {
                    upVoteDiv.className = '';
                    downVoteDiv.className = configuration.CSS.classes.downSelected;
                }
                else
                {
                   downVoteDiv.className = configuration.CSS.classes.downSelected;
                   
                   
                }

                isLegit = false;
        };
        
        //Getting and then setting click function for submit button
        var submitButton = document.getElementById(configuration.CSS.ids.submitButtonId);
        
        submitButton.onclick = function(){
            
            // NEED TO DO REVIEW POSTING HERE
                       
            var articleURL =  window.location.href;
            var legit = null;
            
            var objectiveScore = document.getElementById(configuration.CSS.ids.objectivetyScore);
             var accuracyScore = document.getElementById(configuration.CSS.ids.accuracyScore);
              var enjoyableScore = document.getElementById(configuration.CSS.ids.enjoyabilityScore);
             
            var isObjective = objectiveScore.lastChild.getAttribute('aria-valuenow');
            var isAccurate = accuracyScore.lastChild.getAttribute('aria-valuenow');
            var isEnjoyable = enjoyableScore.lastChild.getAttribute('aria-valuenow');
            
            if(isLegit == false)
            {
               legit = 0;     
               castVote(articleURL, true);
            }
            
            if(isLegit == true)
            {
                legit = 1;
                 castVote(articleURL, true);
            }
            
            
            addReview(articleURL, legit, isObjective, isAccurate, isEnjoyable );
            

        };
       
       
       
      infoDiv.onclick = function(){
                                   
            if(infoPopupVisible)
            {
                $('#' + configuration.CSS.ids.infoPopupId).fadeOut();
                infoPopupVisible = false;             
            }
            else
            {
                closeAllPopups();
                $('#' + configuration.CSS.ids.infoPopupId).fadeIn().css("display","block");
                infoPopupVisible = true;             
            }
        };
        
        
         expandWidgetDiv.onclick = function(){
           
             if(widgetExpanded)
             {
                 closeAllPopups();
                 
                 $('#' + configuration.CSS.ids.additonalInfoDivid).fadeIn("slow").css("display","none");
                 $('#' + configuration.CSS.ids.expandWidgetId).css("top","-1px");
                 $('#' + configuration.CSS.ids.chevronId).removeClass(configuration.CSS.classes.chevronRoate);
                 widgetExpanded = false;
             }
             else
             {

                 $('#' + configuration.CSS.ids.additonalInfoDivid).fadeIn("slow").css("display","inline-block");
                 $('#' + configuration.CSS.ids.expandWidgetId).css("top","-2px");
                 $('#' + configuration.CSS.ids.chevronId).addClass(configuration.CSS.classes.chevronRoate);
                 widgetExpanded = true;
             }
         };
 
  
  // HELPER FUNCTIONS WHICH NEED TO BE IN MAIN FUNCTION
  
  // Hides all popups if they're open
    
    function closeAllPopups()
    {
        if(infoPopupVisible)
        {
            $('#' + configuration.CSS.ids.infoPopupId).fadeOut();
            infoPopupVisible = false; 
        }        
    }
   
    return{
      config:configuration
     };
    
    }(this);
    
    // HELPER FUNCTIONS
    
    // create div with supplied settings ID and/or classname and
    function createDiv(id,className,innerHTML)
    {
        var div = document.createElement('div');
        
        if(id)
        {
            div.id = id;  
        }
        
        if(className)
        {
            div.className = className;
        }
        
        if(innerHTML)
        {
            div.innerHTML = innerHTML;
        }
        
        return div; 
    }
    
    // Creates the URL submission form in the DOM
    function createReviewElements(holderClass, objectivityId, enjoyabilityId, accuracyId, rateItClass, submitBtnId)
    {
        
        var holder = document.createElement('Div');
        holder.className = holderClass;
        
        // Creating the objectivity star rating
        var objectivitySpan = document.createElement('span');
        objectivitySpan.className = rateItClass;
        objectivitySpan.id = objectivityId;
        objectivitySpan.innerHTML = 'Objectivity: ';
        objectivitySpan.title = 'Does the article contain any bias or subjective statements?';
        holder.appendChild(objectivitySpan);
        
         // Creating the objectivity star rating
        var accuracySpace = document.createElement('span');
        accuracySpace.className = rateItClass;
        accuracySpace.id = accuracyId;
        accuracySpace.innerHTML = 'Accuracy: ';
        accuracySpace.title = 'Are the sources for factual information clearly listed so they can be verified in another source?';
        holder.appendChild(accuracySpace);
               
        // Creating the enjoyabiltiy star rating
        var enjoyabilitySpan = document.createElement('span');
        enjoyabilitySpan.className = rateItClass;
        enjoyabilitySpan.id = enjoyabilityId;
        enjoyabilitySpan.innerHTML = 'Enjoyability: ';
        enjoyabilitySpan.title = 'Is the article entertaining to read or is it boring?';
        holder.appendChild(enjoyabilitySpan);             
        
        
        // Creating the submit button and appending to form
        var submitButton = document.createElement('Input');
        submitButton.setAttribute("type","button");
        submitButton.id = submitBtnId;
        submitButton.value = 'Submit';
        holder.appendChild(submitButton);

        
        return holder;   
    }
    
    // Creates a popupbox from the passed variables
    function createPopup(type,containerId,containerClass,arrowHolderClass,arrowClass,arrowBorderHolderClass,arrowBorderClass)
    {
        var popup = createDiv(containerId,containerClass);
        
        // Need to expand for getting dynamic content
        var data = '';
        
            switch (type) {
            case 'info':
                data = "Please take a moment to make an informed, analytical view on the legitimacy of this article. Things to consider: <ul><li>Is there an obvious bias?</li><li>Is the author giving facts or opinions?</li><li>Is it a balanced or one sided article?</li></ul>";
                break;
            case 'other':
                data = "Here is some very helpful  other information surrounding this news outlet";
                break;
            case 'economical':
                data = "Here is some very helpful  economical information surrounding this news outlet";
                break;
            case 'political':
                data = "Here is some very helpful political information surrounding this news outlet";
                break;
            default:
                data = "Error loading text";
                  } 
        
        
        //Creating background triangle to give border effect
        var arrowBackground = createDiv('',arrowBorderHolderClass);
        arrowBackground.className += " " + arrowBorderClass;
        popup.appendChild(arrowBackground);
        var arrow = createDiv('',arrowHolderClass);
        arrow.className += " " +arrowClass;
        popup.appendChild(arrow);
        var textDiv = document.createElement('div');
        textDiv.className = 'popupText';
        textDiv.innerHTML += data;
        popup.appendChild(textDiv);
        
        return popup;     
    }
    
    // Casts a vote through AJAX call with supplied URL and vote to path /vote
    function castVote(URL, isLegit)
    {   
        
        //Creating an array to store data for POSTing with AJAX
        var dataObject = {};
        dataObject['URL'] = URL;
        
        if(isLegit === true)
        {
            dataObject['upVote'] = 1;
        }
        else
        {
            dataObject['downVote'] = 1;
        }
        
       var ajaxRequest =  $.ajax({
                url: "52.16.25.190/vote",
                type: "POST",
                data: dataObject           
              });
         
        ajaxRequest.done(function( result ) {
           var resObject =  JSON.parse(result);
            var articleId = parseInt(resObject['articleId']);
            alert('ArticleId: ' + articleId);
            
          var comment = prompt("Please share your thoughts on this article...");
            if (comment != null) {
                var author = prompt("Your name...");
                if(author != null)
                {
                    addComment(articleId, author, comment);
                }
                else
                {
                    addComment(articleId, 'Anonymous', comment);
                }
                
            }
        });

        ajaxRequest.fail(function( jqXHR, textStatus ) {
          alert( "Ajax Request failed: " + textStatus );
        });
                
        
    }

    
function addComment(id, author, comment )
{

    //Getting text values
    var commentText = comment;
    var commentAuthor = author;
    var articleId = id;

    alert('Adding comment by: ' + commentAuthor + " text: " + commentText + " ArticleId: " + articleId); 

      var request = $.ajax({
            url: "52.16.25.190/addCommentForArticle",
            type: "POST",
            data: { commentAuthor : commentAuthor,
                    commentText : commentText,
                    articleId : articleId}
          });

          request.done(function(result) {
             alert('Vote and comment successfully added!');
          });

           request.fail(function( jqXHR, textStatus ) {
               alert('Error adding vote and comment');       
          });

}

    
    //Performs Ajax request for /addReviewForArticle with supplied values 
function addReview(articleURL, isLegit, isObjective, isFactual, isEnjoyable )
{

  alert('Adding Review for ' + articleURL + ' isLegit: ' + isLegit + ' isObjective: ' + isObjective + ' isFactual: ' + isFactual + ' isEnjoyable: ' + isEnjoyable);

      var request = $.ajax({
            url: "52.16.25.190/addReviewForArticle",
            type: "POST",
            data: { URL :  articleURL,
                    isLegit : isLegit,
                    isObjective : isObjective,
                    isFactual : isFactual,
                    isEnjoyable : isEnjoyable,}
          });

          request.done(function(result) {
             alert('Review successfully added!');
          });

           request.fail(function( jqXHR, textStatus ) {
               alert('Error adding review');       
          });

}
   
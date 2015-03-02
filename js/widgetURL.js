// The external widget file created by Edward Bowyer
var legitWidget = function(global) {
    
        // Need to add localLive varaible to load local stylesheet if working without data connection
        // Load Jquery if not already loaded
        if(!window.jQuery)
        {
           var script = document.createElement('script');
           script.type = "text/javascript";
           script.src = "http://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js";
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
         urlForm: 'urlFormHolder'
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
           expandWidgetId: 'expandWidget',
           additonalInfoDivid: 'additionalInfoHolder',
           chevronId: 'chevron',
           inputURLId: 'inputURL',
           submitButtonId: 'submitBtn',
           urlInputId: 'urlInput'
           
        } 
        },
            timeout:2000,
            stylesheetURL: 'css/styleWidgetURL.css'
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
        
        //Create URL form div
        var urlForm = createUrlForm(configuration.CSS.classes.urlForm, configuration.CSS.ids.urlInputId, configuration.CSS.ids.submitButtonId);
     

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
        widget.appendChild(urlForm);
        widget.appendChild(additionalInfoDiv);
        widget.appendChild(expandWidgetDiv);
        widget.appendChild(infoHolderDiv);
        
         //CLICK EVENT
        
        upVoteDiv.onclick = function(){
        
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
            
            var urlInput = document.getElementById(configuration.CSS.ids.urlInputId);
            
            var url = urlInput.value;
                        
            if(isLegit === 'undefined')
            {
                alert('Please select legit or not using Green / Red triangles');
            }

            else if(url === '')
            {
                alert('Please enter a URL');
            }
            
            else
            {
                castVote(url, isLegit,function(error,result){
                    if(error)
                    {
                        alert('Error submitting vote');
                    }
                    else
                    {
                        alert(result);
                    }

                });  
            
            }
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
    function createUrlForm(holderClass, urlInputId, submitBtnId)
    {
        
        var holder = document.createElement('Div');
        holder.className = holderClass;
        
        // Creating the form, and input text and appending
        var form = document.createElement('Form');
        var inputText = document.createElement('Input');
        inputText.setAttribute("type","text");
        inputText.placeholder = "URL of Article...";
        inputText.id = urlInputId;
        inputText.size = 100;
        form.appendChild(inputText);
        
        // Creating the submit button and appending to form
        var submitButton = document.createElement('Input');
        submitButton.setAttribute("type","submit");
        submitButton.id = submitBtnId;
        form.appendChild(submitButton);
        
        //Appending form to div
        holder.appendChild(form);
        
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
                data = "Please use your knowledge and the extra information provided to make an informed, objective view on the legitimacy of this article. Things to consider: <ul><li>Is there an obvious bias?</li><li>Is the author giving evidence?</li><li>Does it read like opinion or fact?</li><li>Is it a balanced or one sided article?</li></ul>";;
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
    function castVote(URL, isLegit, callback)
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
                url: "http://localhost:1337/vote",
                type: "POST",
                data: dataObject
                
              });
         
        ajaxRequest.done(function( msg ) {
          callback(null, "Vote succesfully cast");
        });

        ajaxRequest.fail(function( jqXHR, textStatus ) {
          alert( "Ajax Request failed: " + textStatus );
        });
                
        
    }
    
    
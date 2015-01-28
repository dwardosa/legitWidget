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
        var otherPopupVisible = false;
        var economicalPopupVisible = false;
        var politicalPopupVisible = false;


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
         otherPopup: 'otherPopupContainer',
         otherPopupArrow: 'otherPopupArrow',
         otherPopupArrowBorderHolder: 'otherPopupArrowBackgroundBorder',
         economicalPopup: 'economicalPopupContainer',
         economicalPopupArrow: 'economicalPopupArrow',
         economicalPopupArrowBorderHolder: 'economicalPopupArrowBackgroundBorder',
         politicalPopup: 'politicalPopupContainer',
         politicalPopupArrow: 'politicalPopupArrow',
         politicalPopupArrowBorderHolder: 'politicalPopupArrowBackgroundBorder'
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
           infoPopupId: 'infoPopup',
           otherPopupId: 'otherPopup',
           economicalPopupId: 'economicalPopup',
           politicalPopupId: 'politicalPopup'
        } 
        },
            timeout:2000,
            stylesheetURL: 'css/style.css'
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
         
        // Creating political info holder div
        var politicalHolderDiv = createDiv(configuration.CSS.ids.politicsHolderId,configuration.CSS.classes.infoHolderClass,'Politics');
        var politicalInfoArrowDiv = createDiv(configuration.CSS.ids.politicsInfoArrow,configuration.CSS.classes.infoArrow);
      
        //Appending the CSS info traingle to the div and then div into holder div
        politicalHolderDiv.appendChild(politicalInfoArrowDiv);
        additionalInfoDiv.appendChild(politicalHolderDiv);
        
        // Create political info popup
        var politicalInfoHolderDiv = createPopup('political',configuration.CSS.ids.politicalPopupId,configuration.CSS.classes.politicalPopup,configuration.CSS.classes.politicalPopupArrow,configuration.CSS.classes.arrowUp,configuration.CSS.classes.politicalPopupArrowBorderHolder,configuration.CSS.classes.arrowUpBorder);
      
        // Creating political info holder div
        var economicHolderDiv = createDiv(configuration.CSS.ids.economicsHolderId,configuration.CSS.classes.infoHolderClass,'Economics');
        var economicsInfoArrowDiv = createDiv(configuration.CSS.ids.economicsInfoArrow,configuration.CSS.classes.infoArrow);

        //Appending the CSS info traingle to the div
        economicHolderDiv.appendChild(economicsInfoArrowDiv);
        additionalInfoDiv.appendChild(economicHolderDiv);
        
        // Create div for holding info
        var economicalInfoHolderDiv = createPopup('economical',configuration.CSS.ids.economicalPopupId,configuration.CSS.classes.economicalPopup,configuration.CSS.classes.economicalPopupArrow,configuration.CSS.classes.arrowUp,configuration.CSS.classes.economicalPopupArrowBorderHolder,configuration.CSS.classes.arrowUpBorder);

        // Creating political info holder div and then div into holder div
        var otherHolderDiv = createDiv(configuration.CSS.ids.otherHolderId,configuration.CSS.classes.infoHolderClass,'Other');
        var otherInfoArrowDiv = createDiv(configuration.CSS.ids.otherInfoArrow,configuration.CSS.classes.infoArrow);

        //Appending the CSS info traingle to the div and then div into holder div
        otherHolderDiv.appendChild(otherInfoArrowDiv);
        additionalInfoDiv.appendChild(otherHolderDiv);
        
        // Create div for holding info
        var otherInfoHolderDiv = createPopup('other',configuration.CSS.ids.otherPopupId,configuration.CSS.classes.otherPopup,configuration.CSS.classes.otherPopupArrow,configuration.CSS.classes.arrowUp,configuration.CSS.classes.otherPopupArrowBorderHolder,configuration.CSS.classes.arrowUpBorder);

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
        
        //CLICK EVENT
        
        upVoteDiv.onclick = function(){
           var URL =  window.location.href;
           
           var result = castVote(URL, 1);
        };
        
        downVoteDiv.onclick = function(){
           var URL =  window.location.href;
           
            var result = castVote(URL, 0);        
        };
       
        politicalInfoArrowDiv.onclick = function(){
                        
            if(politicalPopupVisible)
            {
                $('#' + configuration.CSS.ids.politicalPopupId).fadeOut();
                politicalPopupVisible = false;             
            }
            else
            {
                closeAllPopups();
                $('#' + configuration.CSS.ids.politicalPopupId).fadeIn().css("display","block");
                politicalPopupVisible = true;             
            }
        };
        
        economicsInfoArrowDiv.onclick = function(){
            
            if(economicalPopupVisible)
            {
                $('#' + configuration.CSS.ids.economicalPopupId).fadeOut();
                economicalPopupVisible = false;             
            }
            else
            {
                closeAllPopups();
                $('#' + configuration.CSS.ids.economicalPopupId).fadeIn().css("display","block");
                economicalPopupVisible = true;             
            }
        };
        
        otherInfoArrowDiv.onclick = function(){
            
            
            
            if(otherPopupVisible)
            {
                $('#' + configuration.CSS.ids.otherPopupId).fadeOut();
                otherPopupVisible = false;             
            }
            else
            {
                closeAllPopups();
                $('#' + configuration.CSS.ids.otherPopupId).fadeIn().css("display","block");
                otherPopupVisible = true;             
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


        // Adding to DOM
        container.appendChild(widgetDiv);

        var widget = document.getElementById(configuration.CSS.ids.widgetId);

        // Setting HTML for the widget and making it visible by setting display block
        widget.innerHTML = '<strong class="infoHolder" style="padding:5px;">Legit?</strong>';
        widget.style.display = 'inline-block'; 
        widget.appendChild(upVoteDiv);
        widget.appendChild(downVoteDiv);
        widget.appendChild(additionalInfoDiv);
        widget.appendChild(expandWidgetDiv);
        widget.appendChild(infoHolderDiv);
        widget.appendChild(otherInfoHolderDiv);
        widget.appendChild(economicalInfoHolderDiv);
        widget.appendChild(politicalInfoHolderDiv);
  
  
  // HELPER FUNCTIONS WHICH NEED TO BE IN MAIN FUNCTION
  
  // Hides all popups if they're open
    
    function closeAllPopups()
    {
        if(infoPopupVisible)
        {
            $('#' + configuration.CSS.ids.infoPopupId).fadeOut();
            infoPopupVisible = false; 
        }
        
        if(otherPopupVisible)
        {
            $('#' + configuration.CSS.ids.otherPopupId).fadeOut();
            otherPopupVisible = false;
        }
        
        if(economicalPopupVisible)
        {
            $('#' + configuration.CSS.ids.economicalPopupId).fadeOut();
            economicalPopupVisible = false;   
        }
         
        if(politicalPopupVisible)
        {
            $('#' + configuration.CSS.ids.politicalPopupId).fadeOut();
            politicalPopupVisible = false;          
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
    
    
    function castVote(URL,upDown)
    {   
        var voteType = '';
        
        if(upDown === 1)
        {
            voteType = 'upVote';
        }
        else
        {
            voteType = 'downVote';
        }
        
        $.ajax({
                type: "POST",
                url: "http://localhost:1337/vote",
                data: { URL: "John", location: "Boston" }
              })
                .done(function( msg ) {
                  alert( "Data Saved: " + msg );
                });
        
    }
    
    
 // Get the element with id="defaultOpen" and click on it for tabs
 document.getElementById("defaultOpen").click();


 function tabStatus(evt, status) {
  // Declare all variables
  var i, tabcontent, tablinks;

  // Get all elements with class="tabcontent" and hide them
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Get all elements with class="tablinks" and remove the class "active"
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  // Show the current tab, and add an "active" class to the button that opened the tab
  document.getElementById(status).style.display = "block";
  evt.currentTarget.className += " active";
}


$(document).ready( function() {  
       //GetMap();
});


function GetMap()
{
    var map = new Microsoft.Maps.Map('#myMap', {
        credentials: 'AmB10sLEYKiqVN8mibtfPrXI9RX63fJUSD6KfPn2lKdc1JPkttrr5dmqoCi2VkH6',
        center: new Microsoft.Maps.Location(37.9924, 23.6781)
    });

    //Create an infobox at the center of the map but don't show it.
    infobox = new Microsoft.Maps.Infobox(map.getCenter(), {
      visible: false
    });

     //Assign the infobox to a map instance.
      infobox.setMap(map);

     $.ajax({
        contentType: "application/json",
        type: "GET",
        url: "http://localhost/ptixiaki%20v1/APIs/freatioStatus.php?task=Get%20ifFloated",
        success: function (data) {
              res = data.info[0];
              isFloated = res.FloaterSensor;
              //console.log(isFloated);
              if (isFloated == 1) {
                createColoredPushpin(map.getCenter(), 'red', function (pin) {
                   map.entities.push(pin);
                  //Store some metadata with the pushpin.
                  pin.metadata = {
                    title: 'Θηβών κι Ιερά Οδός 50',
                    description: 'Status: Error '
                 };

                //Add a click event handler to the pushpin.
                Microsoft.Maps.Events.addHandler(pin, 'click', pushpinClicked);

                }); 
              } else if (isFloated == 0)
              {
                createColoredPushpin(map.getCenter(), 'green', function (pin) {
                   map.entities.push(pin);
                  //Store some metadata with the pushpin.
                  pin.metadata = {
                    title: 'Θηβών κι Ιερά Οδός 50',
                    description: 'Status: OK'
                 };

                //Add a click event handler to the pushpin.
                Microsoft.Maps.Events.addHandler(pin, 'click', pushpinClicked); 
                });
              }

            //setTimeout("GetMap()", 10000)
          }
      });
     
    }

    function pushpinClicked(e) {
        //Make sure the infobox has metadata to display.
        if (e.target.metadata) {
            //Set the infobox options with the metadata of the pushpin.
            infobox.setOptions({
                location: e.target.getLocation(),
                title: e.target.metadata.title,
                description: e.target.metadata.description,
                visible: true
            });
        }
    }


   function createColoredPushpin(location, color, callback) {
       var img = new Image();
       img.onload = function () {
           var c = document.createElement('canvas');
           c.width = img.width;
           c.height = img.height;

           var context = c.getContext('2d');

           //Draw a colored circle behind the pin
           context.beginPath();
           context.arc(13, 13, 11, 0, 2 * Math.PI, false);
           context.fillStyle = color;
           context.fill();

           //Draw the pushpin icon
           context.drawImage(img, 0, 0);



           var pin = new Microsoft.Maps.Pushpin(location, {
               //Generate a base64 image URL from the canvas.
               icon: c.toDataURL(),
               anchor: new Microsoft.Maps.Point(12, 39)
           });



           if (callback) {
               callback(pin);
           }
       };

       img.src = 'images/pushPin.png';
   }
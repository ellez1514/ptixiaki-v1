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


function GetMap()
    {
      var map = new Microsoft.Maps.Map('#myMap', {
          credentials: 'AmB10sLEYKiqVN8mibtfPrXI9RX63fJUSD6KfPn2lKdc1JPkttrr5dmqoCi2VkH6',
          center: new Microsoft.Maps.Location(37.9924, 23.6781)
      });

      $.ajax({
          contentType: "application/json",
          type: "GET",
          url: "http://localhost/ptixiaki%20v1/APIs/freatioStatus.php?task=Get%20ifFloated",
          success: function (data) {
              res = data.info[0];
              isFloated = res.isFloated;
              //console.log(isFloated);
              if (isFloated == 1) {
                createColoredPushpin(map.getCenter(), 'red', function (pin) {
                   map.entities.push(pin);
                }); 
              } else if (isFloated == 0)
              {
                createColoredPushpin(map.getCenter(), 'green', function (pin) {
                   map.entities.push(pin);
                }); 
              }
          },
          error: function (jqXHR, textStatus, errorThrown) {
              //$("#postResult").val(jqXHR.statusText);
          }
      });
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


function ErrorAlert()
    {
          $.ajax({
          contentType: "application/json",
          type: "GET",
          url: "http://localhost/ptixiaki%20v1/APIs/freatioStatus.php?task=Get%20ifFloated",
          success: function (data) {
              res = data.info[0];
              isFloated = res.isFloated;
              //console.log(isFloated);
              if (isFloated == 1) {
                document.getElementById("userMsg").style.visibility= "visible"; 
              } else if (isFloated == 0)
              {
                document.getElementById("userMsg").style.visibility= "hidden"; 
              }
          },
          error: function (jqXHR, textStatus, errorThrown) {
              //$("#postResult").val(jqXHR.statusText);
          }
      });
    }


/*$.ajax({
                contentType: "application/json",
                type: "GET",
                url: "http://localhost/ptixiaki%20v1/APIs/info.php?task=Get%20Code",
                success: function (data) {
                  //data1 = (JSON.stringify(data.info[0]);
                  //console.log(data1);
                    //alert('Welcome!');
                    res = data.info[0];
                    document.getElementById("Id").innerHTML = res.id;
                    document.getElementById("DevId").innerHTML= res.device_id;
                    document.getElementById("UltraSen").innerHTML= res.ultrasonicSensor;
                    document.getElementById("WatSen").innerHTML= res.waterSensor;
                    document.getElementById("date").innerHTML= res.date;
                   // window.location.href = "/Home/Details/" + data.id;
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    $("#postResult").val(jqXHR.statusText);
                }
            }); */

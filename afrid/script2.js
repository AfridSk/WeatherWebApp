var latitude;
var longitude;
var ic1;
var flag=0;
const K=273;
const key="82005d27a116c2880c8f0fcb866998a0";
(function(){
var search_input = document.querySelector('#searchBar');
var city;
    var markerArr = [];
    var local_data 	= JSON.parse(localStorage.getItem('locations_data'));
    console.log(local_data);
 window.initMap = function() {
        var mapDiv = document.getElementById('map');
        
        var options = {types: ['(cities)']};
        var autocomplete = new google.maps.places.Autocomplete(search_input,options);
        
        autocomplete.addListener('place_changed', function() {
            
            if (markerArr.length > 0) {
                markerArr[0].setMap(null);
            }
            
            var place = autocomplete.getPlace();
            
                latitude=place.geometry.location.lat(),
                longitude=place.geometry.location.lng()
            
          
 })
    }
    
 })()
function process()
        {
             console.log(flag);
            const iconElement=document.querySelector(".weather-icon");
            const tempElement=document.querySelector(".temperature-value p ");
            const descElement=document.querySelector(".temperature-description p");
            const daycElement=document.querySelector(".dayc");
            //const locationElement=document.querySelector(".location p");
            console.log(latitude,longitude);
            const weather={};
           
             var iconElement1=document.querySelector(".weather-icon1");
            const tempElement1=document.querySelector(".temperature-value1 p ");
            const descElement1=document.querySelector(".temperature-description1 p");
            const iconday1=document.querySelector(".day1");
            const iconElement2=document.querySelector(".weather-icon2");
            const tempElement2=document.querySelector(".temperature-value2 p ");
            const descElement2=document.querySelector(".temperature-description2 p");
                     const iconday2=document.querySelector(".day2");
            const iconElement3=document.querySelector(".weather-icon3");
            const tempElement3=document.querySelector(".temperature-value3 p ");
            const descElement3=document.querySelector(".temperature-description3 p");
                     const iconday3=document.querySelector(".day3");
            const iconElement4=document.querySelector(".weather-icon4");
            const tempElement4=document.querySelector(".temperature-value4 p ");
            const descElement4=document.querySelector(".temperature-description4 p");
                     const iconday4=document.querySelector(".day4");
            const iconElement5=document.querySelector(".weather-icon5");
            const tempElement5=document.querySelector(".temperature-value5 p ");
            const descElement5=document.querySelector(".temperature-description5 p");
                     const iconday5=document.querySelector(".day5");
                
           const iconElement6=document.querySelector(".weather-icon6");
            const tempElement6=document.querySelector(".temperature-value6 p ");
            const descElement6=document.querySelector(".temperature-description6 p");
                const iconday6=document.querySelector(".day6");
           
            weather.temperature={
                unit:"celsius"
            }
            var city=document.Details.searchBar.value; 
            console.log(city);
                if(city!='city name....')
                    { console.log('inside if');   
                      var s=document.getElementById('list');
                             var i=s.options[s.selectedIndex].value;
                         
                       
                     let api=`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;
                            fetch(api)
                                .then(function(response){
                                let data=response.json();
                                return data;
                            })
                            .then(function(data){
                                weather.temperature.value=Math.floor(data.main.temp-K);
                                weather.description=data.weather[0].description;
                                weather.iconID=data.weather[0].icon;
                                weather.country=data.sys.country;
                                weather.city=data.name;
                            })
                            .then(function(){
                                if(i=='0')
                                  displayWeather();
                            })
                            .catch(function(err){
                                console.log(err);
                                alert("Please enter correctly");
                            });
                         
                        
                    if(i=='0')
                        {
                        
                        
                           function displayWeather()
                           {
                                iconElement.innerHTML=`<img src="icons/${weather.iconID}.png"/>`;
                                tempElement.innerHTML=`${weather.temperature.value}° <span>C</span>`;
                                descElement.innerHTML=weather.description;
                               // locationElement.innerHTML=`${weather.city},${weather.country}`; 
                                
                               daycElement.innerHTML=dayAbbrv(0);
                               console.log(daycElement.innerHTML);
                              
                            }
                        }  else{
                     
                                    fetch(
                                    `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${key}`,
                                    
                                      )
                                    .then(function(response) {
                                      return response.json();
                                    })
                                    .then(function(response) {
                                      
                                        
                                        if(i=='1'){
                                            let ic = response.list[2].weather[0].icon;
                                            iconElement.innerHTML=`<img src="icons/${ic}.png"/>`;
                                      
                                       tempElement.innerHTML=Math.floor(response.list[2].main.temp-K)+`° <span>C</span>`;
                                     
                                    descElement.innerHTML=response.list[2].weather[0].description;
                                    console.log(response.city.name,response.population); 
                                       //locationElement.innerHTML=response.city.name;
                                            daycElement.innerHTML=dayAbbrv(1);
                                            
                                        }

                                        if(i=='2'){
                                            let ic = response.list[10].weather[0].icon;
                                            iconElement.innerHTML=`<img src="icons/${ic}.png"/>`;
                                      
                                       tempElement.innerHTML=Math.floor(response.list[10].main.temp-K)+`° <span>C</span>`;
                                           // locationElement.innerHTML=response.city.name;
                                     
                                      daycElement.innerHTML=dayAbbrv(2); descElement.innerHTML=response.list[10].weather[0].description;}
                                        if(i=='3'){
                                            let ic = response.list[18].weather[0].icon;
                                            iconElement.innerHTML=`<img src="icons/${ic}.png"/>`;
                                       
                                       tempElement.innerHTML=Math.floor(response.list[18].main.temp-K)+`° <span>C</span>`;
                                    
                                   daycElement.innerHTML=dayAbbrv(3); descElement.innerHTML=response.list[18].weather[0].description;
                                       // locationElement.innerHTML=response.city.name;
                                        }

                                        if(i=='4'){
                                            let ic = response.list[26].weather[0].icon;
                                            iconElement.innerHTML=`<img src="icons/${ic}.png"/>`;
                                      
                                       daycElement.innerHTML=dayAbbrv(4);
                                    tempElement.innerHTML=Math.floor(response.list[26].main.temp-K)+`° <span>C</span>`;
                                     
                                    descElement.innerHTML=response.list[26].weather[0].description;
                                       // locationElement.innerHTML=response.city.name;
                                        }

                                        if(i=='5'){
                                            let ic = response.list[34].weather[0].icon;
                                            iconElement.innerHTML=`<img src="icons/${ic}.png"/>`;
                                        
                                       daycElement.innerHTML=dayAbbrv(5);
                                    tempElement.innerHTML=Math.floor(response.list[34].main.temp-K)+`° <span>C</span>`;
                                    
                                    descElement.innerHTML=response.list[34].weather[0].description;
                                       // locationElement.innerHTML=response.city.name;
                                        }
                                        if(i=='6'){
                                            document.styleSheets[1].disabled=true;
                                            console.log(i)
                                            let ic = response.list[36].weather[0].icon;
                                            iconElement.innerHTML=`<img src="icons/${ic}.png"/>`;
                                
                                       
                                           daycElement.innerHTML=dayAbbrv(6); tempElement.innerHTML=Math.floor(response.list[36].main.temp-K)+`° <span>C</span>`;
                                    
                                           // locationElement.innerHTML=response.city.name;
                                    descElement.innerHTML=response.list[36].weather[0].description;}

                                     if(i==7)
                                         { 
                                            

                                          fetch(
                                            `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${key}`,

                                          ) .catch(function(err) {
                                            console.log(err);
                                            f=1;
                                          alert("Please enter correctly");
                                          })

                                            .then(function(response) {
                                              return response.json();
                                            })
                                            .then(function(response) {
                                              // day 1
                                              
                                                
                                               iconElement1.innerHTML=`<img src="icons/${weather.iconID}.png"/>`;
                                                   tempElement1.innerHTML=`${weather.temperature.value}° <span>C</span>`;
                                                   descElement1.innerHTML=weather.description;
                                                   iconday1.innerHTML=dayAbbrv(0);
                                               let ic = response.list[2].weather[0].icon;
                                                iconElement2.innerHTML=`<img src="icons/${ic}.png"/>`;
                                                tempElement2.innerHTML=Math.floor(response.list[2].main.temp-K)+`° <span>C</span>`;
                                                descElement2.innerHTML=response.list[2].weather[0].description;
                                                iconday2.innerHTML=dayAbbrv(1);
                                               ic1=ic;
                                                ic = response.list[10].weather[0].icon;
                                                iconElement3.innerHTML=`<img src="icons/${ic}.png"/>`;
                                                tempElement3.innerHTML=Math.floor(response.list[10].main.temp-K)+`° <span>C</span>`;
                                                descElement3.innerHTML=response.list[10].weather[0].description;
                                            iconday3.innerHTML=dayAbbrv(2);

                                               ic = response.list[18].weather[0].icon;
                                                iconElement.innerHTML=`<img src="icons/${ic}.png"/>`;
                                                tempElement.innerHTML=Math.floor(response.list[18].main.temp-K)+`° <span>C</span>`;
                                                descElement.innerHTML=response.list[18].weather[0].description;
                                               daycElement.innerHTML=dayAbbrv(3);

                                               ic = response.list[26].weather[0].icon;
                                                iconElement4.innerHTML=`<img src="icons/${ic}.png"/>`;
                                                tempElement4.innerHTML=Math.floor(response.list[26].main.temp-K)+`° <span>C</span>`;
                                                descElement4.innerHTML=response.list[26].weather[0].description;
                                               iconday4.innerHTML=dayAbbrv(4);  

                                               ic = response.list[34].weather[0].icon;
                                                iconElement5.innerHTML=`<img src="icons/${ic}.png"/>`;
                                                tempElement5.innerHTML=Math.floor(response.list[34].main.temp-K)+`° <span>C</span>`;
                                                descElement5.innerHTML=response.list[34].weather[0].description;
                                               iconday5.innerHTML=dayAbbrv(5);  

                                            ic = response.list[36].weather[0].icon;
                                                iconElement6.innerHTML=`<img src="icons/${ic}.png"/>`;
                                                tempElement6.innerHTML=Math.floor(response.list[36].main.temp-K)+`° <span>C</span>`;
                                                descElement6.innerHTML=response.list[36].weather[0].description;
                                               iconday6.innerHTML=dayAbbrv(6);  
                                              
                                        });
                                           

                                      


                                        var stylesheet = document.getElementById('style1').disabled=true;

                                            if(flag==0)
                                                {
                                               // document.styleSheets[1].remove();
                                         var link = document.createElement('link');  
                                           link.rel = 'stylesheet';  
                                            link.type = 'text/css'; 
                                             link.href = 'style.css'; 
                                            link.id='style';
                                            document.getElementsByTagName('HEAD')[0].appendChild(link);
                                                }else{
                                                    var stylesheet = document.getElementById('style').disabled=false;
                                                }
                                                flag=1;
                                              //  flag=1;
                                                //document.styleSheets[2].disabled=true;
                                              /* console.log(document.styleSheets[1]);
                                                console.log(document.styleSheets[0]); */





                                              

                                                    }
                                                       if(i!=7)
                                                        {  

                                                    //document.styleSheets[0].disabled=true;
                                         if(flag==1)                    
                                        var stylesheet = document.getElementById('style').disabled=true;
                                            var stylesheet = document.getElementById('style1').disabled=false;

                                                            if(tempElement1.innerHTML != '')
                                                           iconElement1.removeChild(iconElement1.childNodes[0]); 
                                                            console.log(iconElement1.innerHTML);
                                                           tempElement1.innerHTML ='';
                                                            descElement1.innerHTML='';
                                                            iconday1.innerHTML='';
                                                             if(tempElement2.innerHTML != '')
                                                            iconElement2.removeChild(iconElement2.childNodes[0]); 

                                                            iconElement2.innnerHTML =''; 
                                                           tempElement2.innerHTML ='';
                                                            descElement2.innerHTML='';
                                                            iconday2.innerHTML='';
                                                             if(tempElement3.innerHTML != '')
                                                            iconElement3.removeChild(iconElement3.childNodes[0]); 

                                                            iconElement3.innnerHTML =''; 
                                                           tempElement3.innerHTML ='';
                                                            descElement3.innerHTML='';
                                                            iconday3.innerHTML='';
                                                             if(tempElement4.innerHTML != '')
                                                            iconElement4.removeChild(iconElement4.childNodes[0]); 

                                                            iconElement4.innnerHTML =''; 
                                                           tempElement4.innerHTML ='';
                                                            descElement4.innerHTML='';
                                                            iconday4.innerHTML='';
                                                             if(tempElement5.innerHTML != '')
                                                            iconElement5.removeChild(iconElement5.childNodes[0]); 

                                                            iconElement5.innnerHTML =''; 
                                                           tempElement5.innerHTML ='';
                                                            descElement5.innerHTML='';
                                                            iconday5.innerHTML='';
                                                             if(tempElement6.innerHTML != '')
                                                            iconElement6.removeChild(iconElement6.childNodes[0]); 

                                                            iconElement6.innnerHTML =''; 
                                                           tempElement6.innerHTML ='';
                                                            descElement6.innerHTML='';
                                                            iconday6.innerHTML='';
                                                        }


                                                                             })
                                                                            .catch(function(err) {
                                                                                console.log(err);
                                                                              alert("Please enter correctly");
                                                                             });

                                                            }





                     
                     
                     
                    }

                    else
                    { alert("City name not found");
                    console.log("no data");
                     }

       }
        
 function dayAbbrv(day)
        {
             var d = new Date();
              var n = d.getDay();
              future = day + n;
              switch (future) {
                case 0:
                case 7:
                  day = "Sunday";
                  break;
                case 1:
                case 8:
                  day = "Monday";
                  break;
                case 2:
                case 9:
                  day = "Tuesday";
                  break;
                case 3:
                case 10:
                  day = "Wednesday";
                  break;
                case 4:
                case 11:
                  day = "Thursday";
                  break;
                case 5:
                case 12:
                  day = "Friday";
                  break;
                case 6:
                  day = "Saturday";
              }
              return day;
        }


        document.addEventListener('DOMContentLoaded', function(){
          let stars = document.querySelectorAll('.star');
          stars.forEach(function(star){
              star.addEventListener('click', setRating);
          });
          let rating = parseInt(document.querySelector('.stars').getAttribute('data-rating'));
          let target = stars[rating - 1];
       // target.dispatchEvent(new MouseEvent('click'));
      });
      function setRating(ev){
          let span = ev.currentTarget;
          let stars = document.querySelectorAll('.star');
          let match = false;
          let num = 0;
          stars.forEach(function(star, index){
              if(match){
                  star.classList.remove('rated');
              }else{
                  star.classList.add('rated');
              }
              //are we currently looking at the span that was clicked
              if(star === span){
                  match = true;
                  num = index + 1;
              }
          });
          var newrating=document.querySelector('.star-control');
          newrating.value=num+'/5';
          console.log(num+'/5');
          document.querySelector('.stars').setAttribute('data-rating', num);
      }





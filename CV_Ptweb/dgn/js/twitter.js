<!-- JOHN'S GRAPHISME -->

function twitterCallback(twitters) {
  var statusHTML = [];
  for (var i=0; i<twitters.length; i++){
    var username = twitters[i].user.screen_name;
	var logo = twitters[i].user_profile_image;
    var status = twitters[i].text.replace(/((https?|s?ftp|ssh)\:\/\/[^"\s\<\>]*[^.,;'">\:\s\<\>\)\]\!])/g, function(url) {
      return '<a href="'+url+'">'+url+'</a>';
    }).replace(/\B@([_a-z0-9]+)/ig, function(reply) {
      return  reply.charAt(0)+'<a href="http://twitter.com/'+reply.substring(1)+'">'+reply.substring(1)+'</a>';
    });
statusHTML.push('<li>'+status+'<a href="http://twitter.com/'+username+'/statuses/'+twitters[i].id+'">&nbsp;<span class="data">'+relative_time(twitters[i].created_at)+'</span>'+'</a><div class="divisor"></div></li>');
	document.getElementById('twitter_update_list').innerHTML = statusHTML.join(''); 
  }
   
}

function relative_time(time_value) {
  var values = time_value.split(" ");
  time_value = values[1] + " " + values[2] + ", " + values[5] + " " + values[3];
  var parsed_date = Date.parse(time_value);
  var relative_to = (arguments.length > 1) ? arguments[1] : new Date();
  var delta = parseInt((relative_to.getTime() - parsed_date) / 1000);
  delta = delta + (relative_to.getTimezoneOffset() * 60);
  
  
      if (delta < 5) {
            r = 'moins de 5 secondes';
        } else if (delta < 30) {
            r = 'même pas 1 minute';
        } else if (delta < 60) {
            r = 'à peine 1 minute';
        } else if (delta < 120) {
            r = '1 minute ';
        } else if (delta < (45*60)) {
            r = (parseInt(delta / 60)).toString() + ' minutes';
        } else if (delta < (2*90*60)) { // 2* because sometimes read 1 hours ago
            r = 'plus de 1 heure';
        } else if (delta < (24*60*60)) {
            r = 'about ' + (parseInt(delta / 3600)).toString() + ' heures';
        } else {
            if (delta < (48*60*60)) {
                r = formatTime(date) + ' hier';
            } else {
                r = formatTime(date) + ' ' + formatDate(date);
                // r = (parseInt(delta / 86400)).toString() + ' jours';
            }
        }

        return r;
    }
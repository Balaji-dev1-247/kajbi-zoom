

$(document).ready(function () {
   var navListItems = $('div.setup-panel div a'), allWells = $('.setup-content'), allNextBtn = $('.nextBtn');
   allWells.hide();
   var email = '', fname = '', lname = '', phoneNumber = '', address = '', country = '', state = '', city = '', zipcode = '';

   redirecPage();
   $('#main-error').hide();
   var todayDate = new Date();
   todayDate.setDate(todayDate.getDate());

   var myDate = moment(new Date(), "MM-DD-YYYY").day(0).format("MM-DD-YYYY");

   Date.prototype.toInputFormat = function () {
      var yyyy = this.getFullYear().toString();
      var mm = (this.getMonth() + 1).toString(); // getMonth() is zero-based
      var dd = this.getDate().toString();
      return yyyy + "-" + (mm[1] ? mm : "0" + mm[0]) + "-" + (dd[1] ? dd : "0" + dd[0]); // padding
   };
   getWeekDates(myDate);

   $('#datetimepicker1').datetimepicker({
      format: 'MM-DD-YYYY',
      minDate: todayDate
   }).on('dp.change', function (e) {
      value = $("#myDate").val();
      firstDate = moment(value, "MM-DD-YYYY").day(0).format("MM-DD-YYYY");
      lastDate = moment(value, "MM-DD-YYYY").day(6).format("MM-DD-YYYY");
      $("#myDate").val(firstDate + "   -   " + lastDate);
      getWeekDates(firstDate);
   });



   localStorage.removeItem("meetingId");
   localStorage.removeItem("timeId");

   getAllUserDetails();
   $('.meetBtn').click(function () {
      var d = this.getAttribute("data-id");

      localStorage.setItem("meetingId", d);
      var curStep = $(this).closest(".setup-content"),
         curStepBtn = curStep.attr("id"),
         nextStepWizard = $('div.setup-panel div a[href="#' + curStepBtn + '"]').parent().next().children("a"),
         curInputs = curStep.find("input[type='text'],input[type='url']"),
         isValid = true;
      if (isValid) nextStepWizard.removeAttr('disabled').trigger('click');

   });


   $("body").on("click", '.timeSelectBtn', function () {

      var d = this.getAttribute("data-id");
      var datetime = this.getAttribute("data-date");

      localStorage.setItem("timeId", d);
      localStorage.setItem("datetime", datetime);
      var curStep = $(this).closest(".setup-content"),
         curStepBtn = curStep.attr("id"),
         nextStepWizard = $('div.setup-panel div a[href="#' + curStepBtn + '"]').parent().next().children("a"),
         curInputs = curStep.find("input[type='text'],input[type='url']"),
         isValid = true;
      if (isValid) nextStepWizard.removeAttr('disabled').trigger('click');
   });



   $('.submitBtn').click(function () {
      $('#alert-failed').hide();
      $('#alert-success').hide();
      var meetingId = window.localStorage.getItem('meetingId');
      var timeId = window.localStorage.getItem('datetime');
      email = $('#email').val();
      fname = $('#fname').val();
      lname = $('#lname').val();
      address = $('#address').val();
      country = $('#country').val();
      state = $('#state').val();
      city = $('#city').val();
      zipcode = $('#zipcode').val();
      phoneNumber = $('#phone').val();

      var data = {
         mentor_email: meetingId,
         start_time: timeId,
         email: email,
         fname: fname,
         lname: lname,
         address: address,
         country: country,
         state: state,
         city: city,
         phone: phoneNumber,
         zipcode: zipcode,
      };

      $.ajax({
         url: './api/savemeeting.php',
         type: 'post',
         dataType: 'json',
         timeout: 20000,
         tryCount: 0,
         retryLimit: 3,
         async: false,
         data: data,
         success: function (json) {
            if (json.status == 409) {
               $('#alert-failed').text(json.msg);
               $('#alert-failed').show();

               $("#alert-failed").fadeTo(2000, 1000).slideUp(1000, function () { $("#alert-failed").slideUp(1000); });

            }

            if (json.status == 200) {
               $('#alert-success').text(json.msg);
               $('#alert-success').show();
               $("#alert-success").fadeTo(2000, 1000).slideUp(1000, function () { $("#alert-success").slideUp(1000); });
            }
         }
      });
   })


   navListItems.click(function (e) {
      e.preventDefault();
      var $target = $($(this).attr('href')),
         $item = $(this);

      if (!$item.hasClass('disabled')) {
         navListItems.removeClass('btn-primary').addClass('btn-default');
         $item.addClass('btn-primary');
         allWells.hide();
         $target.show();
         $target.find('input:eq(0)').focus();
      }
   });

   allNextBtn.click(function () {
      var curStep = $(this).closest(".setup-content"),
         curStepBtn = curStep.attr("id"),
         nextStepWizard = $('div.setup-panel div a[href="#' + curStepBtn + '"]').parent().next().children("a"),
         curInputs = curStep.find("input[type='text'],input[type='url']"),
         isValid = true;

      $(".form-group").removeClass("has-error");

      for (var i = 0; i < curInputs.length; i++) {
         if (!curInputs[i].validity.valid) {
            isValid = false;
            $(curInputs[i]).closest(".form-group").addClass("has-error");
         }
      }

      if (curStepBtn == "step-3") {
         $('#tbl-email').text($('#email').val());
         $('#tbl-fname').text($('#fname').val());
         $('#tbl-lname').text($('#lname').val());
         $('#tbl-address').text($('#address').val());
         $('#tbl-city').text($('#city').val());
         $('#tbl-state').text($('#state').val());
         $('#tbl-country').text($('#country').val());
         $('#tbl-zipcode').text($('#zipcode').val());
         $('#tbl-phone').text($('#phoneNumber').val());
         $('#display-time').text(localStorage.getItem('datetime'))
      }
      if (isValid) nextStepWizard.removeAttr('disabled').trigger('click');
   });

   $('div.setup-panel div a.btn-primary').trigger('click');
});



function getWeekDates(startDate) {

   var date = new Date(startDate), days = parseInt(1, 10);
   var months = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
   $('#my-date-time').html("");
   var dateListHtml = "";

   var now = new Date(moment().format('MM-DD-YYYY'));
   for (let index = 0; index < 7; index++) {

      var month = date.getMonth() + 1;
      var day = date.getDate();

      if (date >= now) {
         dateListHtml += `<ul class="list-group time-list">
            <li class="list-group-item time-head">`+ months[date.getDay()] + " " + month + "/" + day + `</li>
            <li class="list-group-item time-details timeSelectBtn" data-date="` + new Date(date.toInputFormat() + " 08:00 AM").toISOString() + `">08:00 AM</li>
            <li class="list-group-item time-details timeSelectBtn" data-date="` + new Date(date.toInputFormat() + " 08:30 AM").toISOString() + `">08:30 AM</li>
            <li class="list-group-item time-details timeSelectBtn" data-date="` + new Date(date.toInputFormat() + " 09:00 AM").toISOString() + `">09:00 AM</li>
            <li class="list-group-item time-details timeSelectBtn" data-date="` + new Date(date.toInputFormat() + " 09:30 AM").toISOString() + `">09:30 AM</li>
            <li class="list-group-item time-details timeSelectBtn" data-date="` + new Date(date.toInputFormat() + " 10:00 AM").toISOString() + `">10:00 AM</li>
            <li class="list-group-item time-details timeSelectBtn" data-date="` + new Date(date.toInputFormat() + " 10:30 AM").toISOString() + `">10:30 AM</li>
            <li class="list-group-item time-details timeSelectBtn" data-date="` + new Date(date.toInputFormat() + " 11:00 AM").toISOString() + `">11:00 AM</li>
            <li class="list-group-item time-details timeSelectBtn" data-date="` + new Date(date.toInputFormat() + " 11:30 AM").toISOString() + `">11:30 AM</li>
            <li class="list-group-item time-details timeSelectBtn" data-date="` + new Date(date.toInputFormat() + " 12:00 AM").toISOString() + `">12:00 AM</li>
            <li class="list-group-item time-details timeSelectBtn" data-date="` + new Date(date.toInputFormat() + " 12:30 PM").toISOString() + `">12:30 PM</li>
            <li class="list-group-item time-details timeSelectBtn" data-date="` + new Date(date.toInputFormat() + " 01:00 PM").toISOString() + `">01:00 PM</li>
            <li class="list-group-item time-details timeSelectBtn" data-date="` + new Date(date.toInputFormat() + " 01:30 PM").toISOString() + `">01:30 PM</li>
            <li class="list-group-item time-details timeSelectBtn" data-date="` + new Date(date.toInputFormat() + " 02:00 PM").toISOString() + `">02:00 PM</li>
            <li class="list-group-item time-details timeSelectBtn" data-date="` + new Date(date.toInputFormat() + " 02:30 PM").toISOString() + `">02:30 PM</li>
            <li class="list-group-item time-details timeSelectBtn" data-date="` + new Date(date.toInputFormat() + " 03:00 PM").toISOString() + `">03:00 PM</li>
            <li class="list-group-item time-details timeSelectBtn" data-date="` + new Date(date.toInputFormat() + " 03:30 PM").toISOString() + `">03:30 PM</li>
            <li class="list-group-item time-details timeSelectBtn" data-date="` + new Date(date.toInputFormat() + " 04:00 PM").toISOString() + `">04:00 PM</li>
            <li class="list-group-item time-details timeSelectBtn" data-date="` + new Date(date.toInputFormat() + " 04:30 PM").toISOString() + `">04:30 PM</li>
            <li class="list-group-item time-details timeSelectBtn" data-date="` + new Date(date.toInputFormat() + " 05:00 PM").toISOString() + `">05:00 PM</li>
            <li class="list-group-item time-details timeSelectBtn" data-date="` + new Date(date.toInputFormat() + " 05:30 PM").toISOString() + `">05:30 PM</li>
            <li class="list-group-item time-details timeSelectBtn" data-date="` + new Date(date.toInputFormat() + " 06:00 PM").toISOString() + `">06:00 PM</li>
            <li class="list-group-item time-details timeSelectBtn" data-date="` + new Date(date.toInputFormat() + " 06:30 PM").toISOString() + `">06:30 PM</li>
            <li class="list-group-item time-details timeSelectBtn" data-date="` + new Date(date.toInputFormat() + " 07:00 PM").toISOString() + `">07:00 PM</li>
            <li class="list-group-item time-details timeSelectBtn" data-date="` + new Date(date.toInputFormat() + " 07:30 PM").toISOString() + `">07:30 PM</li>
         </ul>`;
      }


      if (!isNaN(date.getTime())) {
         date.setDate(date.getDate() + days);
      } else {
         console.log("Invalid Date....Exception");
      }
   }
   $('#my-date-time').append(dateListHtml);
}



function redirecPage() {
   if (mySession == "") {
      window.location.href = proUrl + '?response_type=code&client_id=' + clientId + '&redirect_uri=' + redirectUrl;
   }
}


function getAllUserDetails() {
   $.ajax({
      url: './api/getListUsers.php?Type=allwebinar',
      type: 'get',
      dataType: 'json',
      timeout: 20000,
      tryCount: 0,
      retryLimit: 3,
      async: false,
      success: function (json) {
         var contactList = "";
         (json.hasOwnProperty("code") && json.code == 124) ?
            ($('#main-error').show(), $('#main-error').text('Your session has been expired please start new one !!!'))
            :
            ($('#main-error').hide());

         $.each(json.users, function (k, v) {
            //var optionhtml =`<li style="margin-bottom:10px" id="`+v.id+`" data-id="`+v.id+`" class="list-group-item meetBtn">`+v.topic+` <span class="pull-right"><i class="fa fa-angle-right" style="font-size:25px;"></i></span></li>`;
            if (v.dept != undefined && v.dept == "Mentors") {
               var image = v.pic_url != undefined ?
                  `<img src="` + v.pic_url + `" alt="` + v.first_name + `" class="img-responsive img-circle rounded-circle user-dp" />` :
                  `<img src="./images/no_image.png" alt="No Image" class="img-responsive img-circle rounded-circle user-dp" />`;
               contactList += `<li id="` + v.id + `" data-id="` + v.email + `" class="list-group-item meetBtn">
                              <div class="row">
                                 <div class="col-md-12 col-12">
                                       <div class="row">
                                          <div class="col-md-2 col-2 user-img text-center pt-1">
                                             `+ image + `
                                          </div>
                                          <div class="col-md-10 col-10">
                                             <h5 class="font-weight-bold mb-1">`+ v.first_name + " " + v.last_name + `<span class="pull-right"><i class="fa fa-angle-right" style="font-size:25px;"></i></span></h5>
                                             
                                          </div>
                                       </div>
                                 </div>
                              </div>
                           </li>`;
            }
         });

         $('#meet-list').append(contactList);
      }
   });
}


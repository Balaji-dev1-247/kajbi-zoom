$(document).ready(function () {
    var email = '',fname = '',lname = '',phoneNumber = '',address='',country='',state='',city='',zipcode='';

    $('#main-error').hide()
    $('#datetimepicker1').datetimepicker({
        format: 'DD/MM/YYYY',
    }).on('dp.change', function(e) {
        if($("#myDate").val() !=""){
          $('#time-details').show();  
        }
    });

    localStorage.removeItem("meetingId");
    localStorage.removeItem("timeId");


    var navListItems = $('div.setup-panel div a'),allWells = $('.setup-content'),allNextBtn = $('.nextBtn');

    //$('#datetimepicker1').datetimepicker();
    getAllMettingDetails();

    allWells.hide();

    $('.meetBtn').click(function(){
        var d = this.getAttribute("data-id");

        getWebinarDetails(d);

        localStorage.setItem("meetingId",d);
        var curStep = $(this).closest(".setup-content"),
        curStepBtn = curStep.attr("id"),
        nextStepWizard = $('div.setup-panel div a[href="#' + curStepBtn + '"]').parent().next().children("a"),
        curInputs = curStep.find("input[type='text'],input[type='url']"),
        isValid = true;
        if (isValid)nextStepWizard.removeAttr('disabled').trigger('click');

   });


    $("body").on("click",'.timeSelectBtn', function() {

        var d = this.getAttribute("data-id");
        var datetime = this.getAttribute("data-date");

        getWebinarDetails(d);

        localStorage.setItem("timeId",d);
        localStorage.setItem("datetime",datetime);
        var curStep = $(this).closest(".setup-content"),
        curStepBtn = curStep.attr("id"),
        nextStepWizard = $('div.setup-panel div a[href="#' + curStepBtn + '"]').parent().next().children("a"),
        curInputs = curStep.find("input[type='text'],input[type='url']"),
        isValid = true;
        if (isValid)nextStepWizard.removeAttr('disabled').trigger('click');

    });



   $('.submitBtn').click(function(){
        $('#alert-failed').hide();
        $('#alert-success').hide();
        var meetingId = window.localStorage.getItem('meetingId');
        var timeId = window.localStorage.getItem('timeId');
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
            webinar_id : meetingId,
            occurrence_ids : timeId,
            email : email,
            fname : fname,
            lname : lname,
            address : address,
            country : country,
            state : state,
            city : city,
            phone : phoneNumber,
            zipcode : zipcode,
        };

      $.ajax({
         url:'./api/savemeeting.php',
         type: 'post',
         dataType: 'json',
         timeout: 20000,
         tryCount: 0,
         retryLimit: 3,
         async : false,
         data : data,
         success: function(json) {
            if(json.status == 409){
               $('#alert-failed').text(json.msg);
               $('#alert-failed').show();
            }

            if(json.status == 200){
               $('#alert-success').text(json.msg);
               $('#alert-success').show();
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

   allNextBtn.click(function(){
      var curStep = $(this).closest(".setup-content"),
          curStepBtn = curStep.attr("id"),
          nextStepWizard = $('div.setup-panel div a[href="#' + curStepBtn + '"]').parent().next().children("a"),
          curInputs = curStep.find("input[type='text'],input[type='url']"),
          isValid = true;

      $(".form-group").removeClass("has-error");

      for(var i=0; i<curInputs.length; i++){
          if (!curInputs[i].validity.valid){
              isValid = false;
              $(curInputs[i]).closest(".form-group").addClass("has-error");
          }
      }

      if(curStepBtn == "step-3"){
         
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
      


      if (isValid)nextStepWizard.removeAttr('disabled').trigger('click');
   });

   $('div.setup-panel div a.btn-primary').trigger('click');
});



function getAllMettingDetails(){
   $.ajax({
      url:'./api/getallwebinar.php?Type=allwebinar',
      type: 'get',
      dataType: 'json',
      timeout: 20000,
      tryCount: 0,
      retryLimit: 3,
      async : false,
      success: function(json) {
         
         (json.hasOwnProperty("code") && json.code == 124 )? 
            ($('#main-error').show(),$('#main-error').text(json.message))
            : 
            ($('#main-error').hide());
        
            $.each(json.webinars, function(k, v) {
               var optionhtml =`<li style="margin-bottom:10px" id="`+v.id+`" data-id="`+v.id+`" class="list-group-item meetBtn">`+v.topic+` <span class="pull-right"><i class="fa fa-angle-right" style="font-size:25px;"></i></span></li>`;
               $('#meet-list').append(optionhtml);            
            });
      }
   });
}


function getWebinarDetails(id){
  $('#time-details').show();
   $.ajax({
      url:'./api/getSingleWebinarDetails.php?webinarId='+id,
      type: 'get',
      dataType: 'json',
      timeout: 20000,
      tryCount: 0,
      retryLimit: 3,
      async : false,
      success: function(json) {
        $('#time-details').html("");
        var timeHtml="";
        if(json.hasOwnProperty("occurrences")){ 
          $.each(json.occurrences, function(k, v) {
            var d = new Date(v.start_time);
            var datetime = d.toLocaleString();
            timeHtml +='<div class="col-sm-2 timediv timeSelectBtn" data-id="'+v.occurrence_id+'" data-date="'+datetime+'">'+datetime+'</div>';

          });
          $('#time-details').append(timeHtml);        
        }else{
            var d1 = new Date(json.start_time);
            var datetime = d1.toLocaleString();
            $('#time-details').append(`<div class="col-sm-2 timediv timeSelectBtn" data-id="" data-date="`+datetime+`">`+datetime+`</div>`);
        }

          
      }
   });
}




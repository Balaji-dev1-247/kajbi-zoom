<?php 
	session_start();
	/*unset($_SESSION["auth_code"]);
	unset($_SESSION["token"]);*/
?>
<!DOCTYPE html>
<html>
<head>
	<title></title>

	<script src="//maxcdn.bootstrapcdn.com/bootstrap/3.3.0/js/bootstrap.min.js"></script>
	<link href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.0/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css">
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

	<link href="./css/style.css" rel="stylesheet" >
	<script src="//code.jquery.com/jquery-1.11.1.min.js"></script>
	<script src="./js/myscript.js"></script>
	
	<!-- Bootstrap Date-Picker Plugin -->
	<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.15.1/moment.min.js"></script>

	<!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/js/bootstrap.min.js"></script>
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/css/bootstrap.min.css"> -->

	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datetimepicker/4.7.14/css/bootstrap-datetimepicker.min.css">
	<script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datetimepicker/4.7.14/js/bootstrap-datetimepicker.min.js"></script>

</head>
<body>

	<?php $_SESSION["auth_code"] = $_GET['code'];?>
	<div class="container">
	  	<div class="col-md-12" style="text-align: center;padding: 18px;">
	  		<img src="https://ucarecdn.com/8d399f9f-06ba-4a72-8c20-f8c23616008b/-/stretch/off/-/resize/x100/" />
	  	</div>



		<div class="stepwizard col-md-offset-3">
		    <div class="stepwizard-row setup-panel">
		    	<div class="stepwizard-step">
		        	<a href="#step-1" type="button" class="btn btn-primary btn-circle">1</a>
		        	<p>Mentors</p>
		      	</div>

		      	<div class="stepwizard-step">
		        	<a href="#step-2" type="button" class="btn btn-default btn-circle" disabled="disabled">2</a>
		        	<p>Time</p>
		      	</div>

		      	<div class="stepwizard-step">
		        	<a href="#step-3" type="button" class="btn btn-default btn-circle" disabled="disabled">3</a>
		        	<p>Information</p>
		      	</div>
		      	<div class="stepwizard-step">
		        	<a href="#step-4" type="button" class="btn btn-default btn-circle" disabled="disabled">4</a>
		        	<p>Review</p>
		      	</div>
		    </div>
		</div>
  		<?php if(isset($_GET['code'])){?>
		  	<form role="form" action="" method="post">
			    <div class="row setup-content" id="step-1">
			      	<div class="col-xs-6 col-md-offset-3">
			        	<div class="col-md-12">
							<h4> <b>SELECT Webinar</b></h4>
							<div class="alert alert-danger" id="main-error" style="display: none;"></div>
							<div class="alert alert-danger" id="main-nodata" style="display: none;">No Webinar Available</div>
							<ul class="list-group" id="meet-list">
							</ul>

			        	</div>
			        	
			      	</div>
			    </div>


			    <div class="row setup-content" id="step-2">
			      	<div class="col-xs-6 col-md-offset-3">
			        	<div class="col-md-12">

							<h4> <b>Pick Date & Time</b></h4>
						
							<!-- <div class="form-group">
						        <div class='input-group date' id='datetimepicker1'>
						        	<input type='text' class="form-control" id="myDate" />
						          	<span class="input-group-addon">
						            	<span class="glyphicon glyphicon-calendar"></span>
						          	</span>
						        </div>
						    </div> -->
						   
							<div class="row" id="time-details"></div>

			        	</div>
			        	
			      	</div>
			    </div>



			    <div class="row setup-content" id="step-3">
					<div class="col-xs-6 col-md-offset-3">
						<div class="col-md-12">
							<h4><b>PROVIDE YOUR INFORMATION</b></h4>
							<div class="form-group">
								<label class="control-label">Email *</label>
								<input maxlength="100" type="text" required="required" class="form-control" name="email" id="email" />
							</div>

							<div class="form-group">
								<label class="control-label">First Name *</label>
								<input  maxlength="100" type="text" required="required" class="form-control" name="fname" id="fname"/>
							</div>

							<div class="form-group">
								<label class="control-label">Last Name *</label>
								<input maxlength="100" type="text" required="required" class="form-control" name="lname" id="lname"/>
							</div>

							<div class="form-group">
								<label class="control-label">Address</label>
								<textarea class="form-control" id="address" name="address"></textarea>
							</div>
							
							<div class="form-group">
								<label class="control-label">Country </label>
								<input maxlength="100" type="text" class="form-control" name="country" id="country"/>
							</div>	

							<div class="form-group">
								<label class="control-label">State </label>
								<input maxlength="100" type="text" class="form-control" name="state" id="state"/>
							</div>

							<div class="form-group">
								<label class="control-label">City </label>
								<input maxlength="100" type="text" class="form-control" name="city" id="city"/>
							</div>

							<div class="form-group">
								<label class="control-label">Zipcode </label>
								<input maxlength="100" type="text" class="form-control" name="zipcode" id="zipcode"/>
							</div>

							<div class="form-group">
								<label class="control-label">Phone </label>
								<input maxlength="100" type="text" class="form-control" name="phone" id="phone"/>
							</div>
	
							<button class="btn btn-primary nextBtn btn-lg pull-right" type="button" >Next</button>
						</div>
					</div>
			    </div>
			    <div class="row setup-content" id="step-4">
					<div class="col-xs-6 col-md-offset-3">
						<div class="col-md-12">

							<h4>TIME</h4>
							<div class="panel panel-default">
							  <div class="panel-body">
							  	<span id="display-time"></span>
							  </div>
							</div>
							<!-- <h4>MEETING TYPE</h4>
							<div class="panel panel-default">
							  <div class="panel-body">
							  	<span id="display-"></span>
							  </div>
							</div> -->

							<h4> YOUR INFORMATION</h4>
							<div class="alert alert-success" id="alert-success" style="display: none;"></div>
							<div class="alert alert-danger" id="alert-failed" style="display: none;"></div>
							<table class="table">
							    <tbody>
							    <tr>
							        <td>Email</td>
							        <td id="tbl-email"></td>
							      </tr>
							      <tr>
							        <td>First Name</td>
							        <td id="tbl-fname"></td>
							      </tr>
							      <tr>
							        <td>Last Name</td>
							        <td id="tbl-lname"></td>
							      </tr>
							      <tr>
							        <td>Address</td>
							        <td id="tbl-address"></td>
							      </tr>
							      <tr>
							        <td>City</td>
							        <td id="tbl-city"></td>
							      </tr>
							      <tr>
							        <td>State</td>
							        <td id="tbl-state"></td>
							      </tr>
								  <tr>
							        <td>Country</td>
							        <td id="tbl-country"></td>
							      </tr>
							      <tr>
							        <td>Zipcode</td>
							        <td id="tbl-zipcode"></td>
							      </tr>				
							      <tr>
							        <td>Phone Number</td>
							        <td id="tbl-phone"></td>
							      </tr>

							    </tbody>
							 </table>

							<button class="btn btn-success btn-block pull-right submitBtn" type="button">Complete Booking</button>
						</div>
					</div>
			    </div>
		  </form>
  		<?php } ?>
</div>
</body>
</html>



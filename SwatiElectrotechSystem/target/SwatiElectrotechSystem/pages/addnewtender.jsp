<!-- Nav -->
<%
 String username = null;
Cookie[] cookies = request.getCookies();
if(cookies !=null){
for(Cookie cookie : cookies){
    if(cookie.getName().equals("user")) username = cookie.getValue();
}
}
%>

<nav id="nav">
<div class="leftNav">Swati Electrotech</div>
	<ul class="rightNav">
		<li><a href="#/">Home</a></li>
		<li><a href="#/aboutus">About Us</a></li>
		<li class="current"><a href="#/employeepanel">Employee Panel</a></li>
		<%if(username != null && username !="") {%>
		<li><a href="logout">Logout</a></li>
		<%} %>
	</ul>
</nav>
<%if(username != null && username !="") {%>
<nav id="subnav">
	<ul>
		<li><a href="#/employeepanel">Home</a></li>
		<li  class="current"><a href="#/newtenders">New Tenders</a></li>		
		<li><a href="#/tendersinprocess">Tenders in Process</a></li>
		<li><a href="#/worksinprocess">Works in Process</a></li>
		<li><a href="#/workscompleted">Works completed</a></li>
	</ul>
</nav>

<!-- Banner -->

<!-- Main -->
<div id="main-wrapper" ng-controller="PageCtrl">
	<div id="main" class="container">
		<div class="row 200%">
			<div class="12u">

				<section class="box highlight">
					<header>
						
					</header>
					<h3>
						<font color="#428bca"> Add New Tender</font>
					</h3>
					<form role="form" action="Event" method="POST">

						<label for="name">Name of Customer<font color="red">*</font></label>
						<input type="text" name="nameofcustomer" class="form-control"
							id="nameofcustomer" required="required"
							placeholder="name of customer"> <label> </label> <label
							for="address">Address of Customer<font color="red">*</font></label>
						<textarea name="addressofcustomer" class="form-control"
							id="addressofcustomer" required="required"
							placeholder="Address of customer"></textarea>
						<label> </label> <label for="contactperson">Name and No.
							of Contact person <font color="red">*</font>
						</label>
						<textarea name="contactperson" class="form-control" rows="6"
							id="contactperson" required="required"
							placeholder="contact person details"></textarea>
						<label> </label> <label for="tenderno">Tender No.<font
							color="red">*</font></label> <input type="number" name="tenderno"
							class="form-control" id="tenderno" required="required"
							placeholder="Tender No."> <label> </label> <label
							for="prequalification">Pre Qualification Criteria<font
							color="red">*</font></label>
						<textarea name="prequalification" class="form-control" rows="6"
							id="prequalification" required="required"
							placeholder="Pre Qualification criteria"></textarea>
						<label> </label> <label for="prebidmeetingdate">Prebid
							Meeting Date<font color="red">*</font>
						</label> <input type="date" name="prebidmeetingdate" class="form-control"
							id="prebidmeetingdate" required="required"
							placeholder="Prebid Meeting Date"> <label> </label> <label
							for="tenderduedate">Tender due date<font color="red">*</font></label>
						<input type="date" name="tenderduedate" class="form-control"
							id="tenderduedate" required="required"
							placeholder="Tender Due Date"> <label> </label> <label
							for="tenderfee">Tender Fee<font color="red">*</font></label> <input
							type="number" name="tenderfee" class="form-control"
							id="tenderfee" required="required" placeholder="Tender fee.">
						<label> </label> <label for="tenderpurchaseduedate">Tender
							purchase due date<font color="red">*</font>
						</label> <input type="date" name="tenderpurchaseduedate"
							class="form-control" id="tenderpurchaseduedate"
							required="required" placeholder="Tender Purchase Due Date">
						<label> </label> <label for="emdamount">EMD amount<font
							color="red">*</font></label> <input type="number" name="emdamount"
							class="form-control" id="emdamount" required="required"
							placeholder="EMD Amount"> <label> </label> <label
							for="bgacceptable">BG is acceptable or not<font
							color="red">*</font></label> <input type="text" name="bgacceptable"
							class="form-control" id="bgacceptable" required="required"
							placeholder="BG acceptable or not"> <label> </label> <label
							for="estimatedvalue">Estimated value<font color="red">*</font></label>
						<input type="text" name="estimatedvalue" class="form-control"
							id="estimatedvalue" required="required"
							placeholder="Estimated Value"> <label> </label> <label
							for="tendersubmission">Tender submission Online/Manual<font
							color="red">*</font></label> <input type="text" name="tendersubmission"
							class="form-control" id="tendersubmission" required="required"
							placeholder="Tender submission Online/Manual"> <label>
						</label> <label for="paymentterms">Payment terms<font color="red">*</font></label>
						<textarea name="paymentterms" class="form-control" rows="6"
							id="paymentterms" required="required" placeholder="Payment terms"></textarea>
						<label> </label> <label for="offervalidity">Offer validity<font
							color="red">*</font></label> <input type="text" name="offervalidity"
							class="form-control" id="offervalidity" required="required"
							placeholder="Offer validity"> <label> </label> <label
							for="guranteeperiod">Guarantee period<font color="red">*</font></label>
						<input type="text" name="guranteeperiod" class="form-control"
							id="guranteeperiod" required="required"
							placeholder="Guarantee period"> <label> </label> <label
							for="deliveryperiod">Delivery period<font color="red">*</font></label>
						<input type="text" name="deliveryperiod" class="form-control"
							id="deliveryperiod" required="required"
							placeholder="Delivery period"> <label> </label> <label
							for="performanceguarantee">Performance Guarantee<font
							color="red">*</font></label>
						<textarea name="performanceguarantee" class="form-control"
							rows="6" id="performanceguarantee" required="required"
							placeholder="Performance guarantee"></textarea>
						<label> </label> <label for="specialtc">Special Terms and
							conditions<font color="red">*</font>
						</label>
						<textarea name="specialtc" class="form-control" rows="6"
							id="specialtc" required="required"
							placeholder="Special Terms and conditions"></textarea>
						<label> </label> <label for="specialdocs">Special
							documents need to attach<font color="red">*</font>
						</label>
						<textarea name="specialdocs" class="form-control" rows="6"
							id="specialdocs" required="required"
							placeholder="Special documents need to attach"></textarea>
						<label> </label> <label for="scopeofwork">Scope of work<font
							color="red">*</font></label>
						<textarea name="scopeofwork" class="form-control" rows="6"
							id="scopeofwork" required="required" placeholder="Scope of work"></textarea>
						<label> </label> <label for="preparedby">Performance
							Guarantee<font color="red">*</font>
						</label>
						<textarea name="preparedby" class="form-control" rows="6"
							id="preparedby" required="required"
							placeholder="Sheet Prepared by"></textarea>
						<label> </label> <font color="red">* Mandatory</font> <label>
						</label>
						<button type="submit" class="btn btn-primary">Add Tender!</button>

					</form>
				
					
				<%} else { %>
					<form role="form" action="login" method="POST">
						<label for="username">Name</label> <input type="text"
							name="username" class="form-control" id="username"
							placeholder="User Name"> <label> </label> <label
							for="password">Password</label> <input type="password"
							name="password" class="form-control" id="password"
							placeholder="Password"> <font color="red">*
							Mandatory</font> <label> </label>
						<button type="submit" class="btn btn-primary">Login</button>
					</form>
					<%} %>

				</section>

			</div>
		</div>
	</div>
</div>

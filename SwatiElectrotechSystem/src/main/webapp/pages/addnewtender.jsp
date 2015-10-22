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
							placeholder="name of customer"> <label> </label> 
							
						<label	for="scopeOfWork">Scope Of Work<font color="red">*</font></label>
						<textarea name="scopeOfWork" class="form-control"
							id="scopeOfWork" required="required"
							placeholder="Scope Of Work"></textarea>
						<label> </label> 
						
						<label for="estimatedValue">Estimated Value<font color="red">*</font></label>
						<input type="text" name="estimatedValue" class="form-control" 
							id="estimatedValue" required="required"
							placeholder="Estimated Value">
						<label> </label> 
						
						<label for="dueDate">Due Date<font color="red">*</font></label> 
						<input type="date" name="dueDate" class="form-control" id="dueDate" required="required"
							placeholder="Due Date"> <label> </label>
							
						<label for="emd">EMD<font color="red">*</font></label>
						<input type="text" name="emd" class="form-control" 
							id="emd" required="required"
							placeholder="EMD">
						<label> </label> 
						
						<label for="interested">Interested?<font color="red">*</font>
						</label> <input type="checkbox" name="interested" class="form-control"
							id="interested" required="required"
							placeholder="Interested"> <label> </label>
							
						<label for="statusOfTender">Status Of tender<font color="red">*</font></label>
						<input type="text" name="statusOfTender" class="form-control"
							id="statusOfTender" required="required"
							placeholder="Status Of Tender"> <label> </label> 
							
						<label for="systemEnteredDate">System Entered Date<font color="red">*</font></label> 
						<input type="date" name="systemEnteredDate" class="form-control"
							id="systemEnteredDate" required="required" placeholder="System Entered Date">
						<label> </label> 
						
						<label for="tenderSubmitted">Tender Submitted<font color="red">*</font>	</label> 
						<input type="checkbox" name="tenderSubmitted"
							class="form-control" id="tenderSubmitted"
							required="required" placeholder="Tender Submitted">
						<label> </label> 
						
						<label for="tenderSubmittedDate">Tender Submitted Date<font color="red">*</font></label> 
						<input type="date" name="tenderSubmittedDate"
							class="form-control" id="tenderSubmittedDate" required="required"
							placeholder="Tender Submitted Date"> <label> </label> 
							
						<label for="technicalBidOpened">Technical Bid Opened<font color="red">*</font></label> 
						<input type="checkbox" name="technicalBidOpened" class="form-control" id="technicalBidOpened" required="required"
							placeholder="Technical Bid Opened"> <label> </label> 
							
						<label for="technicalBidOpeningDate">Technical Bid Opening Date<font color="red">*</font></label>
						<input type="date" name="technicalBidOpeningDate" class="form-control"
							id="technicalBidOpeningDate" required="required"
							placeholder="Technical Bid Opening Date"> <label> </label> 
							
						<label for="technicallyQualified">Technically Qualified<font color="red">*</font></label> 
						<input type="checkbox" name="technicallyQualified"
							class="form-control" id="technicallyQualified" required="required"
							placeholder="Technically Qualified"> <label>
						</label> 
						
						<label for="priceBidOpened">Price Bid Opened<font color="red">*</font></label>
						<input type="checkbox" name="priceBidOpened" class="form-control" 
							id="priceBidOpened" required="required" placeholder="price Bid Opened">
						<label> </label> 
						
						<label for="priceBidOpenedDate">Price Bid Opened Date<font color="red">*</font></label> 
						<input type="text" name="priceBidOpenedDate" class="form-control" id="priceBidOpenedDate" required="required"
							placeholder="Price Bid Opened Date"> <label> </label> 
							
						<label for="lowestBidder">Lowest Bidder<font color="red">*</font></label>
						<input type="checkbox" name="lowestBidder" class="form-control"
							id="lowestBidder" required="required"
							placeholder="Lowest Bidder"> <label> </label><!--  <label
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
 -->						<button type="submit" class="btn btn-primary">Add Tender!</button>

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

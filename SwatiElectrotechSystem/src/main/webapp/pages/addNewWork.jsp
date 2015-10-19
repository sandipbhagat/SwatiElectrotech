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
		<li class="current"><a href="#/newtenders">New Tenders</a></li>
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
					<header> </header>
					<h3>
						<font color="#428bca">Add New Work</font>
					</h3>
					<form role="form" action="Event" method="POST">

						<label for="name">Name of Customer<font color="red">*</font></label>
						<input type="text" name="nameofcustomer" class="form-control"
							id="nameofcustomer" required="required"
							placeholder="Name of customer"> <label> </label> 
						<label for="scopeofwork">Scope of Work<font color="red">*</font></label>
						<textarea name="scopeOfWork" class="form-control"
							id="scopeOfWork" required="required"
							placeholder="Scope Of Work"></textarea>
						<label> </label> <label for="workOrderStatus">Work Order Status<font color="red">*</font>
						</label>
						<textarea name="workOrderStatus" class="form-control" rows="6"
							id="workOrderStatus" required="required"
							placeholder="Work Order Status"></textarea>
						<label> </label> <label for="workOrderNumber">Work Order Number<font
							color="red">*</font></label> <input type="number" name="workOrderNumber"
							class="form-control" id="workOrderNumber" required="required"
							placeholder="Work Order Number"> <label> </label> 
							<label for="workOrderDate">Date of Work Order<font
							color="red">*</font></label>
						<input type="date" name="workOrderDate" class="form-control" 
							id="workOrderDate" required="required"	placeholder="Date of Work Order">
						<label> </label> 
						
						<label for="valueOfWork">Value of Work<font color="red">*</font>
						</label> <input type="text" name="valueOfWork" class="form-control"
							id="valueOfWork" required="required" placeholder="Value of Work"> <label> </label> 

						<label for="formalitiesCompleted">Are Formalities Completed?<font color="red">*</font></label>
						<input type="checkbox" name="formalitiesCompleted" class="form-control"
							id="formalitiesCompleted" required="required"
							placeholder="Formalities Completed"> <label> </label> 
							
						<label for="securityDepositBGAmount">Security Deposit BG Amount<font color="red">*</font></label> 
						<input type="text" name="securityDepositBGAmount" class="form-control"
							id="securityDepositBGAmount" required="required" placeholder="Security Deposit BG Amount">
						<label> </label> 
						
						<label for="securityDeposityBGDate">Security Deposit BG Date<font color="red">*</font></label> 
						<input type="date" name="securityDeposityBGDate" class="form-control" id="securityDeposityBGDate"
							required="required" placeholder="Security Deposit BG Date">	<label> </label> 
							
						<label for="validityOfSecurityDepositBG">Validity Of Security Deposit BG<font color="red">*</font></label>
						<input type="date" name="validityOfSecurityDepositBG" class="form-control" id="validityOfSecurityDepositBG" required="required"
							placeholder="Validity Of Security Deposit BG"> <label> </label> 
						
						<label for="dateOfWorkCompletionAsPerWorkOrder">Date of Work Completion as per work Order<font color="red">*</font></label> 
						<input type="date" name="dateOfWorkCompletionAsPerWorkOrder" class="form-control" id="dateOfWorkCompletionAsPerWorkOrder" required="required"
							placeholder="Date of Work Completion as per work Order"> <label> 
							
						</label> <label	for="dateOfInspection">Date Of Inspection<font color="red">*</font></label>
						<input type="date" name="dateOfInspection" class="form-control"	id="dateOfInspection" required="required"
							placeholder="Date Of Inspection"> <label> </label> 
						
						<label for="dateOfMaterialDelivery">Date Of Material Delivery<font color="red">*</font>	</label> 
						<input type="date" name="dateOfMaterialDelivery" class="form-control" id="dateOfMaterialDelivery" required="required"
							placeholder="Date Of Material Delivery"> <label>	</label> 
						
						<label for="dateOfWorkCompletion">Date of Work Completion<font color="red">*</font></label>
						<input type="date" name="dateOfWorkCompletion" class="form-control"
							id="dateOfWorkCompletion" required="required" placeholder="Date Of Work Completion">
						<label> </label> 
						
						<label for="projectCompletedInTime">Project Completed in Time<font color="red">*</font></label> 
						<input type="checkbox" name="projectCompletedInTime" class="form-control" id="projectCompletedInTime" required="required"
							placeholder="Project Completed in Time"> <label> </label> 
							
						<label for="expensesMadeAsOnDate">Expenses made as On Date<font color="red">*</font></label>
						<input type="text" name="expensesMadeAsOnDate" class="form-control"	id="expensesMadeAsOnDate" required="required"
							placeholder="Expenses made as On Date"> <label> </label> 
							
						<label for="invoiceNumber">Invoice Number<font color="red">*</font></label>
						<input type="text" name="invoiceNumber" class="form-control"
							id="invoiceNumber" required="required"
							placeholder="Invoice Number"> <label> </label> 
							
						<label for="dateOfInvoice">Date of Invoice<font	color="red">*</font></label>
						<input type="date" name="dateOfInvoice" class="form-control"
							id="dateOfInvoice" required="required"	placeholder="Date Of Invoice">					
						<label> </label> 
						
						<label for="dateOfReceiptOfPayment">Date Of Receipt Of payment<font color="red">*</font>
						</label>
						<input type="date" name="dateOfReceiptOfPayment" class="form-control" 
							id="dateOfReceiptOfPayment" required="required"
							placeholder="Date Of Receipt Of payment">
						<label> </label> 
						
						<label for="workCompletedInAllRespect">Work Completed In All Respect<font color="red">*</font>
						</label>
						<input type="checkbox" name="workCompletedInAllRespect" class="form-control" 	id="workCompletedInAllRespect" required="required"
							placeholder="Work Completed In All Respect">
							
						<label> </label> 
						<button type="submit" class="btn btn-primary">Add work!</button>

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

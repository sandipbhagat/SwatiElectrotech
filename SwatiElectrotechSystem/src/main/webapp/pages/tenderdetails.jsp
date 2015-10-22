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
		<li  class="current"><a href="#/employeepanel">Home</a></li>
		<li><a href="#/newtenders">New Tenders</a></li>		
		<li><a href="#/tendersinprocess">Tenders in Process</a></li>
		<li><a href="#/worksinprocess">Works in Process</a></li>
		<li><a href="#/workscompleted">Works completed</a></li>
	</ul>
</nav>

<!-- Banner -->

<!-- Main -->
<div id="main-wrapper" ng-controller="tenderDetailsCtrl">
	<div id="main" class="container">
		<div class="row 200%">
			<div class="12u">

				<section class="box highlight">
					<header>
						<h2>Tenders</h2>
					</header>

					<h3>
						<font color="#428bca">Tender Details</font>
					</h3>
					
					<a href='#/addnewtender' class='Button' tabindex='0'>Edit this Tender !</a>
					<br>
				     	Tender Id: {{selectedTender.id}}<br>
				     	Customer: {{selectedTender.nameOfCustomer}}	<br>		
						Scope of Work: {{selectedTender.scopeOfWork}} <br>
						Estimated value: {{selectedTender.estimatedValue}}<br>
						Due Date: {{selectedTender.dueDate}} <br>
						EMD:  {{selectedTender.emd}} <br>
						Interested: {{selectedTender.interested}}<br> 
					

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

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
	<%if(username != null && username !="") {%>
		<li><a href="#/employeepanel">Dashboard</a></li>
		<li class="current"><a href="#/newtenders">New Tenders</a></li>
		<li><a href="#/tendersinprocess">Tenders In Process</a></li>
		<li><a href="#/worksinprocess">Works In Process</a></li>
		<li><a href="#/workscompleted">Works Completed</a></li>
		<li><a href="#">Analysis</a></li>
		<li><a href="logout">Logout</a></li>
		<%} else { %>
				<li ><a href="#/loginpanel">Login</a></li>			
		<%} %>
	</ul>
</nav>
<%if(username != null && username !="") {%>
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
					
					<a href='#/updatetender' class='Button' tabindex='0'>Edit this Tender !</a>
					<br>
				     	Tender Id: {{selectedTender.id}}<br>
				     	Customer: {{selectedTender.nameOfCustomer}}	<br>		
						Scope of Work: {{selectedTender.scopeOfWork}} <br>
						Estimated value: {{selectedTender.estimatedValue}}<br>
						Due Date: {{selectedTender.dueDate}} <br>
						EMD:  {{selectedTender.emd}} <br>
						Interested: {{selectedTender.interested}}<br> 

				</section>

			</div>
		</div>
	</div>
</div>

<%} else { %>
	<jsp:include page="loginpanel.jsp" />
	<%} %>

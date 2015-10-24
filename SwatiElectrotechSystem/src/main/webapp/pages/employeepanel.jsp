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
		<li class="current"><a href="#/employeepanel">Dashboard</a></li>
		<li><a href="#/newtenders">New Tenders</a></li>
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
<div id="main-wrapper" ng-controller="homeCtrl" >
	<div id="main" class="container">
		<div class="row 200%">
			<div class="12u">

				<section class="box highlight">
					<header>
						<h2>Tenders</h2>
					</header>
					<h3>
						<font color="#428bca">New Tenders Details</font>
					</h3>
					<br>
					<div style="position:relative; padding-top: 10px;">
					  <div style="width:1200px;">
					    <div id="newTendersGrid" style="width:100%;height:500px;"></div>
					    <div id="pager" style="width:100%;height:20px;"></div>
					  </div>
					</div>
					<h3>
						<font color="#428bca">Work in Progress Details</font>
					</h3>
					<div style="position:relative; padding-top: 10px;">
					  <div style="width:1200px;">
					    <div id="worksGrid" style="width:100%;height:500px;"></div>
					    <div id="pager1" style="width:100%;height:20px;"></div>
					  </div>
					</div>
				</section>

			</div>
		</div>
	</div>
</div>

<%} else { %>
	<jsp:include page="loginpanel.jsp" />
	<%} %>

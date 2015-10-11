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
		<li><a href="#/newtenders">New Tenders</a></li>		
		<li  class="current"><a href="#/tendersinprocess">Tenders in Process</a></li>
		<li><a href="">Works in Process</a></li>
		<li><a href="">Works completed</a></li>
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
						<h2>Tenders in Process</h2>
					</header>

<!-- 									
					<table st-table="rowCollection" class="table table-striped" style="display:table; ">
					<thead>
					<tr>
				          <th st-sort="tenderId" width="100px" title="tenderId">Tender Id</th>
				          <th st-sort="nameOfCustomer" width="100px" title="nameOfCustomer">Name of customer</th>
				          <th st-sort="scopeOfWork" width="100px" title="scopeOfWork">Scope of work</th>
				          <th st-sort="estimatedValue" width="100px" title="estimatedValue">Estimated value</th>
				          <th st-sort="dueDate" width="100px" title="dueDate">Due Date</th>
				          <th st-sort="emd" width="100px" title="emd">EMD</th>
				          <th st-sort="interested" width="100px" title="interested">Interested</th>
				          
				          <th st-sort="statusOfTender" width="100px" title="statusOfTender">Status of Tender</th>
				          <th st-sort="systemEnteredDate" width="100px" title="systemEnteredDate">Entered Date</th>
				          <th st-sort="tenderSubmitted" width="100px" title="tenderSubmitted">Tender Submitted</th>
				          <th st-sort="tenderSubmittedDate" width="100px" title="tenderSubmittedDate">Submitted Date</th>
				          <th st-sort="technicalBidOpened" width="100px" title="technicalBidOpened">Tech Bid Opened</th>
				          <th st-sort="technicalBidOpeningDate" width="100px" title="technicalBidOpeningDate">Tech Bid Openning Date</th>
				          <th st-sort="technicallyQualified" width="100px" title="technicallyQualified">Technically Qualified</th>
				          <th st-sort="priceBidOpened" width="100px" title="priceBidOpened">Price Bid Opened</th>
				          <th st-sort="priceBidOpeningDate" width="100px" title="priceBidOpeningDate">Price Bid Opening Date</th>
				          <th st-sort="lowestBidder" width="100px" title="lowestBidder">We Lowest Bidder</th>
				          <th width="50px"></th><th width="50px"></th>
				          <th width="50px">
				           <button type="button" ng-click="exportTendersData()" class="btn btn-sm btn-danger" title="Xls Export">
								<i class="glyphicon glyphicon-export">
								</i>
							</button>
				          </th>
					</tr>
					<tr>
				          <th width="100px"><input placeholder="search tenderId" st-search="tenderId" /></th>
				          <th width="100px"><input placeholder="search Name" st-search="nameOfCustomer" /></th>
				          <th width="100px"><input placeholder="search scope" st-search="scopeOfWork" /></th>
				          <th width="100px"><input placeholder="search estimate" st-search="estimatedValue" /></th>
				          <th width="100px"><input placeholder="search dueDate" st-search="dueDate" /></th>
				          <th width="100px"><input placeholder="search emd" st-search="emd" /></th>
				          <th width="100px"><input placeholder="search interested" st-search="interested" /></th>
				          
				          <th width="100px"><input placeholder="search " st-search="statusOfTender" /></th>
				          <th width="100px"><input placeholder="search " st-search="systemEnteredDate" /></th>
				          <th width="100px"><input placeholder="search " st-search="tenderSubmitted" /></th>
				          <th width="100px"><input placeholder="search " st-search="tenderSubmittedDate" /></th>
				          <th width="100px"><input placeholder="search " st-search="technicalBidOpened" /></th>
				          <th width="100px"><input placeholder="search " st-search="technicalBidOpeningDate" /></th>
				          <th width="100px"><input placeholder="search " st-search="technicallyQualified" /></th>
				          <th width="100px"><input placeholder="search " st-search="priceBidOpened" /></th>
				          <th width="100px"><input placeholder="search " st-search="priceBidOpeningDate" /></th>
				          <th width="100px"><input placeholder="search " st-search="lowestBidder" /></th>
				          
				          <th width="50px"></th><th width="50px"></th><th width="50px"></th>
					</tr>
					</thead>
					<tbody style="width: inherit; overflow: scroll;">
					<tr ng-repeat="row in rowCollection">
				          <td width="100px" title={{row.tenderId}}>{{row.tenderId}}</td>
				          <td width="100px" title={{row.nameOfCustomer}}>{{row.nameOfCustomer | uppercase}}</td>
				          <td width="100px" title={{row.scopeOfWork}}>{{row.scopeOfWork}}</td>
				          <td width="100px" title={{row.estimatedValue}}>{{row.estimatedValue}}</td>
				          <td width="100px" title={{row.dueDate}}>{{row.dueDate}}</td>
				          <td width="100px" title={{row.emd}}>{{row.emd}}</td>
				          <td width="100px" title={{row.interested}}>{{row.interested}}</td>
				          
				          <td width="100px" title={{row.interested}}>{{row.interested}}</td>
				          <td width="100px" title={{row.interested}}>{{row.interested}}</td>
				          <td width="100px" title={{row.interested}}>{{row.interested}}</td>
				          <td width="100px" title={{row.interested}}>{{row.interested}}</td>
				          <td width="100px" title={{row.interested}}>{{row.interested}}</td>
				          <td width="100px" title={{row.interested}}>{{row.interested}}</td>
				          <td width="100px" title={{row.interested}}>{{row.interested}}</td>
				          <td width="100px" title={{row.interested}}>{{row.interested}}</td>
				          <td width="100px" title={{row.interested}}>{{row.interested}}</td>
				          <td width="100px" title={{row.interested}}>{{row.interested}}</td>
				          
						 <td width="50px">
							<button type="button" ng-click="" class="btn btn-sm btn-danger" title="View Details">
								<i class="glyphicon glyphicon-expand">
								</i>
							</button>
						  </td>
						  <td width="50px">
							<button type="button" ng-click="" class="btn btn-sm btn-danger" title="Edit">
								<i class="glyphicon glyphicon-edit">
								</i>
							</button>
						  </td>
				          <td width="50px">
							<button type="button" confirmed-click="removeRow(row)" ng-confirm-click="Would you really want to delete this?" class="btn btn-sm btn-danger" title="Delete">
								<i class="glyphicon glyphicon-remove-circle">
								</i>
							</button>
						  </td>		
					</tr>
					</tbody>
					<tfoot>
						<tr>
							<td colspan="5" class="text-center">
								<div st-pagination="" st-items-by-page="itemsByPage" st-displayed-pages="7"></div>
							</td>
						</tr>
					</tfoot>
				</table>
		 -->			
					
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

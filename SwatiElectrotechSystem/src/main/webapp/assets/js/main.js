
(function($) {

	skel
		.breakpoints({
			desktop: '(min-width: 737px)',
			tablet: '(min-width: 737px) and (max-width: 1200px)',
			mobile: '(max-width: 736px)'
		})
		.viewport({
			breakpoints: {
				tablet: {
					width: 1080
				}
			}
		});

	$(function() {

		var	$window = $(window),
			$body = $('body');

		// Disable animations/transitions until the page has loaded.
			$body.addClass('is-loading');

			$window.on('load', function() {
				$body.removeClass('is-loading');
			});

		// Fix: Placeholder polyfill.
			$('form').placeholder();

		// Prioritize "important" elements on mobile.
			skel.on('+mobile -mobile', function() {
				$.prioritize(
					'.important\\28 mobile\\29',
					skel.breakpoint('mobile').active
				);
			});

		// CSS polyfills (IE<9).
			if (skel.vars.IEVersion < 9)
				$(':last-child').addClass('last-child');

		// Dropdowns.
			$('#nav > ul').dropotron({
				mode: 'fade',
				noOpenerFade: true,
				speed: 300,
				alignment: 'center'
			});

		// Off-Canvas Navigation.

			// Title Bar.
				$(
					'<div id="titleBar">' +
						'<a href="#navPanel" class="toggle"></a>' +
						'<span class="title">' + $('#logo').html() + '</span>' +
					'</div>'
				)
					.appendTo($body);

			// Navigation Panel.
				$(
					'<div id="navPanel">' +
						'<nav>' +
							$('#nav').navList() +
						'</nav>' +
					'</div>'
				)
					.appendTo($body)
					.panel({
						delay: 500,
						hideOnClick: true,
						hideOnSwipe: true,
						resetScroll: true,
						resetForms: true,
						side: 'left',
						target: $body,
						visibleClass: 'navPanel-visible'
					});

			// Fix: Remove navPanel transitions on WP<10 (poor/buggy performance).
				if (skel.vars.os == 'wp' && skel.vars.osVersion < 10)
					$('#titleBar, #navPanel, #page-wrapper')
						.css('transition', 'none');

	});

})(jQuery);

var app = angular.module('swatielectrotech', [
                                   'ngRoute', 'ui.bootstrap'
                                 ]);

                                 /**
                                  * Configure the Routes
                                  */
                                 app.config(['$routeProvider', function ($routeProvider) {
                                   $routeProvider
                                     // Home
                                     .when("/", {templateUrl: "pages/home.html", controller: "PageCtrl"})
                                     // Pages
                                     .when("/aboutus", {templateUrl: "pages/aboutus.html", controller: "PageCtrl"})
                                     .when("/loginpanel", {templateUrl: "pages/loginpanel.jsp", controller: "PageCtrl"})
                                     .when("/employeepanel", {templateUrl: "pages/employeepanel.jsp", controller: "homeCtrl"})                                     
                                     .when("/addnewtender", {templateUrl: "pages/addnewtender.jsp", controller: "PageCtrl"})
                                     .when("/newtenders", {templateUrl: "pages/newtenders.jsp", controller: "NewTendersCtrl"})
                                     .when("/tendersinprocess", {templateUrl: "pages/tendersinprocess.jsp", controller: "tendersInProcessCtrl"})
                                     .when("/tenderDetails", {templateUrl: "pages/tenderdetails.jsp", controller: "NewTendersCtrl"})
                                     .when("/worksinprocess", {templateUrl: "pages/worksinprocess.jsp", controller: "worksCtrl"})
                                     .when("/workscompleted", {templateUrl: "pages/workscompleted.jsp", controller: "worksCompletedCtrl"})
                                     .when("/addnewwork", {templateUrl: "pages/addNewWork.jsp", controller: "PageCtrl"})
                                     // else 404 
                                     .otherwise("/404", {templateUrl: "partials/404.html", controller: "PageCtrl"});
                                 }]);
                                 
 /**
  * Controls all other Pages
  */
                                 
     app.factory('tenderService', function() {
    	 var Data = {};
    	 function set(data) {
    	   Data = data;
    	 }
    	 function get() {
    	  return Data;
    	 }

    	 return {
    	  set: set,
    	  get: get
    	 };

    	});
     
 app.controller('PageCtrl', [function($scope) {
	
	
	}]);

 
 app.filter('offset', function() {
	  return function(input, start) {
	    start = parseInt(start, 10);
	    return input.slice(start);
	  };
	});

	  app.controller('NewTendersCtrl', ['$scope','$http','$location', 'tenderService', function( $scope, $http, $location, tenderService) {

		  $scope.exportTendersData = function() {		         
		                 alasql('SELECT * INTO XLSX("TendersDataExport.xlsx",{headers:true}) FROM ?',[$scope.collection]);		        
		  };
		  
		  $scope.selectedTender = tenderService.get();
		  
		  $scope.viewTenderDetails = function (item) {
			  tenderService.set(item),
			  $location.path('/tenderDetails');			 
		    };
		 
		 //Slick Grid Code

		    var dataView;
		    var grid;
		    var data = [];
		   
		    var options = {
		      enableCellNavigation: true,
		      showHeaderRow: true,
		      headerRowHeight: 40,
		      multiColumnSort: true,
		      explicitInitialization: true
		    },
		    indices, isAsc = true, currentSortCol = { id: "title" };
		    
		    function viewformatter(row, cell, value, columnDef, dataContext) {
		        return value;
		    }
		    
		    var columns = [
		                   { id: "id", name: "Tender ID", field: "id", width: 100, sortable: true },
		                   { id: "nameOfCustomer", name: "Name Of Customer", field: "nameOfCustomer", width: 240, sortable: true },
		                   { id: "scopeOfWork", name: "Scope of Work", field: "scopeOfWork", width: 240, sortable: true },
		                   { id: "estimatedValue", name: "Estimated Value", field: "estimatedValue", width: 240, sortable: true },
		                   { id: "dueDate", name: "Due Date", field: "dueDate", width: 120, sortable: true },
		                   { id: "emd", name: "EMD", field: "emd", width: 100, sortable: true },
		                   { id: "interested", name: "Interested", field: "interested", width: 120, formatter: Slick.Formatters.Checkmark, sortable: true },
		                   { id: "view", name: "Details", field: "view", width: 120, formatter: viewformatter}
		                 ];
		    var columnFilters = {};

		    function filter(item) {
		      for (var columnId in columnFilters) {
		        if (columnId !== undefined && columnFilters[columnId] !== "") {
		          var c = grid.getColumns()[grid.getColumnIndex(columnId)];
		          if ( ! (item[c.field].toString().toLowerCase().indexOf(columnFilters[columnId].toString().toLowerCase())  > -1 ) ) {
		            return false;
		          }
		        }
		      }
		      return true;
		    }

		      $.getJSON('http://localhost:8080/SwatiElectrotechSystem/tender/list', function(data) {

		    	  		dataView = new Slick.Data.DataView();
					      
					      grid = new Slick.Grid("#newTendersGrid", dataView, columns, options);
					      dataView.onRowCountChanged.subscribe(function (e, args) {
					        grid.updateRowCount();
					        grid.render();
					      });
					      dataView.onRowsChanged.subscribe(function (e, args) {
					        grid.invalidateRows(args.rows);
					        grid.render();
					      });
					      $(grid.getHeaderRow()).delegate(":input", "change keyup", function (e) {
					        var columnId = $(this).data("columnId");
					        if (columnId != null) {
					          columnFilters[columnId] = $.trim($(this).val());
					          dataView.refresh();
					        }
					      });
					      grid.onHeaderRowCellRendered.subscribe(function(e, args) {
					          $(args.node).empty();
					          $("<input type='text'>")
					             .data("columnId", args.column.id)
					             .val(columnFilters[args.column.id])
					             .appendTo(args.node);
					      });
					  		    
					      var pager = new Slick.Controls.Pager(dataView, grid, $("#pager"));

					      
					      grid.onSort.subscribe(function (e, args) {
					    	  sortcol = args.sortCols[0].sortCol.field;
					    	  dataView.sort(comparer, args.sortCols[0].sortAsc);
					    	});

					    	function comparer(a, b) {
					    	  var x = a[sortcol], y = b[sortcol];
					    	  return (x == y ? 0 : (x > y ? 1 : -1));
					    	}
					      var gridData = [];
					      
					      for(var i=0; i < data.length; i++ )
					    	  {
					    	  		gridData[i] = {
					    	  			id : data[i].id,
					    	  			nameOfCustomer : data[i].id,
					    	  			scopeOfWork : data[i].scopeOfWork,
					    	  			estimatedValue : data[i].estimatedValue,
					    	  			dueDate : data[i].dueDate,
					    	  			emd : data[i].emd,
					    	  			interested : data[i].interested,
					    	  			view : "<button type='button' onclick='$scope.viewTenderDetails(data[i])' class='btn btn-link'>Link</button>"
					    	  		};
					    	  }
					      	
					    	grid.init();
				    	    dataView.beginUpdate();
				    	    dataView.setItems(gridData);
				    	    dataView.setFilter(filter);
				    	    dataView.endUpdate();

		    });
		    //Slick Grid Ends
		    
	    }])	    	    

	  app.controller('homeCtrl', ['$scope','$http','$location', 'tenderService', function( $scope, $http, $location, tenderService) {

		  $scope.exportTendersData = function() {		         
		                 alasql('SELECT * INTO XLSX("TendersDataExport.xlsx",{headers:true}) FROM ?',[$scope.collection]);		        
		  };
		  
		  $scope.selectedTender = tenderService.get();
		  
		  $scope.viewTenderDetails = function (item) {
			  tenderService.set(item),
			  $location.path('/tenderDetails');			 
		    };
		 
		 //Slick Grid Code

		    var dataView;
		    var dataViewWork;
		    var grid;
		    var gridWork;
		    var data = [];
		    var dataWork = [];
		   
		    var options = {
		      enableCellNavigation: true,
		      showHeaderRow: true,
		      headerRowHeight: 40,
		      multiColumnSort: true,
		      explicitInitialization: true
		    },
		    indices, isAsc = true, currentSortCol = { id: "title" };
		    var columns = [
		                   { id: "id", name: "Tender ID", field: "id", width: 100, sortable: true },
		                   { id: "nameOfCustomer", name: "Name Of Customer", field: "nameOfCustomer", width: 240, sortable: true },
		                   { id: "scopeOfWork", name: "Scope of Work", field: "scopeOfWork", width: 240, sortable: true },
		                   { id: "estimatedValue", name: "Estimated Value", field: "estimatedValue", width: 240, sortable: true },
		                   { id: "dueDate", name: "Due Date", field: "dueDate", width: 120, sortable: true },
		                   { id: "emd", name: "EMD", field: "emd", width: 100, sortable: true },
		                   { id: "interested", name: "Interested", field: "interested", width: 120, formatter: Slick.Formatters.Checkmark, sortable: true }
		                 ];
		    var worksColumns = [
		                   { id: "id", name: "Tender ID", field: "id", width: 100, sortable: true },
		                   { id: "workdId", name: "Work ID", field: "workdId", width: 240, sortable: true },
		                   { id: "nameOfCustomer", name: "Name Of Customer", field: "nameOfCustomer", width: 240, sortable: true },
		                   { id: "scopeOfWork", name: "Scope of Work", field: "scopeOfWork", width: 240, sortable: true },
		                   { id: "workOrderStatus", name: "Status", field: "workOrderStatus", width: 240, sortable: true },
		                   { id: "workOrderNumber", name: "Work Order Number", field: "workOrderNumber", width: 240, sortable: true },
		                   { id: "workOrderDate", name: "Date", field: "workOrderDate", width: 100, sortable: true },
		                   { id: "valueOfWork", name: "Value", field: "valueOfWork", width: 120, formatter: Slick.Formatters.Checkmark, sortable: true },
		                   { id: "formalitiesCompleted", name: "Formalities Completed", field: "formalitiesCompleted", width: 240, sortable: true },
		                   { id: "securityDepositBGAmount", name: "SD BG Amount", field: "securityDepositBGAmount", width: 240, sortable: true },
		                   { id: "securityDepositBGDate", name: "SD BG Date", field: "securityDepositBGDate", width: 240, sortable: true },
		                   { id: "validityOfSecurityDepositBG", name: "Validity", field: "validityOfSecurityDepositBG", width: 240, sortable: true },
		                   { id: "dateOfWorkCompletionAsPerWorkOrder", name: "DOC Per WorkOrder", field: "dateOfWorkCompletionAsPerWorkOrder", width: 240, sortable: true },
		                   { id: "dateOfInspection", name: "Date of Inspection", field: "dateOfInspection", width: 240, sortable: true },
		                   { id: "dateOfMaterialDelivery", name: "Date Of Material Delivery", field: "dateOfMaterialDelivery", width: 240, sortable: true },
		                   { id: "dateOfWorkCompletion", name: "Date Of Work Completion", field: "dateOfWorkCompletion", width: 240, sortable: true },
		                   { id: "projectCompletedInTime", name: "Project Completed In Time", field: "projectCompletedInTime", width: 240, sortable: true },
		                   { id: "expensesMadeAsOnDate", name: "Expenses Made As On Date", field: "expensesMadeAsOnDate", width: 240, sortable: true },
		                   { id: "invoiceNumber", name: "Invoice Number", field: "invoiceNumber", width: 240, sortable: true },
		                   { id: "dateOfInvoice", name: "Date Of Invoice", field: "dateOfInvoice", width: 240, sortable: true },
		                   { id: "dateOfReceiptOfPayment", name: "Date Of Receipt Of Payment", field: "dateOfReceiptOfPayment", width: 240, sortable: true },
		                   { id: "workCompletedInAllRespect", name: "Work Completed", field: "workCompletedInAllRespect", width: 240, sortable: true }               
		                 ];
		    var columnFilters = {};

		    function filter(item) {
		      for (var columnId in columnFilters) {
		        if (columnId !== undefined && columnFilters[columnId] !== "") {
		          var c = grid.getColumns()[grid.getColumnIndex(columnId)];
		          if ( ! (item[c.field].toString().toLowerCase().indexOf(columnFilters[columnId].toString().toLowerCase())  > -1 ) ) {
		            return false;
		          }
		        }
		      }
		      return true;
		    }
		    
		    var columnFiltersWork = {};

		    function filterWork(item) {
		      for (var columnId in columnFiltersWork) {
		        if (columnId !== undefined && columnFiltersWork[columnId] !== "") {
		          var c = gridWork.getColumns()[gridWork.getColumnIndex(columnId)];
		          if ( ! (item[c.field].toString().toLowerCase().indexOf(columnFiltersWork[columnId].toString().toLowerCase())  > -1 ) ) {
		            return false;
		          }
		        }
		      }
		      return true;
		    }

		    $(function () {
		      $http({
		    	  method: 'GET',
		    	  url: 'http://localhost:8080/SwatiElectrotechSystem/tender/list'
		    	}).then(function successCallback(response) {
	    	  		dataView = new Slick.Data.DataView();
				      
				      grid = new Slick.Grid("#newTendersGrid", dataView, columns, options);
				      dataView.onRowCountChanged.subscribe(function (e, args) {
				        grid.updateRowCount();
				        grid.render();
				      });
				      dataView.onRowsChanged.subscribe(function (e, args) {
				        grid.invalidateRows(args.rows);
				        grid.render();
				      });
				      $(grid.getHeaderRow()).delegate(":input", "change keyup", function (e) {
				        var columnId = $(this).data("columnId");
				        if (columnId != null) {
				          columnFilters[columnId] = $.trim($(this).val());
				          dataView.refresh();
				        }
				      });
				      grid.onHeaderRowCellRendered.subscribe(function(e, args) {
				          $(args.node).empty();
				          $("<input type='text'>")
				             .data("columnId", args.column.id)
				             .val(columnFilters[args.column.id])
				             .appendTo(args.node);
				      });
				  		    
				      var pager = new Slick.Controls.Pager(dataView, grid, $("#pager"));

				      
				      grid.onSort.subscribe(function (e, args) {
				    	  sortcol = args.sortCols[0].sortCol.field;
				    	  dataView.sort(comparer, args.sortCols[0].sortAsc);
				    	});

				    	function comparer(a, b) {
				    	  var x = a[sortcol], y = b[sortcol];
				    	  return (x == y ? 0 : (x > y ? 1 : -1));
				    	}
				      
				    	grid.init();
			    	    dataView.beginUpdate();
			    	    dataView.setItems(response.data);
			    	    dataView.setFilter(filter);
			    	    dataView.endUpdate();
		    	  }, function errorCallback(response) {
		    	    // called asynchronously if an error occurs
		    	    // or server returns response with an error status.
		    	  });
		      
		      $http({
		    	  method: 'GET',
		    	  url: 'http://localhost:8080/SwatiElectrotechSystem/work/list'
		    	}).then(function successCallback(response) {
		    		dataViewWork = new Slick.Data.DataView();
				      
	    	  		gridWork = new Slick.Grid("#worksGrid", dataViewWork, worksColumns, options);
				      dataViewWork.onRowCountChanged.subscribe(function (e, args) {
				    	  gridWork.updateRowCount();
				    	  gridWork.render();
				      });
				      dataViewWork.onRowsChanged.subscribe(function (e, args) {
				    	  gridWork.invalidateRows(args.rows);
				    	  gridWork.render();
				      });
				      $(gridWork.getHeaderRow()).delegate(":input", "change keyup", function (e) {
				        var columnId = $(this).data("columnId");
				        if (columnId != null) {
				        	columnFiltersWork[columnId] = $.trim($(this).val());
				          dataViewWork.refresh();
				        }
				      });
				      gridWork.onHeaderRowCellRendered.subscribe(function(e, args) {
				          $(args.node).empty();
				          $("<input type='text'>")
				             .data("columnId", args.column.id)
				             .val(columnFiltersWork[args.column.id])
				             .appendTo(args.node);
				      });
				  		    
				      var pager1 = new Slick.Controls.Pager(dataViewWork, gridWork, $("#pager1"));

				      
				      gridWork.onSort.subscribe(function (e, args) {
				    	  sortcol = args.sortCols[0].sortCol.field;
				    	  dataViewWork.sort(comparer, args.sortCols[0].sortAsc);
				    	});

				    	function comparer(a, b) {
				    	  var x = a[sortcol], y = b[sortcol];
				    	  return (x == y ? 0 : (x > y ? 1 : -1));
				    	}
				      
				    	gridWork.init();
				    	dataViewWork.beginUpdate();
				    	dataViewWork.setItems(response.data);
				    	dataViewWork.setFilter(filterWork);
				    	dataViewWork.endUpdate();

		    	  }, function errorCallback(response) {
		    	    // called asynchronously if an error occurs
		    	    // or server returns response with an error status.
		    	  });
		      
		    })
		    //Slick Grid Ends
		    
	    }])	    	    

	  app.controller('tendersInProcessCtrl', ['$scope','$http','$location', 'tenderService', function( $scope, $http, $location, tenderService) {

		  $scope.exportTendersData = function() {		         
		                 alasql('SELECT * INTO XLSX("TendersDataExport.xlsx",{headers:true}) FROM ?',[$scope.collection]);		        
		  };
		  
		  $scope.selectedTender = tenderService.get();
		  
		  $scope.viewTenderDetails = function (item) {
			  tenderService.set(item),
			  $location.path('/tenderDetails');			 
		    };
		 
		 //Slick Grid Code

		    var dataView;
		    var grid;
		    var data = [];
		   
		    var options = {
		      enableCellNavigation: true,
		      showHeaderRow: true,
		      headerRowHeight: 40,
		      multiColumnSort: true,
		      explicitInitialization: true
		    },
		    indices, isAsc = true, currentSortCol = { id: "title" };
		    var columns = [
		                   { id: "id", name: "Tender ID", field: "id", width: 100, sortable: true },
		                   { id: "nameOfCustomer", name: "Name Of Customer", field: "nameOfCustomer", width: 240, sortable: true },
		                   { id: "scopeOfWork", name: "Scope of Work", field: "scopeOfWork", width: 240, sortable: true },
		                   { id: "estimatedValue", name: "Estimated Value", field: "estimatedValue", width: 240, sortable: true },
		                   { id: "dueDate", name: "Due Date", field: "dueDate", width: 120, sortable: true },
		                   { id: "emd", name: "EMD", field: "emd", width: 100, sortable: true },
		                   { id: "interested", name: "Interested", field: "interested", width: 120, formatter: Slick.Formatters.Checkmark, sortable: true },
		                   { id: "statusOfTender", name: "Status", field: "statusOfTender", width: 240, sortable: true },
		                   { id: "systemEnteredDate", name: "Entered Date", field: "systemEnteredDate", width: 240, sortable: true },
		                   { id: "tenderSubmitted", name: "Submitted", field: "tenderSubmitted", width: 240, sortable: true },
		                   { id: "submittedDate", name: "Submitted Date", field: "submittedDate", width: 240, sortable: true },
		                   { id: "technicalBidOpened", name: "Tech Bid Opened", field: "technicalBidOpened", width: 240, sortable: true },
		                   { id: "technicalBidOpeningDate", name: "Tech Bid Opening Date", field: "technicalBidOpeningDate", width: 280, sortable: true },
		                   { id: "technicallyQualified", name: "Tech Qualified", field: "technicallyQualified", width: 240, sortable: true },
		                   { id: "priceBidOpened", name: "Price Bid Opened", field: "priceBidOpened", width: 240, sortable: true },
		                   { id: "priceBidOpeningDate", name: "Price Bid Opening Date", field: "priceBidOpeningDate", width: 240, sortable: true },
		                   { id: "lowestBidder", name: "Lowest Bidder", field: "lowestBidder", width: 240, sortable: true },
		                 ];
		    var columnFilters = {};

		    function filter(item) {
		      for (var columnId in columnFilters) {
		        if (columnId !== undefined && columnFilters[columnId] !== "") {
		          var c = grid.getColumns()[grid.getColumnIndex(columnId)];
		          if ( ! (item[c.field].toString().toLowerCase().indexOf(columnFilters[columnId].toString().toLowerCase())  > -1 ) ) {
		            return false;
		          }
		        }
		      }
		      return true;
		    }

		      $.getJSON('http://localhost:8080/SwatiElectrotechSystem/tender/list', function(data) {

		    	  		dataView = new Slick.Data.DataView();
					      
					      grid = new Slick.Grid("#tendersInProcessGrid", dataView, columns, options);
					      dataView.onRowCountChanged.subscribe(function (e, args) {
					        grid.updateRowCount();
					        grid.render();
					      });
					      dataView.onRowsChanged.subscribe(function (e, args) {
					        grid.invalidateRows(args.rows);
					        grid.render();
					      });
					      $(grid.getHeaderRow()).delegate(":input", "change keyup", function (e) {
					        var columnId = $(this).data("columnId");
					        if (columnId != null) {
					          columnFilters[columnId] = $.trim($(this).val());
					          dataView.refresh();
					        }
					      });
					      grid.onHeaderRowCellRendered.subscribe(function(e, args) {
					          $(args.node).empty();
					          $("<input type='text'>")
					             .data("columnId", args.column.id)
					             .val(columnFilters[args.column.id])
					             .appendTo(args.node);
					      });
					  		    
					      var pager = new Slick.Controls.Pager(dataView, grid, $("#pager"));

					      
					      grid.onSort.subscribe(function (e, args) {
					    	  sortcol = args.sortCols[0].sortCol.field;
					    	  dataView.sort(comparer, args.sortCols[0].sortAsc);
					    	});

					    	function comparer(a, b) {
					    	  var x = a[sortcol], y = b[sortcol];
					    	  return (x == y ? 0 : (x > y ? 1 : -1));
					    	}
					      
					    	grid.init();
				    	    dataView.beginUpdate();
				    	    dataView.setItems(data);
				    	    dataView.setFilter(filter);
				    	    dataView.endUpdate();

		    });
		    //Slick Grid Ends
		    
	    }])	    	    

	  app.controller('worksCtrl', ['$scope','$http','$location', 'tenderService', function( $scope, $http, $location, tenderService) {

		  $scope.exportTendersData = function() {		         
		                 alasql('SELECT * INTO XLSX("TendersDataExport.xlsx",{headers:true}) FROM ?',[$scope.collection]);		        
		  };
		  
		  $scope.selectedTender = tenderService.get();
		  
		  $scope.viewTenderDetails = function (item) {
			  tenderService.set(item),
			  $location.path('/tenderDetails');			 
		    };
		 
		 //Slick Grid Code

		    var dataViewWork;
		    var grid;
		    var dataWork = [];
		   
		    var options = {
		      enableCellNavigation: true,
		      showHeaderRow: true,
		      headerRowHeight: 40,
		      multiColumnSort: true,
		      explicitInitialization: true
		    },
		    indices, isAsc = true, currentSortCol = { id: "title" };

		    var worksColumns = [
		                   { id: "id", name: "Tender ID", field: "id", width: 100, sortable: true },
		                   { id: "workdId", name: "Work ID", field: "workdId", width: 240, sortable: true },
		                   { id: "nameOfCustomer", name: "Name Of Customer", field: "nameOfCustomer", width: 240, sortable: true },
		                   { id: "scopeOfWork", name: "Scope of Work", field: "scopeOfWork", width: 240, sortable: true },
		                   { id: "workOrderStatus", name: "Status", field: "workOrderStatus", width: 240, sortable: true },
		                   { id: "workOrderNumber", name: "Work Order Number", field: "workOrderNumber", width: 240, sortable: true },
		                   { id: "workOrderDate", name: "Date", field: "workOrderDate", width: 100, sortable: true },
		                   { id: "valueOfWork", name: "Value", field: "valueOfWork", width: 120, formatter: Slick.Formatters.Checkmark, sortable: true },
		                   { id: "formalitiesCompleted", name: "Formalities Completed", field: "formalitiesCompleted", width: 240, sortable: true },
		                   { id: "securityDepositBGAmount", name: "SD BG Amount", field: "securityDepositBGAmount", width: 240, sortable: true },
		                   { id: "securityDepositBGDate", name: "SD BG Date", field: "securityDepositBGDate", width: 240, sortable: true },
		                   { id: "validityOfSecurityDepositBG", name: "Validity", field: "validityOfSecurityDepositBG", width: 240, sortable: true },
		                   { id: "dateOfWorkCompletionAsPerWorkOrder", name: "DOC Per WorkOrder", field: "dateOfWorkCompletionAsPerWorkOrder", width: 240, sortable: true },
		                   { id: "dateOfInspection", name: "Date of Inspection", field: "dateOfInspection", width: 240, sortable: true },
		                   { id: "dateOfMaterialDelivery", name: "Date Of Material Delivery", field: "dateOfMaterialDelivery", width: 240, sortable: true },
		                   { id: "dateOfWorkCompletion", name: "Date Of Work Completion", field: "dateOfWorkCompletion", width: 240, sortable: true },
		                   { id: "projectCompletedInTime", name: "Project Completed In Time", field: "projectCompletedInTime", width: 240, sortable: true },
		                   { id: "expensesMadeAsOnDate", name: "Expenses Made As On Date", field: "expensesMadeAsOnDate", width: 240, sortable: true },
		                   { id: "invoiceNumber", name: "Invoice Number", field: "invoiceNumber", width: 240, sortable: true },
		                   { id: "dateOfInvoice", name: "Date Of Invoice", field: "dateOfInvoice", width: 240, sortable: true },
		                   { id: "dateOfReceiptOfPayment", name: "Date Of Receipt Of Payment", field: "dateOfReceiptOfPayment", width: 240, sortable: true },
		                   { id: "workCompletedInAllRespect", name: "Work Completed", field: "workCompletedInAllRespect", width: 240, sortable: true }               
		                 ];

		    
		    var columnFilters = {};

		    function filter(item) {
		      for (var columnId in columnFilters) {
		        if (columnId !== undefined && columnFilters[columnId] !== "") {
		          var c = grid.getColumns()[grid.getColumnIndex(columnId)];
		          if ( ! (item[c.field].toString().toLowerCase().indexOf(columnFilters[columnId].toString().toLowerCase())  > -1 ) ) {
		            return false;
		          }
		        }
		      }
		      return true;
		    }
		    
	      $.getJSON('http://localhost:8080/SwatiElectrotechSystem/work/list', function(dataWork) {

	    	  		dataViewWork = new Slick.Data.DataView();
				      
	    	  		grid = new Slick.Grid("#worksGrid", dataViewWork, worksColumns, options);
				      dataViewWork.onRowCountChanged.subscribe(function (e, args) {
				    	  grid.updateRowCount();
				    	  grid.render();
				      });
				      dataViewWork.onRowsChanged.subscribe(function (e, args) {
				    	  grid.invalidateRows(args.rows);
				    	  grid.render();
				      });
				      $(grid.getHeaderRow()).delegate(":input", "change keyup", function (e) {
				        var columnId = $(this).data("columnId");
				        if (columnId != null) {
				        	columnFilters[columnId] = $.trim($(this).val());
				          dataViewWork.refresh();
				        }
				      });
				      grid.onHeaderRowCellRendered.subscribe(function(e, args) {
				          $(args.node).empty();
				          $("<input type='text'>")
				             .data("columnId", args.column.id)
				             .val(columnFilters[args.column.id])
				             .appendTo(args.node);
				      });
				  		    
				      var pager = new Slick.Controls.Pager(dataViewWork, grid, $("#pager"));

				      
				      grid.onSort.subscribe(function (e, args) {
				    	  sortcol = args.sortCols[0].sortCol.field;
				    	  dataViewWork.sort(comparer, args.sortCols[0].sortAsc);
				    	});

				    	function comparer(a, b) {
				    	  var x = a[sortcol], y = b[sortcol];
				    	  return (x == y ? 0 : (x > y ? 1 : -1));
				    	}
				      
				    	grid.init();
				    	dataViewWork.beginUpdate();
				    	dataViewWork.setItems(dataWork);
				    	dataViewWork.setFilter(filter);
				    	dataViewWork.endUpdate();

	    });
		    //Slick Grid Ends
		    
	    }])	    	    
	    
	    	  app.controller('worksCompletedCtrl', ['$scope','$http','$location', 'tenderService', function( $scope, $http, $location, tenderService) {

		  $scope.exportTendersData = function() {		         
		                 alasql('SELECT * INTO XLSX("TendersDataExport.xlsx",{headers:true}) FROM ?',[$scope.collection]);		        
		  };
		  
		  $scope.selectedTender = tenderService.get();
		  
		  $scope.viewTenderDetails = function (item) {
			  tenderService.set(item),
			  $location.path('/tenderDetails');			 
		    };
		 
		 //Slick Grid Code

		    var dataViewWork;
		    var grid;
		    var dataWork = [];
		   
		    var options = {
		      enableCellNavigation: true,
		      showHeaderRow: true,
		      headerRowHeight: 40,
		      multiColumnSort: true,
		      explicitInitialization: true
		    },
		    indices, isAsc = true, currentSortCol = { id: "title" };

		    var worksColumns = [
		                   { id: "id", name: "Tender ID", field: "id", width: 100, sortable: true },
		                   { id: "workdId", name: "Work ID", field: "workdId", width: 240, sortable: true },
		                   { id: "nameOfCustomer", name: "Name Of Customer", field: "nameOfCustomer", width: 240, sortable: true },
		                   { id: "scopeOfWork", name: "Scope of Work", field: "scopeOfWork", width: 240, sortable: true },
		                   { id: "workOrderStatus", name: "Status", field: "workOrderStatus", width: 240, sortable: true },
		                   { id: "workOrderNumber", name: "Work Order Number", field: "workOrderNumber", width: 240, sortable: true },
		                   { id: "workOrderDate", name: "Date", field: "workOrderDate", width: 100, sortable: true },
		                   { id: "valueOfWork", name: "Value", field: "valueOfWork", width: 120, formatter: Slick.Formatters.Checkmark, sortable: true },
		                   { id: "formalitiesCompleted", name: "Formalities Completed", field: "formalitiesCompleted", width: 240, sortable: true },
		                   { id: "securityDepositBGAmount", name: "SD BG Amount", field: "securityDepositBGAmount", width: 240, sortable: true },
		                   { id: "securityDepositBGDate", name: "SD BG Date", field: "securityDepositBGDate", width: 240, sortable: true },
		                   { id: "validityOfSecurityDepositBG", name: "Validity", field: "validityOfSecurityDepositBG", width: 240, sortable: true },
		                   { id: "dateOfWorkCompletionAsPerWorkOrder", name: "DOC Per WorkOrder", field: "dateOfWorkCompletionAsPerWorkOrder", width: 240, sortable: true },
		                   { id: "dateOfInspection", name: "Date of Inspection", field: "dateOfInspection", width: 240, sortable: true },
		                   { id: "dateOfMaterialDelivery", name: "Date Of Material Delivery", field: "dateOfMaterialDelivery", width: 240, sortable: true },
		                   { id: "dateOfWorkCompletion", name: "Date Of Work Completion", field: "dateOfWorkCompletion", width: 240, sortable: true },
		                   { id: "projectCompletedInTime", name: "Project Completed In Time", field: "projectCompletedInTime", width: 240, sortable: true },
		                   { id: "expensesMadeAsOnDate", name: "Expenses Made As On Date", field: "expensesMadeAsOnDate", width: 240, sortable: true },
		                   { id: "invoiceNumber", name: "Invoice Number", field: "invoiceNumber", width: 240, sortable: true },
		                   { id: "dateOfInvoice", name: "Date Of Invoice", field: "dateOfInvoice", width: 240, sortable: true },
		                   { id: "dateOfReceiptOfPayment", name: "Date Of Receipt Of Payment", field: "dateOfReceiptOfPayment", width: 240, sortable: true },
		                   { id: "workCompletedInAllRespect", name: "Work Completed", field: "workCompletedInAllRespect", width: 240, sortable: true }               
		                 ];

		    
		    var columnFilters = {};

		    function filter(item) {
		      for (var columnId in columnFilters) {
		        if (columnId !== undefined && columnFilters[columnId] !== "") {
		          var c = grid.getColumns()[grid.getColumnIndex(columnId)];
		          if ( ! (item[c.field].toString().toLowerCase().indexOf(columnFilters[columnId].toString().toLowerCase())  > -1 ) ) {
		            return false;
		          }
		        }
		      }
		      return true;
		    }
		    
	      $.getJSON('http://localhost:8080/SwatiElectrotechSystem/work/list', function(dataWork) {

	    	  		dataViewWork = new Slick.Data.DataView();
				      
	    	  		grid = new Slick.Grid("#worksGrid", dataViewWork, worksColumns, options);
				      dataViewWork.onRowCountChanged.subscribe(function (e, args) {
				    	  grid.updateRowCount();
				    	  grid.render();
				      });
				      dataViewWork.onRowsChanged.subscribe(function (e, args) {
				    	  grid.invalidateRows(args.rows);
				    	  grid.render();
				      });
				      $(grid.getHeaderRow()).delegate(":input", "change keyup", function (e) {
				        var columnId = $(this).data("columnId");
				        if (columnId != null) {
				        	columnFilters[columnId] = $.trim($(this).val());
				          dataViewWork.refresh();
				        }
				      });
				      grid.onHeaderRowCellRendered.subscribe(function(e, args) {
				          $(args.node).empty();
				          $("<input type='text'>")
				             .data("columnId", args.column.id)
				             .val(columnFilters[args.column.id])
				             .appendTo(args.node);
				      });
				  		    
				      var pager = new Slick.Controls.Pager(dataViewWork, grid, $("#pager"));

				      
				      grid.onSort.subscribe(function (e, args) {
				    	  sortcol = args.sortCols[0].sortCol.field;
				    	  dataViewWork.sort(comparer, args.sortCols[0].sortAsc);
				    	});

				    	function comparer(a, b) {
				    	  var x = a[sortcol], y = b[sortcol];
				    	  return (x == y ? 0 : (x > y ? 1 : -1));
				    	}
				      
				    	grid.init();
				    	dataViewWork.beginUpdate();
				    	dataViewWork.setItems(dataWork);
				    	dataViewWork.setFilter(filter);
				    	dataViewWork.endUpdate();

	    });
		    //Slick Grid Ends
		    
	    }])	    	    
	    
	    
	    
app.directive('ngConfirmClick', [
                                  function(){
                                      return {
                                          link: function (scope, element, attr) {
                                              var msg = attr.ngConfirmClick || "Are you sure?";
                                              var clickAction = attr.confirmedClick;
                                              element.bind('click',function (event) {
                                                  if ( window.confirm(msg) ) {
                                                      scope.$eval(clickAction)
                                                  }
                                              });
                                          }
                                      };
                              }])
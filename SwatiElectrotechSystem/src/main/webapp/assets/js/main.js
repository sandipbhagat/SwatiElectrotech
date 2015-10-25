
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
                                   'ngRoute', 'ui.bootstrap', 'ngSanitize'
                                 ]);

                                 /**
                                  * Configure the Routes
                                  */
                                 app.config(['$routeProvider', function ($routeProvider) {
                                   $routeProvider
                                     // Home
                                     .when("/", {templateUrl: "pages/home.jsp", controller: "PageCtrl"})
                                     // Pages
                                     .when("/aboutus", {templateUrl: "pages/aboutus.html", controller: "PageCtrl"})
                                     .when("/loginpanel", {templateUrl: "pages/loginpanel.jsp", controller: "PageCtrl"})
                                     .when("/employeepanel", {templateUrl: "pages/employeepanel.jsp", controller: "homeCtrl"})                                     
                                     .when("/addnewtender", {templateUrl: "pages/addnewtender.jsp", controller: "tenderDetailsCtrl"})
                                     .when("/updatetender", {templateUrl: "pages/updatetender.jsp", controller: "tenderDetailsCtrl"})
                                     .when("/newtenders", {templateUrl: "pages/newtenders.jsp", controller: "NewTendersCtrl"})
                                     .when("/tendersinprocess", {templateUrl: "pages/tendersinprocess.jsp", controller: "tendersInProcessCtrl"})
                                     .when("/tenderDetails", {templateUrl: "pages/tenderdetails.jsp", controller: "tenderDetailsCtrl"})
                                     .when("/workDetails", {templateUrl: "pages/workdetails.jsp", controller: "workDetailsCtrl"})
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
     
     app.factory('workService', function() {
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

	  app.controller('NewTendersCtrl', ['$scope','$http','$location', 'tenderService','$route', function( $scope, $http, $location, tenderService, $route) {

		  $scope.exportTendersData = function() {		         
		                 alasql('SELECT * INTO XLSX("TendersDataExport.xlsx",{headers:true}) FROM ?',[$scope.collection]);		        
		  };
		  
		  $scope.selectedTender = tenderService.get();
		  
		  $scope.viewTenderDetails = function (item) {
			  tenderService.set(item),
			  $location.path('/tenderDetails');			 
		    };
		 
			  $scope.AddNew = function () {
				  tenderService.set(null),
				  $location.path('/addnewtender');			 
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
		    
		    function deleteformatter(row, cell, value, columnDef, dataContext) {
		        return value;
		    }
		    
		    var columns = [
		                   { id: "id", name: "Tender ID", field: "id", width: 100, sortable: true },
		                   { id: "nameOfCustomer", name: "Name Of Customer", field: "nameOfCustomer", width: 240, sortable: true },
		                   { id: "scopeOfWork", name: "Scope of Work", field: "scopeOfWork", width: 240, sortable: true },
		                   { id: "estimatedValue", name: "Estimated Value", field: "estimatedValue", width: 240, sortable: true },
		                   { id: "dueDate", name: "Due Date", field: "dueDate", width: 120, sortable: true },
		                   { id: "emd", name: "EMD", field: "emd", width: 100, sortable: true },
		                   { id: "interested", name: "Interested", field: "interested", width: 120, /*formatter: Slick.Formatters.Checkmark,*/ sortable: true },
		                   { id: "view", name: "Details", field: "view", width: 120, formatter: viewformatter},
		                   { id: "deleteTender", name: "Delete", field: "deleteTender", width: 120, formatter: deleteformatter}
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
		    
	      $.getJSON('http://localhost:8080/SwatiElectrotechSystem/tender/newtender/list', function(data) {

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
					    	  			nameOfCustomer : data[i].nameOfCustomer,
					    	  			scopeOfWork : data[i].scopeOfWork,
					    	  			estimatedValue : data[i].estimatedValue,
					    	  			dueDate : data[i].dueDate,
					    	  			emd : data[i].emd,
					    	  			interested : data[i].interested,
					    	  			view : "<a href='#/tenderDetails' class='viewButton' tabindex='0'>View</a>",
					    	  			deleteTender : "<a href='#/newtenders' class='deleteButton' tabindex='0'>Delete</a>"
					    	  		};
					    	  }
					      
					      grid.onClick.subscribe(function(e,args) {
					    	  	   var item = data[args.row]; //args.grid.getDataItem(args.row);
					    	  	 if (args.cell == grid.getColumnIndex('view'))
					    		   $scope.viewTenderDetails(item);
					    	  	 
					    	  	 if (args.cell == grid.getColumnIndex('deleteTender'))
					    	  		 {
					    	  		$http({
					    	  		  method: 'GET',
					    	  		  url: 'http://localhost:8080/SwatiElectrotechSystem/tender/delete/'+item.id
					    	  		}).then(function successCallback(response) {
					    	  			alert("Tender Successfully Deleted !!");	
					    	  			$route.reload();
					    	  		  }, function errorCallback(response) {
					    	  			alert("Failed to Delete !!");	
					    	  		  });
					    	  		 }
					    	});
					      
					    	grid.init();
				    	    dataView.beginUpdate();
				    	    dataView.setItems(gridData);
				    	    dataView.setFilter(filter);
				    	    dataView.endUpdate();

		    });
		    //Slick Grid Ends
		    
	    }])	    	    

	    
	   app.controller('tenderDetailsCtrl', ['$scope','$http', 'tenderService','$route','$location',function($scope, $http, tenderService, $route, $location) {
		   
		   $scope.selectedTenderwithoutFormatting = tenderService.get();
		   
		   if($scope.selectedTenderwithoutFormatting !== null)
			   {
					   $scope.selectedTender = {
							   id :  $scope.selectedTenderwithoutFormatting.id,
							   nameOfCustomer : $scope.selectedTenderwithoutFormatting.nameOfCustomer,
							   scopeOfWork : $scope.selectedTenderwithoutFormatting.scopeOfWork,
							   estimatedValue : $scope.selectedTenderwithoutFormatting.estimatedValue,
							   dueDate : new Date(formatDate($scope.selectedTenderwithoutFormatting.dueDate)),
							   emd : $scope.selectedTenderwithoutFormatting.emd,
							   interested : $scope.selectedTenderwithoutFormatting.interested,
							   statusOfTender : $scope.selectedTenderwithoutFormatting.statusOfTender,
							   systemEnteredDate: new Date(formatDate($scope.selectedTenderwithoutFormatting.systemEnteredDate)),
							   tenderSubmitted: $scope.selectedTenderwithoutFormatting.tenderSubmitted ,
							   submittedDate: new Date(formatDate($scope.selectedTenderwithoutFormatting.submittedDate)),
							   technicalBidOpened: $scope.selectedTenderwithoutFormatting.technicalBidOpened,
							   technicalBidOpeningDate: new Date(formatDate($scope.selectedTenderwithoutFormatting.technicalBidOpeningDate)),
							   technicallyQualified: $scope.selectedTenderwithoutFormatting.technicallyQualified,
							   priceBidOpened: $scope.selectedTenderwithoutFormatting.priceBidOpened,
							   priceBidOpeningDate: new Date(formatDate($scope.selectedTenderwithoutFormatting.priceBidOpeningDate)),
							   lowestBidder: $scope.selectedTenderwithoutFormatting.lowestBidder 				   
					   }
			   }
		   
		   function formatDate(date) {
			    var d = new Date(date),
			        month = '' + (d.getMonth() + 1),
			        day = '' + d.getDate(),
			        year = d.getFullYear();

			    if (month.length < 2) month = '0' + month;
			    if (day.length < 2) day = '0' + day;

			    return [year, month, day].join('-');
			}
		   
		   $scope.submitForm = function(selectedTender) {
		        // Posting data to php file
			   
			   var data = $.param({
				   "id": selectedTender.id,
				   "nameOfCustomer": selectedTender.nameOfCustomer,
				   "scopeOfWork": selectedTender.scopeOfWork,
				   "estimatedValue": selectedTender.estimatedValue,
				   "dueDate": formatDate(selectedTender.dueDate),
				   "emd": selectedTender.emd, 
				   "interested": selectedTender.interested,
				   "statusOfTender": selectedTender.statusOfTender,
				   "systemEnteredDate": formatDate(selectedTender.systemEnteredDate),
				   "tenderSubmitted": selectedTender.tenderSubmitted,
				   "submittedDate": formatDate(selectedTender.submittedDate),
				   "technicalBidOpened": selectedTender.technicalBidOpened,
				   "technicalBidOpeningDate": formatDate(selectedTender.technicalBidOpeningDate),
				   "technicallyQualified": selectedTender.technicallyQualified,
				   "priceBidOpened": selectedTender.priceBidOpened,
				   "priceBidOpeningDate": formatDate(selectedTender.priceBidOpeningDate),
				   "lowestBidder": selectedTender.lowestBidder
				   });
        
		        $http({
	    	  		  method: 'POST',
	    	  		  url: 'http://localhost:8080/SwatiElectrotechSystem/tender/update',
			          data    : data, //forms user object
			          headers : {'Content-Type': 'application/x-www-form-urlencoded'} 
	    	  		}).then(function successCallback(response) {
	    	  			alert("Tender Successfully Updated !!");	
	    	  			$location.path('/newtenders');
	    	  		  }, function errorCallback(response) {
	    	  			alert("Failed to Update !!");	
	    	  		  });
		        
		        };
		        
				   $scope.submitNewForm = function(selectedTender) {
				        // Posting data to php file
					   
					   var data = $.param({
						   "nameOfCustomer": selectedTender.nameOfCustomer,
						   "scopeOfWork": selectedTender.scopeOfWork,
						   "estimatedValue": selectedTender.estimatedValue,
						   "dueDate": formatDate(selectedTender.dueDate),
						   "emd": selectedTender.emd, 
						   "interested": selectedTender.interested,
						   "statusOfTender": selectedTender.statusOfTender,
						   "systemEnteredDate": formatDate(selectedTender.systemEnteredDate),
						   "tenderSubmitted": selectedTender.tenderSubmitted,
						   "submittedDate": formatDate(selectedTender.submittedDate),
						   "technicalBidOpened": selectedTender.technicalBidOpened,
						   "technicalBidOpeningDate": formatDate(selectedTender.technicalBidOpeningDate),
						   "technicallyQualified": selectedTender.technicallyQualified,
						   "priceBidOpened": selectedTender.priceBidOpened,
						   "priceBidOpeningDate": formatDate(selectedTender.priceBidOpeningDate),
						   "lowestBidder": selectedTender.lowestBidder
						   });
		        
				        $http({
			    	  		  method: 'POST',
			    	  		  url: 'http://localhost:8080/SwatiElectrotechSystem/tender/create',
					          data    : data, //forms user object
					          headers : {'Content-Type': 'application/x-www-form-urlencoded'} 
			    	  		}).then(function successCallback(response) {
			    	  			alert("Tender Successfully Created !!");	
			    	  			$location.path('/newtenders');
			    	  		  }, function errorCallback(response) {
			    	  			alert("Failed to Create !!");	
			    	  		  });
				        
				        };
				        
				        //To Add Parties Involved
				        
				        $scope.parties = [{tempid: 'choice1'}];
				        $( function (){
				    	  $http({
			    	  		  method: 'GET',
			    	  		  url: 'http://localhost:8080/SwatiElectrotechSystem/parties/list',
					          headers : {'Content-Type': 'application/x-www-form-urlencoded'} 
			    	  		}).then(function successCallback(response) {
			    	  			//alert("Tender Successfully Created !!");
			    	  			//$scope.parties.splice(index,1);
			    	  			//$location.path('/newtenders');
			    	  			$scope.parties = response.data;
			    	  		  }, function errorCallback(response) {
			    	  			//alert("Failed to Create !!");	
			    	  		  });
				        })
				    	  
				        $scope.addNewChoice = function() {
				          var newItemNo = $scope.parties.length+1;
				          $scope.parties.push({'tempid':'choice'+newItemNo});
				        };
				        
				        $scope.saveAllParties = function(parties) {
							      for (var i=0 ; i < parties.length ; i++) {
							    	  
						    		  if(typeof(parties[i].id) === "undefined" )
					    			  {
								    	  var data = $.param({
							    		  		"tenderId": $scope.selectedTender.id,
							    		  		"nameOfParty" : parties[i].nameOfParty,
							    		  		"rates" : parties[i].rates
										   });
					    			  }
						    		  else
							    		{
								    	  var data = $.param({
								    		  		"tenderId": parties[i].tenderId,
								    		  		"id" : parties[i].id,
								    		  		"nameOfParty" : parties[i].nameOfParty,
								    		  		"rates" : parties[i].rates
											   });
							    		}
							    	  
							    	  $http({
						    	  		  method: 'POST',
						    	  		  url: 'http://localhost:8080/SwatiElectrotechSystem/parties/addorupdate',
								          data    : data, //forms user object
								          headers : {'Content-Type': 'application/x-www-form-urlencoded'} 
						    	  		}).then(function successCallback(response) {
						    	  			//alert("Tender Successfully Created !!");
						    	  			//$scope.parties.splice(index,1);
						    	  			//$location.path('/newtenders');
						    	  		  }, function errorCallback(response) {
						    	  			//alert("Failed to Create !!");	
						    	  		  });	
								}
							    // To Update Parties invilved  
							      $route.reload();
					        };
				          
				        $scope.removeChoice = function(index,id) {
					        $http({
				    	  		  method: 'GET',
				    	  		  url: 'http://localhost:8080/SwatiElectrotechSystem/parties/delete/'+id,
						          headers : {'Content-Type': 'application/x-www-form-urlencoded'} 
				    	  		}).then(function successCallback(response) {
				    	  			//alert("Tender Successfully Created !!");
				    	  			$scope.parties.splice(index,1);
				    	  			//$location.path('/newtenders');
				    	  		  }, function errorCallback(response) {
				    	  			//alert("Failed to Create !!");	
				    	  		  });				          
				        };
				        
				        $scope.remove = function(index) {
				        	$scope.parties.splice(index,1);
				        };
		}
	]);  	

	  
   app.controller('workDetailsCtrl', ['$scope','$http', 'workService','$route','$location',function($scope, $http, workService, $route, $location) {
		   
		   $scope.selectedWorkwithoutFormatting = workService.get();
	
		   if($scope.selectedWorkwithoutFormatting !== null)
		   {
				   $scope.selectedWork = {
						   tenderId : $scope.selectedWorkwithoutFormatting.tenderId,
						   id :  $scope.selectedWorkwithoutFormatting.id,
						   nameOfCustomer : $scope.selectedWorkwithoutFormatting.nameOfCustomer,
						   scopeOfWork : $scope.selectedWorkwithoutFormatting.scopeOfWork,
						   workOrderStatus : $scope.selectedWorkwithoutFormatting.workOrderStatus,
						   workOrderNumber : $scope.selectedWorkwithoutFormatting.workOrderNumber,
						   workOrderDate: new Date(formatDate($scope.selectedWorkwithoutFormatting.workOrderDate)),
						   valueOfWork : $scope.selectedWorkwithoutFormatting.valueOfWork,
						   formalitiesCompleted : $scope.selectedWorkwithoutFormatting.formalitiesCompleted,
						   securityDepositBGAmount : $scope.selectedWorkwithoutFormatting.securityDepositBGAmount,
						   securityDepositBGDate: new Date(formatDate($scope.selectedWorkwithoutFormatting.securityDepositBGDate)),
						   validityOfSecurityDepositBG: new Date(formatDate($scope.selectedWorkwithoutFormatting.validityOfSecurityDepositBG)) ,
						   dateOfWorkCompletionAsPerWorkOrder: new Date(formatDate($scope.selectedWorkwithoutFormatting.dateOfWorkCompletionAsPerWorkOrder)),
						   dateOfInspection: new Date(formatDate($scope.selectedWorkwithoutFormatting.dateOfInspection)),
						   dateOfMaterialDelivery: new Date(formatDate($scope.selectedWorkwithoutFormatting.dateOfMaterialDelivery)),
						   dateOfWorkCompletion: new Date(formatDate($scope.selectedWorkwithoutFormatting.dateOfWorkCompletion)),
						   projectCompletedInTime: $scope.selectedWorkwithoutFormatting.projectCompletedInTime,
						   expensesMadeAsOnDate: $scope.selectedWorkwithoutFormatting.expensesMadeAsOnDate,
						   invoiceNumber: $scope.selectedWorkwithoutFormatting.invoiceNumber,
						   dateOfInvoice: new Date(formatDate($scope.selectedWorkwithoutFormatting.dateOfInvoice)),
						   dateOfReceiptOfPayment: new Date(formatDate($scope.selectedWorkwithoutFormatting.dateOfReceiptOfPayment)),
						   workCompletedInAllRespect: $scope.selectedWorkwithoutFormatting.workCompletedInAllRespect 				   
						   
				   }
		   }
	   
	   function formatDate(date) {
		    var d = new Date(date),
		        month = '' + (d.getMonth() + 1),
		        day = '' + d.getDate(),
		        year = d.getFullYear();

		    if (month.length < 2) month = '0' + month;
		    if (day.length < 2) day = '0' + day;

		    return [year, month, day].join('-');
		}
	   
	   $scope.submitForm = function(selectedWork) {
		   
		   var data = $.param({
			   "tenderId" : selectedWork.tenderId,
               "id" : selectedWork.id,
               "nameOfCustomer" : selectedWork.nameOfCustomer,
               "scopeOfWork" : selectedWork.scopeOfWork,
               "workOrderStatus" : selectedWork.workOrderStatus,
               "workOrderNumber" : selectedWork.workOrderNumber,
               "workOrderDate" : formatDate(selectedWork.workOrderDate),
               "valueOfWork" : selectedWork.valueOfWork,
               "formalitiesCompleted" : selectedWork.formalitiesCompleted,
               "securityDepositBGAmount" : selectedWork.securityDepositBGAmount,
               "securityDepositBGDate" : formatDate(selectedWork.securityDepositBGDate),
               "validityOfSecurityDepositBG" : formatDate(selectedWork.validityOfSecurityDepositBG),
               "dateOfWorkCompletionAsPerWorkOrder" : formatDate(selectedWork.dateOfWorkCompletionAsPerWorkOrder),
               "dateOfInspection" : formatDate(selectedWork.dateOfInspection),
               "dateOfMaterialDelivery" : formatDate(selectedWork.dateOfMaterialDelivery),
               "dateOfWorkCompletion" : formatDate(selectedWork.dateOfWorkCompletion),
               "projectCompletedInTime" : selectedWork.projectCompletedInTime,
               "expensesMadeAsOnDate" : selectedWork.expensesMadeAsOnDate,
               "invoiceNumber" : selectedWork.invoiceNumber,
               "dateOfInvoice" : formatDate(selectedWork.dateOfInvoice),
               "dateOfReceiptOfPayment" : formatDate(selectedWork.dateOfReceiptOfPayment),
               "workCompletedInAllRespect" : selectedWork.workCompletedInAllRespect 

			   });
    
		   
	        $http({
    	  		  method: 'POST',
    	  		  url: 'http://localhost:8080/SwatiElectrotechSystem/work/update',
		          data    : data, //forms user object
		          headers : {'Content-Type': 'application/x-www-form-urlencoded'} 
    	  		}).then(function successCallback(response) {
    	  			alert("Work Successfully Updated !!");	
    	  			$location.path('/worksinprocess');
    	  		  }, function errorCallback(response) {
    	  			alert("Failed to Update !!");	
    	  		  });
	        
	        };

	}]);  
	    
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
		                   { id: "tenderId", name: "Tender ID", field: "tenderId", width: 100, sortable: true },
		                   { id: "id", name: "Work ID", field: "id", width: 240, sortable: true },
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
		    	  url: 'http://localhost:8080/SwatiElectrotechSystem/tender/newtender/list'
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
		    	  url: 'http://localhost:8080/SwatiElectrotechSystem/work/inprocess/list'
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

		      $.getJSON('http://localhost:8080/SwatiElectrotechSystem/tender/inprocess/list', function(data) {

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

	  app.controller('worksCtrl', ['$scope','$http','$location', 'workService', function( $scope, $http, $location, workService) {

		  $scope.exportTendersData = function() {		         
		                 alasql('SELECT * INTO XLSX("TendersDataExport.xlsx",{headers:true}) FROM ?',[$scope.collection]);		        
		  };
		  
		  $scope.selectedWork = workService.get();
		  
		  $scope.viewWorkDetails = function (item) {
			  workService.set(item),
			  $location.path('/workDetails');			 
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


		    
		    function viewformatter(row, cell, value, columnDef, dataContext) {
		        return value;
		    }
		    
		    function deleteformatter(row, cell, value, columnDef, dataContext) {
		        return value;
		    }
		    
		    
		    var worksColumns = [
		                   { id: "tenderId", name: "Tender ID", field: "tenderId", width: 100, sortable: true },
		                   { id: "id", name: "Work ID", field: "id", width: 240, sortable: true },
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
		                   { id: "workCompletedInAllRespect", name: "Work Completed", field: "workCompletedInAllRespect", width: 240, sortable: true },
		                   { id: "view", name: "Details", field: "view", width: 120, formatter: viewformatter},
		                   { id: "deleteWork", name: "Delete", field: "deleteWork", width: 120, formatter: deleteformatter}
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
		    
	      $.getJSON('http://localhost:8080/SwatiElectrotechSystem/work/inprocess/list', function(dataWork) {

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
				      
				    	var gridWorkData = [];
					      
					      for(var i=0; i < dataWork.length; i++ )
					    	  {
					    	  gridWorkData[i] = {
					    	  			tenderId : dataWork[i].tenderId,
					    	  			id: dataWork[i].id,
					    	  			nameOfCustomer : dataWork[i].nameOfCustomer,
					    	  			scopeOfWork : dataWork[i].scopeOfWork,
					    	  			workOrderStatus : dataWork[i].workOrderStatus, 
					    	  			workOrderNumber : dataWork[i].workOrderNumber,
					    	  			workOrderDate : dataWork[i].workOrderDate,
					    	  			valueOfWork : dataWork[i].valueOfWork,
					    	  			formalitiesCompleted : dataWork[i].formalitiesCompleted,
					    	  			securityDepositBGAmount : dataWork[i].securityDepositBGAmount, 
					    	  			securityDepositBGDate : dataWork[i].securityDepositBGDate,
					    	  			validityOfSecurityDepositBG : dataWork[i].validityOfSecurityDepositBG,
					    	  			dateOfWorkCompletionAsPerWorkOrder : dataWork[i].dateOfWorkCompletionAsPerWorkOrder,
					    	  			dateOfInspection : dataWork[i].dateOfInspection,
					    	  			dateOfMaterialDelivery : dataWork[i].dateOfMaterialDelivery,
					    	  			dateOfWorkCompletion : dataWork[i].dateOfWorkCompletion,
					    	  			projectCompletedInTime : dataWork[i].projectCompletedInTime, 
					    	  			expensesMadeAsOnDate : dataWork[i].expensesMadeAsOnDate,
					    	  			invoiceNumber : dataWork[i].invoiceNumber,
					    	  			dateOfInvoice : dataWork[i].dateOfInvoice,
					    	  			dateOfReceiptOfPayment : dataWork[i].dateOfReceiptOfPayment,
					    	  			workCompletedInAllRespect : dataWork[i].workCompletedInAllRespect,
					    	  			view : "<a href='#/workDetails' class='viewButton' tabindex='0'>View</a>",
					    	  			deleteWork : "<a href='#/worksinprocess' class='deleteButton' tabindex='0'>Delete</a>"
					    	  		};
					    	  }
					      
					      grid.onClick.subscribe(function(e,args) {
					    	  	   var item = dataWork[args.row]; //args.grid.getDataItem(args.row);
					    	  	 if (args.cell == grid.getColumnIndex('view'))
					    		   $scope.viewWorkDetails(item);
					    	  	 
					    	  	 if (args.cell == grid.getColumnIndex('deleteWork'))
					    	  		 {
					    	  		$http({
					    	  		  method: 'GET',
					    	  		  url: 'http://localhost:8080/SwatiElectrotechSystem/work/delete/'+item.workdId
					    	  		}).then(function successCallback(response) {
					    	  			alert("Work Successfully Deleted !!");	
					    	  			$route.reload();
					    	  		  }, function errorCallback(response) {
					    	  			alert("Failed to Delete !!");	
					    	  		  });
					    	  		 }
					    	});

				    	
				    	grid.init();
				    	dataViewWork.beginUpdate();
				    	dataViewWork.setItems(gridWorkData);
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
		                   { id: "tenderId", name: "Tender ID", field: "tenderId", width: 100, sortable: true },
		                   { id: "id", name: "Work ID", field: "id", width: 240, sortable: true },
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
		    
	      $.getJSON('http://localhost:8080/SwatiElectrotechSystem/work/completed/list', function(dataWork) {

	    	  		dataViewWork = new Slick.Data.DataView();
				      
	    	  		grid = new Slick.Grid("#worksCompletedGrid", dataViewWork, worksColumns, options);
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
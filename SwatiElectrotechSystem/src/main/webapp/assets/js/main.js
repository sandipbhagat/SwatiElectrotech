
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
                                     .when("/tenderDetails", {templateUrl: "pages/tenderdetails.jsp", controller: "PageCtrl"})
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
     
 app.controller('NewTendersCtrl', [function($scope) {
	
	
	}]);

 
 app.filter('offset', function() {
	  return function(input, start) {
	    start = parseInt(start, 10);
	    return input.slice(start);
	  };
	});


(function(ng) {
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
		    var columns = [
		                   { id: "id", name: "Tender ID", field: "id", width: 100, sortable: true },
		                   { id: "nameOfCustomer", name: "Name Of Customer", field: "nameOfCustomer", width: 240, sortable: true },
		                   { id: "scopeOfWork", name: "Scope of Work", field: "scopeOfWork", width: 240, sortable: true },
		                   { id: "estimatedValue", name: "Estimated Value", field: "estimatedValue", width: 240, sortable: true },
		                   { id: "dueDate", name: "Due Date", field: "dueDate", width: 120, sortable: true },
		                   { id: "emd", name: "EMD", field: "emd", width: 100, sortable: true },
		                   { id: "interested", name: "Interested", field: "interested", width: 120, formatter: Slick.Formatters.Checkmark, sortable: true }
		                 ];
		    var columnFilters = {};

		    function filter(item) {
		      for (var columnId in columnFilters) {
		        if (columnId !== undefined && columnFilters[columnId] !== "") {
		          var c = grid.getColumns()[grid.getColumnIndex(columnId)];
		          if ( ! (item[c.field].toLowerCase().indexOf(columnFilters[columnId].toLowerCase())  > -1 ) ) {
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
					      
					    	grid.init();
				    	    dataView.beginUpdate();
				    	    dataView.setItems(data);
				    	    dataView.setFilter(filter);
				    	    dataView.endUpdate();

		    });
		    //Slick Grid Ends
		    
	    }])	    	    

	})(angular);

(function(ng) {
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
		                   { id: "interested", name: "Interested", field: "interested", width: 120, formatter: Slick.Formatters.Checkmark, sortable: true }
		                 ];
		    var columnFilters = {};

		    function filter(item) {
		      for (var columnId in columnFilters) {
		        if (columnId !== undefined && columnFilters[columnId] !== "") {
		          var c = grid.getColumns()[grid.getColumnIndex(columnId)];
		          if ( ! (item[c.field].toLowerCase().indexOf(columnFilters[columnId].toLowerCase())  > -1 ) ) {
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
					      
					    	grid.init();
				    	    dataView.beginUpdate();
				    	    dataView.setItems(data);
				    	    dataView.setFilter(filter);
				    	    dataView.endUpdate();

		    });
		    //Slick Grid Ends
		    
	    }])	    	    

	})(angular);


(function(ng) {
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
		          if ( ! (item[c.field].toLowerCase().indexOf(columnFilters[columnId].toLowerCase())  > -1 ) ) {
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

	})(angular);

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
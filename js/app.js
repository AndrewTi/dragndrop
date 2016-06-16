var app = angular.module('dragApp', []);

	var item = [{
		id: "1",
		title: "GAV",
		discription: "gavgavgav"
	},{
		id: "2",
		title: "GAV",
		discription: "gavgavgav"
	},{
		id: "3",
		title: "GAV",
		discription: "gavgavgav"
	}];

	var bascket = [];

	app.controller('dragDataCtrl', function ($scope, dataFact, dragInfo) {
		$scope.items = item;
		$scope.bascket = bascket;

		var select;
		var selectArr;
		var dragElem;
		var coordItem;
		var coordBascket;
		var coordTarg;

		$scope.mUp = function(data) {

			if(dragInfo.checkCoord(coordItem, coordTarg)) {
				var i = 0;

				$scope.bascket.map(function(e) {

					if(e.id == data) {
						$scope.bascket.splice(i,1);
					};
					i++;

				});
				$scope.items.push(select);

			}else if(dragInfo.checkCoord(coordBascket, coordTarg)) {
				var i = 0;

				$scope.items.map(function(e) {

					if(e.id == data) {
						$scope.items.splice(i,1);
					};
					i++;

				});

				$scope.bascket.push(select);
			};

			dragElem.style.position = "static";
			dragElem = null;
			
		};

		$scope.mMove = function(e){
			
			if(!dragElem) return false;

			dragElem.style.position = "absolute";
			dragElem.style.zIndex = "9999";

			coordTarg = dataFact.getCoord(dragElem);

			dragElem.style.left = e.pageX - dragElem.offsetWidth / 2 +"px";
			dragElem.style.top = e.pageY - dragElem.offsetHeight / 2 +"px";
		};


		$scope.mDown = function(e, item) {
			var elem = e.target;

			coordItem = dataFact.getCoord(dataFact.getElId("item"));
			coordBascket = dataFact.getCoord(dataFact.getElId("bascket"));
			
			if(e.which !== 1) return false;

			dragElem = elem;
			select = item;
			
		};
	});

	app.factory('dataFact', function () {

		function getCoord(elem) {
			return {
				top: elem.offsetTop,
				left: elem.offsetLeft,
				width: elem.offsetWidth,
				height: elem.offsetHeight
			};

		};

		function getElId(data) {
			return document.getElementById(data);
		};
	
		return {
			getCoord: getCoord,
			getElId: getElId
	
		};
	});

	app.service('dragInfo', function () {	
		this.checkCoord = function(elem, targ) {

			var left = targ.left - elem.left;
			var top = targ.top - elem.top;
			var width = left + targ.width;
			var height = top + targ.height;

			if(left >= 0 && width <= elem.width && top >= 0 && height <= elem.height) {return true};

			return false;

		};
	});










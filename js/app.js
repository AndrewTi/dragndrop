var app = angular.module('dragApp', ['ngMaterial']);

	var item = [{
		id: "1",
		title: "Reactjs",
		img: "http://devstickers.com/assets/img/pro/cew3.png",
		discription: "framework"
	},{
		id: "2",
		title: "Angularjs",
		img: "http://iantonov.me/uploads/angular-js-from-xakep/angularlogo.png",
		discription: "framework"
	},{
		id: "3",
		title: "Nodejs",
		img: "http://ru.code-maven.com/img/node.png",
		discription: "framework"
	},{
		id: "4",
		title: "Meteorjs",
		img: "https://pbs.twimg.com/media/B1D53FZCAAEHsz_.png",
		discription: "framework"
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
				if(selectArr != "items") {
						$scope.bascket.map(function(e) {

					if(e.id == data) {
						$scope.bascket.splice(i,1);
					};

					i++;

				});

				$scope.items.push(select);
				};

			} else if(dragInfo.checkCoord(coordBascket, coordTarg)) {
				var i = 0;
				if(selectArr != "bascket") {
					$scope.items.map(function(e) {

					if(e.id == data) {
						$scope.items.splice(i,1);
					};
				
					i++;
				
				});
					$scope.bascket.push(select);
				}
			};

			dragElem.style.position = "static";
			dragElem = null;
			selectArr = null;
			
		};

		$scope.mMove = function(e){
			if(!dragElem) return false;

			dragElem.ondragstart = function() {
  				return false;
			};

			dragElem.style.position = "absolute";
			dragElem.style.zIndex = "9999";

			coordTarg = dataFact.getCoord(dragElem);

			dragElem.style.left = e.pageX - dragElem.offsetWidth / 1.2 +"px";
			dragElem.style.top = e.pageY - dragElem.offsetHeight / 2 +"px";
		};


		$scope.mDown = function(e, item) {
			var elem = e.target;
			
			if(e.which !== 1) return false;

			coordItem = dataFact.getCoord(dataFact.getElId("item"));
			coordBascket = dataFact.getCoord(dataFact.getElId("bascket"));

			dragElem = dataFact.selectPar(elem);
			select = item;
			coordTarg = dataFact.getCoord(dragElem);


			if (!selectArr) {
				if (dragInfo.checkCoord(coordItem, coordTarg)) {
					selectArr = "items";
				}else {
					selectArr = "bascket";
				}
			}
			
		};
	});

	app.factory('dataFact', function () {

		function selectPar(elem) {
			var a = true;
			var elem = elem;
			while(a) {
				if(!elem.hasAttribute("parent")) {
					elem = elem.parentElement;
				}else {
					a = false;
					return elem;
				};
			};
		};

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
			selectPar: selectPar,
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










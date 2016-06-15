var app = angular.module('dragApp', []);

	var item = [{
		id: "1",
		title: "GAV",
		discription: "gavgavgav"
	}];

	var bascket = [{
		id: "1",
		title: "GAV",
		discription: "gavgavgav"
	}];

	app.controller('dragDataCtrl', function ($scope, dataFact, dragInfo) {
		$scope.items = item;
		$scope.bascket = bascket;

		var select = [];
		var dragElem;
		var coordItem = dataFact.getCoord(dataFact.getElId("item"));
		var coordBascket = dataFact.getCoord(dataFact.getElId("bascket"));
		var coordTarg;

		$scope.mUp = function(data, index) {
			var index = --index;
			if(dragInfo.checkCoord(coordItem, coordTarg)) {
				$scope.items.push(select);
				$scope.bascket.splice(index,1);
				dragElem.remove();
			}else if(dragInfo.checkCoord(coordBascket, coordTarg)) {
				$scope.bascket.push(select);
				$scope.items.splice(index,1);
				dragElem.remove();
			}

			select = null;
			
			dragElem = null;
			
		};

		$scope.mMove = function(e){
			var elem = dragElem;
			
			if(!elem) return false;

			//document.body.appendChild(elem);

			elem.style.position = "absolute";
			elem.style.zIndex = "9999";
			coordTarg = dataFact.getCoord(dragElem);

			elem.style.left = e.pageX - elem.offsetWidth / 2 +"px";
			elem.style.top = e.pageY - elem.offsetHeight / 2 +"px";
		};


		$scope.mDown = function(e, item) {
			var elem = e.target;
			console.log(item);
			console.log(select);

			if(e.which !== 1) return false;

			dragElem = elem
			select = item;
			console.log(select);
			
		};
	});

	app.factory('dataFact', function () {

		function addToArr(arr,select) {
			arr.push(select[0]);
			select = null;
		}

		function removeElArr(arr, data) {
			for(var i = 0, leng = arr.length; i < leng; i++) {
				if(arr[i].id == data.id) {
					arr.splice(i, 1);
				}
			}
		}

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
			addToArr: addToArr,
			removeElArr: removeElArr,
			getCoord: getCoord,
			getElId: getElId
	
		};
	});

	app.service('dragInfo', function () {	
		function checkCoord(elem, targ) {

			var left = targ.left - elem.left;
			var top = targ.top - elem.top;
			var width = left + targ.width;
			var height = top + targ.height;

			if(left >= 0 && width <= elem.width && top >= 0 && height <= elem.height) {return true};

			return false;

		};
		return {
			checkCoord: checkCoord
		};
	});








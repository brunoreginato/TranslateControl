TranslateControl.controller("TranslateController",["$scope",function($scope){
	
	$scope.collumns = ["key","pt-br","eng-us"]; 
	$scope.terms = 	[	
						{
							"key":"casa",	
							"pt-br":"casa",
							"eng-us":"house"
						},
						{
							"key":"carro",
							"pt-br":"carro",
							"eng-us":"car"
						}
					];

	$scope.newKey = "";
	$scope.newLanguage = "";

	$scope.addNewKey = function addNewKey(){
		$scope.terms.push(Term($scope.newKey));
		$scope.newKey = "";
	};

	$scope.addNewLanguage = function addNewLanguage(){
		//this operation might be on the service that handles all Data operations
		$scope.collumns.push($scope.newLanguage);

		//updating all objects to have one more language
		for (var i = 0; i < $scope.terms.length; i++) {
			 $scope.terms[i][$scope.newLanguage] = "";
		};

		$scope.newLanguage = "";
	};

	$scope.addNewJsonKey = function () {
		debugger;
		$.getJSON($scope.jsonFile.fileName, function(json) {
		    console.log(json); // this will show the info it in firebug console
		});	
	};

	//Constructor 
	//TODO: Convert this in a Model
	function Term(key){
		var Term = {};

		for (var i = 0; i < $scope.collumns.length; i++) {
			Term[$scope.collumns[i]] = "";
		};

		Term["key"] = key;

		return Term;
	}
}]);

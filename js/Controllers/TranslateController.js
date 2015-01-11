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
	$scope.inputJsonLanguage = "key";
	$scope.jsonInput = "";

	$scope.addNewKey = function addNewKey(){
		$scope.terms.push(Term($scope.newKey));
		$scope.newKey = "";
	};

	$scope.addNewLanguage = function (){
		//this operation might be on the service that handles all Data operations
		$scope.collumns.push($scope.newLanguage);

		//updating all objects to have one more language
		for (var i = 0; i < $scope.terms.length; i++) {
			 $scope.terms[i][$scope.newLanguage] = "";
		};

		$scope.newLanguage = "";
	};

	$scope.addNewJsonKeys = function () {
		//this operation might be on the service that handles all Data operations
		var json = JSON.parse($scope.jsonInput);

		addDistinctJSONKeysToLanguage($scope.inputJsonLanguage,json);
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

	function addDistinctJSONKeysToLanguage(language,json){
		for (var key in json) {
			var keyExists = false;

			for (var i = 0; i < $scope.terms.length; i++) {
				//exists a key in terms
				if($scope.terms[i].key === key){
					keyExists = true;
					console.log("[KEY] " + key);
					console.log("[VALUE] " + json[key]);
					//we update/add the new language value for this key
					$scope.terms[i][language] = json[key];
				}
			}

			if(!keyExists){
				var newTerm = Term(key);
				newTerm[language] = json[key];

				$scope.terms.push(newTerm);

				console.log("[NOT EXISTENT][KEY] " + key);
				console.log("[NOT EXISTENT][LANG] " + language);
				console.log("[NOT EXISTENT][VALUE] " + newTerm[language]);
			}
		}
	}
}]);

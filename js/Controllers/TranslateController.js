TranslateControl.controller("TranslateController",["$scope",function($scope){
	$scope.terms = { "pt-br":{"casa":"casa","carro":"carro"},
				    "eng-us":{"casa":"house","carro":"car"}
				   };

	$scope.newKey = "";
	$scope.newLanguage = "";
	$scope.inputJsonLanguage = "";
	$scope.jsonInput = "";
	$scope.motherLanguage = "";

	$scope.setMotherLanguage = function(language){
		$scope.motherLanguage = language;
	}

	$scope.addNewKey = function addNewKey(){
		if(!keyExists($scope.newKey))
		{
			for (var key in json) {
				 $scope.terms[key][$scope.newLanguage] = "";
			};

			$scope.newKey = "";
		}
		else{
			console.log("[ADD NEW KEY] This key already exists");
		}
	};

	$scope.addNewLanguage = function (){
		//this operation might be on the service that handles all Data operations
		$scope.terms[$scope.newLanguage] = copyJson($scope.terms[$scope.motherLanguage]);

		$scope.newLanguage = "";
	};

	$scope.addNewJsonKeys = function () {
		//this operation might be on the service that handles all Data operations
		var json = JSON.parse($scope.jsonInput);

		addDistinctJSONKeysToLanguage($scope.inputJsonLanguage,json);
	};

	//the methods above must be in a service
	function addDistinctJSONKeysToLanguage(language,json){
		for (var key in json) {
			//we update/add the new language value for this key
			$scope.terms[language][key] = json[key];

			//if this key doesn't exists on the other languages, we add it with the
			// deafult value.
			if(!$scope.terms.hasOwnProperty(key)) {
				for (var language in $scope.terms) {
					$scope.terms[language][key] = json[key];
				}
			}
		}
	}

	function keyExists(key){
		//All the arrays must be the same number of keys
		if($scope.terms.length > 0){
			return $scope.terms[0].hasOwnProperty(key);
		}

		return false;
	}

	function copyJson(json){
		return JSON.parse(JSON.stringify(json));
	}
}]);

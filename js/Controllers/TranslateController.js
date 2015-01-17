TranslateControl.controller("TranslateController",["$scope","TranslateControlCore","TranslateControlConstraints",function($scope,TranslateControlCore,TranslateControlConstraints){
	$scope.terms = TranslateControlCore.languages;
	$scope.motherLanguage = TranslateControlCore.motherLanguageName;

	$scope.newKey = "";
	$scope.newLanguage = "";
	$scope.inputJsonLanguage = "";
	$scope.jsonInput = "";
	

	$scope.setMotherLanguage = function(language){
		TranslateControlCore.motherLanguageName = language;
		$scope.motherLanguage = language;
	}

	$scope.addNewKey = function addNewKey(){
		switch(TranslateControlCore.addKey($scope.newKey)){
			case TranslateControlConstraints.status.OK:
				$scope.newKey = "";
				console.log("[ADD KEY] Key added successfully");
			break;

			case TranslateControlConstraints.status.NOK:
				console.log("[ADD KEY] Error on add key");
			break;

			case TranslateControlConstraints.keyOperationsStatus.KEY_EXISTS:
				console.log("[ADD KEY] The key already exists");
			break;
		}
	};

	$scope.addNewLanguage = function (){
		switch(TranslateControlCore.addNewLanguage($scope.newLanguage)){
			case TranslateControlConstraints.status.OK:
				$scope.newLanguage = "";
				console.log("[ADD LANGUAGE] Language added successfully");
			break;

			case TranslateControlConstraints.status.NOK:
				console.log("[ADD LANGUAGE] Error on add language");
			break;

			case TranslateControlConstraints.languageOperationsStatus.LANGUAGE_EXISTS:
				console.log("[ADD LANGUAGE] The language already exists");
			break;
		}
	};

	$scope.addNewJsonKeys = function () {
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
}]);

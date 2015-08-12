(function(){
  angular.module('translatecontrol.home')
	.controller('HomeController', HomeController);

	HomeController.$inject = ["$scope", "TranslateControlCore", "ModelsFactory"];
	function HomeController($scope, TranslateControlCore, ModelsFactory) {
	  load();

	  function load() {
		  $scope.languages = TranslateControlCore.languages;
		  $scope.motherLanguage = TranslateControlCore.motherLanguage;
		  $scope.newTerm = new ModelsFactory.Term("","");
		  $scope.newLanguageName = "";
	  }

	  $scope.addNewLanguage = function() {
		TranslateControlCore.addLanguage($scope.newLanguageName);
		$scope.newLanguageName = "";
	  };

	  $scope.addNewTerm = function() {

	  	addTermToAllLanguages($scope.newTerm)
		$scope.newTerm.key = "";
	  };

	  function addTermToAllLanguages(term) {
	  	//adding the new term for each language
		for (var i = 0; i < $scope.languages.length; i++) {
		  $scope.languages[i].addTerm(term);
		}
	  }

	  $scope.getAllKeys = function() {
		var keys = [];

		if(TranslateControlCore.motherLanguage) {
			for (var key in TranslateControlCore.motherLanguage.terms) {
			  if (TranslateControlCore.motherLanguage.terms.hasOwnProperty(key)) {
				keys.push(key);
			  }
			}
		}

		//sorting
		keys = keys.sort(function(a,b) {return a - b;});

		return keys;
	  };

	  $scope.updateTermWithValueOfLanguage = function(key, value, language) {
		language.updateTerm(new ModelsFactory.Term(key,value));
	  };

	  //IMPORTING DATA
	  $scope.importKeys = function() {
		var file = document.getElementById("fileInput").files[0];
		var fileReader = new FileReader();

		fileReader.onload = function(){
			var jsonKeys = JSON.parse(fileReader.result);


			//add new language
			var newLanguage = TranslateControlCore.addLanguage($scope.importLanguageName);

			//for each key in the resource
			var value;
			for (var key in jsonKeys){
			    if (jsonKeys.hasOwnProperty(key)) {
					value = jsonKeys[key];

					addTermToAllLanguages(new ModelsFactory.Term(key,""));

					//update the value of the keys, for the language
					$scope.updateTermWithValueOfLanguage(key,value,newLanguage);
			    }
			}
		};

		fileReader.readAsText(file);
	  };

	}
})()

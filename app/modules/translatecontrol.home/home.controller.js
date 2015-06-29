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
        var newLanguage = TranslateControlCore.addLanguage($scope.newLanguageName);

        if(!TranslateControlCore.motherLanguage)
          TranslateControlCore.motherLanguage = newLanguage;

        $scope.newLanguageName = "";
      };

      $scope.addNewTerm = function() {
        //adding the new term for each language
        for (var i = 0; i < $scope.languages.length; i++) {
          $scope.languages[i].addTerm($scope.newTerm);
        }

        $scope.newTerm.key = "";
      };

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

      };
    }
})()

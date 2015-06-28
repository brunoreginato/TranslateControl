(function(){
  angular.module('translatecontrol.home')
    .controller('HomeController', HomeController);

    HomeController.$inject = ["$scope", "TranslateControlCore", "ModelsFactory"];
    function HomeController($scope, TranslateControlCore, ModelsFactory) {
      load();

      function load() {
        TranslateControlCore.init().then(function() {
          $scope.languages = TranslateControlCore.languages;
          $scope.motherLanguage = TranslateControlCore.motherLanguage;
          $scope.newTerm = new ModelsFactory.Term("New Key","");
        });
      }

      $scope.addNewTerm = function() {
        
      };
    }
})()

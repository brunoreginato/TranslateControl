(function(){
  angular.module('translatecontrol')
    .service('TranslateControlCore', TranslateControlCore);

    TranslateControlCore.$inject = ['ModelsFactory'];
    function TranslateControlCore(ModelsFactory) {
      var TranslateControlCoreObj = {};

      TranslateControlCoreObj.languages = [];
      TranslateControlCoreObj.motherLanguage = null;

      TranslateControlCoreObj.init = function() {
        //TODO:get all languages and the motherLanguage
      };

      TranslateControlCoreObj.addLanguage = function(languageName){
        var language = new ModelsFactory.Language();
        language.id = languageName;

        if(TranslateControlCoreObj.indexOfLanguage(language) === -1) {
          TranslateControlCoreObj.languages.push(language);
        }
      };

      TranslateControlCoreObj.removeLanguage = function(language) {
        var indexOfLanguage = TranslateControlCoreObj.indexOfLanguage(language);

        if(indexOfLanguage !== -1) {
          TranslateControlCoreObj.languages.slice(indexOfLanguage,1);
        }
      };

      TranslateControlCoreObj.indexOfLanguage = function(language) {
        var indexOfLanguage = -1;
        for (var i = 0; i < TranslateControlCoreObj.languages.length; i++) {
          if(TranslateControlCoreObj.languages[i].id === language.id)
            indexOfLanguage = i;
        }

        return indexOfLanguage;
      };

      return TranslateControlCoreObj;
    }
})()

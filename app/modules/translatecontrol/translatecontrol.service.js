(function(){
  angular.module('translatecontrol')
    .service('TranslateControlCore', TranslateControlCore);

    TranslateControlCore.$inject = ['ModelsFactory'];
    function TranslateControlCore(ModelsFactory) {
      var TranslateControlCoreObj = {};

      /**
       * Object that will store all languages
       * @type {Array}
       */
      TranslateControlCoreObj.languages = [];

      /**
       * The default language. If a key in another language
       * doesn't have a value, the value of the mother language will be assumed.
       *
       * @type {ModelsFacotry.Language}
       */
      TranslateControlCoreObj.motherLanguage = null;

      /**
       * This methot is used to load all languages from db.
       */
      TranslateControlCoreObj.init = function() {
        //TODO: get all languages and the motherLanguage from db
      };

      /**
       * The addLanguage method recives a string that represents
       * the name of the new language and based on that, we verify
       * if a language with that name exists. If exists, we return
       * the language with that name, else e alloc a new language coping
       * all Terms from mother language.
       *
       * @param {String} languageName name of the language that will be added
       */
      TranslateControlCoreObj.addLanguage = function(languageName){
        var language = new ModelsFactory.Language();
        language.id = languageName;
        var indexOfLanguage = TranslateControlCoreObj.indexOfLanguage(language);

        if(indexOfLanguage === -1) {
          //We create all terms based on the mother language
          if(TranslateControlCoreObj.motherLanguage) {
            language = angular.copy(TranslateControlCoreObj.motherLanguage);
            language.id = languageName;
          }

          TranslateControlCoreObj.languages.push(language);
        } else {
            language = TranslateControlCoreObj.languages[indexOfLanguage];
        }

        //We set the mother language
        if(!TranslateControlCoreObj.motherLanguage)
          TranslateControlCoreObj.motherLanguage = language;

        return language;
      };

      /**
       * Removes the language passed by parameter
       * @param  {ModelsFactory.Language} language language that will be deleted
       */
      TranslateControlCoreObj.removeLanguage = function(language) {
        var indexOfLanguage = TranslateControlCoreObj.indexOfLanguage(language);

        if(indexOfLanguage !== -1) {
          TranslateControlCoreObj.languages.slice(indexOfLanguage,1);
        }

        //the language is the motherlanguage, we need to set another mother language
        if(TranslateControlCoreObj.motherlanguage == language) {
          TranslateControlCoreObj.motherlanguage = TranslateControlCoreObj.languages.length > 0 ? TranslateControlCoreObj.languages[0] : null;
        }
      };

      /**
       * Helper that return the index of a language.
       *
       * @param  {ModelsFactory.Language} language language that wants to know the index
       * @return {Number} returns the index of the language passed by parm.
       */
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

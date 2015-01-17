/**
 * @module TranslateControlCore
 *
 * This module handles the data operation from translate control. 
 */
TranslateControl.service("TranslateControlCore", function(TranslateControlConstraints){
	var TranslateControlCore = { 
		/**
		 * Languages property stores the translations for each language. 
		 * A language is defined as a JSON property and the value of this property
		 * is another JSON that has all keys translated.
		 * 
		 * @type JSON
		 * @default undefined
		 */
		languages: undefined,

		/**
		 * This method tries to add a new key for each language, if the key already exist, 
		 * a status of existent key is returned
		 * @param {string} newKey
		 * @return {status/keyOperationStatus} returns a status of operation
		 */
		addKey: undefined,

		/**
		 * Verifies if a key passed by param exists in the languages.
		 * @param  {string} key
		 * @return {bool}
		 */
		keyExists: undefined,

		/**
		 * Adds a language to languages data source
		 * @param {string} languageName
		 * @return {status/languageOperationStatus} returns a status of operation
		 */
		addLanguage: undefined,

		/**
		 * Verifies if a language passed by param exists in the languages.
		 * @param  {string} languageName
		 * @return {bool}
		 */
		languageExists: undefined,

		/**
		 * This property represents the name of language that will be the base of keys
		 * when a new language be added. 
		 * @type {string} motherLanguageName
		 */
		motherLanguageName: undefined
	};

	//MOCKED
	TranslateControlCore.languages = { 
				"pt-br":{"casa":"casa","carro":"carro"},
				"eng-us":{"casa":"house","carro":"car"}
			   };

	TranslateControlCore.keyExists = function(key){
		if(TranslateControlCore.languages.length > 0){
			return TranslateControlCore.languages[0].hasOwnProperty(key);
		}

		return false;
	};
	
	TranslateControlCore.addKey = function(newKey){
		if(!TranslateControlCore.keyExists(key))
		{
			try{
				for (var language in TranslateControlCore.languages) {
					 language[newKey] = "";
				};	

				return TranslateControlConstraints.status.OK;
			}
			catch(err){
				return TranslateControlConstraints.status.NOK;
			}
		}
		else
			return TranslateControlConstraints.keyOperationsStatus.KEY_EXISTS;
	};

	TranslateControlCore.languageExists = function(languageName){
		return TranslateControlCore.languages.hasOwnProperty(languageName);
	};

	TranslateControlCore.addLanguage = function(languageName){
		if(!TranslateControlCore.languageExists(languageName))
		{
			try{
				if(TranslateControlCore.motherLanguageName !== undefined){
					angular.copy(TranslateControlCore.languages[TranslateControlCore.motherLanguageName],TranslateControlCore.languages[languageName]);
					return TranslateControlConstrains.status.OK;
				}
				else {
					if(TranslateControlCore.languages.length > 0){
						//FIXME: Problaby this will not work, I can´t iterate inside a JSON.
						angular.copy(TranslateControlCore.languages[0],TranslateControlCore.languages[languageName]);	
						return TranslateControlConstraints.status.OK;
					}
					else{
						return TranslateControlConstraints.status.NOK;
					}
				}
			}
			catch(err){
				return TranslateControlConstraints.status.NOK;
			}
		}
		else
			return TranslateControlConstraints.languageOperationsStatus.LANGUAGE_EXISTS;
	};
    

    return TranslateControlCore;
});
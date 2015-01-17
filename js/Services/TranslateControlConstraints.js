/**
 * @module TranslateControlConstrains
 *
 * This module defines the constraints of this project
 */
TranslateControl.service("TranslateControlConstraints", function(){
	var counter = 0;

	var TranslateControlConstraints = { 
		/**
		 * The status property define the general status for all operations
		 * @type JSON
		 */
		status:{ OK: counter++, NOK: counter++ },

		/**
		 * Statuses for key operations
		 * @type JSON
		 */
		keyOperationsStatus: { KEY_EXISTS: counter++ },

		/**
		 * Statuses for language operations
		 * @type JSON
		 */
		languageOperationsStatus: { LANGUAGE_EXISTS: counter++ }
	};

    return TranslateControlConstraints;
});
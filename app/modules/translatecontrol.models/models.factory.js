(function(){
  angular.module('translatecontrol.models')
  .factory('ModelsFactory',ModelsFactory);

  function ModelsFactory() {
      var ModelsFactoryObj = {};

      ModelsFactoryObj.Language = Language;
      ModelsFactoryObj.Term = Term;

      return ModelsFactoryObj;
  };

  //Definition of Term
  function Term(key,value) {
    this.key = key;
    this.value = value;
  }

  //Definition of language
  function Language() {
    this.id = null;
    this.terms = {};
  }

  Language.prototype.addTerm = function(term){
    if(!this.termExists(term)) {
      this.terms[term.key] = term.value;
    }
  };

  Language.prototype.removeTerm = function(term){
    if(this.termExists(term)) {
      delete this.terms[term.key];
    }
  };

  Language.prototype.termExists = function(term){
    return this.terms.hasOwnProperty(term.key);
  };

  Language.prototype.updateTerm = function(term){
    if(this.termExists(term)) {
      this.terms[term.key] = term.value;
    }
  };

})()

const Parsed=require("./parsed.js");
const ParseInfo=require("./parseInfo.js");
const errors=function(filePath){return "../src/errors/"+filePath};
const InvalidKeyError=require("./errors/invalidKeyError.js");

const contains=function(list,key,caseSensitiveCheck) {
  return list.find(function(validKey){
    if(caseSensitiveCheck){
      return key == validKey;
    }
    return isStrictEqual(key,validKey);
  });
}

const isStrictEqual = function(key,validKey){
  return key.toLowerCase()==validKey.toLowerCase();
}

var StrictParseInfo=function(initialParsingFunction,validKeys,isCaseSensitive) {
  ParseInfo.call(this,initialParsingFunction);
  this.validKeys=validKeys;
  this.caseSensitiveCheck = isCaseSensitive;
}

StrictParseInfo.prototype=Object.create(ParseInfo.prototype);

StrictParseInfo.prototype.pushKeyValuePair=function() {
  let caseSensitiveCheck = this.caseSensitiveCheck;
  if(!contains(this.validKeys,this.currentKey,caseSensitiveCheck))
    throw new InvalidKeyError("invalid key",this.currentKey,this.currentPos);
  this.parsedKeys[this.currentKey]=this.currentValue;
  this.resetKeysAndValues();
}

module.exports=StrictParseInfo;

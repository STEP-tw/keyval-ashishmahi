const Parser=require("./keyValueParser.js");
const strictParseInfoCreator=require("./parseInfoCreator.js").strict;

var StrictParser=function(listOfKeys,isCaseSensitiveParsing=true) {
  Parser.call(this);
  let sanitisedListOfKeys=listOfKeys||[];
  this.parseInfoCreator=strictParseInfoCreator(sanitisedListOfKeys,isCaseSensitiveParsing);
}

StrictParser.prototype=Object.create(Parser.prototype);
module.exports=StrictParser;

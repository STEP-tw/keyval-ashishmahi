const src=function(filePath){return "../src/"+filePath};
const errors=function(filePath){return "../src/errors/"+filePath};
const InvalidKeyError=require(errors('invalidKeyError.js'));
const assert=require('chai').assert;
const Parsed=require(src('parsed.js'));
const StrictParser=require(src('index.js')).StrictParser;

var invalidKeyErrorChecker=function(key,pos) {
  return function(err) {
    if(err instanceof InvalidKeyError && err.invalidKey==key && err.position==pos){
      return true;
    }
    return false;
  }
};

describe("strict parser that is case insensitive",function(){
  it("should parse when specified key is in lower case and actual is not",function(){
    let kvParser=new StrictParser(["name"],false);
    // false indicates that case sensitive is false. By default it is true
    let expected=new Parsed();
    expected["NAME"]="jayanth";
    let parsed=kvParser.parse("NAME=jayanth");
    assert.deepEqual(parsed,expected);
  });

  it("should throw error when specified keys are in lower case and actual is not",function(){
    let kvParser=new StrictParser(["name"],true);
    assert.throws(
      () => {
        try {
          var p=kvParser.parse("NAME=JAYANT");
        } catch (e) {
          if(invalidKeyErrorChecker("NAME",10)(e)) throw e;
        }
      },
      Error,"invalid key");
  });

  it("should parse when specified keys are in lower case and actual is not",function(){
    let kvParser=new StrictParser(["name","age"],false);
    let expected=new Parsed();
    expected["NAME"]="jayanth";
    expected["Age"] = "23";
    let parsed=kvParser.parse("NAME=jayanth Age=23");
    assert.deepEqual(parsed,expected);
  })

  it("should parse keys when specified key is in mixed case and actual is not regardless of values",function(){
    let kvParser=new StrictParser(["NaMe","AgE"],false);
    let expected=new Parsed();
    expected["NAME"]="jayanth";
    expected["Age"] = "23";
    let parsed=kvParser.parse("NAME=jayanth Age=23");
    assert.deepEqual(parsed,expected);
  })

});





describe("strict parser that is case sensitive",function(){
  it("should throw error when specified keys are in lower case and actual is not",function(){
    let kvParser=new StrictParser(["name"],true);
    // true indicates that parser is case sensitive
    assert.throws(()=>{
      kvParser.parse("NAME=jayanth");
    })
  });
});

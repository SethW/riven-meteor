FilterInput = function FilterInput(input){
  if(input === ''){
    Turn.log = Turn.log + '<br/>Please enter something';
  }else if(input.search("abort") !== -1 || input.search("cancel") !== -1){
    //Turn.stepBack();
  //}else if(input.search("end turn") == -1 || input.search("finish turn") == -1 || input.search("finish turn") == -1){
  }else if(/(([eE]nd )|([fF]inish )|([cC]ancel ))([\w']* ){0,1}(turn)/g.test(input)){
    Turn.finish();
  }else if(/(([rR]emove )|([cC]ancel ))([eEaA]ffect ){0,1}/g.test(input)){
    return {raw: input, special: 'remove-effect'};
  }else if(input.search("stats") !== -1){

  }else{
    return {raw: input, special: false};
  }
};

GetRandomInt = function GetRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

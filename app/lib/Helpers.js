FilterInput = function FilterInput(input){
  if(input === ''){
    Turn.message = 'Please enter something';
  }else if(input.search("abort") !== -1 || input.search("cancel") !== -1){
    Turn.stepBack();
  //}else if(input.search("end turn") == -1 || input.search("finish turn") == -1 || input.search("finish turn") == -1){
  }else if(/((end )|(finish ))(my )*(turn)/g.test(input)){
    Turn.finish();
  }else if(input.search("stats") !== -1){

  }else{
    return input;
  }
};

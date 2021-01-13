const router = require("express-promise-router")();
const axios = require('axios');

router.get('/', async function(req, res){
  console.log('/');
  console.log(req.body);
  console.log('');
  res.send(null);
});

router.post('/trusk/average', async function(req, res){
  //https://trusk-ctf.herokuapp.com/11bf5b37-e0b8-42e0-8dcf-dc8c4aefc000/webhook/avg
  console.log(req.headers['links'])
  let avg = average(req.body['idx'], req.body['value']);
  axios.post('https://trusk-ctf.herokuapp.com/11bf5b37-e0b8-42e0-8dcf-dc8c4aefc000/webhook/avg', {
    response : avg,
  })
  .then((res) => {
    console.log(`statusCode: ${res.statusCode}`)
    console.log(res)
  })
  .catch((error) => {
    console.error(error)
  })
  res.send(null);
});

router.post('/trusk/unique', async function(req, res){
  //https://trusk-ctf.herokuapp.com/11bf5b37-e0b8-42e0-8dcf-dc8c4aefc000/webhook/unique
  console.log(req.headers['links'])
  console.log(unique(req.body['idx'], req.body['value']));
  res.send(null);
});


var strings = new Array();

function unique(idx, value){

  var unq = 0;
  if (idx == 0){
    strings = new Array();
  }
  for(var i = 0; i < value.length; i++){
    if(!strings.includes(value[i])){
        strings.push(value[i]);
        unq += 1;
    }
  }
  return unq;
}


var numbers = new Array();

function average(idx, value){
  if(idx == 0){
    numbers = new Array();
    var avg = 0;
    for(var i = 0; i < value.length; i++){
      avg += value[i];
      numbers.push(value[i]);
    }
    return Math.round(avg/value.length);
  }
  else{
    var avg = 0;
    for(var i = 0; i < numbers.length; i++){
      avg += numbers[i];
    }
    for(var i = 0; i < value.length; i++){
      avg += value[i];
      numbers.push(value[i]);
    }
    return Math.round(avg/(numbers.length + value.length));
  }
}

module.exports = router;
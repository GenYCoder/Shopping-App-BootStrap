angular.module("customService", [])
  .factory("Product", function($http){
    //use to getting the product data
    var products = [];
    return {
      add:function(){
        $http.get("models/data.json").then(function(response){
          products = response.data;
        }, function(response){
          alert("fail to get data");
        });
      },
      search:function(ID){
        //return if there's no data and id parameter is not an interger
        var ID = parseInt(ID);
        if(products.length === 0){
          return;
        }else{
          for(var i = 0, dataLen = products.length; i < dataLen; i++){
            if(products[i].ID === ID){
              return products[i]; //will return the object if a match is found
            }
          }
        }
      },
      get:function(){
        return products;
      },
      getChunk:function(size){
        //this function will break down the product array into chunks
        return this.chunk(products, size);
      },
      chunk: function(arr, size){
        var newArr = [];
        for(var i = 0, arrLen = arr.length; i < arrLen; i+=size){
          newArr.push(arr.slice(i, i+size)); //getting only a chunk of the data
        }
        return newArr;
      }
    }
  })
  .factory("Cart", function($sessionStorage){
    //this will remember the data that will be save on the cart by session storage
  

    //check if key exist in the session storage 
    if( !$sessionStorage.hasOwnProperty("cartBasket") ){
      $sessionStorage.cartBasket = [];   
    }
    
    return {
      add:function(item){
        
        var addedToExistingItem = false;
        
        if(angular.isObject(item))
        {
          //will check the cart if item exist and will adjust the quantity of items
          for(var i=0, onCart = $sessionStorage.cartBasket.length; i < onCart; i++)
          {

            if($sessionStorage.cartBasket[i].ID === item.ID){
              $sessionStorage.cartBasket[i].Qty += item.Qty;
              addedToExistingItem = true;
              break;
            }
          }
          //if the item doesn't exist then add to cartBasket
          if(!addedToExistingItem){
            $sessionStorage.cartBasket.push(item);
            
          }
          
        }else{
          return; //if item is not an object then return 
        }

      },
      remove:function(ID){
        //find the item based on ID then delete it off the basket
        for(var i=0, onCart = $sessionStorage.cartBasket.length; i < onCart; i++){
          if($sessionStorage.cartBasket[i].ID === ID ){
            $sessionStorage.cartBasket.splice(i, 1);
            break;
          }
        }
      },
      get:function(){
        return $sessionStorage.cartBasket;
      },
      getSubTotal:function(){
        //this function will sum up the subtotal in the cart
        var total = 0;
        //checking if cart is empty
        if($sessionStorage.cartBasket.length == 0){
          return total;
        }else{
          for(var i=0, onCart = $sessionStorage.cartBasket.length; i < onCart; i++ ){
            total += ($sessionStorage.cartBasket[i].Price * $sessionStorage.cartBasket[i].Qty);
          }

          return total;
          
        }
      }
    }    
  })
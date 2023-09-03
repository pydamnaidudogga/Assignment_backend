

// the controller is used to get the quotes form the source
module.exports.quotes = async (req, res)=>{
  try {

    const data =  [

      {
        buy_price: 140.3,
        sell_price: 144,
        source: "<https://www.ambito.com/contenidos/dolar.html>"
      },
      {
        buy_price: 110.3,
        sell_price: 174,
        source: "<https://www.ambito.com/contenidos/dolar.html>"
      },
      {
        buy_price: 110.3,
        sell_price: 194,
        source: "<https://www.ambito.com/contenidos/dolar.html>"
     }

    ]
        
         
    return res.status(200).json({
      data
  });
  } catch (error) {
      console.error('Error fetching quotes:', error.message);
      return res.status(500).json({error});
  }

}



// the controller is used to get the average form the source
module.exports.average = async (req, res)=>{
  try {
        
    const data = [
      {
        average_buy_price: 142.3,
        average_sell_price: 147.4
      },
      {
        average_buy_price: 140.3,
        average_sell_price: 137.4
      },
      {
        average_buy_price: 110.3,
        average_sell_price: 157.4
      },
      {
        average_buy_price: 192.3,
        average_sell_price: 137.4
      }
    ]
    return res.status(200).json({
      data
    });
  } catch (error) {
    console.error('Error fetching quotes:', error.message);
    return res.status(500).json({error});
  }

}

// the controller is used to get the slippage form the source
module.exports.slippage = async (req, res)=>{
  try {
        
         const data = [

          {
            buy_price_slippage: 0.04,
            sell_price_slippage: -0.02,
            source: "<https://www.ambito.com/contenidos/dolar.html>"
          },
          {
            buy_price_slippage: 0.05,
            sell_price_slippage: -0.09,
            source: "<https://www.ambito.com/contenidos/dolar.html>"
          },
          {
            buy_price_slippage: 0.08,
            sell_price_slippage: -0.03,
            source: "<https://www.ambito.com/contenidos/dolar.html>"
          }

         ]
    return res.status(200).json({
      data
    });
  } catch (error) {
    console.error('Error fetching quotes:', error.message);
    return res.status(500).json({error});
  }

}


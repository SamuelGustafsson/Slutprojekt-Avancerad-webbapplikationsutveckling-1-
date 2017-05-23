let hbs = require('hbs');

hbs.registerHelper({
  sum: function(items, options){
    return items.reduce((a, b) => { return a + b; });
  },
  avg: function(items, options){
    let sum = items.reduce((a, b) => { return a + b; });
    return ( sum / items.length );
  },
  localDate: function(items , options) {
   var result = new Date(items);
   return result.toLocaleDateString(); 
  }
});

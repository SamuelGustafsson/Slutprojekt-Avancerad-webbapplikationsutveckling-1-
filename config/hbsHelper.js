let hbs = require('hbs');
let moment = require('moment');

hbs.registerHelper({
  sum: function (items, options) {
    return items.reduce((a, b) => { return a + b; });
  },
  avg: function (items, options) {
    let sum = items.reduce((a, b) => { return a + b; });
    return (sum / items.length);
  },
  localDate: function (items, options) {
    let result = new Date(items);
    return result.toLocaleDateString();
  },
  setTransmissionType: function (items, options) {
    let result = '';
    if (items) {
      result = 'Automatic';
    } else {
      result = 'Manual';
    }
    return result;
  },
  totalPrice: function (date_from, date_to, daily_price, options) {
    let start_date = moment(date_from);
    let return_date = moment(date_to);
    let days = return_date.diff(start_date, 'days') // 1

    const totalprice = days * daily_price;
    return totalprice + " SEK";
  }

});

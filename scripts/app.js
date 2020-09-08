// Getting the form
const UIform = document.querySelector('#loan-form');

UIform.addEventListener('submit', e => {
  e.preventDefault();

  // UI vars
  const UIamount = document.querySelector('#amount');
  const UIinterest = document.querySelector('#interest');
  const UIyears = document.querySelector('#years');
  const UImonthlyPayment = document.querySelector('#monthly-payment');
  const UItotalPayment = document.querySelector('#total-payment');
  const UItotalInterest = document.querySelector('#total-interest');

  const principal = parseFloat(UIamount.value);
  const calculatedInterest = parseFloat(UIinterest.value) / 100 / 12;
  const calculatedPayments = parseFloat(UIyears.value) * 12;

  // Compute monthly payment
  const x = Math.pow( 1 + calculatedInterest, calculatedPayments);
  const monthly = (principal*x*calculatedInterest)/(x-1);

  if(isFinite(monthly)){
    // Display our results
    UImonthlyPayment.value = monthly.toFixed(2);
    UItotalPayment.value = (monthly*calculatedPayments).toFixed(2);
    UItotalInterest.value = ((monthly*calculatedPayments)-principal).toFixed(2);
  }else{
    console.log('Please check your number')
  }
});

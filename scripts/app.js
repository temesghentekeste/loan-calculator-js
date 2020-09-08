// Getting the form
const UIform = document.querySelector('#loan-form');


const showError = error => {
  // Create div for error message
  const UIerrorDiv = document.createElement('div');

  // Get elements
  const UIcard = document.querySelector('.card');
  const UIheading = document.querySelector('.heading');

  // Add class to the div
  UIerrorDiv.className = 'alert alert-danger';
  // Add textNode and append to the div
  UIerrorDiv.appendChild(document.createTextNode(error));

  // Insert error above heading
  UIcard.insertBefore(UIerrorDiv, UIheading);

  // Clear error after 3 seconds
  setTimeout(() => {
    document.querySelector('.alert').remove();
  }, 3000);
};


const calculateResult = () => {
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
  // eslint-disable-next-line no-restricted-properties
  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = (principal * x * calculatedInterest) / (x - 1);

  // eslint-disable-next-line no-restricted-globals
  if (isFinite(monthly)) {
    // Display our results
    UImonthlyPayment.value = monthly.toFixed(2);
    UItotalPayment.value = (monthly * calculatedPayments).toFixed(2);
    UItotalInterest.value = ((monthly * calculatedPayments) - principal).toFixed(2);

    // Show results
    document.querySelector('#results').style.display = 'block';
    // Hide loader
    document.querySelector('#loading').style.display = 'none';
  } else {
    // Hide loader
    document.querySelector('#loading').style.display = 'none';
    showError('Please check your numbers');
  }
};

UIform.addEventListener('submit', e => {
  e.preventDefault();

  // Hide results
  document.querySelector('#results').style.display = 'none';

  // Display loader
  document.querySelector('#loading').style.display = 'block';

  setTimeout(() => {
    calculateResult();
  }, 2000);
});

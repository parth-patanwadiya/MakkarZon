import { formatCurrency } from '../Scripts/utils/money.js';

console.log('test suite: formatCurrency');

// Basic Test Case

console.log('Converts cents into dollars');

if(formatCurrency(2095) === '20.95'){
  console.log('Passed');
}
else{
  console.log('Failed');
}

// Edge Cases

console.log('Works with 0');

if(formatCurrency(0) === '0.00'){
  console.log('Passed');
}
else{
  console.log('Failed');
}

console.log('Rounds up to the nearest cent');

if(formatCurrency(2000.5) === '20.01'){
  console.log('Passed');
}
else{
  console.log('Failed');
}

console.log('Rounds down to the nearest cent');

if(formatCurrency(2000.4) === '20.00'){
  console.log('Passed');
}
else{
  console.log('Failed');
}
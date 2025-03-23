// <!-- 機能要件
// パスワードの長さを指定  (10~100)
// 使用する文字種（大文字・小文字・数字・記号）を選択 (input-4)
// ーーチェックボックスで文字種を選択可能に
// 生成ボタンでランダムなパスワードを作成(button-1)
// --crypto.getRandomValues() を活用してランダムな文字を選択
// クリップボードにコピー機能(button1)
// ーーnavigator.clipboard.writeText() でコピー機能を実装 -->
// ＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿
let password;
let length = 15;
let targetLength = 15;
let display = document.getElementById('display');

const clip = () => {
  navigator.clipboard.writeText(password)
  .then(() => {
    console.log('Text copied to clipboard!'+ password);
  })
  .catch(err => {
    console.error('Failed to copy text: ', err);
  });

};

function viBtn() {
  if(display.value === ''){
    display.value = password;
  }else{
    display.value = '';
  }
}



function generatePass() {
  targetLength = Number(document.getElementById('length').value);
  if(targetLength === 0) {
    targetLength = 15;
  }else if(typeof targetLength === 'number' && !isNaN(targetLength)) {
    length = targetLength;
  }else {
    alert('無効な数字です');
  }
  let upper = document.getElementById('upper').checked; 
  let lower = document.getElementById('lower').checked; 
  let digit = document.getElementById('digit').checked; 
  let symbol = document.getElementById('symbol').checked;


  let type = '';

  if (upper && lower && digit && symbol) {
    type = 'allCase';
  } else if (symbol && lower && digit) {
    type = 'lAndDAndSCase';
  } else if (symbol && upper && digit) {
    type = 'uAndDAndSCase';
  } else if (digit && upper && lower) {
    type = 'alphanumeric';
  } else if (upper && lower && symbol) {
    type = 'uAndLAndSCase';
  } else if (upper && lower) {
    type = 'uAndLcase';
  } else if (upper && digit) {
    type = 'uAndDCase';
  } else if (lower && digit) {
    type = 'lAndDCase';
  } else if (symbol && upper) {
    type = 'uAndSCase';
  } else if (symbol && lower) {
    type = 'lAndSCase';
  } else if (digit) {
    type = 'digits';
  } else if (upper) {
    type = 'uppercase';
  } else if (lower) {
    type = 'lowercase';
  } else if (symbol) {
    type = 'symbols';
  } else {
    type = 'allCase';
  }
  
  password = getRandomString(length, type);

  
};


function getRandomString(length, type) {
  const characters = {
    uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    lowercase: 'abcdefghijklmnopqrstuvwxyz',
    uAndLcase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
    uAndDCase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
    lAndDCase: 'abcdefghijklmnopqrstuvwxyz0123456789',
    digits: '0123456789',
    alphanumeric: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
    symbols: '!@#$%^&*()-_=+[]{}|;:,.<>/?`~',
    uAndSCase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()-_=+[]{}|;:,.<>/?`~',
    lAndSCase: 'abcdefghijklmnopqrstuvwxyz!@#$%^&*()-_=+[]{}|;:,.<>/?`~',
    uAndDAndSCase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()-_=+[]{}|;:,.<>/?`~',
    lAndDAndSCase: 'abcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-_=+[]{}|;:,.<>/?`~',
    allCase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-_=+[]{}|;:,.<>/?`~',
    uAndLAndSCase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()-_=+[]{}|;:,.<>/?`~'
  };

  const charSet = characters[type] || characters.alphanumeric;
  const result = [];
  const randomValues = new Uint8Array(length);

  window.crypto.getRandomValues(randomValues);
  for (let i = 0; i < length; i++) {
    const randomIndex = randomValues[i] % charSet.length;
    result.push(charSet.charAt(randomIndex));
  }

  return result.join('');
}

// Node.js
// const crypto = require('crypto');

// function getRandomString(length, type) {
//   const characters = {
//     uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
//     lowercase: 'abcdefghijklmnopqrstuvwxyz',
//     digits: '0123456789',
//     alphanumeric: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
//   };

//   const charSet = characters[type] || characters.alphanumeric; // デフォルトは英数字
//   const result = [];
//   const randomValues = new Uint8Array(length);

//   crypto.getRandomValues(randomValues);

//   for (let i = 0; i < length; i++) {
//     const randomIndex = randomValues[i] % charSet.length;
//     result.push(charSet.charAt(randomIndex));
//   }

//   return result.join('');
// }
// ____________________________________________
// 使用例
// const length = 16; // 生成する文字列の長さ

// const uppercaseString = getRandomString(length, 'uppercase');
// console.log('大文字のみ:', uppercaseString);

// const lowercaseString = getRandomString(length, 'lowercase');
// console.log('小文字のみ:', lowercaseString);

// const digitsString = getRandomString(length, 'digits');
// console.log('数字のみ:', digitsString);

// const alphanumericString = getRandomString(length, 'alphanumeric');
// console.log('大文字と小文字と数字:', alphanumericString);



// function isNumber(value) {
//   return typeof value === 'number' && !isNaN(value);
// }

// function isString(value) {
//   return typeof value === 'string';
// }

// console.log(isNumber(uppercaseString), isString(uppercaseString));
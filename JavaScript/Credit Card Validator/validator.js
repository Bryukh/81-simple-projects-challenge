"use strict";

// Credit Card Validator using Luhn checksum
// Supports Visa, MasterCard, American Express and Discover cards

const VENDOR_PATTERNS = {
  visa: /^4\d{12}(\d{3})?(\d{3})?$/,
  // MasterCard numbers fall in the ranges 51-55 or 2221-2720
  mastercard: /^(5[1-5]\d{14}|2(2[2-9]\d{2}|[3-6]\d{3}|7[01]\d{2}|720\d{2})\d{10})$/,
  amex: /^3[47]\d{13}$/,
  discover: /^(6011\d{12}|65\d{14}|64[4-9]\d{13})$/
};

function luhnChecksum(number) {
  const digits = String(number).replace(/\D/g, "").split("").map(Number);
  let checksum = 0;
  const parity = digits.length % 2;

  for (let i = 0; i < digits.length; i++) {
    let d = digits[i];
    if (i % 2 === parity) {
      d *= 2;
      if (d > 9) d -= 9;
    }
    checksum += d;
  }
  return checksum % 10 === 0;
}

function getVendor(number) {
  for (const [name, pattern] of Object.entries(VENDOR_PATTERNS)) {
    if (pattern.test(number)) {
      return name;
    }
  }
  return "";
}

function isValid(number) {
  const vendor = getVendor(number);
  return vendor !== "" && luhnChecksum(number);
}

function main() {
  const rl = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout
  });
  rl.question("Enter credit card number:\n", (answer) => {
    const trimmed = answer.trim().replace(/\s+/g, "");
    const vendor = getVendor(trimmed);
    if (!vendor) {
      console.log("Unknown card type or invalid format");
    } else if (luhnChecksum(trimmed)) {
      console.log(`Valid ${vendor.charAt(0).toUpperCase() + vendor.slice(1)} card`);
    } else {
      console.log(`Invalid ${vendor.charAt(0).toUpperCase() + vendor.slice(1)} card`);
    }
    rl.close();
  });
}

module.exports = { luhnChecksum, getVendor, isValid };

if (require.main === module) {
  main();
}

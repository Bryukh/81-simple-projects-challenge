"""
Credit Card Validator
---------------------

This script validates credit card numbers from common vendors using the
Luhn checksum algorithm.

Supported vendors:
    * Visa
    * MasterCard
    * American Express
    * Discover

It can be used as a small library by importing the ``is_valid`` function
or executed directly to validate a single number from user input.
"""

import re

# Regular expressions describing number formats for a handful of popular vendors.
# These patterns only verify length and starting digits. The Luhn check is applied afterwards.
VENDOR_PATTERNS = {
    "visa": re.compile(r"^4\d{12}(\d{3})?(\d{3})?$"),
    # MasterCard numbers fall in the ranges 51-55 or 2221-2720
    "mastercard": re.compile(r"^(5[1-5]\d{14}|2(2[2-9]\d{2}|[3-6]\d{3}|7[01]\d{2}|720\d{2})\d{10})$"),
    "amex": re.compile(r"^3[47]\d{13}$"),
    "discover": re.compile(r"^(6011\d{12}|65\d{14}|64[4-9]\d{13})$"),
}


def luhn_checksum(card_number: str) -> bool:
    """Return ``True`` if *card_number* passes the Luhn checksum."""
    digits = [int(d) for d in card_number if d.isdigit()]
    checksum = 0
    parity = len(digits) % 2
    for i, d in enumerate(digits):
        if i % 2 == parity:
            d *= 2
            if d > 9:
                d -= 9
        checksum += d
    return checksum % 10 == 0


def get_vendor(card_number: str) -> str:
    """Return the card vendor name if the number matches, else ``''``."""
    for vendor, pattern in VENDOR_PATTERNS.items():
        if pattern.match(card_number):
            return vendor
    return ""


def is_valid(card_number: str) -> bool:
    """Return ``True`` if *card_number* is valid for a known vendor."""
    vendor = get_vendor(card_number)
    return bool(vendor) and luhn_checksum(card_number)


if __name__ == "__main__":
    number = input("Enter credit card number:\n").strip().replace(" ", "")
    vendor = get_vendor(number)
    if not vendor:
        print("Unknown card type or invalid format")
    elif luhn_checksum(number):
        print(f"Valid {vendor.title()} card")
    else:
        print(f"Invalid {vendor.title()} card")

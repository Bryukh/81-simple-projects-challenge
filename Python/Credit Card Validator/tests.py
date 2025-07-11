import unittest
import os, sys
sys.path.insert(0, os.path.dirname(__file__))
import validator


class TestLuhn(unittest.TestCase):
    def test_valid_numbers(self):
        self.assertTrue(validator.is_valid("4111111111111111"))  # Visa
        self.assertTrue(validator.is_valid("5555555555554444"))  # MasterCard
        self.assertTrue(validator.is_valid("378282246310005"))   # AmEx
        self.assertTrue(validator.is_valid("6011111111111117"))  # Discover

    def test_invalid_numbers(self):
        self.assertFalse(validator.is_valid("4111111111111112"))
        self.assertFalse(validator.is_valid("1234567890123456"))


class TestVendorDetection(unittest.TestCase):
    def test_vendor(self):
        self.assertEqual(validator.get_vendor("4111111111111111"), "visa")
        self.assertEqual(validator.get_vendor("5555555555554444"), "mastercard")
        self.assertEqual(validator.get_vendor("378282246310005"), "amex")
        self.assertEqual(validator.get_vendor("6011111111111117"), "discover")
        self.assertEqual(validator.get_vendor("0000000000000000"), "")


if __name__ == "__main__":
    unittest.main()

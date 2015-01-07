import unittest
import Pi
from math import pi


class BaseTests:
    class TestPi(unittest.TestCase):
        def setUp(self):
            # stub for static code analysis
            self.pi_function = lambda x=0: None
            raise NotImplementedError

        def test_zero(self):
            self.assertEquals("3", self.pi_function(0))

        def test_default(self):
            self.assertEquals(str(pi), self.pi_function())

        def test_max_n(self):
            raise NotImplementedError

        def test_classic(self):
            self.assertEquals("3.14", self.pi_function(2))

        def test_round(self):
            self.assertEquals("3.142", self.pi_function(3))


class TestPiFromMath(BaseTests.TestPi):
    def setUp(self):
        self.pi_function = Pi.pi_from_math

    def test_max_n(self):
        self.assertEquals(self.pi_function(Pi.MAX_N), str(pi))


class TestPiFrom1000(BaseTests.TestPi):
    def setUp(self):
        self.pi_function = Pi.pi_from_1000

    def test_max_n(self):
        self.assertEquals("3.1415926535897932384626433832795028841971693993751"
                          "058209749445923078164062862089986280348253421170680", self.pi_function(Pi.MAX_N))






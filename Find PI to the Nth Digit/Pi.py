# /usr/bin/env python
"""
Find PI to the Nth Digit
– Enter a number (or write as an argument) and
  have the program generate PI up to that many decimal places.
  Keep a limit to how far the program will go.

@syntax:
Pi.py
or
Pi.py N

If N is not given, then user input.

@params
N - a number of decimal places in PI.
"""
import sys

MAX_N = 100

PI1000 = "3.1415926535897932384626433832795028841971693993751058209749" \
         "445923078164062862089986280348253421170679821480865132823066" \
         "470938446095505822317253594081284811174502841027019385211055" \
         "596446229489549303819644288109756659334461284756482337867831" \
         "652712019091456485669234603486104543266482133936072602491412" \
         "737245870066063155881748815209209628292540917153643678925903" \
         "600113305305488204665213841469519415116094330572703657595919" \
         "530921861173819326117931051185480744623799627495673518857527" \
         "248912279381830119491298336733624406566430860213949463952247" \
         "371907021798609437027705392171762931767523846748184676694051" \
         "320005681271452635608277857713427577896091736371787214684409" \
         "012249534301465495853710507922796892589235420199561121290219" \
         "608640344181598136297747713099605187072113499999983729780499" \
         "510597317328160963185950244594553469083026425223082533446850" \
         "352619311881710100031378387528865875332083814206171776691473" \
         "035982534904287554687311595628638823537875937519577818577805" \
         "321712268066130019278766111959092164201989"


def pi_from_math(n=15):
    """
    Cheat method from math module. But just 15 decimal places.
    :param n: how many decimal places after dot.
    :return: PI number (string representation) with the given precision.
    """
    from math import pi

    if not n:
        return "3"
    else:
        return str(round(pi, n))


def pi_from_1000(n=15):
    """
    Again Cheat method from defined.
    :param n: how many decimal places after dot.
    :return: PI number (string representation) with the given precision.
    """
    if not n:
        return "3"
    from decimal import Decimal

    return format(Decimal(PI1000), ".{}f".format(n))


def pi_generator():
    """
    Taken from http://rosettacode.org/wiki/Pi#Python
    Based on
    http://www.cs.ox.ac.uk/people/jeremy.gibbons/publications/spigot.pdf
    """
    q, r, t, k, n, l = 1, 0, 1, 1, 3, 3
    while True:
        if 4 * q + r - t < n * t:
            yield n
            nr = 10 * (r - n * t)
            n = ((10 * (3 * q + r)) // t) - 10 * n
            q *= 10
            r = nr
        else:
            nr = (2 * q + r) * l
            nn = (q * (7 * k) + 2 + (r * l)) // (t * l)
            q *= k
            t *= l
            l += 2
            k += 1
            n = nn
            r = nr


def pi_from_generator(n=15):
    """
    Spigot algorithm by Jeremy Gibbons.
    :param n: how many decimal places after dot.
    :return: PI number (string representation) with the given precision.
    """
    if not n:
        return "3"
    from decimal import Decimal
    gen = pi_generator()
    next(gen)
    return format(Decimal("3." + "".join(str(next(gen)) for i in range(n + 1))), ".{}f".format(n))


if __name__ == "__main__":
    if len(sys.argv) >= 2:
        str_N = int(sys.argv[1])
    else:
        print("Enter a number of decimal places for PI:")
        str_N = input()
    try:
        N = int(str_N)
    except ValueError:
        print("N should be an integer")
        sys.exit(0)
    if N < 0 or N > MAX_N:
        print("N should be from 0 to {}".format(MAX_N))
        sys.exit(0)
    print("Results:")
    print("pi_from_math -- {}".format(pi_from_math(N)))
    print("pi_from_1000 -- {}".format(pi_from_1000(N)))
    print("pi_from_generator -- {}".format(pi_from_generator(N)))



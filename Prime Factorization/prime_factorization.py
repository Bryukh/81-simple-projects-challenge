"""
Prime Factorization –
    Have the user enter a number and find all Prime Factors (if there are any) and display them.
    Also display execution time for various algorithms.
"""

import sys
import timeit


def enumerate_method(n: int) -> list:
    """
    Forehead method
    """
    factors = []
    while n > 1:
        for i in range(2, n + 1):
            if not n % i:
                factors.append(i)
                n //= i
                break
    return factors


def pollard_method(n):
    """
    Pollard's rho algorithm
    http://en.wikipedia.org/wiki/Pollard%27s_rho_algorithm
    """
    # just a stub and I've gone to sleep.
    # will see tomorrow
    return enumerate_method(n)
#     from fractions import gcd
#     from random import randint
#     d = 0
#     gf = lambda i, k: (i ** 2 + 1) % k
#     factors = []
#     while n != 1:
#         x = randint(2, n - 1)
#         y = randint(2, n - 1)
#         d = 1 + bool(not n % 2)
#         while d == 1:
#             x = gf(x, n)
#             y = gf(gf(y, n), n)
#             if not (x - y):
#                 x = randint(2, n - 1)
#                 y = randint(2, n - 1)
#             else:
#                 d = gcd(abs(x - y), n)
#         factors.append(d)
#         n //= d
#     return factors

METHODS = [
    "enumerate_method",
    "pollard_method"
]

if __name__ == "__main__":
    print("Enter a number for factorization:")
    str_number = input()
    if not str_number:
        import doctest

        doctest.testfile("doctests.txt")
        sys.exit(2)
    try:
        number = int(str_number)
    except ValueError:
        print("A number should be an integer")
        sys.exit(0)
    if number < 1:
        print("A number should be great than 1")
        sys.exit(0)
    print("Time Results:")
    for method in METHODS:
        print("{} - {}".format(method,
                               timeit.timeit("{}({})".format(method, number),
                                             "from __main__ import {}".format(method), number=1)))
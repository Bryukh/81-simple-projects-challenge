"""
Prime Factorization –
    Have the user enter a number and find all Prime Factors (if there are any) and display them.
    Also display execution time for various algorithms.
"""

import sys
import timeit
from random import randint
from math import gcd

POLLARD_S = 5


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


def pollard_rho(n):
    if not n % 2:
        return 2
    x = randint(2, n - 1)
    y = x
    c = randint(2, n - 1)
    d = 1
    gf = lambda i: (i ** 2 + c) % n
    while d == 1:
        x = gf(x)
        y = gf(gf(y))
        d = gcd(abs(x - y), n)
    return d


def pollard_method(init_n):
    """
    Pollard's rho algorithm
    http://en.wikipedia.org/wiki/Pollard%27s_rho_algorithm
    """
    factors = []
    stack = [init_n]
    while stack:
        n = stack.pop()
        d = pollard_rho(n)
        if d == n:
            s = 0
            while s < POLLARD_S and d == n:
                d = pollard_rho(n)
                s += 1
            if d == n:
                factors.append(d)
                continue
        stack.append(d)
        stack.append(n // d)
    return sorted(factors)


METHODS = [
    "pollard_method",
    "enumerate_method",

]

if __name__ == "__main__":
    print("Enter a number for factorization:")
    str_number = input()
    if not str_number:
        import doctest

        doctest.testfile("doctests.txt", verbose=True)
        sys.exit(2)
    try:
        number = int(str_number)
    except ValueError:
        print("A number should be an integer")
        sys.exit(0)
    if number < 1:
        print("A number should be greater than 1")
        sys.exit(0)
    print("Results:")
    for method in METHODS:
        print(method)
        print(globals()[method](number))
        print(timeit.timeit("{}({})".format(method, number),
                            "from __main__ import {}".format(method), number=1), "s")

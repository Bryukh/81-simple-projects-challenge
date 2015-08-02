"""
Next Prime Number –
  Have the program find prime numbers until the user chooses to stop asking for the next one.
"""
import sys


def eratosthenes_generator():
    """
    Eratosthenes sieve generator
    http://en.wikipedia.org/wiki/Sieve_of_Eratosthenes
    """
    composites = {}
    i = 1
    while True:
        i += 1
        numb = composites.pop(i, 0)
        if not numb:
            composites[i ** 2] = i
            yield i
        else:
            p = numb + i
            while p in composites:
                p += numb
            composites[p] = numb


if __name__ == "__main__":
    assert hasattr(eratosthenes_generator(), "__next__")
    assert hasattr(eratosthenes_generator(), "__iter__")
    gen = eratosthenes_generator()
    assert [next(gen) for _ in range(10)] == [2, 3, 5, 7, 11, 13, 17, 19, 23, 29]
    inf_generator = eratosthenes_generator()
    while True:
        answer = input("Do you want to see a prime? [y/n] (blank as yes):\n")
        while answer not in "yn":
            answer = input("Please enter y or n:")
        if answer == "n":
            sys.exit(1)
        print(next(inf_generator))

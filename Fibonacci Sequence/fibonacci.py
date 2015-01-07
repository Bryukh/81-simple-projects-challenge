"""
Fibonacci Sequence
– The program generate the Fibonacci sequence to that number.
"""


def fib_generator(max_n: int):
    """
    Generate Fibonacci numbers lesser than max_n
    :param max_n: Top edge of numbers
    :yield: Fibonacci numbers
    """
    a = b = 1
    while a < max_n:
        yield a
        a, b = b, a + b


if __name__ == "__main__":
    import types
    assert isinstance(fib_generator(1), types.GeneratorType)
    assert list(fib_generator(10)) == [1, 1, 2, 3, 5, 8]

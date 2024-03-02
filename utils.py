from string import ascii_letters, digits
from random import choice


def generateShortUrl():
    characters = ascii_letters + digits
    short_url = ''.join(choice(characters) for _ in range(6))
    return short_url
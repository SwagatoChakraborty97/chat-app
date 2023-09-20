# Accept param from php 
import sys
password = sys.argv[1]


# Function to check password strength using a 3rd party library called zxcvbn
import zxcvbn
def check_password_strength(password):
    result = zxcvbn.zxcvbn(password)
    return result

strength_info = check_password_strength(password)

if strength_info['score'] >= 2:
    print("strong",end="")
else:
    print("weak",end="")

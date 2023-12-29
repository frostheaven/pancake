"""
    考虑K=kG ，其中K、G为椭圆曲线Ep(a,b)上的点，n为G的阶（nG=O∞ ），k为小于n的整数。
    则给定k和G，根据加法法则，计算K很容易但反过来，给定K和G，求k就非常困难。
    因为实际使用中的ECC原则上把p取得相当大，n也相当大，要把n个解点逐一算出来列成上表是不可能的。
    这就是椭圆曲线加密算法的数学依据
    点G称为基点（base point）
    k（k<n）为私有密钥（privte key）
    K为公开密钥（public key)
"""

"""
计算value在1-max_value之间的逆元
"""

def gcd(a, b):
    while a != 0:
        a, b = b % a, a
    return b


# 定义一个函数，参数分别为a,n，返回值为b
def get_inverse_element(value, max_value):  # 这个扩展欧几里得算法求模逆

    if gcd(value, max_value) != 1:
        return None
    u1, u2, u3 = 1, 0, value
    v1, v2, v3 = 0, 1, max_value
    while v3 != 0:
        q = u3 // v3
        v1, v2, v3, u1, u2, u3 = (u1 - q * v1), (u2 - q * v2), (u3 - q * v3), v1, v2, v3
    return u1 % max_value


"""
计算最大公约数
"""

def gcd_x_y(x, y):
    if y == 0:
        return x
    else:
        return gcd_x_y(y, x % y)


"""
计算p+q
获取n*p，每次＋p，直到求解阶数np = -p
"""


def calculate_p_q(x1, y1, x2, y2, a, p):
    flag = 1  # 定义符号位（加或者减）
    if x1 == x2 and y1 == y2:
        member = 3 * (x1 ** 2) + a  # 计算分子
        denominator = 2 * y1  # 计算分母
    else:
        member = y2 - y1
        denominator = x2 - x1
        if member * denominator < 0:
            flag = 0
            member = abs(member)
            denominator = abs(denominator)

    # 将分子和分母化为最简
    gcd_value = gcd_x_y(member, denominator)
    member = int(member / gcd_value)
    denominator = int(denominator / gcd_value)
    # 求分母的逆元
    inverse_value = get_inverse_element(denominator, p)
    k = (member * inverse_value)
    if flag == 0:
        k = -k
    k = k % p
    # 计算x3,y3
    x3 = (k ** 2 - x1 - x2) % p
    y3 = (k * (x1 - x3) - y1) % p
    # print("%d<=====>%d" % (x3, y3))
    return [x3, y3]


"""
计算nG
"""

def calculate_np(G_x, G_y, private_key, a, p):
    temp_x = G_x
    temp_y = G_y
    while private_key != 1:
        p_value = calculate_p_q(temp_x, temp_y, G_x, G_y, a, p)
        temp_x = p_value[0]
        temp_y = p_value[1]
        private_key -= 1
    return p_value


"""
ECC加密和解密
"""

def ecc_encrypt(plain_text):
    while True:
        a = 1459
        b = 2568
        p = 49223
        if (4 * (a ** 3) + 27 * (b ** 2)) % p == 0:
            print("选取的椭圆曲线不能用于加密，请重新选择\n")
        else:
            break

    G_x = 137
    G_y = 11648
    private_key = 6995
    Q = calculate_np(G_x, G_y, private_key, a, p)
    k = 3
    k_G_x, k_G_y = calculate_np(G_x, G_y, k, a, p)  # 计算kG
    k_Q_x, k_Q_y = calculate_np(Q[0], Q[1], k, a, p)  # 计算kQ

    #加密阶段
    
    c = []

    # print(f"B将公钥a={a}，b={b}，p={p}，生成元G=({G_x},{G_y})，Q=({Q[0]},{Q[1]})，密文：", end="")
    for char in plain_text:
        intchar = ord(char)
        cipher_text = intchar * k_Q_x
        c.append([k_G_x, k_G_y, cipher_text])
        # print("({},{}),{}".format(k_G_x, k_G_y, cipher_text), end="-")
    # print("发送至A")
    return c


def ecc_decrypt(cipher_text_list, private_key=6995):
    while True:
        a = 1459
        b = 2568
        p = 49223
        if (4 * (a ** 3) + 27 * (b ** 2)) % p == 0:
            print("选取的椭圆曲线不能用于加密，请重新选择\n")
        else:
            break

    G_x = 137
    G_y = 11648
    Q = calculate_np(G_x, G_y, private_key, a, p)
    # 加密准备
    k = 3
    res_str = ''
    for cipher_text in cipher_text_list:
        # decrypto_text_x, decrypto_text_y = calculate_np(k_G_x, k_G_y, private_key, a, p)
        decrypto_text_x, decrypto_text_y = calculate_np(30836, 46975, private_key, a, p)
        res_str += chr(int(cipher_text) // decrypto_text_x)
        # print('decrypting...', res_str)
    return res_str


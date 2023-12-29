from matrix import PC_1, PC_2, SHIFT
from basefunc import shift_left, str2bin


# 密钥初始转换，64bit->56bit
def key_trans(bin_key64):
    res = ""
    for i in PC_1:
        res += bin_key64[i - 1]
    return res


# 子密钥置换，56bit->48bit
def key_permute(bin_key56):
    res = ""
    for i in PC_2:
        res += bin_key56[i - 1]
    return res


# 子密钥生成
def key_generate(bin_key64):
    """
    子密钥生成函数
    :param bin_key64: 64bit二进制原始密钥
    :return: 含16个子密钥的列表
    """
    key_list = []
    divide_output = key_trans(bin_key64)
    key_l0 = divide_output[0:28]
    key_r0 = divide_output[28:]
    for i in SHIFT:  # shift左移位数
        key_l = shift_left(key_l0, i)
        key_r = shift_left(key_r0, i)
        key_output = key_permute(key_l + key_r)
        key_list.append(key_output)
    return key_list


# 密钥规划化
def key_format(hex_key):
    """
    如果密钥不足64bit，用0将其补齐；超出64bit部分被截断
    :param hex_key: 原始密钥（含不合规范的密钥）
    :return bin_key64_format: 64bit密钥
    """
    bin_key64 = str2bin(hex_key)
    bin_key64_format = ""
    rest = len(bin_key64) % 64
    if len(bin_key64) < 64:
        if rest != 0:
            for i in range(64 - rest):  # 不够64位补充0
                bin_key64 += '0'
            bin_key64_format = bin_key64
    else:
        bin_key64_format = bin_key64[0:64]
    return bin_key64_format

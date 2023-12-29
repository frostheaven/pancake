from basefunc import *
from key import *
from matrix import *
import re


# IP置换
def ip_change(bin_str):
    res = ""
    for i in IP_table:
        res += bin_str[i - 1]  # 数组下标i-1
    return res


# IP逆置换
def ip_re_change(bin_str):
    res = ""
    for i in IP_re_table:
        res += bin_str[i - 1]
    return res


# E盒拓展，32bit->48bit
def e_str(bin_str):
    res = ""
    for i in E:
        res += bin_str[i - 1]
    return res


# S盒代换，48bit数据分成8组（6bit每组）分别进入8个S盒，输出8*4bit
def s_box(bin_str):
    res = ""
    s_index = 0
    bin_group = re.findall(r'.{6}', bin_str)
    for bin_str6 in bin_group:
        row = int(bin_str6[0] + bin_str6[5], 2)  # 第1位与第6位二进制表示行
        col = int(bin_str6[1: 5], 2)  # 中间4位二进制表示列
        # matrix.py中的矩阵为一维，所以row * 16
        res += bin(S[s_index][row * 16 + col])[2:].zfill(4)  # 需要补足4位
        s_index += 1
    return res


# P盒置换
def p_box(bin_str):
    res = ""
    for i in P:
        res += bin_str[i - 1]
    return res


# f函数的实现
def func_f(bin_str, key):
    e_res = e_str(bin_str)  # E盒拓展
    xor_res = str_xor(e_res, key)  # 与子密钥异或
    s_res = s_box(xor_res)  # S盒代换
    p_res = p_box(s_res)  # P盒置换
    return p_res


# DES单次（16轮）加密
def encrypt_once(bin_message, bin_key):
    mes_ip_bin = ip_change(bin_message)
    key_lst = key_generate(bin_key)
    mes_left = mes_ip_bin[0:32]
    mes_right = mes_ip_bin[32:]
    for i in range(0, 15):
        mes_tmp = mes_right
        f_result = func_f(mes_tmp, key_lst[i])
        mes_right = str_xor(f_result, mes_left)
        mes_left = mes_tmp  # left(i) = right(i-1)
    f_result = func_f(mes_right, key_lst[15])  # 第16次不用换位，不用暂存右边
    mes_fin_left = str_xor(mes_left, f_result)
    mes_fin_right = mes_right
    fin_message = ip_re_change(mes_fin_left + mes_fin_right)
    return fin_message


# DES单次（16轮）解密
def decrypt_once(bin_mess, bin_key):
    mes_ip_bin = ip_change(bin_mess)
    # bin_key = input_key_judge(str2bin(key))
    key_lst = key_generate(bin_key)
    lst = range(1, 16)  # 循环15次
    cipher_left = mes_ip_bin[0:32]
    cipher_right = mes_ip_bin[32:]
    for i in lst[::-1]:  # 列表逆序使用
        mes_tmp = cipher_right
        cipher_right = str_xor(cipher_left, func_f(cipher_right, key_lst[i]))
        cipher_left = mes_tmp
    fin_left = str_xor(cipher_left, func_f(cipher_right, key_lst[0]))
    fin_right = cipher_right
    fin_output = fin_left + fin_right
    bin_plain = ip_re_change(fin_output)
    res = bin2str(bin_plain)
    return res


# DES加密消息
def encrypt(msg, hex_key):
    """
    DES加密
    :param msg: 原始消息（中、英文，特殊符号）
    :param hex_key: 16进制/2进制密钥
    :return: 加密后的2进制流
    """
    bin_group: list = msg_group(msg)
    res = ""
    bin_key = key_format(hex_key)
    for bin_str64 in bin_group:
        res += encrypt_once(bin_str64, bin_key)  # 将每个字符加密后的结果再连接起来
    return res


# DES解密（二进制）消息
def decrypt(bin_msg, hex_key):
    """
    DES解密
    :param bin_msg: 二进制消息（经过加密的）
    :param hex_key: 16进制/2进制密钥
    :return: 解密后的明文
    """
    res = ""
    bin_key = key_format(hex_key)
    tmp = re.findall(r'.{64}', bin_msg)
    for i in tmp:
        res += decrypt_once(i, bin_key)
    return res


# 用户交互
def start_des():
    hex_key = "9CAF065A8DC9A31B"
    while True:
        print(f'1-添加/更改密钥 2-信息加密/解密 3-文件加密/解密 4-退出')
        command = input()
        match command:
            case '1':
                print('默认密钥：9CAF065A8DC9A31B')
                print('输入你的密钥：')
                hex_key = input().replace(' ', '')
                print('成功！')
            case '2':
                print('输入信息：')
                msg = input()
                encrypt_bin = encrypt(msg, hex_key)
                print(f'加密二进制结果：{encrypt_bin}')
                print(f'加密字符结果：{bin2str(encrypt_bin)}')
                print(f'解密结果：{decrypt(encrypt_bin, hex_key)}')
            case '3':
                msg = file_read()
                encrypt_bin = encrypt(msg, hex_key)
                print(f'加密二进制结果：{encrypt_bin}')
                print(f'加密字符结果：{bin2str(encrypt_bin)}')
                print(f'解密结果：{decrypt(encrypt_bin, hex_key)}')
            case '4':
                print('再见！')
                exit()
            case _:
                print('命令错误！')
        print()


if __name__ == '__main__':
    start_des()

import re


# 文件读取
def file_read():
    try:
        f = open('test.txt', 'r', encoding='utf-8')
        file_stream = f.read()
        f.close()
        print('文件读取成功！')
        return file_stream
    except IOError:
        print('文件读取错误！')


"""
字符串转二进制，二进制转字符串的两个函数，
都选择先转换成字节对象进行操作，
同时使用gbk进行编码/解码
为什么不用utf-8？
因为utf-8对汉字编码使用了3个字节，对于64bit（即8字节）一组进行DES加/解密的过程来讲，会出问题。
数据大小无法被64bit整除，有一组不够64bit？
在二进制数据前添0直至64位，此后在解密，转换为汉字过程中，用.strip(b'\x00'.decode())去除不可见字符。
2023/12/22
"""


# 字符串转二进制
def str2bin(message):
    res = ""
    for char in message:  # 对每个字符进行二进制转化
        tmp_hex = bytes(char, encoding='gbk')  # 16进制字节对象
        for char_hex in tmp_hex:
            res += bin(char_hex)[2:].zfill(8)  # 补充至8位
    return res


# 二进制转字符串
def bin2str(bin_str):
    tmp = re.findall(r'.{8}', bin_str)
    tmp_hex = bytes([int(x, 2) for x in tmp])
    res = tmp_hex.decode(encoding='gbk', errors='ignore').strip(b'\x00'.decode())
    # res = str(tmp_hex, encoding='gbk')
    return res


# 字符串异或
def str_xor(bin_str1, bin_str2):  # str，key
    res = ""
    for i in range(len(bin_str1)):
        xor_res = int(bin_str1[i]) ^ int(bin_str2[i])  # 变成10进制是转化成字符串 2进制与10进制异或结果一样，都是1,0
        res += str(xor_res)
    return res


# 循环左移
def shift_left(bin_str: str, n: int):
    """
    循环左移，通过字符串拼接方式实现
    :param bin_str: 要左移的字符串
    :param n: 左移的位数
    :return: 字符串左移结果
    """
    res: str = bin_str[n: len(bin_str)]
    res: str = res + bin_str[0: n]
    return res


# 信息处理与分组
def msg_group(msg):
    """
    :param msg: 用户输入的原始数据
    :return: 每组64bit二进制数据列表
    """
    bin_msg = str2bin(msg)
    rest = len(bin_msg) % 64
    if rest != 0:
        group_num = len(bin_msg) // 64 + 1
        bin_msg = bin_msg.zfill(group_num * 64)  # 添加前导0使得二进制数据大小可被64整除
    bin_group = re.findall(r'.{64}', bin_msg)
    return bin_group


if __name__ == '__main__':
    bin_res = str2bin('hello')
    str_res = bin2str(bin_res)
    print(bin_res)
    print(str_res)
    msg_bin = msg_group('我喜欢上《网络空间安全理论与技术（乙）》课，我愿意接受这1次challenge！')
    print(msg_bin)

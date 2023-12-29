import asyncio
import websockets
import datetime
import os
import json
import threading
from ECC import ecc_decrypt
from SM4 import decrypt_cbc
import base64

path_conf = {
    'storage_path': './storage'
}


async def time_server(websocket):
    while True:
        # 加上时间戳 精确到毫秒
        # dt_ms = datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S.%f')
        dt_ms = datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        # print(dt_ms)
        await websocket.send(json.dumps(dt_ms))
        await asyncio.sleep(1 / 10) # 这里值设置较大，避免发送频率太快造成socket传输阻塞


async def file_recv_handler(websocket):
    chunk_recv = {}
    while True:
        # 接收文件信息块
        file_info_json = await websocket.recv()
        file_info = json.loads(file_info_json)
        current_chunk = int(file_info['currentChunk'])
        total_chunks = int(file_info['totalChunks'])
        print('currentChunk', current_chunk)
        # 为什么存入字典？因为文件块接收顺序会不一致。
        chunk_recv[current_chunk] = file_info
        if current_chunk == total_chunks:
            await file_decrypt_complete(chunk_recv)
            chunk_recv = {}
        
        
async def file_decrypt_complete(chunk_recv):
    sorted_keys = sorted(chunk_recv.keys())
    for key in sorted_keys:
        print('currentFileDecrypt:', key)
        file_info = chunk_recv[key]
        await file_decrypt(file_info)





        



async def file_decrypt(file_info):
    data_cipher = file_info['data']
    cbckey = ecc_decrypt(file_info['key'])
    # print('cbckey', cbckey)
    data_base64 = decrypt_cbc(data_cipher,cbckey)
    # print('data_base64', data_base64)
    data_origin = base64.b64decode(data_base64)
    # print('data_origin', data_origin)

    # 解析文件名和文件数据块
    file_name = file_info['name']
    total_chunks = file_info['totalChunks']
    current_chunk = file_info['currentChunk']

    # 将二进制数据转换为bytes对象
    file_data = bytes(data_origin)

    # 构造完整的文件路径
    file_path = os.path.join(path_conf['storage_path'], file_name)

    # 将文件数据块追加到文件中
    with open(file_path, 'ab') as file:
        file.write(file_data)
    
    # print('file_info', file_info)

    # 如果已经接收到所有的数据块，跳出循环
    if current_chunk == total_chunks:
        print('文件接收完成')


async def main():
    time_task = await websockets.serve(time_server, 'localhost', 5001)
    dropUpload_recv_task = await websockets.serve(file_recv_handler, 'localhost', 5002)
    inputUpload_recv_task = await websockets.serve(file_recv_handler, 'localhost', 5003)

    await asyncio.gather(time_task.wait_closed(), 
                         dropUpload_recv_task.wait_closed(),
                         inputUpload_recv_task.wait_closed())

asyncio.run(main())


# asyncio.get_event_loop().run_until_complete(time_task)
# asyncio.get_event_loop().run_forever()
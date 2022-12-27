from io import BytesIO
from typing import BinaryIO
from pytube import YouTube

def mB(n) : return  float("{:.2f}".format(n / 1024 / 1024))

class Video:
    def __init__(self, url:str):
        self.video = YouTube(url)
        isShort=self.video.length<61
        #self.path = path
        self.video_stream = self.video.streams.filter(
            progressive=True, file_extension='mp4', res="360p").order_by('resolution').desc().first() if not isShort else self.video.streams.filter(
            progressive=True, file_extension='mp4').order_by('resolution').desc().first()
        self.audio_stream = self.video.streams.filter(only_audio=True,file_extension='mp4').first()

    def download_video(self):
        stream = self.video_stream
        # stream.download(self.path)
        buffer = BytesIO()
        size = stream.filesize
        stream.stream_to_buffer(buffer)
        buffer.seek(0)
        return buffer

    def download_audio(self):
        stream = self.audio_stream
        # stream.download(self.path)
        buffer = BytesIO()
        size = stream.filesize
        stream.stream_to_buffer(buffer)
        buffer.seek(0)
        return buffer

    @property
    def data(self):
        data = {'title': self.video.title, 'views': self.video.views,
                'duration': self.video.length, 'date': self.video.publish_date, "sizes": {"video": mB(self.video_stream.filesize), "audio": mB(self.audio_stream.filesize)}}
        return data

from video import Video
from AnilistPython import Anilist
from flask import Flask, jsonify, request, send_file

app = Flask(__name__)
anilist = Anilist()


@app.route('/')
def index():
    return jsonify('Youtube API')


@app.route("/youtube/video")
def info():
    try:
        url = request.args.get("url")
        type = request.args.get("type") or "video"
        video = Video(url)
        data = video.data
    except:
        return jsonify({'status': 'error', 'message': 'url not found', 'code': 400})
    return jsonify({'status': 'success', 'info': data, 'download': f'{request.host_url}youtube/video/download?url={url}&type={type}', 'code': 200})


@app.route('/youtube/video/download')
def download():
    try:
        url = request.args.get("url")
        type = request.args.get("type") or "video"
    except:
        return jsonify({'status': 'error', 'message': 'url not found', 'code': 400})
    try:
        video = Video(url)
        media = video.download_video() if type == "video" else video.download_audio()
    except:
        return jsonify({'status': 'error', 'message': 'problem while downloading', 'code': 500})
    return send_file(media, as_attachment=True, download_name=f"{video.data['title']}.mp4" if type == "video" else f"{video.data['title']}.mp4")

@app.route('/search/anime')
def search_anime():
    try:
        query = request.args.get("query")
        data = anilist.get_anime(query)
    except:
        return jsonify({'status': 'error', 'message': 'query not found', 'code': 400})
    return jsonify({'status': 'success', 'data': data, 'code': 200})

app.run(host="0.0.0.0", port=5000)
